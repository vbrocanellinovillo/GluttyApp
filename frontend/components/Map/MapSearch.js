import { StyleSheet, View } from "react-native";
import { Colors } from "../../constants/colors";
import { useEffect, useState } from "react";
import { Input } from "@rneui/themed";
import * as Haptics from "expo-haptics";
import { getSearchData } from "../../services/commerceService";
import { useSelector } from "react-redux";
import MapChipsContainer from "./MapChipsContainer";
import SearchResultsList from "./SearchResultsList";
import DismissKeyboardContainer from "../UI/Forms/DismissKeyboadContainer";
import GluttyModal from "../UI/GluttyModal";

const CHIPS = [
  { id: 1, name: "Cocina separada", icon: "restaurant" },
  { id: 2, name: "Solo TakeAway", icon: "delivery-dining" },
];

export default function MapSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const token = useSelector((state) => state.auth.accessToken);

  const hasSearchTerm = searchTerm.trim().length !== 0;
  const icon = hasSearchTerm ? "close" : "search";

  const [searchData, setSearhData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  function toggleErrorModal() {
    setIsError(false);
    setSearchTerm("");
  }

  useEffect(() => {
    async function searchPlaces() {
      if (!hasSearchTerm) {
        setSearhData([]);
        return;
      }

      setIsLoading(true);
      try {
        const data = await getSearchData(searchTerm, token);
        setSearhData(data);
        setIsError(false);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    searchPlaces();
  }, [searchTerm]);

  function handleChangeText(text) {
    setSearchTerm(text);
  }

  function clearSearch() {
    Haptics.selectionAsync();
    setSearchTerm("");
  }

  return (
    <>
      <DismissKeyboardContainer>
        <View style={styles.container}>
          <Input
            inputContainerStyle={styles.search}
            rightIcon={{
              type: "ionicons",
              name: `${icon}`,
              color: Colors.mJordan,
              size: 30,
              onPress: clearSearch,
            }}
            value={searchTerm}
            onChangeText={handleChangeText}
            placeholder="Busca tus lugares favoritos!"
          />
          <MapChipsContainer chips={CHIPS} />
          <SearchResultsList searchResults={searchData} isLoading={isLoading} />
        </View>
      </DismissKeyboardContainer>
      <GluttyModal
        visible={isError}
        isError={true}
        message="Ocurrio un error en la busqueda. Por favor intente de nuevo más tarde"
        onClose={toggleErrorModal}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 70,
    left: 18,
    right: 18,
    zIndex: 1,
    paddingHorizontal: 10,
  },

  search: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    shadowColor: "#444",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    fontSize: 26,
    marginHorizontal: -10,
  },
});

import { StyleSheet, View } from "react-native";
import { Colors } from "../../constants/colors";
import { useEffect, useState } from "react";
import { Input } from "@rneui/themed";
import * as Haptics from "expo-haptics";
import { getSearchData } from "../../services/commerceService";
import { useSelector } from "react-redux";
import SearchResultItem from "./SearchResultItem";
import MapChipsContainer from "./MapChipsContainer";

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

  useEffect(() => {
    async function searchPlaces() {
      if (!hasSearchTerm) {
        setSearhData([]);
        return;
      }

      setIsLoading(true);
      try {
        const data = getSearchData(searchTerm, token);
      } catch (error) {
        console.log(error);
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
      <View style={styles.resultsList}>
        <SearchResultItem />
        <SearchResultItem />
        <SearchResultItem />
        <SearchResultItem />
        <SearchResultItem />
      </View>
    </View>
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
    marginHorizontal: -10
  },

  resultsList: {
    gap: 16,
  },
});

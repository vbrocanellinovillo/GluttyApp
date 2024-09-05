import { StyleSheet, View } from "react-native";
import { Colors } from "../../constants/colors";
import { useEffect, useState } from "react";
import { Input } from "@rneui/themed";
import * as Haptics from "expo-haptics";
import MapChipsContainer from "./MapChipsContainer";
import SearchResultsList from "./SearchResultsList";
import DismissKeyboardContainer from "../UI/Forms/DismissKeyboadContainer";

export default function MapSearch({
  onSearch,
  searchData,
  separatedKitchen,
  onlyTakeAway,
  toggleSeparatedKitchen,
  toggleOnlyTakeAway,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [focused, setFocused] = useState(false);

  const hasSearchTerm = searchTerm.trim().length !== 0;
  const icon = hasSearchTerm ? "close" : "search";

  useEffect(() => {
    async function searchPlaces() {
      setIsLoading(true);
      try {
        await onSearch(searchTerm);
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

  function focusSearch() {
    setFocused(true);
  }

  function blurSearch() {
    setFocused(false);
  }

  return (
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
          onFocus={focusSearch}
          onBlur={blurSearch}
        />
        <MapChipsContainer
          separatedKitchen={separatedKitchen}
          onlyTakeAway={onlyTakeAway}
          toggleSeparatedKitchen={toggleSeparatedKitchen}
          toggleOnlyTakeAway={toggleOnlyTakeAway}
        />
        <SearchResultsList
          searchResults={searchData}
          isLoading={isLoading}
          focused={focused}
        />
      </View>
    </DismissKeyboardContainer>
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

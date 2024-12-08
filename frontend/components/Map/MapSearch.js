import { StyleSheet, View } from "react-native";
import { Colors } from "../../constants/colors";
import { useEffect, useState } from "react";
import { Input } from "@rneui/themed";
import * as Haptics from "expo-haptics";
import MapChipsContainer from "./MapChipsContainer";
import SearchResultsList from "./SearchResultsList";
import DismissKeyboardContainer from "../UI/Forms/DismissKeyboadContainer";
import Searchbar from "../UI/Controls/Searchbar";

export default function MapSearch({
  onSearch,
  searchData,
  hideResults,
  handleHideSearchResults,
  handleShowSearchResults,
  onChangeLocation,
  isSearching,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const [focused, setFocused] = useState(false);

  const [separatedKitchen, setSeparatedKitchen] = useState(false);
  const [onlyTakeAway, setOnlyTakeAway] = useState(false);

  const hasSearchTerm = searchTerm.trim().length !== 0;
  const icon = hasSearchTerm ? "close" : "search";

  useEffect(() => {
    const controller = new AbortController();

    const timer = setTimeout(() => {
      async function searchPlaces() {
        await onSearch(
          searchTerm,
          separatedKitchen,
          onlyTakeAway,
          controller.signal
        );
      }

      searchPlaces();
    }, 1000);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searchTerm, separatedKitchen, onlyTakeAway]);

  function handleChangeText(text) {
    handleShowSearchResults();
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

  function toggleSeparatedKitchen() {
    setSeparatedKitchen(!separatedKitchen);
  }

  function toggleOnlyTakeAway() {
    setOnlyTakeAway(!onlyTakeAway);
  }

  function changeLocation(location) {
    onChangeLocation(location);
  }

  return (
    <DismissKeyboardContainer>
      <View style={styles.container}>
        <Searchbar
          value={searchTerm}
          placeholder="Buscá tus lugares favoritos!"
          onChange={handleChangeText}
          onFocus={focusSearch}
          onBlur={blurSearch}
          onClear={clearSearch}
          style={styles.search}
        />
        <MapChipsContainer
          separatedKitchen={separatedKitchen}
          onlyTakeAway={onlyTakeAway}
          toggleSeparatedKitchen={toggleSeparatedKitchen}
          toggleOnlyTakeAway={toggleOnlyTakeAway}
        />
        <SearchResultsList
          searchResults={searchData}
          isLoading={isSearching}
          focused={focused}
          hideResults={hideResults}
          handleHideSearchResults={handleHideSearchResults}
          handleShowSearchResults={handleShowSearchResults}
          onChangeLocation={changeLocation}
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
    marginHorizontal: -10,
    shadowColor: "#444",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
});

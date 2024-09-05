import { Keyboard, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import MapMarker from "./MapMarker";
import { useState } from "react";
import DetailsContainer from "./DetailsContainer";
import { getBranch } from "../../services/commerceService";
import { useSelector } from "react-redux";
import MapSearch from "./MapSearch";

export default function InfoMap({ branches, location, onSearch, searchData }) {
  const userLocation = {
    latitude: location.latitude ? location.latitude : -31.4262,
    longitude: location.longitude ? location.longitude : -64.1888,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  const [showDetails, setShowDetails] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const [branch, setBranch] = useState(undefined);

  const [isError, setIsError] = useState(false);

  const token = useSelector((state) => state.auth.accessToken);

  async function openDetails(id) {
    setShowDetails(true);
    setIsLoadingDetails(true);
    try {
      const detailsBranch = await getBranch(id, token);
      setBranch(detailsBranch);
      setIsError(false);
    } catch (error) {
      setBranch(undefined);
      setIsError(true);
    } finally {
      setIsLoadingDetails(false);
    }
  }

  function closeDetails() {
    setShowDetails(false);
  }

  return (
    <>
      <MapView
        region={userLocation}
        style={styles.map}
        onPress={() => Keyboard.dismiss()}
        userInterfaceStyle="light"
      >
        {branches &&
          branches.map((branch) => (
            <MapMarker branch={branch} key={branch.id} onPress={openDetails} />
          ))}
      </MapView>
      <DetailsContainer
        onDismiss={closeDetails}
        visible={showDetails}
        isLoading={isLoadingDetails}
        isError={isError}
        branch={branch}
      />
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

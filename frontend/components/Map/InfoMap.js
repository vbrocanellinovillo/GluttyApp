import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import BranchDetail from "./DetailsContainer";
import MapMarker from "./MapMarker";
import { useState } from "react";
import DetailsContainer from "./DetailsContainer";

export default function InfoMap({ branches, location }) {
  const userLocation = {
    latitude: location.latitude ? location.latitude : -31.4262,
    longitude: location.longitude ? location.longitude : -64.1888,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  const [showDetails, setShowDetails] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  function openDetails(id) {
    setShowDetails(true);
  }

  function closeDetails() {
    setShowDetails(false);
  }

  return (
    <>
      <MapView region={userLocation} style={styles.map}>
        {branches &&
          branches.map((branch) => (
            <MapMarker branch={branch} key={branch.id} onPress={openDetails} />
          ))}
      </MapView>
      <DetailsContainer onDismiss={closeDetails} visible={showDetails} />
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

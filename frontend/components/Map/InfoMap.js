import { Keyboard, StyleSheet } from "react-native";
import MapView, { AnimatedRegion } from "react-native-maps";
import MapMarker from "./MapMarker";
import { useEffect, useRef, useState } from "react";
import DetailsContainer from "./DetailsContainer";
import { getBranch } from "../../services/commerceService";
import { useSelector } from "react-redux";
import { AnimatedMapView } from "react-native-maps/lib/MapView";
import { LATITUDE_DELTA, LONGITUDE_DELTA } from "../../constants/map";

export default function InfoMap({ branches, location, onPress, newRegion }) {
  const userLocation = new AnimatedRegion({
    latitude: location.latitude ? location.latitude : -31.4262,
    longitude: location.longitude ? location.longitude : -64.1888,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const [showDetails, setShowDetails] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const [branch, setBranch] = useState(undefined);

  const [isError, setIsError] = useState(false);

  const token = useSelector((state) => state.auth.accessToken);

  const mapRef = useRef();

  useEffect(() => {
    async function searchPlace() {
      if (mapRef && newRegion) {
        mapRef.current?.animateToRegion(newRegion.coordinate);
        await openDetails(newRegion.id);
      }
    }

    searchPlace();
  }, [newRegion]);

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

  function handleMapPress() {
    Keyboard.dismiss();
    onPress();
  }

  return (
    <>
      <AnimatedMapView
        region={userLocation}
        style={styles.map}
        onPress={handleMapPress}
        userInterfaceStyle="light"
        ref={mapRef}
      >
        {branches &&
          branches.map((branch) => (
            <MapMarker branch={branch} key={branch.id} onPress={openDetails} />
          ))}
      </AnimatedMapView>
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

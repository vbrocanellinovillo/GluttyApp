import { Keyboard, StyleSheet } from "react-native";
import { AnimatedRegion } from "react-native-maps";
import MapMarker from "./MapMarker";
import { useEffect, useRef, useState } from "react";
import DetailsContainer from "./DetailsContainer";
import { getBranch } from "../../services/commerceService";
import { useSelector } from "react-redux";
import { AnimatedMapView } from "react-native-maps/lib/MapView";
import { LATITUDE_DELTA, LONGITUDE_DELTA } from "../../constants/map";
import { PROVIDER_GOOGLE } from "react-native-maps";
import MapView from "react-native-maps/lib/MapView";

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
      console.log(detailsBranch);
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
  function handleReport() {}

  return (
    <>
      <AnimatedMapView
        region={userLocation}
        style={styles.map}
        onPress={handleMapPress}
        userInterfaceStyle="light"
        ref={mapRef}
        showsUserLocation
        provider={MapView.PROVIDER_GOOGLE}
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
  modal: {
    zIndex: 1000, // Asegura que esté por encima de todos los demás elementos
    elevation: 10, // Para dispositivos Android
  },
});

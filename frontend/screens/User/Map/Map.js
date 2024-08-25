import {
  getCurrentPositionAsync,
  getForegroundPermissionsAsync,
  useForegroundPermissions,
} from "expo-location";
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import LoadingGlutty from "../../../components/UI/Loading/LoadingGlutty";
import GluttyModal from "../../../components/UI/GluttyModal";
import { useFocusEffect } from "@react-navigation/native";
import { getMapPoints } from "../../../services/commerceService";
import InfoMap from "../../../components/Map/InfoMap";

export default function Map() {
  const [locationPermissions, requestLocationPermissions] =
    useForegroundPermissions();

  const token = useSelector((state) => state.auth.accessToken);

  const [isloading, setisloading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, serError] = useState("");

  const [mapData, setMapData] = useState(undefined);

  function closeModalHandler() {
    setShowModal(false);
    serError("");
  }

  const [location, setLocation] = useState({
    latitude: -31.4262,
    longitude: -64.1888,
  }); // ubicación por defecto si no se conceden los permisos

  useEffect(() => {
    async function locate() {
      const currentPermissions = await getForegroundPermissionsAsync();

      if (!currentPermissions.granted) {
        const permissionResponse = await requestLocationPermissions();

        if (!permissionResponse.granted) {
          return;
        }
      }

      const userLocation = await getCurrentPositionAsync();
      const { latitude, longitude } = userLocation.coords;

      setLocation({ latitude, longitude });
    }

    locate();
  }, []);

  useFocusEffect(
    useCallback(() => {
      async function getMapData() {
        try {
          setisloading(true);
          const branches = await getMapPoints(token);
          setMapData(branches);
          setIsError(false);
        } catch (error) {
          setIsError(true);
          serError(error.message);
          setShowModal(true);
        } finally {
          setisloading(false);
        }
      }

      if (mapData) return;
      getMapData();
    }, [token])
  );

  return (
    <>
      <LoadingGlutty visible={isloading} />
      <GluttyModal
        isError={isError}
        message={error}
        onClose={closeModalHandler}
        visible={showModal}
      />
      <InfoMap location={location} branches={mapData} />
    </>
  );
}

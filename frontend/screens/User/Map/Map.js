import {
  getCurrentPositionAsync,
  getForegroundPermissionsAsync,
  useForegroundPermissions,
} from "expo-location";
import { useEffect, useState, useCallback } from "react";
import RestaurantsMap from "../../../components/Map/RestaurantsMap";
import { useSelector } from "react-redux";
import LoadingGlutty from "../../../components/UI/Loading/LoadingGlutty";
import GluttyModal from "../../../components/UI/GluttyModal";
import { useFocusEffect } from "@react-navigation/native";

export default function Map() {
  const [locationPermissions, requestLocationPermissions] =
    useForegroundPermissions();

  const token = useSelector((state) => state.auth.accessToken);

  const [isloading, setisloading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, serError] = useState("");

  function closeModalHandler() {
    setShowModal(false);
    serError("");
  }

  const [location, setLocation] = useState({
    latitude: -31.4135,
    longitude: -64.18105,
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
          const response = await getMap(token); // Asegúrate de que esta función sea asíncrona
          setMapData(response);
          setIsError(false);
        } catch (error) {
          setIsError(true);
          setMessage(error.message);
          setShowModal(true);
        } finally {
          setisloading(false);
        }
      }

      getMapData();
    }, [token]) // Dependencia de token para asegurarse de que useFocusEffect se reejecute si el token cambia
  );

  return (
    <>
      <LoadingGlutty visible={isloading} />
      <GluttyModal
        isError={isError}
        message={message}
        onClose={closeModalHandler}
        visible={showModal}
      />
      <RestaurantsMap location={location} />
    </>
  );
}

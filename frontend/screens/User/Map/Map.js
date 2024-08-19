import {
  getCurrentPositionAsync,
  getForegroundPermissionsAsync,
  useForegroundPermissions,
} from "expo-location";
import ScreenCenter from "../../../components/UI/ScreenCenter";
import Title from "../../../components/UI/Title";
import { useEffect, useState } from "react";

export default function Map() {
  const [locationPermissions, requestLocationPermissions] =
    useForegroundPermissions();

  const [location, setLocation] = useState({
    latitude: -31.4135,
    longitude: -64.18105,
  }); // ubicación por defecto si no te da los permisos

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


  return (
    <ScreenCenter>
      <Title>Proximamente mapaca...</Title>
    </ScreenCenter>
  );
}

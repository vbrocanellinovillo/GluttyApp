import { useEffect, useState } from "react";
import { useCameraPermissions } from "expo-camera";
import { View } from "react-native";
import Scanner from "../../components/Scanner/Scanner";
import NoPermissions from "../../components/Scanner/NoPermissions";

export default function Scan({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [hasRequestedPermission, setHasRequestedPermission] = useState(false);

  useEffect(() => {
    async function askPermissions() {
      const permissionResponse = await requestPermission();

      if (!permissionResponse.granted) {
        navigation.navigate("MainDrawer");
      }
    }

    if (permission && !permission.granted && !hasRequestedPermission) {
      setHasRequestedPermission(true);
      askPermissions();
    }
  }, [permission, hasRequestedPermission]);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    return <NoPermissions />;
  }

  async function onScan(eanCode) {
    console.log(eanCode);
  }

  return <Scanner onScan={onScan} />;
}

import { useEffect, useState } from "react";
import { useCameraPermissions } from "expo-camera";
import { View } from "react-native";
import Scanner from "../../components/Scanner/Scanner";
import NoPermissions from "../../components/Scanner/NoPermissions";
import { scanProduct } from "../../services/productsService";

export default function Scan({ navigation }) {
  // Permissions
  const [permission, requestPermission] = useCameraPermissions();
  const [hasRequestedPermission, setHasRequestedPermission] = useState(false);

  // Fetch data
  const [isLoading, setIsLoading] = useState(false);
  const [scannedProduct, setScannedProduct] = useState(undefined);
  const [error, setError] = useState(undefined);

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
    setIsLoading(true);
    try {
      const scannedData = await scanProduct(eanCode);
      setScannedProduct(scannedData);
      setError(undefined);
    } catch (error) {
      const errorMessage = error.message.replace(/^Error:\s*/, "");
      setScannedProduct(undefined);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Scanner
      onScan={onScan}
      isLoading={isLoading}
      scannedProduct={scannedProduct}
      error={error}
    />
  );
}

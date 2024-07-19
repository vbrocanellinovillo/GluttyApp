import { useCameraPermissions } from "expo-camera";
import { Button, Text, View } from "react-native";
import Scanner from "../../components/Scanner/Scanner";

export default function Scan() {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  async function onScan(eanCode) {
    console.log(eanCode);
  }

  return <Scanner onScan={onScan} />;
}

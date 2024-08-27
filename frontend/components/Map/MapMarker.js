import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { thumbGlutty } from "../../constants/glutty";
import { Marker } from "react-native-maps";

export default function MapMarker({ onPress, branch }) {
  return (
    <>
      {branch && (
        <Marker
          coordinate={branch.coordinate}
          onPress={onPress ? onPress.bind(this, branch.id) : undefined}
        >
          <TouchableOpacity>
            <Image source={{ uri: thumbGlutty }} style={styles.gluttyMarker} />
          </TouchableOpacity>
        </Marker>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  gluttyMarker: {
    height: 50,
    width: 50,
  },
});

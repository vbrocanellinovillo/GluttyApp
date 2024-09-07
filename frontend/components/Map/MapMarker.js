import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { gluttyMarker } from "../../constants/glutty";
import { Marker } from "react-native-maps";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function MapMarker({ onPress, branch }) {
  return (
    <>
      {branch && (
        <Marker
          coordinate={branch.coordinate}
          onPress={onPress ? onPress.bind(this, branch.id) : undefined}
        >
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <TouchableOpacity>
              <Image
                source={{ uri: gluttyMarker }}
                style={styles.gluttyMarker}
              />
            </TouchableOpacity>
          </Animated.View>
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

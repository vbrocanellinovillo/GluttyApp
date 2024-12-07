import { View, StyleSheet, Image } from "react-native";
import { thumbGlutty } from "../../constants/glutty";

export default function CommerceImage({ image }) {
  return (
    <View style={styles.imageRow}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: image || thumbGlutty,
          }}
          style={styles.image}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10
  },

  imageContainer: {
    width: 120,
    height: 120,
    backgroundColor: "white",
    borderRadius: 60,
    marginTop: -60,
    shadowColor: "black",
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 5,
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
    objectFit: "contain",
  },
});

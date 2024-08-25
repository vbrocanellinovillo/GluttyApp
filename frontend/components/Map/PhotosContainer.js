import { StyleSheet, View } from "react-native";
import DetailTitle from "./DetailTitle";
import AnimatedImage from "./AnimatedImage";

export default function PhotosContainer({ photos }) {
  return (
    <View>
      <DetailTitle>Fotos</DetailTitle>
      <View style={styles.photos}>
        {photos.map((photo, index) => (
          <AnimatedImage style={styles.photo} uri={photo.photo} key={index} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  photos: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  photo: {
    width: 100,
    height: 100,
    objectFit: "fill",
    flexBasis: "31%",
  },
});

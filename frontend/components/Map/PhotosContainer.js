import { Image, ScrollView, StyleSheet, View } from "react-native";
import DetailTitle from "./DetailTitle";

export default function PhotosContainer({ photos }) {
  return (
    <View>
      <DetailTitle>Fotos</DetailTitle>
      <ScrollView style={styles.photos} horizontal showsHorizontalScrollIndicator={false}>
        {photos.map((photo, index) => (
          <Image
            source={{ uri: photo }}
            style={styles.photo}
            key={index}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  photos: {
    marginTop: 4,
  },

  photo: {
    width: 130,
    height: 160,
    objectFit: "fill",
    marginRight: 10,
  },
});

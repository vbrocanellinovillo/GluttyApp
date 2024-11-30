import { Image, StyleSheet } from "react-native";
import ElementsContainer from "./ElementsContainer";

export default function PhotosContainer({ photos = [] }) {
  return (
    <ElementsContainer title="Fotos" items={photos}>
      {photos?.map((photo) => (
        <Image
          key={photo?.id}
          source={{ uri: photo?.url }}
          style={styles.photo}
        />
      ))}
    </ElementsContainer>
  );
}

const styles = StyleSheet.create({
  photo: {
    width: 100,
    height: 110,
    objectFit: "fill",
    marginRight: 10,
  },
});

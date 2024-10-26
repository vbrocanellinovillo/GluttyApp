import { StyleSheet, View, Image } from "react-native";
import Carousel from "react-native-reanimated-carousel";

export default function ImagesCarousel({ images, width, height }) {
  if (!images) return;

  return (
    <View style={{ height }}>
      <Carousel
        data={images}
        width={width}
        scrollAnimationDuration={1500}
        renderItem={({ item, index }) => (
          <Image key={index} source={{ uri: item?.url }} style={styles.image} />
        )}
        modeConfig={{
          snapDirection: "left",
          moveSize: 2500,
          stackInterval: 200,
          scaleInterval: 0.08,
        }}
        vertical={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
});

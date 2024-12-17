import { View, StyleSheet } from "react-native";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import Tip from "./Tip";
import { useSharedValue } from "react-native-reanimated";
import { useRef } from "react";
import { Colors } from "../../constants/colors";

export default function TipsCarousel({ tips, height }) {
  const progress = useSharedValue(0);
  const carouselRef = useRef();

  const onPressPagination = (index) => {
    carouselRef.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View style={[styles.container, { height }]}>
      <Carousel
        ref={carouselRef}
        width={300}
        pagingEnabled
        data={tips}
        scrollAnimationDuration={800}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Tip tip={item} />}
      />
      <Pagination.Basic
        progress={progress}
        data={tips}
        activeDotStyle={styles.activeDot}
        dotStyle={styles.dotStyle}
        containerStyle={styles.dotsContainer}
        onPress={onPressPagination}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    alignItems: "center",
  },
  dotsContainer: {
    gap: 15,
    marginTop: -30,
    height: 2,
  },
  activeDot: {
    backgroundColor: Colors.locro,
  },
  dotStyle: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 50,
  },
});
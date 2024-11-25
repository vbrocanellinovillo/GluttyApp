import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { Colors } from "../../constants/colors";
import PostItem from "../Community/PostItem";

export default function PostCarousel({ height, width, posts }) {
  const progress = useSharedValue(0);
  const carouselRef = useRef();

  const onPressPagination = (index) => {
    carouselRef.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View style={{ height }}>
      <Carousel
        ref={carouselRef}
        loop
        autoPlay
        pagingEnabled
        data={posts}
        width={width}
        scrollAnimationDuration={1500}
        onProgressChange={progress}
        renderItem={({ item }) => <PostItem curved post={item} />}
      />
      <Pagination.Basic
        progress={progress}
        data={posts}
        activeDotStyle={styles.activeDot}
        dotStyle={styles.dotStyle}
        containerStyle={styles.dotsContainer}
        onPress={onPressPagination}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dotsContainer: {
    position: "absolute",
    bottom: 10,
    height: 20,
    gap: 10,
    backgroundColor: "#ddd",
    justifyContent: "center",
    padding: 5,
    borderRadius: 20,
  },

  activeDot: {
    backgroundColor: Colors.locro,
  },

  dotStyle: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 50,
  },
});

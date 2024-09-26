import { View, StyleSheet } from "react-native";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import Tip from "./Tip";
import { useSharedValue } from "react-native-reanimated";
import { useRef } from "react";
import { Colors } from "../../constants/colors";

export default function TipsCarousel({ tips }) {
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
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        width={300}
        pagingEnabled
        data={tips}
        scrollAnimationDuration={800}
        onProgressChange={progress}
        renderItem={({ item }) => <Tip tip={item} key={item.id} />}
        mode="horizontal-stack"
        modeConfig={{
          moveSize: 10,
          stackInterval: 500,
          scaleInterval: 0.08,
          rotateZDeg: 60,
          snapDirection: "left",
        }}
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
    alignItems: "center",
    height: 400,
  },

  dotsContainer: {
    gap: 18,
    marginTop: 10,
    height: 50,
  },

  activeDot: {
    backgroundColor: Colors.locro,
  },

  dotStyle: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 50,
  },
});
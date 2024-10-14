import { useRef } from "react";
import { Image, StyleSheet, View } from "react-native";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import WelcomeMessage from "./WelcomeMessage";
import { useSharedValue } from "react-native-reanimated";
import { Colors } from "../../constants/colors";

const banners = [
  {
    id: 1,
    type: "message",
  },
  {
    id: 2,
    type: "banner",
    image:
      "https://res.cloudinary.com/dksmkvi49/image/upload/v1728942394/bot_banner_gd8xw0.webp",
  },
  {
    id: 3,
    type: "banner",
    image:
      "https://res.cloudinary.com/dksmkvi49/image/upload/v1728942407/maps_banner_xmv75a.webp",
  },
  {
    id: 4,
    type: "banner",
    image:
      "https://res.cloudinary.com/dksmkvi49/image/upload/v1728942423/scanner_banner_hn1bwk.webp",
  },
  {
    id: 5,
    type: "banner",
    image:
      "https://res.cloudinary.com/dksmkvi49/image/upload/v1728942431/studies_banner_iv3vrn.webp",
  },
];

export default function BannersCarousel({ height, width }) {
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
        data={banners}
        width={width}
        scrollAnimationDuration={1500}
        onProgressChange={progress}
        renderItem={({ item }) => (
          <>
            {item.type === "banner" ? (
              <Image
                key={item.id}
                source={{ uri: item.image }}
                style={styles.image}
              />
            ) : (
              <WelcomeMessage />
            )}
          </>
        )}
      />
      <Pagination.Basic
        progress={progress}
        data={banners}
        activeDotStyle={styles.activeDot}
        dotStyle={styles.dotStyle}
        containerStyle={styles.dotsContainer}
        onPress={onPressPagination}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 20,
  },

  dotsContainer: {
    position: "absolute",
    bottom: 10,
    height: 20,
    gap: 10,
    backgroundColor: "#ddd",
    justifyContent: "center",
    padding: 5,
    borderRadius: 20
  },

  activeDot: {
    backgroundColor: Colors.locro,
  },

  dotStyle: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 50,
  },
});

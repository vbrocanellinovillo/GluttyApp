import { View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import PostItem from "../Community/PostItem";

export default function PostCarousel({ height, width, posts }) {
  return (
    <View style={{ height }}>
      <Carousel
        loop
        autoPlay
        data={posts}
        width={width}
        scrollAnimationDuration={1500}
        renderItem={({ item }) => <PostItem curved post={item} />}
      />
    </View>
  );
}

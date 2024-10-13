import { View } from "react-native";
import PostSkeleton from "./PostSkeleton";

export default function PostsSkeleton({ curved, length = 10, style }) {
  const items = Array.from({ length }, (_, index) => `Item ${index + 1}`);

  return (
    <View style={style}>
      {items.map((item) => (
        <PostSkeleton key={item} curved={curved} />
      ))}
    </View>
  );
}

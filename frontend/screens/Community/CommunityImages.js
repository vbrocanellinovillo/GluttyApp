import { Dimensions, StyleSheet, Pressable } from "react-native";
import ImagesCarousel from "../../components/Community/ImagesCarousel";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import PostInfoContainer from "../../components/Community/PostInfoContainer";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function CommunityImages({ navigation, route }) {
  const images = route.params?.images;
  const postInfo = route.params?.postInfo;

  const opacity = useSharedValue(1);

  function goBack() {
    navigation.goBack();
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value),
    };
  });

  function handlePress() {
    if (opacity.value === 1) {
      opacity.value = 0;
    } else {
      opacity.value = 1;
    }
  }

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Pressable style={styles.icon} onPress={goBack}>
        <Animated.View style={animatedStyle}>
          <Ionicons name="close" size={30} color={Colors.mJordan} />
        </Animated.View>
      </Pressable>
      <ImagesCarousel images={images} width={width} height={height * 0.6} />
      <PostInfoContainer
        likes={postInfo?.likes}
        comments={postInfo?.comments}
        faved={postInfo?.faved}
        liked={postInfo?.liked}
        id={postInfo?.id}
        style={[styles.info, animatedStyle]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: height * 0.2,
  },

  icon: {
    position: "absolute",
    top: height * 0.1,
    left: width * 0.01,
  },

  info: {
    marginTop: height * 0.05,
    justifyContent: "space-around",
  },
});

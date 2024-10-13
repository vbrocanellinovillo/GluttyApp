import { StyleSheet, View } from "react-native";
import { Post } from "../../models/Post";
import PostItem from "./PostItem";
import BlurError from "../UI/BlurError";
import { getRandomDate } from "../../utils/dateFunctions";

const POSTS = [
  new Post(
    1,
    "Caspar Ogborn",
    "caspar_ogborn",
    "https://picsum.photos/seed/2/300",
    "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.",
    ["Chevrolet", "Sedan", "Electric"],
    getRandomDate(new Date(2020, 0, 1), new Date(2024, 9, 7)),
    892,
    961
  ),
  new Post(
    2,
    "Annaliese Bellino",
    "annaliese_bellino",
    "https://picsum.photos/seed/2/300",
    "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
    ["Hyundai", "SUV", "Hybrid"],
    getRandomDate(new Date(2020, 0, 1), new Date(2024, 9, 7)),
    429,
    414
  ),
  new Post(
    3,
    "Bentley Bardell",
    "bentley_bardell",
    "https://picsum.photos/seed/2/300",
    "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
    ["Hyundai", "Crossover", "Manual"],
    getRandomDate(new Date(2020, 0, 1), new Date(2024, 9, 7)),
    603,
    95
  ),
];

export default function ErrorPosts({
  curved,
  postsStyle,
  style,
  containerStyle,
  textStyle,
  iconStyle,
}) {
  const backdropPosts = (
    <View style={postsStyle}>
      {POSTS.map((post) => (
        <PostItem key={post.id} post={post} curved={curved} />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <BlurError
        backdrop={backdropPosts}
        style={[styles.blurred, style]}
        containerStyle={[styles.blurredContainer, containerStyle]}
        textStyle={[styles.textStyle, textStyle]}
        iconStyle={[styles.iconStyle, iconStyle]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },

  blurred: {
    justifyContent: "center",
    alignItems: "center",
  },

  blurredContainer: {
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 30,
  },

  textStyle: {
    textAlign: "center",
    fontSize: 24,
  },

  iconStyle: {
    fontSize: 45,
  },
});

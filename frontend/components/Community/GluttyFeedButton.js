import { Image, StyleSheet, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { Colors } from "../../constants/colors";
import Button from "../UI/Controls/Button";
import { useNavigation } from "@react-navigation/native";
import { gluttyFeed } from "../../constants/glutty";

export default function GluttyFeedButton() {
  const navigation = useNavigation();

  function navigateFeed() {
    navigation.navigate("CommunityTopTabs");
  }

  return (
    <View style={styles.container}>
      <Image
        source={{uri: gluttyFeed}}
        style={styles.image}></Image>
      
      <Button
        style={styles.button}
        textStyle={styles.buttonText}
        rightIcon="arrow-forward-circle-sharp"
        iconColor={Colors.whiteJordan}
        iconSize={28}
        onPress={navigateFeed}
      >
        Ingresa!
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -15,
  },

  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  text: {
    fontSize: 36,
    fontWeight: "700",
    color: Colors.mJordan,
  },

  glutty: {
    color: Colors.mJordan,
  },

  feed: {
    color: Colors.locro,
  },

  button: {
    backgroundColor: Colors.mJordan,
    borderRadius: 30,
    gap: 10,
    alignItems: "center",
  },

  buttonText: {
    color: Colors.whiteJordan,
    fontSize: 18,
  },
  image: {
    width: 200,
    height: 80,
    objectFit: "contain",
    marginLeft: 8,
    marginTop: 8,
    marginBottom: -5,
  },
});

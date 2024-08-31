import { Image, Pressable, StyleSheet, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";
import { Colors } from "../../constants/colors";

export default function SearchResultItem({ item }) {
  return (
    <Pressable style={styles.container}>
      <Image
        source={{ uri: "https://pbs.twimg.com/media/FkRmDFdXwAcUZGB.jpg" }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <TextCommonsMedium style={styles.commerceName}>
          Mc Donald's
        </TextCommonsMedium>
        <TextCommonsRegular style={styles.infoText}>
          Mc Donald's Centro - Av Cólon
        </TextCommonsRegular>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    flexDirection: "row",
    gap: 10,
  },

  image: {
    width: 60,
    height: 60,
    objectFit: "contain",
    borderRadius: 30,
  },

  infoContainer: {
    paddingVertical: 4,
    gap: 4,
  },

  commerceName: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.mJordan,
  },

  infoText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#777",
  },
});

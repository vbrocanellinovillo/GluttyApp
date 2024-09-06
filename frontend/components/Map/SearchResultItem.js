import { Image, Pressable, StyleSheet, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";
import { Colors } from "../../constants/colors";
import { userGlutty } from "../../constants/glutty";
import * as Haptics from "expo-haptics";
import { LATITUDE_DELTA, LONGITUDE_DELTA } from "../../constants/map";

export default function SearchResultItem({ item, onPress }) {
  const hasSeparatedKitchen = item.separated_kitchen;

  function handlePress() {
    Haptics.selectionAsync();
    const coordinate = {
      latitude: item.latitude,
      longitude: item.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
    const location = { id: item.id, coordinate: coordinate };
    onPress(location);
  }

  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? [styles.container, styles.pressed] : styles.container
      }
      onPress={handlePress}
    >
      <Image
        source={{ uri: item.profile_picture || userGlutty }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <TextCommonsMedium style={styles.commerceName}>
          {item.commerce_name}
        </TextCommonsMedium>
        <TextCommonsRegular style={styles.infoText}>
          {item.branch_name} - {item.address}
        </TextCommonsRegular>
        {hasSeparatedKitchen && (
          <View style={styles.extraInfo}>
            <TextCommonsMedium style={styles.extraText}>
              Con cocina separada
            </TextCommonsMedium>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    flexDirection: "row",
    gap: 10,
  },

  pressed: {
    opacity: 0.7,
  },

  image: {
    width: 70,
    height: 70,
    objectFit: "contain",
    borderRadius: 35,
  },

  infoContainer: {
    gap: 6,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingRight: 80,
  },

  commerceName: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.mJordan,
  },

  infoText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#777",
  },

  extraInfo: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 20,
    backgroundColor: "green",
    marginTop: 4,
    minWidth: 140,
  },

  extraText: {
    color: Colors.whiteGreen,
  },
});

import { StyleSheet, View, Image } from "react-native";
import { thumbGlutty } from "../../constants/glutty";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { Colors } from "../../constants/colors";
import { Divider } from "react-native-paper";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";
import { Ionicons } from "@expo/vector-icons";

const PHOTOS = [
  { photo: "http://dummyimage.com/227x100.png/5fa2dd/ffffff" },
  { photo: "http://dummyimage.com/144x100.png/dddddd/000000" },
  { photo: "http://dummyimage.com/243x100.png/ff4444/ffffff" },
  { photo: "http://dummyimage.com/220x100.png/dddddd/000000" },
  { photo: "http://dummyimage.com/178x100.png/dddddd/000000" },
  { photo: "http://dummyimage.com/149x100.png/cc0000/ffffff" },
  { photo: "http://dummyimage.com/236x100.png/ff4444/ffffff" },
  { photo: "http://dummyimage.com/239x100.png/ff4444/ffffff" },
];

export default function BranchDetails({ branch }) {
  return (
    <View style={styles.branch}>
      <View style={styles.imageRow}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: thumbGlutty }} style={styles.image} />
        </View>
      </View>
      <TextCommonsMedium style={styles.commerceName}>
        Mc Donalds
      </TextCommonsMedium>
      <View style={styles.details}>
        <Divider />
        <View>
          <TextCommonsMedium style={styles.title}>Ubicación</TextCommonsMedium>
          <TextCommonsRegular style={styles.text}>
            2972 Westheimer Rd. Santa Ana, Illinois 85486
          </TextCommonsRegular>
        </View>
        <Divider />
        <View>
          <TextCommonsMedium style={styles.title}>Fotos</TextCommonsMedium>
          <View style={styles.photos}>
            {PHOTOS.map((photo, index) => (
              <Image
                style={styles.photo}
                source={{ uri: photo.photo }}
                key={index}
              />
            ))}
          </View>
        </View>
        <Divider />
        <View>
          <TextCommonsMedium style={styles.title}>
            Servicios ofrecidos
          </TextCommonsMedium>
          <View style={styles.service}>
            <Ionicons name="checkmark-circle" size={25} color="green" />
            <TextCommonsRegular style={styles.text}>
              Cocina separada
            </TextCommonsRegular>
          </View>
          <View style={styles.service}>
            <Ionicons name="checkmark-circle" size={25} color="green" />
            <TextCommonsRegular style={styles.text}>
              Solo Take Away
            </TextCommonsRegular>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  branch: {
    paddingHorizontal: 20,
    gap: 10,
  },

  imageRow: {
    flexDirection: "row",
    justifyContent: "center",
  },

  imageContainer: {
    width: 120,
    height: 120,
    backgroundColor: "white",
    padding: 14,
    borderRadius: 60,
    marginTop: -60,
    shadowColor: "black",
    shadowRadius: 5,
    shadowOpacity: 0.5,
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },

  commerceName: {
    textAlign: "center",
    fontSize: 28,
    color: Colors.mJordan,
  },

  details: {
    marginTop: 10,
    gap: 20,
  },

  title: {
    color: "#aaa",
    fontSize: 20,
    marginBottom: 6,
  },

  text: {
    fontSize: 16,
    color: Colors.mJordan,
  },

  photos: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  photo: {
    width: 100,
    height: 100,
    objectFit: "fill",
    flexBasis: "22%",
  },

  service: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 4
  },
});

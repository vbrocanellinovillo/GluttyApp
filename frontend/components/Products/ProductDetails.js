import { Image, Pressable, StyleSheet, View } from "react-native";
import { thumbGlutty } from "../../constants/glutty";
import { Colors } from "../../constants/colors";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";
import { Ionicons } from "@expo/vector-icons";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";

export default function ProductDetails({ product, onDismiss }) {
  return (
    <Pressable style={styles.container} onPress={onDismiss}>
      <View style={[styles.detail, styles.shadow]}>
        <TextCommonsMedium style={styles.title}>
          {product.name.toUpperCase()}
        </TextCommonsMedium>
        <View
          style={[styles.imageContainer, styles.shadow, styles.widthElements]}
        >
          <Image source={{ uri: thumbGlutty }} style={styles.image} />
        </View>
        <View style={[styles.tag, styles.shadow, styles.widthElements]}>
          <TextCommonsRegular style={styles.tagText}>
            Producto Apto
          </TextCommonsRegular>
          <Ionicons name="checkmark" color="white" size={26} />
        </View>
        <View style={[styles.info, styles.shadow, styles.widthElements]}>
          <View style={styles.topInfo}>
            <View>
              <TextCommonsMedium style={styles.infoTitle}>
                Marca
              </TextCommonsMedium>
              <TextCommonsRegular style={styles.infoText}>
                {product.brand}
              </TextCommonsRegular>
            </View>
            <View>
              <TextCommonsMedium style={styles.infoTitle}>
                Tipo
              </TextCommonsMedium>
              <TextCommonsRegular style={styles.infoText}>
                {product.type}
              </TextCommonsRegular>
            </View>
          </View>
          <View>
            <TextCommonsMedium style={styles.infoTitle}>RNPA</TextCommonsMedium>
            <TextCommonsRegular style={styles.infoText}>
              {product.rnpa}
            </TextCommonsRegular>
          </View>
          <View style={styles.description}>
            <TextCommonsMedium style={styles.infoTitle}>
              Descripción
            </TextCommonsMedium>
            <TextCommonsRegular style={styles.infoText}>
              {product.description}
            </TextCommonsRegular>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    paddingTop: 120,
  },

  detail: {
    backgroundColor: Colors.pielcita,
    alignItems: "center",
    borderRadius: 20,
    gap: 10,
    paddingVertical: 20,
  },

  title: {
    fontSize: 30,
    paddingBottom: 14,
  },

  imageContainer: {
    height: 130,
    backgroundColor: "white",
    borderRadius: 12,
  },

  widthElements: {
    width: "90%",
  },

  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    borderRadius: 12,
  },

  tag: {
    backgroundColor: "green",
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: "row",
    gap: 10,
  },

  tagText: {
    fontSize: 24,
    color: "white",
  },

  info: {
    borderRadius: 12,
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 12,
    gap: 10,
  },

  topInfo: {
    flexDirection: "row",
    gap: 70,
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: "500",
  },

  infoText: {
    fontSize: 13,
  },

  description: {
    marginTop: 10,
  },
});

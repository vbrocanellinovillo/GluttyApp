import { Image, Pressable, StyleSheet, View } from "react-native";
import { thumbGlutty } from "../../constants/glutty";
import { Colors } from "../../constants/colors";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";
import { Ionicons } from "@expo/vector-icons";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import DetailWithTitle from "../UI/DetailWithTitle";

export default function ProductDetails({ product, onDismiss }) {
  return (
    <Pressable style={styles.container} onPress={onDismiss}>
      <View style={[styles.detail, styles.shadow]}>
        <TextCommonsMedium style={styles.title}>
          {product.name.toUpperCase()}
        </TextCommonsMedium>
        <View style={[styles.imageContainer, styles.shadow]}>
          <Image source={{ uri: thumbGlutty }} style={styles.image} />
        </View>
        <View style={[styles.tag, styles.shadow]}>
          <TextCommonsRegular style={styles.tagText}>
            Producto Apto
          </TextCommonsRegular>
          <Ionicons name="checkmark" color="white" size={26} />
        </View>
        <View style={styles.shadow}>
          <View style={styles.info}>
            <View style={styles.topInfo}>
              <DetailWithTitle
                title="Marca"
                containerStyle={styles.topInfoItem}
              >
                {product.brand}
              </DetailWithTitle>
              <DetailWithTitle title="RNPA" containerStyle={styles.topInfoItem}>
                {product.rnpa}
              </DetailWithTitle>
            </View>
            <DetailWithTitle title="Tipo Producto">
              {product.type}
            </DetailWithTitle>
            <DetailWithTitle
              title="Descripción"
              containerStyle={styles.description}
            >
              {product.description}
            </DetailWithTitle>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 140,
  },

  detail: {
    backgroundColor: Colors.pielcita,
    borderRadius: 20,
    gap: 10,
    padding: 20,
  },

  title: {
    fontSize: 23,
    fontWeight: "600",
    textAlign: "center",
  },

  imageContainer: {
    height: 130,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom:10,
    paddingBottom:5,
    paddingTop:5,
  },

  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
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
    paddingVertical: 8,
    paddingHorizontal: 20,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },

  tagText: {
    fontSize: 24,
    color: "white",
  },

  info: {
    borderRadius: 12,
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 12,
    gap: 10,
    overflow: "hidden",
  },

  topInfo: {
    flexDirection: "row",
    gap: 50,
    overflow: "hidden",
    marginBottom: 4,
    
  },

  topInfoItem: {
    flex: 1,
  },

  description: {
    marginTop: 10,
  },
});

import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";
import { Colors } from "../../constants/colors";
import { thumbGlutty } from "../../constants/glutty";
import { Ionicons } from "@expo/vector-icons";
import DetailWithTitle from "../UI/DetailWithTitle";
import { useEffect, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function ScannedProduct({ product }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);

  const rotateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: withSpring(`${rotate.value}deg`, { stiffness: 300 }) },
      ],
    };
  });

  const opacityStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(opacity.value),
    };
  });

  useEffect(() => {
    if (isExpanded) {
      rotate.value = 180;
      opacity.value = 1
    } else {
      rotate.value = 0;
      opacity.value = 0
    }
  }, [isExpanded]);

  function toggleDetails() {
    setIsExpanded(!isExpanded);
  }

  return (
    <View style={styles.productDetail}>
      <TextCommonsMedium style={styles.brand}>Arcor</TextCommonsMedium>
      <TextCommonsRegular style={styles.name}>
        Jugo de naranja
      </TextCommonsRegular>
      <Image source={{ uri: thumbGlutty }} style={styles.image} />

      <TouchableOpacity onPress={toggleDetails}>
        <Animated.View style={[styles.detailsIcon, rotateStyle]}>
          <Ionicons name="chevron-down" size={24} color={Colors.mJordan} />
        </Animated.View>
      </TouchableOpacity>
      {isExpanded && (
        <Animated.View style={[styles.expandedDetails, opacityStyle]}>
          <View style={styles.detailsRow}>
            <DetailWithTitle title="RNPA">354473513-X</DetailWithTitle>
            <DetailWithTitle title="Tipo Producto">
              Saskatoon Berries - Frozen
            </DetailWithTitle>
          </View>
          <DetailWithTitle title="Descripción">
            Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.
            Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.,
          </DetailWithTitle>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  productDetail: {
    width: 300,
    height: "100%",
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    alignItems: "center",
    paddingVertical: 10,
    overflow: "hidden",
  },

  image: {
    width: 130,
    height: 130,
    objectFit: "contain",
    marginLeft: 10
  },

  brand: {
    fontSize: 16,
    color: "#aaa",
  },

  name: {
    fontSize: 18,
    color: Colors.mJordan,
  },

  detailsIcon: {
    width: "100%",
    alignItems: "center",
  },

  expandedDetails: {
    marginTop: 10,
    gap: 10,
    paddingHorizontal: 10,
  },

  detailsRow: {
    flexDirection: "row",
    gap: 30,
  },
});

import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";
import { Colors } from "../../constants/colors";
import { thumbGlutty } from "../../constants/glutty";
import { Ionicons } from "@expo/vector-icons";
import DetailWithTitle from "../UI/DetailWithTitle";
import { useEffect, useState } from "react";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import DetailContainer from "./DetailContainer";

export default function ScannedProductDetails({ product }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const rotate = useSharedValue(0);

  const rotateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: withSpring(`${rotate.value}deg`, { stiffness: 300 }) },
      ],
    };
  });

  useEffect(() => {
    if (isExpanded) {
      rotate.value = 180;
    } else {
      rotate.value = 0;
    }
  }, [isExpanded]);

  function toggleDetails() {
    setIsExpanded(!isExpanded);
  }

  return (
    <DetailContainer style={styles.container}>
      <TextCommonsMedium style={styles.brand}>
        {product.brand}
      </TextCommonsMedium>
      <TextCommonsRegular style={styles.name}>
        {product.name}
      </TextCommonsRegular>
      <Image source={{ uri: thumbGlutty }} style={styles.image} />
      <TouchableOpacity onPress={toggleDetails}>
        <Animated.View style={[styles.detailsIcon, rotateStyle]}>
          <Ionicons name="chevron-down" size={24} color={Colors.mJordan} />
        </Animated.View>
      </TouchableOpacity>
      {isExpanded && (
        <Animated.View
          style={styles.expandedDetails}
          entering={FadeIn}
          exiting={FadeOut}
        >
          <View style={styles.detailsRow}>
            <DetailWithTitle title="RNPA">{product.rnpa}</DetailWithTitle>
            <DetailWithTitle title="Tipo Producto">
              {product.type}
            </DetailWithTitle>
          </View>
          <DetailWithTitle title="Descripción">
            {product.description}
          </DetailWithTitle>
        </Animated.View>
      )}
    </DetailContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  image: {
    width: 130,
    height: 130,
    objectFit: "contain",
    marginLeft: 10,
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

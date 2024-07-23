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
import DetailContainer from "./DetailContainer";
import ScanYourProduct from "./ScanYourProduct";
import ScannerLoading from "../UI/Loading/ScannerLoading";

export default function ScannedProduct({ product, isLoading }) {
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
      opacity.value = 1;
    } else {
      rotate.value = 0;
      opacity.value = 0;
    }
  }, [isExpanded]);

  function toggleDetails() {
    setIsExpanded(!isExpanded);
  }

  if (isLoading) return <ScannerLoading />;

  if (!product) return <ScanYourProduct />;

  return (
    <DetailContainer>
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
        <Animated.View style={[styles.expandedDetails, opacityStyle]}>
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

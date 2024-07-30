import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";
import { Colors } from "../../constants/colors";
import { sadGlutty, thumbGlutty } from "../../constants/glutty";
import { Ionicons } from "@expo/vector-icons";
import DetailWithTitle from "../UI/DetailWithTitle";
import { useEffect } from "react";
import Animated, {
  SlideInLeft,
  SlideOutLeft,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import DetailContainer from "./DetailContainer";

export default function ScannedProductDetails({
  scannedData,
  onExpand,
  isContracted,
}) {
  const rotate = useSharedValue(0);

  const rotateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: withSpring(`${rotate.value}deg`, { stiffness: 300 }) },
      ],
    };
  });

  useEffect(() => {
    if (isContracted) {
      rotate.value = 180;
    } else {
      rotate.value = 0;
    }
  }, [isContracted]);

  function toggleDetails() {
    onExpand();
  }

  const isApt = scannedData.isApt;
  const message = scannedData.message;
  const product = scannedData.product;

  return (
    <DetailContainer style={styles.container}>
      <TextCommonsMedium style={styles.brand}>
        {product.brand}
      </TextCommonsMedium>
      <TextCommonsRegular style={styles.name}>
        {product.name}
      </TextCommonsRegular>
      <Image
        source={{ uri: isApt ? thumbGlutty : sadGlutty }}
        style={styles.image}
      />
      <View style={styles.messageContainer}>
        <Ionicons name="checkmark-circle" color="green" size={22} />
        <TextCommonsMedium style={styles.message}>
          {message}
        </TextCommonsMedium>
      </View>
      {isApt && (
        <TouchableOpacity onPress={toggleDetails}>
          <Animated.View style={[styles.detailsIcon, rotateStyle]}>
            <Ionicons name="chevron-down" size={24} color={Colors.mJordan} />
          </Animated.View>
        </TouchableOpacity>
      )}
      {isContracted && (
        <Animated.View
          style={styles.expandedDetails}
          entering={SlideInLeft}
          exiting={SlideOutLeft}
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

  messageContainer: {
    flexDirection: "row",
    marginBottom: 7,
    gap: 5,
    justifyContent: "center",
    alignItems: "center"
  },

  message: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.mJordan
  },

  expandedDetails: {
    marginTop: 10,
    gap: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
    flex: 1,
  },

  detailsRow: {
    flexDirection: "row",
    gap: 30,
  },
});

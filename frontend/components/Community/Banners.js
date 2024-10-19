import { Dimensions, Image, StyleSheet, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { Colors } from "../../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { gluttyGreeting } from "../../constants/glutty";
import { useSelector } from "react-redux";
import BannersCarousel from "./BannersCarousel";
import { useState } from "react";

const bannersHeight = Dimensions.get("window").height * 0.25;

export default function Banners() {
  const name = useSelector((state) => state.auth.userData?.first_name);

  const [width, setWidth] = useState(undefined);

  function findDimentions({ nativeEvent }) {
    setWidth(nativeEvent.layout.width);
  }

  return (
    <View style={styles.shadow}>
      <LinearGradient
        style={styles.container}
        colors={[Colors.humita, Colors.locro]}
        onLayout={findDimentions}
      >
        {width && <BannersCarousel height={bannersHeight} width={width} />}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    borderRadius: 20,
  },

  container: {
    backgroundColor: Colors.locro,
    borderRadius: 20,
  },
});

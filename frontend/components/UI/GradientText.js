import { Text } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../constants/colors";
import TextCommonsMedium from "./FontsTexts/TextCommonsMedium";

export default function GradientText(props) {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        colors={[Colors.mJordan, Colors.locro]}
        start={[0, 0]}
        end={[1, 0]}
      >
        <TextCommonsMedium {...props} style={[props.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  );
}

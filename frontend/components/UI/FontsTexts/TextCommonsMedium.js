import { useFonts } from "expo-font";
import { Text } from "react-native";

export default function TextCommonsMedium(props) {
  const [loaded, error] = useFonts({
    "TT-Commons-Medium": require("../../../assets/fonts/TT Commons Medium.otf"),
  });

  return (
    <Text
      style={[props.style, { fontFamily: "TT-Commons-Medium" }]}
      {...props}
    />
  );
}

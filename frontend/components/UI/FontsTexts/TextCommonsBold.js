import { useFonts } from "expo-font";
import { Text } from "react-native";

export default function TextCommonsBold(props) {
  const [loaded, error] = useFonts({
    "TT-Commons-Bold": require("../../../assets/fonts/TT Commons Bold.otf"),
  });

  return (
    <Text style={[props.style, { fontFamily: "TT-Commons-Bold" }]} {...props} />
  );
}

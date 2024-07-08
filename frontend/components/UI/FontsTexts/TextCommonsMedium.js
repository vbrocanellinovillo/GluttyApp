import { useFonts } from "expo-font";
import { Text } from "react-native";

export default function TextCommonsMedium({ children, style }) {
  const [loaded, error] = useFonts({
    "TT-Commons-Medium": require("../../../assets/fonts/TT Commons Medium.otf"),
  });

  return (
    <Text style={[style, { fontFamily: "TT-Commons-Medium" }]}>{children}</Text>
  );
}

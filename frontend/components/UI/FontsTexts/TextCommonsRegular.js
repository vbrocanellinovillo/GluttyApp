import { useFonts } from "expo-font";
import { Text } from "react-native";

export default function TextCommonsRegular({ children, style }) {
  const [loaded, error] = useFonts({
    "TT-Commons-Regular": require("../../../assets/fonts/TT Commons Regular.otf"),
  });

  return (
    <Text style={[style, { fontFamily: "TT-Commons-Regular" }]}>
      {children}
    </Text>
  );
}

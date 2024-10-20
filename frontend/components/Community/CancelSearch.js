import { Pressable, StyleSheet, View } from "react-native";
import Searchbar from "../UI/Controls/Searchbar";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import Animated from "react-native-reanimated";
import { searchbarStyle } from "../../constants/community";
import { Colors } from "../../constants/colors";
import * as Haptics from "expo-haptics";

export default function CancelSearch({
  text = "Cancelar",
  onCanel,
  onChange,
  onClear,
  width,
  value,
}) {
  function handleChange(text) {
    onChange && onChange(text);
  }

  function handleCancel() {
    Haptics.selectionAsync();
    onCanel && onCanel();
  }

  return (
    <View style={styles.container}>
      <Animated.View style={width}>
        <Searchbar
          onChange={handleChange}
          onClear={onClear}
          focused={true}
          style={searchbarStyle}
          value={value}
        />
      </Animated.View>
      <Pressable
        onPress={handleCancel}
        style={({ pressed }) =>
          pressed
            ? [styles.textContainer, styles.pressed]
            : [styles.textContainer]
        }
      >
        <TextCommonsMedium style={styles.text}>{text}</TextCommonsMedium>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
  },

  textContainer: {
    justifyContent: "center",
    paddingBottom: 20,
  },

  pressed: {
    opacity: 0.8,
  },

  text: {
    fontSize: 22,
    color: Colors.mJordan,
  },
});

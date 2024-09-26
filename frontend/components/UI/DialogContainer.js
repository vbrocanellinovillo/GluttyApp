import { StyleSheet, View, TouchableOpacity } from "react-native";
import TextCommonsMedium from "./FontsTexts/TextCommonsMedium";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import * as Haptics from "expo-haptics";

export default function DialogContainer({
  children,
  containerStyle,
  title,
  titleStyle,
  onDismiss,
  headerStyle,
  iconStyle,
}) {
  function handleClose() {
    Haptics.selectionAsync();
    onDismiss();
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {title ? (
        <View style={[styles.header, headerStyle]}>
          <TextCommonsMedium style={[styles.title, titleStyle]}>
            {title}
          </TextCommonsMedium>
          <TouchableOpacity onPress={handleClose}>
            <Ionicons
              name="close"
              color={Colors.mJordan}
              size={28}
              style={iconStyle}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={handleClose} style={styles.iconRight}>
          <Ionicons
            name="close"
            color={Colors.mJordan}
            size={28}
            style={iconStyle}
          />
        </TouchableOpacity>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    gap: 36,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 7,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "500",
    color: Colors.mJordan,
  },

  iconRight: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
  },
});

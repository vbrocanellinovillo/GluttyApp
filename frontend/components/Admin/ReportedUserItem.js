import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { Colors } from "../../constants/colors";
import ReportedUserInfo from "./ReportedUserInfo";
import ReportsNumber from "./ReportsNumber";
import * as Haptics from "expo-haptics";

const ReportedUserItem = ({ containerStyle, reportedUser, onPress }) => {
  function handlePress() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress && onPress();
  }
  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [styles.container, styles.pressed, containerStyle]
          : [styles.container, containerStyle]
      }
      onPress={handlePress}
    >
      <View style={styles.section}>
        <TextCommonsRegular style={styles.reportedUser}>
          Usuario reportado!
        </TextCommonsRegular>
        <ReportsNumber number={reportedUser?.reportsNumber} />
      </View>
      <View style={styles.section}>
        <ReportedUserInfo
          name={reportedUser?.name}
          username={reportedUser?.username}
          picture={reportedUser?.picture}
        />
        <EvilIcons name="chevron-right" size={30} color={Colors.mJordan} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ddd",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    gap: 6,
    shadowColor: "#aaa",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },

  pressed: {
    opacity: 0.6,
  },

  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  reportedUser: {
    fontSize: 14,
    color: Colors.mJordan,
  },
});

export default ReportedUserItem;

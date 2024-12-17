import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { Colors } from "../../constants/colors";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import { sleep } from "../../utils/utilFunctions";

const height = Dimensions.get("window").height;
const widht = Dimensions.get("window").width;

const RefreshButton = ({ onRefresh }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function handleRefresh() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsRefreshing(true);
    await sleep(1200);
    onRefresh && onRefresh();
    setIsRefreshing(false);
  }

  return (
    <FAB
      icon={() => <Ionicons name="refresh" size={24} color={Colors.vainilla} />}
      style={styles.button}
      color={Colors.vainilla}
      onPress={handleRefresh}
      loading={isRefreshing}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: height * 0.15,
    right: widht * 0.05,
    backgroundColor: Colors.humita,
  },
});

export default RefreshButton;

import React from "react";
import { StyleSheet, View, Image } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";

const ReportedUserInfo = ({ picture, name, username }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: picture,
        }}
        style={styles.image}
      />
      <View>
        <TextCommonsMedium style={styles.name}>{name}</TextCommonsMedium>
        <TextCommonsRegular style={styles.username}>
          @{username}
        </TextCommonsRegular>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  name: {
    fontSize: 16,
    fontWeight: "500",
  },

  username: {
    fontSize: 14,
    fontWeight: "300",
  },
});

export default ReportedUserInfo;

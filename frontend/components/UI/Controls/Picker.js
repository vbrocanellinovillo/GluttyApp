import WheelPicker from "@quidone/react-native-wheel-picker";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Portal } from "react-native-paper";
import TextCommonsRegular from "../FontsTexts/TextCommonsRegular";

export default function Picker({ data, value }) {
  const [visible, setVisible] = useState(false);

  function toggleVisible() {
    setVisible((prevVisible) => !prevVisible);
  }

  return (
    <>
      <Pressable onPress={toggleVisible}>
        <TextCommonsRegular>holis</TextCommonsRegular>
      </Pressable>
      {visible && (
        <Portal>
          <WheelPicker data={data} />
        </Portal>
      )}
    </>
  );
}

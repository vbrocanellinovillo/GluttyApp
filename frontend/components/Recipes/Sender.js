import { useSelector } from "react-redux";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";
import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export default function Sender({ isAnswer }) {
  const username = useSelector((state) => state.auth?.userData?.username);

  return (
    <>
      {isAnswer ? (
        <TextCommonsRegular
          style={[styles.textTop, styles.gluttyBotText, styles.gluttyText]}
        >
          Glutty
          <TextCommonsRegular
            style={[styles.textTop, styles.gluttyBotText, styles.botText]}
          >
            Bot
          </TextCommonsRegular>
        </TextCommonsRegular>
      ) : (
        <TextCommonsRegular style={[styles.textTop, styles.userText]}>
          Tu - {username}
        </TextCommonsRegular>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  textTop: {
    marginBottom: 4,
  },

  gluttyBotText: {
    fontSize: 22,
    fontWeight: "600",
    marginLeft: 10,
  },

  gluttyText: {
    color: Colors.mJordan,
  },

  botText: {
    color: Colors.locro,
  },

  userText: {
    fontSize: 18,
    marginRight: 16,
  },
});

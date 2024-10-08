import { useNavigation } from "@react-navigation/native";
import AddButton from "../UI/Controls/AddButton";

export default function AddPostButton({ style }) {
  const navigation = useNavigation();

  function navigateAddPost() {
    navigation.navigate("AddPost");
  }

  return (
    <AddButton
      withIcon={false}
      onPress={navigateAddPost}
      containerStyle={style}
    >
      Nuevo Post
    </AddButton>
  );
}

import { StyleSheet, Pressable, View } from "react-native";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import { useSelector } from "react-redux";
import { userAddGlutty, userGlutty } from "../../../constants/glutty";
import TextCommonsRegular from "../FontsTexts/TextCommonsRegular";

export default function UserImage({
  onPress,
  dimensions,
  style,
  isForm,
  source,
}) {
  const borderRadius = dimensions / 2;
  //const image =
  //  "https://pbs.twimg.com/profile_images/1605246082144997381/2H9mNjaD_400x400.jpg";
  const image = useSelector((state) => state.auth.image);

  function pressImageHandler() {
    Haptics.selectionAsync();
    onPress();
  }

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <Pressable
      onPress={pressImageHandler}
      style={({ pressed }) => (pressed ? [styles.pressed, style] : style)}
    >
      {image ? (
        <Image
          placeholder={{ blurhash }}
          source={source ? { uri: source } : image}
          style={[
            styles.userImage,
            { width: dimensions, height: dimensions, borderRadius },
          ]}
        />
      ) : isForm ? (
        <View style={styles.addPhotoContainer}>
          <Image
            source={{
              uri: userAddGlutty,
            }}
            style={[
              styles.userImage,
              { width: dimensions, height: dimensions },
            ]}
          />
          <TextCommonsRegular style={styles.addPhotoText}>
            Agregar foto de perfil (opcional)
          </TextCommonsRegular>
        </View>
      ) : (
        <Image
          source={{
            uri: userGlutty,
          }}
          style={[styles.userImage, { width: dimensions, height: dimensions }]}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  userImage: {
    objectFit: "cover",
  },

  pressed: {
    opacity: 0.8,
  },

  addPhotoContainer: {
    alignItems: "center",
  },

  addPhotoText: {
    fontSize: 17,
    fontWeight: "500",
    textAlign: "center",
  },
});

import { StyleSheet, Pressable, View, Text } from "react-native";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import { useDispatch, useSelector } from "react-redux";
import { userAddGlutty, userGlutty } from "../../../constants/glutty";
import TextCommonsRegular from "../FontsTexts/TextCommonsRegular";
import { authActions } from "../../../context/auth";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from "../../../constants/colors";

export default function UserImage({
  onPress,
  dimensions,
  style,
  isForm,
  source,
}) {
  const borderRadius = dimensions / 2;
  const image = useSelector((state) => state.auth.image);
  const dispatch = useDispatch();

  const imageLink = source
    ? { uri: source }
    : image
    ? image
    : isForm
    ? userAddGlutty
    : userGlutty;

  const showImage = (
    <Image
      placeholder={blurhash}
      source={imageLink}
      style={[
        styles.userImage,
        {
          width: dimensions,
          height: dimensions,
          borderRadius: imageLink !== userAddGlutty && borderRadius,
        },
      ]}
    />
  );

  function deletePicture(){
    dispatch(authActions.setImage(undefined));
  }

  function pressImageHandler() {
    Haptics.selectionAsync();
    onPress && onPress();
  }

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <Pressable
      onPress={pressImageHandler}
      style={({ pressed }) => (pressed ? [styles.pressed, style] : style)}
    >
      {isForm ? (
        <>
          
          <View style={styles.addPhotoContainer}>
            {showImage}
            <TextCommonsRegular style={styles.addPhotoText}>
              Agregar foto de perfil (opcional)
            </TextCommonsRegular>
          </View>
        </>
        
      ) : (
        showImage
      )}
      {(isForm && image) && (
          <Pressable onPress={deletePicture} style={styles.iconContainer}>
          <Icon name="close" size={15} color="white" />
        </Pressable>
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
    gap: 10,
  },

  addPhotoText: {
    fontSize: 17,
    fontWeight: "500",
    textAlign: "center",
  },
  iconContainer: {
    position: 'absolute',
    top: 5, 
    right: 50,
    backgroundColor: Colors.mJordan, 
    borderRadius: 40,
    padding: 8, 
    justifyContent: 'center',
    alignItems: 'center',
  },
});

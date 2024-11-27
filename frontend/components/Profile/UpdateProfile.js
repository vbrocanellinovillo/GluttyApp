import CommerceProfileForm from "./CommerceProfileForm";
import NoUserData from "./NoUserData";
import UserDataSkeleton from "../UI/Loading/UserDataSkeleton";
import UserProfileForm from "./UserProfileForm";
import UserImage from "../UI/UserImage/UserImage";
import { ScrollView, StyleSheet, View } from "react-native";
import DismissKeyboardContainer from "../UI/Forms/DismissKeyboadContainer";
import {
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
  PermissionStatus,
  useCameraPermissions,
  useMediaLibraryPermissions,
} from "expo-image-picker";
import { useRef, useState } from "react";
import BottomSheet from "@devvie/bottom-sheet";
import ImageSheetOptions from "../UI/UserImage/ImageSheetOptions";
import { Portal } from "react-native-paper";
import FormButtonsGroup from "../UI/Controls/FormButtonsGroup";

export default function UpdateProfile({
  isCommerce,
  onSubmit,
  userData,
  isFetching,
}) {
  // Manejo de la imagen
  const sheetRef = useRef();

  const [cameraPermissions, requestCameraPermissions] = useCameraPermissions();
  const [galleryPermissions, requestGalleryPermissions] =
    useMediaLibraryPermissions();

  const [takenImage, setTakenImage] = useState(undefined);

  async function checkPermissions(option) {
    if (option === "Take Photo") {
      if (cameraPermissions.status === PermissionStatus.GRANTED) {
        return true;
      }

      const response = await requestCameraPermissions();
      return response.granted;
    } else {
      if (galleryPermissions.status === PermissionStatus.GRANTED) {
        return true;
      }

      const response = await requestGalleryPermissions();
      return response.granted;
    }
  }

  async function selectImage(option) {
    sheetRef.current?.close();
    const permissionStatus = await checkPermissions(option);

    if (!permissionStatus) return;

    let imageResult;
    let options = {
      allowsEditing: true,
      mediaTypes: MediaTypeOptions.Images,
    };

    if (option === "Take Image") {
      imageResult = await launchCameraAsync(options);
    } else {
      imageResult = await launchImageLibraryAsync(options);
    }

    if (!imageResult.canceled) {
      setTakenImage(imageResult.assets[0]);
    }
  }

  function openImageOptions() {
    sheetRef.current?.open();
  }

  if (isFetching) {
    return <UserDataSkeleton />;
  }

  if (!userData && !isFetching) {
    return <NoUserData />;
  }

  function submitHandler(values) {
    values = { ...values, image: takenImage };
    onSubmit(values);
  }

  return (
    <DismissKeyboardContainer>
      <>
        <ScrollView contentInset={{ bottom: 150 }}>
          <View style={styles.imageContainer}>
            <UserImage
              dimensions={160}
              isForm
              onPress={openImageOptions}
              source={takenImage && takenImage.uri}
            />
          </View>
          {isCommerce ? (
            <CommerceProfileForm
              onSubmit={submitHandler}
              user={userData.user_data}
              commerce={userData.commerce_data}
            />
          ) : (
            <UserProfileForm
              onSubmit={submitHandler}
              user={userData.user_data}
              celiac={userData.celiac_data}
            />
          )}
          <FormButtonsGroup
            prev="Cancelar"
            next="Guardar"
            overallContainerStyle={styles.buttons}
          />
        </ScrollView>
        <Portal>
          <BottomSheet ref={sheetRef} height={200}>
            <ImageSheetOptions
              onTakeImage={selectImage.bind(this, "Take Image")}
              onPickImage={selectImage.bind(this, "Pick Image")}
            />
          </BottomSheet>
        </Portal>
      </>
    </DismissKeyboardContainer>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
  },

  buttons: {
    paddingHorizontal: 50,
  },
});

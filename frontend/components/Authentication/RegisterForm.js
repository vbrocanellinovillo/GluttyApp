import { ScrollView, StyleSheet, View } from "react-native";
import DismissKeyboardContainer from "../UI/Forms/DismissKeyboadContainer";
import { Colors } from "../../constants/colors";
import ButtonsOptions from "../UI/Controls/ButtonsOptions";
import { useRef, useState } from "react";
import UserRegister from "./UserRegister";
import CommerceRegister from "./CommerceRegister";
import Form from "../UI/Forms/Form";
import UserImage from "../UI/UserImage/UserImage";
import BottomSheet from "@devvie/bottom-sheet";
import ImageSheetOptions from "../UI/UserImage/ImageSheetOptions";
import {
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
  PermissionStatus,
  useCameraPermissions,
  useMediaLibraryPermissions,
} from "expo-image-picker";
import { useDispatch } from "react-redux";
import { authActions } from "../../context/auth";

const OPTIONS = [
  { id: 1, value: "Persona Celíaca" },
  { id: 2, value: "Comercio" },
];

export default function RegisterForm({ onSubmit }) {
  const [selectedOption, setSelectedOption] = useState(1);

  // Manejo de la imagen
  const sheetRef = useRef();

  const [cameraPermissions, requestCameraPermissions] = useCameraPermissions();
  const [galleryPermissions, requestGalleryPermissions] =
    useMediaLibraryPermissions();

  const [takenImage, setTakenImage] = useState(undefined);
  const dispatch = useDispatch();

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
      dispatch(authActions.setImage(imageResult.assets[0].uri));
    }
  }

  function openImageOptions() {
    sheetRef.current?.open();
  }

  function selectOption(id) {
    setSelectedOption(id);
  }

  function submitHandler(values, isCommerce) {
    values = { ...values, image: takenImage };
    onSubmit(values, isCommerce);
  }

  return (
    <DismissKeyboardContainer>
      <>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <UserImage
            dimensions={150}
            style={styles.userImage}
            isForm
            onPress={openImageOptions}
          />
          <Form>
            <View style={styles.buttonsOptions}>
              <ButtonsOptions
                options={OPTIONS}
                onSelect={selectOption}
                selectedColor={Colors.humita}
                defaultColor="white"
              />
            </View>
            {selectedOption == 1 && <UserRegister onSubmit={submitHandler} />}
            {selectedOption == 2 && (
              <CommerceRegister onSubmit={submitHandler} />
            )}
          </Form>
        </ScrollView>
        <BottomSheet ref={sheetRef} height={200}>
          <ImageSheetOptions
            onTakeImage={selectImage.bind(this, "Take Image")}
            onPickImage={selectImage.bind(this, "Pick Image")}
          />
        </BottomSheet>
      </>
    </DismissKeyboardContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
  },

  buttonsOptions: {
    marginBottom: 30,
  },

  userImage: {
    marginBottom: 30,
  },
});

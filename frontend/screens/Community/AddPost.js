import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Animated,
  TouchableWithoutFeedback,
  ScrollView,
  Text,
  Image,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TextCommonsMedium from "../../components/UI/FontsTexts/TextCommonsMedium";
import { Colors } from "../../constants/colors";
import BottomSheet from "@devvie/bottom-sheet";
import ImageSheetOptions from "../../components/UI/UserImage/ImageSheetOptions";
import {
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
  PermissionStatus,
  useCameraPermissions,
  useMediaLibraryPermissions,
} from "expo-image-picker";
import { createPost } from "../../services/communityService";
import { useSelector } from "react-redux";
import GluttyModal from "../../components/UI/GluttyModal";
import LoadingGlutty from "../../components/UI/Loading/LoadingGlutty";
import DismissKeyboardContainer from "../../components/UI/Forms/DismissKeyboadContainer";

export default function AddPost({ navigation }) {
  const [post, setPost] = useState("");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isTagInputFocused, setIsTagInputFocused] = useState(false);

  const keyboardHeight = useRef(new Animated.Value(0)).current;
  const inputTranslateY = useRef(new Animated.Value(0)).current;

  const sheetRef = useRef();
  const [cameraPermissions, requestCameraPermissions] = useCameraPermissions();
  const [galleryPermissions, requestGalleryPermissions] =
    useMediaLibraryPermissions();

  const token = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        if (isTagInputFocused) {
          Animated.parallel([
            Animated.timing(keyboardHeight, {
              toValue: 250,
              duration: 150,
              useNativeDriver: false,
            }),
            Animated.timing(inputTranslateY, {
              toValue: -250,
              duration: 150,
              useNativeDriver: false,
            }),
          ]).start();
        }
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        Animated.parallel([
          Animated.timing(keyboardHeight, {
            toValue: 0,
            duration: 150,
            useNativeDriver: false,
          }),
          Animated.timing(inputTranslateY, {
            toValue: 0,
            duration: 150,
            useNativeDriver: false,
          }),
        ]).start();
        setIsTagInputFocused(false); // Reset focus state
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [isTagInputFocused]);

  const handleTagInput = (text) => {
    if (text.includes(" ")) {
      if (currentTag.trim()) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag("");
    } else {
      setCurrentTag(text);
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const removeImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const openImageOptions = () => {
    Keyboard.dismiss();
    sheetRef.current?.open();
  };

  const selectImage = async (option) => {
    sheetRef.current?.close();
    const permissionStatus = await checkPermissions(option);

    if (!permissionStatus) return;

    const options = {
      allowsEditing: true,
      mediaTypes: MediaTypeOptions.Images,
    };

    const imageResult =
      option === "Take Image"
        ? await launchCameraAsync(options)
        : await launchImageLibraryAsync(options);

    if (!imageResult.canceled) {
      const asset = imageResult.assets[0];
      const imageData = {
        uri: asset.uri,
        name: asset.fileName || asset.uri.split("/").pop(),
        type: asset.type || "image/jpeg",
      };

      setSelectedImages((prevImages) => [...prevImages, imageData]);
    }
  };

  const checkPermissions = async (option) => {
    if (option === "Take Image") {
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
  };

  const handlePressPost = async (post, tags, images) => {
    try {
      Keyboard.dismiss();

      setIsUploading(true);

      await createPost(post, tags, images, token);

      setIsUploading(false);
      setUploadSuccess(true);
    } catch (error) {
      setIsUploading(false);
      setErrorMessage(error.message);
      setShowModal(true);
      setIsError(true);
    }
  };

  function closeModalHandler() {
    setShowModal(false);
  }

  function handleGoBack() {
    navigation.navigate("MyPosts", { refresh: true });
  }

  return (
    <>
      <DismissKeyboardContainer>
        <View style={styles.container}>
          <TextInput
            style={styles.inputPost}
            placeholder="¿Qué recomendación nueva tienes?"
            placeholderTextColor="#999"
            value={post}
            onChangeText={setPost}
            multiline={true}
            onSubmitEditing={Keyboard.dismiss}
            onFocus={() => setIsTagInputFocused(false)} // When focusing on inputPost
          />

          <ScrollView horizontal style={styles.imagesContainer}>
            {selectedImages.map((image, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image
                  source={{ uri: image.uri }}
                  style={styles.imagePreview}
                />
                <TouchableOpacity
                  style={styles.removeIcon}
                  onPress={() => removeImage(index)}
                >
                  <Ionicons
                    name="close-circle-outline"
                    size={18}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <Animated.View
            style={{ transform: [{ translateY: inputTranslateY }] }}
          >
            <TextCommonsMedium style={styles.etiquetasLabel}>
              Etiquetas de búsqueda
            </TextCommonsMedium>

            <TextInput
              style={styles.inputEtiqueta}
              placeholder="#Córdoba  #GeneralPaz  #Vegano "
              placeholderTextColor="#999"
              value={currentTag}
              onChangeText={handleTagInput}
              multiline={true}
              maxLength={130}
              onSubmitEditing={Keyboard.dismiss}
              onFocus={() => setIsTagInputFocused(true)} // When focusing on inputEtiqueta
            />

            <ScrollView style={styles.tagsContainer} horizontal>
              {tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>#{tag}</Text>
                  <TouchableOpacity onPress={() => removeTag(index)}>
                    <Ionicons name="close-circle" size={16} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </Animated.View>

          <Animated.View
            style={[styles.buttonsContainer, { bottom: keyboardHeight }]}
          >
            <TouchableOpacity
              style={styles.photoButton}
              onPress={openImageOptions}
            >
              <Ionicons name="camera-outline" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => handlePressPost(post, tags, selectedImages)}
            >
              <Ionicons name="send" size={24} color="white" />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </DismissKeyboardContainer>
      <LoadingGlutty visible={isUploading} />
      <BottomSheet ref={sheetRef} height={200}>
        <ImageSheetOptions
          onTakeImage={selectImage.bind(this, "Take Image")}
          onPickImage={selectImage.bind(this, "Pick Image")}
        />
      </BottomSheet>

      <GluttyModal
        isError={isError}
        message={errorMessage}
        onClose={closeModalHandler}
        visible={showModal}
      />

      <GluttyModal
        visible={uploadSuccess}
        message="Post subido con éxito!"
        closeButton={false}
        other
        buttons={[
          {
            text: "Aceptar",
            bg: "green",
            color: Colors.whiteGreen,
            onPress: handleGoBack,
          },
        ]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    width: "100%",
    height: "100%",
  },
  inputPost: {
    padding: 15,
    borderRadius: 10,
    fontSize: 18,
    height: 100,
    //borderWidth: 1,
    //backgroundColor: "grey",
  },
  inputEtiqueta: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 2,
    fontSize: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    width: 270,
    minHeight: 70,
    textAlignVertical: "top",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    maxWidth: 280,
    marginBottom: 90,
  },
  tag: {
    flexDirection: "row",
    backgroundColor: Colors.oceanBlue,
    padding: 8,
    borderRadius: 20,
    marginRight: 5,
    marginBottom: 5,
    alignItems: "center",
  },
  tagText: {
    color: "white",
    marginRight: 5,
    fontSize: 12,
  },
  buttonsContainer: {
    position: "absolute",
    right: 20,
  },
  photoButton: {
    backgroundColor: Colors.locro,
    padding: 15,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
  },
  sendButton: {
    backgroundColor: Colors.locro,
    padding: 15,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 120,
  },
  etiquetasLabel: {
    marginTop: 15,
    paddingTop: 15,
    marginBottom: 10,
    color: Colors.locro,
    fontWeight: "bold",
    fontSize: 18,
  },
  imageWrapper: {
    position: "relative",
    marginRight: 10,
    marginVertical: 18,
  },
  imagePreview: {
    width: 110,
    height: 110,
    borderRadius: 10,
    marginHorizontal: 3,
    marginVertical: 3,
  },
  removeIcon: {
    position: "absolute",
    top: 5,
    right: 9,
    borderRadius: 15,
    padding: 2,
    back: Colors.mJordan,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalText: {
    color: "#fff",
    fontSize: 18,
    marginTop: 20,
  },
});

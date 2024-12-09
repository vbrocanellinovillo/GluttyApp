import { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import BottomSheet from "@devvie/bottom-sheet";
import ImageSheetOptions from "../../UI/UserImage/ImageSheetOptions";
import FormButtonsGroup from "../../UI/Controls/FormButtonsGroup";
import {
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
  PermissionStatus,
  useCameraPermissions,
  useMediaLibraryPermissions,
} from "expo-image-picker";

export default function PhotosForm({
  initialImages = [],
  onBack,
  onNext,
  onRemoveImage,
}) {
  const [images, setImages] = useState(initialImages);
  const sheetRef = useRef(null);
  const [newimages, setnewImages] = useState([]);
  const [cameraPermissions, requestCameraPermissions] = useCameraPermissions();
  const [galleryPermissions, requestGalleryPermissions] =
    useMediaLibraryPermissions();

  async function checkPermissions(option) {
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
  }

  async function selectImage(option) {
    sheetRef.current?.close();
    const permissionStatus = await checkPermissions(option);

    if (!permissionStatus) return;

    let imageResult;
    const options = {
      allowsEditing: true,
      mediaTypes: MediaTypeOptions.Images,
    };

    if (option === "Take Image") {
      imageResult = await launchCameraAsync(options);
    } else {
      imageResult = await launchImageLibraryAsync(options);
    }

    if (!imageResult.canceled) {
      const image = imageResult.assets[0];

      setImages((prevImages) => [...prevImages, image]);

      setnewImages((prevImages) => [...prevImages, image]);
    }
  }

  function openImageOptions() {
    sheetRef.current?.open();
  }

  const removeImage = (id) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== id));
    if (onRemoveImage) {
      onRemoveImage(id); // Enviar el id al componente Photos
    }
  };

  /*const removeImage = (id) => {
        setImages((prevImages) => prevImages.filter((image) => image.id !== id));
      };*/
  console.log("las nuevas imagenes:");
  console.log(newimages);
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.photosContainer}>
        {images.map((image) => (
          <View key={image.id} style={styles.imageContainer}>
            <Image
              source={{ uri: image.url || image.uri }}
              style={styles.photo}
            />
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => removeImage(image.id)} // Pasar el id de la imagen
            >
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
        {images.length < 6 && (
          <TouchableOpacity
            style={styles.addPhotoButton}
            onPress={openImageOptions}
          >
            <Text style={styles.addPhotoText}>+</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <FormButtonsGroup
        prev="Anterior"
        next="Finalizar"
        onPrev={onBack}
        onNext={onNext.bind(this, newimages)}
      />

      <BottomSheet ref={sheetRef} height={200}>
        <ImageSheetOptions
          onTakeImage={selectImage.bind(this, "Take Image")}
          onPickImage={selectImage.bind(this, "Pick Image")}
        />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center"
  },
  photosContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  photo: {
    width: 350,
    height: 350,
    borderRadius: 10,
    marginRight: 10,
  },
  addPhotoButton: {
    width: 350,
    height: 350,
    borderRadius: 10,
    borderColor: "#d3d3d3",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  addPhotoText: {
    fontSize: 24,
    color: "#d3d3d3",
  },
  deleteButton: {
    position: "absolute",
    top: -10,
    right: 10,
    backgroundColor: "rgba(128, 128, 128, 0.5)",
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

//Opciones de foto hay que usar 2 componentes: BottomSheet e ImageSheetOptions
/*Coso blanco con los 2 botones:
<BottomSheet ref={sheetRef} height={200}>
          <ImageSheetOptions
            onTakeImage={selectImage.bind(this, "Take Image")}
            onPickImage={selectImage.bind(this, "Pick Image")}
          />
</BottomSheet>
*/
//Lógica para manejar camara:
/*const [takenImage, setTakenImage] = useState(undefined);
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
  }*/

import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Para el icono de tienda
import * as ImagePicker from "expo-image-picker";
import BottomSheet from "@devvie/bottom-sheet";
import ImageSheetOptions from "../../UI/UserImage/ImageSheetOptions";

export default function NuevaSucursalScreen() {
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.uri]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Sección de fotos */}
      <View style={styles.photosContainer}>
        {images.map((imageUri, index) => (
          <Image key={index} source={{ uri: imageUri }} style={styles.photo} />
        ))}
        <TouchableOpacity style={styles.addPhotoButton} onPress={pickImage}>
          <Text style={styles.addPhotoText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Botones de navegación */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Finalizar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "black",
  },
  line: {
    width: 40,
    height: 2,
    backgroundColor: "black",
  },
  circleFilled: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "black",
  },
  photosContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  addPhotoButton: {
    width: 80,
    height: 80,
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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#f68e5f",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

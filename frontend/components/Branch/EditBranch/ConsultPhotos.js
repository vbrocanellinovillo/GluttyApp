import BranchDataItem from "../BranchDataItem";
import { View, StyleSheet, setFieldValue , Image, ScrollView} from "react-native";

import TextCommonsRegular from "../../UI/FontsTexts/TextCommonsRegular";
import Form from "../../UI/Forms/Form";
import FormControl from "../../UI/Controls/FormControl";
import CheckboxControl from "../../UI/Controls/CheckboxControl";
import { useNavigation } from "@react-navigation/native";

/*
export function ConsultPhotos({branch}) {
    console.log("branch", branch);

    const photos = branch.pictures;

    return (
        <BranchDataItem title="Fotos" onPressPrencil={""}>
        <View style={styles.imageRow}>
            <View style={styles.imageContainer}>
            <Image
                source={{
                uri: branch.commerce_picture
                    ? branch.commerce_picture
                    : thumbGlutty,
                }}
                style={styles.image}
            />
            </View>
      </View>     
        </BranchDataItem>
    )
};

const styles = StyleSheet.create({
    datos: {
        marginVertical: 5,
    },
    imageRow: {
        flexDirection: "row",
        justifyContent: "center",
      },
    
      imageContainer: {
        width: 120,
        height: 120,
        backgroundColor: "white",
        borderRadius: 60,
        marginTop: -60,
        shadowColor: "black",
        shadowRadius: 5,
        shadowOpacity: 0.5,
        elevation: 5
      },
    
      image: {
        width: "100%",
        height: "100%",
        borderRadius: 60,
        objectFit: "contain",
      },
    
   
});*/

export function ConsultPhotos({ branch }) {
  const pictures = branch.pictures || [];
  const navigation = useNavigation();
  console.log("PEDRAAAA")
  console.log(branch.pictures)

  const handlePress = () => {
    console.log("PEDRAAAA")
    console.log(branch.pictures)
    navigation.navigate("EditBranchStack", {
      screen: "EditPhotos",
      params: { branch }, 
    });
  };

  return (
    <BranchDataItem title="Fotos" onPressPrencil={handlePress}>
      <ScrollView horizontal contentContainerStyle={styles.imageRow}>
        {pictures.map((picture, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image
              source={{ uri: picture }}
              style={styles.image}
            />
          </View>
        ))}
      </ScrollView>
    </BranchDataItem>
  );
}

const styles = StyleSheet.create({
  imageRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginTop: 20,
    marginHorizontal: 10, // Espaciado entre imágenes
    marginBottom: 30,
    borderRadius: 5, // Redondeado de las imágenes
    
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5, // Redondeado de las imágenes
  },
});

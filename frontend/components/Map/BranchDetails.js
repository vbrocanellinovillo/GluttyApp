import { StyleSheet, View, Image } from "react-native";
import { thumbGlutty } from "../../constants/glutty";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { Colors } from "../../constants/colors";
import { Divider } from "react-native-paper";
import AditionalInfo from "./AditionalInfo";
import PhotosContainer from "./PhotosContainer";
import DetailsGeneralInfo from "./DetailsGeneralInfo";
import ErrorBranchDetails from "./ErrorBranchDetails";

const PHOTOS = [
  { photo: "http://dummyimage.com/227x100.png/5fa2dd/ffffff" },
  { photo: "http://dummyimage.com/144x100.png/dddddd/000000" },
  { photo: "http://dummyimage.com/243x100.png/ff4444/ffffff" },
  { photo: "http://dummyimage.com/220x100.png/dddddd/000000" },
  { photo: "http://dummyimage.com/178x100.png/dddddd/000000" },
  { photo: "http://dummyimage.com/149x100.png/cc0000/ffffff" },
];

const DESCRIPTION =
  "Esta es una descripción harcodeada que uso para probar hasta que suban los cambios en el back";

export default function BranchDetails({ branch }) {
  if (!branch) return <ErrorBranchDetails />;

  return (
    <View style={styles.branch}>
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
      <TextCommonsMedium style={styles.commerceName}>
        {branch.commerce_name}
      </TextCommonsMedium>
      <View style={styles.details}>
        <Divider />
        <DetailsGeneralInfo
          address={branch.address}
          phone={branch.phone}
          optionalPhone={branch.optional_phone}
        />
        <Divider />
        <PhotosContainer photos={branch.pictures} />
        <Divider />
        <AditionalInfo
          onlyTakeAway={branch.just_takeaway}
          separatedKitchen={branch.separated_kitchen}
          description={branch.commerce_description}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  branch: {
    paddingHorizontal: 20,
    gap: 8,
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

  commerceName: {
    textAlign: "center",
    fontSize: 26,
    color: Colors.mJordan,
  },

  details: {
    marginTop: 10,
    gap: 18,
  },
});

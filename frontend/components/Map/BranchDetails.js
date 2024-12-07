import { StyleSheet, View, Image, ScrollView } from "react-native";
import { thumbGlutty } from "../../constants/glutty";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { Colors } from "../../constants/colors";
import { Divider } from "react-native-paper";
import AditionalInfo from "./AditionalInfo";
import PhotosContainer from "./PhotosContainer";
import DetailsGeneralInfo from "./DetailsGeneralInfo";
import ErrorBranchDetails from "./ErrorBranchDetails";
import MenusContainer from "./MenusContainer";

export default function BranchDetails({ branch, handlePdf }) {
  if (!branch) return <ErrorBranchDetails />;

  return (
    <ScrollView contentContainerStyle={styles.branch}>
      <TextCommonsMedium style={styles.commerceName}>
        {branch?.commerce_name}
      </TextCommonsMedium>
      <View style={styles.details}>
        <Divider />
        <DetailsGeneralInfo
          address={branch?.address}
          phone={branch?.phone}
          optionalPhone={branch?.optional_phone}
          isOpen={branch?.is_open_now}
        />
        <Divider />
        <PhotosContainer photos={branch?.photos} />
        <MenusContainer menus={branch?.menus} handlePdf={handlePdf} />
        <Divider />
        <AditionalInfo
          onlyTakeAway={branch?.just_takeaway}
          separatedKitchen={branch?.separated_kitchen}
          description={branch?.commerce_description}
          schedule={branch?.schedules}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  branch: {
    paddingHorizontal: 20,
    gap: 8,
  },

  commerceName: {
    textAlign: "center",
    fontSize: 22,
    color: Colors.mJordan,
  },

  details: {
    marginTop: 10,
    gap: 14,
  },
});

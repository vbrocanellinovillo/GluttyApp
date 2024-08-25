import { FlatList, StyleSheet, View } from "react-native";
import BranchItem from "./BranchItem";
import { useSelector } from "react-redux";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import GeneralInfo from "../../screens/Commerce/Branches/AddBranch/GeneralInfo";

export default function BranchesList() {

  const userData = useSelector((state) => state.auth.userData);
  const BRANCH = userData.Branches
  console.log(BRANCH);
  const navigation = useNavigation();

  const handlePress = (branch) =>{
    console.log("Aprieta")
  }
  return (
    <FlatList
      data={BRANCH}
      renderItem={({ item }) => (
        <BranchItem 
          name={item.name} 
          address={item.address} 
          onPress={()=>handlePress(item)}
          />
      )}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
    )
}

const styles = StyleSheet.create({
  container: {
    gap: 30,
    paddingBottom: 30,
  },
});

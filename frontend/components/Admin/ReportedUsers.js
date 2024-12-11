import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import ReportedUserItem from "./ReportedUserItem";
import { ReportedUser } from "../../models/ReportedUser";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";

const REPORTED_USERS = [
  new ReportedUser(
    1,
    "Agustin",
    "agusGonzalez",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEs4vn3kCVOAGRRhMmvxBoFDf06LMFiEpPMA&s",
    10
  ),
  new ReportedUser(
    2,
    "Santa Lucia",
    "santalucia00",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEs4vn3kCVOAGRRhMmvxBoFDf06LMFiEpPMA&s",
    10
  ),
  new ReportedUser(
    3,
    "Francisco",
    "franDiaz",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEs4vn3kCVOAGRRhMmvxBoFDf06LMFiEpPMA&s",
    10
  ),
  new ReportedUser(
    4,
    "Agostina Perez",
    "agosPerez",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEs4vn3kCVOAGRRhMmvxBoFDf06LMFiEpPMA&s",
    10
  ),
];

export default function ReportedUsers({ users }) {
  const navigation = useNavigation();

  const handlePress = (username) => {
    navigation.navigate("AdminStack", {
      screen: "ViewPostsReportedUser",
      params: { username },
    });
  };

  return (
    <FlashList
      data={REPORTED_USERS}
      renderItem={({ item }) => (
        <ReportedUserItem
          reportedUser={item}
          onPress={() => handlePress(item.username)}
        />
      )}
      keyExtractor={(item) => item?.id?.toString()}
      ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
      contentInset={{ bottom: 100 }}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});

import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import ReportedUserItem from "./ReportedUserItem";
import { ReportedUser } from "../../models/ReportedUser";
import { FlashList } from "@shopify/flash-list";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getReportedUsers } from "../../services/adminService";
import { useSelector } from "react-redux";
import NoUsersReported from "./noUsersReported";
import ReportedUserSkeleton from "../UI/Loading/ReportedUserSkeleton";


export default function ReportedUsers() {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const token = useSelector((state) => state.auth.accessToken);


  const isFocused = useIsFocused(); // Verifica si la pantalla está enfocada

  useEffect(() => {
    if (isFocused) {
      fetchReportedUsers(); // Llama a la función para actualizar los posts
    }
  }, [isFocused]);

  async function fetchReportedUsers() {
    try {
      setIsLoading(true);
      const data = await getReportedUsers(token);
      setUsers(data);
      console.log("data", data);
      setIsError(false);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    } finally {
      //setIsLoading(false);
    }
  } 

  const handlePress = (username, id) => {
    navigation.navigate("AdminStack", {
      screen: "ViewPostsReportedUser",
      params: { 
        username, 
        id,
        onGoBack: () => fetchReportedUsers(),
       },
    });
  };

 if (isLoading) {
        return <ReportedUserSkeleton />;
    }


  return (
    <FlashList
      data={users}
      renderItem={({ item }) => (
        <ReportedUserItem
          reportedUser={item}
          onPress={() => handlePress(item.username, item.id)}
        />
      )}
      keyExtractor={(item) => item?.id?.toString()}
      ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
      contentInset={{ bottom: 100 }}
      contentContainerStyle={styles.container}
      estimatedItemSize={100}
      ListEmptyComponent={() => (
      <NoUsersReported>No existen usuarios reportados</NoUsersReported>
           )}

      
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});

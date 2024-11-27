import { Text, View, StyleSheet } from "react-native";
import BoxDashboard from "../../components/Dashboard/boxDashboard";
import { comment, heart, star, fire } from "../../constants/imageIcons";
import RankedBranches from "../../components/Dashboard/RankedBranches";
import Combobox from "../../components/UI/Controls/Combobox";
import { useEffect, useState } from "react";
import { Colors } from "../../constants/colors";
import LikesChart from "../../components/Dashboard/LikesChart";
import { ScrollView } from "react-native-gesture-handler";
import PoularPosts from "../../components/Dashboard/PopularPosts";
import { dataDashboard } from "../../services/dashboardService";
import { useSelector } from "react-redux";
import GluttyErrorScreen from "../../components/UI/GluttyErrorScreen";
import DashboardSkeleton from "../../components/UI/Loading/DashboardSkeleton";

export function Dashboard() {
  const tiempo = [
    { label: "Última Semana", value: "week" },
    { label: "Últimos 15 días", value: "fortnight" },
    { label: "Últimos 30 días", value: "month" },
    { label: "Últimos 3 meses", value: "quarter" },
  ];

  const token = useSelector((state) => state.auth.accessToken);

  function handlePostPress() {
    console.log("Post presionado");
  }

  const [dashData, setDashData] = useState(undefined);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [selectedTime, setSelectedTime] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setIsLoading(true);
    try {
      const response = await dataDashboard(token, "Última semana");
      setDashData(response);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
       setIsLoading(false);
    }
  }

  if (isLoading) {
    // Hacer skeleton
    return  <DashboardSkeleton/>;
  } else if (isError) {
    return (
      <GluttyErrorScreen width={240} height={240}>
        Error cargando los datos. Por favor intente de nuevo más tarde
      </GluttyErrorScreen>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.comboContainer}>
        <Combobox
          placeholder="Última Semana"
          data={tiempo}
          onChange={() => undefined} // Manejador de cambio
          value={selectedTime}
          name="tiempo"
          errors={null} // Si tienes validación, ajusta este valor
          touched={null} // Si tienes validación, ajusta este valor
          containerStyle={styles.comboboxContainer}
          style={styles.comboboxStyle}
          placeholderColor="#333"
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        contentInset={{ bottom: 150 }}
      >
        <View style={styles.iconsContainer}>
          <BoxDashboard image={heart} number={dashData?.likes} />
          <BoxDashboard image={star} number={dashData?.favorites} />
          <BoxDashboard image={comment} number={dashData?.comments} />
        </View>

        <View style={styles.ranks}>
          <View style={styles.rankedContainer}>
            <RankedBranches
              image={fire}
              title="Ranking sucursales más visitadas"
              branches={dashData?.top_branches}
            />
          </View>
          <View style={styles.rankedContainer}>
            <LikesChart data={dashData?.age_distribution} />
          </View>
        </View>

        <PoularPosts posts={dashData?.top_posts} onPress={handlePostPress} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 10,
  },

  scrollContainer: {
    flex: 1,
    gap: 20,
  },

  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  ranks: {
    flexDirection: "row",
    gap: 20,
  },

  rankedContainer: {
    flex: 1,
  },

  comboboxContainer: {
    marginBottom: 50,
  },

  comboboxStyle: {
    backgroundColor: "#fff",
    borderColor: Colors.mJordan,
  },

  comboContainer: {
    marginBottom: 20,
  },

  appContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },

});
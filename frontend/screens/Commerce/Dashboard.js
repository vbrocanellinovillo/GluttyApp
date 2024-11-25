import { Text, View, StyleSheet } from "react-native";
import BoxDashboard from "../../components/Dashboard/boxDashboard";
import { comment, heart, star, fire } from "../../constants/imageIcons";
import RankedBranches from "../../components/Dashboard/RankedBranches";
import Combobox from "../../components/UI/Controls/Combobox";
import { useCallback, useEffect, useState } from "react";
import { Colors } from "../../constants/colors";
import LikesChart from "../../components/Dashboard/LikesChart";
import { ScrollView } from "react-native-gesture-handler";
import PoularPosts from "../../components/Dashboard/PopularPosts";
import { dataDashboard } from "../../services/dashboardService";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

export function Dashboard() {

  const tiempo = [
    { label: "Última Semana", value: "week" },
    { label: "Últimos 15 días", value: "fortnight"},
    { label: "Últimos 30 días", value: "month" },
    { label: "Últimos 3 meses", value: "quarter" },
  ];


  const [datos, setDatos] = useState("");

  var rank_branch, rank_likes, liked_posts, comments, favorites, likes = ""

  /*{
  "age_distribution": [{"label": "0 - 18", "percentage": 0}, {"label": "18 - 35", "percentage": 0}, {"label": "35 - 60", "percentage": 0}, {"label": "+60", "percentage": 0}],
   "comments": 0, 
   "favorites": 0, 
   "likes": 0, 
   "top_branches": [], 
   "top_posts": []}

*/
  const branches = [
    "Entresano Nueva Cba",
    "Entresano Cerro",
    "Entresano Gral. Paz",
  ]; // Corrección: array válido
  const [selectedTime, setSelectedTime] = useState("");

  const data = [
    { label: "0 - 18", percentage: 100 },
    { label: "18 - 35", percentage: 0 },
    { label: "35 - 55", percentage: 50 },
    { label: "+55", percentage: 80 },
  ];

  const token = useSelector((state) => state.auth.accessToken);

  const samplePost = [
    {
      name: "Entresano",
      username: "entresano",
      content:
        "¡Hola a todos! 🍴❌ Estoy buscando recomendaciones de restaurantes en Buenos Aires que ofrezcan opciones 100% libres de gluten.",
      userImage: "",
      date: "Hace 2 días",
      likes: 120,
      comments_number: 15,
      tags: ["Sin gluten", "Buenos Aires", "Restaurantes"],
      images: [],
    },
  ];

  function handlePostPress() {
    console.log("Post presionado");
  }

  console.log("linea 72")
  useEffect(() => {
    fetchData();
  }, []);
  
  async function fetchData() {
    try {
      const response = await dataDashboard(token, "week");
      setDatos(response);
    } catch (error) {
      console.log(error);
    }
  }

  
  async function timeSelected(time){
    setSelectedTime(time)
    console.log("SOFIA TROLA", time)
    try {
      const resp = await dataDashboard(token, time)
      console.log("la respuestaaa",resp)
      setDatos(resp)
    } catch (error) {
      console.log(error)
    }
  }


  console.log("eeee", datos.age_distribution)

  return (
    <View style={styles.container}>
      <View style={styles.comboContainer}>
        <Combobox
          placeholder="Última Semana"
          data={tiempo}
          onChange={(value) => timeSelected(value)} // Manejador de cambio
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
          <BoxDashboard image={heart} number={datos.likes} />
          <BoxDashboard image={star} number={datos.favorites} />
          <BoxDashboard image={comment} number={datos.comments} />
        </View>

        <View style={styles.ranks}>
          <View style={styles.rankedContainer}>
            <RankedBranches
              image={fire}
              title="Ranking sucursales más visitadas"
              branches={datos.top_branches}
            />
          </View>
          <View style={styles.rankedContainer}>
            <LikesChart data={datos.age_distribution} />
          </View>
        </View>

        <PoularPosts posts={datos.top_posts} onPress={handlePostPress} />
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

import { Text, View, StyleSheet } from "react-native"
import BoxDashboard from "../../components/Dashboard/boxDashboard"
import { comment, heart, star, fire } from "../../constants/imageIcons"
import RankedBranches from "../../components/Dashboard/RankedBranches"
import Combobox from "../../components/UI/Controls/Combobox"
import { useState } from "react"
import { Colors } from "../../constants/colors"
import LikesChart from "../../components/Dashboard/LikesChart"

export function Dashboard() {
    const branches = ["Entresano Nueva Cba", "Entresano Cerro", "Entresano Gral. Paz"]; // Corrección: array válido
    const tiempo = [
        { label: "Última Semana", value: "week" },
        { label: "Últimos 30 días", value: "month" },
        { label: "Últimos 3 meses", value: "quarter" },
      ];

      const [selectedTime, setSelectedTime] = useState("");
      const data = [
        { label: "0 - 18", percentage: 100 },
        { label: "18 - 35", percentage: 0 },
        { label: "35 - 55", percentage: 50 },
        { label: "+55", percentage: 80 },
      ];
    return (
        <>
        <View style={styles.comboContainer}>
            <Combobox
            placeholder="Seleccione el tiempo"
            data={tiempo}
            onChange={(value) => setSelectedTime(value)} // Manejador de cambio
            value={selectedTime}
            handleBlur={() => console.log("Blurred")}
            name="tiempo"
            errors={null} // Si tienes validación, ajusta este valor
            touched={null} // Si tienes validación, ajusta este valor
            containerStyle={styles.comboboxContainer}
            style={styles.comboboxStyle}
            placeholderColor="#333"
            />
        </View>

            <View style={styles.container}>
                <BoxDashboard image={heart} number={120} />
                <BoxDashboard image={star} number={80} />
                <BoxDashboard image={comment} number={45} />
            </View>
            <View style={styles.rankedContainer}>
                <RankedBranches
                    image={fire}
                    title="Ranking sucursales más visitadas"
                    branches={branches} // Array corregido
                />
            </View>
            <View style={styles.rankedContainer}>
                <LikesChart data={data} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row", 
        justifyContent: "space-around", 
        alignItems: "center", 
        padding: 16, 
    },
    rankedContainer: {
        marginTop: 20,
        paddingHorizontal: 16,
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
        padding: 16,
    },
});

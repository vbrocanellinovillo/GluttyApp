import { Text, View, StyleSheet } from "react-native"
import BoxDashboard from "../../components/Dashboard/boxDashboard"
import { comment, heart, star } from "../../constants/imageIcons"


export function Dashboard(){
    return (
        <View style={styles.container}>
            <BoxDashboard image={heart} number={120}></BoxDashboard>
            <BoxDashboard image={star} number={80}></BoxDashboard>
            <BoxDashboard image={comment} number={45}></BoxDashboard>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row", 
        justifyContent: "space-around", 
        alignItems: "center", 
        padding: 16, 
    }
})
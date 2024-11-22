import { Text, View } from "react-native"
import BoxDashboard from "../../components/Dashboard/boxDashboard"
import { comment, heart, star } from "../../constants/imageIcons"


export function Dashboard(){
    return (
        <View>
            <BoxDashboard image={heart} number={120}></BoxDashboard>
        </View>
    )
}
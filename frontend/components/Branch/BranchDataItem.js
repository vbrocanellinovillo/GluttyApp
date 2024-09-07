import { StyleSheet, View, Button, TouchableOpacity } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from "../../constants/colors";

export default function BranchDataItem({onPressPrencil, title, children}) {
    return (  
      <View style={styles.container}>
        <View style={styles.header}>
        <TextCommonsMedium style={styles.title}>{title}</TextCommonsMedium>
        
        <TouchableOpacity style={styles.iconWrapper}>
          <AntDesign name="edit" size={24} color="black" onPress={onPressPrencil} />
        </TouchableOpacity>
        </View>
        
        <View>{children}</View>
        
      </View>      
    )
}

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      marginTop: 20,
      borderRadius: 10,
      borderColor: 'lightgrey',
      borderWidth: 2,
      marginBottom: -10,
      //elevation: 2,
      margin: 20,
    },
    header: {
      flexDirection: 'row',  // Coloca el título y el ícono en la misma fila
      justifyContent: 'space-between',  // Asegura que el título esté a la izquierda y el ícono a la derecha
      alignItems: 'center',  // Centra verticalmente el título y el ícono
      paddingTop: 5,
    },
    title: {
      marginTop: 5,
      fontSize: 20,
      marginBottom: 10,
      color: Colors.locro,
    }, 
    iconWrapper: {
      color: Colors.locro,

    },
  });

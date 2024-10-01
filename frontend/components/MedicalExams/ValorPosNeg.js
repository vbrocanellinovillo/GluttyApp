import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, UIManager, findNodeHandle } from 'react-native';
import InfoMedicalVariableContainer from './MedicalVariableInfoContainer';
import Feather from '@expo/vector-icons/Feather';
import { Colors } from '../../constants/colors';
import TextCommonsMedium from '../UI/FontsTexts/TextCommonsMedium';


export default function ValorPosNeg({ label, valor, descrip }) {
  const [showMedVarInfo, setShowMedVarInfo] = useState(false);
  const [infoButtonPosition, setInfoButtonPosition] = useState({ x: 0, y: 0 });
  const infoButtonRef = useRef(null);
  let pos = undefined;
  let neg = undefined;

  useEffect(() => {
        if (infoButtonRef.current) {
          UIManager.measure(findNodeHandle(infoButtonRef.current), (x, y, width, height, pageX, pageY) => {
            setInfoButtonPosition({ x: pageX, y: pageY + height }); // Añadir altura para colocar debajo del botón
          });
        }
      }, [showMedVarInfo]);
    
    // Mostrar la info médica
  function openMedVarInfo() {
    setShowMedVarInfo(true);
  }

  // Cerrar la info médica
  function hideMedVarInfo() {
    setShowMedVarInfo(false);
  }

  if (valor === "Positivo") {
    pos = 1;
    neg = 0; 
  } else if (valor ==="Negativo") {
    pos = 0;
    neg = 1; 
  }
  


    return (
        <View style={styles.container}>
         <View style={styles.encabezado}>
            <TextCommonsMedium style={styles.title}>{label}</TextCommonsMedium>
            <TouchableOpacity ref={infoButtonRef} onPress={openMedVarInfo}>
                <Feather style={styles.info} name="info" size={18} color="black" />
            </TouchableOpacity>
         </View>
         {/* Pop-up de información médica */}
         <InfoMedicalVariableContainer
                  title={label}
                  visible={showMedVarInfo}
                  onDismiss={hideMedVarInfo}
                  infoText={descrip}
                  position={infoButtonPosition} // Pasar la posición calculada
              />
                  
        {/* Contenedor de los valores positivo y negativo */}
        <View style={styles.valuesContainer}>
            {/* Valor Negativo */}
            <TextCommonsMedium style={[styles.valueText, neg === 1 && styles.highlight]}>
            Negativo (-)
            </TextCommonsMedium>

            {/* Valor Positivo */}
            <TextCommonsMedium style={[styles.valueText, pos === 1 && styles.highlight]}>
            Positivo (+)
            </TextCommonsMedium>
        </View>
    </View>
  );
};

// Estilos del componente
const styles = StyleSheet.create({
  container: {
    //borderWidth: 1,
    borderRadius: 15,
    //padding: 10,
    width: 320,
    backgroundColor: '#fff',
    marginTop: 0,
    paddingBottom: 20,
  },
  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.mJordan,
    flexWrap: 'wrap',  // Permitir que el texto se ajuste en varias líneas
    maxWidth: 220,     // Establecer un ancho máximo para que el texto se divida en líneas
  },
  info: {
    marginLeft: 5,
    color: Colors.mJordan,
  },
  valuesContainer: {
    flexDirection: 'row',
    //justifyContent: 'space-between',  // Para separar los valores
    alignItems: 'center',
    width: 70,  // Reduce el ancho del contenedor para centrar
    marginTop: 10,
    //backgroundColor: Colors.mJordan,

    width: '100%',
  },
  valueText: {
    marginHorizontal: 20,
    fontSize: 20,
    color: 'lightgray',
  },
  highlight: {
    color: Colors.locro, // Color para Positivo (+)
    fontWeight: 'bold',
  },
});


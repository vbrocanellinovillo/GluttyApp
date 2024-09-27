import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, findNodeHandle, UIManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Portal } from 'react-native-paper';
import TextCommonsMedium from '../UI/FontsTexts/TextCommonsMedium';
import TextCommonsRegular from '../UI/FontsTexts/TextCommonsRegular';
import { Colors } from '../../constants/colors';
import InfoMedicalVariableContainer from './MedicalVariableInfoContainer';
import Feather from '@expo/vector-icons/Feather';

export default function MedicalValue({ label, value, min, max, descrip }) {
  const [showMedVarInfo, setShowMedVarInfo] = useState(false);
  const [infoButtonPosition, setInfoButtonPosition] = useState({ x: 0, y: 0 });
  const infoButtonRef = useRef(null);

  // Calcular la posición del valor en la barra
  function calculatePosition() {
    const valuePercentage = (value - min) / (max - min); // Normalizar el valor
    const barWidth = 300; // Ancho de la barra
    const padding = 18; // Padding horizontal
    return padding + valuePercentage * (barWidth - padding * 2); // Ajustar posición
  }

  // Mostrar la info médica
  function openMedVarInfo() {
    setShowMedVarInfo(true);
  }

  // Cerrar la info médica
  function hideMedVarInfo() {
    setShowMedVarInfo(false);
  }

  // Obtener la posición del botón info cuando se monta el componente
  useEffect(() => {
    if (infoButtonRef.current) {
      UIManager.measure(findNodeHandle(infoButtonRef.current), (x, y, width, height, pageX, pageY) => {
        setInfoButtonPosition({ x: pageX, y: pageY + height }); // Añadir altura para colocar debajo del botón
      });
    }
  }, [showMedVarInfo]);

  return (
    <View style={styles.container}>
      <View style={styles.encabezado}>
        <TextCommonsMedium style={styles.title}>{label}</TextCommonsMedium>
        <TouchableOpacity ref={infoButtonRef} onPress={openMedVarInfo}>
          <Feather style={styles.info} name="info" size={18} color="black"/>
        </TouchableOpacity>

        {/* Pop-up de información médica */}
        <InfoMedicalVariableContainer
          title = {label}
          visible={showMedVarInfo}
          onDismiss={hideMedVarInfo}
          infoText={"Información sobre la variable médica."}
          position={infoButtonPosition} // Pasar la posición calculada
        />
      </View>

      {/*BARRA DE VARIABLE*/}
      <View style={styles.generalBar}>
        <View style={styles.valueBar}>
          <TextCommonsRegular style={styles.range}>{min}</TextCommonsRegular>
          <View style={[styles.valueContainer, { left: calculatePosition() }]}>
            <TextCommonsMedium style={styles.value}>{value}</TextCommonsMedium>
          </View>
          <TextCommonsRegular style={styles.range}>{max}</TextCommonsRegular>
        </View>
      </View>
    </View>
  );
}

const height = 30;

const styles = StyleSheet.create({
  container: {
    gap: 38,
  },
  encabezado: {
    flexDirection: 'row',
  },
  info: {
    marginLeft: 5,
    marginTop: 3,
  },
  generalBar: {
    backgroundColor: '#eee',
    height: height,
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  valueBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.oceanBlue,
    height: height,
    width: 300,
    borderRadius: 20,
    paddingHorizontal: 18,
    position: 'relative',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.mJordan,
  },
  range: {
    fontSize: 16,
    color: '#333',
  },
  valueContainer: {
    width: 5,
    height: '100%',
    backgroundColor: Colors.humita,
    position: 'absolute',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: -10,
    marginTop: -20,
    color: Colors.mJordan,
  },
});

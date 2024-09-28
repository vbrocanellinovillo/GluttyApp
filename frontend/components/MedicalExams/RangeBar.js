import Svg, { Line, Rect, Text as SvgText } from 'react-native-svg';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, findNodeHandle, UIManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Portal } from 'react-native-paper';
import TextCommonsMedium from '../UI/FontsTexts/TextCommonsMedium';
import TextCommonsRegular from '../UI/FontsTexts/TextCommonsRegular';
import { Colors } from '../../constants/colors';
import InfoMedicalVariableContainer from './MedicalVariableInfoContainer';
import Feather from '@expo/vector-icons/Feather';

export default function RangeBar({ label, minBarraGris, maxBarraGris, normalMin, normalMax, currentValue, descrip}) {
  const [showMedVarInfo, setShowMedVarInfo] = useState(false);
  const [infoButtonPosition, setInfoButtonPosition] = useState({ x: 0, y: 0 });
  const infoButtonRef = useRef(null);



  const barWidth = 300; // Ancho constante de la barra visual
  const normalizedMin = minBarraGris || 0; // Mínimo del rango gris (no se mostrará)
  const normalizedMax = maxBarraGris || 100; // Máximo del rango gris (no se mostrará)
  const normalizedRangeMin = normalMin || 20; // Mínimo del rango celeste
  const normalizedRangeMax = normalMax || 80; // Máximo del rango celeste

  // Calcular la posición del valor actual dentro del rango de la barra gris
  const position = ((currentValue - normalizedMin) / (normalizedMax - normalizedMin)) * barWidth;

  // Calcular las posiciones de los límites del rango normal (barra celeste)
  const rangeBarStart = ((normalizedRangeMin - normalizedMin) / (normalizedMax - normalizedMin)) * barWidth;
  const rangeBarWidth = ((normalizedRangeMax - normalizedRangeMin) / (normalizedMax - normalizedMin)) * barWidth;

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
    <><View style={styles.container}>
          <View style={styles.encabezado}>
              <TextCommonsMedium style={styles.title}>{label}</TextCommonsMedium>
              <TouchableOpacity ref={infoButtonRef} onPress={openMedVarInfo}>
                  <Feather style={styles.info} name="info" size={18} color="black" />
              </TouchableOpacity>

              {/* Pop-up de información médica */}
              <InfoMedicalVariableContainer
                  title={label}
                  visible={showMedVarInfo}
                  onDismiss={hideMedVarInfo}
                  infoText={descrip}
                  position={infoButtonPosition} // Pasar la posición calculada
              />
          </View>
      </View><View style={{ alignItems: 'center' }}>
              <Svg height="60" width={barWidth}>
                  {/* Texto del rango mínimo (barra celeste) */}
                  <SvgText x={rangeBarStart - 10} y="15" fill="black" fontSize="12">
                      {normalizedRangeMin}
                  </SvgText>

                  {/* Texto del rango máximo (barra celeste) */}
                  <SvgText x={rangeBarStart + rangeBarWidth - 10} y="15" fill="black" fontSize="12">
                      {normalizedRangeMax}
                  </SvgText>

                  {/* Barra de fondo (gris) con bordes redondeados */}
                  <Rect
                      x="0"
                      y="25"
                      width={barWidth}
                      height="30"
                      fill="lightgray"
                      rx="15" // Radio de redondeo en los bordes
                      ry="15" // Radio de redondeo en los bordes
                  />

                  {/* Barra del rango normal (celeste) con bordes redondeados */}
                  <Rect
                      x={rangeBarStart}
                      y="25"
                      width={rangeBarWidth}
                      height="30"
                      fill={Colors.oceanBlue}
                      rx="15" // Radio de redondeo en los bordes
                      ry="15" // Radio de redondeo en los bordes
                  />

                  {/* Indicador del valor actual */}
                  <Line x1={position} y1="20" x2={position} y2="55" stroke="orange" strokeWidth="4" />

                  {/* Valor actual encima del indicador */}
                  <SvgText x={position - 10} y="15" fill="black" fontSize="12">
                      {currentValue}
                  </SvgText>
              </Svg>
          </View></>
  );
};
const height = 30;

const styles = StyleSheet.create({
container: {
    gap: 20,
    marginLeft: 3,
    marginRight: 3,
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
    height: height + 5,
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
    height: height + 5,
    width: 250,
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
    fontSize: 15,
    fontWeight: '400',
    marginHorizontal: -15,
    marginTop: -20,
    color: Colors.mJordan,
  }
})
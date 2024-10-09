import Svg, { Line, Rect, Text as SvgText } from 'react-native-svg';
import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, findNodeHandle, UIManager } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { Colors } from '../../constants/colors';
import InfoMedicalVariableContainer from './MedicalVariableInfoContainer';
import TextCommonsMedium from '../UI/FontsTexts/TextCommonsMedium';

export default function RangeBar({ label, minBarraGris, maxBarraGris, normalMin, normalMax, currentValue, descrip, unit }) {
  const [showMedVarInfo, setShowMedVarInfo] = useState(false);
  const [infoButtonPosition, setInfoButtonPosition] = useState({ x: 0, y: 0 });
  const infoButtonRef = useRef(null);

  const barWidth = 320; // Ancho constante de la barra visual

  let x = undefined; // Posición estándar del máximo dentro de la barra celeste
  let color = "white";
  
  // Definir los valores normalizados para la barra gris
  let normalizedMin = minBarraGris ?? -10;
  let normalizedMax = maxBarraGris ?? 150;

  if (maxBarraGris !== "null" && minBarraGris !== "null") {
    if ((minBarraGris < currentValue) && (currentValue < maxBarraGris)) {
      normalizedMin = minBarraGris - 15; // Reducir el mínimo por debajo del valor actual
      normalizedMax = maxBarraGris + 15; // Aumentar el máximo por encima del valor actual
    } else if (currentValue > maxBarraGris) {
      normalizedMax = maxBarraGris + (maxBarraGris - currentValue) + 30; // Añadir un margen por encima del valor actual
      normalizedMin = minBarraGris - 5; // Añadir un margen por debajo
    } else if (currentValue < minBarraGris) {
      normalizedMin = minBarraGris - (minBarraGris - currentValue) - 20; // Reducir el mínimo por debajo del valor actual
      normalizedMax = maxBarraGris + 20; // Aumentar el máximo
    }
  }

  // Validar que no haya divisiones por 0 o valores inválidos
  const range = normalizedMax - normalizedMin;
  if (range <= 0) {
    console.error("Rango inválido: normalizedMax debe ser mayor que normalizedMin");
  }

  // Si algún valor clave es null, centramos el indicador de currentValue
  const shouldCenterCurrentValue = minBarraGris === null || maxBarraGris === null || normalMin === null || normalMax === null;

  // Calcular la posición del valor actual dentro del rango de la barra gris, o centrar si es necesario
  const position = shouldCenterCurrentValue
    ? barWidth / 2 // Centrar el currentValue en la barra gris
    : Math.min(Math.max(((currentValue - normalizedMin) / range) * barWidth, 0), barWidth);

  // Calcular las posiciones de los límites del rango normal (barra celeste), solo si ambos valores existen
  const rangeBarStart = normalMin !== null && normalMax !== null
    ? Math.max(((normalMin - normalizedMin) / range) * barWidth, 0)
    : 0;

  const rangeBarWidth = normalMin !== null && normalMax !== null
    ? Math.max(((normalMax - normalMin) / range) * barWidth, 0)
    : 0;

  // Mostrar la info médica
  function openMedVarInfo() {
    setShowMedVarInfo(true);
  }

  function hideMedVarInfo() {
    setShowMedVarInfo(false);
  }

  useEffect(() => {
    if (infoButtonRef.current) {
      UIManager.measure(findNodeHandle(infoButtonRef.current), (x, y, width, height, pageX, pageY) => {
        setInfoButtonPosition({ x: pageX, y: pageY + height });
      });
    }
  }, [showMedVarInfo]);

  // Estandarizar los valores de la posición de los valores normales en la barra celeste
  if ((normalMax - normalMin) < 12 && (normalMax - normalMin) != 10) {
    x = -5;
    color = 'black';
  } else if (normalizedMax < 100) {
    x = 20;
  } else if (normalizedMax > 100) {
    x = 30;
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.encabezado}>
          <TextCommonsMedium style={styles.title}>{label}</TextCommonsMedium>
          <TouchableOpacity ref={infoButtonRef} onPress={openMedVarInfo}>
            <Feather style={styles.info} name="info" size={18} color="black" />
          </TouchableOpacity>

          <InfoMedicalVariableContainer
            title={label}
            visible={showMedVarInfo}
            onDismiss={hideMedVarInfo}
            infoText={descrip}
            position={infoButtonPosition}
          />
        </View>
      </View>

      <View style={{ alignItems: 'center' }}>
        <Svg height="60" width={barWidth}>
          {/* Barra de fondo (gris) con bordes redondeados, siempre visible */}
          <Rect
            x="0"
            y="25"
            width={barWidth}
            height="30"
            fill="lightgray"
            rx="15"
            ry="15"
          />

          {/* Barra del rango normal (celeste) solo si normalMin y normalMax están definidos */}
          {normalMin !== null && normalMax !== null && (
            <Rect
              x={isNaN(rangeBarStart) ? 0 : rangeBarStart}
              y="25"
              width={isNaN(rangeBarWidth) ? 0 : rangeBarWidth}
              height="30"
              fill={Colors.oceanBlue}
              rx="15"
              ry="15"
            />
          )}

          {/* Texto del valor mínimo y máximo dentro de la barra celeste */}
          {normalMin !== null && normalMax !== null && (
            <>
              <SvgText x={isNaN(rangeBarStart) ? 0 : rangeBarStart + 10} y="43" fill="white" fontSize="10" fontWeight="bold">
                {normalMin}
              </SvgText>
              <SvgText x={isNaN(rangeBarStart + rangeBarWidth) ? 0 : rangeBarStart + rangeBarWidth - x} y="43" fill={color} fontSize="10" fontWeight="bold">
                {normalMax}
              </SvgText>
            </>
          )}

          {/* Indicador del valor actual, siempre sobre la barra gris */}
          <Line x1={isNaN(position) ? 0 : position} y1="20" x2={isNaN(position) ? 0 : position} y2="55" stroke="orange" strokeWidth="4" />

          {/* Valor actual encima del indicador */}
          <SvgText 
            x={isNaN(position - 5) ? 0 : position - 10} 
            y="15" 
            fill="black" 
            fontSize="15"  // Aumenta el tamaño de la fuente
            fontWeight="bold"  // Aplica negrita
          >
            {`${currentValue} ${unit}`}  {/* Concatenamos el valor actual con la unidad */}
          </SvgText>
        </Svg>
      </View>
    </>
  );
}

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
    marginTop: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.mJordan,
    flexWrap: 'wrap',  // Permitir que el texto se ajuste en varias líneas
    maxWidth: 220,
  },
});

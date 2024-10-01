// import Svg, { Line, Rect, Text as SvgText } from 'react-native-svg';
// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, findNodeHandle, UIManager } from 'react-native';
// import Feather from '@expo/vector-icons/Feather';
// import { Colors } from '../../constants/colors';
// import InfoMedicalVariableContainer from './MedicalVariableInfoContainer';
// import TextCommonsMedium from '../UI/FontsTexts/TextCommonsMedium';

// export default function RangeBar({ label, minBarraGris, maxBarraGris, normalMin, normalMax, currentValue, descrip }) {
//   const [showMedVarInfo, setShowMedVarInfo] = useState(false);
//   const [infoButtonPosition, setInfoButtonPosition] = useState({ x: 0, y: 0 });
//   const infoButtonRef = useRef(null);

//   const barWidth = 280; // Ancho constante de la barra visual
//   let normalizedMin  // Mínimo del rango gris
//   let normalizedMax // Máximo del rango gris
//   const normalizedRangeMin = normalMin; // Mínimo del rango celeste
//   const normalizedRangeMax = normalMax; // Máximo del rango celeste

//   if ((minBarraGris || maxBarraGris) === null) {
//      normalizedMin = 0
//      normalizedMax = 100
//   } else if ((normalMax - normalMin) < 30) {
//     if (currentValue > normalMax) {
//       normalizedMax = maxBarraGris + (currentValue - normalMax) + 20
//       normalizedMin = minBarraGris - 30;
//     }
//     if (currentValue < normalMax) {
//       normalizedMin = minBarraGris - (normalMin - currentValue) -20
//       normalizedMin = minBarraGris - 30;
//     }  
//   } else {
//     normalizedMin = minBarraGris - 200 
//     normalizedMax = maxBarraGris + 100;
//   }
   

//   // Calcular la posición del valor actual dentro del rango de la barra gris
//   const position = ((currentValue - normalizedMin) / (normalizedMax - normalizedMin)) * barWidth;

//   // Calcular las posiciones de los límites del rango normal (barra celeste)
//   const rangeBarStart = ((normalizedRangeMin - normalizedMin) / (normalizedMax - normalizedMin)) * barWidth;
//   const rangeBarWidth = ((normalizedRangeMax - normalizedRangeMin) / (normalizedMax - normalizedMin)) * barWidth;

//   // Mostrar la info médica
//   function openMedVarInfo() {
//     setShowMedVarInfo(true);
//   }

//   function hideMedVarInfo() {
//     setShowMedVarInfo(false);
//   }

//   useEffect(() => {
//     if (infoButtonRef.current) {
//       UIManager.measure(findNodeHandle(infoButtonRef.current), (x, y, width, height, pageX, pageY) => {
//         setInfoButtonPosition({ x: pageX, y: pageY + height });
//       });
//     }
//   }, [showMedVarInfo]);

//   return (
//     <>
//       <View style={styles.container}>
//         <View style={styles.encabezado}>
//           <TextCommonsMedium style={styles.title}>{label}</TextCommonsMedium>
//           <TouchableOpacity ref={infoButtonRef} onPress={openMedVarInfo}>
//             <Feather style={styles.info} name="info" size={18} color="black" />
//           </TouchableOpacity>

//           <InfoMedicalVariableContainer
//             title={label}
//             visible={showMedVarInfo}
//             onDismiss={hideMedVarInfo}
//             infoText={descrip}
//             position={infoButtonPosition}
//           />
//         </View>
//       </View>

//       <View style={{ alignItems: 'center' }}>
//         <Svg height="60" width={barWidth}>
//           {/* Texto del valor mínimo y máximo si normalMin y normalMax están definidos */}
//           {normalizedRangeMin !== null && normalizedRangeMax !== null && (
//             <>
//               <SvgText x={rangeBarStart} y="15" fill="black" fontSize="12">
//                 {normalizedRangeMin}
//               </SvgText>
//               <SvgText x={rangeBarStart + rangeBarWidth -15} y="15" fill="black" fontSize="12">
//                 {normalizedRangeMax}
//               </SvgText>
//             </>
//           )}

//           {/* Barra de fondo (gris) con bordes redondeados */}
//           <Rect
//             x="0"
//             y="25"
//             width={barWidth}
//             height="30"
//             fill="lightgray"
//             rx="15"
//             ry="15"
//           />

//           {/* Barra del rango normal (celeste) solo si normalMin y normalMax están definidos */}
//           {normalizedRangeMin !== null && normalizedRangeMax !== null && (
//             <Rect
//               x={rangeBarStart}
//               y="25"
//               width={rangeBarWidth}
//               height="30"
//               fill={Colors.oceanBlue}
//               rx="15"
//               ry="15"
//             />
//           )}

//           {/* Indicador del valor actual */}
//           <Line x1={position} y1="20" x2={position} y2="55" stroke="orange" strokeWidth="4" />

//           {/* Valor actual encima del indicador */}
//           <SvgText x={position - 5} y="15" fill="black" fontSize="12">
//             {currentValue}
//           </SvgText>
//         </Svg>
//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     gap: 20,
//     marginLeft: 3,
//     marginRight: 3,
//   },
//   encabezado: {
//     flexDirection: 'row',
//   },
//   info: {
//     marginLeft: 5,
//     marginTop: 3,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: '500',
//     color: Colors.mJordan,
//   },
// });
import Svg, { Line, Rect, Text as SvgText } from 'react-native-svg';
import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, findNodeHandle, UIManager } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { Colors } from '../../constants/colors';
import InfoMedicalVariableContainer from './MedicalVariableInfoContainer';
import TextCommonsMedium from '../UI/FontsTexts/TextCommonsMedium';

export default function RangeBar({ label, minBarraGris, maxBarraGris, normalMin, normalMax, currentValue, descrip, lab }) {
  const [showMedVarInfo, setShowMedVarInfo] = useState(false);
  const [infoButtonPosition, setInfoButtonPosition] = useState({ x: 0, y: 0 });
  const infoButtonRef = useRef(null);

  const barWidth = 320; // Ancho constante de la barra visual

  // Definir los valores normalizados para la barra gris
  let normalizedMin = minBarraGris ?? 0;
  let normalizedMax = maxBarraGris ?? 130;

  if (maxBarraGris !== null && minBarraGris !== null) {
    if ((minBarraGris < currentValue) && (currentValue < maxBarraGris)) {
      normalizedMin = minBarraGris - 15; // Reducir el mínimo por debajo del valor actual
      normalizedMax = maxBarraGris + 15; // Aumentar el máximo por encima del valor actual
    }
    else if (currentValue > maxBarraGris) {
      normalizedMax = maxBarraGris + (maxBarraGris - currentValue) + 30; // Añadir un margen por encima del valor actual
      normalizedMin = minBarraGris - 5; // Añadir un margen por debajo
    } else if (currentValue < minBarraGris) {
      normalizedMin = minBarraGris - (minBarraGris - currentValue)  - 10; // Reducir el mínimo por debajo del valor actual
      normalizedMax = maxBarraGris + 20; // Aumentar el máximo
    }
  }

  // Validar que no haya divisiones por 0 o valores inválidos
  const range = normalizedMax - normalizedMin;
  if (range <= 0) {
    console.error("Rango inválido: normalizedMax debe ser mayor que normalizedMin");
  }

  // Calcular la posición del valor actual dentro del rango de la barra gris
  const position = isNaN(currentValue) ? 0 : Math.min(Math.max(((currentValue - normalizedMin) / range) * barWidth, 0), barWidth);

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
          {/* Texto del valor mínimo y máximo si normalMin y normalMax están definidos */}
          {normalMin !== null && normalMax !== null && (
            <>
              <SvgText x={isNaN(rangeBarStart) ? 0 : rangeBarStart} y="15" fill="black" fontSize="12">
                {normalMin}
              </SvgText>
              <SvgText x={isNaN(rangeBarStart + rangeBarWidth - 15) ? 0 : rangeBarStart + rangeBarWidth - 15} y="15" fill="black" fontSize="12">
                {normalMax}
              </SvgText>
            </>
          )}

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

          {/* Indicador del valor actual, siempre sobre la barra gris */}
          <Line x1={isNaN(position) ? 0 : position} y1="20" x2={isNaN(position) ? 0 : position} y2="55" stroke="orange" strokeWidth="4" />

          {/* Valor actual encima del indicador */}
          <SvgText 
            x={isNaN(position - 5) ? 0 : position - 10} 
            y="15" 
            fill="black" 
            fontSize="16"  // Aumenta el tamaño de la fuente
            fontWeight="bold"  // Aplica negrita
          >
            {currentValue}
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

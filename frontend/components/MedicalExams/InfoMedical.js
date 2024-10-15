import { View, Image, StyleSheet } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { doctorGlutty, gluttyMarker } from "../../constants/glutty";
import { Colors } from "../../constants/colors";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";

export default function InfoMedical() {
  return (
    <View style={styles.container}>
      <TextCommonsMedium style={styles.title}>Celiaquía</TextCommonsMedium>
      <TextCommonsRegular style={styles.text}>
        La celiaquía es una enfermedad que se desencadena por la ingestión de
        una proteína denominada gluten.{`\n`}
      </TextCommonsRegular>
      <TextCommonsRegular style={styles.text}>
        El gluten se encuentra presente en los cereales de
        <TextCommonsRegular style={[styles.text, styles.specialText]}>
          trigo, avena, cebada y centeno (TACC).
        </TextCommonsRegular>
        Las personas celíacas deben evitar productos quecontengan estos
        ingredientes.{`\n`}
      </TextCommonsRegular>
      <View style={styles.row}>
        <TextCommonsRegular style={[styles.text, styles.rowText]}>
          ¿Y qué pasa si lo consumen? Afectan el intestino delgado de las
          personas que la padecen. Se produce un daño principalmente en la
          mucosa del intestino disminuyendo la capacidad de absorber nutrientes,
          vitaminas y minerales de los alimentos que consume.
        </TextCommonsRegular>
        <Image source={{ uri: doctorGlutty }} style={styles.image} />
      </View>
      <TextCommonsRegular style={styles.text}>
        {`\n`}Se recomienda → Consumí sólo aquellos alimentos libres de gluten o
        sin TACC. El Ministerio de Salud, a través de la{" "}
        <TextCommonsRegular style={[styles.text, styles.specialText]}>
          ANMAT
        </TextCommonsRegular>
        , publica un listado Oficial de Alimentos Libres de Gluten (ALG), en el
        cual pueden verse aquellas marcas de alimentos y productos
        industrializados que fueron inscriptas, como Libres de gluten o Sin
        TACC, por lo tanto pueden ser consumidas por las personas celíacas.
        {`\n`}
      </TextCommonsRegular>
      <View style={styles.row}>
        <Image source={{ uri: gluttyMarker }} style={styles.image} />
        <TextCommonsRegular style={[styles.text, styles.rowText]}>
          También tienen que tener cuidado con →{" "}
          <TextCommonsRegular style={[styles.text, styles.specialText]}>
            Contaminación cruzada:
          </TextCommonsRegular>
          Un alimento que no contiene gluten puede contaminarse por estar en
          contacto con otros alimentos que lo contengan o bien, por utilizar los
          mismos utensilios para cocinar o manipular unos y otros, sin
          higienizarlos correctamente.
        </TextCommonsRegular>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    paddingTop: 26,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.oceanBlue,
    textAlign: "center",
    marginBottom: 10,
  },

  text: {
    fontSize: 16,
    color: Colors.mJordan,
  },

  specialText: {
    color: Colors.oceanBlue,
    fontWeight: "500",
  },

  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },

  rowText: {
    flex: 1.4,
  },

  image: {
    flex: 0.6,
    width: 100,
    height: 100,
    objectFit: "contain",
  },
});

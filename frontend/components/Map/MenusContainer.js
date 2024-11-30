import { Pressable, StyleSheet } from "react-native";
import PdfIconItem from "../UI/Pdf/PdfIconItem";
import ElementsContainer from "./ElementsContainer";
import { Colors } from "../../constants/colors";

export default function MenusContainer({ menus = [], handlePdf }) {
  return (
    <ElementsContainer
      title="Menus"
      items={menus}
      scrollContainerStyle={styles.container}
    >
      {menus?.map((menu) => (
        <Pressable
          onPress={() => handlePdf(menu?.file_name, menu?.url)}
          key={menu?.id}
        >
          <PdfIconItem
            name={menu?.file_name}
            textStyle={styles.pdfName}
            iconSize={32}
            numberOfLines={2}
          />
        </Pressable>
      ))}
    </ElementsContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    gap: 28,
  },

  pdfName: {
    fontSize: 12,
    fontWeight: "400",
    color: Colors.mJordan,
    textAlign: "center",
  },
});

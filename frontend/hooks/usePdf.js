import { useNavigation } from "@react-navigation/native";

export function usePdf(extraFunction) {
  const navigation = useNavigation();

  function handlePdf(name, url) {
    extraFunction && extraFunction();
    navigation.navigate("PdfScreen", { name, url });
  }

  return { handlePdf };
}

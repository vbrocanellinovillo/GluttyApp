import { FlatList } from "react-native";
import NoMenues from "./NoMenues";
import PdfItem from "../UI/Pdf/PdfItem";

export default function MenuesList({ menues, onDelete }) {
  if (!menues || menues.length === 0) {
    return <NoMenues />;
  }

  return (
    <FlatList
      data={menues}
      renderItem={({ item }) => (
        <PdfItem document={item} onDelete={() => onDelete(item.id)} />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

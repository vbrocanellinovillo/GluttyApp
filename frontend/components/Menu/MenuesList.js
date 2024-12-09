import { FlatList } from "react-native";
import NoMenues from "./NoMenues";
import PdfItem from "../UI/Pdf/PdfItem";

export default function MenuesList({ menues, onDelete, onVisualize }) {
  if (!menues || menues.length === 0) {
    return <NoMenues />;
  }

  function handleVisualize({ url, name }) {
    onVisualize && onVisualize(name, url);
  }

  return (
    <FlatList
      data={menues}
      renderItem={({ item }) => (
        <PdfItem
          name={item.file_name}
          size={(item.file_size / 1024).toFixed(2)}
          onDelete={() => onDelete(item.id)}
          onVisualize={handleVisualize.bind(this, {
            url: item.file_url,
            name: item.file_name,
          })}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

import { StyleSheet, View } from "react-native";
import AdminTab from "./AdminTab";

export default function AdminTabs({ ...props }) {
  const tabs = [
    { name: "Usuarios", position: 0 },
    { name: "Publicaciones", position: 1 },
  ];

  const activeIndex = props.navigationState?.index;

  return (
    <View style={styles.container}>
      {tabs.map((tab, i) => (
        <AdminTab key={i} active={i === activeIndex}>
          {tab.name}
        </AdminTab>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 50,
  },
});

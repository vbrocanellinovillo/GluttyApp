import { useLayoutEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import WebView from "react-native-webview";

export default function PdfScreen({ navigation, route }) {
  const { url, name } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({ title: name });
  });

  return <WebView style={styles.container} source={{ uri: url }} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

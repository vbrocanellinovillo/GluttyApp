import { useLayoutEffect } from "react";
import { StyleSheet, } from "react-native";
import WebView from "react-native-webview";

export default function PdfScreen({ navigation, route }) {
  console.log(route.params);

  const { url, name } = route.params;

  console.log(url);

  useLayoutEffect(() => {
    navigation.setOptions({ title: name });
  });

  return (
    <WebView
      style={styles.container}
      source={{ uri: url }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

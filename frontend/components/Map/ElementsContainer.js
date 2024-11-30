import { ScrollView, StyleSheet, View } from "react-native";
import DetailTitle from "./DetailTitle";

export default function ElementsContainer({
  title,
  items = [],
  children,
  scrollContainerStyle,
  containerStyle,
}) {
  if (!items || items.length === 0) return;

  return (
    <View style={containerStyle}>
      <DetailTitle>{title}</DetailTitle>
      <ScrollView
        contentContainerStyle={[styles.scrollContainer, scrollContainerStyle]}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    marginTop: 4,
  },
});

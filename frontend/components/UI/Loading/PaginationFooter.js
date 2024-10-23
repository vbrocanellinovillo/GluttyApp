import { ActivityIndicator } from "react-native";
import { Colors } from "../../../constants/colors";

export default function PaginationFooter({
  hasNextPage,
  color = Colors.mJordan,
  size = "small",
  style,
}) {
  return (
    <>
      {hasNextPage && (
        <ActivityIndicator color={color} size={size} style={style} />
      )}
    </>
  );
}

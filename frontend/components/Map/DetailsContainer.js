import BranchDetails from "./BranchDetails";
import LoadingMapBranchDetails from "../UI/Loading/LoadingMapBranchDetails";
import ErrorBranchDetails from "./ErrorBranchDetails";
import AnimatedInfoDetails from "../UI/AnimatedInfoDetails";
import { useNavigation } from "@react-navigation/native";

export default function DetailsContainer({
  visible,
  onDismiss,
  branch,
  isError,
  isLoading,
}) {
  let content = <></>;

  const navigation = useNavigation();

  function handlePdf(name, url) {
    onDismiss();
    navigation.navigate("PdfScreen", { name, url });
  }

  if (isLoading) {
    content = <LoadingMapBranchDetails />;
  }

  if (isError) {
    content = <ErrorBranchDetails />;
  }

  if (branch && !isLoading) {
    content = <BranchDetails branch={branch} handlePdf={handlePdf} />;
  }

  return (
    <>
      {visible && (
        <AnimatedInfoDetails
          onDismiss={onDismiss}
          visible={visible}
          isLoading={isLoading}
          isError={isError}
        >
          {content}
        </AnimatedInfoDetails>
      )}
    </>
  );
}

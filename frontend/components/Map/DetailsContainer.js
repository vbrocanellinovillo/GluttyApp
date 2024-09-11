import BranchDetails from "./BranchDetails";
import LoadingMapBranchDetails from "../UI/Loading/LoadingMapBranchDetails";
import ErrorBranchDetails from "./ErrorBranchDetails";
import AnimatedInfoDetails from "../UI/AnimatedInfoDetails";

export default function DetailsContainer({
  visible,
  onDismiss,
  branch,
  isError,
  isLoading,
}) {
  let content = <></>;

  if (isLoading) {
    content = <LoadingMapBranchDetails />;
  }

  if (isError) {
    content = <ErrorBranchDetails />;
  }

  if (branch && !isLoading) {
    content = <BranchDetails branch={branch} />;
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

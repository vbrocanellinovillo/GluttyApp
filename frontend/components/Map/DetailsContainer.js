import BranchDetails from "./BranchDetails";
import LoadingMapBranchDetails from "../UI/Loading/LoadingMapBranchDetails";
import ErrorBranchDetails from "./ErrorBranchDetails";
import AnimatedInfoDetails from "../UI/AnimatedInfoDetails";
import CommerceImage from "./CommerceImage";
import { usePdf } from "../../hooks/usePdf";

export default function DetailsContainer({
  visible,
  onDismiss,
  branch,
  isError,
  isLoading,
}) {
  let content = <></>;

  const { handlePdf } = usePdf(onDismiss);

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
          DragComponent={
            !isLoading &&
            !isError &&
            branch &&
            (() => <CommerceImage image={branch?.commerce_picture} />)
          }
        >
          {content}
        </AnimatedInfoDetails>
      )}
    </>
  );
}

import AnimatedInfoDetails from "../UI/AnimatedInfoDetails";

export default function InfoMedicalContainer({
  visible,
  onDismiss,
  isError,
  isLoading,
  children,
}) {
  return (
    <>
      {visible && (
        <AnimatedInfoDetails
          onDismiss={onDismiss}
          visible={visible}
          isLoading={isLoading}
          isError={isError}
        >
          {children}
        </AnimatedInfoDetails>
      )}
    </>
  );
}

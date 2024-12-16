import GluttyErrorScreen from "../UI/GluttyErrorScreen";

export default function ErrorBranchDetails({ onRefresh }) {
  return (
    <GluttyErrorScreen width={180} height={180} onRefresh={onRefresh}>
      Ocurrió un error. Por favor intente de nuevo más tarde
    </GluttyErrorScreen>
  );
}

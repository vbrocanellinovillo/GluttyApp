import GluttyErrorScreen from "../UI/GluttyErrorScreen";

export default function ErrorViewBranch() {
  return (
    <GluttyErrorScreen height={250} width={250}>
      Ocurrió un error. Por favor intente de nuevo más tarde.
    </GluttyErrorScreen>
  );
}

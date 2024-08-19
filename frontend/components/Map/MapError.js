import GluttyErrorScreen from "../UI/GluttyErrorScreen";

export default function MapError({ message }) {
  return (
    <GluttyErrorScreen height={300} width={300}>
      {message}
    </GluttyErrorScreen>
  );
}

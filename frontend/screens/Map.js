import ScreenCenter from "../components/UI/ScreenCenter";
import Title from "../components/UI/Title";
import { useDispatch } from "react-redux";

export default function Map() {
  const dispatch = useDispatch();


  return (
    <ScreenCenter>
      <Title>Proximamente mapaca...</Title>
    </ScreenCenter>
  );
}

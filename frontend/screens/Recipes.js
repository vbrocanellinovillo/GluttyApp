import ScreenCenter from "../components/UI/ScreenCenter";
import Title from "../components/UI/Title";
import { useDispatch } from "react-redux";

export default function Recipes() {
  const dispatch = useDispatch();


  return (
    <ScreenCenter>
      <Title>Proximamente recetas...</Title>
    </ScreenCenter>
  );
}

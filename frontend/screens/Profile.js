import ScreenCenter from "../components/UI/ScreenCenter";
import Title from "../components/UI/Title";
import Button from "../components/UI/Button";
import { Colors } from "../constants/colors";
import { useDispatch } from "react-redux";
import { authActions } from "../context/auth";

export default function Profile() {
  const dispatch = useDispatch();


  return (
    <ScreenCenter>
      <Title>Proximamente PROFILEEEE...</Title>
    </ScreenCenter>
  );
}

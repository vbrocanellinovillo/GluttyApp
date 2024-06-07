import { useSelector } from "react-redux";
import ScreenCenter from "../components/UI/ScreenCenter";
import Title from "../components/UI/Title";

export default function Profile() {
  const userData = useSelector(state => state.auth.userData);

  console.log(userData)
  return (
    <ScreenCenter>
      <Title>Proximamente PROFILEEEE...</Title>
    </ScreenCenter>
  );
}

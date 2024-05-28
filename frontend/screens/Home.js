import ScreenCenter from "../components/UI/ScreenCenter";
import Title from "../components/UI/Title";
import Button from "../components/UI/Button";
import { Colors } from "../constants/colors";
import { useDispatch } from "react-redux";
import { authActions } from "../context/auth";

export default function Home() {
  const dispatch = useDispatch();

  function logout() {
    dispatch(authActions.logout());
  }

  return (
    <ScreenCenter>
      <Title>Proximamente...</Title>
      <Button backgroundColor={Colors.locro} color={Colors.mJordan} onPress={logout}>
        Cerrar sesión
      </Button>
    </ScreenCenter>
  );
}

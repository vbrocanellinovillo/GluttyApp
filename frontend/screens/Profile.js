import { useSelector } from "react-redux";
import ScreenCenter from "../components/UI/ScreenCenter";
import Title from "../components/UI/Title";
import ProfileForm from "../components/Profile/ProfileForm";

export default function Profile() {
  const userData = useSelector(state => state.auth.userData);

  console.log(userData)
  return (
    <ProfileForm onSubmit={()=>console.log('holis perfil')} user={userData}/>
  );
}

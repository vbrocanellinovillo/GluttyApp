import { useSelector } from "react-redux";
import UpdateProfile from "../../components/Profile/UpdateProfile";

export default function Profile() {
  const isCommerce = useSelector((state) => state.auth.isCommerce);

  return <UpdateProfile isCommerce={isCommerce} />;
}

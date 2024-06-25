import ChangePasswordForm from "../../components/Profile/ChangePasswordForm";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function PrivacityAndSecurity() {
  const dispatch = useDispatch();

  const [isloading, setisloading] = useState(false);

  async function submitHandler(previousPassword, newPassword) {
    try {
    } catch (error) {
    } finally {
    }
  }

  return <ChangePasswordForm onSubmit={submitHandler} />;
}

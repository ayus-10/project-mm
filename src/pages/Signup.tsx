import UserForm from "../components/UserForm";
import useAuthentication from "../hooks/useAuthentication";
import useRedirect from "../hooks/useRedirect";

export default function Signup() {
  useAuthentication();
  useRedirect();

  return <UserForm formType="signup" />;
}

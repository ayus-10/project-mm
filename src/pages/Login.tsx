import UserForm from "../components/UserForm";
import useAuthentication from "../hooks/useAuthentication";
import useRedirect from "../hooks/useRedirect";

export default function Login() {
  useAuthentication();
  useRedirect();

  return <UserForm formType="LOGIN" />;
}

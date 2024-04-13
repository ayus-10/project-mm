import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UserForm from "@/components/UserForm";

export default async function Login() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/chat");
  }

  return <UserForm type="login" />;
}

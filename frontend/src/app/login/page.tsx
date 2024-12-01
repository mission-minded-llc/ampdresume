import { getProviders } from "next-auth/react";
import SignInComponent from "./SignInComponent";

export default async function SignIn() {
  const providers = await getProviders();
  return <SignInComponent providers={providers} />;
}

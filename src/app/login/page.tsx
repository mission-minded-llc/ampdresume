import { SignIn } from "./SignIn";
import { titleSuffix } from "@/constants";

export function generateMetadata() {
  return {
    title: `Sign In ${titleSuffix}`,
  };
}

export default function SignInPage() {
  return <SignIn />;
}

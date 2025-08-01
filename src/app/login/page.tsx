import { titleSuffix } from "@/constants";

import { SignIn } from "./SignIn";

export function generateMetadata() {
  return {
    title: `Sign In ${titleSuffix}`,
  };
}

export default function SignInPage() {
  return <SignIn />;
}

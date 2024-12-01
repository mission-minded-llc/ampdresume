import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  // Get the user's email
  const userEmail = session?.user?.email ?? "Not logged in.";

  return <div>Home | {userEmail}</div>;
}

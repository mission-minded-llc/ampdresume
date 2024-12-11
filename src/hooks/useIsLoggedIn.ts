import { useSession } from "next-auth/react";

export const useIsLoggedIn = () => {
  const session = useSession();

  return session?.data?.user ? true : false;
};

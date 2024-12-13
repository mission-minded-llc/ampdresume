import { usePathname } from "next/navigation";

export const useIsResumePage = () => {
  const pathname = usePathname();

  // Resume page path is typically /r/[username]
  const pathParts = pathname.split("/");

  return pathParts.length > 1 && pathParts[1] === "r";
};

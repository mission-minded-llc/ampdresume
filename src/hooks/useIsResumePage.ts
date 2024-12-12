import { usePathname } from "next/navigation";

export const useIsResumePage = () => {
  const pathname = usePathname();

  // Resume page path is typically /r/[username]
  // but an edit or other page could be /r/[username]/edit
  const pathParts = pathname.split("/");
  const isResumePage = pathParts[1] === "r" && pathParts.length === 3;

  return isResumePage;
};

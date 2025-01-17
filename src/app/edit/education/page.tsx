import { EditEducation } from "./EditEducation";
import { EditNav } from "../components/EditNav";

export function generateMetadata() {
  return {
    title: "Edit Education",
  };
}

export default function Page() {
  return (
    <>
      <EditNav />
      <EditEducation />
    </>
  );
}

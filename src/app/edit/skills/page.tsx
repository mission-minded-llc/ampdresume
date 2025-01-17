import { EditNav } from "../components/EditNav";
import { EditSkills } from "./EditSkills";

export function generateMetadata() {
  return {
    title: "Edit Skills",
  };
}

export default function Page() {
  return (
    <>
      <EditNav />
      <EditSkills />
    </>
  );
}

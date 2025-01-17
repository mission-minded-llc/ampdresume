import { EditExperience } from "./EditExperience";
import { EditNav } from "../components/EditNav";

export function generateMetadata() {
  return {
    title: "Edit Experience",
  };
}

export default function Page() {
  return (
    <>
      <EditNav />
      <EditExperience />
    </>
  );
}

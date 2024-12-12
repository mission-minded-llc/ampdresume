import { User } from "@prisma/client";
import styles from "./ResumeHeading.module.scss";

export const ResumeHeading = ({ user }: { user: User }) => {
  return (
    <h1 className={styles.userTitleHeading}>
      {user?.name}
      <br />
      <span className={styles.userTitle}>{user?.title}</span>
      <br />
      <span className={styles.userMeta}>
        {user?.displayEmail}
        <span className={styles.separator}>|</span>
        {user?.location}
      </span>
    </h1>
  );
};

import { ReactNode } from "react";
import { User } from "@/types";

/**
 * Location and email for the letterhead, in reading order.
 *
 * @param user Profile whose contact details belong on the letterhead.
 * @returns Nodes for each present contact fact. Email is a mailto link.
 */
export const letterheadContact = (user: User): ReactNode[] => {
  const parts: ReactNode[] = [];

  if (user.location) {
    parts.push(user.location);
  }

  if (user.displayEmail) {
    parts.push(
      <a key="email" href={`mailto:${user.displayEmail}`}>
        {user.displayEmail}
      </a>,
    );
  }

  return parts;
};

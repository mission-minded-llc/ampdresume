"use client";

import { DataContext } from "@/context/DataContext";
import { PositionsList } from "./PositionsList";
import { formatDate } from "@/lib/format";
import styles from "./WorkExperience.module.scss";
import { useContext } from "react";

export const WorkExperience = () => {
  const { companies, positions } = useContext(DataContext);

  return (
    <section className={styles.section}>
      <h2 className="resumeHeading">Work Experience</h2>
      {companies.map((company) => {
        const positionsInCompany = positions.filter(
          (position) => position.companyId === company.id,
        );

        const startDate = formatDate(company?.startDate?.toString());
        const endDate = formatDate(company?.endDate?.toString());

        return (
          <div key={`company-${company.id}`} className={styles.companySection}>
            <h3>
              {company.name}
              <span>
                {" "}
                &mdash; {startDate} to {endDate.length ? endDate : "Present"}
              </span>
            </h3>
            <PositionsList positions={positionsInCompany} />
          </div>
        );
      })}
    </section>
  );
};

import { InferGetStaticPropsType } from "next";
import React from "react";
import Activity from "../sections/activities/activity";
import { Footer, Navbar } from "../shared/components";
import { ConfigContext } from "../utils/contexts";
import { fetchData, DocumentType } from "../utils/prismic";
import { Activities as ActivitiesType, Config } from "../utils/types";
import { cx, css } from "@emotion/css";

export default function Activites({
  config,
  activities,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <ConfigContext.Provider value={config}>
      <div>
        <Navbar />
        {activities.activities.map((act, index) => {
          return <Activity {...act} key={index} inverted={index % 2 === 0} />;
        })}
        {activities.activities.length === 0 && (
          <EmptyState label={"activities"} />
        )}
        <Footer />
      </div>
    </ConfigContext.Provider>
  );
}

export const EmptyState = ({ label }) => {
  return (
    <div
      className={cx(
        "flex flex-col items-center justify-center text-center",
        css`
          min-height: 50vh;
        `
      )}
    >
      <h2 className="text-2xl font-extrabold">
        There's no new {label} just yet.
      </h2>
      <p className="mt-2">Please check back soon.</p>
    </div>
  );
};

export async function getStaticProps() {
  const config = await fetchData(DocumentType.Config);
  const activities = await fetchData(DocumentType.Activities);

  return {
    props: {
      config: config as Config,
      activities: activities as ActivitiesType,
    }, // will be passed to the page component as props
  };
}

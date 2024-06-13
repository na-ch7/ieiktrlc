import { InferGetStaticPropsType } from "next";
import { RichText } from "prismic-reactjs";
import Link from "next/link";
import React from "react";
import { Footer, Navbar, Table } from "../shared/components";
import { ConfigContext } from "../utils/contexts";
import { fetchData, DocumentType } from "../utils/prismic";
import { Config, Members as MembersType } from "../utils/types";
import { css } from "@emotion/css";

const REDACTION_SYMBOL = "N/A";

const columns = [
  { field: "headshot", title: "Headshot" },
  { field: "name", title: "Name" },
  { field: "membership_number", title: "Membership Number" },
  { field: "division", title: "Division" },
  { field: "email", title: "Email" },
  { field: "mobile", title: "Mobile" },
];

const Members = ({
  config,
  members,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const data = members.members.map((member) => {
    return {
      id: member.membership_number,
      headshot: member.headshot.url ? (
        <div className={"w-full flex justify-center"}>
          <img
            className="max-w-xs w-20 md:w-40"
            src={member.headshot.url}
            alt={member.headshot.alt}
          />
        </div>
      ) : null,
      name: RichText.asText(member.name),
      membership_number: member.membership_number,
      division: RichText.asText(member.division),
      leadership: member.leadership,
      email: member.redact_email ? (
        REDACTION_SYMBOL
      ) : (
        <Link href={`mailto:${member.email}`} className="text-secondary">
          {member.email}
        </Link>
      ),
      mobile: member.redact_contact_number ? (
        REDACTION_SYMBOL
      ) : (
        <Link href={`tel:${member.contact_number}`} className="text-secondary">
          {member.contact_number}
        </Link>
      ),
    };
  });

  return (
    <ConfigContext.Provider value={config}>
      <div className="md:text-base text-sm">
        <Navbar />
        <div className="container mx-auto my-8 overflow-x-auto">
          <Table
            columns={columns}
            data={data.filter(({ leadership }) => leadership)}
          />
        </div>
        <div className="container mx-auto my-8 overflow-x-auto">
          <Table
            columns={columns}
            data={data.filter(({ leadership }) => !leadership)}
          />
        </div>
        <Footer />
      </div>
    </ConfigContext.Provider>
  );
};

export async function getStaticProps() {
  const config = await fetchData(DocumentType.Config);
  const members = await fetchData(DocumentType.Members);

  return {
    props: { config: config as Config, members: members as MembersType }, // will be passed to the page component as props
  };
}

export default Members;

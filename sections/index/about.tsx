import { RichText } from "prismic-reactjs";
import React, { useContext } from "react";
import { HomeContext } from "../../utils/contexts";
import { Section as SectionType } from "../../utils/types";

const Section = ({ title, body }: SectionType) => {
  return (
    <div className="my-8">
      <h1 className="text-4xl mb-4">{RichText.asText(title)}</h1>
      <div className="font-normal text-justify">
        <RichText render={body} />
      </div>
    </div>
  );
};

const About = () => {
  const { sections } = useContext(HomeContext);
  return (
    <div className="px-10">
      {sections.map((section, index) => (
        <Section key={index} {...section} />
      ))}
    </div>
  );
};

export default About;

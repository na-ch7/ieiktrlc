import { cx } from "@emotion/css";
import { RichText } from "prismic-reactjs";
import React from "react";
import { Activity as ActivityType } from "../../utils/types";

const Activity = ({
  title,
  body,
  image,
  inverted,
}: ActivityType & { inverted?: boolean }): JSX.Element => {
  return (
    <>
      <div
        className={cx(
          "flex flex-col justify-center items-center md:border-b-2 md:border-gray-200 mx-14 my-10 pb-10",
          {
            "md:flex-row-reverse": inverted,
            "md:flex-row": !inverted,
          }
        )}
      >
        <div className="w-full lg:w-2/3 lg:px-12">
          <h1 className="text-4xl font-bold mb-4 my-4">
            {RichText.asText(title)}
          </h1>
          <RichText render={body} />
        </div>
        <div className="w-full lg:w-1/3 lg:px-12 mt-4 lg:mt-0">
          <img src={image.url} alt={image.alt} />
        </div>
      </div>
    </>
  );
};

export default Activity;

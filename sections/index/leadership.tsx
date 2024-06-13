import { RichText } from "prismic-reactjs";
import React, { useContext } from "react";
import Card from "../../shared/components/card";
import { HomeContext } from "../../utils/contexts";

const Leadership = () => {
  const { leadership } = useContext(HomeContext);

  return (
    <div className="px-4 sm:px-10">
      <div className="grid gap-4 sm:gap-8 grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full">
        {leadership.map((leader, index) => (
          <div key={index} className="p-4">
            <Card
              image_url={leader.image.url}
              title={RichText.asText(leader.name)}
              text={RichText.asText(leader.designation)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leadership;
import { RichText } from "prismic-reactjs";
import React from "react";
import { Footer, Navbar } from "../../shared/components";
import { ConfigContext } from "../../utils/contexts";
import { Config, Events as EventsType } from "../../utils/types";
import { DocumentType, fetchData } from "../../utils/prismic";
import { InferGetServerSidePropsType } from "next";

const serializer = (type, element, text, children) => {
  if (type === "paragraph") return <p className="my-4">{children}</p>;
  if (type === "heading4")
    return <h4 className="mt-4 text-lg md:text-xl lg:text-2xl">{children}</h4>;
  if (type === "list-item")
    return (
      <li key={text} className="list-disc list-inside">
        {children}
      </li>
    );
};

export default function Events({
  config,
  event: { title, image, content },
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <ConfigContext.Provider value={config}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="item-center m-3 flex flex-col justify-around">
          <div className="p-4 text-center text-2xl md:text-3xl lg:text-5xl font-semibold">
            <RichText render={title} />
          </div>
          {image.url && (
            <div className="flex flex-col items-center gap-2 p-4">
              <img
                src={image.url}
                className="md:h-96 md:w-4/5 lg:w-3/5 rounded-xl object-cover shadow-md"
              />
            </div>
          )}
          <div className="p-4 md:px-10 lg:px-24 xl:px-32 text-justify text-lg lg:text-xl font-normal">
            <RichText render={content} htmlSerializer={serializer} />
          </div>
        </div>
        <Footer />
      </div>
    </ConfigContext.Provider>
  );
}

export async function getServerSideProps(context) {
  const [config, events] = await Promise.all([
    fetchData(DocumentType.Config),
    fetchData(DocumentType.Events),
  ]);
  
  const [event] = events.events.filter(
    (item) => item.event_slug === context.params.slug
  );

  return {
    props: { config: config, event: event }, // will be passed to the page component as props
  };
}

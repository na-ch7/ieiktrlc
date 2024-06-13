import { RichText } from "prismic-reactjs";
import React from "react";
import { Footer, Navbar } from "../shared/components";
import { ConfigContext } from "../utils/contexts";
import { Config, News as NewsType } from "../utils/types";
import { fetchData, DocumentType } from "../utils/prismic";
import { InferGetServerSidePropsType } from "next";
import { EmptyState } from "./activities";

export default function News({
  config,
  news,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <ConfigContext.Provider value={config}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="my-5 mx-4 flex-grow md:mx-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {news.news.map(({ id, image, title, src, description, date, author }) => {
              return (
                <a href={src.url} key={id} target="_blank" className="hover:shadow-lg">
                  <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-40 md:h-56 object-cover"
                    />
                    <div className="p-4">
                      <h1 className="text-lg font-semibold mb-2">{RichText.asText(title)}</h1>
                      <p className="text-sm text-gray-600 mb-2">{RichText.asText(description)}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">{author} - {date}</p>
                        <button className="text-sm text-blue-500 hover:underline">Read More</button>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
        {news.news.length === 0 && <EmptyState label={"news"} />}
        <Footer />
      </div>
    </ConfigContext.Provider>
  );
}

export async function getServerSideProps() {
  const configPromise = fetchData(DocumentType.Config);
  const newsPromise = fetchData(DocumentType.News);

  const [config, news] = await Promise.all([configPromise, newsPromise]);

  return {
    props: {
      config: config,
      news: news
    }
  };
}

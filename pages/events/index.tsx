import React, { useState } from "react";
import { Footer, Navbar } from "../../shared/components";
import { ConfigContext } from "../../utils/contexts";
import Link from "next/link";
import { fetchData, DocumentType } from "../../utils/prismic";
import { InferGetServerSidePropsType } from "next";
import { EmptyState } from "../activities";

export default function Events({
  config,
  events,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [sortedEvents, setSortedEvents] = useState(events.events);
  const [sortBy, setSortBy] = useState("datetime"); // Default sorting by datetime

  const handleSortBy = (type: string) => {
    setSortBy(type);
    const sorted =
      type === "title"
        ? [...events.events].sort((a, b) => (a.title > b.title ? 1 : -1))
        : [...events.events].sort((a, b) => (a.datetime > b.datetime ? 1 : -1));
    setSortedEvents(sorted);
  };

  return (
    <ConfigContext.Provider value={config}>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto py-8 px-4 md:px-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Events</h1>
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-sm font-semibold">Sort by:</span>
            <button
              onClick={() => handleSortBy("datetime")}
              className={`px-3 py-1 rounded-md ${
                sortBy === "datetime" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
              } hover:bg-blue-700`}
            >
              Date
            </button>
            <button
              onClick={() => handleSortBy("title")}
              className={`px-3 py-1 rounded-md ${
                sortBy === "title" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
              } hover:bg-blue-700`}
            >
              Title
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEvents.map(({ image, title, description, datetime, event_slug }, index) => (
              <Link href={`/events/${event_slug}`} key={index}>
                <div className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
                  <img src={image.url} alt={image.alt} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{title[0].text}</h2>
                    <p className="text-sm text-gray-600 mb-3">{new Date(datetime).toDateString()}</p>
                    <p className="text-gray-700">{description[0].text}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {events.events.length === 0 && <EmptyState label={"event"} />}
        </div>
        <Footer />
      </div>
    </ConfigContext.Provider>
  );
}

export async function getServerSideProps() {
  const [config, events] = await Promise.all([fetchData(DocumentType.Config), fetchData(DocumentType.Events)]);

  return {
    props: { config: config, events: events }, // will be passed to the page component as props
  };
}

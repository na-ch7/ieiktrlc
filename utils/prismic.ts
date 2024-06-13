import Prismic from "prismic-javascript";
const apiEndpoint = "your-api-endpoint"; // Define the API endpoint
const accessToken = ""; // This is where you would add your access token for a Private repository

export const Client = Prismic.client(apiEndpoint, { accessToken });

export enum DocumentType {
  Config = "config",
  Home = "home",
  Activities = "activities",
  Members = "members",
  News = "news",
  Events = "events",
}

export const fetchData = async (type: DocumentType) => {
  const {
    results: [result],
  } = await Client.query(Prismic.Predicates.at("document.type", type));

  return result.data;
};

import Prismic from "prismic-javascript";
const apiEndpoint = "your-api-endpoint"; // Define the API endpoint
const accessToken = ""; // This is where you would add your access token for a Private repository

export const Client = Prismic.client(apiEndpoint, { accessToken });

export enum DocumentType {
  Image = "image",
}

export const fetchData = async (type: DocumentType) => {
  const {
    results: [result],
  } = await Client.query(Prismic.Predicates.at("document.type", type));
  return result.data;
};

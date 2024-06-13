import { InferGetStaticPropsType } from "next";
import React, { useState } from "react";
import { Footer, Navbar } from "../shared/components";
import { ConfigContext } from "../utils/contexts";
import { fetchData, DocumentType } from "../utils/gallery";
import { Images as ImageType } from "../utils/types";

const Members = ({
  images,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const config: any = {
    organization: [
      {
        type: "heading1",
        text: "Kattankulathur Local Centre",
        spans: [],
      },
    ],
    contact_number: null,
    email: "kattankulathurlc@ieindia.org",
    address: [
      {
        type: "paragraph",
        text: "UB 16, 4th Floor, University Building, SRM Institute of Science and Technology Campus, Kattankulathur - 603203.",
        spans: [],
      },
    ],
  };

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <ConfigContext.Provider value={config}>
      <div>
        <Navbar />
        <div className="container p-2 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.keys(images).map((key, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-md"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={images[key].url}
                alt={images[key].alt}
                className={`w-full h-full object-cover transition duration-300 ease-in-out ${
                  hoveredIndex === index ? "transform scale-110" : ""
                }`}
              />
              <div className="absolute bottom-0 left-0 p-4 text-white bg-black bg-opacity-50">
                <p>{images[key].alt}</p>
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </ConfigContext.Provider>
  );
};

export async function getStaticProps() {
  // const config = await fetchData(DocumentType.Config);
  const images = await fetchData(DocumentType.Image);

  return {
    props: { images: images as ImageType }, // will be passed to the page component as props
  };
}

export default Members;

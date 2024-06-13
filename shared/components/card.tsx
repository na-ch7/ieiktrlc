import React from "react";
import Image from "next/image";

type Props = {
  image_url: string;
  title: string;
  text: string;
};

const Card = ({ image_url, title, text }: Props) => {
  return (
    <div className="transform transition-transform duration-500 hover:scale-105">
      <div className="border-2 border-gray-100 my-4 rounded-lg shadow-lg overflow-hidden bg-white">
        <img src={image_url} alt={title} className="h-52 w-full object-cover" />
        <div className="p-4">
          <h3 className="text-2xl font-semibold mb-2">{title}</h3>
          <p className="text-sm text-gray-700">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;

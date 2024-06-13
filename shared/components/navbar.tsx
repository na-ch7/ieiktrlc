import React, { useContext, useState } from "react";
import Link from "next/link";
import { ConfigContext } from "../../utils/contexts";
import { RichText } from "prismic-reactjs";

const Navbar = () => {
  const { organization, address, email } = useContext(ConfigContext);
  const [navbar, setNavbar] = useState(false);
  return (
    <>
      <header className="flex-col flex md:flex-row items-center justify-around w-full mt-2">
        <div className="flex space-around">
          <img className="w-24 h-24" src="/logo.png" />
          <img className="w-24 h-24 ml-8 md:hidden" src="/icon-100-years.png" />
        </div>

        <img className="my-4" src="/wordmark.png" />
        <img className="w-24 hidden md:block" src="/icon-100-years.png" />
      </header>
      <div className="flex items-center justify-center">
        <h1 className="text-primary hover:text-secondary transition-colors uppercase text-3xl font-bold my-0 text-center tracking-wide">
          {RichText.asText(organization)}
        </h1>
      </div>
      <div className="flex items-center justify-center">
        <h3 className="transition-colors text-2xl font-bold mx-6 md:mx-16 mt-4 text-center tracking-wide">
          {RichText.asText(address)}
        </h3>
      </div>
      <div className="flex items-center justify-center">
        <h4 className="text-primary transition-colors text-1xl font-bold my-1 text-center tracking-wide">
          {`Email: ${email}`}
        </h4>
      </div>
      <nav className="text-xs md:text-white" style={{ backgroundColor: '#072136' }}>
        <ul
          className="md:hidden flex px-2 py-2 md:px-4 text-center items-center justify-evenly"
          onClick={() => {
            setNavbar(!navbar);
          }}
        >
          <li
            title={"Menu"}
            key={"/"}
            className="md:hidden uppercase font-bold mx-auto w-full hover:text-gray-700 cursor-pointer text-base"
          >
            Menu
          </li>
        </ul>
        <ul
          className={`${
            navbar ? "flex flex-col" : "hidden md:flex"
          } px-2 md:px-4 md:py-4 md:flex-row text-center items-center justify-evenly`}
        >
          <ListItem title={"Home"} href={"/"} key={"/"} />
          <ListItem
            title={"Committee Members"}
            href={"/members"}
            key={"/members"}
          />
          <ListItem
            title={"Activities"}
            href={"/activities"}
            key={"/activities"}
          />
          <ListItem title={"Gallery"} href={"/gallery"} key={"/gallery"} />
          <ListItem
            title={"News"}
            href={"/news"}
            key={"/news"}
            className="animate-pulse"
          />
          <ListItem
            title={"Events"}
            href={"/events"}
            key={"/events"}
          />
          <ListItem title={"Contact Us"} href="/#contact" key={"/#contact"} />
        </ul>
      </nav>
    </>
  );
};

const ListItem = ({
  title,
  href,
  className,
}: {
  title: string;
  href: string;
  className?: string;
}) => (
  <li
    className={`uppercase py-2 md:py-0 font-semibold mx-auto w-full hover:text-gray-700`}
  >
    <Link href={href} className={className}>
      {title}
    </Link>
  </li>
);

export default Navbar;

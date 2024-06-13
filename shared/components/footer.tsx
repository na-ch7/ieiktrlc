import { RichText } from "prismic-reactjs";
import React, { useContext } from "react";
import { Phone, MapPin, Mail } from "react-feather";
import Link from "next/link";
import { ConfigContext } from "../../utils/contexts";

const Footer = () => {
  const { address, contact_number, email } = useContext(ConfigContext);
  return (
    <div id="contact">
      <div className="flex flex-col md:flex-row justify-between w-full text-white p-6 py-12 text-center md:text-left items-center" style={{ backgroundColor: '#072136' }}>
        <div className="py-2">
          <h1 className="font-bold text-4xl uppercase">Contact us</h1>
        </div>
        <div className="py-2">
          <div className="flex items-center">
            {/* <Phone className="inline-block mr-2 my-2" size={18} /> */}
            <Link href={`tel:${contact_number}`}>{contact_number}</Link>
          </div>
          <div className="flex items-center">
            <Mail className="inline-block mr-2 my-2" size={18} />
            <Link href={`mailto:${email}`}>{email}</Link>
          </div>
        </div>
        <div className="py-2 w-full md:w-1/3 flex-grow-0">
          <div className="flex items-start">
            {/* <MapPin className="inline-block my-2 mr-2" size={36} />{" "} */}
            <RichText render={address} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

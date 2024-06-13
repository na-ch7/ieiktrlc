import React, { useContext } from "react";
import { Carousel, Navbar } from "../../shared/components";
import { HomeContext } from "../../utils/contexts";

const Hero = () => {
  const { slides } = useContext(HomeContext);
  return (
    <>
      <Navbar />
      <Carousel slides={slides}></Carousel>
    </>
  );
};

export default Hero;

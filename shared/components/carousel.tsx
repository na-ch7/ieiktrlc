import React, { useState } from "react";
import {
  CarouselProvider,
  Slide,
  Slider,
  ButtonBack,
  ButtonNext,
  DotGroup,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { PrismicImage } from "../../utils/types";

interface CarouselProps {
  slides: { image: PrismicImage; caption?: string }[];
}

const Carousel = ({ slides }: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="relative w-full max-w-screen-lg mx-auto">
      <CarouselProvider
        naturalSlideWidth={230}
        naturalSlideHeight={125}
        totalSlides={slides.length}
        interval={3000}
        isPlaying
        infinite
        currentSlide={currentSlide}
      >
        <Slider className="rounded-lg overflow-hidden">
          {slides.map(({ image: { url, alt }, caption }, index) => (
            <Slide index={index} key={index}>
              <img src={url} alt={alt} className="w-full" />
              {caption && (
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-4 text-center">
                  {caption}
                </div>
              )}
            </Slide>
          ))}
        </Slider>
        <ButtonBack className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full shadow-md hover:shadow-lg">
          &lt;
        </ButtonBack>
        <ButtonNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full shadow-md hover:shadow-lg">
          &gt;
        </ButtonNext>
        <DotGroup className="absolute bottom-0 left-0 right-0 flex justify-center p-4 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`bg-white bg-opacity-75 p-2 rounded-full shadow-md focus:outline-none ${
                index === currentSlide ? "active-dot" : ""
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </DotGroup>
      </CarouselProvider>
    </div>
  );
};

export default Carousel;
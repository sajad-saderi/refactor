import React, { useState, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack, IoIosExpand } from "react-icons/io";
import "./slider.module.scss";
import Gallery from "./Gallery";

const Slider = (props: ISlider) => {
  const [Feed, setFeed] = useState([]);
  const [alt, setAlt] = useState("");
  const [Loade, setLoade] = useState(false);
  const [carousel, setCarousel] = useState(false);
  const [heightController, setheightController] = useState(0);
  const [slideIndex, setslideIndex] = useState(0);
  const [colseModal, setcolseModal] = useState(true);
  const [rightV, setrightV] = useState(0);
  const [startPoint, setstartPoint] = useState(0);
  const [FromX, setFromX] = useState(0);
  const [falgControl, setfalgControl] = useState(false);

  // state = {
  //   // heightController: 0,
  //   // slideIndex: 0,
  //   // colseModal: true,
  //   // rightV: 0,
  //   // startPoint: 0,
  //   // FromX: 0,
  //   // falgControl: false
  //   // direction:null
  // };
  const positionController = (w, h) => {
    if (w / h < 1.2) {
      setheightController((w / h) * 110);
    }
    if (w / h < 0.9) {
      setheightController((w / h) * 160);
    }
  };

  const SliderNav = slide => {
    if (slide === "right" && slideIndex < props.Feed.length - 1) {
      setslideIndex(1 + slideIndex);
      // direction:slide;
    } else if (slide === "left" && slideIndex > 0) {
      setslideIndex(slideIndex - 1);
      // direction:slide
    } else return;
  };

  const CloseGallery = () => {
    setcolseModal(!colseModal);
  };

  useEffect(() => {
    setFeed(props.Feed);
    setAlt(props.alt);
    setLoade(props.Feed.length > 0 ? true : false);
    setCarousel(props.Feed.length > 1 ? true : false);
  }, [props.Feed]);

  return (
    Loade && (
      <div className="carousel_container">
        {!colseModal && (
          <Gallery
            Feed={Feed}
            CloseGallery={CloseGallery}
            index={slideIndex}
            alt={alt}
          />
        )}
        {carousel ? (
          <>
            {Feed.map((item, i) => {
              return (
                <img
                  onClick={CloseGallery}
                  onTouchEnd={() => {
                    setrightV(0);
                    setfalgControl(false);
                  }}
                  onTouchStart={(e: any) => {
                    e.persist();
                    setstartPoint(e.changedTouches[0].screenX);
                    setFromX(e.target.x);
                    setfalgControl(true);
                  }}
                  onTouchMoveCapture={e => {
                    e.persist();
                    if (e.changedTouches[0].screenX > startPoint) {
                      let right = e.changedTouches[0].screenX - startPoint;
                      setrightV(-right);
                      if (right > 100 && falgControl) {
                        setfalgControl(false);
                        SliderNav("left");
                        return;
                      } else {
                        // this.setState({
                        //   rightV: "-" + 0
                        // });
                      }
                    } else {
                      let left = startPoint - e.changedTouches[0].screenX;
                      setrightV(left);
                      if (left > 100 && falgControl) {
                        // rightV: 0,
                        setfalgControl(false);
                        SliderNav("right");
                        return;
                      } else {
                        // this.setState({
                        //   rightV: 0
                        // });
                      }
                    }
                  }}
                  style={{
                    right: rightV + "px"
                  }}
                  className={[
                    slideIndex === i && "carousel_FrontImage",
                    slideIndex < i && "carousel_FrontImage TranslateRight",
                    slideIndex > i && "carousel_FrontImage TranslateLeft"
                  ].join(" ")}
                  src={item.url}
                  alt={alt}
                />
              );
            })}
            <img
              className="carousel_BackImage"
              // className={[
              //   "carousel_BackImage",
              //   this.state.slideIndex === i ? "activslide" : "HiddenSlide"
              // ].join(" ")}
              style={{
                top: `-${heightController}px`
              }}
              src={Feed[slideIndex].url}
              alt={alt}
              onLoad={() =>
                positionController(
                  Feed[slideIndex].width,
                  Feed[slideIndex].height
                )
              }
            />
          </>
        ) : (
          <>
            <img
              className="carousel_FrontImage"
              src={Feed[0].url}
              alt={alt}
              onLoad={() => positionController(Feed[0].width, Feed[0].height)}
            />
            <img
              className="carousel_BackImage"
              src={Feed[0].url}
              style={{
                top: `-${heightController}px`
              }}
              alt={alt}
              onLoad={() => positionController(Feed[0].width, Feed[0].height)}
            />
          </>
        )}
        {carousel && (
          <>
            {slideIndex < Feed.length - 1 && (
              <button className="NAVIGA arrow-right">
                <IoIosArrowForward
                  onClick={() => SliderNav("right")}
                  size="3.3rem"
                />
              </button>
            )}
            {slideIndex > 0 && (
              <button className="NAVIGA arrow-left">
                <IoIosArrowBack
                  onClick={() => SliderNav("left")}
                  size="3.2rem"
                />
              </button>
            )}
          </>
        )}
        {carousel && (
          <div className="NavBotton">
            {Feed.map((_, i) => {
              return (
                <span
                  onClick={() => setslideIndex(i)}
                  className={slideIndex === i ? "activeDot" : "deactiveDot"}
                ></span>
              );
            })}
          </div>
        )}
        {carousel && (
          <div className="FullScreen" onClick={CloseGallery}>
            <IoIosExpand size="4rem" />
          </div>
        )}
      </div>
    )
  );
};

interface ISlider {
  Feed: any;
  alt: string;
}

export default Slider;

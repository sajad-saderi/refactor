import React, { useState, useEffect } from "react";
import { IoMdClose, IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import "./Gallery.module.scss";

const Gallery = (props: IGallery) => {
  const [Feed, setFeed] = useState([]);
  const [alt, setAlt] = useState("");
  const [carousel, setcarousel] = useState(false);
  const [index, setindex] = useState(null);
  const [rightV, setrightV] = useState(0);
  const [startPoint, setstartPoint] = useState(0);
  const [FromX, setFromX] = useState(0);
  const [falgControl, setfalgControl] = useState(false);

  const showController = index => {
    setindex(index);
  };

  const SliderNav = slide => {
    if (slide === "right" && index < Feed.length - 1) {
      setindex(1 + index);
    } else if (slide === "left" && index > 0) {
      setindex(index - 1);
    } else return;
  };

  useEffect(() => {
    setFeed(props.Feed);
    setAlt(props.alt);
    setcarousel(props.Feed.length > 1 ? true : false);
    setindex(props.index);
  }, []);

  return (
    <div className="Gallery_Container">
      <div className="closeButton" onClick={props.CloseGallery}>
        <IoMdClose size="3rem" />
      </div>
      <div className="show_part">
        {Feed.map((item, i) => {
          return (
            <img
              src={item.url}
              alt={alt}
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
              onTouchMoveCapture={(e: any) => {
                e.persist();
                if (e.changedTouches[0].screenX > startPoint) {
                  let right = e.changedTouches[0].screenX - startPoint;
                  if (right > 100 && falgControl) {
                    setrightV(0);
                    setfalgControl(false);
                    SliderNav("left");
                  } else {
                    setrightV(-0);
                  }
                } else {
                  let left = startPoint - e.changedTouches[0].screenX;
                  if (left > 100 && falgControl) {
                    setrightV(0), setfalgControl(false);
                    SliderNav("right");
                  } else {
                    setrightV(0);
                  }
                }
              }}
              className={[
                index === i && "carousel_FrontImage",
                index < i && "carousel_FrontImage TranslateRight",
                index > i && "carousel_FrontImage TranslateLeft"
              ].join(" ")}
              style={{
                right: rightV + "px"
              }}
            />
          );
        })}
      </div>
      <div className="thumbnail_part">
        {Feed.map((item, i) => {
          return (
            <img src={item.url} onClick={() => showController(i)} alt={alt} />
          );
        })}
      </div>
      {carousel && (
        <>
          {index < Feed.length - 1 && (
            <button className="NAVIGA arrow-right G_R">
              <IoIosArrowForward
                onClick={() => SliderNav("right")}
                size="3rem"
              />
            </button>
          )}
          {index > 0 && (
            <button className="NAVIGA arrow-left G_L">
              <IoIosArrowBack onClick={() => SliderNav("left")} size="3rem" />
            </button>
          )}
        </>
      )}
    </div>
  );
};

interface IGallery {
  Feed: any;
  CloseGallery: any;
  index: number;
  alt: string;
}

export default Gallery;

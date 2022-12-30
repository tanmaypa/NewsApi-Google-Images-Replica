
import React from "react";
import "./NewsItem.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

const NewsItem = (props) => {
  let { title, urlToImage, newsurl, source, clicked, getUrlFromChild } = props;
  // Each article getting called logic. Used lazy loading to minimize api calls overhead
  return (
    <div
      className={` ${clicked ? "eachClickedImg" : "eachImg"}`}
      style={{ margin: "5px", padding: "0px" }}
    >
      <div className="card" style={{ borderRadius: "10px" }}>
        <LazyLoadImage
          className="lazyImg"
          onClick={() => getUrlFromChild(props)}
          height="180px"
          width="100%"
          src={
            !urlToImage
              ? "https://img.etimg.com/thumb/msid-93850999,width-1070,height-580,imgsize-18346,overlay-etmarkets/photo.jpg"
              : urlToImage
          }
          alt="..."
        />
      </div>
      <a href={newsurl} className="site" target="_blanks">
        <p style={{ marginBottom: "0px", color: "gray", fontSize: "13px" }}>
          {source}
        </p>
        <p style={{ color: "black", fontSize: "13px" }}>{title}...</p>
      </a>
    </div>
  );
};

export default NewsItem;
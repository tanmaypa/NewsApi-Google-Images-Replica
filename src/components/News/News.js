

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import NewsItem from "../NewsItem/NewsItem";
import PropTypes from "prop-types";
import Spinner from "../Spinner";
import "./News.css";
import axios from "axios";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [card, setCard] = useState([]);
  const [copied, setCopied] = useState(false);
  const cardSection = useRef(null);
  const searchRef = useRef(null);

  // callback function to child
  const getUrlFromChild = (url) => {
    cardSection?.current?.scrollIntoView({ behavior: "smooth" });
    setClicked(true);
    setCard(url);
  };

  // fetching articles and relatedarticles response
  const fetchNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${query.length > 0 ? query : "general"}&apiKey=${props.apiKey}`;
    const relatedUrl = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${query.length > 0 ? query : "general"}&apiKey=${
      props.apiKey
    }&page=3&pageSize=${props.pageSize}`;

    setLoading(true);
    let data = await axios.get(url);
    let relatedData = await axios.get(relatedUrl);
    setArticles(data.data.articles);
    setRelatedArticles(relatedData.data.articles);
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      fetchNews();
    }
  }, [search]);

  const handleSearch = () => {
    const array = [
      "business",
      "entertainment",
      "general",
      "health",
      "science",
      "sports",
      "technology",
    ];


    if (array.indexOf(query) === -1) {
      window.alert("Please enter correct keyword!!");
    } else {
      setSearch(query);
      setClicked(false);
    }
  };

  // Todo: write the filter logic
  const handleLeftClick = () => {};

  const handleRightClick = () => {};

  // To avoid repetative code
  const callNewsItem = (element) => {
    return (
      <NewsItem
        getUrlFromChild={getUrlFromChild}
        fulltitle={element.title}
        title={element.title ? element.title.slice(0, 40) : ""}
        description={
          element.description ? element.description.slice(0, 88) : ""
        }
        urlToImage={element.urlToImage ? element.urlToImage : ""}
        newsurl={element.url ? element.url : ""}
        author={element.author ? element.author : "Unknown"}
        date={element.publishedAt}
        source={element.source.name}
      />
    );
  };

  return (
    // Dividid the body in two sections using col-md-6, modal-body row classses
    <div>
      <h1 ref={searchRef} className="newsapi">
        News Api - Top Headlines
      </h1>
      <h1 className="text-center">
        <input
          className="searchbar"
          type="text"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="searchBtn" onClick={() => handleSearch()}>
          <i className="bi bi-search"></i>
        </button>
      </h1>
      <h2 className="keywords">
        Keywords: business | entertainment | general | health | science | sports
        | technology
      </h2>
      {loading && <Spinner />}
      <div className="container">
        <div
          className={`${!clicked ? "row " : "modal-body row "}`}
          style={{ padding: "0px", margin: "0px" }}
        >
          <div
            className={`${clicked ? "col-md-6 no-gutters" : ""}`}
            style={{ padding: "0px", margin: "0px" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {articles.map((element, Index) => {
                return (
                  <div
                    className={`${
                      clicked
                        ? `${
                            element.urlToImage === card.urlToImage
                              ? "col-md-6 highlight"
                              : "col-md-6"
                          }`
                        : "col-md-3"
                    }`}
                    style={{ margin: "0px", padding: "0px" }}
                    key={Index}
                  >
                    {callNewsItem(element)}
                  </div>
                );
              })}
            </div>
          </div>
          {
          // condition check for right side card when any article is clicked
          clicked && (
            <div className="col-md-6 clickedModal">
              <div className="card scroll">
                <h5 className="card-header">
                  <p
                    style={{
                      margin: "13px",
                      textAlign: "start",
                      color: "gray",
                      fontSize: "13px",
                    }}
                  >
                    <span className="badge rounded-pill bg-danger">
                      {card.source}
                    </span>
                  </p>
                  <div style={{ display: "flex" }}>
                    <button
                      className="leftbtn"
                      onClick={() => handleLeftClick()}
                    >
                      <i className="bi bi-chevron-left"></i>
                    </button>
                    <button
                      className="rightbtn"
                      onClick={() => handleRightClick()}
                    >
                      <i className="bi bi-chevron-right"></i>
                    </button>
                    <div className="dropdown">
                      <button
                        className="dropdownMenuButton1"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="bi bi-three-dots-vertical"></i>
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <button
                            style={{
                              paddingTop: "10px",
                              paddingBottom: "10px",
                            }}
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                          >
                            <i className="bi bi-share"></i>{" "}
                            &nbsp;&nbsp;&nbsp;Share
                          </button>
                        </li>
                        <li>
                          <a
                            style={{
                              paddingTop: "10px",
                              paddingBottom: "10px",
                            }}
                            className="dropdown-item"
                            href="#"
                          >
                            <i className="bi bi-bookmark"></i>{" "}
                            &nbsp;&nbsp;&nbsp;Save
                          </a>
                        </li>
                        <li>
                          <a
                            style={{
                              paddingTop: "10px",
                              paddingBottom: "10px",
                            }}
                            className="dropdown-item"
                            href="#"
                          >
                            <i className="bi bi-flag"></i>{" "}
                            &nbsp;&nbsp;&nbsp;Report this result
                          </a>
                        </li>
                      </ul>
                    </div>
                    <button
                      type="button"
                      className="closebtn"
                      onClick={() => {
                        setClicked(!clicked);
                        searchRef?.current?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                      ref={cardSection}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </div>
                </h5>
                <img
                  height="600px"
                  width="500px"
                  src={
                    !card.urlToImage
                      ? "https://img.etimg.com/thumb/msid-93850999,width-1070,height-580,imgsize-18346,overlay-etmarkets/photo.jpg"
                      : card.urlToImage
                  }
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body " style={{ padding: "0px" }}>
                  <p className="card-text ">
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <a href={card.newsurl} className="site" target="_blanks">
                        <p
                          style={{
                            marginLeft: "16px",
                            marginBottom: "0px",
                            marginTop: "16px",
                          }}
                        >
                          {card.fulltitle}
                        </p>
                      </a>
                      <a href={card.newsurl} target="_blanks">
                        <button className="visitBtn">Visit</button>
                      </a>
                    </div>

                    <p
                      style={{
                        color: "gray",
                        fontSize: "13px",
                        paddingTop: "10px",
                        marginLeft: "16px",
                      }}
                    >
                      Images may be subject to copyright.{" "}
                      <a
                        className="site"
                        href="https://support.google.com/legal/answer/3463239?hl=en"
                      >
                        Learn More
                      </a>
                    </p>
                    <hr></hr>
                    <h4 style={{ marginLeft: "16px" }}>Related Images</h4>
                    <div
                      style={{
                        padding: "0px",
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {
                      // related articles logic
                      relatedArticles.map((element, Index) => {
                        return (
                          <div
                            className={`${clicked ? "col-md-6 " : "col-md-3"}`}
                            key={Index}
                          >
                            {callNewsItem(element)}
                          </div>
                        );
                      })}
                    </div>
                  </p>
                  <a className="site" href="#">
                    <button className="seemorebtn">
                      See more &nbsp;&nbsp;
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </a>
                </div>
                <h4 style={{ marginLeft: "16px" }}>Related Searches</h4>
                <ul
                  className="list-group list-group-flush"
                  style={{ margin: "5px" }}
                >
                  {
                  // dummy values to show the related searches ui design
                  clicked &&
                    [0, 1, 2, 3].map((element, Index) => {
                      return (
                        <li className="list-group-item">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "center",
                            }}
                          >
                            <img
                              src="https://img.etimg.com/thumb/msid-93850999,width-1070,height-580,imgsize-18346,overlay-etmarkets/photo.jpg"
                              style={{
                                height: "2.5rem",
                                width: "2.5rem",
                                borderRadius: "5px",
                              }}
                            />
                            <a className="site" href="#">
                              <p
                                style={{
                                  marginLeft: "10px",
                                  marginTop: "10px",
                                }}
                              >
                                Related search {Index}
                              </p>
                            </a>
                          </div>
                          <button className="rightbtn" style={{ right: "0px" }}>
                            <i className="bi bi-chevron-right"></i>
                          </button>
                        </li>
                      );
                    })}
                </ul>
                <div class="card-footer">
                  <a href="#" className="site">
                    <p style={{ paddingLeft: "10px" }}>Send feedback</p>
                  </a>
                  <a href="#" className="site">
                    <p>Get help</p>
                  </a>
                  <a href="#" className="site">
                    <p style={{ paddingRight: "10px" }}>Collection</p>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Modal popup to show when three dots clicked from card*/}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Share
                <p
                  style={{
                    color: "gray",
                    fontSize: "13px",
                  }}
                >
                  Images may be subject to copyright.
                </p>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ margin: "0px", marginRight: "10px" }}
              ></button>
            </div>
            <div className="modal-body" style={{ padding: "0px" }}>
              <ul className="modal-body_ul">
                <li className="modal-body_ul_li">
                  <a style={{ color: "black" }} href="#">
                    <i className="bi bi-facebook"></i>{" "}
                    &nbsp;&nbsp;&nbsp;Facebook
                  </a>
                </li>
                <li className="modal-body_ul_li">
                  <a style={{ color: "black" }} href="#">
                    <i className="bi bi-twitter"></i> &nbsp;&nbsp;&nbsp;Twitter
                  </a>
                </li>
                <li className="modal-body_ul_li">
                  <a style={{ color: "black" }} href="#">
                    <i className="bi bi-envelope"></i> &nbsp;&nbsp;&nbsp;Email
                  </a>
                </li>
              </ul>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                paddingLeft: "16px",
              }}
              className="modal-footer"
            >
              <p style={{ fontSize: "14px", padding: "0px", margin: "0px" }}>
                {copied ? "Link copied" : "Cilck to copy link"}
              </p>
              <br></br>
              <p
                type="text"
                style={{
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  overflow: "auto",
                }}
                onClick={() => {
                  navigator.clipboard.writeText(card.urlToImage);
                  setCopied(true);
                }}
              >
                {card.urlToImage}{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// default props and propTypes 
News.defaultProps = {
  country: "in",
  category: "general",
  pageSize: 10,
};
News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number,
};
export default News;




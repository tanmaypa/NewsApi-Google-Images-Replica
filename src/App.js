import "./App.css";
import React from "react";
import News from "./components/News/News";

const App = () => {
  const pageSize = 12;
  const apiKey = process.env.REACT_APP_NEWS_API;
  return <News apiKey={apiKey} pageSize={pageSize} />;
};

export default App;
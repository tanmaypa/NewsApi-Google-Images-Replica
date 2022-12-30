import "./App.css";
import React from "react";
import News from "./components/News/News";

const App = () => {
  const pageSize = 12;
  const apiKey = '06f76f622d9b4b25bdad71435fb3d65b';
  return <News apiKey={apiKey} pageSize={pageSize} />;
};

export default App;

import React from "react";

import loading from "./loading.gif.gif";

const Spinner = () => {
  // To display the spinner whenever doing api calls
  return (
    <div className="text-center">
      <img className="my-3" src={loading} alt="loading" />
    </div>
  );
};

export default Spinner;
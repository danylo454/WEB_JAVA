import * as React from "react";
import "./index.css";
const Loader: React.FC = () => {
  return (
    <>
      {/* <div className="myspinner overlay">
        <div className="spinner-border" role="status"></div>
      </div> */}
      <div className="flex items-center justify-center myspinner overlay">
        <div
          className="inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
          style={{ borderWidth: "12px" }}
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    </>
  );
};

export default Loader;

import React from 'react';
import ReactLoading from 'react-loading';
import "./Loading.css"

const Loading = () => {
  return (
    <div className="loading-container">
      <ReactLoading type="bubbles" color="#FE9371" height={100} width={50} />
    </div>
  );
};

export default Loading;
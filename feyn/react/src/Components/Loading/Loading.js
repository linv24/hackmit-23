import React from 'react';
import ReactLoading from 'react-loading';
import { useLoading } from './LoadingContext'; // Adjust the import path as necessary
import "./Loading.css";

const Loading = () => {
  const { isLoading } = useLoading();

  return isLoading ? (
    <div className="loading-container">
      <ReactLoading type="bubbles" color="#FE9371" height={100} width={50} />
    </div>
  ) : null;
};

export default Loading;
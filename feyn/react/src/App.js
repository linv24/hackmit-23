import React, { useState, useEffect } from 'react';
import Components from "./Components/Components";
import { LoadingProvider } from './Components/Loading/LoadingContext';
import Loading from "./Components/Loading/Loading"; // Ensure this path is correct

export default function App() {
  return (
    <LoadingProvider>
      <Loading />
      <Components />
    </LoadingProvider>
  );
}
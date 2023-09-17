import Components from "./Components/Components";
import Loading from "./Components/Loading/Loading"; // Ensure this path is correct
import React, { useState, useEffect } from 'react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);  // Simulating a 3-second loading time

    return () => clearTimeout(timer);
  }, []);

  return isLoading ? <Loading /> : <Components />;
}
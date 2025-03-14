import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    window.scroll(0, 0);
  }, [location]);

  return null;
};

export default ScrollToTop;

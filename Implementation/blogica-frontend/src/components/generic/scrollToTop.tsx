import React, { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = (props: any) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const { children } = props;
  return <>{children}</>;
};

export default ScrollToTop;

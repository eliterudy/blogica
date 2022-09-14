import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Home = (props: any) => {
  const navigate = useNavigate();
  const [loading, isLoading] = useState(true);
  const state = useSelector((state: any) => {
    // eslint-disable-next-line no-labels, no-label-var
    return { user: true };
  });
  const { user } = state;

  useEffect(() => {
    // if (user) navigate("/main/feeds");
    isLoading(false);
  }, []);

  return (
    <div>
      {!loading && (
        <div className="">
          <p>Home</p>
        </div>
      )}
    </div>
  );
};

export default Home;

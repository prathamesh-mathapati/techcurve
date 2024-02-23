import React from "react";
import "./style.scss";
import CustomLoader from "./loader.gif";
import { useLocation, useNavigate } from "react-router-dom";

const AppLoader = (props) => {
  const { title } = props;

  const location = useLocation();
  const navigation = useNavigate();
  React.useEffect(() => {
    if (location?.state?.redirect === "listing")
      setTimeout(() => {
        navigation("/ielts/ListeningSection", {
          state: {
            sectionType: "Reading",
            redirect: "no",
          },
        });

        localStorage.setItem("redirect", "no");
      }, 3000);
  }, []);

  return (
    <div className="custom-loader">
      <img src={CustomLoader} alt="" className="custom-process-loader" />
      <p>{title}</p>
    </div>
  );
};

export default AppLoader;

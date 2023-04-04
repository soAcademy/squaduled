import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const AuthChecker = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate("/login");
    }
  }, [auth]);

  return <></>;
};

export default AuthChecker;

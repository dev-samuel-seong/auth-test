"use client";

import { useEffect } from "react";

const Callback = () => {
  useEffect(() => {
    if (window.opener) {
      window.opener.postMessage("kakao-login-success", window.location.origin);
      window.close();
    }
  }, []);

  return <div>Logging you in...</div>;
};

export default Callback;

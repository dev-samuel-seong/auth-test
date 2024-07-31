"use client";

import { signIn } from "next-auth/react";
import React from "react";

const KakaoPopup = () => {
  React.useEffect(() => {
    signIn("kakao", { callbackUrl: "/auth/kakao/callback" });
  }, []);

  return <div>Redirecting...</div>;
};

export default KakaoPopup;

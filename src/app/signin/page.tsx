"use client";

import { useState } from "react";
import { useSession } from "@/providers/session";
import "./index.scss";

export default function SignInPage() {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();
  const handleKakaoLogin = () => {
    const width = 540;
    const height = 720;
    const top = window.screen.height / 2 - height / 2;
    const left = window.screen.width / 2 - width / 2;
    console.log(window.screen.width, window.screen.height, top, left);

    const popup = window.open(
      "/auth/kakao",
      "kakao",
      `width=${width},height=${height},left=${left},top=${top}`
    );

    window.addEventListener("message", (event) => {
      if (
        event.origin === window.location.origin &&
        event.data === "kakao-login-success"
      ) {
        console.log("success");
        console.log("session: ", session);
      } else {
        console.log("fail");
      }
    });
  };

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      {isOpen && <button onClick={handleKakaoLogin}>Login with Kakao</button>}
    </div>
  );
}

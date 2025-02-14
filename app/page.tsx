"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ListCard from "@/components/ListCard";
import Link from "next/link";
import FacebookLogin from "@greatsumini/react-facebook-login";

export default function Home() {
  const router = useRouter();
  const [fbLoaded, setFbLoaded] = useState(false);
  const [userData, setUserData] = useState(null);

  // Load Facebook SDK khi component mount
  useEffect(() => {
    if (window?.FB) {
      setFbLoaded(true);
      return;
    }

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "970633574589757",
        cookie: true,
        xfbml: true,
        version: "v22.0",
      });
      setFbLoaded(true);
    };

    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.defer = true;
    script.onload = () => setFbLoaded(true);
    document.body.appendChild(script);
  }, []);

  // Hàm đăng nhập Facebook
  const loginFB = () => {
    if (!window?.FB) {
      console.error("Facebook SDK chưa sẵn sàng!");
      return;
    }

    window.FB.login(
      (response) => {
        if (response.authResponse) {
          console.log("FB token:", response.authResponse.accessToken);

          // Lấy thông tin người dùng
          window.FB.api("/me", { fields: "id,name,email" }, (userInfo) => {
            console.log("User Info:", userInfo);
            setUserData(userInfo);
          });
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { scope: "email,public_profile" }
    );
  };

  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="flex justify-end">
        <button>add product</button>
      </div>

      <button onClick={loginFB} disabled={!fbLoaded} className="mt-4 p-2 bg-blue-500 text-white">
        {fbLoaded ? "Login with Facebook" : "Loading Facebook SDK..."}
      </button>

      {userData && (
        <div className="mt-4 p-4 border border-gray-300">
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
        </div>
      )}
    </main>
  );
}

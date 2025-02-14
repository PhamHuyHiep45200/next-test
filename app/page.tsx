"use client";
import ListCard from "@/components/ListCard";
import FacebookLogin from "@greatsumini/react-facebook-login";
import Link from "next/link";
// import FacebookLogin from 'react-facebook-login';
import { Suspense, useEffect } from "react";
import { loadSDK, loginFB } from '@/auth/facebook'

declare global {
  interface Window {
    fbAsyncInit: () => void;
  }
}

declare const FB: any;

const getData = async (params: any) => {
  const res = await fetch(`http://localhost:5000/data?page=${params.page}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("error data");
  }

  return await res.json();
};

export default function Home(router: any) {
  const { params, searchParams } = router;
  console.log(params, searchParams);

  // const data = await getData({ page: searchParams.page || 1 });

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const getFacebookLoginUrl = () => {
    loginFB()
  };

  useEffect(() => {
    if (window) {
      loadSDK();
    }
  }, []);
  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="flex justify-end">
        <button>add product</button>
      </div>
      <Suspense
        key={query + currentPage}
        fallback={<div>loading..................</div>}
      >
        <button onClick={getFacebookLoginUrl}>getFacebookLoginUrl</button>
        <FacebookLogin
          appId="1269005241057356"
          onSuccess={(response) => {
            console.log("Login Success!", response);
          }}
          onFail={(error) => {
            console.log("Login Failed!", error);
          }}
          onProfileSuccess={(response) => {
            console.log("Get Profile Success!", response);
          }}
          scope="email,public_profile"
          initParams={{
            version: "v16.0",
            xfbml: true,
          }}
        />
        {/* <FacebookLogin
          buttonStyle={{ padding: "6px" }}
          appId="970633574589757"  // we need to get this from facebook developer console by setting the app.
          autoLoad={false}
          fields="name,email,picture"
          scope="public_profile, email"
          callback={(e) => console.log(e)} /> */}
      </Suspense>
    </main>
  );
}

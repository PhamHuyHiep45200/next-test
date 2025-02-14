"use client";
import ListCard from "@/components/ListCard";
import FacebookLogin from "@greatsumini/react-facebook-login";
import Link from "next/link";
// import FacebookLogin from 'react-facebook-login';
import { Suspense } from "react";

const getData = async (params: any) => {
  const res = await fetch(`http://localhost:5000/data?page=${params.page}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("error data");
  }

  return await res.json();
};

export default async function Home(router: any) {
  const { params, searchParams } = router;
  console.log(params, searchParams);

  // const data = await getData({ page: searchParams.page || 1 });

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const loginFB = () => {
    console.log('zo');

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "970633574589757",
        cookie: true,
        xfbml: true,
        version: "v22.0",
      });
    };
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
    window.FB.login(function (response) {
      if (response.status === "connected") {
        console.log("FB token: " + response.authResponse.accessToken);
      }
    });
  };
  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="flex justify-end">
        <button>add product</button>
      </div>
      <Suspense
        key={query + currentPage}
        fallback={<div>loading..................</div>}
      >
        {/* <FacebookLogin
          appId="970633574589757"
          onSuccess={(response) => {
            console.log('Login Success!', response);
          }}
          onFail={(error) => {
            console.log('Login Failed!', error);
          }}
          onProfileSuccess={(response) => {
            console.log('Get Profile Success!', response);
          }}
          scope="email,public_profile"
          initParams={{
            // version: 'v22.0',
            xfbml: true,
          }}
        /> */}
        <button onClick={loginFB}>login fb</button>
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

'use client'
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

export default function Home(router: any) {
  const { params, searchParams } = router;
  console.log(params, searchParams);


  // const data = await getData({ page: searchParams.page || 1 });

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const getFacebookLoginUrl = () => {
    const url = `https://www.facebook.com/v22.0/dialog/oauth` // Thay v18.0 bằng phiên bản mới nhất nếu cần
    const params = new URLSearchParams()
    params.set("client_id", `970633574589757`) // App ID của Facebook
    // params.set("redirect_uri", encodeURI(APP_CONFIG.REDIRECT_URI("facebook"))) // URL chuyển hướng
    // params.set("state", APP_CONFIG.LOCAL_HOST) // Để bảo mật, dùng để xác minh
    params.set("response_type", "code")
    params.set("scope", "email,public_profile") // Các quyền truy cập
    // return `${url}?${params}`
    window.open(`${url}?${params}`)
  }
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
          appId="1229981894257870"
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
            version: 'v20.0',
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

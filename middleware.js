// import { NextResponse } from "next/server";
// // this middleware will run befor any router
// export function middleware(request) {
//   //console.log(request);

//   return NextResponse.redirect(new URL("/about", request.url));
// }
// // here we let it run just befor router /account , /cabins
// // and will be directed to /about
// export const config = {
//   matcher: ["/account", "/cabins"],
// };

import { auth } from "@/app/_lib/auth";
export const middleware = auth;

export const config = {
  matcher: ["/account"],
};

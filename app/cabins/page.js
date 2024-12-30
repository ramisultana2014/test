//import Counter from "../_components/Counter";

import CabinList from "../_components/CabinList";
import { Suspense } from "react";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";

//export const revalidate = 0; //that will make the route dynamic(disable cache)
export const revalidate = 3600; //(ISR) which generate static page and fetch data every 1 hour
export const metadata = {
  title: "Cabins",
};

export default function Page({ searchParams }) {
  //console.log(cabins);
  // when searchParams changed this page will rerender
  const filter = searchParams?.capacity ?? "all";
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy natures beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>
      <Filter />
      <Suspense fallback={<Spinner />} key={filter}>
        {/* we add key to enable the spinner again */}
        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
}

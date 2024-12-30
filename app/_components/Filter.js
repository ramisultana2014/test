"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  //-------------------------
  const router = useRouter(); // this function will make url change(navigate) so its catch by filter in page.js(cabins folder)
  //--------------------------
  const pathname = usePathname();
  //---------------------------
  const activeFilter = searchParams.get("capacity") ?? "all"; // we can use this part to style the active button
  function handleFilter(filter) {
    //1-
    const params = new URLSearchParams(searchParams); //it's actually a web API that provides a few methods that we can use to manipulate the URL query parameters.
    //-----------------------------------
    //2-
    params.set("capacity", filter); //its build the url but not navigate to it
    //-------------------------------
    //3-
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className={`border border-primary-800 flex `}>
      <button
        onClick={() => handleFilter("all")}
        className={`px-5 py-2 hover:bg-primary-700 ${
          activeFilter === "all" ? "bg-primary-700 text-primary-50" : ""
        }`}
      >
        all cabins
      </button>
      <button
        onClick={() => handleFilter("small")}
        className={`px-5 py-2 hover:bg-primary-700 ${
          activeFilter === "small" ? "bg-primary-700 text-primary-50" : ""
        }`}
      >
        1-3guests
      </button>
      <button
        onClick={() => handleFilter("medium")}
        className={`px-5 py-2 hover:bg-primary-700 ${
          activeFilter === "medium" ? "bg-primary-700 text-primary-50" : ""
        }`}
      >
        4-7guests
      </button>
      <button
        onClick={() => handleFilter("large")}
        className={`px-5 py-2 hover:bg-primary-700 ${
          activeFilter === "large" ? "bg-primary-700 text-primary-50" : ""
        }`}
      >
        12 guests
      </button>
    </div>
  );
}

export default Filter;

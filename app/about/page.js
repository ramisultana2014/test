import Image from "next/image";
import about1 from "@/public/about-1.jpg";
import about2 from "@/public/about-2.jpg";
import Link from "next/link";
import { Suspense } from "react";
import Spinner from "../_components/Spinner";
import CabinsNumber from "../_components/CabinsNumber";
export const revalidate = 3600; //(ISR) which generate static page and fetch data every 1 hour
export const metadata = {
  title: "About",
};
export default function Page() {
  return (
    <div className="grid grid-cols-5 gap-x-24 gap-y-32 text-lg items-center">
      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Welcome to The Wild Oasis
        </h1>

        <div className="space-y-8">
          <p>
            Where nature&apos;s beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home. But it&apos;s not just about the luxury
            cabins. It&apos;s about the experience of reconnecting with nature
            and enjoying simple pleasures with family.
          </p>
          <Suspense fallback={<Spinner />}>
            <CabinsNumber />
          </Suspense>
          <p>
            This is where memorable moments are made, surrounded by
            nature&apos;s splendor. It&apos;s a place to slow down, relax, and
            feel the joy of being together in a beautiful setting.
          </p>
        </div>
      </div>

      <div className="col-span-2 relative aspect-square">
        <Image
          fill
          src={about1}
          alt="Family sitting around a fire pit in front of cabin"
          className="object-cover"
          placeholder="blur"
          quality={80}
        />
      </div>

      <div className="col-span-2 relative aspect-square">
        <Image
          fill
          src={about2}
          alt="Family that manages The Wild Oasis"
          className="object-cover"
          placeholder="blur"
          quality={80}
        />
      </div>

      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Managed by our family since 1962
        </h1>

        <div className="space-y-8">
          <p>
            Since 1962, The Wild Oasis has been a cherished family-run retreat.
            Started by our grandparents, this haven has been nurtured with love
            and care, passing down through our family as a testament to our
            dedication to creating a warm, welcoming environment.
          </p>
          <p>
            Over the years, we&apos;ve maintained the essence of The Wild Oasis,
            blending the timeless beauty of the mountains with the personal
            touch only a family business can offer. Here, you&apos;re not just a
            guest; you&apos;re part of our extended family. So join us at The
            Wild Oasis soon, where tradition meets tranquility, and every visit
            is like coming home.
          </p>

          <div>
            <Link
              href="/cabins"
              className="inline-block mt-4 bg-accent-500 px-8 py-5 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Explore our luxury cabins
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

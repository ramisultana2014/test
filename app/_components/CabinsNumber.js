import { getCabins } from "../_lib/data-service";

async function CabinsNumber() {
  const cabins = await getCabins();
  return (
    <p>
      Our {cabins.length} luxury cabins provide a cozy base, but the real
      freedom and peace you&apos;ll find in the surrounding mountains. Wander
      through lush forests, breathe in the fresh air, and watch the stars
      twinkle above from the warmth of a campfire or your hot tub.
    </p>
  );
}

export default CabinsNumber;

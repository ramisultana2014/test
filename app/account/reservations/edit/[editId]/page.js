import UpdateBookingForm from "@/app/_components/UpdateBookingForm";
import { getBooking, getCabin } from "@/app/_lib/data-service";

export async function generateMetadata({ params }) {
  const { id } = await getBooking(params.editId);
  return { title: `Booking # ${id}` };
}

export default async function Page({ params }) {
  //console.log(params.editId);
  // CHANGE
  //   const reservationId = 23;
  //   const maxCapacity = 23;
  const booking = await getBooking(params.editId);
  const { cabinId, id: reservationId, numGuests, observations } = booking;
  const cabin = await getCabin(cabinId);
  const { maxCapacity } = cabin;
  //console.log(booking);
  //console.log(cabin);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>
      <UpdateBookingForm
        maxCapacity={maxCapacity}
        reservationId={reservationId}
        numGuests={numGuests}
        observations={observations}
      />
    </div>
  );
}

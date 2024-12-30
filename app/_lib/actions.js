"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";
// this signIn what we export from auth.js inside handlers
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
//redirectTo when success it will take us to protect route which is /account
// here we just write google because we have just one provider, if we have many like facebook , github we loop over them
// http://localhost:3000/api/auth/providers this will help us knowing our providers

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfile(formData) {
  const session = await auth(); // to ensure there is active user
  //console.log(formData);
  // any error will be send to error.js

  if (!session) throw new Error("You must be logged in");
  // formData is the data coming from  action={updateProfile} in UpdateProfileForm.js, and formData.get(field name) how to get the value
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  // here we check if nationaID is correct- code from chatGPT
  //if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
  if (nationalID.length > 6)
    throw new Error("please provide a valid national id");
  const updateData = { nationalID, countryFlag, nationality };
  //console.log(updateData);
  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId)
    .select()
    .single();

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
  // revalidatePath will make data refetch so when submit the form the component in /account/profile  will be rerender so we will have the new data
  //return data;
}
export async function deleteReservation(bookingId) {
  const session = await auth(); // to ensure there is active user
  // any error will be send to error.js

  if (!session) throw new Error("You must be logged in");
  // layer of security
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingsIds.includes(bookingId))
    throw new Error("you are not allowed to do this action");
  // if id belong to guest then we can do the delete
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");
  revalidatePath("/account/reservations");
}
export async function updateReservation(formData) {
  const reservationId = Number(formData.get("reservationId"));
  //console.log(formData);
  const session = await auth(); // to ensure there is active user
  // any error will be send to error.js

  if (!session) throw new Error("You must be logged in");
  // layer of security
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingsIds.includes(reservationId))
    throw new Error("you are not allowed to do this action");
  // get the values from form
  const updatedFields = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  // supabase
  const { error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", reservationId)
    .select()
    .single();

  if (error) {
    //console.error(error);
    throw new Error("Booking could not be updated");
  }
  revalidatePath(`/account/reservations/edit/${reservationId}`);
  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}
export async function createReservation(bookingObj, formData) {
  //console.log(formData.get("numGuests"));
  //console.log(bookingObj);

  //Object.entries(formData.entries()); // if we have too many fields in form ite best than using formData.get for each fields

  const session = await auth(); // to ensure there is active user
  // any error will be send to error.js

  if (!session) throw new Error("You must be logged in");
  const newBooking = {
    ...bookingObj, //
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")), // form filed
    observations: formData.get("observations").slice(0, 1000), //form field
    extrasPrice: 0,
    totalPrice: bookingObj.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };
  //console.log(newBooking);
  const { error } = await supabase.from("bookings").insert([newBooking]); // supabase expect array of Obj with insert
  // So that the newly created object gets returned!
  // .select()
  // .single();

  if (error) {
    console.log(error);
    throw new Error("Booking could not be created");
  }
  //revalidatePath(`/cabins/${bookingObj.cabinId}`);
  redirect("/cabins/thanksYou");
}

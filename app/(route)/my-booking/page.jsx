"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingList from "./_components/BookingList";
import GlobalApis from "@/app/_utils/GlobalApis";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import moment from "moment";

function MyBooking() {
  const { user } = useKindeBrowserClient();
  const [bookingList, setBookingList] = useState([]);

  useEffect(() => {
    user && getUserBookingList();
  }, [user]);

  const getUserBookingList = () => {
    GlobalApis.getUserBookingList(user?.email).then((resp) => {
      console.log("Fetched bookings:", resp.data.data);
      setBookingList(resp.data.data);
    });
  };

  /**
   * Filter bookings as upcoming or expired based on Date and Time
   */
  const filterUserBooking = (type) => {
    const now = moment();

    return bookingList.filter((item) => {
      const bookingDateTime = moment(`${item.Date} ${item.time}`, "YYYY-MM-DD hh:mm A");

      return type === "upcoming"
        ? bookingDateTime.isAfter(now)
        : bookingDateTime.isBefore(now);
    });
  };

  return (
    <div className="px-4 sm:px-10 mt-10">
      <h2 className="font-bold text-2xl">My Booking</h2>
      <Tabs defaultValue="upcoming" className="w-full mt-5">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <BookingList
            bookingList={filterUserBooking("upcoming")}
            updateRecord={() => getUserBookingList()}
            expired={false}
          />
        </TabsContent>

        <TabsContent value="expired">
          <BookingList
            bookingList={filterUserBooking("expired")}
            updateRecord={() => getUserBookingList()}
            expired={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MyBooking;

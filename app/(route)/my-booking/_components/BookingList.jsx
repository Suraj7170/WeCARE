import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin } from 'lucide-react';
import moment from 'moment';
import React from 'react';
import CancelAppointment from './CancelAppointment';
import { toast } from 'sonner';
import GlobalApis from '@/app/_utils/GlobalApis';

function BookingList({ bookingList, expired, updateRecord }) {

  const onDeleteBooking = (item) => {
    GlobalApis.deleteBooking(item.id).then(resp => {
      if (resp) {
        toast('Booking deleted successfully!');
        updateRecord();
      }
    });
  };

  return (
    <div>
      {bookingList.length > 0 ? bookingList.map((item, index) => (
        <div key={index} className="flex flex-col gap-2 w-full p-4 mb-4 border rounded-lg shadow-sm bg-white">

          <h2 className="font-bold text-[18px] items-center flex justify-between">
            {item.doctor?.Name || 'Doctor Info Missing'}
            {!expired && (
              <CancelAppointment onContinueClick={() => onDeleteBooking(item)} />
            )}
          </h2>

          {/* <h2 className="flex gap-2 text-gray-500">
            <MapPin className="text-primary h-5 w-5" />
            {item.doctor?.Address || 'No address provided'}
          </h2> */}

          <h2 className="flex gap-2">
            <Calendar className="text-primary h-5 w-5" />
            Appointment On: {moment(item.Date).format('DD-MMM-YYYY')}
          </h2>

          <h2 className="flex gap-2">
            <Clock className="text-primary h-5 w-5" />
            At Time: {item.time}
          </h2>
        </div>
      )) : (
        <div className="h-[150px] w-full bg-slate-100 animate-pulse rounded-lg" />
      )}
    </div>
  );
}

export default BookingList;

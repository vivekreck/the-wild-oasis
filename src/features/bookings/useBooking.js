import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";


export function useBooking() {
    const { bookingId } = useParams();

    const {
        isPending,
        data: booking,
        error,
    } = useQuery({
        queryKey: ["booking", bookingId],
        queryFn: () => getBooking(bookingId),
        retry: false
    });

    return { isPending, booking, error };
}
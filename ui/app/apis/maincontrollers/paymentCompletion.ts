'use server'
import { createClient } from "@supabase/supabase-js";
export const paymentCompletion = async ({tripId, amount}: any) => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
    const { data, error } = await supabase.from('trips').update({
        status: "Upcoming",
        total_price: amount,
        stage: "Ticket"
    }).match({id: tripId});
    if (error) {
        console.log(error);
        return { status: 200, data: { message: "Error in Payment" } };
    }
    return { status: 200, data: { message: 'Payment Done', data} };
}
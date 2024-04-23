'use server'
import { createClient } from "@supabase/supabase-js";
export const checkoutTrip = async ({ user_id, dest_id, start_date, end_date, activities, dest_name, dest_state, stage, rate_approx}: any) => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
    const { data, error } = await supabase
        .from('trips')
        .insert([
            {
                user_id, dest_id, dest_name, dest_state, start_date, end_date, total_price: "0", activities, hotels: [], status: "Pending", stage, rate_approx
            }
        ])
    if (error) {
        console.log(error);
        return { status: 200, data: { message: "Error checkout trip" } };
    }
    return { status: 200, data: { message: 'Checkedout Trip', data } };
}
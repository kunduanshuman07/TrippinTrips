'use server'
import { createClient } from "@supabase/supabase-js";
export const fetchTrips = async ({user_id, type}: any) => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
    const { data, error } = await supabase.from('trips').select('*').match({user_id, status: type});
    if (error) {
        console.log(error);
        return { status: 200, data: { message: "Error fetching Pending trips" } };
    }
    return { status: 200, data: { message: 'Fetched Pending trips', data} };
}
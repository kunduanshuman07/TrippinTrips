'use server'
import { createClient } from "@supabase/supabase-js";
export const cancelTripData = async ({ trip_id }: any) => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
    const { data, error } = await supabase
        .from('trips').delete().match({id: trip_id});
    if (error) {
        console.log(error);
        return { status: 200, data: { message: "Error delete trip" } };
    }
    return { status: 200, data: { message: 'Deleted Trip', data } };
}
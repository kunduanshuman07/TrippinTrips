'use server'
import { createClient } from "@supabase/supabase-js";
export const fetchTripActivities = async ({ activity }: any) => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
    const { data, error } = await supabase
        .from('activities')
        .select('*')
        .in('id', activity);
    if (error) {
        console.log(error);
        return { status: 200, data: { message: "Error fetching Activities" } };
    }
    return { status: 200, data: { message: 'Fetched Actvities', data } };
}
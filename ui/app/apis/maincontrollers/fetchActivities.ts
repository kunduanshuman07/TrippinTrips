'use server'
import { createClient } from "@supabase/supabase-js";
export const fetchActivities = async () => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
    const { data, error } = await supabase.from('activities').select('*');
    if (error) {
        console.log(error);
        return { status: 200, data: { message: "Error fetching Activities" } };
    }
    return { status: 200, data: { message: 'Fetched Actvities', data} };
}
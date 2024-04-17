'use server'
import { createClient } from "@supabase/supabase-js";
export const fetchDestination = async ({name}: any) => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
    const { data, error } = await supabase.from('destinations').select('*').match({name: name});
    if (error) {
        console.log(error);
        return { status: 200, data: { message: "Error fetching Destinations" } };
    }
    return { status: 200, data: { message: 'Fetched Destinations', data} };
}
'use server'
import { createClient } from "@supabase/supabase-js";
export const fetchUser = async ({ email }: any) => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .match({email: email});
        
    if (error) {
        console.log(error);
        return { status: 200, data: { message: "Error fetching User" } };
    }
    return { status: 200, data: { message: 'Fetched User', data: data?.[0] } };
}
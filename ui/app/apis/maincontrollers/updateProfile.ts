'use server'
import { createClient } from "@supabase/supabase-js";
export const updateProfile = async ({ email, name, age, city, state, pincode }: any) => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
    const { data, error } = await supabase.from('users').update({
        name, age, city, state, pincode,
    }).match({ email: email });
    if (error) {
        console.log(error);
        return { status: 200, data: { message: "Error updating Profile" } };
    }
    return { status: 200, data: { message: 'Profile Updated', data } };
}
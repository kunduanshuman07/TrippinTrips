'use server'
import { createClient } from "@supabase/supabase-js";
export const registerUser = async ({ email, phone, password }: any) => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
    const { error } = await supabase.from('users').insert([{
        phone, email, password
    }]);
    if (error) {
        console.log(error);
        return { status: 200, data: { message: "Uniqueness" } };
    }
    return { status: 200, data: { message: 'User Registered Succesfully'} };
}
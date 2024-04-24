'use server'
import { createClient } from "@supabase/supabase-js";
export const fetchAllBlogs = async () => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
    const { data, error } = await supabase
        .from('blogs')
        .select('*');
    if (error) {
        console.log(error);
        return { status: 200, data: { message: "Error Fetching Blogs" } };
    }
    return { status: 200, data: { message: 'Fetched Blogs', data: data } };
}
'use server'
import { createClient } from "@supabase/supabase-js";
export const createBlogData = async ({ name, dest, desc }: any) => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
    const { data, error } = await supabase
        .from('blogs')
        .insert([{
            created_by: name, 
            desc, dest, upvotes: 0
        }])
    if (error) {
        console.log(error);
        return { status: 200, data: { message: "Error Creating Blog" } };
    }
    return { status: 200, data: { message: 'Created Blog'} };
}
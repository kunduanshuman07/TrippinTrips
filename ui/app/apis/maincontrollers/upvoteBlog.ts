'use server'
import { createClient } from "@supabase/supabase-js";
export const upvoteBlog = async ({upvotes, blogId}: any) => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
    const { data, error } = await supabase.from('blogs').update({
       upvotes
    }).match({ id: blogId });
    if (error) {
        console.log(error);
        return { status: 200, data: { message: "Upvote Error" } };
    }
    return { status: 200, data: { message: 'Upvote Successfull', data } };
}
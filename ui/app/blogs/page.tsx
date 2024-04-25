'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import BlogHeader from "../components/BlogHeader";
import { fetchUser } from "../apis/usercontrollers/fetchUser";
import { fetchAllBlogs } from "../apis/maincontrollers/fetchAllBlogs";
import { BiUpvote } from "react-icons/bi";
import { upvoteBlog } from "../apis/maincontrollers/upvoteBlog";
const BlogPage = () => {
    const { data, status } = useSession();
    const [loading, setLoading] = useState<any>(true);
    const [auth, setAuth] = useState<any>(false);
    const [user, setUser] = useState<any>();
    const [blogs, setBlogs] = useState<any>();
    useEffect(() => {
        const fetchUserData = async () => {
            const userResp = await fetchUser({ email: data?.user?.email });
            const blogResp = await fetchAllBlogs();
            if (userResp.status === 200) {
                setBlogs(blogResp?.data?.data);
                setUser(userResp?.data?.data);
                setLoading(false);
            }
        }
        if (status === 'unauthenticated') {
            setAuth(false);
            setLoading(false);
        }
        else {
            fetchUserData();
            setAuth(true);
        }
    }, [status, data])
    const handleUpvote = async(upvotes: any, blogId: any) => {
        const upvoteResp = await upvoteBlog({upvotes, blogId});
        if(upvoteResp.status==200){
            window.location.reload();
        }
    }
    return (
        <div className="flex flex-col">
            {loading && <div style={{ margin: "auto auto" }}><span className="loading text-accent loading-dots loading-lg"></span></div>}
            {!loading && !auth &&
                <div style={{ margin: "auto auto" }}>
                    <a className="text-sm text-accent" href="/login">Please <span className="text-lg font-bold hover:underline">Sign In</span> to continue!</a>
                </div>
            }
            {!loading && auth &&
                <div className="p-2 flex flex-col">
                    <BlogHeader user={user} />
                    <div className="grid grid-cols-1 gap-4 mt-4">
                        {blogs.map((blog: any, index: any) => (
                            <div className="flex flex-col p-4 shadow-md rounded-lg" key={index}>
                                <h1 className="text-accent font-bold">{blog?.dest}</h1>
                                <p className="mt-2 text-slate-500 text-sm">{blog?.desc}</p>
                                <div className="flex flex-row mt-4">
                                    <button className="btn btn-xs btn-info text-white mr-2" onClick={()=>handleUpvote(blog?.upvotes+1, blog?.id)}><BiUpvote /></button>
                                    <h1 className="text-xs text-info mr-auto my-auto font-bold">{blog.upvotes} Upvotes</h1>
                                </div>
                                <h1 className="mt-2 text-xs text-slate-400 font-bold">Created By: {blog?.created_by}</h1>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

export default BlogPage
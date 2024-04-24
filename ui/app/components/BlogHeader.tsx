'use client'
import { useState } from "react";
import { FaPlus } from "react-icons/fa"
import { createBlogData } from "../apis/maincontrollers/createBlog";

interface Props {
  user: any;
}

const BlogHeader: React.FC<Props> = ({ user }) => {
  const [createBlog, setCreateBlog] = useState<any>(false);
  const [loading, setLoading] = useState<any>(false);
  const handleClose = () => {
    setCreateBlog(false);
  }
  const [dest, setDest] = useState<any>('');
  const [desc, setDesc] = useState<any>('');
  const handleWrite = async () => {
    setLoading(true);
    const { status, data } = await createBlogData({ name: user?.name ? user?.name : user?.email, dest, desc });
    if (status === 200) {
      window.location.reload();
      handleClose();
    }
  }
  return (
    <div>
      <div className="flex sm:flex-row">
        <input placeholder="Search Places" className="input input-sm input-accent" />
        <button className="text-xs btn btn-xs btn-accent text-white font-bold my-auto ml-2" onClick={() => setCreateBlog(true)}>Write a Blog <FaPlus /></button>
      </div>
      <dialog id="my_modal_1" className={`modal ${createBlog ? 'modal-open' : ''}`}>
        <div className="modal-box">
          <div className="flex flex-col">
            <div className="flex flex-col mt-4">
              <label className="mb-2">Destination</label>
              <input className="input input-sm input-accent my-auto" placeholder="Destination" onChange={(e) => setDest(e.target.value)} />
            </div>
            <div className="flex flex-col mt-4">
              <label className="mb-2">Description</label>
              <textarea className="textarea textarea-accent" placeholder="Description" onChange={(e) => setDesc(e.target.value)}></textarea>
            </div>
          </div>
          <div className="modal-action">
            <div className="flex flex-row" style={{ marginTop: "auto" }}>
              <button className="btn sm:btn-sm btn-xs btn-accent text-white" onClick={handleWrite}>Write {loading && <span className="loading loading-spinner loading-xs"></span>}</button>
              <button className="btn sm:btn-sm btn-xs ml-2" onClick={handleClose}>Close</button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default BlogHeader
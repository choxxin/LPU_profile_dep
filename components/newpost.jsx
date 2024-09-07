import React, { useState } from "react";
import useCreatePost from "../hooks/usepost";
import useUserStore from "@/store/useUserStore";
export default function CreatePostForm() {
  const { id } = useUserStore();
  const [formData, setFormData] = useState({
    userId: id,
    prompt: "",
    tag: "",
  });

  const { createPost, loading, error, success } = useCreatePost();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(formData);
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Create New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          name="prompt"
          value={formData.prompt}
          onChange={handleChange}
          placeholder="Enter your prompt"
          required
          className=" text-white w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="tag"
          value={formData.tag}
          onChange={handleChange}
          placeholder="Enter Title"
          required
          className=" text-white w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white font-semibold ${
            loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
          } transition duration-300 ease-in-out`}
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
        {error && <p className="text-red-500 text-center">Error: {error}</p>}
        {success && (
          <p className="text-green-500 text-center">
            Post created successfully!
          </p>
        )}
      </form>
    </div>
  );
}

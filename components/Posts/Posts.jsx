// components/Posts.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import Commentcomp from "../commentcomp";
import { Createpost } from "../createpost";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts"); // Adjust the URL to your API endpoint
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading)
    return (
      <div>
        <span className="loading loading-bars loading-[490px]"></span>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="posts-container  bg-slate-300 dark:bg-slate-500">
      <div className="flex justify-between gap-11">
        <div>
          {" "}
          <p className="  font-bold mb-4 text-5xl">Posts </p>
        </div>{" "}
        <div>
          {" "}
          <Createpost />
        </div>
      </div>

      <div className="flex flex-wrap gap-20 justify-center ">
        {posts.length === 0 ? (
          <li>No posts available.</li>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="mb-4 ">
              <div className="card post w-96 shadow-xl">
                <div className="flex gap-10">
                  <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-20 rounded-full ring ring-offset-2">
                      <img
                        src={
                          post.creator?.profile_image
                            ? post.creator?.profile_image
                            : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                      />
                    </div>
                  </div>
                  <div className="text-xl">
                    <p className="text-white font-bold">
                      {post.creator?.name ? (
                        post.creator?.name
                      ) : (
                        <span>Deleted</span>
                      )}
                    </p>
                    <p className="text-gray-300">
                      {post.creator?.registrationNumber ? (
                        post.creator.registrationNumber
                      ) : (
                        <span></span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="card-body">
                  <h2 className="card-title text-white">{post.tag}</h2>
                  <p className="text-gray-200 max-h-64 overflow-scroll overflow-x-hidden">
                    {post.prompt}
                  </p>
                  <div className="card-actions justify-end">
                    <Commentcomp postId={post._id} />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Posts;

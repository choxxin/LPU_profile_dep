"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const SocialLinksForm = ({ senderId, ininstagram, inlinkedin, ingithub }) => {
  const [linkedin, setLinkedin] = useState(inlinkedin || "");
  const [instagram, setInstagram] = useState(ininstagram || "");
  const [github, setGithub] = useState(ingithub || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/social", {
        senderId,
        linkedin,
        instagram,
        github,
      });

      if (response.status === 200) {
        toast.success("Social links updated successfully!");
      } else {
        toast.error("Failed to update social links.");
      }
    } catch (error) {
      toast.error("An error occurred while updating social links.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 dark:text-white">
      <div>
        <label htmlFor="linkedin" className="block font-medium">
          LinkedIn
        </label>
        <input
          type="text"
          id="linkedin"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          placeholder="Enter LinkedIn profile link"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="instagram" className="block font-medium">
          Instagram
        </label>
        <input
          type="text"
          id="instagram"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          placeholder="Enter Instagram profile link"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="github" className="block font-medium">
          GitHub
        </label>
        <input
          type="text"
          id="github"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          placeholder="Enter GitHub profile link"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded mt-4"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default SocialLinksForm;

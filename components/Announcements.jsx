import React, { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "@/store/useUserStore";
const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [displayedAnnouncements, setDisplayedAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const { registrationNumber, pass, cook } = useUserStore();
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/annoucements",
          {
            reg_no: registrationNumber,
            password: pass,
            cookie: cook,
          }
        );
        const data = response.data.annoucements || [];
        setAnnouncements(data);
        setDisplayedAnnouncements(data.slice(0, itemsPerPage));
      } catch (err) {
        setError("Failed to fetch announcements.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [itemsPerPage]);

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setDisplayedAnnouncements(announcements.slice(start, end));
  }, [currentPage, announcements, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const totalPages = Math.ceil(announcements.length / itemsPerPage);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Announcements</h2>
      <div
        className="overflow-y-scroll h-80 p-4   rounded-md  "
        style={{ maxHeight: "400px" }}
      >
        {displayedAnnouncements.length === 0 ? (
          <p>No announcements available.</p>
        ) : (
          displayedAnnouncements.map((announcement) => (
            <div
              key={announcement.announcement_id}
              className="mb-4 p-2 border-b border-t border-gray-200 "
            >
              <h3 className="font-bold text-lg">{announcement.subject}</h3>
              <p>Date: {announcement.date}</p>
              <p>Time: {announcement.time}</p>
              <p>Uploaded by: {announcement.uploaded_by}</p>
              <p>Employee Name: {announcement.employee_name}</p>
              <p>
                Category: {announcement.category_name} (
                {announcement.category_code})
              </p>
            </div>
          ))
        )}
      </div>
      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 border rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-gray-400"
                : "bg-gray-900 text-blue-500"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Announcements;

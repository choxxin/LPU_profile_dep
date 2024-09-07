import { useEffect, useState } from "react";

export default function ExamList({ reg_no }) {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch exams from the API
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch("/api/exams", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reg_no }), // Assuming you're sending the reg_no in the body
        });

        if (!response.ok) {
          throw new Error("Failed to fetch exams");
        }

        const data = await response.json();
        setExams(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render the list of exams
  return (
    <div className="exam-list p-5 rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Exam List</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.length === 0 ? (
          <p>No exams found.</p>
        ) : (
          exams.map((exam, index) => (
            <div key={index} className="exam-card rounded-lg p-4 sub shadow-sm">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {exam.course_name}
              </h3>
              <p className="text-gray-600">
                <strong className="font-medium">Course Code:</strong>{" "}
                {exam.course_code}
              </p>
              <p className="text-gray-600">
                <strong className="font-medium">Exam Type:</strong>{" "}
                {exam.exam_type}
              </p>
              <p className="text-gray-600">
                <strong className="font-medium">Room No:</strong>{" "}
                {exam.room_no || "Room No Awaited"}
              </p>
              <p className="text-gray-600">
                <strong className="font-medium">Date:</strong> {exam.date}
              </p>
              <p className="text-gray-600">
                <strong className="font-medium">Time:</strong> {exam.time}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("/api/leaderboard");
        const data = await response.json();

        if (data.success) {
          setLeaderboard(data.data);
        } else {
          setError("Failed to fetch leaderboard.");
        }
      } catch (err) {
        setError("An error occurred while fetching the leaderboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading)
    return <span className="loading loading-spinner text-primary"></span>;

  if (error) return <p>{error}</p>;

  return (
    <div className="leaderboard">
      <h2 className="text-2xl font-bold mb-4">Top 10 CGPA Holders</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left">
          <thead>
            <tr>
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Registration Number</th>
              <th className="px-4 py-2">CGPA</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No data available.
                </td>
              </tr>
            ) : (
              leaderboard.map((student, index) => (
                <tr key={student.registrationNumber}>
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2 flex gap-5">
                    <img
                      src={student.profileImage}
                      alt={student.name}
                      className="w-10 h-10 rounded-full"
                    />
                    {student.name}
                  </td>
                  <td className="px-4 py-2">{student.registrationNumber}</td>
                  <td className="px-4 py-2">{student.cgpa}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;

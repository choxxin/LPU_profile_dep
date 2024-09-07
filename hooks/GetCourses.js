import { useState, useEffect } from "react";

export default function useCourses(registrationNumber) {
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        cocnsole.log("husdukifoi ");
        const response = await fetch("/api/timetable", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ registrationNumber }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await response.json();
        console.log("Fetched courses:", data);
        setCourses(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, [registrationNumber]);

  return { courses, errorr: error };
}

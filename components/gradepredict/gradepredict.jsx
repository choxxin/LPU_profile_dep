import React, { useEffect, useState } from "react";
import useUserStore from "@/store/useUserStore";

const GRADE_VALUES = {
  O: 10, // Outstanding
  "A+": 9,
  A: 8,
  "B+": 7,
  B: 6,
  C: 5,
  E: 0, // Fail
};

const Gradecourse = () => {
  const { registrationNumber } = useUserStore();
  const [courses, setCourses] = useState(null);
  const [grades, setGrades] = useState({});
  const [cgpa, setCgpa] = useState(null);

  const hasCourses = courses?.length > 0;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("/api/getcourse", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reg_no: registrationNumber }),
        });

        const coursesData = await response.json();
        setCourses(coursesData);

        // Set default grades for each course as "A+" by default
        const initialGrades = {};
        coursesData.forEach((course) => {
          initialGrades[course.course_code] = "A+"; // Default to A+
        });
        setGrades(initialGrades);

        // Calculate CGPA based on default grades (A+)
        calculateCgpa(coursesData, initialGrades);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchProfileData();
  }, [registrationNumber]);

  const handleGradeChange = (courseCode, selectedGrade) => {
    const updatedGrades = {
      ...grades,
      [courseCode]: selectedGrade,
    };
    setGrades(updatedGrades);
    calculateCgpa(courses, updatedGrades); // Recalculate CGPA on grade change
  };

  // Function to calculate CGPA
  const calculateCgpa = (courses, grades) => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach((course) => {
      const grade = grades[course.course_code];
      if (grade && GRADE_VALUES[grade] !== undefined) {
        totalPoints += GRADE_VALUES[grade] * course.credits;
        totalCredits += course.credits;
      }
    });

    if (totalCredits > 0) {
      setCgpa((totalPoints / totalCredits).toFixed(2));
    } else {
      setCgpa(null);
    }
  };

  return (
    <div className="course-list p-5 rounded-lg shadow-md">
      {hasCourses ? (
        <>
          <div className="flex flex-col gap-10">
            <div>
              {cgpa && (
                <div className="text-center mt-6">
                  <h3 className="  font-semibold text-gray-800 text-3xl">
                    Predicted CGPA: {cgpa}
                  </h3>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses
                .filter((course) => course.course_code)
                .map((course, index) => (
                  <div
                    key={index}
                    className="course-card rounded-lg p-4 shadow-sm sub"
                  >
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      {course.course_name}
                    </h3>
                    <p className="text-gray-600">
                      <strong className="font-medium">Course Code:</strong>{" "}
                      {course.course_code}
                    </p>
                    <p className="text-gray-600">
                      <strong className="font-medium">Faculty:</strong>{" "}
                      {course.facultyname}
                    </p>
                    <p className="text-gray-600">
                      <strong className="font-medium">Credits:</strong>{" "}
                      {course.credits}
                    </p>

                    <div className="mt-2">
                      <label className="block text-gray-600">
                        Select Grade:
                      </label>
                      <select
                        value={grades[course.course_code]}
                        onChange={(e) =>
                          handleGradeChange(course.course_code, e.target.value)
                        }
                        className="block w-full mt-1 p-2 border border-gray-300 rounded"
                      >
                        <option value="O">O (Outstanding)</option>
                        <option value="A+">A+</option>
                        <option value="A">A</option>
                        <option value="B+">B+</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="E">E (Fail)</option>
                      </select>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-600 p-4 rounded-lg shadow-sm bg-gray-100">
          <p>No courses available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default Gradecourse;

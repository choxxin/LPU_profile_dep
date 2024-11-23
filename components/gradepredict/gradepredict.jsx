import React, { useEffect, useState } from "react";
import useUserStore from "@/store/useUserStore";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const GRADE_VALUES = {
  O: 10,
  "A+": 9,
  A: 8,
  "B+": 7,
  B: 6,
  C: 5,
  E: 0,
};

const Gradecourse = () => {
  const { registrationNumber } = useUserStore();
  const [courses, setCourses] = useState(null);
  const [grades, setGrades] = useState({});
  const [cgpa, setCgpa] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [typingResponse, setTypingResponse] = useState("");

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

        const initialGrades = {};
        coursesData.forEach((course) => {
          initialGrades[course.course_code] = "A+";
        });
        setGrades(initialGrades);
        calculateCgpa(coursesData, initialGrades);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchProfileData();
  }, [registrationNumber]);

  const handleGradeChange = (courseCode, selectedGrade) => {
    const updatedGrades = { ...grades, [courseCode]: selectedGrade };
    setGrades(updatedGrades);
    calculateCgpa(courses, updatedGrades);
  };

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

  const sendGradesToGemini = async () => {
    try {
      const gradesSummary = Object.entries(grades)
        .map(([courseCode, grade]) => `${courseCode}: ${grade}`)
        .join(", ");
      const prompt = `
        Based on the following grades and calculated CGPA, provide feedback or suggestions:
        Grades: ${gradesSummary}
        CGPA: ${cgpa}
      `;

      const genAI = new GoogleGenerativeAI(
        "AIzaSyDi4MQ5UAxYq57fqemS0C1dqiUFDOMGZRE"
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(prompt);

      const aiResponse = result.response.text();

      // Set response text for typewriter effect
      setResponseText(aiResponse);
      setTypingResponse(""); // Reset typing response for new animation
      typeResponse(aiResponse);
    } catch (error) {
      console.error("Error contacting Gemini API:", error);
      alert("Failed to get a response from the Gemini API.");
    }
  };

  const typeResponse = (text) => {
    let index = 0;
    const typingEffect = () => {
      if (index < text.length) {
        setTypingResponse((prev) => prev + text[index]);
        index++;
        setTimeout(typingEffect, 50); // Adjust speed of typing here
      }
    };
    typingEffect();
  };

  return (
    <div className="course-list p-5 rounded-lg shadow-md">
      {hasCourses ? (
        <>
          <div className="flex flex-col gap-10">
            <div>
              {cgpa && (
                <div className="text-center mt-6">
                  <h3 className="font-semibold text-gray-800 text-3xl">
                    Predicted CGPA: {cgpa}
                  </h3>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="course-card rounded-lg p-4 shadow-sm sub"
                >
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    {course.course_name}
                  </h3>
                  <p className="text-gray-600">
                    <strong>Course Code:</strong> {course.course_code}
                  </p>
                  <p className="text-gray-600">
                    <strong>Faculty:</strong> {course.facultyname}
                  </p>
                  <p className="text-gray-600">
                    <strong>Credits:</strong> {course.credits}
                  </p>
                  <div className="mt-2">
                    <label className="block text-gray-600">Select Grade:</label>
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
            <div className="text-center mt-6">
              <button
                onClick={sendGradesToGemini}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
              >
                Send Grades to Gemini API
              </button>
            </div>
            {responseText && (
              <div className="mt-6">
                <label className="block text-gray-600 mb-2">Response:</label>
                <textarea
                  readOnly
                  value={typingResponse}
                  className="w-full p-4 border border-gray-300 rounded-lg"
                  rows={5}
                />
              </div>
            )}
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

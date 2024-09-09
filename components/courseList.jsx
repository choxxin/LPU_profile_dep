import React from "react";

const CourseList = ({ courses = [] }) => {
  // Check if there are courses to display
  const hasCourses = courses.length > 0;

  return (
    <div className="course-list p-5 rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Course List</h2>
      </div>

      {hasCourses ? (
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
              </div>
            ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 p-4 rounded-lg shadow-sm bg-gray-100">
          <p>No courses available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default CourseList;

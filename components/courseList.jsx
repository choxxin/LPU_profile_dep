import React from "react";

const CourseList = ({ courses }) => {
  return (
    <div className="course-list p-5 rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Course List</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses
          .filter((course) => course.course_code)
          .map((course, index) => (
            <div
              key={index}
              className="course-card  rounded-lg p-4 sub shadow-sm"
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
    </div>
  );
};

export default CourseList;

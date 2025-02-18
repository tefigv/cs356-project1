import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import { csClasses } from '../data/courses'; // Import the CS classes

function CourseList({ courses = [], searchQuery }) {
  const [filteredCourses, setFilteredCourses] = useState(courses);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.trim().toLowerCase();

    if (lowerCaseQuery === "") {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(
        courses.filter(
          (course) =>
            course?.name &&
            course.name.toLowerCase().includes(lowerCaseQuery)
        )
      );
    }
  }, [searchQuery, courses]);

  // **Group courses by requirement**
  const groupedCourses = filteredCourses.reduce((acc, course) => {
    const requirement = course.requirement || "Uncategorized";
    if (!acc[requirement]) {
      acc[requirement] = [];
    }
    acc[requirement].push(course);
    return acc;
  }, {});

  return (
    <div className="p-4">
      {/* Display requirements */}
      {Object.entries(groupedCourses).map(([requirement, courses]) => (
        <div key={requirement} className="mb-6 p-4 border rounded-lg shadow-lg bg-gray-100">
          <h2 className="text-xl font-bold mb-2">{requirement}</h2>

          {/* List Courses inside the Requirement Box */}
          <div className="space-y-2">
            {courses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CourseList;
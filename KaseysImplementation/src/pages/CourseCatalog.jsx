import React from "react";
import CourseList from "../components/CourseList";

const CourseCatalog = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">BYU CS Course Catalog</h1>
      <CourseList />
    </div>
  );
};

export default CourseCatalog;

import React, { useState } from "react";

function CourseCard({ course }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left font-semibold text-lg flex justify-between"
      >
        {course.name}
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="mt-2 text-gray-800">
          <p><strong>Credits:</strong> {course.credits}</p>
          <p><strong>Prerequisites:</strong> {course.prerequisites?.length > 0 ? course.prerequisites.join(", ") : "None"}</p>
          <p><strong>Description:</strong> {course.description}</p>
          <p><strong>Skills:</strong> {course.skills?.length > 0 ? course.skills.join(", ") : "None"}</p>
          <p><strong>Modality:</strong> {course.modality}</p>
          <p><strong>Days:</strong> {course.days?.length > 0 ? course.days.join(", ") : "Not Available"}</p>
          
          {/* Fixing Professors Display */}
          {course.professors && course.professors.length > 0 ? (
            <>
              <p><strong>Professors:</strong></p>
              <ul>
                {course.professors.map((prof, index) => (
                  <li key={index}>
                    <a
                      href={prof.rmpLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {prof.name}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p><strong>Professors:</strong> Not Available</p>
          )}
        </div>
      )}
    </div>
  );
}

export default CourseCard;
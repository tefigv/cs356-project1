import React, { useState } from 'react';
import './sidebar.css';

function Sidebar({
  completedCourses = [],
  registeredCourses = new Set(),
  plannedCourses = [],
  totalCreditsRequired = 74,
  openModal, // ✅ Receives openModal function
  coursesData = [], // ✅ Default empty array to prevent errors
}) {
  const [expandedSections, setExpandedSections] = useState({
    completed: true,
    registered: true,
    planned: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // 🔥 Format course names to match header format (e.g., "CS 224")
  const formatCourseName = (course) => {
    return course.replace(/(\D+)(\d+)/, (match, letters, numbers) => `${letters.toUpperCase()} ${numbers}`);
  };

  // 🔥 Find course details by matching formatted course header
  const getCourseDetails = (courseCode) => {
    if (!coursesData || coursesData.length === 0) return null;
    return coursesData.find((course) => formatCourseName(course.header) === formatCourseName(courseCode)) || null;
  };

  // Dynamically calculate progress bar values
  const creditsPerCourse = 3;
  const earnedCredits = completedCourses.length * creditsPerCourse;
  const inProgressCredits = registeredCourses.size * creditsPerCourse;
  const completedPercent = Math.min(Math.round((earnedCredits / totalCreditsRequired) * 100), 100);
  const inProgressPercent = Math.min(Math.round(((earnedCredits + inProgressCredits) / totalCreditsRequired) * 100), 100);

  return (
    <div className="bg-light border-left h-100">
      <div className="sidebar-container">
      <h5>My Plan</h5>
      <div className="mb-3">
        <strong>Computer Science</strong>
        <div className="d-flex justify-content-between">
          <span>{totalCreditsRequired} Required Hours</span>
        </div>

        {/* Progress Bar with Hover Tooltip */}
        <div className="progress-container">
          <div 
            className="progress-bar-tooltip"
            data-tooltip={`${earnedCredits} / ${totalCreditsRequired} credits completed | ${inProgressCredits} in progress`}
          >
            <div className="progress">
              {/* Orange Overlay for In-Progress Courses */}
              <div className="progress-bar in-progress-bar" style={{ width: `${inProgressPercent}%` }}></div>

              {/* Blue Bar for Completed Courses */}
              <div
                className="progress-bar completed-bar"
                role="progressbar"
                style={{ width: `${completedPercent}%` }}
                aria-valuenow={completedPercent}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <span className="inside-bar-text">{completedPercent}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Completed Courses */}
      <div className="mb-3">
        <strong onClick={() => toggleSection('completed')} style={{ cursor: 'pointer' }}>
          {expandedSections.completed ? '▼' : '▶'} Completed Courses
        </strong>
        {expandedSections.completed && (
          completedCourses.length === 0 ? (
            <p className="text-muted">None</p>
          ) : (
            <ul className="list-group list-group-flush">
              {completedCourses.map((course, idx) => {
                const courseDetails = getCourseDetails(course);
                return (
                  <li
                    key={idx}
                    className="list-group-item course-hover"
                    onClick={() => courseDetails && openModal(courseDetails)}
                  >
                    {formatCourseName(course)}
                  </li>
                );
              })}
            </ul>
          )
        )}
      </div>

      {/* Registered (In Progress) Courses - 🔥 FIXED 🔥 */}
      <div className="mb-3">
        <strong onClick={() => toggleSection('registered')} style={{ cursor: 'pointer' }}>
          {expandedSections.registered ? '▼' : '▶'} In Progress
        </strong>
        {expandedSections.registered && (
          registeredCourses.size === 0 ? (
            <p className="text-muted">None</p>
          ) : (
            <ul className="list-group list-group-flush">
              {[...registeredCourses].map((courseId) => {
                const formattedCourse = formatCourseName(courseId);
                const courseDetails = getCourseDetails(formattedCourse);
                return (
                  <li
                    key={courseId}
                    className="list-group-item course-hover"
                    onClick={() => courseDetails && openModal(courseDetails)}
                  >
                    {formattedCourse}
                  </li>
                );
              })}
            </ul>
          )
        )}
      </div>

      {/* Planned Courses - 🔥 FIXED 🔥 */}
      <div className="mb-3">
        <strong onClick={() => toggleSection('planned')} style={{ cursor: 'pointer' }}>
          {expandedSections.planned ? '▼' : '▶'} Planned Courses
        </strong>
        {expandedSections.planned && (
          plannedCourses.length === 0 ? (
            <p className="text-muted">None</p>
          ) : (
            <ul className="list-group list-group-flush">
              {plannedCourses.map((course, idx) => {
                const formattedCourse = formatCourseName(course);
                const courseDetails = getCourseDetails(course); // 🔥 FIXED lookup
                return (
                  <li
                    key={idx}
                    className="list-group-item course-hover"
                    onClick={() => courseDetails && openModal(courseDetails)}
                  >
                    {formattedCourse}
                  </li>
                );
              })}
            </ul>
          )
        )}
      </div>
    </div>
    </div>
  );
}

export default Sidebar;
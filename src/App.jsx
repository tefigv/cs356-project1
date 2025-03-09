import React, { useState } from 'react';
import coursesData from './courseData';
import Sidebar from './Sidebar';


function App() {
  const [modalCourse, setModalCourse] = useState(null);
  const [registeredCourses, setRegisteredCourses] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseLevel, setCourseLevel] = useState('All Levels');
  const [creditHours, setCreditHours] = useState('All Credits');
  const [semester, setSemester] = useState('All Semesters');
  const [requirement, setRequirement] = useState('All Requirements');
  const coursesPerPage = 10;
  const [showRegistered, setShowRegistered] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  const [showCore, setShowCore] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  const [completedCourses, setCompletedCourses] = useState(['CS 111', 'CS 224', 'CS 235']);
  const [plannedCourses, setPlannedCourses] = useState(['CS 236', 'CS 312']);
  const totalCreditsRequired = 74;
  const creditsPerCourse = 3;
  const earnedCredits = completedCourses.length * creditsPerCourse;
  const currentCompletionPercent = Math.min(
    Math.round((earnedCredits / totalCreditsRequired) * 100),
    100
  );

  const resetFilters = () => {
    setSearchTerm('');
    setCourseLevel('All Levels');
    setCreditHours('All Credits');
    setSemester('All Semesters');
    setShowCore(false);
    setSortOrder('asc');
    setCurrentPage(1);
    setRequirement('All Requirements');
  };

  const filteredCourses = coursesData
    .filter((course) => {
      const levelMatch =
        courseLevel === 'All Levels' ||
        Math.floor(parseInt(course.header.match(/\d+/)[0]) / 100) * 100 === parseInt(courseLevel);
      const creditMatch =
        creditHours === 'All Credits' || course.credits === parseInt(creditHours);
      const semesterMatch =
        semester === 'All Semesters' || course.semesters.includes(semester);
      const searchMatch =
        course.header.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.title.toLowerCase().includes(searchTerm.toLowerCase());
      const coreMatch = !showCore || course.isCore;
      const registeredMatch = !showRegistered || registeredCourses.has(course.id);
      const completedMatch = !showCompleted || completedCourses.includes(course.header);

      const requirementMatch = requirement === 'All Requirements' || course.requirement.includes(requirement);

      return levelMatch && creditMatch && semesterMatch && searchMatch && coreMatch && registeredMatch && completedMatch && requirementMatch;
    })
    .sort((a, b) => {
      const levelA = parseInt(a.header.match(/\d+/)[0]);
      const levelB = parseInt(b.header.match(/\d+/)[0]);
      return sortOrder === 'asc' ? levelA - levelB : levelB - levelA;
    });

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  

  const openModal = (course) => setModalCourse(course);
  const closeModal = () => setModalCourse(null);

  const toggleRegister = (courseId) => {
    setRegisteredCourses((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
      } else {
        newSet.add(courseId);
      }
      return newSet;
    });
  };

  const requirements = [
    { id: 'requirement1', label: 'Requirement 1 - Complete 17 Courses' },
    { id: 'requirement2', label: 'Requirement 2 - Complete 4 Courses' },
    { id: 'requirement3', label: 'Requirement 3 - Complete 1 of 2 Courses' },
    { id: 'requirement4', label: 'Requirement 4 - Complete 1 of 3 Courses' },
    { id: 'requirement5', label: 'Requirement 5 - Complete 2 of 11 Courses' },
    { id: 'requirement6', label: 'Requirement 6 - Complete 1 of 38 Courses' },
  ];
  return (
    <div className="app">
      <header className="site-header">
        <div className="container">
          <h1>BYU Computer Science Catalog</h1>
          <h3>Software Engineer</h3>
          <p></p>
        </div>
      </header>

      <div className="container m-4">
      <div className="row">
        {/* Right Column: Filters + Sidebar */}
        <div className="col-md-3 align-self-start">
          <div className="right-sidebar">
            <div className="filters-container right-filters">
              <div className="filter-item">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                />
                {searchTerm && (
                  <button className="clear-button" onClick={() => { setSearchTerm(''); setCurrentPage(1); }}>
                    ×
                  </button>
                )}
                </div>
                <div className="filter-item">
                  <select value={requirement} onChange={(e) => setRequirement(e.target.value)}>
                    <option value="All Requirements">All Requirements</option>
                    {requirements.map((req) => (
                    <option key={req.id} value={req.id}>{req.label}</option>
                    ))}
                  </select>
                </div>
                <div className="filter-item">
                  <select value={courseLevel} onChange={(e) => { setCourseLevel(e.target.value); setCurrentPage(1); }}>
                    <option>All Levels</option>
                    <option value="100">100 Level</option>
                    <option value="200">200 Level</option>
                    <option value="300">300 Level</option>
                    <option value="400">400 Level</option>
                  </select>
                </div>
                <div className="filter-item">
                  <select value={creditHours} onChange={(e) => { setCreditHours(e.target.value); setCurrentPage(1); }}>
                    <option>All Credits</option>
                    {[...new Set(coursesData.map((c) => c.credits))]
                      .sort()
                      .map((credit) => (
                        <option key={credit} value={credit}>
                          {credit} credit{credit !== 1 ? 's' : ''}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="filter-item">
                  <select value={semester} onChange={(e) => { setSemester(e.target.value); setCurrentPage(1); }}>
                    <option>All Semesters</option>
                    <option value="F">Fall</option>
                    <option value="W">Winter</option>
                    <option value="SP">Spring</option>
                    <option value="SU">Summer</option>
                  </select>
                </div>
                <div className="filter-item checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={showCore}
                      onChange={() => { setShowCore(prev => !prev); setCurrentPage(1); }}
                    />
                    Core Classes
                  </label>
                </div>
                <div className="filter-item checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={showRegistered}
                      onChange={() => { setShowRegistered(prev => !prev); setCurrentPage(1); }}
                    />
                    Registered Courses
                  </label>
                </div>
                <div className="filter-item checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={showCompleted}
                      onChange={() => { setShowCompleted(prev => !prev); setCurrentPage(1); }}
                    />
                    Completed Courses
                  </label>
                </div>
                <div className="filter-item">
                  <button className="reset-button" onClick={resetFilters}>
                    Reset
                  </button>
                </div>
              </div>
              {/* Sidebar component appears below the filters */}
              <Sidebar
                completedCourses={completedCourses}
                registeredCourses={registeredCourses}
                plannedCourses={plannedCourses}
                totalCreditsRequired={totalCreditsRequired}
                currentCompletionPercent={currentCompletionPercent}
                openModal={openModal}
                coursesData={coursesData}
              />
              </div>
            </div>
         {/* Requirement Courses Sections */}   
         <div className="col-md-9">
         <div className="row justify-content-end">
        {requirements
        .filter(req => requirement === 'All Requirements' || req.id === requirement)
        .map((req) => {
          const requirementCourses = filteredCourses.filter(course => course.requirement && course.requirement.includes(req.id));
          if (requirementCourses.length === 0) {
            return null; // Skip rendering this requirement section if no courses match
          }
          return (
            <div className="col-md-10 mb-4" key={req.id}>
            <h3>{req.label}</h3>
            <div className="list-group" id={`accordion-${req.id}`}>
              {requirementCourses.map((course) => (
                <div
                  className="list-group-item list-group-item-action"
                  key={course.id}
                  // onClick={() => openModal(course)}
                >
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse-${course.id}`} aria-expanded="false" aria-controls={`flush-collapse-${course.id}`} data-bs-parent={`#accordion-${req.id}`}>
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{course.header} - {course.title}</h5>
                  <small>{course.credits} credits</small>
                </div>
              </button>
              <div id={`flush-collapse-${course.id}`} className="accordion-collapse collapse" data-bs-parent={`#accordion-${req.id}`}>
            <p className="modal-description">{course.description}</p>
            <div className="modal-details">
              <p>
                <strong>Credits:</strong> {course.credits}
              </p>
              {/* Show Prerequisites, defaulting to "None" if empty */}
              <p><strong>Prerequisites:</strong> {course.prerequisites && course.prerequisites.length > 0 
                ? course.prerequisites.join(", ") 
                : "None"}
              </p>

              {/* Show Skills Learned if available */}
              {course.skills && course.skills.length > 0 && (
                <p><strong>Skills Learned:</strong> {course.skills.join(", ")}</p>
              )}

              {/* Show Delivery Method */}
              {course.deliveryMethod && (
                <p><strong>Delivery Method:</strong> {course.deliveryMethod.join(", ")}</p>
              )}
              <p>
                <strong>Semesters Offered:</strong>
              </p>
              <div className="modal-semesters">
                {course.semesters.map((sem, idx) => (
                  <span key={idx} className={`semester-badge ${sem}`}>
                    {sem === 'F'
                      ? 'Fall'
                      : sem === 'W'
                      ? 'Winter'
                      : sem === 'SP'
                      ? 'Spring'
                      : 'Summer'}
                  </span>
                ))}
              </div>
            </div>
            <button
              className="register-button"
              onClick={() => toggleRegister(course.id)}
            >
              {registeredCourses.has(course.id) ? 'Registered' : 'Register'}
            </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  })}
  
  </div>
  </div>
  </div>
  </div>

       

        {/* <div className="courses-grid">
          {
            displayedCourses.map((course) => (
              <div
                className="course-card"
                key={course.id}
                onClick={() => openModal(course)}
              >
                <div className="card-content">
                  <h3>
                    {course.header} - {course.title}
                    {course.isCore && <span className="core-badge">Core</span>}
                    {registeredCourses.has(course.id) && (
                    <span className="registered-badge">R</span>
                  )}
                  </h3>
                  <span className="credits">{course.credits} credits</span>
                </div>
              </div>
            ))
          }
        </div> */}

      <footer className="site-footer">
        <div className="container">
          <p>&copy; 2025 BYU CS Courses. All rights reserved.</p>
          <p>Contact: webmaster@byu.edu | Provo, UT 84602</p>
        </div>
      </footer>

      {modalCourse && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <h2>
              {modalCourse.header}: {modalCourse.title}
              {modalCourse.isCore && <span className="core-badge">Core</span>}
            </h2>
            <p className="modal-description">{modalCourse.description}</p>
            <div className="modal-details">
              <p>
                <strong>Credits:</strong> {modalCourse.credits}
              </p>
              <p>
                <strong>Prerequisites:</strong>{' '}
                {modalCourse.prerequisites && modalCourse.prerequisites.length > 0
                  ? modalCourse.prerequisites.join(', ')
                  : 'None'}
              </p>
              {modalCourse.skills && modalCourse.skills.length > 0 && (
                <p>
                  <strong>Skills Learned:</strong> {modalCourse.skills.join(', ')}
                </p>
              )}
              {modalCourse.deliveryMethod && (
                <p>
                  <strong>Delivery Method:</strong> {modalCourse.deliveryMethod.join(', ')}
                </p>
              )}
              <p>
                <strong>Semesters Offered:</strong>
              </p>
              <div className="modal-semesters">
                {modalCourse.semesters.map((sem, idx) => (
                  <span key={idx} className={`semester-badge ${sem}`}>
                    {sem === 'F'
                      ? 'Fall'
                      : sem === 'W'
                      ? 'Winter'
                      : sem === 'SP'
                      ? 'Spring'
                      : 'Summer'}
                  </span>
                ))}
              </div>
            </div>
            <button className="register-button" onClick={() => toggleRegister(modalCourse.id)}>
              {registeredCourses.has(modalCourse.id) ? 'Registered' : 'Register'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

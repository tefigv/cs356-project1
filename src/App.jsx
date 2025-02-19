import React, { useState } from 'react';
import coursesData from './courseData';

function App() {
  const [modalCourse, setModalCourse] = useState(null);
  const [registeredCourses, setRegisteredCourses] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseLevel, setCourseLevel] = useState('All Levels');
  const [creditHours, setCreditHours] = useState('All Credits');
  const [semester, setSemester] = useState('All Semesters');
  const coursesPerPage = 10;

  const [favorites, setFavorites] = useState([]);
  const [showCore, setShowCore] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [showFavorites, setShowFavorites] = useState(false);

  const resetFilters = () => {
    setSearchTerm('');
    setCourseLevel('All Levels');
    setCreditHours('All Credits');
    setSemester('All Semesters');
    setShowFavorites(false);
    setShowCore(false);
    setSortOrder('asc');
    setCurrentPage(1);
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
      const favoritesMatch = !showFavorites || favorites.includes(course.id);
      const coreMatch = !showCore || course.isCore;

      return levelMatch && creditMatch && semesterMatch && searchMatch && favoritesMatch && coreMatch;
    })
    .sort((a, b) => {
      const levelA = parseInt(a.header.match(/\d+/)[0]);
      const levelB = parseInt(b.header.match(/\d+/)[0]);
      return sortOrder === 'asc' ? levelA - levelB : levelB - levelA;
    });

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const displayedCourses =
    showFavorites && favorites.length === 0
      ? []
      : filteredCourses.slice((currentPage - 1) * coursesPerPage, currentPage * coursesPerPage);

  const toggleFavorite = (courseId) => {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(courseId)
        ? currentFavorites.filter((id) => id !== courseId)
        : [...currentFavorites, courseId]
    );
  };

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

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="app">
      <header className="site-header">
        <div className="container">
          <h1>BYU CS Courses</h1>
          <p></p>
        </div>
      </header>

      {/* Filters Bar */}
      <div className="filters-container container">
        <div className="filter-item">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-button" onClick={() => setSearchTerm('')}>
              ×
            </button>
          )}
        </div>
        <div className="filter-item">
          <select value={sortOrder} onChange={handleSortOrderChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div className="filter-item">
          <select value={courseLevel} onChange={(e) => setCourseLevel(e.target.value)}>
            <option>All Levels</option>
            <option value="100">100 Level</option>
            <option value="200">200 Level</option>
            <option value="300">300 Level</option>
            <option value="400">400 Level</option>
          </select>
        </div>
        <div className="filter-item">
          <select value={creditHours} onChange={(e) => setCreditHours(e.target.value)}>
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
          <select value={semester} onChange={(e) => setSemester(e.target.value)}>
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
              checked={showFavorites}
              onChange={() => setShowFavorites((prev) => !prev)}
            />
            Favorites
          </label>
        </div>
        <div className="filter-item checkbox">
          <label>
            <input
              type="checkbox"
              checked={showCore}
              onChange={() => setShowCore((prev) => !prev)}
            />
            Core Classes
          </label>
        </div>
        <div className="filter-item">
          <button className="reset-button" onClick={resetFilters}>
            Reset
          </button>
        </div>
      </div>

      {/* Courses Section */}
      <main className="container">
        <div className="pagination top-pagination">
          <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        <div className="courses-grid">
          {showFavorites && favorites.length === 0 ? (
            <div className="no-favorites">No favorites selected</div>
          ) : (
            displayedCourses.map((course) => (
              <div
                className="course-card"
                key={course.id}
                onClick={() => openModal(course)}
              >
                <div className="card-content">
                  <h3>
                    {course.header}
                    {course.isCore && <span className="core-badge">Core</span>}
                    {registeredCourses.has(course.id) && (
                    <span className="registered-badge">R</span>
                  )}
                  </h3>
                  <h4>{course.title}</h4>
                  <span className="credits">{course.credits} credits</span>
                </div>
                <button
                  className={`favorite-button ${favorites.includes(course.id) ? 'favorited' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(course.id);
                  }}
                >
                  {favorites.includes(course.id) ? '★' : '☆'}
                </button>
              </div>
            ))
          )}
        </div>

        <div className="pagination bottom-pagination">
          <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </main>

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
            <button
              className={`favorite-button ${favorites.includes(modalCourse.id) ? 'favorited' : ''}`}
              onClick={() => toggleFavorite(modalCourse.id)}
            >
              {favorites.includes(modalCourse.id) ? '★ Unfavorite' : '☆ Favorite'}
            </button>
            <p className="modal-description">{modalCourse.description}</p>
            <div className="modal-details">
              <p>
                <strong>Credits:</strong> {modalCourse.credits}
              </p>
              {/* Show Prerequisites, defaulting to "None" if empty */}
              <p><strong>Prerequisites:</strong> {modalCourse.prerequisites && modalCourse.prerequisites.length > 0 
                ? modalCourse.prerequisites.join(", ") 
                : "None"}
              </p>

              {/* Show Skills Learned if available */}
              {modalCourse.skills && modalCourse.skills.length > 0 && (
                <p><strong>Skills Learned:</strong> {modalCourse.skills.join(", ")}</p>
              )}

              {/* Show Delivery Method */}
              {modalCourse.deliveryMethod && (
                <p><strong>Delivery Method:</strong> {modalCourse.deliveryMethod.join(", ")}</p>
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
            <button
              className="register-button"
              onClick={() => toggleRegister(modalCourse.id)}
            >
              {registeredCourses.has(modalCourse.id) ? 'Registered' : 'Register'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

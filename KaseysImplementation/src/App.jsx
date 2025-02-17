// src/App.jsx
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import CourseList from "./components/CourseList";

const coursesByRequirement = {
  "Requirement 1": [
    {
      id: 1,
      name: "CS 142 - Intro to Computer Programming",
      credits: 3,
      requirement: "Requirement 1",
      prerequisites: [],
      description: "Introduction to problem-solving, programming, and fundamental computing concepts.",
      skills: ["Python"],
      modality: "In-Person",
      days: ["MWF"],
      professors: [{ name: "Dr. Smith", rmpLink: "https://www.ratemyprofessors.com/Smith" }],
    },
    {
      id: 2,
      name: "CS 224 - Computer Systems",
      credits: 3,
      requirement: "Requirement 1",
      prerequisites: ["CS 142"],
      description: "Introduction to low-level computing and assembly.",
      skills: ["C", "Linux"],
      modality: "Hybrid",
      days: ["TTh"],
      professors: [{ name: "Dr. Jones", rmpLink: "https://www.ratemyprofessors.com/Jones" }],
    },
    {
      id: 3,
      name: "CS 235 - Data Structures",
      credits: 3,
      requirement: "Requirement 1",
      prerequisites: ["CS 142"],
      description: "Advanced data structures and algorithms in programming.",
      skills: ["Java", "C++"],
      modality: "Online",
      days: ["MW"],
      professors: [{ name: "Dr. Brown", rmpLink: "https://www.ratemyprofessors.com/Brown" }],
    },
    {
      id: 4,
      name: "CS 236 - Discrete Structure",
      credits: 3,
      requirement: "Requirement 1",
      prerequisites: ["CS 142"],
      description: "Fundamental concepts of discrete mathematics in computing.",
      skills: ["Mathematical Logic"],
      modality: "In-Person",
      days: ["TTh"],
      professors: [{ name: "Dr. Taylor", rmpLink: "https://www.ratemyprofessors.com/Taylor" }],
    },
    {
      id: 5,
      name: "CS 240 - Advanced Software Construction",
      credits: 4,
      requirement: "Requirement 1",
      prerequisites: ["CS 235"],
      description: "Advanced techniques in software construction, including design patterns and principles of object-oriented programming.",
      skills: ["Java", "Design Patterns", "OOP"],
      modality: "In-Person",
      days: ["MWF"],
      professors: [{ name: "Dr. Roberts", rmpLink: "https://www.ratemyprofessors.com/Roberts" }],
    },
    {
      id: 6,
      name: "CS 312 - Algorithm Design & Analysis",
      credits: 3,
      requirement: "Requirement 1",
      prerequisites: ["CS 235"],
      description: "Design and analysis of algorithms, including sorting, searching, and graph algorithms.",
      skills: ["Algorithm Design", "Complexity Analysis"],
      modality: "In-Person",
      days: ["TTh"],
      professors: [{ name: "Dr. Miller", rmpLink: "https://www.ratemyprofessors.com/Miller" }],
    },
    {
      id: 7,
      name: "CS 324 - Systems Programming",
      credits: 3,
      requirement: "Requirement 1",
      prerequisites: ["CS 142"],
      description: "System-level programming and interaction with operating system services, including process management and memory management.",
      skills: ["C", "Linux", "System Programming"],
      modality: "Hybrid",
      days: ["TTh"],
      professors: [{ name: "Dr. Harris", rmpLink: "https://www.ratemyprofessors.com/Harris" }],
    },
    {
      id: 8,
      name: "CS 404 - Ethics & Computers in Society",
      credits: 2,
      requirement: "Requirement 1",
      prerequisites: [],
      description: "Examination of the ethical issues related to computers and technology in society, including privacy, security, and intellectual property.",
      skills: ["Ethics", "Technology in Society"],
      modality: "In-Person",
      days: ["MW"],
      professors: [{ name: "Dr. Davis", rmpLink: "https://www.ratemyprofessors.com/Davis" }],
    },
    {
      id: 9,
      name: "CS 252 - Introduction to Computational Theory",
      credits: 3,
      requirement: "Requirement 1",
      prerequisites: ["CS 142"],
      description: "Fundamental concepts in computational theory, including automata theory, formal languages, and computability.",
      skills: ["Theory of Computation", "Formal Languages"],
      modality: "Online",
      days: ["TTh"],
      professors: [{ name: "Dr. King", rmpLink: "https://www.ratemyprofessors.com/King" }],
    },
    {
      id: 10,
      name: "CS 340 - Software Design",
      credits: 3,
      requirement: "Requirement 1",
      prerequisites: ["CS 240"],
      description: "Principles and practices of software design, including UML modeling, design patterns, and testing.",
      skills: ["UML", "Software Architecture", "Testing"],
      modality: "In-Person",
      days: ["MWF"],
      professors: [{ name: "Dr. Clark", rmpLink: "https://www.ratemyprofessors.com/Clark" }],
    },
  ],
  "Requirement 2": [
    {
      id: 13,
      name: "MATH 112 - Calculus 1",
      credits: 4,
      requirement: "Requirement 2",
      prerequisites: [],
      description: "Differential and integral calculus.",
      skills: ["Mathematics"],
      modality: "In-Person",
      days: ["MWF"],
      professors: [{ name: "Dr. White", rmpLink: "https://www.ratemyprofessors.com/White" }],
    },
    {
      id: 14,
      name: "MATH 113 - Calculus 2",
      credits: 4,
      requirement: "Requirement 2",
      prerequisites: ["MATH 112"],
      description: "Continuation of Calculus 1, covering integration techniques and sequences/series.",
      skills: ["Mathematics"],
      modality: "Online",
      days: ["TTh"],
      professors: [{ name: "Dr. Green", rmpLink: "https://www.ratemyprofessors.com/Green" }],
    },
    {
      id: 15,
      name: "STAT 201 - Statistics for Engineers & Scientists",
      credits: 3,
      requirement: "Requirement 2",
      prerequisites: [],
      description: "Introduction to probability, statistics, and data analysis for engineers.",
      skills: ["Statistics"],
      modality: "Hybrid",
      days: ["MW"],
      professors: [{ name: "Dr. Lee", rmpLink: "https://www.ratemyprofessors.com/Lee" }],
    },
    {
      id: 16,
      name: "PHSCS 121 - Intro to Newtonian Mechanics",
      credits: 3,
      requirement: "Requirement 2",
      prerequisites: [],
      description: "Introduction to Newtonian mechanics for engineers and scientists.",
      skills: ["Physics", "Engineering Principles"],
      modality: "In-Person",
      days: ["MWF"],
      professors: [{ name: "Dr. Anderson", rmpLink: "https://www.ratemyprofessors.com/Anderson" }],
    },
    {
      id: 17,
      name: "WRTG 316 - Technical Communication",
      credits: 3,
      requirement: "Requirement 2",
      prerequisites: [],
      description: "Develop technical writing skills, focusing on documents for the workplace and technical fields.",
      skills: ["Writing", "Communication"],
      modality: "Hybrid",
      days: ["TTh"],
      professors: [{ name: "Dr. Bailey", rmpLink: "https://www.ratemyprofessors.com/Bailey" }],
    }
  ],
  "Requirement 3": [
    {
      id: 18,
      name: "CS 356 - Advanced Techniques in HCI",
      credits: 3,
      requirement: "Requirement 3",
      prerequisites: ["CS 142"],
      description: "Human-computer interaction design principles and usability testing.",
      skills: ["UX/UI", "Human Factors"],
      modality: "In-Person",
      days: ["TTh"],
      professors: [{ name: "Dr. Adams", rmpLink: "https://www.ratemyprofessors.com/Adams" }],
    },
    {
      id: 19,
      name: "CS 470 - Introduction to Artificial Intelligence",
      credits: 3,
      requirement: "Requirement 3",
      prerequisites: ["CS 312"],
      description: "Fundamentals of AI, machine learning, and intelligent systems.",
      skills: ["Python", "Machine Learning"],
      modality: "Online",
      days: ["MWF"],
      professors: [{ name: "Dr. Davis", rmpLink: "https://www.ratemyprofessors.com/Davis" }],
    },
    {
      id: 20,
      name: "CS 450 - Computer Vision",
      credits: 3,
      requirement: "Requirement 3",
      prerequisites: ["CS 312"],
      description: "Introduction to image processing and computer vision techniques.",
      skills: ["Python", "OpenCV"],
      modality: "Hybrid",
      days: ["TTh"],
      professors: [{ name: "Dr. Carter", rmpLink: "https://www.ratemyprofessors.com/Carter" }],
    },
    {
      id: 21,
      name: "CS 452 - Database Modeling Concepts",
      credits: 3,
      requirement: "Requirement 3",
      prerequisites: ["CS 142"],
      description: "Database design, normalization, and SQL programming concepts.",
      skills: ["SQL", "Database Design"],
      modality: "In-Person",
      days: ["MWF"],
      professors: [{ name: "Dr. Harris", rmpLink: "https://www.ratemyprofessors.com/Harris" }],
    },
    {
      id: 22,
      name: "CS 455 - Computer Graphics",
      credits: 3,
      requirement: "Requirement 3",
      prerequisites: ["CS 235"],
      description: "Introduction to 2D and 3D computer graphics, including rendering and graphics hardware.",
      skills: ["OpenGL", "Graphics Programming"],
      modality: "Hybrid",
      days: ["TTh"],
      professors: [{ name: "Dr. Martinez", rmpLink: "https://www.ratemyprofessors.com/Martinez" }],
    },  
  ],
  "Requirement 4": [
    {
      id: 24,
      name: "CS 493R - Computing Competitions",
      credits: 3,
      requirement: "Requirement 4",
      prerequisites: [],
      description: "Competitive programming techniques and strategies.",
      skills: ["C++", "Algorithms"],
      modality: "In-Person",
      days: ["MW"],
      professors: [{ name: "Dr. Evans", rmpLink: "https://www.ratemyprofessors.com/Evans" }],
    },
    {
      id: 25,
      name: "CS 494 - Capstone 1",
      credits: 3,
      requirement: "Requirement 4",
      prerequisites: ["CS 340"],
      description: "Team-based software development project (part 1).",
      skills: ["Project Management", "Agile"],
      modality: "In-Person",
      days: ["MW"],
      professors: [{ name: "Dr. Walker", rmpLink: "https://www.ratemyprofessors.com/Walker" }],
    },
    {
      id: 26,
      name: "CS 495 - Capstone 2",
      credits: 3,
      requirement: "Requirement 4",
      prerequisites: ["CS 494"],
      description: "Team-based software development project (part 2).",
      skills: ["Software Engineering", "Collaboration"],
      modality: "In-Person",
      days: ["TTh"],
      professors: [{ name: "Dr. Nelson", rmpLink: "https://www.ratemyprofessors.com/Nelson" }],
    },
    {
      id: 27,
      name: "Senior Exit Interview",
      credits: 0,
      requirement: "Requirement 4",
      prerequisites: [],
      description: "Exit interview with the CS department during your last semester or term.",
      skills: [],
      modality: "In-Person",
      days: ["Scheduled with department"],
      professors: [],
    }
    
  ],
};


function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <Navbar />
      {/* Add the title here */}
      <div className="text-2xl font-bold text-center p-4">
        Computer Science (BS)
      </div>

      <div className="container mx-auto p-4">
        {/* Search Bar moved here */}
        <input
          type="text"
          placeholder="Search for a course..."
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {Object.entries(coursesByRequirement).map(([requirement, courses]) => (
          <CourseList
            key={requirement}
            requirementTitle={requirement}
            courses={courses}
            searchQuery={searchQuery} // Pass searchQuery to CourseList
          />
        ))}
      </div>
    </div>
  );
}

export default App;
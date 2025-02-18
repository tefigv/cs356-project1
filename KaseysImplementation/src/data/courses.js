// Define the CSClass object
class CSClass {
  constructor(name, credits, description, prerequisites = [], skills = [], modality, days = [], professors = [], requirement) {
    this.name = name;
    this.credits = credits;
    this.description = description;
    this.prerequisites = prerequisites;
    this.skills = skills;
    this.modality = modality;
    this.days = days;
    this.professors = professors;
    this.requirement = requirement;  // Add requirement to each class
  }
}
const csClasses = [
  new CSClass(
    "CS 110 - How to Program", 
    3, 
    "Introduction to programming and computer science for those with no prior programming experience.", 
    [], 
    ["Python"], 
    "In-Person", 
    ["MWF"], 
    [{ name: "Dr. Smith", rmpLink: "https://www.ratemyprofessors.com/Smith" }],
    "Requirement 1"
  ),
  new CSClass(
    "CS 111 - Intro to Computer Science", 
    3, 
    "Teaches how to design, develop, reason about, and test programs.", 
    [], 
    ["Python"], 
    "In-Person", 
    ["MWF"], 
    [{ name: "Dr. Smith", rmpLink: "https://www.ratemyprofessors.com/Smith" }],
    "Requirement 1"
  ),
  new CSClass(
    "CS 224 - Computer Systems", 
    3, 
    "Introduction to low-level computing and assembly.", 
    ["CS 111"], 
    ["C", "Linux"], 
    "Hybrid", 
    ["TTh"], 
    [{ name: "Dr. Jones", rmpLink: "https://www.ratemyprofessors.com/Jones" }],
    "Requirement 1"
  ),
  new CSClass(
    "CS 235 - Data Structures", 
    3, 
    "Advanced data structures and algorithms in programming.", 
    ["CS 111"], 
    ["Java", "C++"], 
    "Online", 
    ["MW"], 
    [{ name: "Dr. Brown", rmpLink: "https://www.ratemyprofessors.com/Brown" }],
    "Requirement 1"
  ),
  new CSClass(
    "CS 236 - Discrete Structure", 
    3, 
    "Fundamental concepts of discrete mathematics in computing.", 
    ["CS 111"], 
    ["Mathematical Logic"], 
    "In-Person", 
    ["TTh"], 
    [{ name: "Dr. Taylor", rmpLink: "https://www.ratemyprofessors.com/Taylor" }],
    "Requirement 1"
  ),
  new CSClass(
    "CS 240 - Advanced Software Construction", 
    4, 
    "Advanced techniques in software construction, including design patterns and principles of object-oriented programming.", 
    ["CS 235"], 
    ["Java", "Design Patterns", "OOP"], 
    "In-Person", 
    ["MWF"], 
    [{ name: "Dr. Roberts", rmpLink: "https://www.ratemyprofessors.com/Roberts" }],
    "Requirement 1"
  ),
  new CSClass(
    "CS 312 - Algorithm Design & Analysis", 
    3, 
    "Design and analysis of algorithms, including sorting, searching, and graph algorithms.", 
    ["CS 235"], 
    ["Algorithm Design", "Complexity Analysis"], 
    "In-Person", 
    ["TTh"], 
    [{ name: "Dr. Miller", rmpLink: "https://www.ratemyprofessors.com/Miller" }],
    "Requirement 1"
  ),
  new CSClass(
    "CS 324 - Systems Programming", 
    3, 
    "System-level programming and interaction with operating system services, including process management and memory management.", 
    ["CS 111"], 
    ["C", "Linux", "System Programming"], 
    "Hybrid", 
    ["TTh"], 
    [{ name: "Dr. Harris", rmpLink: "https://www.ratemyprofessors.com/Harris" }],
    "Requirement 1"
  ),
  new CSClass(
    "CS 404 - Ethics & Computers in Society", 
    2, 
    "Examination of the ethical issues related to computers and technology in society, including privacy, security, and intellectual property.", 
    [], 
    ["Ethics", "Technology in Society"], 
    "In-Person", 
    ["MW"], 
    [{ name: "Dr. Davis", rmpLink: "https://www.ratemyprofessors.com/Davis" }],
    "Requirement 1"
  ),
  new CSClass(
    "CS 252 - Introduction to Computational Theory", 
    3, 
    "Fundamental concepts in computational theory, including automata theory, formal languages, and computability.", 
    ["CS 142"], 
    ["Theory of Computation", "Formal Languages"], 
    "Online", 
    ["TTh"], 
    [{ name: "Dr. King", rmpLink: "https://www.ratemyprofessors.com/King" }],
    "Requirement 1"
  ),
  new CSClass(
    "CS 340 - Software Design", 
    3, 
    "Principles and practices of software design, including UML modeling, design patterns, and testing.", 
    ["CS 240"], 
    ["UML", "Software Architecture", "Testing"], 
    "In-Person", 
    ["MWF"], 
    [{ name: "Dr. Clark", rmpLink: "https://www.ratemyprofessors.com/Clark" }],
    "Requirement 1"
  ),
  new CSClass(
    "MATH 112 - Calculus 1", 
    4, 
    "Differential and integral calculus.", 
    [], 
    ["Mathematics"], 
    "In-Person", 
    ["MWF"], 
    [{ name: "Dr. White", rmpLink: "https://www.ratemyprofessors.com/White" }],
    "Requirement 2"
  ),
  new CSClass(
    "MATH 113 - Calculus 2", 
    4, 
    "Continuation of Calculus 1, covering integration techniques and sequences/series.", 
    ["MATH 112"], 
    ["Mathematics"], 
    "Online", 
    ["TTh"], 
    [{ name: "Dr. Green", rmpLink: "https://www.ratemyprofessors.com/Green" }],
    "Requirement 2"
  ),
  new CSClass(
    "STAT 201 - Statistics for Engineers & Scientists", 
    3, 
    "Introduction to probability, statistics, and data analysis for engineers.", 
    [], 
    ["Statistics"], 
    "Hybrid", 
    ["MW"], 
    [{ name: "Dr. Lee", rmpLink: "https://www.ratemyprofessors.com/Lee" }],
    "Requirement 2"
  ),
  new CSClass(
    "CS 356 - Advanced Techniques in HCI", 
    3, 
    "Human-computer interaction design principles and usability testing.", 
    ["CS 142"], 
    ["UX/UI", "Human Factors"], 
    "In-Person", 
    ["TTh"], 
    [{ name: "Dr. Adams", rmpLink: "https://www.ratemyprofessors.com/Adams" }],
    "Requirement 3"
  ),
  new CSClass(
    "CS 470 - Introduction to Artificial Intelligence", 
    3, 
    "Fundamentals of AI, machine learning, and intelligent systems.", 
    ["CS 312"], 
    ["Python", "Machine Learning"], 
    "Online", 
    ["MWF"], 
    [{ name: "Dr. Davis", rmpLink: "https://www.ratemyprofessors.com/Davis" }],
    "Requirement 3"
  ),
  new CSClass(
    "CS 450 - Computer Vision", 
    3, 
    "Introduction to image processing and computer vision techniques.", 
    ["CS 312"], 
    ["Python", "OpenCV"], 
    "Hybrid", 
    ["TTh"], 
    [{ name: "Dr. Carter", rmpLink: "https://www.ratemyprofessors.com/Carter" }],
    "Requirement 3"
  ),
  new CSClass(
    "PHSCS 121 - Intro to Newtonian Mechanics", 
    3, 
    "Introduction to Newtonian mechanics for engineers and scientists.", 
    [], 
    ["Physics", "Engineering Principles"], 
    "In-Person", 
    ["MWF"], 
    [{ name: "Dr. Anderson", rmpLink: "https://www.ratemyprofessors.com/Anderson" }],
    "Requirement 2"
  ),
  new CSClass(
    "WRTG 316 - Technical Communication", 
    3, 
    "Develop technical writing skills, focusing on documents for the workplace and technical fields.", 
    [], 
    ["Writing", "Communication"], 
    "Hybrid", 
    ["TTh"], 
    [{ name: "Dr. Bailey", rmpLink: "https://www.ratemyprofessors.com/Bailey" }],
    "Requirement 2"
  ),
  new CSClass(
    "CS 452 - Database Modeling Concepts", 
    3, 
    "Database design, normalization, and SQL programming concepts.", 
    ["CS 142"], 
    ["SQL", "Database Design"], 
    "In-Person", 
    ["MWF"], 
    [{ name: "Dr. Harris", rmpLink: "https://www.ratemyprofessors.com/Harris" }],
    "Requirement 3"
  ),
  new CSClass(
    "CS 455 - Computer Graphics", 
    3, 
    "Introduction to 2D and 3D computer graphics, including rendering and graphics hardware.", 
    ["CS 235"], 
    ["OpenGL", "Graphics Programming"], 
    "Hybrid", 
    ["TTh"], 
    [{ name: "Dr. Martinez", rmpLink: "https://www.ratemyprofessors.com/Martinez" }],
    "Requirement 3"
  ),

  new CSClass(
    "CS 494 - Capstone 1", 
    3, 
    "Team-based software development project (part 1).", 
    ["CS 340"], 
    ["Project Management", "Agile"], 
    "In-Person", 
    ["MW"], 
    [{ name: "Dr. Walker", rmpLink: "https://www.ratemyprofessors.com/Walker" }],
    "Requirement 4"
  ),
  new CSClass(
    "CS 495 - Capstone 2", 
    3, 
    "Team-based software development project (part 2).", 
    ["CS 494"], 
    ["Software Engineering", "Collaboration"], 
    "In-Person", 
    ["TTh"], 
    [{ name: "Dr. Nelson", rmpLink: "https://www.ratemyprofessors.com/Nelson" }],
    "Requirement 4"
  ),
  new CSClass(
    "Senior Exit Interview", 
    0, 
    "Exit interview with the CS department during your last semester or term.", 
    [], 
    [], 
    "In-Person", 
    ["Scheduled with department"], 
    [],
    "Requirement 4"
  )
  
];

// Export the CSClass object and the course data
export { CSClass, csClasses };

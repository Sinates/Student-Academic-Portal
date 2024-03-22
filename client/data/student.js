// mockData.js

// List of students array
const students = [
  {
    id: 1,
    fullName: "John Doe",
    gender: "Male",
    email: "john.doe@example.com",
    phoneNumber: "1234567890",
    department: "Computer Science",
    aboutMe:
      "I am a passionate student studying Computer Science. I enjoy coding and building software applications.",
  },
  {
    id: 2,
    fullName: "Jane Smith",
    gender: "Female",
    email: "jane.smith@example.com",
    phoneNumber: "9876543210",
    department: "Mathematics",
    aboutMe:
      "I love solving complex mathematical problems. Mathematics is my passion and I am always eager to learn more.",
  },
  {
    id: 3,
    fullName: "Bob Johnson",
    gender: "Male",
    email: "bob.johnson@example.com",
    phoneNumber: "5555555555",
    department: "Physics",
    aboutMe:
      "I am fascinated by the laws of physics and enjoy conducting experiments. Exploring the mysteries of the universe is my ultimate goal.",
  },
];

const pendingStudents = [
  {
    id: 4,
    fullName: "Alice Brown",
    gender: "Female",
    email: "alice.brown@example.com",
    phoneNumber: "1111111111",
    department: "Computer Science",
    aboutMe:
      "I am a passionate student studying Computer Science. I enjoy coding and building software applications.",
  },
  {
    id: 5,
    fullName: "Michael Johnson",
    gender: "Male",
    email: "michael.johnson@example.com",
    phoneNumber: "2222222222",
    department: "Computer Science",
    aboutMe:
      "I am a dedicated student pursuing Computer Science. I love exploring new technologies and solving complex problems.",
  },
  {
    id: 6,
    fullName: "Emily Davis",
    gender: "Female",
    email: "emily.davis@example.com",
    phoneNumber: "3333333333",
    department: "Computer Science",
    aboutMe:
      "I am an enthusiastic student studying Computer Science. I enjoy working on software projects and collaborating with others.",
  },
  {
    id: 7,
    fullName: "Sarah Johnson",
    gender: "Female",
    email: "sarah.johnson@example.com",
    phoneNumber: "4444444444",
    department: "Computer Science",
    aboutMe:
      "I am a curious student passionate about Computer Science. I love learning new programming languages and exploring different algorithms.",
  },
  {
    id: 8,
    fullName: "David Lee",
    gender: "Male",
    email: "david.lee@example.com",
    phoneNumber: "6666666666",
    department: "Computer Science",
    aboutMe:
      "I am an ambitious student pursuing Computer Science. I enjoy building web applications and creating innovative solutions.",
  },
];

// Add a student to the list
const addStudent = (student) => {
  students.push(student);
};

// Remove a student from the list
const removeStudent = (studentId) => {
  const index = students.findIndex((student) => student.id === studentId);
  if (index !== -1) {
    students.splice(index, 1);
  }
};
// Move a student from pendingStudents to students
const moveStudentToStudents = (studentId) => {
  const index = pendingStudents.findIndex(
    (student) => student.id === studentId
  );

  if (index !== -1) {
    const student = pendingStudents.splice(index, 1)[0];
    pendingStudents.pop(index);
    students.push(student);
  }
};

module.exports = {
  students,
  addStudent,
  removeStudent,
  pendingStudents,
  moveStudentToStudents,
};

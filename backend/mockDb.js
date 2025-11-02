// backend/mockDb.js
// COMBINED MOCK DATA FILE

// --- 1. Public Projects Data (Used by ProjectListPage/DetailPage) ---
export const projects = [
    {
        _id: "1",
        title: "AI-Powered Research Assistant",
        professor: "Dr. Evelyn Reed",
        professorId: "prof123",
        description: "A deep learning model to summarize academic papers, focusing on NLP and abstractive summarization. Requires knowledge of transformer models.",
        prerequisites: ["Machine Learning", "Python", "NLP", "TensorFlow/PyTorch"],
        status: "Open"
    },
    {
        _id: "2",
        title: "Quantum Computing Simulator",
        professor: "Dr. Ben Carter",
        professorId: "prof456",
        description: "Developing a basic simulator for quantum logic gates and entanglement using C++.",
        prerequisites: ["Quantum Mechanics", "Linear Algebra", "C++", "Qiskit/Cirq Basics"],
        status: "Open"
    },
    {
        _id: "3",
        title: "Decentralized Social Media",
        professor: "Dr. Aisha Khan",
        professorId: "prof123", // Dr. Reed has two projects
        description: "A social media platform built on blockchain principles for immutable data logging.",
        prerequisites: ["Blockchain", "Node.js", "React", "Smart Contract basics"],
        status: "Closed"
    }
];

// --- 2. Students & Profiles ---
export const students = [
    {
        _id: "studentA",
        name: "Alice Johnson",
        email: "alice@uni.edu",
        skills: ["React", "JavaScript", "Python"],
        resume: "/resumes/alice_johnson.pdf"
    },
    {
        _id: "studentB",
        name: "Bob Smith",
        email: "bob@uni.edu",
        skills: ["C++", "Linear Algebra", "Matlab"],
        resume: "/resumes/bob_smith.pdf"
    }
];

// --- 3. Applications Data ---
export const applications = [
    {
        _id: "app001",
        studentId: "studentA",
        projectId: "1", // AI-Powered Research Assistant
        dateApplied: "2025-10-15",
        status: "Under Review",
        notes: "Excited about NLP!"
    },
    {
        _id: "app002",
        studentId: "studentA",
        projectId: "2", // Quantum Computing Simulator
        dateApplied: "2025-10-01",
        status: "Rejected",
        notes: "Applied for this one first."
    },
    {
        _id: "app003",
        studentId: "studentB",
        projectId: "1", // AI-Powered Research Assistant
        dateApplied: "2025-10-20",
        status: "Interview Scheduled",
        notes: "Strong C++ background, relevant for optimization."
    }
];

// --- 4. Professor Dashboard Data (Updated) ---
export const professorDashboardData = {
    prof123: { // Dr. Evelyn Reed
        stats: {
            activeProjects: 2, // Projects 1 and 3
            totalApplications: 3, // All applications for project 1
            studentsMentored: 1, // Mock value
        },
        projects: [
            // Note: We use the main 'projects' data and augment it with application counts
            { 
                ...projects.find(p => p._id === "1"), 
                applicationCount: 2, // App 001, 003
                status: "Open" 
            },
            { 
                ...projects.find(p => p._id === "3"), 
                applicationCount: 0, 
                status: "Closed" 
            }
        ]
    },
    prof456: { // Dr. Ben Carter
        stats: { activeProjects: 1, totalApplications: 0, studentsMentored: 0 },
        projects: [{ ...projects.find(p => p._id === "2"), applicationCount: 1, status: "Open" }]
    }
};

// --- 5. User Roles (Mock Authentication) ---
export const userRoles = {
    "studentA": { role: "student", id: "studentA" },
    "prof123": { role: "professor", id: "prof123" },
    "guest": { role: "public", id: "public" }
};
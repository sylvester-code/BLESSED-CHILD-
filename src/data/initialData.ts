import {
  User,
  Student,
  Parent,
  Teacher,
  SchoolClass,
  Subject,
  AssessmentScore,
  FeeItem,
  FeePayment,
  ExpenseRecord,
  AdmissionApplication,
  TimetableSlot,
  OnlineQuiz,
  HomeworkAssignment,
  HomeworkSubmission,
  LearningMaterial,
  LibraryBook,
  InventoryItem,
  SchoolAnnouncement,
  InternalMessage,
  AuditLog,
  SiteSettings,
  SchoolPrefect
} from '../types';

export const initialSiteSettings: SiteSettings = {
  schoolName: "Blessed Child School Complex",
  shortName: "Blessed Child",
  schoolMotto: "Knowledge, Integrity and Excellence",
  logoUrl: "",
  crestUrl: "",
  primaryColor: "#0f2b5c",
  accentColor: "#d4a712",
  themePreset: "navy-gold",
  location: "Anaji-Mpatado, Sekondi-Takoradi, Ghana",
  locationCity: "Anaji-Mpatado",
  locationCountry: "Ghana",
  address: "Plot 42, Off Anaji-Mpatado Highway, P.O. Box AX 1420, Takoradi, Western Region",
  city: "Anaji-Mpatado",
  country: "Ghana",
  primaryPhone: "+233 24 456 7890",
  secondaryPhone: "+233 50 123 4567",
  email: "info@blessedchildschool.edu.gh",
  admissionsEmail: "admissions@blessedchildschool.edu.gh",
  website: "https://blessedchildschool.edu.gh",
  academicYear: "2024/2025",
  currentTerm: "Term 2",
  currencySymbol: "GH₵",
  currencyCode: "GHS",
  gradingScale: "NaCCA_9_POINT",
  announcementTicker: "Admissions ongoing for 2024/2025 Academic Year • Blessed Child achieves 100% BECE Distinction rate • Mid-term PTA General Meeting on Saturday 15th March",
  showAnnouncementTicker: true,
  showAdmissionsBanner: true,
  showStatsCounter: true,
  showHeadmasterSection: true,
  showPrefectsSection: true,
  showFacultySection: true,
  showTransportationSection: true,
  showWhatsAppFloating: true,
  tickerVariant: "amber",
  headmasterRoleType: "Headmaster",
  heroTitle: "Nurturing Tomorrow's Leaders with Moral Excellence & Academic Distinction",
  heroSubtitle: "A premier private institution in Anaji-Mpatado, Ghana offering world-class early childhood, primary, and JHS education rooted in Christian values and modern STEM innovation.",
  welcomeMessageTitle: "Welcome to Blessed Child School Complex",
  welcomeMessageBody: "Founded on the principles of academic excellence, moral discipline, and Christian godliness, Blessed Child School Complex has been a beacon of hope in the Sekondi-Takoradi metropolis. We provide a nurturing haven where every child is inspired to discover their potential, master technology, and develop leadership qualities to thrive anywhere in the world.",
  headmasterName: "Mr. Samuel K. Arthur, M.Ed.",
  headmasterTitle: "Headmaster & Academic Director",
  headmasterPhotoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  headmasterMessage: "Education is not merely the filling of a bucket, but the lighting of a divine fire. At Blessed Child School Complex, our dedicated faculty combine modern pedagogy with solid moral values. Whether in our ultra-modern robotics and ICT lab or on the athletic field, our students consistently excel. We welcome you to join our family.",
  beceDistinctionRate: "100%",
  studentCountDisplay: "850+",
  teacherCountDisplay: "48+",
  yearsOfExcellence: "16",
  facebookUrl: "https://facebook.com/blessedchildschool",
  instagramUrl: "https://instagram.com/blessedchildschool",
  youtubeUrl: "https://youtube.com/@blessedchildschool",
  whatsappNumber: "+233 24 456 7890",
  twitterUrl: "https://twitter.com/blessedchildsch",
  smsGateway: "Hubtel",
  smsSenderId: "BLESSED-SCH"
};

export const initialUsers: User[] = [
  {
    id: "usr-admin-1",
    name: "Super Administrator",
    email: "admin@blessedchildschool.edu.gh",
    role: "SUPER_ADMIN",
    username: "BLESSED",
    password: "2026",
    phone: "+233 24 456 7890",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
    createdAt: "2023-01-10"
  },
  {
    id: "usr-head-1",
    name: "Headmaster Office",
    email: "headteacher@blessedchildschool.edu.gh",
    role: "HEADTEACHER",
    username: "headteacher",
    password: "headteacher123",
    phone: "+233 20 889 1234",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
    createdAt: "2023-01-15"
  },
  {
    id: "usr-acc-1",
    name: "Accounts Office",
    email: "accountant@blessedchildschool.edu.gh",
    role: "ACCOUNTANT",
    username: "accountant",
    password: "accountant123",
    phone: "+233 24 555 9876",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80",
    createdAt: "2023-02-15"
  },
  {
    id: "usr-adm-1",
    name: "Admissions Officer",
    email: "admissions@blessedchildschool.edu.gh",
    role: "ADMISSIONS_OFFICER",
    username: "admissions",
    password: "admissions123",
    phone: "+233 50 777 6655",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80",
    createdAt: "2023-03-01"
  },
  {
    id: "usr-lib-1",
    name: "School Librarian",
    email: "librarian@blessedchildschool.edu.gh",
    role: "LIBRARIAN",
    username: "librarian",
    password: "librarian123",
    phone: "+233 20 666 4321",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80",
    createdAt: "2023-04-10"
  }
];

export const initialClasses: SchoolClass[] = [
  { id: "cls-creche", name: "Creche (Daycare)", code: "CRE", level: "Creche", capacity: 25, section: "Gold", termTuitionFee: 950 },
  { id: "cls-nur1", name: "Nursery 1", code: "NUR1", level: "Nursery", capacity: 30, section: "Blue", termTuitionFee: 1050 },
  { id: "cls-nur2", name: "Nursery 2", code: "NUR2", level: "Nursery", capacity: 30, section: "Green", termTuitionFee: 1050 },
  { id: "cls-kg1", name: "Kindergarten 1", code: "KG1", level: "Kindergarten", capacity: 32, section: "Gold", termTuitionFee: 1150 },
  { id: "cls-kg2", name: "Kindergarten 2", code: "KG2", level: "Kindergarten", capacity: 32, section: "Diamond", termTuitionFee: 1150 },
  { id: "cls-b1", name: "Basic 1 (Primary 1)", code: "B1", level: "Primary", capacity: 35, section: "A", termTuitionFee: 1250 },
  { id: "cls-b2", name: "Basic 2 (Primary 2)", code: "B2", level: "Primary", capacity: 35, section: "A", termTuitionFee: 1250 },
  { id: "cls-b3", name: "Basic 3 (Primary 3)", code: "B3", level: "Primary", capacity: 35, section: "A", termTuitionFee: 1250 },
  { id: "cls-b4", name: "Basic 4 (Primary 4)", code: "B4", level: "Primary", capacity: 35, section: "A", termTuitionFee: 1300 },
  { id: "cls-b5", name: "Basic 5 (Primary 5)", code: "B5", level: "Primary", capacity: 35, section: "A", roomNumber: "Room 12", termTuitionFee: 1300 },
  { id: "cls-b6", name: "Basic 6 (Primary 6)", code: "B6", level: "Primary", capacity: 35, section: "A", termTuitionFee: 1350 },
  { id: "cls-jhs1", name: "JHS 1 (Basic 7)", code: "JHS1", level: "JHS", capacity: 40, section: "A", termTuitionFee: 1450 },
  { id: "cls-jhs2", name: "JHS 2 (Basic 8)", code: "JHS2", level: "JHS", capacity: 40, section: "A", roomNumber: "Science Wing 3", termTuitionFee: 1550 },
  { id: "cls-jhs3", name: "JHS 3 (Basic 9 - BECE)", code: "JHS3", level: "JHS", capacity: 40, section: "A", roomNumber: "BECE Hall", termTuitionFee: 1650 }
];

export const initialSubjects: Subject[] = [
  { id: "sub-eng", name: "English Language", code: "ENG", department: "Languages", applicableLevels: ["Primary", "JHS"] },
  { id: "sub-math", name: "Mathematics", code: "MATH", department: "Sciences", applicableLevels: ["Primary", "JHS"] },
  { id: "sub-sci", name: "Integrated Science", code: "SCI", department: "Sciences", applicableLevels: ["Primary", "JHS"] },
  { id: "sub-soc", name: "Social Studies", code: "SOC", department: "Humanities", applicableLevels: ["Primary", "JHS"] },
  { id: "sub-ict", name: "ICT & Computing", code: "ICT", department: "Creative Arts & Tech", applicableLevels: ["Primary", "JHS"] },
  { id: "sub-rme", name: "Religious and Moral Education (RME)", code: "RME", department: "Humanities", applicableLevels: ["Primary", "JHS"] },
  { id: "sub-fan", name: "Ghanaian Language (Fante)", code: "FAN", department: "Languages", applicableLevels: ["Primary", "JHS"] },
  { id: "sub-fre", name: "French", code: "FRE", department: "Languages", applicableLevels: ["Primary", "JHS"] },
  { id: "sub-cad", name: "Creative Arts & Design", code: "CAD", department: "Creative Arts & Tech", applicableLevels: ["Primary", "JHS"] },
  { id: "sub-bdt", name: "Career Technology (BDT)", code: "BDT", department: "Creative Arts & Tech", applicableLevels: ["JHS"] },
  { id: "sub-lit", name: "Numeracy & Literacy", code: "NUM-LIT", department: "Early Childhood", applicableLevels: ["Creche", "Nursery", "Kindergarten"] },
  { id: "sub-owop", name: "Our World and Our People (OWOP)", code: "OWOP", department: "Early Childhood", applicableLevels: ["Kindergarten", "Primary"] }
];

// Cleaned: No student names or teacher names hardcoded
export const initialTeachers: Teacher[] = [];
export const initialParents: Parent[] = [];
export const initialStudents: Student[] = [];
export const initialAssessmentScores: AssessmentScore[] = [];

export const initialFeeItems: FeeItem[] = [
  { id: "fee-tui", name: "Term Tuition & Instruction Fee", amount: 1450, applicableClassIds: [], frequency: "Per Term" },
  { id: "fee-ict", name: "ICT & Computer Laboratory Levy", amount: 150, applicableClassIds: [], frequency: "Per Term" },
  { id: "fee-pta", name: "PTA Development Levy", amount: 100, applicableClassIds: [], frequency: "Per Term" },
  { id: "fee-feed", name: "Hot Nutritious School Lunch (Optional)", amount: 650, applicableClassIds: [], frequency: "Per Term" },
  { id: "fee-bus", name: "Air-Conditioned Bus Transport (Anaji/Takoradi)", amount: 800, applicableClassIds: [], frequency: "Per Term" },
  { id: "fee-uni", name: "School Uniform & Sportswear Set", amount: 350, applicableClassIds: [], frequency: "One-Time" }
];

export const initialFeePayments: FeePayment[] = [];

export const initialExpenses: ExpenseRecord[] = [
  {
    id: "exp-1",
    title: "ECG Electricity Bill - Campus & ICT Lab",
    category: "Utilities",
    amount: 3200,
    date: "2025-02-05",
    recordedBy: "Accounts Office",
    status: "Approved"
  },
  {
    id: "exp-2",
    title: "Purchase of Science Laboratory Reagents & Microscopes",
    category: "Instructional Materials",
    amount: 5400,
    date: "2025-01-28",
    recordedBy: "Science Department",
    status: "Approved"
  },
  {
    id: "exp-3",
    title: "School Bus Diesel & Monthly Service (Fleet of 3 buses)",
    category: "Transportation & Fuel",
    amount: 4800,
    date: "2025-02-10",
    recordedBy: "Transport Department",
    status: "Approved"
  }
];

export const initialAdmissions: AdmissionApplication[] = [
  {
    id: "adm-1",
    applicationNo: "BCS-ADM-2025-001",
    applicantFirstName: "Kwabena",
    applicantLastName: "Darko",
    gender: "Male",
    dob: "2017-03-12",
    applyingForClass: "cls-b2",
    previousSchool: "St. John's Preparatory, Sekondi",
    parentName: "Mr. Kofi Darko",
    parentPhone: "+233 24 555 4321",
    parentEmail: "kofi.darko@gmail.com",
    homeAddress: "Anaji Queen of Peace, Takoradi",
    status: "Interview Scheduled",
    submissionDate: "2025-02-15",
    interviewDate: "2025-03-05",
    notes: "Transfer student; parents relocated to Anaji."
  },
  {
    id: "adm-2",
    applicationNo: "BCS-ADM-2025-002",
    applicantFirstName: "Nana Ama",
    applicantLastName: "Bonsu",
    gender: "Female",
    dob: "2020-05-20",
    applyingForClass: "cls-nur2",
    parentName: "Mrs. Vivian Bonsu",
    parentPhone: "+233 50 888 9900",
    parentEmail: "vbonsu@outlook.com",
    homeAddress: "Mpatado New Site, near Apostolic Church",
    status: "Submitted",
    submissionDate: "2025-02-22",
    notes: "First child entering kindergarten stage."
  }
];

export const initialQuizzes: OnlineQuiz[] = [
  {
    id: "qz-1",
    title: "JHS 2 Integrated Science: Photosynthesis & Plant Physiology",
    subjectId: "sub-sci",
    classId: "cls-jhs2",
    durationMinutes: 20,
    totalMarks: 20,
    instructions: "Read every question thoroughly. Answer all 5 multiple choice and true/false questions. Submit before time runs out.",
    startDate: "2025-02-01",
    endDate: "2025-03-31",
    status: "Active",
    questions: [
      {
        id: "q-1",
        questionText: "What is the green pigment in plant leaves responsible for absorbing sunlight for photosynthesis?",
        type: "MCQ",
        options: ["Chlorophyll", "Hemoglobin", "Carotene", "Anthocyanin"],
        correctAnswer: "Chlorophyll",
        points: 4,
        explanation: "Chlorophyll captures light energy to drive the chemical synthesis of glucose."
      },
      {
        id: "q-2",
        questionText: "Which gas is released by green plants during the daylight process of photosynthesis?",
        type: "MCQ",
        options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
        correctAnswer: "Oxygen",
        points: 4,
        explanation: "Oxygen is released as a byproduct when water molecules are split in photolysis."
      },
      {
        id: "q-3",
        questionText: "The microscopic pores found mainly on the underside of plant leaves for gaseous exchange are called:",
        type: "MCQ",
        options: ["Stomata", "Chloroplasts", "Xylem vessels", "Phloem tubes"],
        correctAnswer: "Stomata",
        points: 4,
        explanation: "Stomata, regulated by guard cells, allow carbon dioxide uptake and transpiration."
      },
      {
        id: "q-4",
        questionText: "True or False: Plants carry out respiration only during the night and never during the day.",
        type: "TrueFalse",
        options: ["True", "False"],
        correctAnswer: "False",
        points: 4,
        explanation: "Plants respire continuously (24 hours a day) to maintain cellular vitality."
      },
      {
        id: "q-5",
        questionText: "What chemical substance is typically used in the laboratory to test for the presence of starch in a leaf?",
        type: "MCQ",
        options: ["Iodine Solution", "Benedict's Solution", "Biuret Reagent", "Litmus Paper"],
        correctAnswer: "Iodine Solution",
        points: 4,
        explanation: "Iodine turns blue-black in the presence of starch."
      }
    ]
  }
];

export const initialHomework: HomeworkAssignment[] = [
  {
    id: "hw-1",
    title: "ICT Python Coding: Variables, Input & Print Statements",
    subjectId: "sub-ict",
    classId: "cls-jhs2",
    assignedDate: "2025-02-20",
    dueDate: "2025-02-28",
    instructions: "Write a short Python script that takes a user's name and age, and calculates the year they will turn 100. Submit your code script or type it in the submission box.",
    totalMarks: 20,
    teacherId: "tch-admin"
  }
];

export const initialHomeworkSubmissions: HomeworkSubmission[] = [];

export const initialLearningMaterials: LearningMaterial[] = [
  {
    id: "lm-1",
    title: "BECE Integrated Science Comprehensive Revision Guide (NaCCA)",
    subjectId: "sub-sci",
    classId: "cls-jhs2",
    category: "Past Questions & Answers",
    description: "Complete compilation of WAEC BECE past questions from 2018-2024 with detailed mark schemes.",
    fileUrl: "/docs/bece-science-2024.pdf",
    fileName: "BECE_Science_Revision_2024.pdf",
    uploadedBy: "Science Department",
    dateUploaded: "2025-01-12"
  },
  {
    id: "lm-2",
    title: "Introduction to Computer Networking & Cyber Hygiene",
    subjectId: "sub-ict",
    classId: "cls-jhs2",
    category: "Lesson Notes",
    description: "Slides and lecture notes on LAN, WAN, IP addresses and safe password practices.",
    fileUrl: "/docs/ict-networking.pdf",
    fileName: "ICT_JHS2_Networking_Notes.pdf",
    uploadedBy: "ICT Department",
    dateUploaded: "2025-01-20"
  }
];

export const initialLibraryBooks: LibraryBook[] = [
  { id: "bk-1", title: "Cockcrow: Approved Literature for JHS", author: "WAEC / NaCCA Selection", isbn: "978-9988-1-2940-1", category: "Textbook", totalCopies: 45, availableCopies: 45, shelfLocation: "Section B - Literature" },
  { id: "bk-2", title: "Aki-Ola Integrated Science for JHS", author: "Peter Asiedu", isbn: "978-9988-8234-1-2", category: "Science & Math", totalCopies: 60, availableCopies: 60, shelfLocation: "Section C - Sciences" },
  { id: "bk-3", title: "Aki-Ola Core Mathematics for JHS", author: "Peter Asiedu", isbn: "978-9988-8234-3-6", category: "Science & Math", totalCopies: 55, availableCopies: 55, shelfLocation: "Section C - Mathematics" }
];

export const initialInventory: InventoryItem[] = [
  { id: "inv-1", assetTag: "BCS-ICT-DESK-01", name: "HP Core i5 Desktop Computer (16GB RAM, SSD)", category: "ICT & Computers", location: "Computer Lab 1", condition: "Good", quantity: 35, purchaseDate: "2023-08-10", assignedTo: "ICT Department" },
  { id: "inv-2", assetTag: "BCS-SCI-MIC-01", name: "Binocular Optical Microscopes (40x-1000x)", category: "Science Equipment", location: "Science Laboratory", condition: "Brand New", quantity: 20, purchaseDate: "2024-01-15", assignedTo: "Science Dept" },
  { id: "inv-3", assetTag: "BCS-VEH-BUS-01", name: "Toyota Coaster School Bus (32 Seater, AC)", category: "Vehicles & Transport", location: "Main Parking Garage", condition: "Good", quantity: 1, purchaseDate: "2022-04-10", assignedTo: "Transport Dept" }
];

export const initialAnnouncements: SchoolAnnouncement[] = [
  {
    id: "anc-1",
    title: "Mid-Term General Parent-Teacher Association (PTA) Meeting",
    content: "Notice is hereby given to all esteemed parents and guardians of Blessed Child School Complex that the Term 2 PTA General Assembly will take place on Saturday, 15th March 2025 at 9:00 AM prompt in the School Main Auditorium.",
    targetAudience: "All",
    category: "PTA",
    datePosted: "2025-02-18",
    authorName: "Headmaster's Office",
    isPinned: true
  },
  {
    id: "anc-2",
    title: "100% Distinction Recorded in 2024 BECE Results!",
    content: "The Academic Board is delighted to announce that all candidates presented for the 2024 Basic Education Certificate Examination (BECE) scored Single-Digit Aggregate scores and have secured placements in Ghana's top-tier Senior High Schools.",
    targetAudience: "All",
    category: "Academic",
    datePosted: "2025-01-10",
    authorName: "Academic Board",
    isPinned: true
  }
];

export const initialMessages: InternalMessage[] = [];

export const initialAuditLogs: AuditLog[] = [
  {
    id: "aud-1",
    timestamp: "2025-02-24 11:32:00",
    userId: "usr-admin-1",
    userName: "System Administrator",
    userRole: "SUPER_ADMIN",
    module: "Assessments",
    action: "Configured NaCCA 9-Point Grading Boundaries and Academic Matrix",
    recordAffected: "Assessment Config",
    status: "Success"
  }
];

export const initialTimetable: TimetableSlot[] = [];

export const initialPrefects: SchoolPrefect[] = [
  {
    id: "prf-1",
    fullName: "Emmanuel K. Mensah",
    gender: "Male",
    role: "Senior Boy Prefect (Head Boy)",
    className: "JHS 3",
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    academicYear: "2024/2025",
    quote: "True leadership is service, discipline, and inspiring your peers to reach their highest God-given potential.",
    badgeNumber: "PRF-01"
  },
  {
    id: "prf-2",
    fullName: "Serwaa Akoto Boateng",
    gender: "Female",
    role: "Senior Girl Prefect (Head Girl)",
    className: "JHS 3",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    academicYear: "2024/2025",
    quote: "With integrity, moral excellence, and determination, no mountain is too steep to climb.",
    badgeNumber: "PRF-02"
  },
  {
    id: "prf-3",
    fullName: "Prince Yaw Donkor",
    gender: "Male",
    role: "Assistant Senior Boy Prefect",
    className: "JHS 2",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    academicYear: "2024/2025",
    quote: "Support, respect, and mutual brotherhood ensure our school remains peaceful and distinguished.",
    badgeNumber: "PRF-03"
  },
  {
    id: "prf-4",
    fullName: "Blessing Naa Armah",
    gender: "Female",
    role: "Assistant Senior Girl Prefect",
    className: "JHS 2",
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    academicYear: "2024/2025",
    quote: "Upholding high academic standards and gentle sisterly care for our younger pupils.",
    badgeNumber: "PRF-04"
  },
  {
    id: "prf-5",
    fullName: "Samuel Kobina Arthur",
    gender: "Male",
    role: "Compound & Environmental Health Prefect",
    className: "JHS 3",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    academicYear: "2024/2025",
    quote: "Cleanliness is next to godliness. A clean campus nurtures a clean and brilliant mind.",
    badgeNumber: "PRF-05"
  },
  {
    id: "prf-6",
    fullName: "Priscilla Adomako",
    gender: "Female",
    role: "Sports & Physical Education Prefect",
    className: "JHS 3",
    photoUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
    academicYear: "2024/2025",
    quote: "Building physical resilience, fair play, and sportsmanship across all athletic contests.",
    badgeNumber: "PRF-06"
  },
  {
    id: "prf-7",
    fullName: "Michael Kwesi Tsikata",
    gender: "Male",
    role: "Chapel & Protocol Prefect",
    className: "JHS 3",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    academicYear: "2024/2025",
    quote: "Reverence for God and devotion during worship build the character of true scholars.",
    badgeNumber: "PRF-07"
  },
  {
    id: "prf-8",
    fullName: "Angela Afia Osei",
    gender: "Female",
    role: "Library & Academic Protocol Prefect",
    className: "JHS 3",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    academicYear: "2024/2025",
    quote: "A reader today is a leader tomorrow. Knowledge is the key that unlocks every closed door.",
    badgeNumber: "PRF-08"
  }
];


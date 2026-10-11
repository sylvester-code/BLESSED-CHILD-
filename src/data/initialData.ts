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
  announcementTicker: "",
  showAnnouncementTicker: false,
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

// Cleaned: No student names, teacher names, or parent records hardcoded
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
export const initialExpenses: ExpenseRecord[] = [];
export const initialAdmissions: AdmissionApplication[] = [];
export const initialQuizzes: OnlineQuiz[] = [];
export const initialHomework: HomeworkAssignment[] = [];
export const initialHomeworkSubmissions: HomeworkSubmission[] = [];
export const initialLearningMaterials: LearningMaterial[] = [];
export const initialLibraryBooks: LibraryBook[] = [];
export const initialInventory: InventoryItem[] = [];
export const initialAnnouncements: SchoolAnnouncement[] = [];
export const initialMessages: InternalMessage[] = [];
export const initialAuditLogs: AuditLog[] = [];
export const initialTimetable: TimetableSlot[] = [];
export const initialPrefects: SchoolPrefect[] = [];


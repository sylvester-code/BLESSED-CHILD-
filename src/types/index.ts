export type UserRole =
  | 'SUPER_ADMIN'
  | 'SCHOOL_ADMIN'
  | 'HEADTEACHER'
  | 'TEACHER'
  | 'ACCOUNTANT'
  | 'RECEPTIONIST'
  | 'PARENT'
  | 'STUDENT'
  | 'LIBRARIAN'
  | 'STAFF'
  | 'ADMISSIONS_OFFICER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  username: string;
  password?: string;
  linkedStudentId?: string; // For student or parent
  linkedParentId?: string;
  linkedTeacherId?: string;
  createdAt: string;
}

export interface Student {
  id: string;
  admissionNo: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: 'Male' | 'Female';
  dob: string;
  classId: string;
  section: string;
  academicYear: string;
  admissionDate: string;
  photoUrl?: string;
  address: string;
  city: string; // e.g., Anaji-Mpatado, Takoradi
  parentId: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  medicalInfo?: {
    bloodGroup?: string;
    allergies?: string;
    conditions?: string;
  };
  status: 'Active' | 'Graduated' | 'Transferred' | 'Suspended' | 'Archived';
  balance: number; // in GHS
}

export interface SchoolPrefect {
  id: string;
  fullName: string;
  gender: 'Male' | 'Female';
  role: string;
  className: string;
  photoUrl: string;
  academicYear: string;
  quote?: string;
  badgeNumber?: string;
}

export interface Parent {
  id: string;
  fullName: string;
  relationship: 'Father' | 'Mother' | 'Guardian';
  phone: string;
  altPhone?: string;
  email: string;
  occupation: string;
  address: string;
  city: string;
  studentIds: string[]; // Linked wards
}

export interface Teacher {
  id: string;
  staffId: string;
  fullName: string;
  gender: 'Male' | 'Female';
  phone: string;
  email: string;
  username?: string;
  password?: string;
  qualification: string;
  specialization: string;
  classesAssigned: string[]; // class IDs
  subjectsTaught: string[]; // subject IDs
  isClassTeacherOf?: string; // class ID
  employmentDate: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  photoUrl?: string;
}

export interface SchoolClass {
  id: string;
  name: string; // e.g. "Basic 5", "JHS 2", "KG 1"
  code: string; // e.g. "B5", "JHS2"
  level: 'Creche' | 'Nursery' | 'Kindergarten' | 'Primary' | 'JHS';
  capacity: number;
  classTeacherId?: string;
  section: string; // "Gold", "Diamond", "A", "B"
  roomNumber?: string;
  termTuitionFee: number; // in GHS
}

export interface Subject {
  id: string;
  name: string; // e.g. "Mathematics", "Integrated Science", "ICT", "Fante", "French"
  code: string; // "MATH", "SCI", "ICT", "ENG", "SOC", "RME", "BDT"
  department: 'Sciences' | 'Languages' | 'Humanities' | 'Creative Arts & Tech' | 'Early Childhood';
  applicableLevels: ('Creche' | 'Nursery' | 'Kindergarten' | 'Primary' | 'JHS')[];
}

export interface AssessmentCategory {
  id: string;
  name: string; // e.g. "Classwork", "Homework & Projects", "Class Tests", "End of Term Exam"
  weight: number; // percentage (e.g., 10%, 15%, 15%, 60%)
  maxMarks: number;
}

export interface AssessmentScore {
  id: string;
  studentId: string;
  subjectId: string;
  classId: string;
  academicYear: string;
  term: 'Term 1' | 'Term 2' | 'Term 3';
  classwork: number; // out of 20
  homework: number; // out of 10
  project: number; // out of 10
  classTest: number; // out of 10
  continuousAssessmentTotal: number; // out of 50
  examScore: number; // out of 50
  totalScore: number; // out of 100
  grade: string; // e.g. "1" or "A1"
  gradeRemark: string; // "Highest Distinction", "Excellent", "Very Good"
  teacherRemark?: string;
  positionInSubject?: number;
}

export interface ReportCard {
  id: string;
  studentId: string;
  academicYear: string;
  term: 'Term 1' | 'Term 2' | 'Term 3';
  classId: string;
  totalScore: number;
  averageScore: number;
  overallPosition: number;
  totalStudentsInClass: number;
  attendanceDays: number;
  totalSchoolDays: number;
  classTeacherRemark: string;
  headmasterRemark: string;
  promotedTo?: string;
  nextTermBegins: string;
  feesOwedNextTerm: number;
  published: boolean;
}

export interface AttendanceRecord {
  id: string;
  date: string; // YYYY-MM-DD
  classId: string;
  studentId: string;
  status: 'Present' | 'Absent' | 'Late' | 'Excused';
  markedByTeacherId: string;
  remarks?: string;
}

export interface FeeItem {
  id: string;
  name: string; // e.g. "Tuition Fee", "ICT / Computer Lab Levy", "PTA Dues", "Feeding Fee", "School Bus Transport", "Uniform & Sportswear"
  amount: number;
  applicableClassIds: string[]; // empty for all
  frequency: 'Per Term' | 'Annual' | 'One-Time';
}

export interface FeePayment {
  id: string;
  receiptNumber: string;
  studentId: string;
  amountPaid: number;
  paymentDate: string;
  paymentMethod: 'Cash' | 'MTN Mobile Money' | 'Telecel Cash' | 'Bank Deposit' | 'Cheque';
  transactionReference: string;
  term: 'Term 1' | 'Term 2' | 'Term 3';
  academicYear: string;
  receivedBy: string;
  notes?: string;
}

export interface ExpenseRecord {
  id: string;
  title: string;
  category: 'Utilities' | 'Salaries' | 'Maintenance' | 'Instructional Materials' | 'Transportation & Fuel' | 'School Feeding' | 'Admin & General';
  amount: number;
  date: string;
  recordedBy: string;
  receiptUrl?: string;
  status: 'Approved' | 'Pending';
}

export interface AdmissionApplication {
  id: string;
  applicationNo: string; // e.g. "BCS-2025-0142"
  applicantFirstName: string;
  applicantLastName: string;
  gender: 'Male' | 'Female';
  dob: string;
  applyingForClass: string;
  previousSchool?: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  homeAddress: string;
  status: 'Submitted' | 'Under Review' | 'Interview Scheduled' | 'Accepted' | 'Enrolled' | 'Rejected';
  submissionDate: string;
  interviewDate?: string;
  notes?: string;
}

export interface TimetableSlot {
  id: string;
  classId: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  period: number; // 1 to 8
  startTime: string;
  endTime: string;
  subjectId: string;
  teacherId: string;
  room: string;
}

export interface OnlineQuiz {
  id: string;
  title: string;
  subjectId: string;
  classId: string;
  durationMinutes: number;
  totalMarks: number;
  instructions: string;
  questions: {
    id: string;
    questionText: string;
    type: 'MCQ' | 'TrueFalse' | 'ShortAnswer';
    options?: string[];
    correctAnswer: string;
    points: number;
    explanation?: string;
  }[];
  startDate: string;
  endDate: string;
  status: 'Draft' | 'Active' | 'Closed';
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  submittedAt: string;
  answers: { [questionId: string]: string };
  score: number;
  maxScore: number;
  percentage: number;
  feedback?: string;
}

export interface HomeworkAssignment {
  id: string;
  title: string;
  subjectId: string;
  classId: string;
  assignedDate: string;
  dueDate: string;
  instructions: string;
  totalMarks: number;
  teacherId: string;
  attachmentName?: string;
}

export interface HomeworkSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  submittedAt: string;
  content: string;
  status: 'Submitted' | 'Graded';
  score?: number;
  feedback?: string;
}

export interface LearningMaterial {
  id: string;
  title: string;
  subjectId: string;
  classId: string;
  category: 'Lesson Notes' | 'Past Questions & Answers' | 'Syllabus Guide' | 'Worksheet' | 'Video Tutorial';
  description: string;
  fileUrl: string;
  fileName: string;
  uploadedBy: string;
  dateUploaded: string;
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: 'Textbook' | 'Fiction' | 'Science & Math' | 'Reference' | 'Children & Early Readers';
  totalCopies: number;
  availableCopies: number;
  shelfLocation: string;
}

export interface BookBorrowing {
  id: string;
  bookId: string;
  studentId: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'Borrowed' | 'Returned' | 'Overdue';
  fineAmount: number;
}

export interface InventoryItem {
  id: string;
  assetTag: string;
  name: string;
  category: 'ICT & Computers' | 'Classroom Furniture' | 'Science Equipment' | 'Sports Gear' | 'Vehicles & Transport' | 'Office & Admin';
  location: string;
  condition: 'Brand New' | 'Good' | 'Needs Repair' | 'Decommissioned';
  quantity: number;
  purchaseDate: string;
  assignedTo?: string;
}

export interface SchoolAnnouncement {
  id: string;
  title: string;
  content: string;
  targetAudience: 'All' | 'Teachers' | 'Parents' | 'Students';
  category: 'Academic' | 'Holiday' | 'PTA' | 'Exam' | 'Emergency' | 'General';
  datePosted: string;
  authorName: string;
  isPinned: boolean;
}

export interface InternalMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  recipientId: string;
  recipientName: string;
  subject: string;
  message: string;
  sentAt: string;
  read: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  module: 'Assessments' | 'Students' | 'Fees' | 'Admissions' | 'Academics' | 'Users & Roles' | 'CMS' | 'Settings';
  action: string;
  recordAffected?: string;
  ipAddress?: string;
  status: 'Success' | 'Warning' | 'Failed';
}

export interface SiteSettings {
  schoolName: string;
  shortName?: string;
  schoolMotto: string;
  logoUrl?: string;
  crestUrl?: string;
  faviconUrl?: string;
  primaryColor?: string;
  accentColor?: string;
  themePreset?: 'navy-gold' | 'emerald-gold' | 'burgundy-gold' | 'sapphire-amber' | 'amethyst-gold' | 'obsidian-cyan' | 'custom';
  location: string;
  locationCity?: string;
  locationCountry?: string;
  address: string;
  city: string;
  country: string;
  primaryPhone: string;
  secondaryPhone: string;
  email: string;
  admissionsEmail: string;
  website: string;
  academicYear: string;
  currentTerm: 'Term 1' | 'Term 2' | 'Term 3';
  currencySymbol: string; // ₵
  currencyCode: string; // GHS
  gradingScale: 'NaCCA_9_POINT' | 'LETTER_GRADE_AF';
  announcementTicker: string;
  showAnnouncementTicker?: boolean;
  showAdmissionsBanner?: boolean;
  showStatsCounter?: boolean;
  showHeadmasterSection?: boolean;
  showPrefectsSection?: boolean;
  showFacultySection?: boolean;
  showTransportationSection?: boolean;
  showWhatsAppFloating?: boolean;
  tickerVariant?: 'amber' | 'navy' | 'emerald' | 'gold';
  heroTitle: string;
  heroSubtitle: string;
  welcomeMessageTitle: string;
  welcomeMessageBody: string;
  headmasterName: string;
  headmasterTitle: string;
  headmasterRoleType?: 'Headmaster' | 'Headmistress' | 'Principal';
  headmasterPhotoUrl?: string;
  headmasterMessage: string;
  beceDistinctionRate: string;
  studentCountDisplay: string;
  teacherCountDisplay: string;
  yearsOfExcellence: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  whatsappNumber?: string;
  twitterUrl?: string;
  smsGateway?: string;
  smsSenderId?: string;
}


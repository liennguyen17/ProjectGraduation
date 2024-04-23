export interface NewsType {
  id: number;
  title: string;
  description: string;
  file?: any;
  image?: any;
  content: string;
  year: number;
  subject: string;
  createAt?: string;
  updateAt?: string;
}

export interface NotificationType {
  id: number;
  user: null;
  title: string;
  description: string;
  content: string;
  file: string;
  isRead: string;
  createAt: string;
  updateAt: string;
}

export interface MasterData {
  id: number;
  type: string;
  code: string;
  name: string;
}

export interface UserType {
  id: number;
  name: string;
  username: string;
  password?: string;
  dob: string;
  address: string;
  email: string;
  phone: string;
  subject: string;
  role: string;
  userCode: string;
  className: string;
  createAt?: string;
  updateAt?: string;
}

export interface ChangeNameTopicType {
  id: number;
  newNameTopic: string;
  reason: string;
}

export interface RegisterTopicType {
  id: number;
  student: {
    id: number;
    // name: string;
    // email: string;
    // phone: string;
    // role: string;
    // userCode: string;
    // className: string;
  };
  teacher: {
    id: number;
    // name: string;
    // email: string;
    // phone: string;
    // role: string;
    // userCode: string;
    // className: null;
  };
  nameTopic: string;
  semester: string;
  // departmentManagement: string;
  nameInternshipFacility: string;
  menterInternshipFacility: string;
  phoneInstructorInternshipFacility: string;
}

export interface TopicType {
  id: number;
  student: {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    userCode: string;
    className: string;
  };
  teacher: {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    userCode: string;
    className: null;
  };
  nameTopic: string;
  status: string;
  note: string;
  departmentManagement: string;
  nameInternshipFacility: string;
  menterInternshipFacility: string;
  phoneInstructorInternshipFacility: string;
  instructor: number;
  reviewer: number;
  semester: string;
  boardMembers1: number;
  boardMembers2: number;
  boardMembers3: number;
  createAt: string;
  updateAt: string;
}

export interface TopicApproval {
  id: number;
  student: {
    id: number;
  };
  teacher: {
    id: number;
  };
  status: string;
  note: string;
}

export interface TopicEdit {
  id: number;
  studentId?: number;
  teacherId?: number;
  student: {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    userCode: string;
    className: string;
  };
  teacher: {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    userCode: string;
    className: null;
  };
  nameTopic: string;
  status: string;
  note: string;
  departmentManagement: string;
  nameInternshipFacility: string;
  menterInternshipFacility: string;
  phoneInstructorInternshipFacility: string;
  instructor: number;
  reviewer: number;
  semester: string;
  boardMembers1: number;
  boardMembers2: number;
  boardMembers3: number;
  createAt: string;
  updateAt: string;
}

export interface TopicTypeFilter {
  id: number;
  keywords: string;
  student: {
    name: string;
  };
  teacher: {
    name: string;
  };
  nameTopic: string;
  status: string;
  note: string;
  departmentManagement: string;
  semester: string;
}

export interface TopicTypeCreate {
  id: number;
  student: number;
  teacher: number;
  nameTopic: string;
  status: string;
  // note: string;
  departmentManagement: string;
  nameInternshipFacility: string;
  menterInternshipFacility: string;
  phoneInstructorInternshipFacility: string;
  semester: string;
}

export interface ProfileAccount {
  jwt?: string;
  id: number;
  name: string;
  username: string;
  phone: string;
  email: string;
  roles: Array<"ADMIN" | "MANAGER" | "TEACHER" | "STUDENT">;
}

export interface ChangeTopicType {
  id: number;
  topic: {
    id: number;
    student: {
      id: number;
      name: string;
      email: string;
      phone: string;
      role: string;
      userCode: string;
      className: string;
    };
    teacher: {
      id: number;
      name: string;
      email: string;
      phone: string;
      role: string;
      userCode: string;
      className: null;
    };
    status: string;
    semester: string;
    nameTopic: string;
    departmentManagement: string;
    nameInternshipFacility: string;
    menterInternshipFacility: string;
    phoneInstructorInternshipFacility: string;
  };
  oldNameTopic: string;
  newNameTopic: string;
  status: string;
  note: null;
  reason: string;
  createAt: string;
}

export interface TopicEditChangeName {
  id: number;
  topic: number;
  status: string;
  note: string;
}

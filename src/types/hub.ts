export type ClubCategory = 'Technical' | 'Cultural' | 'Sports' | 'Arts & Media' | 'Entrepreneurship';

export interface Club {
  id: string;
  name: string;
  category: ClubCategory;
  description: string;
  shortDescription: string;
  objectives: string[];
  activities: string[];
  facultyCoordinator: {
    name: string;
    designation: string;
    department: string;
    email: string;
  };
  studentCoordinator: {
    name: string;
    year: string;
    branch: string;
    phone: string;
    email: string;
  };
  members: number;
  logoIcon: string;
  upcomingEvents: string[]; // event IDs
  meetingSchedule: string;
  roomVenue: string;
  tags: string[];
  establishedYear: number;
}

export type EventStatus = 'Upcoming' | 'Ongoing' | 'Completed';

export interface ClubEvent {
  id: string;
  name: string;
  clubId: string;
  clubName: string;
  date: string; // YYYY-MM-DD or readable
  time: string;
  venue: string;
  description: string;
  category: string;
  status: EventStatus;
  registrationCount: number;
  maxCapacity?: number;
  speakerOrGuest?: string;
  bannerGradient: string;
}

export interface MembershipRequest {
  id: string;
  studentName: string;
  rollNumber: string;
  branch: string;
  year: string;
  email: string;
  phone: string;
  clubId: string;
  clubName: string;
  reason: string;
  submittedAt: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface EventRegistration {
  id: string;
  eventId: string;
  eventName: string;
  studentName: string;
  rollNumber: string;
  branch: string;
  year: string;
  email: string;
  phone: string;
  registeredAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  submittedAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  links?: { label: string; url: string }[];
}

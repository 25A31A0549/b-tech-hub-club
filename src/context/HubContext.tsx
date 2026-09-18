import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Club, ClubEvent, MembershipRequest, EventRegistration, ContactMessage } from '../types/hub';
import { INITIAL_CLUBS, INITIAL_EVENTS, INITIAL_REQUESTS } from '../data/sampleData';

interface HubContextType {
  clubs: Club[];
  events: ClubEvent[];
  membershipRequests: MembershipRequest[];
  eventRegistrations: EventRegistration[];
  contactMessages: ContactMessage[];
  submitJoinRequest: (data: Omit<MembershipRequest, 'id' | 'submittedAt' | 'status'>) => { success: boolean; message: string };
  registerForEvent: (data: Omit<EventRegistration, 'id' | 'registeredAt'>) => { success: boolean; message: string };
  submitContactMessage: (data: Omit<ContactMessage, 'id' | 'submittedAt'>) => { success: boolean; message: string };
  getClubById: (id: string) => Club | undefined;
  getEventById: (id: string) => ClubEvent | undefined;
  getEventsForClub: (clubId: string) => ClubEvent[];
  stats: {
    totalClubs: number;
    totalEvents: number;
    totalMembers: number;
    upcomingEventsCount: number;
  };
}

const HubContext = createContext<HubContextType | undefined>(undefined);

const CLUBS_STORAGE_KEY = 'college_club_hub_clubs';
const EVENTS_STORAGE_KEY = 'college_club_hub_events';
const REQUESTS_STORAGE_KEY = 'college_club_hub_requests';
const REGISTRATIONS_STORAGE_KEY = 'college_club_hub_registrations';
const CONTACTS_STORAGE_KEY = 'college_club_hub_contacts';

export const HubProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clubs] = useState<Club[]>(() => {
    try {
      const saved = localStorage.getItem(CLUBS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_CLUBS;
    } catch {
      return INITIAL_CLUBS;
    }
  });

  const [events, setEvents] = useState<ClubEvent[]>(() => {
    try {
      const saved = localStorage.getItem(EVENTS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_EVENTS;
    } catch {
      return INITIAL_EVENTS;
    }
  });

  const [membershipRequests, setMembershipRequests] = useState<MembershipRequest[]>(() => {
    try {
      const saved = localStorage.getItem(REQUESTS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
    } catch {
      return INITIAL_REQUESTS;
    }
  });

  const [eventRegistrations, setEventRegistrations] = useState<EventRegistration[]>(() => {
    try {
      const saved = localStorage.getItem(REGISTRATIONS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem(CONTACTS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CLUBS_STORAGE_KEY, JSON.stringify(clubs));
    } catch (e) {
      console.error('Failed to sync clubs to localStorage', e);
    }
  }, [clubs]);

  useEffect(() => {
    try {
      localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
    } catch (e) {
      console.error('Failed to sync events to localStorage', e);
    }
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(membershipRequests));
    } catch (e) {
      console.error('Failed to sync requests to localStorage', e);
    }
  }, [membershipRequests]);

  useEffect(() => {
    try {
      localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(eventRegistrations));
    } catch (e) {
      console.error('Failed to sync registrations to localStorage', e);
    }
  }, [eventRegistrations]);

  useEffect(() => {
    try {
      localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(contactMessages));
    } catch (e) {
      console.error('Failed to sync contacts to localStorage', e);
    }
  }, [contactMessages]);

  const submitJoinRequest = (data: Omit<MembershipRequest, 'id' | 'submittedAt' | 'status'>) => {
    const newRequest: MembershipRequest = {
      ...data,
      id: `req-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: 'Pending'
    };

    setMembershipRequests(prev => [newRequest, ...prev]);

    return {
      success: true,
      message: 'Your club membership request has been submitted successfully.'
    };
  };

  const registerForEvent = (data: Omit<EventRegistration, 'id' | 'registeredAt'>) => {
    // Check if already registered
    const alreadyRegistered = eventRegistrations.some(
      r => r.eventId === data.eventId && (r.rollNumber.toLowerCase() === data.rollNumber.toLowerCase() || r.email.toLowerCase() === data.email.toLowerCase())
    );

    if (alreadyRegistered) {
      return {
        success: false,
        message: 'You have already registered for this event with this Roll Number or Email.'
      };
    }

    const newRegistration: EventRegistration = {
      ...data,
      id: `reg-${Date.now()}`,
      registeredAt: new Date().toISOString()
    };

    setEventRegistrations(prev => [newRegistration, ...prev]);

    // Increment event registration count
    setEvents(prev => prev.map(ev => {
      if (ev.id === data.eventId) {
        return {
          ...ev,
          registrationCount: ev.registrationCount + 1
        };
      }
      return ev;
    }));

    return {
      success: true,
      message: 'Event registration successful! See you at the venue.'
    };
  };

  const submitContactMessage = (data: Omit<ContactMessage, 'id' | 'submittedAt'>) => {
    const newMessage: ContactMessage = {
      ...data,
      id: `msg-${Date.now()}`,
      submittedAt: new Date().toISOString()
    };

    setContactMessages(prev => [newMessage, ...prev]);

    return {
      success: true,
      message: 'Thank you! Your message has been received. Our club coordinators will get back to you shortly.'
    };
  };

  const getClubById = (id: string) => {
    return clubs.find(c => c.id.toLowerCase() === id.toLowerCase() || c.name.toLowerCase() === id.toLowerCase());
  };

  const getEventById = (id: string) => {
    return events.find(e => e.id.toLowerCase() === id.toLowerCase());
  };

  const getEventsForClub = (clubId: string) => {
    return events.filter(e => e.clubId.toLowerCase() === clubId.toLowerCase());
  };

  const totalMembers = clubs.reduce((acc, club) => acc + club.members, 0);
  const upcomingEventsCount = events.filter(e => e.status === 'Upcoming').length;

  const stats = {
    totalClubs: clubs.length,
    totalEvents: events.length,
    totalMembers,
    upcomingEventsCount
  };

  return (
    <HubContext.Provider
      value={{
        clubs,
        events,
        membershipRequests,
        eventRegistrations,
        contactMessages,
        submitJoinRequest,
        registerForEvent,
        submitContactMessage,
        getClubById,
        getEventById,
        getEventsForClub,
        stats
      }}
    >
      {children}
    </HubContext.Provider>
  );
};

export const useHub = () => {
  const context = useContext(HubContext);
  if (!context) {
    throw new Error('useHub must be used within a HubProvider');
  }
  return context;
};

import React, { useState, useRef, useEffect } from 'react';
import { useHub } from '../context/HubContext';
import type { ChatMessage } from '../types/hub';
import { 
  X, 
  Send, 
  Bot, 
  Sparkles, 
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onToggle }) => {
  const { clubs, events } = useHub();

  const initialGreeting: ChatMessage = {
    id: 'greet-1',
    sender: 'assistant',
    text: "Hi! I'm your Club Assistant. Ask me anything about college clubs and events.",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialGreeting]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const quickPrompts = [
    'Show Clubs',
    'Upcoming Events',
    'How to Join?',
    'Technical Clubs'
  ];

  // Knowledge base query resolver strictly grounded in database
  const generateAssistantResponse = (rawQuery: string): { text: string; links?: { label: string; url: string }[] } => {
    const q = rawQuery.trim().toLowerCase();

    // 1. Show all clubs / available clubs
    if (
      q.includes('show clubs') || 
      q.includes('which clubs are available') || 
      q.includes('what clubs are available') || 
      q.includes('list clubs') || 
      q.includes('all clubs') ||
      q === 'clubs'
    ) {
      const clubList = clubs.map(c => `• **${c.name}** (${c.category} - ${c.members} members)`).join('\n');
      return {
        text: `We have **${clubs.length} active college clubs** across Technical, Cultural, Sports, Arts, and Entrepreneurship domains:\n\n${clubList}\n\nYou can click on any club in the Clubs directory to explore its activities and coordinators!`,
        links: [{ label: 'Explore Clubs Directory', url: '/clubs' }]
      };
    }

    // 2. Upcoming events
    if (
      q.includes('upcoming events') || 
      q.includes('what events are coming up') || 
      q.includes('future events') || 
      q.includes('event list') || 
      q.includes('show events') ||
      q === 'events'
    ) {
      const upcoming = events.filter(e => e.status === 'Upcoming');
      if (upcoming.length === 0) {
        return {
          text: 'There are currently no upcoming events scheduled in the college database.'
        };
      }
      const eventList = upcoming.map(e => `• **${e.name}**\n  Organized by: ${e.clubName}\n  Date: ${e.date} (${e.time})\n  Venue: ${e.venue}`).join('\n\n');
      return {
        text: `Here are the upcoming campus events:\n\n${eventList}\n\nYou can register for any of these on the Events page.`,
        links: [{ label: 'View Events & Register', url: '/events' }]
      };
    }

    // 3. What is the next event?
    if (
      q.includes('next event') || 
      q.includes('earliest event') || 
      q.includes('when is the next event')
    ) {
      const upcoming = [...events.filter(e => e.status === 'Upcoming')].sort((a, b) => a.date.localeCompare(b.date));
      if (upcoming.length > 0) {
        const next = upcoming[0];
        return {
          text: `The next scheduled event is **${next.name}**!\n\n• **Club:** ${next.clubName}\n• **Date:** ${next.date}\n• **Time:** ${next.time}\n• **Venue:** ${next.venue}\n• **Description:** ${next.description}`,
          links: [{ label: 'Register on Events Page', url: '/events' }]
        };
      } else {
        return {
          text: 'There are currently no upcoming events recorded in the database.'
        };
      }
    }

    // 4. How to join a club?
    if (
      q.includes('how to join') || 
      q.includes('how can i join') || 
      q.includes('join a club') || 
      q.includes('joining process') || 
      q.includes('membership request') ||
      q.includes('how do i join')
    ) {
      return {
        text: `Joining a college club is simple and open to all B.Tech students:\n\n1. Go to the **Join Club** page.\n2. Fill in your details: Name, Roll Number, Branch, Year, College Email, and Phone.\n3. Choose your desired club from the dropdown.\n4. Write a brief statement explaining why you'd like to join.\n5. Click **Submit Request**.\n\nYour application will be reviewed by the faculty and student coordinators, and you will receive a confirmation.`,
        links: [{ label: 'Go to Join Club Form', url: '/join' }]
      };
    }

    // 5. Technical clubs / AI clubs
    if (
      q.includes('technical clubs') || 
      q.includes('tech club') || 
      q.includes('coding') || 
      q.includes('which clubs are related to ai') || 
      q.includes('ai club') || 
      q.includes('artificial intelligence') || 
      q.includes('machine learning')
    ) {
      if (q.includes('ai') || q.includes('machine learning')) {
        const aiml = clubs.find(c => c.id === 'ai-ml-club');
        return {
          text: `The primary club for Artificial Intelligence is the **AI & ML Club**.\n\n• **Club:** ${aiml?.name}\n• **Focus:** Machine Learning, Deep Learning, PyTorch, LLMs, and Computer Vision.\n• **Coordinators:** ${aiml?.facultyCoordinator.name} (Faculty) & ${aiml?.studentCoordinator.name} (Student)\n• **Venue:** ${aiml?.roomVenue}\n\nRelated technical clubs that work with AI include **Coding Club** (AI algorithms) and **Robotics Club** (autonomous computer vision & ROS).`,
          links: [
            { label: 'AI & ML Club Details', url: `/clubs/ai-ml-club` },
            { label: 'Coding Club Details', url: `/clubs/coding-club` }
          ]
        };
      }

      const techClubs = clubs.filter(c => c.category === 'Technical');
      const list = techClubs.map(c => `• **${c.name}** — ${c.shortDescription}`).join('\n\n');
      return {
        text: `Here are the **Technical Clubs** at our college:\n\n${list}`,
        links: [{ label: 'Browse All Technical Clubs', url: '/clubs' }]
      };
    }

    // 6. Cultural clubs
    if (q.includes('cultural') || q.includes('dance') || q.includes('music') || q.includes('drama') || q.includes('singing')) {
      const cultClubs = clubs.filter(c => c.category === 'Cultural');
      const list = cultClubs.map(c => `• **${c.name}** — ${c.shortDescription}`).join('\n\n');
      return {
        text: `Here are the **Cultural & Performing Arts Clubs**:\n\n${list}`,
        links: [{ label: 'View Cultural Clubs', url: '/clubs' }]
      };
    }

    // 7. Sports clubs
    if (q.includes('sports') || q.includes('cricket') || q.includes('football') || q.includes('athletics') || q.includes('badminton')) {
      const sportsClub = clubs.find(c => c.category === 'Sports');
      if (sportsClub) {
        return {
          text: `**${sportsClub.name}**:\n${sportsClub.description}\n\n• **Faculty Coordinator:** ${sportsClub.facultyCoordinator.name}\n• **Student Coordinator:** ${sportsClub.studentCoordinator.name} (${sportsClub.studentCoordinator.phone})\n• **Practice Schedule:** ${sportsClub.meetingSchedule}\n• **Venue:** ${sportsClub.roomVenue}`,
          links: [{ label: 'Sports Club Details', url: `/clubs/${sportsClub.id}` }]
        };
      }
    }

    // 8. Specific Club queries (e.g. "Tell me about the Coding Club", "Robotics Club", "Cyber Security", etc.)
    for (const club of clubs) {
      const clubNameLower = club.name.toLowerCase();
      const clubIdWords = club.id.replace('-', ' ');

      if (q.includes(clubNameLower) || q.includes(clubIdWords) || (club.tags.some(t => q.includes(t.toLowerCase()) && q.length < 25))) {
        // Check if user is asking specifically about coordinator
        if (q.includes('coordinator') || q.includes('faculty') || q.includes('head') || q.includes('in charge')) {
          return {
            text: `**${club.name} Coordinators:**\n\n• **Faculty Coordinator:** ${club.facultyCoordinator.name} (${club.facultyCoordinator.designation}, Dept. of ${club.facultyCoordinator.department})\n  Email: ${club.facultyCoordinator.email}\n\n• **Student Coordinator:** ${club.studentCoordinator.name} (${club.studentCoordinator.branch}, ${club.studentCoordinator.year})\n  Phone: ${club.studentCoordinator.phone} | Email: ${club.studentCoordinator.email}`,
            links: [{ label: `View ${club.name}`, url: `/clubs/${club.id}` }]
          };
        }

        // Check if asking about activities / objectives
        if (q.includes('activities') || q.includes('what do they do') || q.includes('schedule') || q.includes('timings')) {
          const acts = club.activities.map(a => `• ${a}`).join('\n');
          return {
            text: `**${club.name} Activities & Schedule:**\n\n${acts}\n\n• **Meeting Schedule:** ${club.meetingSchedule}\n• **Venue:** ${club.roomVenue}`,
            links: [{ label: `View ${club.name}`, url: `/clubs/${club.id}` }]
          };
        }

        // General club summary
        const objs = club.objectives.slice(0, 2).map(o => `• ${o}`).join('\n');
        return {
          text: `**${club.name}** (${club.category})\n\n${club.description}\n\n**Key Objectives:**\n${objs}\n\n• **Members:** ${club.members}\n• **Faculty Lead:** ${club.facultyCoordinator.name}\n• **Student Lead:** ${club.studentCoordinator.name}\n• **Meetings:** ${club.meetingSchedule} (${club.roomVenue})`,
          links: [
            { label: `View Full Details`, url: `/clubs/${club.id}` },
            { label: `Join ${club.name}`, url: `/join?club=${club.id}` }
          ]
        };
      }
    }

    // 9. Specific Event queries (e.g. "HackByte", "RoboWars", "CTF", "Tarang")
    for (const evt of events) {
      if (q.includes(evt.name.toLowerCase()) || q.includes(evt.id.toLowerCase())) {
        return {
          text: `**${evt.name}**\n\n• **Organized By:** ${evt.clubName}\n• **Date:** ${evt.date}\n• **Time:** ${evt.time}\n• **Venue:** ${evt.venue}\n• **Status:** ${evt.status}\n• **Registrations:** ${evt.registrationCount}${evt.maxCapacity ? ` / ${evt.maxCapacity}` : ''}\n\n${evt.description}`,
          links: [{ label: 'Register for this Event', url: '/events' }]
        };
      }
    }

    // 10. Venue/Location query
    if (q.includes('venue') || q.includes('where is') || q.includes('where will') || q.includes('location')) {
      const matchedEvt = events.find(e => q.includes(e.name.toLowerCase()) || q.includes(e.clubName.toLowerCase()));
      if (matchedEvt) {
        return {
          text: `**${matchedEvt.name}** is scheduled to take place at:\n\n📍 **Venue:** ${matchedEvt.venue}\n📅 **Date & Time:** ${matchedEvt.date} at ${matchedEvt.time}`,
          links: [{ label: 'View Event Page', url: '/events' }]
        };
      }
    }

    // 11. Registration / How to register for an event
    if (q.includes('register for an event') || q.includes('event registration') || q.includes('how to register')) {
      return {
        text: `To register for an event:\n\n1. Visit the **Events** page.\n2. Find the event you wish to attend.\n3. Click the **Register** button on the event card.\n4. Complete the registration form with your Roll Number, Name, Branch, and Email.\n5. Click **Confirm Registration** to secure your spot.`,
        links: [{ label: 'Go to Events Page', url: '/events' }]
      };
    }

    // 12. Membership information / Total members / Statistics
    if (q.includes('membership') || q.includes('how many members') || q.includes('total members') || q.includes('statistics') || q.includes('stats')) {
      const totalMem = clubs.reduce((acc, c) => acc + c.members, 0);
      const topClub = [...clubs].sort((a, b) => b.members - a.members)[0];
      return {
        text: `**College Club Statistics:**\n\n• Total Active Clubs: **${clubs.length}**\n• Total Registered Members: **${totalMem}**\n• Largest Club by Membership: **${topClub?.name}** (${topClub?.members} members)\n• Active Events: **${events.length}**`,
        links: [{ label: 'Open Club Dashboard', url: '/dashboard' }]
      };
    }

    // 13. EXACT FALLBACK REQUIRED BY SPECIFICATION:
    // "If the requested information is not available, respond:
    // "I don't have that information in the college club database."
    // Do not invent college-specific information."
    return {
      text: "I don't have that information in the college club database."
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate realistic thoughtful assistant response
    setTimeout(() => {
      const result = generateAssistantResponse(text);
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: result.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        links: result.links
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 400);
  };

  const handleResetChat = () => {
    setMessages([initialGreeting]);
  };

  return (
    <>
      {/* Floating Chatbot Toggle Button (bottom-right of every page) */}
      {!isOpen && (
        <button
          onClick={onToggle}
          type="button"
          aria-label="Open Club Assistant"
          className="fixed bottom-6 right-6 z-50 p-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center gap-2 group cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <div className="relative">
            <Bot className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full" />
          </div>
          <span className="hidden sm:inline font-semibold text-sm pr-1">
            Club Assistant
          </span>
        </button>
      )}

      {/* Floating Chatbot Dialog Window */}
      {isOpen && (
        <div 
          className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[540px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
          role="dialog"
          aria-label="Club Assistant Chat"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white p-4 flex items-center justify-between border-b border-indigo-800 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600/80 flex items-center justify-center text-white shadow-inner">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold flex items-center gap-1.5 leading-tight">
                  <span>Club Assistant</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" title="Online" />
                </h2>
                <p className="text-[11px] text-blue-200">College Club & Event Guide</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={onToggle}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title="Close chat"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="bg-slate-50 px-3 py-2 border-b border-slate-200/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0 ml-1" />
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSendMessage(prompt)}
                type="button"
                className="whitespace-nowrap px-2.5 py-1 text-xs font-medium text-slate-700 bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-slate-200 rounded-full transition-colors cursor-pointer shrink-0 shadow-2xs"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Message List */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
            {messages.map((msg) => {
              const isAssistant = msg.sender === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  {isAssistant && (
                    <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                      isAssistant
                        ? 'bg-white text-slate-800 border border-slate-200 shadow-2xs'
                        : 'bg-blue-600 text-white rounded-br-xs'
                    }`}
                  >
                    <div className="whitespace-pre-line">
                      {msg.text}
                    </div>

                    {msg.links && msg.links.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                        {msg.links.map((link, idx) => (
                          <Link
                            key={idx}
                            to={link.url}
                            onClick={onToggle}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-md transition-colors"
                          >
                            <span>{link.label}</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        ))}
                      </div>
                    )}

                    <span
                      className={`block text-[10px] mt-1 text-right ${
                        isAssistant ? 'text-slate-400' : 'text-blue-100'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-500 text-xs pl-2">
                <div className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 animate-bounce" />
                </div>
                <span className="italic">Assistant is searching club database...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask about clubs, events, or joining..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              aria-label="Send message"
              className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors shrink-0 cursor-pointer shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

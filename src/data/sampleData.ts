import type { Club, ClubEvent, MembershipRequest } from '../types/hub';

export const INITIAL_CLUBS: Club[] = [
  {
    id: 'coding-club',
    name: 'Coding Club',
    category: 'Technical',
    shortDescription: 'Empowering students to excel in competitive programming, open source, and full-stack development.',
    description: 'The Coding Club is the premier developer community on campus. We foster a culture of algorithmic problem solving, modern software engineering, hackathons, and open-source contributions. Students collaborate on impactful student projects, crack top coding competitions, and participate in peer-led mentorship bootcamps.',
    objectives: [
      'Master data structures, algorithms, and system design patterns.',
      'Organize campus-wide 24-hour hackathons and sprint code sprints.',
      'Contribute to open-source software and build production-grade web/mobile apps.',
      'Provide peer interview prep and competitive programming training for ICPC and GSoC.'
    ],
    activities: [
      'Weekly Algorithm & Data Structure showdowns (CodeWars Wednesdays)',
      'Web & App development weekend bootcamps',
      'Open-source Git & GitHub contribution sprints',
      'Annual 24-Hour National Hackathon (HackByte)'
    ],
    facultyCoordinator: {
      name: 'Dr. Ramesh Kumar',
      designation: 'Associate Professor',
      department: 'Computer Science & Engineering',
      email: 'ramesh.kumar@college.edu'
    },
    studentCoordinator: {
      name: 'Aditya Varma',
      year: '4th Year',
      branch: 'CSE',
      phone: '+91 98765 43210',
      email: 'aditya.cse@student.college.edu'
    },
    members: 142,
    logoIcon: 'Code2',
    upcomingEvents: ['evt-1', 'evt-7'],
    meetingSchedule: 'Wednesdays & Fridays, 5:00 PM - 7:00 PM',
    roomVenue: 'CS Lab 3, Turing Innovation Hub',
    tags: ['Programming', 'Algorithms', 'Hackathon', 'WebDev', 'OpenSource'],
    establishedYear: 2018
  },
  {
    id: 'robotics-club',
    name: 'Robotics Club',
    category: 'Technical',
    shortDescription: 'Designing autonomous rovers, drone swarms, and embedded hardware for national competitions.',
    description: 'The Robotics Club bridges mechanical design, embedded firmware, and intelligent sensors. Members learn to design 3D printed mechanical bodies, solder custom circuit PCBs, and program microcontrollers (ESP32, STM32, Arduino) and ROS (Robot Operating System) for robotics battles and rover challenges.',
    objectives: [
      'Design and fabricate competition-ready combat robots and line followers.',
      'Implement autonomous navigation using ROS, LiDAR, and computer vision.',
      'Train students in CAD modeling, 3D printing, and PCB manufacturing.',
      'Represent the college at national tech fests including IIT Techfest.'
    ],
    activities: [
      'Autonomous line follower and maze solver workshops',
      'Combat Robo-Wars fabrication clinics',
      'Drone piloting and quadcopter tuning sessions',
      'ROS2 & Embedded C firmware masterclasses'
    ],
    facultyCoordinator: {
      name: 'Prof. Ananya Sen',
      designation: 'Assistant Professor',
      department: 'Mechanical & Mechatronics',
      email: 'ananya.sen@college.edu'
    },
    studentCoordinator: {
      name: 'Rahul Sharma',
      year: '3rd Year',
      branch: 'ECE',
      phone: '+91 98123 45678',
      email: 'rahul.ece@student.college.edu'
    },
    members: 98,
    logoIcon: 'Bot',
    upcomingEvents: ['evt-2'],
    meetingSchedule: 'Tuesdays & Thursdays, 4:30 PM - 6:30 PM',
    roomVenue: 'Robotics & Maker Lab, Block B Room 104',
    tags: ['Robotics', 'ROS', 'Microcontrollers', 'IoT', 'Hardware', 'CAD'],
    establishedYear: 2019
  },
  {
    id: 'ai-ml-club',
    name: 'AI & ML Club',
    category: 'Technical',
    shortDescription: 'Pioneering cutting-edge Machine Learning, Deep Learning, LLMs, and Computer Vision.',
    description: 'The AI & ML Club brings together students passionate about artificial intelligence, neural networks, computer vision, natural language processing, and generative AI. We read foundational research papers, conduct hands-on Kaggle sprints, and deploy real-world ML models to production.',
    objectives: [
      'Demystify mathematics behind Machine Learning and Deep Learning architectures.',
      'Build end-to-end predictive systems, computer vision pipelines, and LLM applications.',
      'Compete in global Kaggle competitions and university hackathons.',
      'Promote ethical AI practices and research paper publication among undergraduates.'
    ],
    activities: [
      'Paper reading sessions on Transformer and Vision architectures',
      'Hands-on PyTorch and HuggingFace workshops',
      'Kaggle Grandmaster mentorship sprints',
      'GenAI Hackathon & AI Project Showcase'
    ],
    facultyCoordinator: {
      name: 'Dr. Meera Nambiar',
      designation: 'Professor & Head',
      department: 'Artificial Intelligence & Data Science',
      email: 'meera.nambiar@college.edu'
    },
    studentCoordinator: {
      name: 'Sneha Patel',
      year: '3rd Year',
      branch: 'AI & DS',
      phone: '+91 98234 56789',
      email: 'sneha.aids@student.college.edu'
    },
    members: 128,
    logoIcon: 'Brain',
    upcomingEvents: ['evt-3'],
    meetingSchedule: 'Mondays & Thursdays, 5:30 PM - 7:30 PM',
    roomVenue: 'Data Science Studio, Innovation Center',
    tags: ['AI', 'Machine Learning', 'Deep Learning', 'PyTorch', 'LLMs', 'Data Science'],
    establishedYear: 2021
  },
  {
    id: 'cyber-security-club',
    name: 'Cyber Security Club',
    category: 'Technical',
    shortDescription: 'Fostering ethical hackers, penetration testers, and cyber defense specialists.',
    description: 'The Cyber Security Club (ZeroDay Guild) trains students in defensive network hardening, ethical penetration testing, cryptography, binary exploitation, and reverse engineering. We run collegiate CTF (Capture the Flag) teams and raise campus awareness about digital privacy.',
    objectives: [
      'Train students in Linux system administration, network forensics, and web exploits.',
      'Organize weekly Capture The Flag (CTF) challenges and bug bounty simulations.',
      'Educate students on safe cyber hygiene, incident response, and zero-day mitigations.',
      'Foster collaboration with cybersecurity industry certifiers and security researchers.'
    ],
    activities: [
      'Weekly hands-on CTF solving on TryHackMe and HackTheBox',
      'Network packet inspection and Wireshark forensics labs',
      'Web vulnerability exploitation (OWASP Top 10) demos',
      'Annual Inter-College CTF Championship (DefCon Zero)'
    ],
    facultyCoordinator: {
      name: 'Prof. Suresh Nair',
      designation: 'Associate Professor',
      department: 'Information Technology',
      email: 'suresh.nair@college.edu'
    },
    studentCoordinator: {
      name: 'Karthik Rao',
      year: '4th Year',
      branch: 'IT',
      phone: '+91 98345 67890',
      email: 'karthik.it@student.college.edu'
    },
    members: 86,
    logoIcon: 'ShieldAlert',
    upcomingEvents: ['evt-4'],
    meetingSchedule: 'Wednesdays & Saturdays, 4:00 PM - 6:00 PM',
    roomVenue: 'Network Security Lab, IT Building 2nd Floor',
    tags: ['Security', 'Ethical Hacking', 'CTF', 'Cryptography', 'Penetration Testing'],
    establishedYear: 2020
  },
  {
    id: 'electronics-club',
    name: 'Electronics Club',
    category: 'Technical',
    shortDescription: 'Innovating with analog/digital circuits, IoT devices, VLSI, and semiconductor prototyping.',
    description: 'The Electronics Club is a haven for hardware builders. Members explore semiconductor physics, analog circuit design, FPGA programming with Verilog, smart home IoT systems, and high-frequency wireless communication.',
    objectives: [
      'Provide hands-on exposure to oscilloscopes, logic analyzers, and function generators.',
      'Teach circuit schematic capture and PCB layout design using KiCad.',
      'Introduce FPGA programming, Verilog HDL, and semiconductor fundamentals.',
      'Build connected IoT environmental and automation prototypes.'
    ],
    activities: [
      'Breadboarding & PCB soldering masterclasses',
      'Verilog and Digital System Design bootcamps',
      'Smart Agriculture & IoT automation showcase',
      'Hardware Hackathon (ElectroHack)'
    ],
    facultyCoordinator: {
      name: 'Dr. Arvind Joshi',
      designation: 'Associate Professor',
      department: 'Electronics & Communication Eng.',
      email: 'arvind.joshi@college.edu'
    },
    studentCoordinator: {
      name: 'Pooja Hegde',
      year: '3rd Year',
      branch: 'ECE',
      phone: '+91 98456 78901',
      email: 'pooja.ece@student.college.edu'
    },
    members: 74,
    logoIcon: 'Cpu',
    upcomingEvents: [],
    meetingSchedule: 'Tuesdays, 4:00 PM - 6:00 PM',
    roomVenue: 'Analog & VLSI Research Lab, ECE Wing',
    tags: ['Circuits', 'VLSI', 'IoT', 'KiCad', 'Verilog', 'Sensors'],
    establishedYear: 2017
  },
  {
    id: 'photography-club',
    name: 'Photography Club',
    category: 'Arts & Media',
    shortDescription: 'Capturing moments, mastering light, videography, and cinematic visual storytelling.',
    description: 'The Photography & Media Club (Aperture) brings together shutterbugs, drone cinematographers, and photo editors. We document major campus events, organize photo walks across historic spots, and teach advanced Lightroom and DaVinci Resolve editing skills.',
    objectives: [
      'Master DSLR/Mirrorless camera controls, framing, and light theory.',
      'Conduct regular nature, street, and portrait photography photowalks.',
      'Cover official college celebrations, tech fests, and cultural symposiums.',
      'Teach color grading, digital editing, and visual narrative techniques.'
    ],
    activities: [
      'Golden Hour street photography walks',
      'Studio lighting & portraiture workshops',
      'Campus fest official coverage and video recaps',
      'Annual Photography Exhibition & Gallery Showcase'
    ],
    facultyCoordinator: {
      name: 'Prof. Shalini Roy',
      designation: 'Assistant Professor',
      department: 'Humanities & Media Studies',
      email: 'shalini.roy@college.edu'
    },
    studentCoordinator: {
      name: 'Tanmay Ghosh',
      year: '3rd Year',
      branch: 'Mechanical',
      phone: '+91 98567 89012',
      email: 'tanmay.mech@student.college.edu'
    },
    members: 65,
    logoIcon: 'Camera',
    upcomingEvents: ['evt-5'],
    meetingSchedule: 'Saturdays, 3:00 PM - 5:30 PM',
    roomVenue: 'Media Arts Studio, Central Library Complex',
    tags: ['Photography', 'Videography', 'Cinematography', 'Editing', 'Creative Arts'],
    establishedYear: 2018
  },
  {
    id: 'cultural-club',
    name: 'Cultural Club',
    category: 'Cultural',
    shortDescription: 'Celebrating music, dance, theatrical arts, and vibrant cultural festivities.',
    description: 'The Cultural Club is the heartbeat of campus life. From classical orchestra and rock bands to street play (Nukkad Natak) and fusion dance, our members light up the stage at inter-collegiate cultural fests and festive celebrations.',
    objectives: [
      'Nurture student talents in vocal/instrumental music, theater, and dance.',
      'Represent the college at national youth cultural festivals.',
      'Organize the flagship annual college cultural fest (Rhythms).',
      'Foster cultural unity, team spirit, and stage confidence.'
    ],
    activities: [
      'Battle of the Bands and Acoustic Jams',
      'Contemporary, Western & Classical dance practice routines',
      'Social awareness street plays and theatrical dramas',
      'Annual 3-Day Cultural Extravaganza (Tarang)'
    ],
    facultyCoordinator: {
      name: 'Dr. Sunita Deshmukh',
      designation: 'Professor',
      department: 'Basic Sciences & Humanities',
      email: 'sunita.deshmukh@college.edu'
    },
    studentCoordinator: {
      name: 'Varun Mukherjee',
      year: '4th Year',
      branch: 'Civil Eng.',
      phone: '+91 98678 90123',
      email: 'varun.civil@student.college.edu'
    },
    members: 175,
    logoIcon: 'Music',
    upcomingEvents: ['evt-6'],
    meetingSchedule: 'Mondays, Wednesdays & Fridays, 5:30 PM - 7:30 PM',
    roomVenue: 'Open Air Amphitheatre & Auditorium Stage',
    tags: ['Dance', 'Music', 'Drama', 'Theater', 'Cultural Fest', 'Performing Arts'],
    establishedYear: 2016
  },
  {
    id: 'literary-club',
    name: 'Literary Club',
    category: 'Cultural',
    shortDescription: 'Sharpening oratory, Parliamentary debate, creative writing, and public speaking.',
    description: 'The Literary & Debating Society is the platform for eloquent debaters, wordsmiths, quizzers, and poets. We host Parliamentary Debates, Model United Nations (MUN), creative writing slams, and publish the annual college student magazine.',
    objectives: [
      'Cultivate articulate public speaking, critical reasoning, and debate skills.',
      'Publish the official college anthology and literary magazine.',
      'Organize collegiate Model United Nations (MUN) and general quiz tourneys.',
      'Provide a forum for thoughtful discourse on current affairs and literature.'
    ],
    activities: [
      'Asian Parliamentary & British Parliamentary debate sparring',
      'Poetry open mic nights and creative prose workshops',
      'General & Tech Quiz league (BrainWave)',
      'College Annual MUN Conference'
    ],
    facultyCoordinator: {
      name: 'Prof. David Wilson',
      designation: 'Assistant Professor',
      department: 'English & Communication',
      email: 'david.wilson@college.edu'
    },
    studentCoordinator: {
      name: 'Ananya Singhania',
      year: '3rd Year',
      branch: 'CSE',
      phone: '+91 98789 01234',
      email: 'ananya.s@student.college.edu'
    },
    members: 58,
    logoIcon: 'BookOpen',
    upcomingEvents: [],
    meetingSchedule: 'Thursdays, 4:30 PM - 6:30 PM',
    roomVenue: 'Seminar Hall 2, Humanities Wing',
    tags: ['Debating', 'MUN', 'Creative Writing', 'Public Speaking', 'Quizzing'],
    establishedYear: 2018
  },
  {
    id: 'sports-club',
    name: 'Sports Club',
    category: 'Sports',
    shortDescription: 'Promoting physical fitness, teamwork, athletics, and university championship glory.',
    description: 'The Sports and Athletics Club drives fitness, mental resilience, and competitive sportsmanship across the student body. We oversee collegiate cricket, football, basketball, badminton, table tennis, athletics, and chess teams.',
    objectives: [
      'Build disciplined teams for inter-university sports tournaments.',
      'Promote daily fitness, wellness, and healthy habits among engineering students.',
      'Organize the annual inter-departmental sports championship (Spardha).',
      'Provide professional coaching and maintain college sports facilities.'
    ],
    activities: [
      'Daily morning training clinics and intra-college leagues',
      'Inter-branch cricket and football super leagues',
      'Badminton, table tennis, and chess tournaments',
      'Annual Sports Day & Marathon for Health'
    ],
    facultyCoordinator: {
      name: 'Col. Rajesh Verma (Retd.)',
      designation: 'Director of Physical Education',
      department: 'Sports Division',
      email: 'sports.director@college.edu'
    },
    studentCoordinator: {
      name: 'Manoj Kumar',
      year: '4th Year',
      branch: 'EEE',
      phone: '+91 98890 12345',
      email: 'manoj.eee@student.college.edu'
    },
    members: 160,
    logoIcon: 'Trophy',
    upcomingEvents: ['evt-8'],
    meetingSchedule: 'Daily, 6:00 AM - 7:30 AM & 5:00 PM - 7:00 PM',
    roomVenue: 'University Sports Complex & Football Stadium',
    tags: ['Fitness', 'Athletics', 'Football', 'Cricket', 'Basketball', 'Tournaments'],
    establishedYear: 2015
  },
  {
    id: 'entrepreneurship-club',
    name: 'Entrepreneurship Club',
    category: 'Entrepreneurship',
    shortDescription: 'Igniting student startups, venture pitching, business models, and founder mentorship.',
    description: 'The Entrepreneurship Cell (E-Cell) is the launchpad for aspiring student founders, innovators, and venture builders. We connect technical student projects with angel investors, alumni founders, intellectual property guidance, and seed grants.',
    objectives: [
      'Guide students from ideation and MVP prototyping to business pitch decks.',
      'Host startup pitch competitions with real investor panels and seed prizes.',
      'Provide 1-on-1 mentorship with successful venture-backed alumni founders.',
      'Facilitate company incorporation, patent filing, and campus incubation.'
    ],
    activities: [
      'Founder fireside chats with alumni entrepreneurs',
      'Business Model Canvas and pitch deck bootcamps',
      'Annual Campus Startup Expo & Seed Pitch Fest',
      'Visits to tech incubators and venture capital hubs'
    ],
    facultyCoordinator: {
      name: 'Dr. Priya Radhakrishnan',
      designation: 'Professor & Dean of Innovation',
      department: 'Management & Technology',
      email: 'priya.rk@college.edu'
    },
    studentCoordinator: {
      name: 'Rohan Gupta',
      year: '4th Year',
      branch: 'CSE',
      phone: '+91 98901 23456',
      email: 'rohan.gupta@student.college.edu'
    },
    members: 92,
    logoIcon: 'Rocket',
    upcomingEvents: ['evt-9'],
    meetingSchedule: 'Fridays, 4:00 PM - 6:00 PM',
    roomVenue: 'Incubation Center, Startup Studio 3',
    tags: ['Startups', 'Venture', 'Pitching', 'Business Model', 'Innovation', 'Founders'],
    establishedYear: 2019
  }
];

export const INITIAL_EVENTS: ClubEvent[] = [
  {
    id: 'evt-1',
    name: 'HackByte 2026: 24-Hour Codefest',
    clubId: 'coding-club',
    clubName: 'Coding Club',
    date: '2026-10-12',
    time: '09:00 AM - 09:00 AM (Next Day)',
    venue: 'Turing Hall, CS Innovation Block',
    description: 'Our flagship 24-hour national hackathon. Build innovative AI, Web3, or GreenTech solutions. Win cash prizes worth ₹1,00,000, internship offers, and exclusive schwag!',
    category: 'Hackathon',
    status: 'Upcoming',
    registrationCount: 168,
    maxCapacity: 250,
    speakerOrGuest: 'Industry Judges from Google & Microsoft',
    bannerGradient: 'from-blue-600 to-indigo-800'
  },
  {
    id: 'evt-2',
    name: 'RoboWars & Autonomous Rover Arena',
    clubId: 'robotics-club',
    clubName: 'Robotics Club',
    date: '2026-10-18',
    time: '10:00 AM - 04:30 PM',
    venue: 'Open Auditorium Arena, Block B',
    description: 'Witness high-octane 15kg combat bots battle for supremacy in our reinforced steel battle ring, followed by the obstacle maze autonomous rover race.',
    category: 'Competition',
    status: 'Upcoming',
    registrationCount: 84,
    maxCapacity: 120,
    speakerOrGuest: 'Prof. Ananya Sen & Drone Systems Lab',
    bannerGradient: 'from-amber-600 to-red-700'
  },
  {
    id: 'evt-3',
    name: 'Hands-on Deep Learning & LLMs Workshop',
    clubId: 'ai-ml-club',
    clubName: 'AI & ML Club',
    date: '2026-10-25',
    time: '02:00 PM - 05:30 PM',
    venue: 'Seminar Hall 1, Tech Block',
    description: 'A beginner-to-intermediate crash course on fine-tuning Open Source Large Language Models using PyTorch and LoRA techniques. Laptops required.',
    category: 'Workshop',
    status: 'Upcoming',
    registrationCount: 95,
    maxCapacity: 100,
    speakerOrGuest: 'Sneha Patel & AI Research Group',
    bannerGradient: 'from-purple-600 to-violet-900'
  },
  {
    id: 'evt-4',
    name: 'ZeroDay Capture The Flag (CTF) Challenge',
    clubId: 'cyber-security-club',
    clubName: 'Cyber Security Club',
    date: '2026-11-02',
    time: '11:00 AM - 06:00 PM',
    venue: 'Network Security Lab, IT Building',
    description: 'Solve jeopardy-style cyber security challenges across web exploitation, cryptography, reverse engineering, and steganography. Open to solo and team participants.',
    category: 'Competition',
    status: 'Upcoming',
    registrationCount: 62,
    maxCapacity: 80,
    speakerOrGuest: 'Offensive Security Certified Mentors',
    bannerGradient: 'from-emerald-600 to-teal-900'
  },
  {
    id: 'evt-5',
    name: 'Autumn Photowalk & Golden Hour Shoot',
    clubId: 'photography-club',
    clubName: 'Photography Club',
    date: '2026-11-08',
    time: '04:00 PM - 06:30 PM',
    venue: 'Campus Botanical Garden & Lake View',
    description: 'Learn aperture priority, composition techniques, and portrait lighting outdoors with fellow photo enthusiasts. Bring your DSLR, mirrorless, or phone camera.',
    category: 'Workshop',
    status: 'Upcoming',
    registrationCount: 41,
    maxCapacity: 50,
    speakerOrGuest: 'Tanmay Ghosh & Guest Wildlife Photographer',
    bannerGradient: 'from-pink-600 to-rose-800'
  },
  {
    id: 'evt-6',
    name: 'Tarang: Annual Cultural Night & Battle of Bands',
    clubId: 'cultural-club',
    clubName: 'Cultural Club',
    date: '2026-11-15',
    time: '05:30 PM - 10:00 PM',
    venue: 'Grand University Amphitheatre',
    description: 'An evening of scintillating live rock music, synchronized choreography, beatboxing battles, and theatrical acts celebrating our college spirit.',
    category: 'Cultural',
    status: 'Upcoming',
    registrationCount: 340,
    maxCapacity: 800,
    speakerOrGuest: 'College Rock Band "Electric Pulse"',
    bannerGradient: 'from-fuchsia-600 to-indigo-900'
  },
  {
    id: 'evt-7',
    name: 'Competitive Programming Sprint #1',
    clubId: 'coding-club',
    clubName: 'Coding Club',
    date: '2026-09-05',
    time: '04:00 PM - 06:30 PM',
    venue: 'Virtual (Codeforces Arena)',
    description: 'Fast-paced algorithmic challenge tackling graph traversals, dynamic programming, and greedy algorithms. Over 120 students competed.',
    category: 'Contest',
    status: 'Completed',
    registrationCount: 122,
    maxCapacity: 200,
    bannerGradient: 'from-slate-600 to-slate-800'
  },
  {
    id: 'evt-8',
    name: 'Inter-Departmental Football Super League',
    clubId: 'sports-club',
    clubName: 'Sports Club',
    date: '2026-11-20',
    time: '08:00 AM - 05:00 PM',
    venue: 'Campus Main Football Stadium',
    description: 'Cheer for your engineering branch in the ultimate knockout football tournament. CSE, ECE, Mech, Civil, and IT battle for the Chancellor Cup trophy.',
    category: 'Sports',
    status: 'Upcoming',
    registrationCount: 190,
    maxCapacity: 300,
    speakerOrGuest: 'State Referee Board',
    bannerGradient: 'from-green-600 to-emerald-900'
  },
  {
    id: 'evt-9',
    name: 'Campus Startup Pitch Fest: Pitch Tank 2026',
    clubId: 'entrepreneurship-club',
    clubName: 'Entrepreneurship Club',
    date: '2026-11-28',
    time: '10:30 AM - 04:00 PM',
    venue: 'Innovation Auditorium, Ground Floor',
    description: 'Pitch your tech startup idea to a panel of venture capitalists and angel investors. Seed grant pool of ₹2,50,000 for the top 3 student ventures.',
    category: 'Entrepreneurship',
    status: 'Upcoming',
    registrationCount: 55,
    maxCapacity: 100,
    speakerOrGuest: 'Venture Partners from Nexus & SeedFund',
    bannerGradient: 'from-orange-600 to-amber-800'
  }
];

export const INITIAL_REQUESTS: MembershipRequest[] = [
  {
    id: 'req-1',
    studentName: 'Aarav Patel',
    rollNumber: '23BCE1042',
    branch: 'Computer Science & Eng.',
    year: '2nd Year',
    email: 'aarav.patel@student.college.edu',
    phone: '9876543211',
    clubId: 'coding-club',
    clubName: 'Coding Club',
    reason: 'I am keen to participate in competitive programming and learn full-stack web development with senior mentors.',
    submittedAt: '2026-09-14T10:30:00.000Z',
    status: 'Approved'
  },
  {
    id: 'req-2',
    studentName: 'Divya Sharma',
    rollNumber: '24BAI1018',
    branch: 'AI & Data Science',
    year: '1st Year',
    email: 'divya.sharma@student.college.edu',
    phone: '9812345679',
    clubId: 'ai-ml-club',
    clubName: 'AI & ML Club',
    reason: 'Passionate about machine learning and interested in working on computer vision research projects.',
    submittedAt: '2026-09-15T14:15:00.000Z',
    status: 'Pending'
  },
  {
    id: 'req-3',
    studentName: 'Vikram Joshi',
    rollNumber: '22BEC1089',
    branch: 'Electronics & Comm.',
    year: '3rd Year',
    email: 'vikram.joshi@student.college.edu',
    phone: '9823456781',
    clubId: 'robotics-club',
    clubName: 'Robotics Club',
    reason: 'I have experience in Arduino and KiCad circuit design and wish to build combat robots for the upcoming Techfest.',
    submittedAt: '2026-09-16T09:45:00.000Z',
    status: 'Pending'
  },
  {
    id: 'req-4',
    studentName: 'Isha Nair',
    rollNumber: '23BIT1056',
    branch: 'Information Technology',
    year: '2nd Year',
    email: 'isha.nair@student.college.edu',
    phone: '9834567892',
    clubId: 'cyber-security-club',
    clubName: 'Cyber Security Club',
    reason: 'Interested in web application penetration testing and solving CTF challenges.',
    submittedAt: '2026-09-17T11:20:00.000Z',
    status: 'Pending'
  }
];

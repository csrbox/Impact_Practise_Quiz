/**
 * OPIF IMPACT PRACTICE QUIZ - Core Master Data
 * Includes 3 Games Data:
 * 1. Trivia Quiz (5 questions)
 * 2. Build the Chain (12 Sectors, 20 Programmes with Rungs & Indicator Questions)
 * 3. CSR or not-CSR? (5 scenarios + ZCZP Deep Dive)
 */

// GAME 1: TRIVIA QUIZ (5 Questions)
const TRIVIA_QUESTIONS = [
  {
    id: "trivia-q1",
    question: "A company must spend on CSR if, in the preceding financial year, it crosses any one of three thresholds. Which set is correct as the law currently stands?",
    options: [
      "Net worth \u2265 \u20B9500 cr, OR turnover \u2265 \u20B91,000 cr, OR net profit \u2265 \u20B95 cr",
      "Net worth \u2265 \u20B9500 cr, OR turnover \u2265 \u20B91,000 cr, OR net profit \u2265 \u20B910 cr",
      "Net worth \u2265 \u20B9100 cr, OR turnover \u2265 \u20B9500 cr, OR net profit \u2265 \u20B95 cr",
      "All three must be met together"
    ],
    correctAnswer: 0,
    explanation: "Under Section 135(1) of the Companies Act 2013, CSR applies if in the preceding financial year: Net worth \u2265 \u20B9500 cr, OR Turnover \u2265 \u20B91,000 cr, OR Net profit \u2265 \u20B95 cr."
  },
  {
    id: "trivia-q2",
    question: "How much must an eligible company spend on CSR each year?",
    options: [
      "2% of the current year's net profit",
      "2% of average net profit of the 3 immediately preceding financial years",
      "2% of turnover",
      "5% of average net profit of the last 3 years"
    ],
    correctAnswer: 1,
    explanation: "Under Section 135(5), companies must spend at least 2% of the average net profits made during the three immediately preceding financial years."
  },
  {
    id: "trivia-q3",
    question: "An 'ongoing project' has unspent CSR money at the financial year-end. What must happen?",
    options: [
      "Carry it forward automatically to next year's budget, no transfer needed",
      "Return it to shareholders as dividend",
      "Transfer to a separate Unspent CSR Account within 30 days of FY-end; use within 3 years",
      "Transfer to the PM National Relief Fund immediately"
    ],
    correctAnswer: 2,
    explanation: "Under Section 135(6), unspent money relating to an ongoing project must be transferred to a special 'Unspent CSR Account' in a scheduled bank within 30 days from the end of the financial year and spent within 3 financial years."
  },
  {
    id: "trivia-q4",
    question: "When is an independent impact assessment mandatory?",
    options: [
      "Average CSR obligation \u2265 \u20B91 cr, for any completed project",
      "Average CSR obligation \u2265 \u20B910 cr (last 3 FYs), for projects \u2265 \u20B91 cr completed at least a year earlier",
      "For every CSR project, regardless of size",
      "Only when the Board voluntarily commissions one"
    ],
    correctAnswer: 1,
    explanation: "Under Rule 8(3)(a) of CSR Rules 2014, an impact assessment through an independent agency is mandatory for companies with average CSR obligation of \u2265 \u20B910 crore in the preceding 3 FYs, for projects having outlays of \u2265 \u20B91 crore and completed not less than 1 year prior."
  },
  {
    id: "trivia-q5",
    question: "Which of these sectors do you think gets the most funding in CSR in India?",
    options: [
      "Healthcare",
      "Environment and climate change",
      "Education",
      "Livelihoods"
    ],
    correctAnswer: 2,
    explanation: "Education consistently receives the highest proportion of CSR funding in India (typically capturing over 35-40% of total national CSR expenditure according to National CSR Portal data)."
  }
];

// GAME 3: CSR OR NOT-CSR? (5 Scenarios)
const CSR_CHECK_QUESTIONS = [
  {
    id: "csrcheck-q1",
    question: "A company builds a crèche for its own employees' children. CSR or Not CSR?",
    options: [
      "Yes, CSR",
      "No, Not CSR"
    ],
    correctAnswer: 1, // No, Not CSR
    explanation: "Under Rule 2(1)(d)(iv) of Companies (CSR Policy) Rules, activities that benefit only the employees of the company and their families shall NOT be considered CSR."
  },
  {
    id: "csrcheck-q2",
    question: "Contribution towards a program on improving foundational literacy and numeracy among students, through subscription to a Zero Coupon Zero Principal (ZCZP) instrument issued by an NPO on the Social Stock Exchange. CSR or Not CSR?",
    options: [
      "Yes, CSR",
      "No, Not CSR"
    ],
    correctAnswer: 0, // Yes, CSR
    explanation: "Yes, CSR! The Ministry of Corporate Affairs and SEBI confirmed that subscribing to Zero Coupon Zero Principal (ZCZP) instruments issued by eligible NPOs on the Social Stock Exchange is an eligible mode of CSR expenditure under Schedule VII."
  },
  {
    id: "csrcheck-q3",
    question: "Sponsoring a city marathon with the company's branding on all banners. CSR or Not CSR?",
    options: [
      "Yes, CSR",
      "No, Not CSR"
    ],
    correctAnswer: 1, // No, Not CSR
    explanation: "Under Rule 2(1)(d)(v), activities undertaken in pursuance of normal course of business or sponsorship activities that derive marketing/commercial benefits for the company's products/services are excluded from CSR."
  },
  {
    id: "csrcheck-q4",
    question: "A company funds flood relief in Assam through a district administration, with no NGO involved. CSR or Not CSR?",
    options: [
      "Yes, CSR",
      "No, Not CSR"
    ],
    correctAnswer: 0, // Yes, CSR
    explanation: "Yes, CSR! Disaster management, including relief, rehabilitation and reconstruction activities under Schedule VII (Item xii), can be implemented directly in coordination with state and district administration authorities."
  },
  {
    id: "csrcheck-q5",
    question: "A company transfers ₹5 Cr to its own foundation (a Section 8 company with CSR-1) on 30 March and books it as CSR spend for the year. CSR or Not CSR?",
    options: [
      "Yes, CSR",
      "No, Not CSR"
    ],
    correctAnswer: 1, // No, Not CSR
    explanation: "No, Not CSR! Mere transfer of funds from the corporate to its implementing agency or internal foundation does not constitute CSR expenditure until the funds are actually disbursed for approved project activities or transferred to an Unspent CSR Account for ongoing projects."
  }
];

// GAME 4: GUESS THE SDG (5 Official UN Sustainable Development Goals • 5 Marks)
// Goals: 17, 13, 10, 7, 6 from https://globalgoals.org/goals/
const SDG_GAME_QUESTIONS = [
  {
    id: "sdg-q1",
    goalNumber: 17,
    title: "Goal 17",
    goalName: "Partnerships for the Goals",
    color: "#19486A",
    bgGradient: "linear-gradient(135deg, #19486A 0%, #0d283c 100%)",
    svgEmblem: `<svg viewBox="0 0 120 120" width="100" height="100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="18" fill="#19486A"/>
      <circle cx="60" cy="60" r="14" fill="#FFFFFF"/>
      <circle cx="60" cy="60" r="32" stroke="#FFFFFF" stroke-width="4.5" stroke-dasharray="10 6" fill="none"/>
      <circle cx="60" cy="28" r="8" fill="#FFFFFF"/>
      <circle cx="88" cy="44" r="8" fill="#FFFFFF"/>
      <circle cx="88" cy="76" r="8" fill="#FFFFFF"/>
      <circle cx="60" cy="92" r="8" fill="#FFFFFF"/>
      <circle cx="32" cy="76" r="8" fill="#FFFFFF"/>
      <circle cx="32" cy="44" r="8" fill="#FFFFFF"/>
      <line x1="60" y1="36" x2="60" y2="46" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="60" y1="74" x2="60" y2="84" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="81" y1="48" x2="72" y2="54" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="39" y1="48" x2="48" y2="54" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round"/>
    </svg>`,
    question: "Identify this UN Sustainable Development Goal:",
    options: [
      "Partnerships for the Goals",
      "Peace, Justice and Strong Institutions",
      "Industry, Innovation and Infrastructure",
      "Decent Work and Economic Growth"
    ],
    correctAnswer: 0,
    explanation: "Spot on! Goal 17 represents Partnerships for the Goals — strengthening the means of implementation and revitalizing global multi-stakeholder partnerships between governments, corporates, and civil society."
  },
  {
    id: "sdg-q2",
    goalNumber: 13,
    title: "Goal 13",
    goalName: "Climate Action",
    color: "#3F7E44",
    bgGradient: "linear-gradient(135deg, #3F7E44 0%, #2A5A2E 100%)",
    svgEmblem: `<svg viewBox="0 0 120 120" width="100" height="100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="18" fill="#3F7E44"/>
      <path d="M20 60C32 40 88 40 100 60C88 80 32 80 20 60Z" stroke="#FFFFFF" stroke-width="6.5" fill="none" stroke-linejoin="round"/>
      <circle cx="60" cy="60" r="17" fill="#FFFFFF"/>
      <ellipse cx="60" cy="60" rx="8.5" ry="17" stroke="#3F7E44" stroke-width="3.2" fill="none"/>
      <line x1="43" y1="60" x2="77" y2="60" stroke="#3F7E44" stroke-width="3.2"/>
    </svg>`,
    question: "Identify this UN Sustainable Development Goal:",
    options: [
      "Life on Land",
      "Sustainable Cities and Communities",
      "Affordable and Clean Energy",
      "Climate Action"
    ],
    correctAnswer: 3,
    explanation: "Spot on! Goal 13 represents Climate Action — urging urgent collective intervention to cut greenhouse gas emissions, build climate resilience, and integrate climate measures into policies."
  },
  {
    id: "sdg-q3",
    goalNumber: 10,
    title: "Goal 10",
    goalName: "Reduced Inequalities",
    color: "#DD1367",
    bgGradient: "linear-gradient(135deg, #DD1367 0%, #A50D4C 100%)",
    svgEmblem: `<svg viewBox="0 0 120 120" width="100" height="100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="18" fill="#DD1367"/>
      <circle cx="60" cy="60" r="36" stroke="#FFFFFF" stroke-width="6" fill="none"/>
      <rect x="36" y="48" width="48" height="8" rx="3" fill="#FFFFFF"/>
      <rect x="36" y="64" width="48" height="8" rx="3" fill="#FFFFFF"/>
      <path d="M26 60L16 60M16 60L21 54M16 60L21 66" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M94 60L104 60M104 60L99 54M104 60L99 66" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    question: "Identify this UN Sustainable Development Goal:",
    options: [
      "Reduced Inequalities",
      "Gender Equality",
      "No Poverty",
      "Zero Hunger"
    ],
    correctAnswer: 0,
    explanation: "Spot on! Goal 10 represents Reduced Inequalities — striving to reduce income disparities, empower marginalized communities, and promote social, economic, and political inclusion for all."
  },
  {
    id: "sdg-q4",
    goalNumber: 7,
    title: "Goal 7",
    goalName: "Affordable and Clean Energy",
    color: "#FCC30B",
    bgGradient: "linear-gradient(135deg, #FCC30B 0%, #D49C00 100%)",
    svgEmblem: `<svg viewBox="0 0 120 120" width="100" height="100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="18" fill="#FCC30B"/>
      <circle cx="60" cy="60" r="18" fill="#FFFFFF"/>
      <path d="M60 22V36M60 84V98M22 60H36M84 60H98M33 33L43 43M77 77L87 87M33 87L43 77M77 43L87 33" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/>
      <path d="M57 52L52 62H62L58 70L68 59H59L62 52H57Z" fill="#FCC30B"/>
    </svg>`,
    question: "Identify this UN Sustainable Development Goal:",
    options: [
      "Responsible Consumption and Production",
      "Affordable and Clean Energy",
      "Industry, Innovation and Infrastructure",
      "Good Health and Well-being"
    ],
    correctAnswer: 1,
    explanation: "Spot on! Goal 7 represents Affordable and Clean Energy — ensuring universal access to affordable, reliable, sustainable and modern energy services, accelerating renewable energy adoption."
  },
  {
    id: "sdg-q5",
    goalNumber: 6,
    title: "Goal 6",
    goalName: "Clean Water and Sanitation",
    color: "#26BDE2",
    bgGradient: "linear-gradient(135deg, #26BDE2 0%, #009BBF 100%)",
    svgEmblem: `<svg viewBox="0 0 120 120" width="100" height="100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="18" fill="#26BDE2"/>
      <path d="M34 32L43 94C43.5 97 46 99 49 99H71C74 99 76.5 97 77 94L86 32H34Z" stroke="#FFFFFF" stroke-width="6.5" stroke-linejoin="round" fill="none"/>
      <path d="M60 42C60 42 47 59 47 70C47 77.2 52.8 83 60 83C67.2 83 73 77.2 73 70C73 59 60 42 60 42Z" fill="#FFFFFF"/>
    </svg>`,
    question: "Identify this UN Sustainable Development Goal:",
    options: [
      "Life Below Water",
      "Clean Water and Sanitation",
      "Quality Education",
      "Sustainable Cities and Communities"
    ],
    correctAnswer: 1,
    explanation: "Spot on! Goal 6 represents Clean Water and Sanitation — dedicated to achieving universal access to safe, affordable drinking water and adequate sanitation, protecting freshwater ecosystems."
  }
];

// ZCZP Educational Deep Dive Content
const ZCZP_INFO = {
  title: "Zero Coupon Zero Principal (ZCZP) Instruments",
  subtitle: "The Future of Transparent & Regulated Social Finance on the Social Stock Exchange (SSE)",
  sections: [
    {
      heading: "What are ZCZPs?",
      body: "Zero Coupon Zero Principal (ZCZP) instruments are specialized financial instruments listed on the Social Stock Exchange (SSE) under SEBI regulations. Unlike traditional bonds, they carry no interest (zero coupon) and no repayment of capital (zero principal). They function as formal, audited donation instruments for Non-Profit Organizations (NPOs)."
    },
    {
      heading: "Why CSR Donors & Corporates Use ZCZPs",
      body: "When corporates subscribe to ZCZPs using CSR funds, they gain unparalleled governance advantages: standard exchange disclosure, mandatory social audits, third-party impact assessment, and verifiable tracking of fund utilization toward measurable outcomes."
    },
    {
      heading: "Regulatory Compliance",
      body: "MCA has officially clarified that subscription to ZCZP instruments issued by eligible registered NPOs qualifies as valid CSR expenditure under Section 135 of the Companies Act, 2013 and Schedule VII."
    },
    {
      heading: "The Impact Practice Advantage",
      body: "At Impact Practice, we guide CSR foundations and non-profits in structuring theories of change, robust monitoring frameworks, and SSE listing readiness to unlock institutional capital."
    }
  ]
};

const SECTOR_ICONS = {
  "edu": "M3 9l9-5 9 5-9 5-9-5zm0 0v6m6 2v-5m6 5v-5",
  "health": "M12 21s-7-4.5-7-9a4 4 0 017-2.6A4 4 0 0119 12c0 4.5-7 9-7 9z",
  "agri": "M12 3v18M12 8c0-2 2-4 5-4 0 3-2 5-5 5zm0 3c0-2-2-4-5-4 0 3 2 5 5 5z",
  "skill": "M4 7h16M4 7l8-4 8 4M6 7v8a6 6 0 0012 0V7",
  "gender": "M12 3a4 4 0 100 8 4 4 0 000-8zm0 8v10m-3-3h6",
  "wash": "M12 3c3 4 6 7 6 11a6 6 0 01-12 0c0-4 3-7 6-11z",
  "env": "M5 21c0-7 5-13 14-14-1 9-7 14-14 14zm0 0c0-4 2-7 5-9",
  "finance": "M3 10h18M6 14h4M3 6h18v12H3z",
  "nutrition": "M12 3c4 0 7 3 7 8s-3 10-7 10-7-5-7-10 3-8 7-8zm0 0V1",
  "water": "M12 3c3 4 6 7 6 11a6 6 0 01-12 0c0-4 3-7 6-11z",
  "digital": "M4 5h16v11H4zM2 20h20M9 20v-4M15 20v-4",
  "rural": "M3 21V10l9-6 9 6v11M9 21v-6h6v6"
};

const SECTORS = [
  {
    "id": "education",
    "name": "Education",
    "icon": "edu",
    "count": 3
  },
  {
    "id": "health",
    "name": "Health",
    "icon": "health",
    "count": 3
  },
  {
    "id": "agri",
    "name": "Agriculture & Livelihoods",
    "icon": "agri",
    "count": 3
  },
  {
    "id": "skilling",
    "name": "Skilling & Employability",
    "icon": "skill",
    "count": 3
  },
  {
    "id": "gender",
    "name": "Gender & Women's Empowerment",
    "icon": "gender",
    "count": 1
  },
  {
    "id": "wash",
    "name": "WASH",
    "icon": "wash",
    "count": 1
  },
  {
    "id": "environment",
    "name": "Environment & Climate",
    "icon": "env",
    "count": 1
  },
  {
    "id": "finance",
    "name": "Financial Inclusion",
    "icon": "finance",
    "count": 1
  },
  {
    "id": "nutrition",
    "name": "Nutrition",
    "icon": "nutrition",
    "count": 1
  },
  {
    "id": "water",
    "name": "Water Resources",
    "icon": "water",
    "count": 1
  },
  {
    "id": "digital",
    "name": "Digital & Technology",
    "icon": "digital",
    "count": 1
  },
  {
    "id": "rural",
    "name": "Rural Development",
    "icon": "rural",
    "count": 1
  }
];

const PROGRAMMES = [
  {
    "id": "edu-foundational",
    "sector": "education",
    "name": "Foundational Literacy & Numeracy mission",
    "blurb": "Getting every Grade 3 child reading and doing basic math at grade level.",
    "stakeholders": [
      {
        "role": "Funder",
        "who": "Corporate CSR foundation"
      },
      {
        "role": "Implementing NGO",
        "who": "Education nonprofit"
      },
      {
        "role": "Government",
        "who": "State education department"
      },
      {
        "role": "Community",
        "who": "School Management Committees"
      }
    ],
    "chain": {
      "dowe": "Train teachers and run daily reading time",
      "output": "Teachers trained and reading hours running",
      "outcome": "More Grade 3 children read at grade level",
      "impact": "A cohort moves ahead without the early learning gap"
    },
    "indicators": [
      {
        "outcome": "More Grade 3 children read at grade level",
        "good": "Share of Grade 3 students reading at grade level, vs baseline",
        "vanity": "Number of readers handed out",
        "unmeas": "Whether children enjoy reading more",
        "why": {
          "good": "A reading benchmark against a baseline - the outcome itself, defensible to a funder.",
          "vanity": "A handout count. Books on shelves aren't reading ability.",
          "unmeas": "Worthy but unmeasurable as stated - no benchmark."
        }
      }
    ]
  },
  {
    "id": "edu-girls-retention",
    "sector": "education",
    "name": "Girls' secondary-school retention",
    "blurb": "Keeping adolescent girls in school through Classes 9-12.",
    "stakeholders": [
      {
        "role": "Funder",
        "who": "Corporate CSR"
      },
      {
        "role": "Implementing NGO",
        "who": "Girls' education nonprofit"
      },
      {
        "role": "Government",
        "who": "District education office"
      },
      {
        "role": "Community",
        "who": "Parents' groups, panchayat"
      }
    ],
    "chain": {
      "dowe": "Give bicycles and run after-school mentoring",
      "output": "Girls received bicycles; mentors deployed",
      "outcome": "Attendance rises and dropout falls",
      "impact": "A cohort finishes Class 12 and marriage is delayed"
    },
    "indicators": [
      {
        "outcome": "Attendance rises and dropout falls",
        "good": "Attendance rate and dropout rate, vs baseline",
        "vanity": "Number of bicycles given out",
        "unmeas": "Whether girls feel more motivated",
        "why": {
          "good": "Measurable, baseline-anchored, directly the outcome.",
          "vanity": "A handout count - proves the programme ran, not that attendance moved.",
          "unmeas": "No unit, no baseline - can't stand as the headline."
        }
      }
    ]
  },
  {
    "id": "edu-digital-classroom",
    "sector": "education",
    "name": "Smart classrooms in schools",
    "blurb": "Digital content and teacher training in government schools.",
    "stakeholders": [
      {
        "role": "Funder",
        "who": "Technology company CSR"
      },
      {
        "role": "Implementing partner",
        "who": "EdTech nonprofit"
      },
      {
        "role": "Government",
        "who": "State education department"
      },
      {
        "role": "Community",
        "who": "Head teachers, SMCs"
      }
    ],
    "chain": {
      "dowe": "Install smart-class kits and train teachers",
      "output": "Classrooms equipped; teachers trained",
      "outcome": "Students understand math and science better",
      "impact": "A cohort reaches secondary school stronger in STEM"
    },
    "indicators": [
      {
        "outcome": "Students understand math and science better",
        "good": "Change in math/science test scores vs a comparison group",
        "vanity": "Hours of device use logged",
        "unmeas": "Whether students like technology more",
        "why": {
          "good": "Test-based, comparison-anchored - the learning outcome.",
          "vanity": "Screen time is a use proxy, not mastery.",
          "unmeas": "Diffuse and not attributable."
        }
      }
    ]
  },
  {
    "id": "health-maternal",
    "sector": "health",
    "name": "Maternal & child health",
    "blurb": "Lowering maternal and infant risk through frontline workers.",
    "stakeholders": [
      {
        "role": "Funder",
        "who": "Philanthropic foundation"
      },
      {
        "role": "Implementing NGO",
        "who": "Public-health nonprofit"
      },
      {
        "role": "Government",
        "who": "State health department"
      },
      {
        "role": "Frontline",
        "who": "ASHAs and ANMs"
      }
    ],
    "chain": {
      "dowe": "Train ASHAs and run antenatal-care camps",
      "output": "ASHAs trained; care camps held",
      "outcome": "More pregnant women complete their check-ups",
      "impact": "Fewer mothers and newborns die over time"
    },
    "indicators": [
      {
        "outcome": "More pregnant women complete their check-ups",
        "good": "Share completing 4+ antenatal visits, vs baseline",
        "vanity": "Number of care camps held",
        "unmeas": "Whether women feel cared for",
        "why": {
          "good": "A recognised health indicator, measurable from records.",
          "vanity": "Camps held is effort, not care completed.",
          "unmeas": "Sentiment with no instrument."
        }
      }
    ]
  },
  {
    "id": "health-ncd",
    "sector": "health",
    "name": "Diabetes & BP screening",
    "blurb": "Finding cases early and getting people onto treatment.",
    "stakeholders": [
      {
        "role": "Funder",
        "who": "Corporate CSR"
      },
      {
        "role": "Implementing NGO",
        "who": "Community-health nonprofit"
      },
      {
        "role": "Government",
        "who": "District health society"
      },
      {
        "role": "Facility",
        "who": "Primary Health Centres"
      }
    ],
    "chain": {
      "dowe": "Run screening drives and link cases to treatment",
      "output": "People screened; referral links set up",
      "outcome": "More patients stick to treatment and get controlled",
      "impact": "Fewer complications and hospital stays over years"
    },
    "indicators": [
      {
        "outcome": "More patients stick to treatment and get controlled",
        "good": "Share of diagnosed patients controlled at 6-month follow-up",
        "vanity": "Number of people screened",
        "unmeas": "Whether the community is more health-aware",
        "why": {
          "good": "Control at follow-up - the management outcome.",
          "vanity": "Screening is upstream; detection alone changes nothing.",
          "unmeas": "Vague and unattributable."
        }
      }
    ]
  },
  {
    "id": "health-wash-nutrition",
    "sector": "health",
    "name": "Adolescent anaemia reduction",
    "blurb": "Weekly iron supplements and health sessions in schools.",
    "stakeholders": [
      {
        "role": "Funder",
        "who": "Corporate CSR"
      },
      {
        "role": "Implementing NGO",
        "who": "Adolescent-health nonprofit"
      },
      {
        "role": "Government",
        "who": "Education + health departments"
      },
      {
        "role": "School",
        "who": "Nodal teachers"
      }
    ],
    "chain": {
      "dowe": "Run weekly iron supplements and health sessions",
      "output": "Adolescents covered; weekly iron day running",
      "outcome": "Anaemia among adolescent girls falls",
      "impact": "A healthier cohort enters adulthood"
    },
    "indicators": [
      {
        "outcome": "Anaemia among adolescent girls falls",
        "good": "Anaemia rate in a sampled group, vs baseline",
        "vanity": "Number of tablets consumed",
        "unmeas": "Whether girls understand why iron matters",
        "why": {
          "good": "A clinical rate against baseline - the outcome.",
          "vanity": "Tablets consumed is adherence, not the result.",
          "unmeas": "Knowledge is a different thing, loosely measured."
        }
      }
    ]
  },
  {
    "id": "agri-fpo",
    "sector": "agri",
    "name": "Farmer producer organisations",
    "blurb": "Organising smallholders for better market access.",
    "stakeholders": [
      {
        "role": "Funder",
        "who": "Corporate CSR"
      },
      {
        "role": "Implementing NGO",
        "who": "Livelihoods nonprofit"
      },
      {
        "role": "Government",
        "who": "SFAC / NABARD schemes"
      },
      {
        "role": "Farmers",
        "who": "FPO members"
      }
    ],
    "chain": {
      "dowe": "Form FPOs and train them to sell together",
      "output": "FPOs registered; farmers enrolled",
      "outcome": "Members earn more per acre",
      "impact": "Farmer-owned institutions sustain higher incomes"
    },
    "indicators": [
      {
        "outcome": "Members earn more per acre",
        "good": "Net income per acre of members, vs baseline and non-members",
        "vanity": "Number of farmers enrolled",
        "unmeas": "Whether farmers feel more united",
        "why": {
          "good": "Income with baseline and comparison - the livelihood outcome.",
          "vanity": "Enrolment is reach, not income.",
          "unmeas": "A feeling with no instrument."
        }
      }
    ]
  },
  {
    "id": "agri-climate",
    "sector": "agri",
    "name": "Climate-resilient farming",
    "blurb": "Drought-tolerant practices and water-efficient irrigation.",
    "stakeholders": [
      {
        "role": "Funder",
        "who": "Corporate CSR"
      },
      {
        "role": "Implementing NGO",
        "who": "Agri-extension nonprofit"
      },
      {
        "role": "Government",
        "who": "Agriculture department / KVK"
      },
      {
        "role": "Farmers",
        "who": "Lead farmers"
      }
    ],
    "chain": {
      "dowe": "Train farmers in climate-smart practices",
      "output": "Farmers trained; demo plots running",
      "outcome": "More farmers adopt water-saving methods and hold yields in dry spells",
      "impact": "Farming incomes survive climate swings"
    },
    "indicators": [
      {
        "outcome": "More farmers adopt water-saving methods and hold yields",
        "good": "Share adopting drip methods and holding yield in a dry season, vs baseline",
        "vanity": "Number of demo plots set up",
        "unmeas": "Whether farmers believe in the methods",
        "why": {
          "good": "Adoption plus yield-resilience - the real outcome.",
          "vanity": "Demo plots are an activity output.",
          "unmeas": "Belief isn't the result sought."
        }
      }
    ]
  },
  {
    "id": "agri-dairy",
    "sector": "agri",
    "name": "Dairy livelihoods",
    "blurb": "Raising smallholder dairy incomes.",
    "stakeholders": [
      {
        "role": "Funder",
        "who": "Corporate CSR"
      },
      {
        "role": "Implementing partner",
        "who": "Dairy cooperative"
      },
      {
        "role": "Government",
        "who": "Animal husbandry department"
      },
      {
        "role": "Producers",
        "who": "Women dairy farmers"
      }
    ],
    "chain": {
      "dowe": "Run animal-health camps and set up milk collection",
      "output": "Collection centres running; farmers linked",
      "outcome": "Milk yield and prices farmers get go up",
      "impact": "Women dairy farmers' household income rises for good"
    },
    "indicators": [
      {
        "outcome": "Milk yield and prices farmers get go up",
        "good": "Milk yield per animal and price per litre, vs baseline",
        "vanity": "Number of vet camps held",
        "unmeas": "Whether farmers trust the cooperative",
        "why": {
          "good": "Yield and price - the income outcome, measurable.",
          "vanity": "Camp count is effort.",
          "unmeas": "Trust is loosely measured, not the outcome."
        }
      }
    ]
  },
  {
    "id": "skill-youth",
    "sector": "skilling",
    "name": "Youth jobs & placement",
    "blurb": "Training linked to real jobs for unemployed youth.",
    "stakeholders": [
      {
        "role": "Funder",
        "who": "Corporate CSR"
      },
      {
        "role": "Implementing partner",
        "who": "Skilling nonprofit"
      },
      {
        "role": "Government",
        "who": "NSDC / state skill mission"
      },
      {
        "role": "Employers",
        "who": "Hiring companies"
      }
    ],
    "chain": {
      "dowe": "Run job-aligned courses and match youth to employers",
      "output": "Youth trained; employer tie-ups made",
      "outcome": "More trainees get jobs and keep them at 6 months",
      "impact": "A cohort reaches stable work and higher income"
    },
    "indicators": [
      {
        "outcome": "More trainees get jobs and keep them at 6 months",
        "good": "Share placed and still working at 6 months, verified",
        "vanity": "Number of youth enrolled",
        "unmeas": "Whether trainees feel more confident",
        "why": {
          "good": "Verified placement-and-retention - the employment outcome.",
          "vanity": "Enrolment is reach, the weakest proxy.",
          "unmeas": "Confidence isn't the funded result."
        }
      }
    ]
  },
  {
    "id": "skill-women-entrepreneurship",
    "sector": "skilling",
    "name": "Women's micro-businesses",
    "blurb": "Enterprise skills and seed support for women.",
    "stakeholders": [
      {
        "role": "Funder",
        "who": "Corporate CSR / foundation"
      },
      {
        "role": "Implementing NGO",
        "who": "Women's livelihoods nonprofit"
      },
      {
        "role": "Finance",
        "who": "MFI / bank"
      },
      {
        "role": "Community",
        "who": "Self-Help Groups"
      }
    ],
    "chain": {
      "dowe": "Train women in business skills and link them to credit",
      "output": "Women trained; linked to bank credit",
      "outcome": "Their businesses survive past a year and earn steadily",
      "impact": "Women's economic power and say at home grow"
    },
    "indicators": [
      {
        "outcome": "Their businesses survive past a year and earn steadily",
        "good": "Share still running at 12 months and their monthly income",
        "vanity": "Number of seed grants given",
        "unmeas": "Whether women feel more entrepreneurial",
        "why": {
          "good": "Survival plus income - the enterprise outcome.",
          "vanity": "Grants given is input deployment.",
          "unmeas": "A mindset claim, not the result."
        }
      }
    ]
  },
  {
    "id": "skill-digital",
    "sector": "skilling",
    "name": "Digital skills for rural youth",
    "blurb": "Digital literacy to open remote and gig work.",
    "stakeholders": [
      {
        "role": "Funder",
        "who": "Technology company CSR"
      },
      {
        "role": "Implementing partner",
        "who": "Digital-literacy nonprofit"
      },
      {
        "role": "Government",
        "who": "CSC / state IT mission"
      },
      {
        "role": "Community",
        "who": "Village training centres"
      }
    ],
    "chain": {
      "dowe": "Run digital-skills courses and help youth find online work",
      "output": "Youth trained; village centres running",
      "outcome": "Trainees earn income using digital tools",
      "impact": "Rural youth join the digital economy and earn more"
    },
    "indicators": [
      {
        "outcome": "Trainees earn income using digital tools",
        "good": "Share earning through digital work at 6 months, vs baseline",
        "vanity": "Number who completed the course",
        "unmeas": "Whether youth feel more modern",
        "why": {
          "good": "Income-through-digital-use - the application outcome.",
          "vanity": "Completion is the standard vanity count.",
          "unmeas": "A feeling, not the result."
        }
      }
    ]
  },
  {
    "id": "gender-gbv",
    "sector": "gender",
    "name": "Preventing gender-based violence",
    "blurb": "Shifting norms and strengthening survivor support.",
    "stakeholders": [
      {
        "role": "Funder",
        "who": "Foundation"
      },
      {
        "role": "Implementing NGO",
        "who": "Women's-rights organisation"
      },
      {
        "role": "Government",
        "who": "WCD dept, One Stop Centres"
      },
      {
        "role": "Community",
        "who": "Men's and youth groups"
      }
    ],
    "chain": {
      "dowe": "Run community dialogues and strengthen survivor support",
      "output": "Dialogues held; referral links set up",
      "outcome": "More survivors seek help; harmful attitudes soften",
      "impact": "Less tolerance and less violence over time"
    },
    "indicators": [
      {
        "outcome": "More survivors seek help; harmful attitudes soften",
        "good": "Help-seeking uptake and share holding unequal attitudes (survey), vs baseline",
        "vanity": "Number of dialogues held",
        "unmeas": "Whether the community respects women more",
        "why": {
          "good": "Help-seeking plus an attitudes scale against baseline.",
          "vanity": "Dialogue count is activity volume.",
          "unmeas": "\"More respectful\" is undefined."
        }
      }
    ]
  },
  {
    "id": "wash-schools",
    "sector": "wash",
    "name": "WASH in schools",
    "blurb": "Working toilets, safe water and hygiene habits in schools.",
    "stakeholders": [
      {
        "role": "Funder",
        "who": "Corporate CSR"
      },
      {
        "role": "Implementing NGO",
        "who": "WASH nonprofit"
      },
      {
        "role": "Government",
        "who": "Education dept"
      },
      {
        "role": "School",
        "who": "SMCs, child cabinets"
      }
    ],
    "chain": {
      "dowe": "Fix WASH facilities and run hygiene sessions",
      "output": "Schools with working toilets and handwash points",
      "outcome": "Students wash hands regularly; girls miss fewer days",
      "impact": "Less illness and better attendance that lasts"
    },
    "indicators": [
      {
        "outcome": "Students wash hands regularly; girls miss fewer days",
        "good": "Share observed washing hands, and girls' attendance during menstruation, vs baseline",
        "vanity": "Number of toilets built",
        "unmeas": "Whether students care more about cleanliness",
        "why": {
          "good": "Observed behaviour plus attendance - the use/health outcome.",
          "vanity": "Construction count is the archetypal WASH vanity output.",
          "unmeas": "\"Care more\" has no instrument."
        }
      }
    ]
  },
  {
    "id": "env-afforestation",
    "sector": "environment",
    "name": "Community tree restoration",
    "blurb": "Restoring degraded land with community care.",
    "stakeholders": [
      {
        "role": "Funder",
        "who": "Corporate CSR"
      },
      {
        "role": "Implementing NGO",
        "who": "Environmental nonprofit"
      },
      {
        "role": "Government",
        "who": "Forest department / panchayat"
      },
      {
        "role": "Community",
        "who": "Village forest committees"
      }
    ],
    "chain": {
      "dowe": "Plant native trees and set up community care",
      "output": "Saplings planted across the target area",
      "outcome": "Most trees survive and green cover grows after 3 years",
      "impact": "A restored ecosystem - soil, water, wildlife - lasts"
    },
    "indicators": [
      {
        "outcome": "Most trees survive and green cover grows after 3 years",
        "good": "Tree survival rate at 3 years and change in green cover",
        "vanity": "Number of saplings planted",
        "unmeas": "Whether the community values the forest more",
        "why": {
          "good": "Multi-year survival and measured cover - the restoration outcome.",
          "vanity": "Saplings planted is the headline vanity metric.",
          "unmeas": "Values are loosely measured, not ecological."
        }
      }
    ]
  },
  {
    "id": "finance-literacy",
    "sector": "finance",
    "name": "Financial inclusion",
    "blurb": "Building money skills and real account use.",
    "stakeholders": [
      {
        "role": "Funder",
        "who": "Bank/NBFC CSR"
      },
      {
        "role": "Implementing NGO",
        "who": "Financial-literacy nonprofit"
      },
      {
        "role": "Finance",
        "who": "Banking correspondents"
      },
      {
        "role": "Community",
        "who": "SHGs"
      }
    ],
    "chain": {
      "dowe": "Run money-skills sessions and help open accounts",
      "output": "People trained; accounts opened",
      "outcome": "People actually use accounts and start saving formally",
      "impact": "Households build a buffer and lean less on costly loans"
    },
    "indicators": [
      {
        "outcome": "People actually use accounts and start saving formally",
        "good": "Share of accounts active (used in 90 days) and holding formal savings, vs baseline",
        "vanity": "Number of accounts opened",
        "unmeas": "Whether people feel financially secure",
        "why": {
          "good": "Active-use and savings rates - the behaviour outcome.",
          "vanity": "Accounts opened is the classic inclusion vanity count.",
          "unmeas": "Felt security has no instrument."
        }
      }
    ]
  },
  {
    "id": "nutrition-anganwadi",
    "sector": "nutrition",
    "name": "Early-childhood nutrition",
    "blurb": "Cutting stunting in under-5s through Anganwadis.",
    "stakeholders": [
      {
        "role": "Funder",
        "who": "Foundation / corporate CSR"
      },
      {
        "role": "Implementing NGO",
        "who": "Nutrition nonprofit"
      },
      {
        "role": "Government",
        "who": "ICDS / WCD department"
      },
      {
        "role": "Frontline",
        "who": "Anganwadi workers"
      }
    ],
    "chain": {
      "dowe": "Train workers and counsel caregivers on feeding",
      "output": "Workers trained; growth monitoring running",
      "outcome": "Feeding improves and more children grow on track",
      "impact": "Stunting in under-5s falls over the years"
    },
    "indicators": [
      {
        "outcome": "Feeding improves and more children grow on track",
        "good": "Share with age-appropriate feeding and on-track growth, vs baseline",
        "vanity": "Number of children weighed",
        "unmeas": "Whether mothers know more about nutrition",
        "why": {
          "good": "Feeding and growth rates - the nutrition outcome.",
          "vanity": "Children weighed is monitoring volume.",
          "unmeas": "Awareness is a different, weak measure."
        }
      }
    ]
  },
  {
    "id": "water-conservation",
    "sector": "water",
    "name": "Water harvesting & recharge",
    "blurb": "Community structures to raise water availability.",
    "stakeholders": [
      {
        "role": "Funder",
        "who": "Corporate CSR"
      },
      {
        "role": "Implementing NGO",
        "who": "Watershed nonprofit"
      },
      {
        "role": "Government",
        "who": "Watershed mission"
      },
      {
        "role": "Community",
        "who": "Village water committees"
      }
    ],
    "chain": {
      "dowe": "Build check dams and ponds with the community",
      "output": "Water structures built across villages",
      "outcome": "Groundwater rises and water is easier to get",
      "impact": "Water-secure villages keep farming and stay put"
    },
    "indicators": [
      {
        "outcome": "Groundwater rises and water is easier to get",
        "good": "Change in water table (monitored wells) and water availability, vs baseline",
        "vanity": "Number of structures built",
        "unmeas": "Whether villagers feel more water-secure",
        "why": {
          "good": "Measured water-table change - the hydrological outcome.",
          "vanity": "Structures built is the vanity output.",
          "unmeas": "Felt security has no measure."
        }
      }
    ]
  },
  {
    "id": "digital-governance",
    "sector": "digital",
    "name": "Tech for service access",
    "blurb": "Helping citizens get their entitlements digitally.",
    "stakeholders": [
      {
        "role": "Funder",
        "who": "Technology company CSR"
      },
      {
        "role": "Implementing NGO",
        "who": "Civic-tech nonprofit"
      },
      {
        "role": "Government",
        "who": "District administration"
      },
      {
        "role": "Community",
        "who": "Local facilitators"
      }
    ],
    "chain": {
      "dowe": "Run camps to help people apply for benefits",
      "output": "Applications filed; facilitators active",
      "outcome": "More eligible people actually receive their benefits",
      "impact": "Lasting, fair access to public benefits"
    },
    "indicators": [
      {
        "outcome": "More eligible people actually receive their benefits",
        "good": "Share of applicants who received the benefit, and time taken, vs baseline",
        "vanity": "Number of applications filed",
        "unmeas": "Whether people trust government more",
        "why": {
          "good": "Receipt rate and time taken - the access outcome.",
          "vanity": "Applications filed is throughput.",
          "unmeas": "Trust is weakly measured."
        }
      }
    ]
  },
  {
    "id": "rural-integrated",
    "sector": "rural",
    "name": "Integrated village development",
    "blurb": "A model-village programme across several sectors.",
    "stakeholders": [
      {
        "role": "Funder",
        "who": "Corporate CSR flagship"
      },
      {
        "role": "Implementing NGO",
        "who": "Rural-development nonprofit"
      },
      {
        "role": "Government",
        "who": "Line departments, panchayat"
      },
      {
        "role": "Community",
        "who": "Village development committee"
      }
    ],
    "chain": {
      "dowe": "Deliver livelihoods, WASH and education together",
      "output": "Villages covered; plans carried out",
      "outcome": "Household income and access to services improve",
      "impact": "Villages hold a higher standard of living after exit"
    },
    "indicators": [
      {
        "outcome": "Household income and access to services improve",
        "good": "Household income and service-access rates, vs baseline and a comparison village",
        "vanity": "Number of activities completed",
        "unmeas": "Whether the village feels more developed",
        "why": {
          "good": "Income and access against baseline/comparison - the development outcome.",
          "vanity": "Activities completed is delivery output.",
          "unmeas": "\"Feels developed\" is undefined."
        }
      }
    ]
  }
];

// Chain rung definitions (Do/We -> Output -> Outcome -> Impact)
const CHAIN_RUNGS = [
  {
    key: "dowe",
    label: "DO / WE",
    tagline: "Activities & Actions",
    desc: "What the team actually does or delivers on the ground",
    badgeColor: "#1d4ed8",
    badgeBg: "#dbeafe"
  },
  {
    key: "output",
    label: "OUTPUT",
    tagline: "Immediate Deliverables",
    desc: "Tangible direct products, counts or services produced",
    badgeColor: "#0284c7",
    badgeBg: "#e0f2fe"
  },
  {
    key: "outcome",
    label: "OUTCOME",
    tagline: "Behavioral & System Change",
    desc: "Positive shift in behavior, knowledge or capacity",
    badgeColor: "#16a34a",
    badgeBg: "#dcfce7"
  },
  {
    key: "impact",
    label: "IMPACT",
    tagline: "Long-term Sustainable Transformation",
    desc: "Lasting systemic difference in society or lives",
    badgeColor: "#7c3aed",
    badgeBg: "#f3e8ff"
  }
];

// Export to window object
if (typeof window !== "undefined") {
  window.TRIVIA_QUESTIONS = TRIVIA_QUESTIONS;
  window.CSR_CHECK_QUESTIONS = CSR_CHECK_QUESTIONS;
  window.SDG_GAME_QUESTIONS = SDG_GAME_QUESTIONS;
  window.ZCZP_INFO = ZCZP_INFO;
  window.SECTOR_ICONS = SECTOR_ICONS;
  window.SECTORS = SECTORS;
  window.PROGRAMMES = PROGRAMMES;
  window.CHAIN_RUNGS = CHAIN_RUNGS;
}

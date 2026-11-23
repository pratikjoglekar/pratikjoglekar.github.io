// Single source of truth for project facts shown on the home page,
// case-study headers ("At a glance") and link previews.
// Facts come from the case studies and components/data/portfolio.txt.

export type Project = {
  slug: string
  title: string
  company: string
  /** Years shown next to the company */
  years: string
  current?: boolean
  /** Headline outcome on the home page */
  metric: string
  metricLabel: string
  /** One-line summary for the home page, next-project card and link previews */
  summary: string
  image: string
  imageAlt: string
  /** Reading time shown in the case-study header (about 230 words a minute, plus figures) */
  readMinutes: number
  /** Suggested questions in Sutra when it is opened on this case study */
  questions: string[]
  /** Recoloured LottieFiles icon in /public/lottie */
  icon: string
  /** Still frame for the icon (fraction 0–1); defaults to the last frame */
  iconRest?: number
  glance: {
    problem: string
    role: string
    team: string
    duration: string
    decisions: string[]
    outcomes: { value: string; label: string }[]
  }
}

export const projects: Project[] = [
  {
    slug: "c4cintegrations",
    questions: ["Why build parity before new features?", "How does the grade-sync cutoff work?", "What did the field teams ask for most?"],
    readMinutes: 7,
    icon: "/lottie/link.json",
    title: "Coursera for Campuses Integrations",
    company: "Coursera",
    years: "2025 – now",
    current: true,
    metric: "10% → 31%",
    metricLabel: "LMS connection success",
    summary:
      "A native LTI integration that replaced third-party middleware: near real-time grade sync, self-serve setup, content linking inside the LMS and admin controls.",
    image: "/images/integrations/northstar-home.png",
    imageAlt: "Coursera for Campuses LMS integration north star design",
    glance: {
      problem:
        "Middleware delayed grades by a day or two and made setup take weeks. Only 10% of LMS connections succeeded, and 57% of admin issues went to support.",
      role: "Sole Product Designer",
      team: "8 developers, 1 PM, 1 data analyst",
      duration: "Since June 2025",
      decisions: [
        "Replace the middleware with a native LTI instead of patching it",
        "Parity with existing workflows first, then self-serve, then new experience",
        "Safe defaults: admin control over programs, and a grade-sync cutoff",
      ],
      outcomes: [
        { value: "10% → 31%", label: "LMS connection success" },
        { value: "57% → 7%", label: "Support dependency, over 2 quarters" },
      ],
    },
  },
  {
    slug: "pricing-calculator",
    questions: ["Why put it on the Teams page?", "Account progression fell 8%. Why ship it anyway?", "What did the test not prove?"],
    readMinutes: 6,
    icon: "/lottie/sliders.json",
    title: "Coursera for Teams Pricing Calculator",
    company: "Coursera",
    years: "2026",
    metric: "24%",
    metricLabel: "Engaged with the calculator",
    summary:
      "A pricing calculator that moved purchase decisions upstream: an upfront estimate, plain licensing rules and a guided sales path for larger teams.",
    image: "/images/pricing-calculator/calculator-final.png",
    imageAlt:
      "Coursera for Teams pricing calculator: annual or quarterly billing, a license stepper, an estimate due today, Continue to checkout and Email estimate, with the key policies alongside",
    glance: {
      problem:
        "Small teams discovered the price, the 5-seat minimum and the licensing rules too late in the purchase journey, which added friction at checkout.",
      role: "Lead Product Designer",
      team: "2 product designers, engineering, 3 marketers, and data and analytics",
      duration: "Feb – Jul 2026, concept to A/B readout",
      decisions: [
        "Move pricing discovery upstream, even if fewer visitors progress into checkout",
        "Put it on the Teams page, not the enterprise page, where buyers need a price",
        "Licensing rules in plain language beside the price, not in fine print",
      ],
      outcomes: [
        { value: "24%", label: "Of exposed visitors engaged with the calculator" },
        { value: "100%", label: "Of C4T traffic, rolled out after the A/B test" },
      ],
    },
  },
  {
    slug: "usage-intelligence",
    questions: ["Why governance instead of another dashboard?", "What did the SMB interviews reveal?", "How do protected events work?"],
    readMinutes: 5,
    icon: "/lottie/pulse.json",
    iconRest: 0.5,
    title: "Usage Intelligence Platform",
    company: "HubSpot",
    years: "2022 – 2025",
    metric: "−40%",
    metricLabel: "Critical usage gaps",
    summary:
      "A usage intelligence layer that made data reliable and let teams monitor customer behaviour without engineering support.",
    image: "/images/uip/uip.png",
    imageAlt: "HubSpot usage intelligence platform overview",
    glance: {
      problem:
        "Nobody owned usage events, deleting a file silently lost live data, and problems surfaced only after they spread into analytics tools.",
      role: "Sole Product Designer",
      team: "4 developers, 1 PM, 1 data analyst",
      duration: "5 months",
      decisions: [
        "Ownership and governance, not another analytics surface",
        "A flexible event schema, with validation, auditing and alerts as safety nets",
        "No-code event creation with protection and reviewers built in",
      ],
      outcomes: [
        { value: "8.5% → 5.1%", label: "Critical usage situations (−40%)" },
        { value: "−70%", label: "Errors in the event creation flow" },
      ],
    },
  },
  {
    slug: "cancellation",
    questions: ["Why a discount, not a price cut?", "How was the cohort chosen?", "What would Pratik test next?"],
    readMinutes: 5,
    icon: "/lottie/discount.json",
    title: "Retention Intervention at Cancellation",
    company: "HubSpot",
    years: "2022 – 2025",
    metric: "36%",
    metricLabel: "Dollar retention with the offer",
    summary:
      "A targeted, time-bound offer at the moment of cancellation that extended customer lifetime value without permanent price changes.",
    image: "/images/retention/retention-offer.png",
    imageAlt: "HubSpot retention discount panel shown at cancellation",
    glance: {
      problem:
        "Starter customers often left before the roughly two-year payback on acquiring them, so each early cancellation lost money.",
      role: "Sole Product Designer",
      team: "2 developers, 1 PM, 1 data analyst",
      duration: "2 months",
      decisions: [
        "Measure lifetime value and dollar retention, not raw churn",
        "Offer the discount only at the moment of cancellation",
        "Validate on a narrow, high-risk starter cohort first",
      ],
      outcomes: [
        { value: "36%", label: "Dollar retention among discount recipients" },
        { value: "14%", label: "Continued after the discount ended" },
      ],
    },
  },
  {
    slug: "dashboard",
    questions: ["What did the customer survey show?", "Why was longer engagement a good sign?", "Why choose Design B?"],
    readMinutes: 6,
    icon: "/lottie/home.json",
    title: "Dashboard Redesign",
    company: "MassMutual",
    years: "2020 – 2022",
    metric: "15s → 35s",
    metricLabel: "Time engaged on the homepage",
    summary:
      "The policyholder homepage went from a pass-through to a control surface, so customers could get more done without leaving it.",
    image: "/images/dashboard/after-dashboard.png",
    imageAlt: "Redesigned MassMutual customer dashboard",
    glance: {
      problem:
        "The homepage was a pass-through: customers skimmed it for 15 seconds and navigated away to get anything done.",
      role: "Senior Product Designer",
      team: "7 developers, 1 product owner, 1 business analyst, 1 data analyst",
      duration: "6 months",
      decisions: [
        "Treat the homepage as a control surface, not a navigation page",
        "Invest in a full redesign rather than incremental visual fixes",
        "Choose Design B as the north star, keeping learnings from Design A",
      ],
      outcomes: [
        { value: "15s → 35s", label: "Time engaged on the homepage" },
        { value: "+9%", label: "Adoption after the redesign" },
      ],
    },
  },
]

/** Results from the résumé that have no case study of their own (shown under the work grid). */
export const moreResults: { value: string; label: string; company: string }[] = [
  { value: "+90%", label: "Daily usage of campaign creation, after restructuring the flow", company: "HubSpot" },
  { value: "+6%", label: "CRM conversions, from repositioned pricing cards", company: "HubSpot" },
  { value: "+17%", label: "Monthly active users, after the mobile app redesign", company: "MassMutual" },
]

export const contact = {
  email: "letstalk@pratikjoglekar.com",
  linkedin: "https://www.linkedin.com/in/pratik-joglekar/",
  mentoring: "https://adplist.org/mentors/pratik-joglekar",
}

export const site = {
  name: "Pratik Joglekar",
  role: "Senior Product Designer",
  url: "https://www.pratikjoglekar.com",
}

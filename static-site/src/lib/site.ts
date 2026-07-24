export interface SiteCopy {
  brandName: string;
  pageTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  heroHeading: string;
  heroSubtext: string;
  errorMessage: string;
  footerText: string;
}

export const DEFAULT_SITE_COPY: SiteCopy = {
  brandName: "Fix-It First",
  pageTitle: "Fix-It First — household repair triage",
  metaDescription:
    "Describe what's broken. Get the 3 most likely causes, difficulty, cost, safety red flags, and shopping links for parts.",
  ogTitle: "Fix-It First — household repair triage",
  ogDescription: "Repair triage with cost, difficulty, and parts links.",
  heroHeading: "Describe what's broken.",
  heroSubtext: "Get the 3 most likely causes, whether it's DIY-safe, and links to buy the parts.",
  errorMessage: "Couldn't get a diagnosis. Try again in a moment.",
  footerText: "General guidance, not a substitute for a pro. Product links are Amazon searches.",
};

export const DEFAULT_FREQUENT_QUESTIONS: string[] = [
  "My kitchen faucet drips even when off",
  "Bathroom outlet stopped working",
  "Dryer runs but clothes stay wet",
  "Ceiling fan wobbles on high",
  "Small hole in drywall from doorknob",
  "Toilet won't stop running",
  "Toilet tank keeps refilling by itself",
  "AC is running but not cooling the house",
  "Thermostat screen is blank",
  "Furnace is blowing cold air",
  "Outdoor GFCI outlet keeps tripping",
  "Bathtub faucet won't stop dripping",
  "Dryer is making a loud squealing noise",
  "Ceiling fan makes a clicking noise on low",
];


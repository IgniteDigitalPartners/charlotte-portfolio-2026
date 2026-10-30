// Content for the free 15-point Social Media Audit Checklist (/free-audit/).
export const auditSections = [
  {
    title: "First impressions",
    items: [
      ["Your profile photo is clear and consistent", "The same logo or headshot on every platform, readable even at thumbnail size."],
      ["Your bio passes the 5-second test", "A stranger can instantly tell who you help, what you do and what to do next."],
      ["Your link goes somewhere useful", "It opens a working, mobile-friendly page that leads to booking or enquiring, not just your homepage."],
    ],
  },
  {
    title: "Business essentials",
    items: [
      ["Your contact details match everywhere", "Phone, email, hours and location are identical across Facebook, Instagram and Google."],
      ["An action button is switched on", "\"Book now\", \"Send message\" or \"Contact\": one tap from profile to conversation."],
      ["Your Highlights and featured posts work like a mini website", "Services, results, reviews and FAQs are pinned where new visitors look first."],
    ],
  },
  {
    title: "Content",
    items: [
      ["Your last 9 posts look like one brand", "Consistent colours, fonts and style, so people recognise you before they read your name."],
      ["You're not only selling", "A healthy mix of value (tips), proof (results), personality (you) and offers."],
      ["You've posted consistently for 30 days", "At least 3 times a week, so the algorithm and your audience both know you're active."],
    ],
  },
  {
    title: "Engagement",
    items: [
      ["You reply to messages and comments within 24 hours", "Slow replies are the number one way small businesses lose warm leads."],
      ["Automatic replies are set up", "An instant greeting and an away message, so nobody is left waiting in silence."],
      ["Every caption ends with a clear next step", "\"Comment\", \"save\", \"DM me\" or \"book\": tell people exactly what to do."],
    ],
  },
  {
    title: "Results",
    items: [
      ["You check your insights every month", "Reach, profile visits and link clicks, not just likes."],
      ["You know your top 3 posts and why they worked", "So you can repeat what's working instead of guessing."],
      ["Your website tracks visitors from social", "The Meta Pixel and Google Analytics are installed, so you can see which posts bring enquiries."],
    ],
  },
] as const;

export const auditScores = [
  { range: "13–15", label: "Strong", text: "Your foundations are solid. Focus on growth: ads, collaborations and scaling what works." },
  { range: "8–12", label: "Room to grow", text: "You're close. A few targeted fixes could noticeably increase your enquiries." },
  { range: "0–7", label: "Missed leads", text: "People are finding you but not reaching out. Start with sections 1 and 4 this week." },
] as const;

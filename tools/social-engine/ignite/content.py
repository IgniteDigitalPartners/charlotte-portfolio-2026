# Ignite Digital Partners content engine: 30 Oct to 12 Nov 2026
# Voice: plain-English, confident, "we", for industrial & resources companies. No em/en dashes. No invented stats.
# Times Europe/Malta.

CORE = "#IgniteDigitalPartners #B2BMarketing #IndustrialMarketing #MarketingStrategy #ResourceSector"
MINING = "#MiningMarketing #MiningIndustry #Exploration #InvestorRelations"
CONSTR = "#ConstructionMarketing #ConstructionIndustry #Contractors"
MANUF = "#ManufacturingMarketing #Manufacturing #IndustrialSuppliers"
ENERGY = "#EnergyMarketing #Renewables #EnergyIndustry"
IR = "#InvestorRelations #CorporateCommunications #CapitalMarkets"
WEB = "#B2BWebsite #WebsiteDesign #LeadGeneration"
CTA = "Book a free 30-minute strategy call at ignitedigitalpartners.com"

P = []

def add(date, time, net, fmt, visual, text="", tags="", **kw):
    P.append(dict(date=date, time=time, net=net, fmt=fmt, visual=visual,
                  text=(text.strip() + ("\n\n" + tags if tags else "")).strip(), **kw))

# ---------------- FRI 30 OCT: Sound familiar?
d = "2026-10-30"
add(d, "08:45", "instagram", "STORY", dict(tpl="story", eyebrow="SOUND FAMILIAR?",
    head="Big news goes out. Then six months of silence.", sub="Your audience notices the quiet more than the news.", cta="Book a strategy call"))
add(d, "13:00", "instagram", "POST", dict(tpl="carousel", slides=[
    dict(eyebrow="SOUND FAMILIAR?", head="4 signs your marketing is holding you back", sub="Swipe through. Be honest."),
    dict(eyebrow="SIGN 01", head="Your website looks dated", sub="And it doesn't explain what you actually do."),
    dict(eyebrow="SIGN 02", head="Nobody can find you online", sub="Investors, customers and new hires search, and come up empty."),
    dict(eyebrow="SIGN 03", head="Marketing happens in bursts", sub="Busy around announcements, silent the rest of the year."),
    dict(eyebrow="SIGN 04", head="You can't see what it brings in", sub="Money goes out. Nobody can say what came back."),
    dict(eyebrow="THE FIX", head="One team. One plan. Measured results.", sub="ignitedigitalpartners.com"),
    ]),
    "If you run a mining, energy, construction or manufacturing business, at least one of these probably sounds familiar.\n\nNone of them are unusual, and all of them are fixable with a clear plan and consistent execution. That is exactly what we do.\n\nWhich sign hits closest to home? " + CTA + ".",
    CORE + " " + MINING + " #ConstructionMarketing #ManufacturingMarketing")
add(d, "18:30", "instagram", "REEL", dict(tpl="reel", lines=[
    "Your project is world class.", "Your website", "still looks like 2016.", "Investors notice.", "So do the people you want to hire."],
    end="Let's fix that.\nignitedigitalpartners.com"),
    "Great operations deserve a website that explains them clearly. We build fast, simple websites for industrial and resources companies that turn visitors into enquiries.",
    CORE + " " + WEB)
add(d, "11:30", "facebook", "POST", dict(tpl="post", theme="noir", eyebrow="SOUND FAMILIAR?",
    head="Spending on marketing but can't see what it brings in?", sub="You're not alone. It's the most common thing we hear."),
    "\"We spend on marketing, but we honestly can't tell you what it brings in.\"\n\nIt's the sentence we hear most often from industrial and resources companies. Usually the problem isn't the effort. It's that the website, content, ads and tracking were never set up to work together.\n\nWe bring strategy, design, content, ads and reporting into one place, so every enquiry is tracked and you always know what's working.\n\n" + CTA + ".",
    "#B2BMarketing #IgniteDigitalPartners")
add(d, "09:15", "linkedin", "POST", dict(tpl="post", theme="noir", eyebrow="INDUSTRIAL & RESOURCES",
    head="The quiet between announcements costs more than you think.", sub="Visibility is built in the months nobody is watching."),
    "Most industrial and resources companies market in bursts.\n\nA financing closes, a contract is won, results come in, and there's a flurry of activity: a news release, a post, maybe an update to the website. Then it goes quiet until the next milestone.\n\nThe problem is that investors, customers and potential hires don't only look when you announce something. They look when they're deciding. If the last thing they find is six months old, the story they build in their head isn't the one you'd tell.\n\nConsistent, steady communication between milestones is what turns news into credibility.\n\nHow long has it been since your company published something that wasn't an announcement?",
    "#B2BMarketing #InvestorRelations #IndustrialMarketing #MiningIndustry")
add(d, "14:00", "gmb", "publication", dict(tpl="gbp", eyebrow="MARKETING FOR INDUSTRIAL & RESOURCES",
    head="One team for strategy, websites, content, ads and reporting", sub="Mining, energy, construction and manufacturing."),
    "Ignite Digital Partners is a marketing partner for industrial and resources companies: mining and exploration, energy and renewables, construction and building materials, and manufacturing. We combine brand and messaging, websites, investor and corporate communications, content and social media, search and paid advertising, and CRM and reporting in one team, so you don't need five agencies. Every enquiry is tracked and reported. Book a free 30-minute strategy call at ignitedigitalpartners.com.")

# ---------------- SAT 31 OCT: Halloween
d = "2026-10-31"
add(d, "08:45", "instagram", "STORY", dict(tpl="story", eyebrow="HAPPY HALLOWEEN",
    head="The scariest thing in B2B marketing?", sub="A contact form that nobody checks.", cta="Reply with yours"))
add(d, "13:00", "instagram", "POST", dict(tpl="carousel", slides=[
    dict(eyebrow="HALLOWEEN EDITION", head="3 marketing horror stories we see in heavy industry", sub="Swipe if you dare."),
    dict(eyebrow="HORROR 01", head="The ghost investor page", sub="A presentation from two years ago and a broken link."),
    dict(eyebrow="HORROR 02", head="The vanishing LinkedIn page", sub="Last post: the day the account was created."),
    dict(eyebrow="HORROR 03", head="The haunted inbox", sub="Enquiries arrive. Nobody owns them. Nobody replies."),
    dict(eyebrow="GOOD NEWS", head="All three are easy to fix", sub="Message us. We'll show you how."),
    ]),
    "Happy Halloween from the Ignite team.\n\nNo costumes, just the three marketing horror stories we see most often in mining, energy, construction and manufacturing. Every one of them is fixable, and quicker than most people expect.",
    "#Halloween #B2BMarketing " + CORE)
add(d, "18:30", "instagram", "REEL", dict(tpl="reel", lines=[
    "A buyer finds your company.", "Website: last updated 2019.", "LinkedIn: silent.", "Contact form: unanswered.", "Happy Halloween."],
    end="Let's make it less scary.\nignitedigitalpartners.com"),
    "The only scary thing about your marketing should be how far ahead of your competitors it is. Happy Halloween.",
    "#Halloween " + CORE)
add(d, "11:30", "facebook", "POST", dict(tpl="post", theme="ivory", eyebrow="HAPPY HALLOWEEN",
    head="Is your website a little bit haunted?", sub="Old projects. Old team photos. A form nobody checks."),
    "Happy Halloween.\n\nA seasonal question for industrial businesses: is your website a bit haunted? Old project photos, team members who left years ago, a contact form that quietly sends enquiries nowhere.\n\nIt happens when everyone is busy running the business. When you're ready to bring it back to life, we're here.",
    "#Halloween #IgniteDigitalPartners")

# ---------------- SUN 1 NOV: Movember + Q4 planning
d = "2026-11-01"
add(d, "08:45", "instagram", "STORY", dict(tpl="story", eyebrow="MOVEMBER STARTS TODAY",
    head="Look after the people who build, mine and make.", sub="Check in on the men on your team this month.", cta="Share with your crew"))
add(d, "13:00", "instagram", "POST", dict(tpl="post", theme="noir", eyebrow="MOVEMBER",
    head="Heavy industry runs on its people.", sub="This month, check in on them."),
    "Movember starts today.\n\nMining, energy, construction and manufacturing are industries built by people who often don't talk about how they're really doing. This month is a good reason to ask, and to listen.\n\nIf your company is fundraising or running a Mo team, we'd love to cheer you on. Tag us.",
    "#Movember #MensHealth #MentalHealthAwareness #ConstructionIndustry #MiningIndustry #IgniteDigitalPartners")
add(d, "18:30", "instagram", "REEL", dict(tpl="reel", lines=[
    "Q4 is here.", "Budgets for 2027", "are being set right now.", "Is marketing in the plan", "or an afterthought?"],
    end="Plan 2027 properly.\nignitedigitalpartners.com"),
    "The companies that grow in 2027 are the ones deciding their marketing plan in November, not February. Start the conversation now.",
    CORE + " #Q4Planning #BusinessGrowth")
add(d, "11:30", "facebook", "POST", dict(tpl="post", theme="noir", eyebrow="MOVEMBER",
    head="Strong crews look after each other.", sub="Movember starts today."),
    "Movember starts today.\n\nTo everyone working in mining, energy, construction and manufacturing: check in on your crew this month. A simple \"how are you really doing?\" can matter more than you think.",
    "#Movember #MensHealth #IgniteDigitalPartners")

# ---------------- MON 2 NOV: Brand & Messaging
d = "2026-11-02"
add(d, "08:45", "instagram", "STORY", dict(tpl="story", eyebrow="MONDAY TEST",
    head="Can you explain your company in one sentence?", sub="Your investors, customers and recruits need to.", cta="Try it in the replies"))
add(d, "13:00", "instagram", "POST", dict(tpl="carousel", slides=[
    dict(eyebrow="BRAND & MESSAGING", head="One story, three audiences", sub="Swipe."),
    dict(eyebrow="INVESTORS", head="Why this, why now, why you", sub="The opportunity, the team and the milestones ahead."),
    dict(eyebrow="CUSTOMERS", head="What you deliver, and why it's reliable", sub="Capability, track record and how you work."),
    dict(eyebrow="RECRUITS", head="Why it's worth building a career here", sub="Culture, safety, growth and purpose."),
    dict(eyebrow="ONE CLEAR STORY", head="Same core message. Tailored for each.", sub="ignitedigitalpartners.com"),
    ]),
    "Industrial companies talk to three very different audiences: investors, customers and the people they want to hire. Each needs something different, but all of them should hear the same core story.\n\nThat's what brand and messaging work is for: one clear story about who you are and why you matter, written so each audience gets what they need.",
    CORE + " #BrandStrategy #Messaging #EmployerBranding")
add(d, "18:30", "instagram", "REEL", dict(tpl="reel", lines=[
    "If your team describes the company", "five different ways,", "your market hears", "five different companies.", "One story. Told well."],
    end="Brand & messaging\nignitedigitalpartners.com"),
    "Consistency starts with one agreed story. We help industrial and resources companies define it and use it everywhere.",
    CORE + " #BrandStrategy")
add(d, "11:30", "facebook", "REEL", dict(tpl="reel", lines=[
    "Quick test for your team:", "Ask five people", "what your company does.", "Count the different answers.", "That's your brand gap."],
    end="Let's close it.\nMessage us"),
    "Try this with your team this week. If the answers vary, your customers and investors are hearing mixed messages too. We help industrial businesses build one clear story.",
    "#BrandStrategy #IgniteDigitalPartners")
add(d, "09:15", "linkedin", "POST", dict(tpl="post", theme="noir", eyebrow="BRAND & MESSAGING",
    head="Complex projects need simple stories.", sub="Clarity is a competitive advantage."),
    "Complex projects need simple stories.\n\nIn resources and heavy industry, the work is technical, the timelines are long and the audiences are varied. That's exactly why clear messaging matters so much.\n\nA strong messaging framework gives you:\n• One sentence that explains what you do and why it matters\n• Proof points for investors, customers and recruits\n• Consistent language across your website, presentations and posts\n\nWhen everyone tells the same story, the market starts to believe it.\n\nWhat's the hardest part of your business to explain simply?",
    "#BrandStrategy #Messaging #IndustrialMarketing #InvestorRelations")
add(d, "14:00", "gmb", "publication", dict(tpl="gbp", eyebrow="BRAND & MESSAGING",
    head="A clear story for investors, customers and recruits", sub="Positioning and messaging for industrial companies."),
    "Does everyone in your company describe the business the same way? We create clear brand positioning and messaging for mining, energy, construction and manufacturing companies: one story about who you are and why you matter, written for investors, customers and recruits, then applied across your website, presentations and social channels. Book a free 30-minute strategy call at ignitedigitalpartners.com.")

# ---------------- TUE 3 NOV: Stress Awareness Week, always-on
d = "2026-11-03"
add(d, "08:45", "instagram", "STORY", dict(tpl="story", eyebrow="STRESS AWARENESS WEEK",
    head="Last-minute marketing is stressful marketing.", sub="A plan takes the panic out of every announcement.", cta="Plan ahead with us"))
add(d, "13:00", "instagram", "POST", dict(tpl="post", theme="ivory", eyebrow="STRESS AWARENESS WEEK",
    head="Marketing shouldn't feel like a fire drill.", sub="Plan the year. Then work the plan."),
    "It's Stress Awareness Week, and we see the same pattern everywhere: marketing done in a rush the night before a news release, a conference or a board meeting.\n\nA simple annual plan, with content prepared ahead of the milestones you already know about, removes most of that pressure.\n\nWe build those plans with you, then help deliver them.",
    "#StressAwarenessWeek " + CORE)
add(d, "18:30", "instagram", "REEL", dict(tpl="reel", lines=[
    "You know the milestones.", "Results. Drill programmes. Contract awards.", "So why is the marketing", "always last minute?", "Plan it once. Breathe."],
    end="Plan your year\nignitedigitalpartners.com"),
    "Most of the year's big moments are known months in advance. Plan the communication around them and the stress disappears.",
    "#StressAwarenessWeek " + CORE + " " + MINING)
add(d, "11:30", "facebook", "POST", dict(tpl="post", theme="noir", eyebrow="STRESS AWARENESS WEEK",
    head="Fewer fire drills. More planning.", sub="It's Stress Awareness Week."),
    "It's Stress Awareness Week.\n\nIf your marketing always happens in a rush, a simple plan built around the milestones you already know about can take a lot of pressure off your team. We're happy to help you map yours.",
    "#StressAwarenessWeek #IgniteDigitalPartners")
add(d, "09:15", "linkedin", "POST", dict(tpl="post", theme="ivory", eyebrow="ALWAYS-ON",
    head="From campaigns to systems.", sub="Why steady beats spiky in B2B."),
    "Campaigns end. Systems compound.\n\nA campaign is a burst of activity around a single moment. A communication system is the website, content rhythm, channels and reporting that keep working between those moments.\n\nFor industrial and resources companies, the shift from campaigns to systems usually means:\n1. A website that stays current without a rebuild every year\n2. A monthly content rhythm tied to your real milestones\n3. Tracking that shows which channels actually drive enquiries\n\nIt's less exciting than a launch. It's far more effective.\n\nIs your marketing a series of campaigns or a system?",
    "#B2BMarketing #MarketingStrategy #IndustrialMarketing #StressAwarenessWeek")

# ---------------- WED 4 NOV: Websites
d = "2026-11-04"
add(d, "08:45", "instagram", "STORY", dict(tpl="story", eyebrow="QUICK POLL",
    head="When did your website last get a proper update?", sub="A) This year\nB) 2 to 3 years ago\nC) Don't ask", cta="Reply A, B or C"))
add(d, "13:00", "instagram", "POST", dict(tpl="carousel", slides=[
    dict(eyebrow="WEBSITES", head="What an industrial website must do in 2026", sub="Swipe."),
    dict(eyebrow="01", head="Explain what you do in one line", sub="Before anyone scrolls."),
    dict(eyebrow="02", head="Show the work", sub="Projects, sites, capability and safety record."),
    dict(eyebrow="03", head="Serve every audience", sub="Clear paths for investors, customers and careers."),
    dict(eyebrow="04", head="Turn visits into enquiries", sub="Simple forms, fast load times, tracked leads."),
    dict(eyebrow="FAST · SIMPLE · TRACKED", head="Websites that work as hard as you do", sub="ignitedigitalpartners.com"),
    ]),
    "Your website is often the first place an investor, buyer or future employee meets your company. It needs to explain the business quickly and make the next step obvious for each of them.\n\nWe build fast, simple websites for industrial and resources companies that turn visitors into enquiries, with tracking built in from day one.",
    CORE + " " + WEB)
add(d, "18:30", "instagram", "REEL", dict(tpl="reel", lines=[
    "Investors check your site", "before they call.", "Buyers check it before they quote.", "Recruits check it before they apply.", "Is it ready for all three?"],
    end="Industrial websites\nignitedigitalpartners.com"),
    "Three audiences, one website. We make sure it works for all of them.",
    CORE + " " + WEB)
add(d, "11:30", "facebook", "POST", dict(tpl="post", theme="ivory", eyebrow="WEBSITES",
    head="Your website is your hardest-working salesperson.", sub="Or it should be."),
    "Your website works 24 hours a day. The question is whether it's actually winning work.\n\nWe build fast, simple websites for mining, energy, construction and manufacturing companies: clear about what you do, easy to navigate, and set up so every enquiry is tracked.\n\n" + CTA + ".",
    "#WebsiteDesign #IgniteDigitalPartners")
add(d, "09:15", "linkedin", "POST", dict(tpl="carousel", slides=[
    dict(eyebrow="INDUSTRIAL WEBSITE CHECKLIST", head="Is your website doing its job?", sub="A 5-point check for industrial and resources companies."),
    dict(eyebrow="01 · CLARITY", head="One sentence explains the business", sub="Above the fold, in plain English."),
    dict(eyebrow="02 · PROOF", head="Real projects, real people, real sites", sub="Not stock photos of hard hats."),
    dict(eyebrow="03 · AUDIENCES", head="Clear paths for investors, buyers and careers", sub="Each finds what they need in two clicks."),
    dict(eyebrow="04 · SPEED", head="Fast on a phone, on a site, on 4G", sub="Your buyers aren't always at a desk."),
    dict(eyebrow="05 · TRACKING", head="Every enquiry recorded and reported", sub="So you know what the website brings in."),
    ]),
    "A quick checklist for any industrial or resources company reviewing its website before 2027.\n\nMost sites we audit pass two or three of these. The ones that pass all five tend to be the ones generating steady enquiries.\n\nSwipe through, score your own site out of five, and tell us where you landed.",
    "#B2BMarketing #WebsiteDesign #IndustrialMarketing #LeadGeneration", li_pdf="Industrial Website Checklist")
add(d, "14:00", "gmb", "publication", dict(tpl="gbp", eyebrow="WEBSITES",
    head="Fast, simple websites that turn visitors into enquiries", sub="For industrial and resources companies."),
    "Is your website winning you work? We design and build fast, simple websites for mining, energy, construction and manufacturing companies. Clear messaging, real project content, separate paths for investors, customers and careers, mobile-friendly performance and enquiry tracking built in. Book a free 30-minute strategy call at ignitedigitalpartners.com.")

# ---------------- THU 5 NOV: Investor & Corporate Communications
d = "2026-11-05"
add(d, "08:45", "instagram", "STORY", dict(tpl="story", eyebrow="INVESTOR COMMUNICATIONS",
    head="Your news release is read in 30 seconds.", sub="Make the first paragraph count.", cta="See our tips on the feed"))
add(d, "13:00", "instagram", "POST", dict(tpl="carousel", slides=[
    dict(eyebrow="INVESTOR & CORPORATE COMMS", head="Making complex projects easy to understand", sub="4 principles we live by."),
    dict(eyebrow="01", head="Lead with what it means", sub="Then the technical detail, not the other way round."),
    dict(eyebrow="02", head="One chart beats ten tables", sub="Show progress visually wherever you can."),
    dict(eyebrow="03", head="Same story everywhere", sub="Release, deck, website and LinkedIn all line up."),
    dict(eyebrow="04", head="Update between milestones", sub="Investors notice silence."),
    dict(eyebrow="NEWS · DECKS · UPDATES", head="Clear communication builds confidence", sub="ignitedigitalpartners.com"),
    ]),
    "Investors, partners and communities can't support what they don't understand. Good investor and corporate communication turns technical progress into a clear, consistent story.\n\nWe write and design news releases, presentations and updates that make complex projects easy to follow, always within your disclosure rules.",
    CORE + " " + IR)
add(d, "18:30", "instagram", "REEL", dict(tpl="reel", lines=[
    "Great results.", "Buried in paragraph six.", "Investors stopped at paragraph one.", "Lead with what it means.", "Then show the detail."],
    end="Investor communications\nignitedigitalpartners.com"),
    "Structure matters as much as substance. Lead with the meaning, then support it with the data.",
    CORE + " " + IR)
add(d, "11:30", "facebook", "POST", dict(tpl="post", theme="noir", eyebrow="INVESTOR COMMUNICATIONS",
    head="Complex project. Simple story.", sub="That's the job of good communication."),
    "Technical projects deserve clear communication.\n\nWe help resources and industrial companies write news releases, investor presentations and updates that explain progress in plain language, so investors, partners and communities can follow the story.\n\n" + CTA + ".",
    "#InvestorRelations #IgniteDigitalPartners")
add(d, "09:15", "linkedin", "POST", dict(tpl="post", theme="noir", eyebrow="INVESTOR & CORPORATE COMMS",
    head="Disclosure is the minimum. Clarity is the advantage.", sub="Compliance and communication are not the same thing."),
    "Disclosure is the minimum. Clarity is the advantage.\n\nEvery listed resources company publishes the required information. Far fewer make it easy to understand. That gap is where confidence is won or lost.\n\nA few habits that make a real difference:\n• Put the \"so what\" in the headline and first paragraph\n• Use one consistent set of terms across releases, decks and the website\n• Show progress visually against the plan you've already shared\n• Keep a steady rhythm of updates between material news\n\nNone of this changes what you disclose. It changes how well it lands.",
    "#InvestorRelations #CapitalMarkets #MiningIndustry #CorporateCommunications")

# ---------------- FRI 6 NOV: Content & Social
d = "2026-11-06"
add(d, "08:45", "instagram", "STORY", dict(tpl="story", eyebrow="MOVEMBER CHECK-IN",
    head="How's your crew doing this week?", sub="A five-minute chat can matter a lot.", cta="Check in today"))
add(d, "13:00", "instagram", "POST", dict(tpl="post", theme="ivory", eyebrow="CONTENT & SOCIAL MEDIA",
    head="Stay visible between the big announcements.", sub="Regular posts, articles and video, every month."),
    "Your next big announcement might be months away. Your audience is deciding what they think of you right now.\n\nWe create regular posts, articles and video for industrial and resources companies: site updates, team stories, explainers and milestones, so you stay visible all year.\n\nWhat's one story from your business that deserves to be told?",
    CORE + " #ContentMarketing #SocialMediaMarketing #LinkedInMarketing")
add(d, "18:30", "instagram", "REEL", dict(tpl="reel", lines=[
    "Content ideas you already have:", "Site visits.", "New equipment.", "Safety milestones.", "The people behind the work."],
    end="We'll help you share them.\nignitedigitalpartners.com"),
    "You don't need to invent content. Your operations are full of stories worth sharing.",
    CORE + " #ContentMarketing #ConstructionIndustry #MiningIndustry")
add(d, "11:30", "facebook", "REEL", dict(tpl="reel", lines=[
    "Your best content", "is already happening", "on site every day.", "We help you capture it", "and share it."],
    end="Content & social\nMessage us"),
    "From site updates to team spotlights, your business is full of stories. We turn them into regular, professional content that keeps you visible.",
    "#ContentMarketing #IgniteDigitalPartners")
add(d, "09:15", "linkedin", "POST", dict(tpl="post", theme="ivory", eyebrow="CONTENT & SOCIAL",
    head="Your people are your best content.", sub="Faces build trust faster than logos."),
    "Your people are your best content.\n\nIn industrial sectors, trust is personal. Buyers, investors and future employees want to see who is behind the work: the geologist on site, the project manager on a tough job, the apprentice in their first year.\n\nSimple ways to start:\n• A monthly team spotlight\n• Short site videos filmed on a phone\n• Leaders sharing what they've learned, not just what they've announced\n\nConsistency matters more than polish. And with Movember underway, it's a good month to show the human side of your team.",
    "#ContentMarketing #EmployerBranding #LinkedInMarketing #IndustrialMarketing")
add(d, "14:00", "gmb", "publication", dict(tpl="gbp", eyebrow="CONTENT & SOCIAL MEDIA",
    head="Regular content that keeps you visible all year", sub="Posts, articles and video for industrial companies."),
    "Stay visible between your big announcements. Ignite Digital Partners creates regular social posts, articles and video for mining, energy, construction and manufacturing companies: site updates, team stories, explainers and milestone coverage, planned around your calendar and your disclosure rules. Book a free 30-minute strategy call at ignitedigitalpartners.com.")

# ---------------- SAT 7 NOV: Ignition Loop
d = "2026-11-07"
add(d, "08:45", "instagram", "STORY", dict(tpl="story", eyebrow="HOW WE WORK",
    head="Clarity. Activation. Growth. Insight.", sub="The Ignition Loop, explained on our feed today.", cta="Swipe our latest post"))
add(d, "13:00", "instagram", "POST", dict(tpl="carousel", slides=[
    dict(eyebrow="THE IGNITION LOOP", head="How we turn marketing into a system", sub="Four stages. One continuous loop."),
    dict(eyebrow="01 · CLARITY", head="Agree the story and the plan", sub="Positioning, messaging and an audit of your brand, site and channels."),
    dict(eyebrow="02 · ACTIVATION", head="Build and launch", sub="Messaging, website, content and campaigns, delivered together."),
    dict(eyebrow="03 · GROWTH", head="Keep it working every month", sub="Content, ads and outreach that build steady visibility."),
    dict(eyebrow="04 · INSIGHT", head="Measure and improve", sub="Monthly reporting that feeds the next round of decisions."),
    dict(eyebrow="THEN IT LOOPS", head="Every cycle starts smarter than the last", sub="ignitedigitalpartners.com"),
    ]),
    "Most marketing is a series of disconnected projects. Ours is a loop.\n\nThe Ignition Loop is how we work with every client: Clarity, Activation, Growth and Insight, with what we learn each month feeding straight back into the plan.\n\nSave this, and if you'd like to see how it would work for your company, book a free strategy call.",
    CORE + " #IgnitionLoop #MarketingSystems")
add(d, "18:30", "instagram", "REEL", dict(tpl="reel", lines=[
    "Clarity.", "Activation.", "Growth.", "Insight.", "Then again, smarter."],
    end="The Ignition Loop\nignitedigitalpartners.com"),
    "Four stages, one continuous system. That's how marketing compounds.",
    CORE + " #IgnitionLoop")
add(d, "11:30", "facebook", "POST", dict(tpl="post", theme="noir", eyebrow="THE IGNITION LOOP",
    head="Clarity. Activation. Growth. Insight.", sub="Marketing as a system, not a series of projects."),
    "How we work, in four words: Clarity, Activation, Growth, Insight.\n\nWe agree the story and plan, build and launch what you need, keep it working every month, then measure and improve. Then the loop starts again, smarter each time.\n\nWant to see how it fits your business? " + CTA + ".",
    "#IgnitionLoop #IgniteDigitalPartners")

# ---------------- SUN 8 NOV: Diwali + PDAC prep
d = "2026-11-08"
add(d, "08:45", "instagram", "STORY", dict(tpl="story", eyebrow="HAPPY DIWALI",
    head="Wishing light and prosperity", sub="to everyone celebrating the festival of lights.", cta=""))
add(d, "13:00", "instagram", "POST", dict(tpl="post", theme="noir", eyebrow="HAPPY DIWALI",
    head="May the year ahead burn bright.", sub="Wishing light and prosperity to all who celebrate."),
    "Happy Diwali to everyone celebrating the festival of lights, including our clients, partners and friends around the world. Wishing you a bright and prosperous year ahead.",
    "#HappyDiwali #Diwali2026 #FestivalOfLights #IgniteDigitalPartners")
add(d, "18:30", "instagram", "REEL", dict(tpl="reel", lines=[
    "PDAC is in March.", "The companies that stand out", "start preparing now.", "Deck. Booth. Website. Follow-up.", "Four months. Use them."],
    end="Conference ready\nignitedigitalpartners.com"),
    "Conference season comes round fast. Your investor deck, booth graphics, website and follow-up plan should all tell the same story. Start now.",
    CORE + " " + MINING + " #PDAC")
add(d, "11:30", "facebook", "POST", dict(tpl="post", theme="noir", eyebrow="HAPPY DIWALI",
    head="Wishing you light and prosperity.", sub=""),
    "Happy Diwali to all our clients, partners and friends celebrating today.",
    "#HappyDiwali #IgniteDigitalPartners")

# ---------------- MON 9 NOV: Search & Paid
d = "2026-11-09"
add(d, "08:45", "instagram", "STORY", dict(tpl="story", eyebrow="MONDAY QUESTION",
    head="Google your own company. What comes up first?", sub="That's what your buyers see too.", cta="Tell us what you found"))
add(d, "13:00", "instagram", "POST", dict(tpl="carousel", slides=[
    dict(eyebrow="SEARCH & PAID ADVERTISING", head="Get in front of the right people", sub="Three channels that work for industrial B2B."),
    dict(eyebrow="SEO", head="Be found for what you actually do", sub="Service pages written the way buyers search."),
    dict(eyebrow="GOOGLE ADS", head="Capture buyers who are ready now", sub="Tight keywords, clear landing pages, tracked enquiries."),
    dict(eyebrow="LINKEDIN ADS", head="Reach decision makers by role and industry", sub="Engineers, procurement, investors, operators."),
    dict(eyebrow="MEASURED", head="Every click tracked to an enquiry", sub="ignitedigitalpartners.com"),
    ]),
    "Industrial buyers search before they call. Investors research before they meet. Search and paid advertising make sure your company is the one they find.\n\nWe run SEO, Google Ads and LinkedIn Ads for industrial and resources companies, with every enquiry tracked back to its source.",
    CORE + " #SEO #GoogleAds #LinkedInAds")
add(d, "18:30", "instagram", "REEL", dict(tpl="reel", lines=[
    "Your buyer types", "exactly what you sell", "into Google.", "Your competitor shows up.", "You don't."],
    end="Search & paid ads\nignitedigitalpartners.com"),
    "If you're not showing up for the searches that matter, someone else is winning that work.",
    CORE + " #SEO #GoogleAds")
add(d, "11:30", "facebook", "POST", dict(tpl="post", theme="ivory", eyebrow="SEARCH & ADS",
    head="Be the company buyers find first.", sub="SEO, Google Ads and LinkedIn Ads."),
    "When a buyer searches for exactly what you do, does your company show up?\n\nWe help industrial and resources businesses get found with SEO, Google Ads and LinkedIn Ads, and we track every enquiry so you can see exactly what you're getting for your spend.\n\n" + CTA + ".",
    "#SEO #IgniteDigitalPartners")
add(d, "09:15", "linkedin", "POST", dict(tpl="post", theme="noir", eyebrow="LINKEDIN ADS",
    head="Small audiences, big contracts.", sub="Why LinkedIn works for industrial B2B."),
    "Small audiences, big contracts.\n\nIndustrial B2B rarely needs millions of impressions. It needs the right few hundred people: procurement leads at target companies, engineers who specify suppliers, investors who follow your sector.\n\nLinkedIn Ads are built for exactly that. Targeting by job title, industry and company means budget goes to people who can actually buy, invest or join.\n\nThe key is pairing the targeting with a clear message and a landing page that turns interest into a conversation.\n\nHave you tested LinkedIn Ads for your business yet?",
    "#LinkedInAds #B2BMarketing #IndustrialMarketing #ManufacturingMarketing")
add(d, "14:00", "gmb", "publication", dict(tpl="gbp", eyebrow="SEARCH & PAID ADVERTISING",
    head="SEO, Google Ads and LinkedIn Ads for industrial B2B", sub="Get found by the buyers searching for you."),
    "Are buyers finding your competitors instead of you? Ignite Digital Partners runs SEO, Google Ads and LinkedIn Ads for mining, energy, construction and manufacturing companies, putting you in front of the right buyers, partners and investors. Every enquiry is tracked back to its source so you can see what your spend delivers. Book a free 30-minute strategy call at ignitedigitalpartners.com.")

# ---------------- TUE 10 NOV: CRM & Reporting
d = "2026-11-10"
add(d, "08:45", "instagram", "STORY", dict(tpl="story", eyebrow="HONEST QUESTION",
    head="How many enquiries did marketing bring in last month?", sub="If you don't know, you're not alone.", cta="We can fix that"))
add(d, "13:00", "instagram", "POST", dict(tpl="post", theme="noir", eyebrow="CRM & REPORTING",
    head="If you can't measure it, you can't grow it.", sub="Lead tracking, email automation and simple dashboards."),
    "Spending on marketing without seeing what it brings in is like running a site without production data.\n\nWe set up lead tracking, email automation and simple dashboards for industrial and resources companies, so you can see exactly which channels bring enquiries and where to invest next.",
    CORE + " #CRM #MarketingAnalytics #MarketingAutomation")
add(d, "18:30", "instagram", "REEL", dict(tpl="reel", lines=[
    "You track tonnes.", "You track hours.", "You track safety.", "Why not track", "what marketing brings in?"],
    end="CRM & reporting\nignitedigitalpartners.com"),
    "Industrial businesses measure everything, except marketing. Let's change that.",
    CORE + " #MarketingAnalytics #CRM")
add(d, "11:30", "facebook", "REEL", dict(tpl="reel", lines=[
    "An enquiry comes in.", "Who owns it?", "Who replies?", "Where did it come from?", "CRM answers all four."],
    end="Ask us about CRM"),
    "A simple CRM and reporting setup means no enquiry is lost and you always know where your leads come from. We set it up for industrial businesses.",
    "#CRM #IgniteDigitalPartners")
add(d, "09:15", "linkedin", "POST", dict(tpl="post", theme="ivory", eyebrow="MEASUREMENT",
    head="Measure confidence, not just activity.", sub="Posts published is not a result."),
    "Posts published is not a result.\n\nMarketing reports are often full of activity: posts, impressions, emails sent. Useful, but not what a leadership team needs to make decisions.\n\nThe metrics we focus on for industrial and resources clients:\n• Qualified enquiries, by source\n• Time from enquiry to first conversation\n• Website visits from target companies and sectors\n• Investor and partner engagement around key updates\n\nA simple monthly dashboard with these numbers changes the marketing conversation from \"what did we do?\" to \"what did it achieve?\"",
    "#MarketingAnalytics #B2BMarketing #CRM #IndustrialMarketing")

# ---------------- WED 11 NOV: Remembrance + employer branding
d = "2026-11-11"
add(d, "08:45", "instagram", "STORY", dict(tpl="story", eyebrow="11 NOVEMBER",
    head="We remember.", sub="With gratitude to all who served.", cta="", theme="noir"))
add(d, "13:00", "instagram", "POST", dict(tpl="carousel", slides=[
    dict(eyebrow="EMPLOYER BRANDING", head="Winning better people in a tight market", sub="What candidates look for before they apply."),
    dict(eyebrow="01", head="A careers page that feels real", sub="Real people, real sites, real progression."),
    dict(eyebrow="02", head="Proof you take safety seriously", sub="Show the culture, not just the policy."),
    dict(eyebrow="03", head="A visible, active company", sub="Recent posts tell candidates you're growing."),
    dict(eyebrow="04", head="A simple way to apply", sub="Long forms lose good people."),
    dict(eyebrow="BRAND · WEBSITE · CONTENT", head="Recruitment is marketing too", sub="ignitedigitalpartners.com"),
    ]),
    "Contractors and industrial suppliers are competing for the same skilled people. The companies that win are the ones candidates can find, understand and trust before they apply.\n\nEmployer branding is part of every brand, website and content plan we build.",
    CORE + " #EmployerBranding #Recruitment #ConstructionIndustry #SkilledTrades")
add(d, "18:30", "instagram", "REEL", dict(tpl="reel", lines=[
    "Skilled candidates", "research you first.", "An empty careers page", "says more than you think.", "Show them why it's worth it."],
    end="Employer branding\nignitedigitalpartners.com"),
    "The best people choose employers who show them what it's like to work there.",
    CORE + " #EmployerBranding #Recruitment")
add(d, "11:30", "facebook", "POST", dict(tpl="post", theme="noir", eyebrow="11 NOVEMBER",
    head="We remember.", sub="With gratitude to all who served."),
    "Today we pause to remember all who served and sacrificed. With gratitude.",
    "#RemembranceDay #WeRemember")
add(d, "09:15", "linkedin", "POST", dict(tpl="post", theme="noir", eyebrow="EMPLOYER BRANDING",
    head="Recruitment is a marketing problem.", sub="Especially in construction and heavy industry."),
    "In construction, manufacturing and resources, recruitment is increasingly a marketing problem.\n\nSkilled candidates research employers the same way buyers research suppliers. They check the website, scroll LinkedIn and look for signs of a company that's growing, safe and worth joining.\n\nA few things that help:\n• A careers page with real people and real projects\n• Regular posts that show the work and the team\n• A short, simple application process\n\nThe companies that market themselves to talent win the people their competitors can't find.\n\nAnd on 11 November, a moment of gratitude for all who served.",
    "#EmployerBranding #ConstructionIndustry #Recruitment #IndustrialMarketing")
add(d, "14:00", "gmb", "publication", dict(tpl="gbp", eyebrow="HOW WE WORK",
    head="Free strategy call, clear plan, launch, monthly results", sub="Four simple steps."),
    "Working with Ignite Digital Partners is simple. 1. A free 30-minute strategy call to understand your goals. 2. We audit your brand, website and channels and agree a clear plan. 3. We build and launch what you need: messaging, website, content and campaigns. 4. Ongoing marketing with monthly reporting, so you can see the results. We specialise in mining, energy, construction and manufacturing. Book your call at ignitedigitalpartners.com.")

# ---------------- THU 12 NOV: World Quality Day + 2027 planning
d = "2026-11-12"
add(d, "08:45", "instagram", "STORY", dict(tpl="story", eyebrow="WORLD QUALITY DAY",
    head="You hold your products to a standard.", sub="Does your marketing meet it?", cta="Let's raise the bar"))
add(d, "13:00", "instagram", "POST", dict(tpl="post", theme="ivory", eyebrow="WORLD QUALITY DAY",
    head="Quality on the shop floor. Quality in the brand.", sub="Your marketing should match your standards."),
    "Happy World Quality Day.\n\nManufacturers and industrial suppliers invest heavily in quality: certifications, processes, inspections. Yet the brand, website and sales materials often don't reflect that same standard.\n\nIf your work is precise, your marketing should be too. That's what we help industrial companies achieve.",
    "#WorldQualityDay " + CORE + " " + MANUF)
add(d, "18:30", "instagram", "REEL", dict(tpl="reel", lines=[
    "ISO certified.", "Zero defects.", "Award-winning safety.", "Brochure from 2014.", "Time to match your standards."],
    end="World Quality Day\nignitedigitalpartners.com"),
    "Your quality standards are world class. Your marketing should say so. Happy World Quality Day.",
    "#WorldQualityDay " + CORE + " " + MANUF)
add(d, "11:30", "facebook", "POST", dict(tpl="post", theme="noir", eyebrow="PLAN 2027",
    head="2027 budgets are being set now.", sub="Make sure marketing has a real plan behind it."),
    "While consumer brands focus on Black Friday, B2B companies are quietly setting their 2027 budgets.\n\nIf marketing is in that budget, it deserves a real plan: clear goals, the right channels and monthly reporting. We help industrial and resources companies build exactly that.\n\n" + CTA + ".",
    "#Planning2027 #IgniteDigitalPartners")
add(d, "09:15", "linkedin", "POST", dict(tpl="post", theme="ivory", eyebrow="WORLD QUALITY DAY",
    head="Your marketing is part of your quality system.", sub="Buyers judge both."),
    "Today is World Quality Day.\n\nIn manufacturing and industrial supply, quality is measured, certified and audited. Buyers often judge it first, though, through a website, a capability statement or a proposal.\n\nIf those materials are dated, inconsistent or hard to follow, they quietly undermine the quality you've worked so hard to build.\n\nTreat your brand and marketing materials like any other output: clear standards, regular review and continuous improvement.\n\nAnd with 2027 budgets being set this month, it's the right moment to plan that review.",
    "#WorldQualityDay #Manufacturing #B2BMarketing #IndustrialMarketing")

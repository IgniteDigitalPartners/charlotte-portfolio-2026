# By Charlotte Smith content engine: 30 Oct to 12 Nov 2026
# Voice: warm, direct, first person, British spelling, no em dashes, no invented stats.
# Times are Europe/Malta.

SITE = "bycharlottesmith.com"

IG_CORE = "#ByCharlotteSmith #BrandStrategy #DigitalMarketing #SmallBusinessMarketing #MarketingTips #BrandIdentity #MaltaBusiness #SmallBusinessMalta #WomenInBusiness #Entrepreneur"
IG_WEB = "#WebsiteDesign #WebDesign #SmallBusinessWebsite #ConversionDesign"
IG_BF = "#BlackFriday #BlackFriday2026 #BlackFridayMarketing #Q4Marketing #EcommerceTips"
IG_GBP = "#GoogleBusinessProfile #LocalSEO #GoogleMaps #LocalBusiness"
IG_BRAND = "#BrandDesign #LogoDesign #BrandGuidelines #CanvaTemplates #VisualIdentity"
TT = "#workingmum #mumof4 #smallbusinessowner #marketingtok #maltatiktok #dayinmylife"

P = []  # every scheduled item

def add(date, time, net, fmt, visual, text="", tags="", **kw):
    P.append(dict(date=date, time=time, net=net, fmt=fmt, visual=visual,
                  text=(text.strip() + ("\n\n" + tags if tags else "")).strip(), **kw))

# ---------------------------------------------------------------- FRI 30 OCT
d = "2026-10-30"
add(d, "09:00", "instagram", "STORY", dict(tpl="story", eyebrow="FRIDAY QUESTION",
    head="When did you last update your Google profile?",
    sub="Photos, hours, services. It is often the first thing a new client sees.", cta="DM me 'GOOGLE'"))
add(d, "12:30", "instagram", "POST", dict(tpl="carousel", slides=[
    dict(eyebrow="GOOGLE BUSINESS PROFILE", head="5 things to fix before the weekend", sub="Swipe through. Each one takes minutes."),
    dict(eyebrow="01", head="Your hours", sub="Add holiday hours now, before November gets busy."),
    dict(eyebrow="02", head="Your services", sub="List each one in words your clients actually search for."),
    dict(eyebrow="03", head="Fresh photos", sub="Real work, real space. Phone photos in good light are fine."),
    dict(eyebrow="04", head="Reply to reviews", sub="Every one, good or bad. New clients read the replies."),
    dict(eyebrow="05", head="Post weekly", sub="A short update tells Google, and people, that you are open for business."),
    ]),
    "Your Google Business Profile is often the very first impression a new client gets, long before they see your website or walk through your door.\n\nHere are five quick fixes you can make this weekend. Save this so you have it to hand.\n\nIf you would rather hand it over, I set up and optimise Google profiles as a one-off service. Details at bycharlottesmith.com or send me a message.",
    IG_GBP + " " + IG_CORE)
add(d, "19:00", "instagram", "REEL", dict(tpl="reel", lines=[
    "Your Google profile", "is your new shop window.", "Hours. Photos. Reviews. Posts.", "Five minutes a week", "keeps it working for you."],
    end="Need it set up properly?\nbycharlottesmith.com"),
    "Five minutes a week on your Google profile can do more for local enquiries than a month of random posting. Start with hours, photos and replies to reviews.\n\nWant it done for you? Link in bio.",
    IG_GBP + " #MarketingTips #SmallBusinessMalta #ByCharlotteSmith")
add(d, "08:30", "linkedin", "POST", dict(tpl="post", theme="noir", eyebrow="LOCAL VISIBILITY",
    head="Most clients meet you on Google before they meet you.", sub="Is that first impression doing you justice?"),
    "Most new clients meet a local business on Google before they ever meet the people behind it.\n\nThey see the photos, the opening hours, the reviews and, just as importantly, how the owner replies to them. In a few seconds they decide whether to click, call or keep scrolling.\n\nYet the Google Business Profile is often the most neglected marketing asset a small business has. Set up once, years ago, and never touched again.\n\nThree questions worth asking this week:\n1. Would a stranger understand exactly what you offer from your profile alone?\n2. Do your photos reflect the business as it is today?\n3. Have you replied to every review from the last three months?\n\nIf any answer is no, that is the quickest win in your marketing right now.",
    "#GoogleBusinessProfile #LocalSEO #SmallBusinessMarketing #DigitalMarketing")
add(d, "11:00", "gmb", "publication", dict(tpl="gbp", eyebrow="GOOGLE PROFILE SETUP",
    head="Get found by the clients already searching for you", sub="Setup, optimisation and a simple posting plan."),
    "Is your Google Business Profile helping new clients find you? I set up and optimise Google Business Profiles for small businesses: accurate categories and services, keyword-rich descriptions, strong photos, review replies and a simple weekly posting plan you can keep up. One clear piece of work, done properly and handed over to you. Book a free welcome call at bycharlottesmith.com or email hello@bycharlottesmith.com.")
add(d, "20:30", "tiktok", "VIDEO", dict(tpl="tiktok", lines=[
    "friday night, kids finally asleep", "and I'm fixing a client's google profile", "because nobody updates theirs", "(be honest, when did you last check yours?)"]),
    "the glamorous side of running your own marketing business 😅 check your google profile this weekend, future you will thank you",
    TT + " #googlebusinessprofile #smallbusinesstips")

# ---------------------------------------------------------------- SAT 31 OCT (Halloween)
d = "2026-10-31"
add(d, "09:00", "instagram", "STORY", dict(tpl="story", eyebrow="HAPPY HALLOWEEN 🎃",
    head="The scariest thing in marketing?", sub="A website that hasn't been updated since 2019.", cta="Reply with your horror story"))
add(d, "12:30", "instagram", "POST", dict(tpl="carousel", slides=[
    dict(eyebrow="HALLOWEEN EDITION", head="4 marketing horrors I see every week", sub="Swipe if you dare."),
    dict(eyebrow="HORROR 01", head="The ghost website", sub="Old prices, old photos, a contact form nobody checks."),
    dict(eyebrow="HORROR 02", head="The disappearing brand", sub="Different logo, colours and fonts on every platform."),
    dict(eyebrow="HORROR 03", head="The haunted inbox", sub="Enquiries that wait days for a reply."),
    dict(eyebrow="HORROR 04", head="Posting into the void", sub="Content with no plan, no offer and no next step."),
    dict(eyebrow="THE GOOD NEWS", head="Every one of these is fixable", sub="One piece at a time. Message me to start."),
    ]),
    "Happy Halloween 🎃\n\nNo spooky costumes here, just the marketing horrors I see most often. The good news is that every one of them can be fixed, usually faster than people expect.\n\nWhich one are you guilty of? No judgement, I promise.",
    "#Halloween #Halloween2026 #MarketingMistakes " + IG_CORE)
add(d, "19:00", "instagram", "REEL", dict(tpl="reel", lines=[
    "POV: a new client finds you", "Your website: last updated 2019", "Your Instagram: three logos", "Your inbox: unanswered", "Happy Halloween 👻"],
    end="Let's make it less scary.\nbycharlottesmith.com"),
    "The only scary thing about your brand should be how good it looks 👻 Happy Halloween from me.",
    "#Halloween #MarketingHumour #SmallBusinessMarketing #BrandIdentity #ByCharlotteSmith #MarketingTips")
add(d, "10:00", "facebook", "POST", dict(tpl="post", theme="noir", eyebrow="HAPPY HALLOWEEN",
    head="Is your website a little bit haunted?", sub="Old prices. Old photos. A form nobody checks."),
    "Happy Halloween! 🎃\n\nA little seasonal question: is your website a bit haunted?\n\nOld prices that no longer apply, photos from a few years ago, a contact form that quietly sends enquiries into the void. It happens to the best businesses, because life gets busy.\n\nIf yours needs a refresh, I can help you bring it back to life, with clear pages, current content and a contact route that actually reaches you.\n\nHave a lovely, safe evening with whoever you are celebrating with.",
    "#Halloween #WebsiteRefresh #SmallBusiness #ByCharlotteSmith")
add(d, "20:30", "tiktok", "VIDEO", dict(tpl="tiktok", lines=[
    "halloween in our house:", "4 kids, 4 costume changes", "and me answering a client email", "dressed as a witch 🧙‍♀️", "happy halloween!"]),
    "mum mode and business mode, same night 🎃",
    TT + " #halloween #halloween2026")

# ---------------------------------------------------------------- SUN 1 NOV (new month, Movember, Black Friday countdown)
d = "2026-11-01"
add(d, "09:00", "instagram", "STORY", dict(tpl="story", eyebrow="HELLO NOVEMBER",
    head="Black Friday is 26 days away.", sub="Is your offer, email and landing page ready?", cta="Tap the link in bio"))
add(d, "12:30", "instagram", "POST", dict(tpl="post", theme="ivory", eyebrow="NOVEMBER · BLACK FRIDAY COUNTDOWN",
    head="Black Friday is won in early November.", sub="Plan now. Rush less. Sell better."),
    "Hello November.\n\nBlack Friday lands on 27 November this year, which means the businesses that do well are planning right now, not the week before.\n\nThis month I'll be sharing practical Black Friday prep for small businesses: offers, emails, landing pages and what to post. Follow along so you don't miss it.\n\nIf you'd like a hand building your plan, my 90-day marketing plans start with exactly this kind of thinking. Link in bio.",
    IG_BF + " #November #ByCharlotteSmith #SmallBusinessMarketing #MarketingTips")
add(d, "19:00", "instagram", "REEL", dict(tpl="reel", lines=[
    "4 weeks to Black Friday", "Week 1: choose one clear offer", "Week 2: build the landing page", "Week 3: warm up your email list", "Week 4: launch, then follow up"],
    end="Save this plan.\nbycharlottesmith.com"),
    "A simple four-week Black Friday plan for small businesses. Save it, share it with a business friend, and start with week one today.",
    IG_BF + " #MarketingPlan #ByCharlotteSmith")
add(d, "10:00", "facebook", "POST", dict(tpl="post", theme="ivory", eyebrow="MOVEMBER",
    head="This month, check in on the men in your life.", sub="Movember starts today."),
    "Movember starts today.\n\nA gentle reminder to check in on the men around you this month: partners, dads, brothers, friends and colleagues. Ask how they are really doing, and listen.\n\nIf you run a business, it's also a lovely moment to support a fundraiser or share a team member's Mo journey. Community comes first.",
    "#Movember #MensHealth #Community #ByCharlotteSmith")
add(d, "20:30", "tiktok", "VIDEO", dict(tpl="tiktok", lines=[
    "sunday reset, november edition", "laundry: mountain", "content plan: done for 2 weeks", "black friday plan: started", "one of these things is not like the others"]),
    "new month, same chaos, better plan 📅",
    TT + " #sundayreset #november")

# ---------------------------------------------------------------- MON 2 NOV (websites)
d = "2026-11-02"
add(d, "09:00", "instagram", "STORY", dict(tpl="story", eyebrow="MONDAY CHECK",
    head="Open your website on your phone.", sub="Can you book, buy or call in under 10 seconds?", cta="If not, DM me 'WEBSITE'"))
add(d, "12:30", "instagram", "POST", dict(tpl="carousel", slides=[
    dict(eyebrow="WEBSITES", head="A good small business website does 3 jobs", sub="Swipe."),
    dict(eyebrow="JOB 01", head="Says what you do in one line", sub="Clear beats clever. Visitors decide in seconds."),
    dict(eyebrow="JOB 02", head="Shows proof", sub="Real work, reviews and the faces behind the business."),
    dict(eyebrow="JOB 03", head="Makes the next step obvious", sub="One clear button: book, buy, call or enquire."),
    dict(eyebrow="NEW BUILDS · REFRESHES · LANDING PAGES", head="Let's make yours work harder", sub="bycharlottesmith.com"),
    ]),
    "Your website doesn't need to be complicated. It needs to do three jobs well: explain what you do, prove you're good at it, and make the next step easy.\n\nI build new websites, refresh tired ones and create landing pages for campaigns. Which of the three jobs is yours struggling with?",
    IG_WEB + " " + IG_CORE)
add(d, "19:00", "instagram", "REEL", dict(tpl="reel", lines=[
    "Your website has 5 seconds", "to answer three questions:", "What do you do?", "Who is it for?", "What do I do next?"],
    end="Website refreshes & new builds\nbycharlottesmith.com"),
    "If your homepage can't answer these three questions in five seconds, visitors leave. Test yours today.",
    IG_WEB + " #MarketingTips #ByCharlotteSmith #SmallBusinessMarketing")
add(d, "10:00", "facebook", "REEL", dict(tpl="reel", lines=[
    "Monday website test:", "Open it on your phone", "Find your prices", "Find your contact button", "Too slow? Time for a refresh."],
    end="Website refresh?\nMessage me"),
    "Try this quick Monday test on your own website. If anything takes longer than a few seconds to find, your visitors feel it too. I offer website refreshes, new builds and landing pages; send me a message to chat about yours.",
    "#WebsiteDesign #SmallBusiness #ByCharlotteSmith")
add(d, "08:30", "linkedin", "POST", dict(tpl="post", theme="noir", eyebrow="WEBSITES",
    head="Clear beats clever.", sub="Every time, on every homepage."),
    "Clear beats clever on a homepage. Every time.\n\nI review a lot of small business websites, and the most common issue isn't design. It's that the visitor can't tell, within a few seconds, what the business does and what to do next.\n\nA simple test: show your homepage to someone outside your industry for five seconds, then ask them:\n• What does this business do?\n• Who is it for?\n• What should I click?\n\nIf they hesitate on any of those, the fix is usually in the words, not the code.\n\nWhat's the clearest homepage headline you've seen recently?",
    "#WebsiteDesign #UXWriting #SmallBusinessMarketing #Conversion")
add(d, "11:00", "gmb", "publication", dict(tpl="gbp", eyebrow="WEBSITES",
    head="Website refreshes, new builds and landing pages", sub="Clear, mobile-friendly and built to convert."),
    "Need a website that works as hard as you do? I design new small business websites, refresh outdated ones and build focused landing pages for campaigns and offers. Every site is mobile-friendly, written in plain language, set up with basic SEO and built around one clear next step for your visitors. Book a free welcome call at bycharlottesmith.com.")
add(d, "20:30", "tiktok", "VIDEO", dict(tpl="tiktok", lines=[
    "school run done ✅", "coffee #1 done ✅", "client website launch day", "nervous? always", "proud? also always"]),
    "launch days never get old 🥹",
    TT + " #websitedesign #launchday")

# ---------------------------------------------------------------- TUE 3 NOV (Stress Awareness Week)
d = "2026-11-03"
add(d, "09:00", "instagram", "STORY", dict(tpl="story", eyebrow="STRESS AWARENESS WEEK",
    head="You don't have to do all the marketing at once.", sub="Pick one thing. Do it well.", cta="Breathe. Then plan."))
add(d, "12:30", "instagram", "POST", dict(tpl="post", theme="noir", eyebrow="STRESS AWARENESS WEEK",
    head="Marketing overwhelm is real.", sub="The fix is fewer things, done properly."),
    "It's Stress Awareness Week, so let's talk about marketing overwhelm.\n\nSo many business owners feel they should be on every platform, posting every day, running ads, sending emails and redesigning the website, all at once. That pressure is exhausting, and it rarely works.\n\nThe calmer approach: choose the one thing that would make the biggest difference this quarter, and do it properly. Then the next.\n\nThat's exactly how my 90-day marketing plans work. One step at a time.",
    "#StressAwarenessWeek #BusinessOwnerLife #MarketingStrategy " + IG_CORE)
add(d, "19:00", "instagram", "REEL", dict(tpl="reel", lines=[
    "You don't need to be everywhere.", "You need to be clear", "in the places your clients already are.", "Fewer channels.", "Better work. Less stress."],
    end="90-day marketing plans\nbycharlottesmith.com"),
    "A reminder for Stress Awareness Week: doing less, better, is a strategy, not a failure.",
    "#StressAwarenessWeek #MarketingStrategy #ByCharlotteSmith #SmallBusinessMarketing #Mindset")
add(d, "10:00", "facebook", "POST", dict(tpl="post", theme="ivory", eyebrow="BLACK FRIDAY PREP",
    head="Your Black Friday checklist, part one.", sub="Offer. Dates. Stock. Terms."),
    "Black Friday prep, part one: get the basics agreed before you design anything.\n\n✔ One clear offer (not five)\n✔ Start and end dates\n✔ Enough stock or capacity to deliver\n✔ Simple terms people understand\n\nOnce those four are settled, the graphics, emails and posts become much easier to create. Part two next week.",
    "#BlackFriday #SmallBusiness #MarketingTips #ByCharlotteSmith")
add(d, "08:30", "linkedin", "POST", dict(tpl="post", theme="ivory", eyebrow="STRESS AWARENESS WEEK",
    head="Focus is a marketing strategy.", sub="Not a nice-to-have."),
    "It's Stress Awareness Week, and I want to make a case for focus as a marketing strategy.\n\nIn more than ten years in marketing, I've seen the same pattern again and again: small teams spread across too many channels, producing a lot and achieving little. The stress isn't a sign they're doing it wrong. It's a sign they're doing too much.\n\nThe businesses that grow steadily usually do a few things consistently: a clear website, an up-to-date Google profile, one or two social channels and a regular email. That's it.\n\nIf your marketing feels heavy right now, what could you stop doing this month?",
    "#StressAwarenessWeek #MarketingStrategy #Leadership #SmallBusiness")
add(d, "20:30", "tiktok", "VIDEO", dict(tpl="tiktok", lines=[
    "stress awareness week", "reminder from a mum of 4", "who runs a business:", "you can't pour from an empty cup", "go drink some water 💛"]),
    "this one's for me as much as you",
    TT + " #stressawarenessweek #selfcare")

# ---------------------------------------------------------------- WED 4 NOV (Stress Awareness Day)
d = "2026-11-04"
add(d, "09:00", "instagram", "STORY", dict(tpl="story", eyebrow="QUICK POLL",
    head="Which feels hardest right now?", sub="A) Knowing what to post\nB) Finding the time\nC) Making it look good", cta="Reply A, B or C"))
add(d, "12:30", "instagram", "POST", dict(tpl="carousel", slides=[
    dict(eyebrow="STRESS AWARENESS DAY", head="A calmer way to plan your marketing", sub="My 3-phase approach. Swipe."),
    dict(eyebrow="PHASE 01 · CLARIFY", head="Days 1 to 30", sub="Agree your positioning, messages and audience before any spend."),
    dict(eyebrow="PHASE 02 · BUILD", head="Days 31 to 60", sub="Fix the website, set a realistic content rhythm, prepare tracking."),
    dict(eyebrow="PHASE 03 · GROW", head="Days 61 to 90", sub="Launch around one offer, measure, refine each month."),
    dict(eyebrow="90-DAY MARKETING PLAN", head="Clarity first. Then momentum.", sub="bycharlottesmith.com"),
    ]),
    "Today is Stress Awareness Day, and the most stressful marketing is the kind without a plan.\n\nThis is the simple three-phase structure I use with clients: Clarify, Build, Grow. Each phase builds the foundation the next one depends on, so nothing is rushed and nothing is wasted.\n\nSave this, and if you'd like a plan built around your business, the link is in my bio.",
    "#StressAwarenessDay #MarketingPlan #MarketingStrategy " + IG_CORE)
add(d, "19:00", "instagram", "REEL", dict(tpl="reel", lines=[
    "Clarify.", "Build.", "Grow.", "Three phases. Ninety days.", "No more random acts of marketing."],
    end="Get your 90-day plan\nbycharlottesmith.com"),
    "Random acts of marketing are tiring. A 90-day plan gives every post, email and page a job to do.",
    "#MarketingPlan #MarketingStrategy #ByCharlotteSmith #SmallBusinessMarketing #BusinessGrowth")
add(d, "10:00", "facebook", "POST", dict(tpl="post", theme="noir", eyebrow="STRESS AWARENESS DAY",
    head="Doing less, better, is still progress.", sub="Be kind to yourself today."),
    "It's Stress Awareness Day.\n\nIf you run a small business, you probably wear every hat: sales, admin, delivery, marketing, and life on top. Today is a good day to drop one thing from the list that doesn't really matter.\n\nAnd if marketing is the thing keeping you up at night, I'm happy to chat it through. No pressure, no jargon.",
    "#StressAwarenessDay #SmallBusinessOwner #ByCharlotteSmith")
add(d, "08:30", "linkedin", "POST", dict(tpl="carousel", slides=[
    dict(eyebrow="90-DAY STRATEGIC ROADMAP", head="Clarify. Build. Grow.", sub="How I structure a quarter of marketing."),
    dict(eyebrow="01 · CLARIFY · DAYS 1 TO 30", head="Shared foundation before any spend", sub="Positioning, messaging, audience, digital audit."),
    dict(eyebrow="02 · BUILD · DAYS 31 TO 60", head="The systems campaigns rely on", sub="Website, content system, channel roles, tracking."),
    dict(eyebrow="03 · GROW · DAYS 61 TO 90", head="Activate, measure, refine", sub="One core offer, SEO, controlled paid tests, one dashboard."),
    dict(eyebrow="THROUGHOUT", head="One decision log. Every action has an owner.", sub="Strategy creates direction. Execution creates momentum."),
    ]),
    "On Stress Awareness Day, a practical antidote to marketing chaos: a 90-day roadmap.\n\nThis is the structure I use with clients. Clarify first, so no budget is spent on the wrong message. Build second, so campaigns have a website, content rhythm and tracking to rely on. Grow third, launching around one core offer and refining monthly.\n\nThroughout: regular check-ins, a monthly review and a single decision log, so priorities stay visible.\n\nSwipe through, and tell me which phase most businesses skip. (I think I know.)",
    "#MarketingStrategy #Planning #B2BMarketing #StressAwarenessDay", li_pdf="90-Day Marketing Roadmap")
add(d, "11:00", "gmb", "publication", dict(tpl="gbp", eyebrow="90-DAY MARKETING PLANS",
    head="A clear marketing plan for the next 90 days", sub="Clarify. Build. Grow."),
    "Not sure where to focus your marketing? My 90-day marketing plans give small businesses a clear, realistic roadmap in three phases: Clarify your positioning and audience, Build the website, content and tracking you need, then Grow with focused campaigns you can measure. Practical, jargon-free and built around your time and budget. Book a free welcome call at bycharlottesmith.com.")
add(d, "20:30", "tiktok", "VIDEO", dict(tpl="tiktok", lines=[
    "things that stress me out:", "an inbox at 47 unread", "a client with no plan", "things that calm me down:", "a colour-coded 90 day plan 🤓"]),
    "yes I'm that person. no I won't change",
    TT + " #plannerlife #stressawarenessday")

# ---------------------------------------------------------------- THU 5 NOV (Bonfire Night, brand guides)
d = "2026-11-05"
add(d, "09:00", "instagram", "STORY", dict(tpl="story", eyebrow="BRAND CHECK",
    head="Same logo, colours and fonts everywhere?", sub="Website, Instagram, invoices, signage.", cta="Reply YES or OOPS"))
add(d, "12:30", "instagram", "POST", dict(tpl="carousel", slides=[
    dict(eyebrow="BRAND GUIDES", head="What goes in a simple brand guide", sub="Swipe. You need less than you think."),
    dict(eyebrow="01", head="Your logo and how to use it", sub="Main version, small version, light and dark backgrounds."),
    dict(eyebrow="02", head="Colours with exact codes", sub="So every designer, printer and app matches."),
    dict(eyebrow="03", head="Two fonts", sub="One for headings, one for everything else."),
    dict(eyebrow="04", head="Your voice", sub="A few words that describe how you sound, with examples."),
    dict(eyebrow="LOGOS · BRAND GUIDES · TEMPLATES", head="Look consistent everywhere", sub="bycharlottesmith.com"),
    ]),
    "Consistency is what makes a small brand look established. A simple brand guide is what makes consistency easy, for you and for anyone who helps you.\n\nI design logos and brand guides that are practical rather than precious, so you actually use them. Save this checklist for later.",
    IG_BRAND + " " + IG_CORE)
add(d, "19:00", "instagram", "REEL", dict(tpl="reel", lines=[
    "Remember, remember", "the fifth of November:", "a brand people remember", "looks the same", "every single time. 🎆"],
    end="Logos & brand guides\nbycharlottesmith.com"),
    "Bonfire Night reminder 🎆 Recognition comes from repetition. Same logo, same colours, same voice, everywhere.",
    IG_BRAND + " #BonfireNight #ByCharlotteSmith")
add(d, "10:00", "facebook", "POST", dict(tpl="post", theme="ivory", eyebrow="BRAND IDENTITY",
    head="People buy from brands they recognise.", sub="Recognition comes from consistency."),
    "People buy from brands they recognise, and recognition comes from consistency.\n\nIf your logo, colours and tone change from your shop sign to your Facebook page to your invoices, customers have to work harder to remember you.\n\nI create logos and simple brand guides that keep everything consistent, plus branded Canva templates so you can create on-brand posts yourself. Send me a message if you'd like to talk about yours.",
    "#Branding #LogoDesign #SmallBusiness #ByCharlotteSmith")
add(d, "08:30", "linkedin", "POST", dict(tpl="post", theme="noir", eyebrow="BRAND SYSTEMS",
    head="A brand guide nobody opens is just a PDF.", sub="Build it for the people who will use it."),
    "A brand guide nobody opens is just a PDF.\n\nThe most useful brand systems I've built weren't the most beautiful documents. They were the ones that answered everyday questions quickly: which logo goes on a dark background, what green exactly, how do we write a headline, where is the social template.\n\nMy approach:\n• Start with what's inconsistent today\n• Turn visual decisions into simple rules\n• Build templates around real use cases\n• Make it usable by non-designers\n\nWhat's the one brand rule your team breaks most often?",
    "#BrandStrategy #BrandGuidelines #Design #Marketing")
add(d, "20:30", "tiktok", "VIDEO", dict(tpl="tiktok", lines=[
    "me designing a logo for a client:", "47 versions", "3 cups of tea", "1 very patient partner", "and the client picks version 2 😂"]),
    "every designer knows this pain 🎨",
    TT + " #logodesign #designerlife")

# ---------------------------------------------------------------- FRI 6 NOV (Canva templates, FAQ)
d = "2026-11-06"
add(d, "09:00", "instagram", "STORY", dict(tpl="story", eyebrow="FRIDAY FAQ",
    head="\"Can I make my own posts and still look professional?\"", sub="Yes, with branded Canva templates.", cta="DM me 'TEMPLATES'"))
add(d, "12:30", "instagram", "POST", dict(tpl="post", theme="ivory", eyebrow="BRANDED CANVA TEMPLATES",
    head="Create your own posts. Keep them on brand.", sub="Templates built for your business, ready to edit."),
    "Not everyone wants to hand over their social media, and that's completely fine.\n\nBranded Canva templates give you the best of both: posts designed around your colours, fonts and logo, ready for you to drop in a photo and a few words. Your content looks consistent and professional, and you stay in control.\n\nWould templates make posting easier for you? Tell me in the comments.",
    IG_BRAND + " #CanvaDesign #SocialMediaTemplates #ByCharlotteSmith #SmallBusinessMarketing")
add(d, "19:00", "instagram", "REEL", dict(tpl="reel", lines=[
    "Before: a new design", "every single post.", "After: one set of branded templates.", "Swap the photo. Change the words.", "Post in five minutes."],
    end="Branded Canva templates\nbycharlottesmith.com"),
    "The fastest way to look consistent on social: branded templates you can edit yourself in minutes.",
    IG_BRAND + " #ContentCreation #ByCharlotteSmith")
add(d, "10:00", "facebook", "REEL", dict(tpl="reel", lines=[
    "Friday question:", "How long does one post take you?", "Two hours? One?", "With branded templates", "it can be five minutes."],
    end="Ask me about templates"),
    "If social media is eating your time, branded Canva templates could change your week. I design them around your brand so every post looks like it belongs. Message me to find out more.",
    "#Canva #SocialMediaTips #SmallBusiness #ByCharlotteSmith")
add(d, "08:30", "linkedin", "POST", dict(tpl="post", theme="ivory", eyebrow="CONTENT SYSTEMS",
    head="Templates are a strategy, not a shortcut.", sub="Consistency at scale, without a design team."),
    "Templates are a strategy, not a shortcut.\n\nFor small teams without an in-house designer, a well-built template set does three things:\n1. Protects the brand, because the important elements are locked in\n2. Saves time, because nobody starts from a blank page\n3. Makes content consistent, which builds recognition over months\n\nThe key is building templates around real formats: announcements, tips, testimonials, events, offers. Not one-off artwork.\n\nDo your team create content from templates, or from scratch every time?",
    "#ContentStrategy #BrandConsistency #Canva #MarketingOperations")
add(d, "11:00", "gmb", "publication", dict(tpl="gbp", eyebrow="BRAND & TEMPLATES",
    head="Logos, brand guides and branded Canva templates", sub="Look consistent everywhere you show up."),
    "Want your business to look professional and consistent everywhere? I design logos, simple brand guides and branded Canva templates so you can create your own on-brand social posts, flyers and offers in minutes. Practical branding for small businesses, handed over ready to use. Book a free welcome call at bycharlottesmith.com or email hello@bycharlottesmith.com.")
add(d, "20:30", "tiktok", "VIDEO", dict(tpl="tiktok", lines=[
    "friday feeling:", "work laptop closed 💻", "pizza ordered 🍕", "kids picking the movie", "(send help, it's frozen again)"]),
    "the week is done, the business survived, so did I 😌",
    TT + " #fridayfeeling #familytime")

# ---------------------------------------------------------------- SAT 7 NOV (behind the scenes)
d = "2026-11-07"
add(d, "09:00", "instagram", "STORY", dict(tpl="story", eyebrow="SATURDAY",
    head="Slow coffee. Big ideas. Zero meetings.", sub="How are you spending your weekend?", cta="Tell me ☕"))
add(d, "12:30", "instagram", "POST", dict(tpl="post", theme="noir", eyebrow="ABOUT ME",
    head="Hi, I'm Charlotte.", sub="10+ years helping businesses look as good online as they are in person."),
    "Lots of new faces here lately, so hello! 👋\n\nI'm Charlotte, a brand and digital marketing strategist with more than ten years' experience. I've worked with SaaS companies, property businesses, listed companies, trades, beauty and lifestyle brands, and I now help small businesses with websites, branding, Google profiles, social templates and clear marketing plans.\n\nI'm also a mum of four, so I understand being busy, and I keep everything practical.\n\nTell me about your business in the comments. I'd love to know who's here.",
    "#MeetTheFounder #WomenInBusiness #MarketingConsultant " + IG_CORE)
add(d, "19:00", "instagram", "REEL", dict(tpl="reel", lines=[
    "10+ years in marketing", "taught me one thing:", "clear always wins.", "Clear message. Clear website.", "Clear next step."],
    end="Hi, I'm Charlotte.\nbycharlottesmith.com"),
    "Ten years, a lot of brands, one lesson. Clarity sells.",
    "#MarketingConsultant #BrandStrategy #ByCharlotteSmith #WomenInBusiness #MarketingTips")
add(d, "10:00", "facebook", "POST", dict(tpl="post", theme="ivory", eyebrow="WEEKEND READ",
    head="3 quick wins for your business this weekend", sub="1. Update your Google photos  2. Reply to reviews  3. Check your website on mobile"),
    "Three quick wins you can do from the sofa this weekend:\n\n1. Add two or three new photos to your Google Business Profile\n2. Reply to any reviews you've missed\n3. Open your website on your phone and click every button\n\nTwenty minutes, and your business looks more current to every new customer who finds you next week. Enjoy your weekend!",
    "#SmallBusinessTips #WeekendVibes #ByCharlotteSmith")
add(d, "20:30", "tiktok", "VIDEO", dict(tpl="tiktok", lines=[
    "saturday plans:", "lie in? nope", "4 kids, 3 activities", "answering one 'quick' DM", "wine by 8pm 🍷"]),
    "weekend? never heard of her",
    TT + " #saturday #momlife")

# ---------------------------------------------------------------- SUN 8 NOV (Diwali)
d = "2026-11-08"
add(d, "09:00", "instagram", "STORY", dict(tpl="story", eyebrow="HAPPY DIWALI ✨",
    head="Wishing light, joy and prosperity", sub="to everyone celebrating today.", cta="✨"))
add(d, "12:30", "instagram", "POST", dict(tpl="post", theme="noir", eyebrow="HAPPY DIWALI",
    head="May your light shine brightly.", sub="Wishing joy and prosperity to all who celebrate."),
    "Happy Diwali ✨\n\nWishing light, joy and prosperity to everyone celebrating the festival of lights today, and to all the business owners in our community who are marking it with family and friends.",
    "#HappyDiwali #Diwali2026 #FestivalOfLights #ByCharlotteSmith")
add(d, "19:00", "instagram", "REEL", dict(tpl="reel", lines=[
    "Sunday planning for", "Black Friday week:", "Offer chosen? ✓", "Landing page drafted?", "Emails written?"],
    end="19 days to go.\nbycharlottesmith.com"),
    "Nineteen days to Black Friday. Where are you with your plan? Comment the number of ticks you have.",
    IG_BF + " #SundayPlanning #ByCharlotteSmith")
add(d, "10:00", "facebook", "POST", dict(tpl="post", theme="noir", eyebrow="HAPPY DIWALI",
    head="Light, joy and prosperity to all who celebrate.", sub=""),
    "Happy Diwali to everyone celebrating today ✨ Wishing you and your families a joyful festival of lights.",
    "#HappyDiwali #Diwali #ByCharlotteSmith")
add(d, "20:30", "tiktok", "VIDEO", dict(tpl="tiktok", lines=[
    "sunday night routine:", "uniforms ironed (ish)", "lunches prepped (ish)", "next week's content scheduled (fully)", "priorities 😂"]),
    "automating my socials so I can focus on the bit that matters",
    TT + " #sundaynight #contentcreator")

# ---------------------------------------------------------------- MON 9 NOV (Black Friday email)
d = "2026-11-09"
add(d, "09:00", "instagram", "STORY", dict(tpl="story", eyebrow="BLACK FRIDAY · 18 DAYS",
    head="Have you emailed your list this month?", sub="Warm them up before you sell to them.", cta="Reply YES or NOT YET"))
add(d, "12:30", "instagram", "POST", dict(tpl="carousel", slides=[
    dict(eyebrow="BLACK FRIDAY EMAIL PLAN", head="5 emails that do the heavy lifting", sub="Swipe and save."),
    dict(eyebrow="EMAIL 01 · NOW", head="The warm-up", sub="Helpful tip or story. No selling. Remind them you exist."),
    dict(eyebrow="EMAIL 02 · 1 WEEK BEFORE", head="The teaser", sub="Something is coming. Early access for subscribers."),
    dict(eyebrow="EMAIL 03 · BLACK FRIDAY", head="The launch", sub="One offer, one button, clear end date."),
    dict(eyebrow="EMAIL 04 · WEEKEND", head="The reminder", sub="Answer questions. Share a review."),
    dict(eyebrow="EMAIL 05 · CYBER MONDAY", head="Last chance", sub="Short, honest, final."),
    ]),
    "Social posts get seen. Emails get opened by people who already chose to hear from you, which is why email is often the hardest-working channel on Black Friday.\n\nHere's a simple five-email plan. Save it and start with the warm-up this week.",
    IG_BF + " #EmailMarketing #ByCharlotteSmith #MarketingTips")
add(d, "19:00", "instagram", "REEL", dict(tpl="reel", lines=[
    "Black Friday mistake no. 1:", "only emailing your list", "when you want to sell.", "Warm them up first.", "Help, then offer."],
    end="18 days to go.\nbycharlottesmith.com"),
    "If the only time customers hear from you is when you want something, the offer lands cold. Send something helpful this week.",
    IG_BF + " #EmailMarketing #ByCharlotteSmith")
add(d, "10:00", "facebook", "POST", dict(tpl="post", theme="ivory", eyebrow="BLACK FRIDAY PREP · PART TWO",
    head="Build one landing page for your offer.", sub="Not your homepage. One page, one offer, one button."),
    "Black Friday prep, part two: give your offer its own page.\n\nSending everyone to your homepage makes them hunt for the deal. A simple landing page with the offer, the dates, a few reviews and one clear button converts far better.\n\nI build campaign landing pages that can be reused for future offers too. Message me if you'd like one ready in time.",
    "#BlackFriday #LandingPage #SmallBusiness #ByCharlotteSmith")
add(d, "08:30", "linkedin", "POST", dict(tpl="post", theme="noir", eyebrow="BLACK FRIDAY · Q4",
    head="Discounts don't fix unclear offers.", sub="Clarity converts. Then price."),
    "Discounts don't fix unclear offers.\n\nEvery November I see businesses reach for a bigger percentage off when the real issue is that customers don't understand what they're buying, why it's worth it, or why now.\n\nBefore deciding your Black Friday discount, check:\n• Can you explain the offer in one sentence?\n• Is there one place (a landing page) that explains it fully?\n• Have you warmed up your audience with something useful first?\n\nGet those right, and you may not need the deepest discount at all.",
    "#BlackFriday #Q4Marketing #Ecommerce #MarketingStrategy")
add(d, "11:00", "gmb", "publication", dict(tpl="gbp", eyebrow="BLACK FRIDAY READY",
    head="Landing pages and campaign plans for Black Friday", sub="18 days to go."),
    "Black Friday is on 27 November. Is your business ready? I build focused campaign landing pages, plan Black Friday email sequences and create branded social graphics, so your offer is clear, consistent and easy to buy. There is still time to get everything ready if we start this week. Book a free welcome call at bycharlottesmith.com.")
add(d, "20:30", "tiktok", "VIDEO", dict(tpl="tiktok", lines=[
    "my kids asking what I do for work:", "'you make posts?'", "'you make websites?'", "'so you're on your phone all day?'", "...technically yes 🙃"]),
    "explaining marketing to children is harder than explaining it to clients",
    TT + " #mumlife #whatido")

# ---------------------------------------------------------------- TUE 10 NOV (SEO / Google)
d = "2026-11-10"
add(d, "09:00", "instagram", "STORY", dict(tpl="story", eyebrow="SEO IN PLAIN ENGLISH",
    head="Google can't rank what it can't understand.", sub="Say what you do, and where, in plain words.", cta="More tips on my feed"))
add(d, "12:30", "instagram", "POST", dict(tpl="carousel", slides=[
    dict(eyebrow="SEO BASICS", head="4 SEO fixes any small business can do", sub="No tech skills needed. Swipe."),
    dict(eyebrow="01", head="One page per service", sub="A clear page for each thing you sell, named the way clients search."),
    dict(eyebrow="02", head="Write the title tags", sub="Service + location + business name on every page."),
    dict(eyebrow="03", head="Answer real questions", sub="Prices, process, timings. The questions you hear every week."),
    dict(eyebrow="04", head="Keep Google profile and website matching", sub="Same name, contact details and services everywhere."),
    ]),
    "SEO sounds technical, but the foundations are mostly about clear writing and consistency.\n\nThese four fixes help Google, and people, understand exactly what you offer. Save this for your next website update, or send it to whoever looks after your site.",
    "#SEO #SEOTips #LocalSEO #SmallBusinessSEO " + IG_CORE)
add(d, "19:00", "instagram", "REEL", dict(tpl="reel", lines=[
    "SEO in one sentence:", "Say what you do,", "where you do it,", "in the words your clients use.", "Then keep saying it."],
    end="SEO-ready websites\nbycharlottesmith.com"),
    "SEO doesn't have to be mysterious. Start with clear words on clear pages.",
    "#SEO #LocalSEO #WebsiteTips #ByCharlotteSmith #MarketingTips")
add(d, "10:00", "facebook", "REEL", dict(tpl="reel", lines=[
    "How do people find you?", "Google search.", "Google Maps.", "A friend's recommendation.", "Be ready for all three."],
    end="Message me to get found"),
    "Most new customers find local businesses through search, maps or a recommendation, and they usually check you online either way. Is your website and Google profile ready for them? I can help with both.",
    "#LocalSEO #GoogleMaps #SmallBusiness #ByCharlotteSmith")
add(d, "08:30", "linkedin", "POST", dict(tpl="post", theme="ivory", eyebrow="SEO",
    head="Most SEO problems are writing problems.", sub="Fix the words before the code."),
    "Most small business SEO problems are writing problems.\n\nNot slow servers or missing schema, though those matter eventually. The bigger issue is usually that the website never clearly says what the business does, for whom, and where.\n\nA quick audit you can do today:\n• Does each service have its own page?\n• Does each page title say what the page is about?\n• Do you answer the questions clients ask on calls?\n\nFix the words first. The rankings follow more easily.",
    "#SEO #ContentStrategy #WebsiteStrategy #SmallBusinessMarketing")
add(d, "20:30", "tiktok", "VIDEO", dict(tpl="tiktok", lines=[
    "googling 'marketing near me'", "to check my own business shows up", "it does 🎉", "this is my cardio now"]),
    "small wins count 🙌",
    TT + " #seo #smallwins")

# ---------------------------------------------------------------- WED 11 NOV (Singles' Day, Remembrance)
d = "2026-11-11"
add(d, "09:00", "instagram", "STORY", dict(tpl="story", eyebrow="11 NOVEMBER",
    head="Today we remember.", sub="With gratitude to all who served.", cta="", theme="noir"))
add(d, "12:30", "instagram", "POST", dict(tpl="post", theme="ivory", eyebrow="11.11 · SINGLES' DAY",
    head="The world's biggest shopping day isn't Black Friday.", sub="It's 11.11. A reminder that online shoppers are ready to buy in November."),
    "Today is 11.11, Singles' Day, which started in China and has grown into one of the biggest online shopping days in the world.\n\nThe lesson for small businesses: November buyers are already in shopping mode. If your website, offer and emails are ready early, you catch them sooner.\n\nAre you running anything before Black Friday, or saving it all for the 27th?",
    "#SinglesDay #1111 #Ecommerce " + IG_BF + " #ByCharlotteSmith")
add(d, "19:00", "instagram", "REEL", dict(tpl="reel", lines=[
    "Your Black Friday checklist:", "✓ One clear offer", "✓ One landing page", "✓ Emails scheduled", "✓ Posts designed and ready"],
    end="16 days to go.\nbycharlottesmith.com"),
    "Sixteen days to Black Friday. How many of these can you tick off?",
    IG_BF + " #MarketingChecklist #ByCharlotteSmith")
add(d, "10:00", "facebook", "POST", dict(tpl="post", theme="noir", eyebrow="11 NOVEMBER",
    head="We remember.", sub="With gratitude to all who served."),
    "Today we pause to remember all who served and sacrificed. With gratitude.",
    "#RemembranceDay #WeRemember")
add(d, "08:30", "linkedin", "POST", dict(tpl="post", theme="noir", eyebrow="11.11 · Q4 ECOMMERCE",
    head="November shoppers start early.", sub="Is your offer ready before they are?"),
    "Today is 11.11, Singles' Day, one of the largest online shopping days in the world.\n\nFor European and UK businesses it's a useful signal: consumers are in buying mode well before Black Friday. The brands that perform best in Q4 tend to have their offer, landing page and email sequence ready in early November, then build momentum rather than relying on a single day.\n\nIf your Black Friday plan is still an idea, this week is the moment to make it real.\n\nAnd on 11 November, a moment of respect for all who served.",
    "#Ecommerce #BlackFriday #Q4Marketing #RetailMarketing")
add(d, "11:00", "gmb", "publication", dict(tpl="gbp", eyebrow="MONTHLY SOCIAL ESSENTIALS",
    head="Consistent social media, without the stress", sub="€195 a month. Cancel anytime."),
    "Want your social media to look consistent without spending hours on it? Monthly Social Essentials gives your business regular, on-brand social content planned and designed for you, for €195 a month with no long contract, cancel anytime. Perfect for small businesses that want to stay visible while focusing on their customers. Find out more at bycharlottesmith.com.")
add(d, "20:30", "tiktok", "VIDEO", dict(tpl="tiktok", lines=[
    "11.11 is singles' day", "my version:", "single cup of coffee", "single quiet minute", "before the school pick up chaos ☕"]),
    "take the small moments when you can",
    TT + " #singlesday #1111")

# ---------------------------------------------------------------- THU 12 NOV (Monthly Social Essentials, testimonials ask)
d = "2026-11-12"
add(d, "09:00", "instagram", "STORY", dict(tpl="story", eyebrow="QUESTION",
    head="If someone made your posts every month,", sub="what would you do with the time back?", cta="Tell me 👇"))
add(d, "12:30", "instagram", "POST", dict(tpl="post", theme="noir", eyebrow="MONTHLY SOCIAL ESSENTIALS",
    head="On-brand social content, every month.", sub="€195 a month. No long contract. Cancel anytime."),
    "Consistency is the hardest part of social media for most small businesses. Not the ideas, not the design, just keeping it going every single week.\n\nThat's why I created Monthly Social Essentials: regular, on-brand content planned and designed for your business, for €195 a month. No long contract, cancel anytime.\n\nDetails at bycharlottesmith.com, or send me a message with any questions.",
    "#SocialMediaManagement #SocialMediaMarketing #ContentCreation " + IG_CORE)
add(d, "19:00", "instagram", "REEL", dict(tpl="reel", lines=[
    "You run the business.", "I keep your socials", "consistent, on-brand", "and posting every week.", "€195 a month. Cancel anytime."],
    end="Monthly Social Essentials\nbycharlottesmith.com"),
    "Hand over the posting, keep the results. Monthly Social Essentials, €195 a month, no long contract.",
    "#SocialMediaManager #SocialMediaMarketing #ByCharlotteSmith #SmallBusinessMarketing #ContentCreation")
add(d, "10:00", "facebook", "POST", dict(tpl="post", theme="ivory", eyebrow="MONTHLY SOCIAL ESSENTIALS",
    head="Stay visible without the weekly scramble.", sub="€195 a month · cancel anytime"),
    "Do you start every week thinking \"I really should post something\"?\n\nMonthly Social Essentials takes that off your plate: regular, on-brand posts planned and designed for your business, for €195 a month with no long contract.\n\nIf you'd like to know whether it's a good fit for you, send me a message or visit bycharlottesmith.com.",
    "#SocialMedia #SmallBusiness #ByCharlotteSmith")
add(d, "08:30", "linkedin", "POST", dict(tpl="post", theme="ivory", eyebrow="CONSISTENCY",
    head="Consistency compounds.", sub="Visibility built weekly beats visibility built in bursts."),
    "Consistency compounds.\n\nA business that posts something useful every week for a year will almost always build more trust than one that posts in bursts around launches. Not because each post is brilliant, but because the brand becomes familiar.\n\nThe challenge for small businesses is rarely ideas. It's capacity. Which is why I'm a big fan of systems: a simple content calendar, branded templates and, where it helps, a bit of automation.\n\nHow far ahead is your content planned right now?",
    "#ContentStrategy #SocialMediaMarketing #MarketingSystems #SmallBusiness")
add(d, "20:30", "tiktok", "VIDEO", dict(tpl="tiktok", lines=[
    "how I post every day", "with 4 kids and a business:", "I don't.", "I plan it two weeks ahead", "and let the robots post it 🤖"]),
    "work smarter, then go to the beach 🌊",
    TT + " #contentplanning #automation")

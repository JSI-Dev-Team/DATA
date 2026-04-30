export type FaqItem = {
  id: string;
  question: string;
  /** Trusted static HTML; styled via `.faq-answer` in theme.css */
  answerHtml: string;
};

export type FaqSection = {
  id: string;
  title: string;
  items: FaqItem[];
};

export const faqSections: FaqSection[] = [
  {
    id: "general",
    title: "Getting started",
    items: [
      {
        id: "never-danced",
        question: "My child has never danced before. Where do we start?",
        answerHtml: `<p>Start right here! Most of our students walk through the door for the first time not knowing a plié from a pirouette — and that is completely fine. The best first step is to book a free trial class so your child can try a style that sounds fun to them (ballet, jazz, and hip-hop are popular picks for beginners). Our teachers are used to first-timers, and your child will never be singled out or put on the spot. Call us at <a href="tel:+15068471164">(506) 847-1164</a>, email <a href="mailto:dynamicacademyofthearts@gmail.com">dynamicacademyofthearts@gmail.com</a>, or register online through our Jackrabbit parent portal to claim your free trial.</p>`,
      },
      {
        id: "ages",
        question: "What ages do you teach?",
        answerHtml: `<p>We welcome students from age 3 all the way through 18, and we also offer Adult classes for grown-ups who want to dance (or come back to dancing). Our youngest dancers — ages 3 to 5 — take developmentally appropriate introductory classes built around movement, music, and fun. As students get older, they can move into recreational classes, the Advanced Training Program, or our Competitive stream. Whatever age your child is, there is a class that fits where they are right now.</p>`,
      },
      {
        id: "free-trial",
        question: "Do you offer a free trial class? How do I book one?",
        answerHtml: `<p>Yes — every new student gets one free trial class, no strings attached. It's a chance for your child to try the style they're curious about, meet their teacher, and see if the studio feels like a good fit. To book, just reach out to us by phone at <a href="tel:+15068471164">(506) 847-1164</a>, by email at <a href="mailto:dynamicacademyofthearts@gmail.com">dynamicacademyofthearts@gmail.com</a>, or register through our Jackrabbit parent portal on the website. We'll match your child with the right class for their age and experience level.</p>`,
      },
      {
        id: "what-to-wear",
        question: "What should my child wear to their first class?",
        answerHtml: `<p>For their first trial class, comfortable athletic wear is totally fine — leggings, a t-shirt, bare feet or socks. Once you decide to register, we'll let you know the dress code for their specific class (it varies by style and level). Ballet classes have a specific uniform, while hip-hop and jazz are more relaxed. Hair should be pulled back and away from the face. Don't worry about getting everything perfect before day one — our front desk team is happy to walk you through what your child will need when you enroll.</p>`,
      },
    ],
  },
  {
    id: "classes-schedule",
    title: "Classes, schedule & season",
    items: [
      {
        id: "season-start",
        question: "When does the 2026–2027 season start?",
        answerHtml: `<p>The 2026–2027 season registration details will be announced closer to the end of the current season. The best way to stay in the loop is to download the DATA App (available on the App Store and Google Play), keep an eye on our website, or make sure we have your email on file through the Jackrabbit parent portal. We always give families plenty of notice so you can plan ahead. If you have questions in the meantime, give us a call at <a href="tel:+15068471164">(506) 847-1164</a>.</p>`,
      },
      {
        id: "multiple-styles",
        question: "Can my child take multiple styles of dance?",
        answerHtml: `<p>Absolutely — and it's actually one of the best things a dancer can do. Taking more than one style builds a more well-rounded dancer and makes learning each individual style easier over time. When you add a second class, you get 30% off that class, and families with siblings in the studio save $5.00 per month per sibling. Just keep in mind that class availability depends on your child's age and schedule. Our team is happy to help you put together a schedule that works without burning anyone out.</p>`,
      },
      {
        id: "rec-atp-comp",
        question: "What's the difference between Recreational, ATP, and Competitive?",
        answerHtml: `<p>Recreational classes are for students who love to dance and want to learn in a supportive, low-pressure environment — no audition required, no competition commitments. The Advanced Training Program (ATP) comes in three levels and is designed for students who want to develop serious technical skills, including RAD-certified ballet training. The Competitive Program is for dancers who want to perform and compete at regional and national events — it comes in Part-Time and Full-Time streams. Not sure which fits your child? Book a free trial and we'll help you figure it out together.</p>`,
      },
      {
        id: "adult-classes",
        question: "Do you offer adult classes?",
        answerHtml: `<p>Yes, we do! Adult classes are a wonderful way to start dancing for the first time, return to something you loved years ago, or simply move and have fun. Our adult students range from complete beginners to people who danced competitively when they were younger. Check our current schedule on the website or through the Jackrabbit parent portal for available adult class times and styles. You're also welcome to call us at <a href="tel:+15068471164">(506) 847-1164</a> — we're happy to help you find the right fit.</p>`,
      },
    ],
  },
  {
    id: "tuition",
    title: "Tuition, fees & payment",
    items: [
      {
        id: "how-much",
        question: "How much does it cost?",
        answerHtml: `<p>Recreational tuition is based on class length and can be paid monthly or annually (annual rates offer a small discount):</p>
<ul>
<li>30-minute class: $48.30/month or $434.70/year + HST</li>
<li>60-minute class: $61.70/month or $555.30/year + HST</li>
<li>90-minute class: $86.40/month or $777.60/year + HST</li>
<li>2-hour class: $98.75/month or $888.75/year + HST</li>
</ul>
<p>There is also a one-time registration fee of $35.00 + HST per student. Competitive Program pricing varies by stream — please see the Competitive Program page for current details. All fees are subject to HST.</p>`,
      },
      {
        id: "included-extra",
        question: "What's included in tuition? What's extra?",
        answerHtml: `<p>Monthly tuition covers your child's class instruction for the season. It does not include the registration fee ($35.00 + HST per student), costumes for the recital ($75.00 + HST deposit per costume), or any competition fees that apply to Competitive Program families. Some families also purchase dancewear and shoes, which are not included. We try to be upfront about all costs so there are no surprises mid-season. If you have questions about what to budget for, our front desk team is glad to walk you through a full picture before you register.</p>`,
      },
      {
        id: "how-pay",
        question: "How do I pay? What payment methods do you accept?",
        answerHtml: `<p>Tuition is managed through our Jackrabbit parent portal, where you can set up a payment method and view your account, invoices, and payment history all in one place. You can also download the DATA App (App Store and Google Play) to manage your account on the go. If you need help setting up your account or have questions about billing, contact us at <a href="mailto:dynamicacademyofthearts@gmail.com">dynamicacademyofthearts@gmail.com</a> or call <a href="tel:+15068471164">(506) 847-1164</a> and we'll sort it out with you directly.</p>`,
      },
      {
        id: "discounts",
        question: "Do you offer sibling discounts or multi-class discounts?",
        answerHtml: `<p>Yes to both! Families with more than one sibling enrolled save $5.00 per month on tuition. If any student takes more than one class, the second class is 30% off. These discounts are applied automatically in the Jackrabbit system — no need to ask each month. If you ever notice a discrepancy on your invoice, just reach out and we'll take a look.</p>`,
      },
    ],
  },
  {
    id: "competitive",
    title: "Competitive program",
    items: [
      {
        id: "competitive-how",
        question: "How does the Competitive Program work? How do I audition?",
        answerHtml: `<p>The Competitive Program is for dancers who are ready to put in more time, build stronger technique, and perform at competitions throughout the season. It comes in Part-Time and Full-Time streams, so the commitment level can flex to fit your family's life. Placement is by audition — our faculty look at technique, work ethic, and readiness, not just natural ability. Audition dates are announced each spring. For current pricing, competition schedules, and audition details, please see the Competitive Program page on our website or call us at <a href="tel:+15068471164">(506) 847-1164</a>.</p>`,
      },
      {
        id: "rad",
        question: "What is RAD certification and why does it matter?",
        answerHtml: `<p>RAD stands for the Royal Academy of Dance — it's one of the most recognized international bodies for ballet education. RAD-certified training means your child is learning ballet through a standardized, graded syllabus that emphasizes proper technique, musicality, and safe physical development. Students in RAD programs can take official graded exams, which give them a recognized credential that travels with them if they ever move, switch studios, or pursue dance at a higher level. DATA carries RAD certification forward from the Rothesay Ballet tradition, led in part by Miss Sylvia Logan, who founded Rothesay Ballet School in 1975 and has taught RAD ballet in this community for nearly five decades.</p>`,
      },
    ],
  },
  {
    id: "recitals",
    title: "Recitals & performances",
    items: [
      {
        id: "recital-tickets",
        question: "When is the recital? How much are tickets?",
        answerHtml: `<p>Our year-end production is called the Artists in Motion Showcase. Dates and ticket pricing for each season are announced through the Jackrabbit parent portal and the DATA App as the recital approaches. We recommend downloading the app and making sure your contact information is up to date so you don't miss the announcement. Ticket details will also be posted on our website. Every dancer performs — it's one of the highlights of the year for students and families alike.</p>`,
      },
      {
        id: "nutcracker",
        question: "Will the Nutcracker tradition continue after the Rothesay Ballet merger?",
        answerHtml: `<p>Yes — and we are proud of that. The Nutcracker was a cornerstone of Rothesay Ballet for more than 40 years, and it remains part of who we are as a school. Bringing that tradition into DATA means more students across all programs will have the chance to be part of something that generations of families in this community have loved. Details on the upcoming Nutcracker season will be shared through the Jackrabbit portal and the DATA App. It's not going anywhere.</p>`,
      },
    ],
  },
  {
    id: "merger-access",
    title: "The merger, languages & access",
    items: [
      {
        id: "merger-family",
        question: "What does the Rothesay Ballet + DATA merger mean for my family?",
        answerHtml: `<p><strong>The tradition of Rothesay Ballet. The energy of DATA. One school, one community, one stage.</strong></p>
<p>For Rothesay Ballet families, this means your child's training, their teachers (including Miss Sylvia Logan and the full Rothesay Ballet faculty), and the classical foundation you chose are all continuing — just with a broader program, more styles, and a bigger community around them. For DATA families, it means access to one of the region's most respected classical ballet legacies, including RAD certification and the Nutcracker tradition. Nothing important is being lost. Both communities are being brought together in a school that is stronger for it. If you have specific questions about how the transition affects your child's placement, class, or fees, please call us at <a href="tel:+15068471164">(506) 847-1164</a> — we're happy to talk it through.</p>`,
      },
      {
        id: "french",
        question: "Do you offer classes in French? / Offrez-vous des cours en français?",
        answerHtml: `<p><strong>English:</strong> We are committed to welcoming francophone and bilingual families. While our in-studio programming is currently delivered primarily in English, our team is happy to communicate with families in French whenever needed — including during your free trial class. We are actively rolling out French content on our website, with full bilingual coverage planned by June 30, 2026. Email us at <a href="mailto:dynamicacademyofthearts@gmail.com">dynamicacademyofthearts@gmail.com</a> or call <a href="tel:+15068471164">(506) 847-1164</a> to arrange your trial in French.</p>
<p><strong>Français :</strong> Nous accueillons chaleureusement les familles francophones et bilingues chez DATA. Votre classe d'essai gratuite peut se dérouler en français — il suffit de nous le préciser au moment de la réservation. Nous travaillons également à offrir le contenu de notre site Web en français, et une version complète sera disponible d'ici le 30 juin 2026.</p>`,
      },
      {
        id: "accessibility",
        question: "Is the studio accessible and inclusive for all families?",
        answerHtml: `<p>Yes, and this matters to us. Our studio at 6 Market Street, Quispamsis is accessible to students and families with mobility needs. If you have a specific accommodation request — whether related to physical access, a learning or sensory need, or anything else — please reach out before your first visit so we can make sure everything is in place. We welcome dancers of all bodies, backgrounds, abilities, and family structures. No dancer should feel like they don't belong here. Our DEIA commitment shapes how we hire, how we teach, and how we build community in this studio. If you have questions or concerns, email us at <a href="mailto:dynamicacademyofthearts@gmail.com">dynamicacademyofthearts@gmail.com</a> and we'll respond personally.</p>`,
      },
    ],
  },
  {
    id: "logistics",
    title: "Logistics & support",
    items: [
      {
        id: "contact-support",
        question: "How do I contact the studio, manage my account, or get support?",
        answerHtml: `<p>There are a few easy ways to stay connected. For general questions, reach us at:</p>
<ul>
<li><strong>Phone:</strong> <a href="tel:+15068471164">(506) 847-1164</a></li>
<li><strong>Email:</strong> <a href="mailto:dynamicacademyofthearts@gmail.com">dynamicacademyofthearts@gmail.com</a></li>
<li><strong>Address:</strong> 6 Market Street, Quispamsis NB E2E 4B1</li>
</ul>
<p>To manage your registration, make payments, or view your schedule, log in to the Jackrabbit parent portal through our website. You can also download the DATA App (available on the App Store and Google Play) to get updates, notifications, and account access right on your phone. If something is urgent, calling is always the fastest way to reach us.</p>`,
      },
    ],
  },
  {
    id: "merger-partnership",
    title: "Merger / partnership — Rothesay Ballet School & D.A.T.A.",
    items: [
      {
        id: "partnership-q17",
        question: "What is happening with Rothesay Ballet School and Dynamic Academy of The Arts?",
        answerHtml: `<p>On April 9, 2026, Rothesay Ballet School and Dynamic Academy of The Arts publicly announced that the two schools are coming together. Effective July 1, 2026, all programs, all faculty, and all students join under one creative family across two locations — Rothesay and Quispamsis. Classes under the combined school begin July 2026.</p>`,
      },
      {
        id: "partnership-q18",
        question: "Why now? How did this come about?",
        answerHtml: `<p>The two schools have been working together quietly for some time. DATA and Rothesay Ballet School have run successful joint summer intensives, and some DATA dancers performed in Rothesay Ballet's Nutcracker last season. Bringing the schools together formalizes what has already been working.</p>`,
      },
      {
        id: "partnership-q19",
        question: "Will my child's teachers change? Will the classes change?",
        answerHtml: `<p>No. Your teachers stay. The Royal Academy of Dance (RAD) classical ballet program continues under the same faculty. What changes is what's available to your dancer in addition — access to DATA's jazz, tap, hip-hop, lyrical, acro, contemporary, and musical theatre programs without leaving the school you know.</p>`,
      },
      {
        id: "partnership-q20",
        question: "What happens to the Nutcracker?",
        answerHtml: `<p>The annual Nutcracker continues. Gala Ballet Productions — Rothesay Ballet School's long-running production entity — will present the annual Nutcracker, powered by Dynamic Academy of The Arts. The production honours 50 years of tradition (Est. 1975) while the combined school shapes what comes next.</p>`,
      },
      {
        id: "partnership-q21",
        question: "Two locations — how will this work day to day?",
        answerHtml: `<p>The combined school operates across two locations in the Kennebecasis Valley:</p>
<ul>
<li>6 Market Street, Quispamsis NB — DATA's current home</li>
<li>[JS à valider: RBS Rothesay address — confirm whether 63 Marr Rd continues as the second location] Dan Gallant</li>
<li>[JS à valider: class placement logic across the two locations] Dan Gallant</li>
</ul>`,
      },
      {
        id: "partnership-q22",
        question: "When does registration open? When do classes start?",
        answerHtml: `<ul>
<li>Effective date of the merger: July 1, 2026</li>
<li>Classes begin: July 2026 (summer programming)</li>
<li>Season 2026–2027 registration opens: [JS à valider: confirmed internally as May 1, 2026 — needs public commitment]</li>
</ul>`,
      },
      {
        id: "partnership-q23",
        question: "I'm a current Rothesay Ballet School parent. What do I need to do right now?",
        answerHtml: `<p>Short answer: nothing urgent, and come to the meeting. Rothesay Ballet School has scheduled an in-person information session for current RBS families on Friday, April 24, 2026 at 5:30 PM. [JS à valider: confirm meeting location]</p>`,
      },
      {
        id: "partnership-q24",
        question: "I'm a current DATA parent. Does anything change for me?",
        answerHtml: `<p>Your dancer's teachers, classes, and schedule stay as-is. What opens up is access to RAD classical ballet and a deeper ballet pathway — whether as a core discipline or a supplement to a competitive track.</p>`,
      },
      {
        id: "partnership-q25",
        question: "I'm new to both schools. Why should this matter to me?",
        answerHtml: `<p>It means one school with 50 years of classical ballet tradition and a full contemporary/competitive program — in one place. You get the rigour of RAD ballet and the full range of jazz, tap, hip-hop, lyrical, contemporary, acro, and musical theatre, without having to choose between studios.</p>`,
      },
      {
        id: "partnership-q26",
        question: "Will the Rothesay Ballet School name go away?",
        answerHtml: `<p>[JS à valider — this is the D2 brand architecture decision on the Sunday agenda. Three options drafted: Option A (single brand), Option B (dual brand retained), Option C (parent brand + sub-brand).] Dan Gallant</p>`,
      },
      {
        id: "partnership-q27",
        question: "What about tuition? Will my rates change?",
        answerHtml: `<p>[JS à valider — not addressed in public posts. Tuition for current RBS and DATA families for the remainder of 2025–2026 season will not change. 2026–2027 tuition schedule to be published alongside registration opening.] Dan Gallant</p>`,
      },
      {
        id: "partnership-q28",
        question: "Who do I contact with questions?",
        answerHtml: `<p><strong>Dynamic Academy of The Arts</strong> — 6 Market Street, Quispamsis NB E2E 4B1<br />
Phone: <a href="tel:+15068471164">(506) 847-1164</a><br />
Email: <a href="mailto:dynamicacademyofthearts@gmail.com">dynamicacademyofthearts@gmail.com</a></p>
<p><strong>Rothesay Ballet School</strong> (until July 1, 2026) — [JS à valider: RBS contact routing after July 1]</p>`,
      },
    ],
  },
];

const KNOWLEDGE_BASE = [
  {
  question:"How do I register my child for dance classes?",
  answer:"You can register online at dynamicacademy.ca/classes, through the D.A.T.A. App, or by contacting the studio directly at (506) 847-1164 or by email."
  },
  {
  question:"Is there a registration fee? How much does it cost to sign up?",
  answer:"Yes. Registration Fee: $35.00 + HST per student. Costume Deposit Fee: $75.00 or $150.00 + HST (depending on class length)."
  },
  {
  question:"My daughter is 4 years old. What classes can she take?",
  answer:"For ages 3–4 we offer Ballet ($48.30/mo + HST), Tap ($48.30/mo + HST), and a Ballet + Tap Combo ($61.70/mo + HST)."
  },
  {
  question:"My son is 12 years old and wants to try dance for the first time. What do you recommend?",
  answer:"We recommend All Styles (2 hrs/week) at $98.75/mo + HST, or Hip Hop (30 min/week) at $48.30/mo + HST."
  },
  {
  question:"Can my child try a class before committing to a full session?",
  answer:"Yes! We offer a Free Trial Class with no experience required. Sign up at dynamicacademy.ca/free-trial-class. We'll help you find the right class fit."
  },
  {
  question:"Do you offer mid-year enrolment or do I have to wait until September?",
  answer:"Yes, mid-season registration is possible if spots are available. Contact the studio to check availability."
  },
  {
  question:"What's the process to switch my child from one class to another?",
  answer:"Contact the office via the Parent Portal or email and we will make the adjustment for you."
  },
  {
  question:"Is there a waitlist if a class is full?",
  answer:"Yes. Click the WAITLIST button on the class schedule page at dynamicacademy.ca/classes to add your name."
  },
  {
  question:"What is the registration deadline for the September season?",
  answer:"Registration typically opens in spring/summer. Check dynamicacademy.ca for current dates."
  },
  {
  question:"Can siblings be registered in the same class?",
  answer:"Yes, siblings can be registered in the same class if they are the appropriate age for the class they are interested in."
  },
  {
  question:"What dance programs and classes do you offer?",
  answer:"We offer Recreational, Part-Time Competitive, and Full-Time Competitive Company programs. Styles include Ballet, Jazz, Tap, Hip Hop, Lyrical, Contemporary, and Acrobatics."
  },
  {
  question:"What are the Hip Hop classes you offer?",
  answer:"Hip Hop classes are available by age group: ages 5–6, 7–8, 9–10, and 11–18. Contact the studio or visit dynamicacademy.ca/classes for current scheduling and pricing details."
  },
  {
  question:"What ballet classes do you offer by age group?",
  answer:"Ballet is offered for ages 3–4 as a standalone class, and for older ages within combo classes. Competitive dancers receive dedicated ballet training as part of their program."
  },
  {
  question:"Do you offer jazz classes?",
  answer:"Yes, jazz is included in both recreational and competitive programs across multiple age groups."
  },
  {
  question:"Do you offer lyrical or contemporary classes?",
  answer:"Yes. Lyrical is included in All Styles recreational classes. Contemporary is part of the competitive program."
  },
  {
  question:"Do you offer tap classes?",
  answer:"Yes, tap classes are available with a detailed breakdown by age group. Visit dynamicacademy.ca/classes for the full schedule."
  },
  {
  question:"Do you offer acro or acrobatic classes?",
  answer:"Yes. Acro Level 1/2 is available for ages 7–8, and Acro Level 3 is available for ages 9+."
  },
  {
  question:"What is the weekly class schedule?",
  answer:"The full schedule is available at dynamicacademy.ca/recreational-classes. Classes are generally structured by age group on Tuesday/Wednesday evenings and Saturday mornings."
  },
  {
  question:"When does the dance season start and end?",
  answer:"The dance season runs from September through May. Summer programs (camps and intensives) run in July and August."
  },
  {
  question:"How long is each class session?",
  answer:"Recreational class lengths are 30 min, 60 min, 90 min, or 2 hours per week. Competitive program classes are longer and more frequent."
  },
  {
  question:"Can adults take classes too or is it only for children?",
  answer:"Our programs are designed for students ages 3 to 18. Adult classes are not currently listed in our schedule."
  },
  {
  question:"What are the preschool class options for ages 3–4?",
  answer:"For ages 3–4, we offer Ballet ($48.30/mo + HST), Tap ($48.30/mo + HST), and a Ballet + Tap Combo ($61.70/mo + HST)."
  },
  {
  question:"Do you offer any special events like workshops or masterclasses?",
  answer:"Yes! The studio offers summer workshops and events. Summer Elite Technique classes run Tuesdays & Wednesdays 4:30–6:30 PM for ages 5–18, at $130 for a 5-week session (July 7 – Aug 12, 2026). Competitive Intensives are also available. Contact the studio for details on any additional guest workshops or masterclasses."
  },
  {
  question:"Can a parent and child take a class together?",
  answer:"Typically, students are placed in age-appropriate classes. Parent-child classes are not a standard offering. Contact the studio to discuss options."
  },
  {
  question:"Is there a trial class I can sign my daughter up for before committing?",
  answer:"Yes! We offer a Free Trial Class. No experience required. Sign up at dynamicacademy.ca/free-trial-class. We'll help you find the right class fit."
  },
  {
  question:"How much do classes cost? What are your tuition fees?",
  answer:"Recreational tuition: 30 min = $48.30/mo, 60 min = $61.70/mo, 90 min = $86.40/mo, 2 hrs = $98.75/mo. All prices + HST."
  },
  {
  question:"What’s the cost for ages 5–6?",
  answer:"Ages 5–6: Tap, Jazz & Hip Hop combo = $86.40/mo + HST. Hip Hop only = $48.30/mo + HST."
  },
  {
  question:"What’s the cost for ages 11–18?",
  answer:"Ages 11–18: All Styles (2 hrs/week) = $98.75/mo + HST. Hip Hop only = $48.30/mo + HST."
  },
  {
  question:"What’s the cost for competitive dancers?",
  answer:"Competitive program tuition varies. Please contact the studio directly for competitive pricing details."
  },
  {
  question:"Do you offer any sibling discounts or family rates?",
  answer:"Yes! Siblings receive $5.00 off per month per sibling, and a 30% discount on the second class."
  },
  {
  question:"Do you offer financial assistance or bursaries for families who need it?",
  answer:"We partner with Pro Kids for families in need and provide bursaries on a case-by-case basis. Please contact the office to discuss your situation."
  },
  {
  question:"Is there a discount for paying in full?",
  answer:"Yes, you save $20.00 when you pay your tuition in full upfront for the season."
  },
  {
  question:"What are the additional costs I should know about besides tuition?",
  answer:"Additional costs include: Registration fee ($35 + HST), costume deposit ($75 or $150 + HST), competition entry fees (competitive dancers), summer intensive fees ($250 + HST), travel costs (Full-Time Competitive), and accessories."
  },
  {
  question:"When are monthly payments processed?",
  answer:"Monthly payments are processed on the 1st of each month from September through May."
  },
  {
  question:"How much does summer camp cost?",
  answer:"Summer camp pricing varies by camp. Recreational camps range from $235–$250 + HST per camp. Competitive Camps are $250 + HST per week (Competitive Camps run July 13–17 and August 17–21, 2026)."
  },
  {
  question:"What are the summer camp dates and costs?",
  answer:"Competitive Camps run July 13–17 and August 17–21 at $250 + HST per week. Recreational summer camps vary — contact the studio for the full 2026 schedule and pricing."
  },
  {
  question:"What is the Summer Elite Technique Program?",
  answer:"The Summer Elite Technique Program is a 5-week program for ages 5–18, running Tuesdays and Wednesdays 4:30–6:30 PM at $130 for the full session."
  },
  {
  question:"What payment methods do you accept?",
  answer:"We accept Cash, Cheque, Visa, and Mastercard. You can pay monthly or save $20 by paying the full year upfront. Post-dated cheques are also accepted."
  },
  {
  question:"Can I pay monthly or do I have to pay for the full year upfront?",
  answer:"Either option works. Monthly payments are due on the 1st of each month (September–May). Paying in full upfront saves you $20."
  },
  {
  question:"What is your refund policy if my child wants to drop a class?",
  answer:"We require two weeks’ written notice by email to stop tuition. No refund is issued once payment has been processed for the month or year."
  },
  {
  question:"If my daughter tries it and doesn’t like it after a couple classes, can I get a refund?",
  answer:"We understand it can take time to find the right fit! Once a payment has been processed for the month or year, refunds are not issued. We encourage families to take advantage of our free trial class before enrolling to ensure it’s the right fit. If you have concerns, please contact the office and we’ll do our best to help."
  },
  {
  question:"How do I give written notice to stop tuition payments?",
  answer:"Send two weeks’ written notice by email to the studio before the next billing cycle."
  },
  {
  question:"I was charged twice for the same month — how is billing resolved?",
  answer:"We’re sorry to hear that! Please contact the office right away with your billing details. Our team handles billing disputes and will review and resolve the discrepancy promptly — typically within 2–3 business days. Please include your name, your child’s name, and the dates/amounts in question when you reach out."
  },
  {
  question:"What payment methods do you accept?",
  answer:"We accept Visa, Mastercard, cheques, and cash. Payments are deposited on the 1st of each month (September through May). You can save $20 by paying the full year’s tuition upfront."
  },
  {
  question:"What happens if my payment is late or a cheque bounces?",
  answer:"A $25 administration fee is charged for returned cheques or late payments. If the outstanding balance is not resolved within 30 days, your child will not be permitted to attend class until the account is current."
  },
  {
  question:"Can I get a refund if we need to withdraw?",
  answer:"Two weeks’ written notice is required to stop tuition payment, and it must be submitted by email to dynamicacademyofmythearts@gmail.com. Once a payment has been processed or deposited, no refund will be given. Registration and costume deposit fees are non-refundable."
  },
  {
  question:"Is there a sibling discount? (New)",
  answer:"We do not currently offer a sibling discount, but we encourage families to ask about any current promotions when registering. Contact the studio for details."
  },
  {
  question:"Are costume fees included in tuition?",
  answer:"No. Costume fees are separate from tuition. A costume deposit of $75.00 to $150.00 + HST is required at registration, depending on class length (2 costumes for 1.5-hour classes). These fees cover year-end recital costumes and are non-refundable."
  },
  {
  question:"What is your attendance policy? What happens if my child misses a class?",
  answer:"Please notify the studio if your child will miss a class. No refunds are issued for missed classes, and makeup classes are not always guaranteed."
  },
  {
  question:"Are there makeup classes available if my child is absent?",
  answer:"Makeup classes are not guaranteed, especially during weather cancellations or peak season. Please contact the studio to inquire about availability."
  },
  {
  question:"What happens if a class is cancelled due to weather?",
  answer:"No makeup class is guaranteed and no refunds are issued for weather cancellations. It is at the parent's discretion whether to travel during adverse weather."
  },
  {
  question:"Class was cancelled but I didn't receive a refund — what should I do?",
  answer:"We're sorry to hear that. For weather cancellations, our policy is that refunds are not issued and makeup classes cannot be guaranteed. For studio-initiated cancellations for other reasons, please contact the office directly so we can review the situation and make it right."
  },
  {
  question:"Can parents watch the classes?",
  answer:"We host 2 recitals per year for parents to witness their child's progress, but parents are not permitted to observe weekly classes. We believe this helps children focus and thrive in their learning environment."
  },
  {
  question:"Is there a waiting area for parents?",
  answer:"We have a reception area at the studio; however, parents are not encouraged to linger while their students are in class."
  },
  {
  question:"Do you have parking available?",
  answer:"Yes, we have a parking lot available for families at the studio."
  },
  {
  question:"Can I book the studio for a private birthday party?",
  answer:"Yes, we do offer private rentals! Send us an email to discuss what you're looking for and we'll provide a quote."
  },
  {
  question:"Are there volunteer opportunities for parents?",
  answer:"Yes! We welcome parent volunteers. Contact us by email if you are interested and we'll connect you with the right opportunities."
  },
  {
  question:"What happens if I miss rehearsal because of work — will I get kicked off the team?",
  answer:"Attendance is a critical aspect of team performance and missing classes impacts the entire team. That said, we understand that conflicts can arise. Please communicate any work conflicts with the studio as early as possible so we can discuss options. Repeated absences without notice may affect your participation."
  },
  {
  question:"Is there a photo day at the studio?",
  answer:"This information changes annually. Please contact the office for official photo day dates."
  },
  {
  question:"What COVID safety measures do you have in place?",
  answer:"The health and safety of our students and families is our top priority. We follow all applicable public health guidelines. Please contact the studio directly for our most current health and safety protocols, as these may change in response to public health guidance."
  },
  {
  question:"Is there somewhere I can practice on my own at the studio outside of class time, like open studio hours?",
  answer:"Open studio hours are not currently a listed offering. Please contact the studio directly to ask about any available practice time or rental options."
  },
  {
  question:"How many dance studios does the facility have?",
  answer:"D.A.T.A. operates two locations with 4 studios total, all featuring top-tier dance flooring and training equipment."
  },
  {
  question:"What is DATOA's policy on class cancellations due to weather?",
  answer:"For weekday classes, check your email or our website by 3 PM that day. For weekend classes, check by 8 AM that morning. Classes are NOT always cancelled when schools close. Parents should use their own judgment about safety. If a class is cancelled, we cannot guarantee a make-up class."
  },
  {
  question:"What is the dress code for classes?",
  answer:"Dance attire varies by style. Generally: ballet requires a leotard, tights, and ballet shoes; jazz and tap classes require appropriate dance shoes and fitted clothing. Hair should be pulled back neatly. Your instructor will provide specific requirements at the start of the season."
  },
  {
  question:"Do you have a waiting area for parents?",
  answer:"Yes, we have a comfortable waiting area where parents can sit during class times. We ask that you keep noise to a minimum so our dancers can focus."
  },
  {
  question:"Where is the studio located? What is the address?",
  answer:"6 Market Street, Quispamsis, New Brunswick, E2E 4B1."
  },
  {
  question:"What are the studio hours of operation?",
  answer:"Please contact the studio for current hours of operation. You can reach us by phone at (506) 847-1164, by email, or through the contact form at dynamicacademy.ca."
  },
  {
  question:"How can I contact the studio?",
  answer:"You can reach us by phone at (506) 847-1164, by email, through the contact form at dynamicacademy.ca, or on social media (@dynamicacademyofthearts on Facebook, Instagram, YouTube, and TikTok)."
  },
  {
  question:"What is the studio's reputation in the community?",
  answer:"D.A.T.A. holds a 4.8-star Google rating, has 300+ dancers enrolled, and has been serving the community since 2013 with a family-first, non-intimidating culture."
  },
  {
  question:"How long has the studio been operating?",
  answer:"D.A.T.A. has been operating since 2013 — over 12 years in the community."
  },
  {
  question:"What is the studio's mailing address for sending payments?",
  answer:"6 Market Street, Quispamsis, New Brunswick, E2E 4B1."
  },
  {
  question:"How many students are currently enrolled at D.A.T.A.?",
  answer:"We currently have 300+ dancers enrolled at the studio."
  },
  {
  question:"What is your website URL?",
  answer:"Our website is dynamicacademy.ca."
  },
  {
  question:"Do you have a D.A.T.A. app? Where can I download it?",
  answer:"Yes! The D.A.T.A. App is available on both the App Store (iOS) and Google Play (Android). Search for 'Dynamic Academy of The Arts' or visit dynamicacademy.ca for download links."
  },
  {
  question:"What social media accounts does D.A.T.A. have?",
  answer:"You can find us on Facebook, Instagram, YouTube, and TikTok @dynamicacademyofthearts."
  },
  {
  question:"Do you sell dance shoes or uniforms at the studio?",
  answer:"We do not sell dance shoes or uniforms at the studio. We recommend checking local dancewear retailers or online stores. Contact the studio for brand and style guidance."
  },
  {
  question:"Where can I buy the required dance shoes and attire?",
  answer:"Dance shoes and attire can be purchased at local dancewear retailers or online. Contact the studio for specific brand or style guidance."
  },
  {
  question:"Est-ce que vous offrez des cours en francais?",
  answer:"Our classes are primarily offered in English. We warmly welcome Francophone families — please contact us directly for more information on available options."
  },
  {
  question:"How many students does DATOA currently have enrolled?",
  answer:"We currently have 300+ dancers enrolled at the studio."
  },
  {
  question:"What are the studio's hours of operation?",
  answer:"Our studio hours vary by day and season. Classes typically run weekday evenings and Saturday mornings. Check dynamicacademy.ca/classes for the current schedule, or call us at (506) 847-1164."
  },
  {
  question:"How many studios/rooms does DATOA have?",
  answer:"Our facility includes multiple dance studios equipped with sprung floors, mirrors, and barres appropriate for various dance styles."
  },
  {
  question:"Can I volunteer to help at DATOA events like recitals?",
  answer:"We welcome parent volunteers for our year-end recital and other events. Volunteer opportunities are communicated through email and the D.A.T.A. App as events approach."
  },
  {
  question:"What qualifications do your dance instructors have?",
  answer:"Our faculty train with leading educators and focus on safe, age-appropriate technique and injury prevention. Carina Charest holds a BEd from Université de Moncton and First Aid in Mental Health certification. Vanessa Calhoun is a George Brown Commercial Dance graduate with 10+ years at D.A.T.A. and professional performance experience. Justin Saulnier is a Certified AcroDance Instructor."
  },
  {
  question:"Who are the faculty members?",
  answer:"Justin Saulnier (Owner/Director) — Tap, Jazz, Hip Hop, Contemporary, Ballet, Musical Theatre; Certified AcroDance Instructor. Carina Charest — Ballet, Jazz, Tap, Musical Theatre, Lyrical, Contemporary, Gymnastics, Baton; BEd from Université de Moncton; First Aid in Mental Health. Vanessa Calhoun — RAD syllabus, George Brown Commercial Dance grad, Ballet Jorgen, Royal Caribbean Cruise Line, 10+ years at D.A.T.A. Emily Burton — Contemporary, Jazz, Hip Hop, Lyrical, Acro; teaching since 2018. Full faculty profiles available at dynamicacademy.ca/faculty."
  },
  {
  question:"Can you list the full faculty team with their bios?",
  answer:"Justin Saulnier (Owner/Director) — Tap, Jazz, Hip Hop, Contemporary, Ballet, Musical Theatre; Certified AcroDance Instructor. Carina Charest — Ballet, Jazz, Tap, Musical Theatre, Lyrical, Contemporary, Gymnastics, Baton; BEd from Université de Moncton; First Aid in Mental Health. Vanessa Calhoun — RAD syllabus, George Brown Commercial Dance grad, Royal Caribbean Cruise Line, 10+ years at D.A.T.A. Emily Burton — Contemporary, Jazz, Hip Hop, Lyrical, Acro; teaching since 2018. Visit dynamicacademy.ca/faculty for full bios."
  },
  {
  question:"Are instructors certified in first aid?",
  answer:"Carina Charest holds First Aid in Mental Health certification. For complete information on first aid certifications across all instructors, please contact the studio directly."
  },
  {
  question:"Are instructors at DATOA employees or independent contractors?",
  answer:"This is an internal administrative matter. For general inquiries about the studio, please contact us at dynamicacademy.ca."
  },
  {
  question:"I'm 16 and want to teach dance eventually — does DATOA have junior assistant or apprentice instructor positions?",
  answer:"We love nurturing the next generation of dance educators! While we don't have a formal junior instructor program listed at this time, we encourage you to reach out to the studio directly to discuss any available assistant or apprentice opportunities. Building those relationships early is a great first step toward a teaching career."
  },
  {
  question:"How do I know my child is safe? Do your instructors have background checks?",
  answer:"Your child's physical and emotional safety is always our first priority. Our faculty train with leading educators and focus on safe, age-appropriate technique. For specific information about our background check policy for instructors, please contact the studio directly."
  },
  {
  question:"What is the late pickup policy if I'm running late to get my daughter?",
  answer:"We understand that unexpected situations arise. If you are running late for pickup, please contact the studio as soon as possible. Our staff will remain with your child until you arrive. Please note that consistent late pickups may be subject to a late fee. We appreciate your communication."
  },
  {
  question:"What happens if my child is injured during class?",
  answer:"Your child's safety is our first priority. Our faculty are trained in safe technique and injury prevention. In the event of an injury during class, the instructor will assess the situation and contact parents immediately for any matter requiring medical attention."
  },
  {
  question:"Is there a waiver or liability form to sign?",
  answer:"Yes, all waivers and liability forms are included in our registration forms, which are completed when enrolling your child."
  },
  {
  question:"My child is being bullied in class — what action does the studio take?",
  answer:"The safety and well-being of every dancer is non-negotiable at D.A.T.A. If your child is experiencing bullying, please contact the studio immediately. We take all reports seriously and will investigate promptly. Our response may include a conversation with all parties involved, mediated by studio leadership, and appropriate corrective action. Our goal is to maintain a safe, respectful environment for every student."
  },
  {
  question:"If I feel uncomfortable about something at the studio but don't want to get anyone in trouble, is there a way to report it anonymously?",
  answer:"We take all concerns seriously and want every family to feel safe speaking up. While we do not currently have a formal anonymous reporting system, you are always welcome to contact the studio owner/director Justin Saulnier directly and confidentially. Your privacy will be respected. We are committed to creating a safe environment for all students and families."
  },
  {
  question:"If a student has a medical emergency during class, what is the studio's emergency protocol?",
  answer:"In the event of a medical emergency during class, our instructors are trained to act quickly: the class will be paused, emergency services (911) will be called if necessary, parents/guardians will be contacted immediately, and first aid will be administered by qualified staff. Your child's safety is always our first priority."
  },
  {
  question:"My son came home with a minor injury from class and nobody called me. What is your injury reporting policy?",
  answer:"We are sorry to hear this! Any injury during class should be reported to parents as soon as possible. Please contact the office right away so we can investigate, ensure it's properly documented, and make sure this is handled correctly going forward. We take this very seriously."
  },
  {
  question:"What is DATOA's supervision policy for younger children?",
  answer:"Our instructors maintain direct supervision during all class times. Parents/guardians are responsible for drop-off and pick-up. Children should not be left unattended in the studio before or after their class time. For our youngest dancers (ages 3–4), we recommend parents remain in the building during class."
  },
  {
  question:"Does DATOA conduct background checks on instructors?",
  answer:"Yes. All our instructors undergo criminal record checks, and our teaching staff are trained in first aid. We prioritize creating a safe environment for every dancer."
  },
  {
  question:"What happens if my child gets injured during class?",
  answer:"Our instructors are trained in first aid and will respond immediately. For minor injuries, we provide first aid on-site and notify parents. For anything more serious, we contact parents immediately and call emergency services if needed. An incident report is completed for all injuries."
  },
  {
  question:"Is there a waiver or liability form I need to sign?",
  answer:"Yes. All families are required to sign a liability waiver and media release form at the time of registration. These forms are available at the studio or during the registration process."
  },
  {
  question:"Are parents allowed to watch classes?",
  answer:"Parents are welcome to observe during designated observation weeks. For regular classes, we ask that parents use the waiting area to minimize distractions for the dancers. This helps our instructors maintain focus and keeps the classroom environment productive."
  },
  {
  question:"I am unhappy with an instructor's behavior — how can I escalate this?",
  answer:"We're sorry to hear that. Please contact the studio owner/director Justin Saulnier directly by email or phone. Your concern will be treated with confidentiality and addressed within 2 business days. Depending on the nature of the complaint, a formal meeting may be arranged with all parties involved."
  },
  {
  question:"How long does it take to get a response to a complaint?",
  answer:"We aim to acknowledge all complaints within 24 business hours and provide a full response or resolution within 2–3 business days. For urgent matters, please call the studio directly."
  },
  {
  question:"Who handles complaint escalation at the studio?",
  answer:"All complaints are handled by the Studio Owner/Director, Justin Saulnier. You can reach him by contacting the studio at (506) 847-1164 or by email through dynamicacademy.ca. We take every concern seriously and are committed to a fair resolution."
  },
  {
  question:"If a parent makes a complaint about an instructor, how is that handled?",
  answer:"Instructor complaints are taken very seriously. Upon receiving a complaint, the studio director will investigate confidentially and speak with the instructor in question. You will be kept informed of the process and outcome. All complaints are handled with discretion and professionalism."
  },
  {
  question:"The studio parking lot was not cleared of ice last week — serious safety concern.",
  answer:"Thank you for bringing this to our attention — your safety and the safety of all our families is extremely important. Please contact us by email or phone right away so we can document this and ensure it is addressed promptly."
  },
  {
  question:"How do I make a complaint or provide feedback about a class or instructor?",
  answer:"We take all feedback seriously. Please email us at dynamicacademyofthearts@gmail.com or call (506) 847-1164 to share your concern. Our administrative team will review it and follow up with you, typically within 2–3 business days."
  },
  {
  question:"What if I'm not satisfied with how my complaint was handled?",
  answer:"If you feel your concern hasn't been adequately addressed, you can request a meeting with the studio director. We are committed to resolving issues fairly and want every family to feel heard."
  },
  {
  question:"Can I provide anonymous feedback?",
  answer:"While we encourage direct communication so we can best address your concern, you are welcome to submit anonymous feedback through our website contact form. Please note that anonymous submissions may limit our ability to follow up with you directly."
  },
  {
  question:"My child is being treated unfairly by another student. What should I do?",
  answer:"Please let us know right away by contacting the studio. We have a zero-tolerance policy for bullying and take all reports seriously. We will address the situation with the students and families involved, and work to ensure your child feels safe and supported."
  },
  {
  question:"Do you have a year-end recital? When is it and is there a cost?",
  answer:"Yes! We hold a year-end recital each season. The date varies — check the Events Calendar, D.A.T.A. App, or your email for updates. Costume fees apply: $75 + HST for 30/60-min classes and $150 + HST for 90-min/2-hr classes. Tickets are also available each season."
  },
  {
  question:"When is this year's recital and where?",
  answer:"The recital date and venue vary each season. Check the Events Calendar at dynamicacademy.ca, the D.A.T.A. App, or watch for email communication for confirmed details."
  },
  {
  question:"How do recital tickets work?",
  answer:"Tickets are made available each season. Watch for details via email, the D.A.T.A. App, or the Parent Portal. Pricing is announced closer to the event."
  },
  {
  question:"How many tickets can each family buy?",
  answer:"Tickets are available on a first-come, first-served basis. Contact the studio for any specific family allocation details for the upcoming recital."
  },
  {
  question:"What are the costume costs and when are they due?",
  answer:"Costume Deposit: $75 + HST for 30/60-min classes; $150 + HST for 90-min or 2-hr classes. Costume fees are due at registration and are non-refundable."
  },
  {
  question:"What is included in the costume fee?",
  answer:"The costume fee covers Year-End Recital costumes only. Accessories, tights, and headpieces are not included and may need to be purchased separately."
  },
  {
  question:"What are the recital rehearsal dates I should block off?",
  answer:"Recitals are typically scheduled on weekends. Rehearsal dates will be communicated to families at the earliest possible notice via email and the D.A.T.A. App."
  },
  {
  question:"Is there a recital photo or video package?",
  answer:"A formal photo/video package is not currently available, but it is something we are exploring for the future. Stay tuned for updates!"
  },
  {
  question:"What time should my child arrive at the recital venue?",
  answer:"Arrival times vary by year. Watch for a detailed email or notification in the D.A.T.A. App with specific arrival instructions as the recital approaches."
  },
  {
  question:"Can parents watch backstage during the recital?",
  answer:"Only designated studio volunteers who have been selected to assist backstage are permitted backstage during the recital."
  },
  {
  question:"Are flowers or gifts allowed after the recital?",
  answer:"Yes! We offer flowers and other items for sale at the recital in support of our competitive teams. You are also welcome to bring your own."
  },
  {
  question:"How large is the annual recital — how many attendees and where is it held?",
  answer:"Our annual recital is a beloved community event attended by families, friends, and supporters of our 300+ dancers. The venue and specific capacity vary by year. Watch for announcements via the D.A.T.A. App, email, and social media for full details on this season's recital."
  },
  {
  question:"My costume for the recital doesn't fit right — who do I talk to about getting it adjusted?",
  answer:"Please contact the studio by email as soon as possible so we can resolve this efficiently. Include your child's name and class details so we can connect you with the right person."
  },
  {
  question:"The recital costume we received is the wrong size and the recital is in two weeks.",
  answer:"We are so sorry about this! Please contact us by email right away so we can resolve this as quickly as possible."
  },
  {
  question:"Do you offer competitive dance programs? What's involved?",
  answer:"Yes! We offer two competitive tiers: Part-Time (2–3 days/week, 2–3 competitions/year) and Full-Time Competitive Company (intensive training schedule, 4–5 competitions/year including one out-of-province). Both include summer intensives and additional costs for costumes, entry fees, and travel (Full-Time)."
  },
  {
  question:"Does D.A.T.A. have a competitive team?",
  answer:"Yes! We have Part-Time Competitors (2–3 days/week, 2–3 competitions/year) and a Full-Time Competitive Company (4–5 competitions/year including out-of-province). Auditions for 2026–27 are June 11, 2026. Registration opens May 1."
  },
  {
  question:"What is the time commitment for competitive?",
  answer:"Part-Time: 2–3 days/week. Full-Time Company: numerous hours per week. Both programs require strong commitment and mandatory attendance."
  },
  {
  question:"Are competition fees included in tuition, or separate? I want a full cost breakdown for competitive season.",
  answer:"Competition fees are separate from tuition. Additional competitive costs include: competition entry fees, costumes, Summer Intensives ($250 + HST/week), travel costs (Full-Time only, including out-of-province trips), and accessories. Contact the studio for a full Competitive Info Package."
  },
  {
  question:"What competitions does D.A.T.A. attend?",
  answer:"This information changes annually. Part-Time competitors attend 2–3 competitions per year; Full-Time Company attends 4–5, including one out-of-province competition. Please contact the office for the current season's competition schedule."
  },
  {
  question:"What age can my child join the competitive program?",
  answer:"The competitive program is open to students ages 3–18. Entry is through audition or instructor recommendation, and students are grouped by grade level."
  },
  {
  question:"How do I audition for the competitive program?",
  answer:"Auditions for the 2026–27 season are scheduled for June 11, 2026. Grades 1–6: 5:00–6:30 PM. Grades 7+: 6:30–8:00 PM. Registration opens May 1. Visit dynamicacademy.ca or contact the studio for details."
  },
  {
  question:"My child wants to pursue dance professionally. Do you offer pre-professional training?",
  answer:"Yes! Our Full-Time Competitive Company Program provides intensive, pre-professional training across multiple styles with experienced faculty."
  },
  {
  question:"How are solo and duet opportunities assigned — merit or seniority?",
  answer:"Solo and duet opportunities at D.A.T.A. are assigned based on a combination of factors including technical skill, artistic growth, commitment level, and instructor recommendation. Seniority may also be considered. For specific questions about your child's opportunities, please speak with the studio director."
  },
  {
  question:"Does DATOA have any male dancers on the competitive team or am I gonna be the only guy?",
  answer:"D.A.T.A. welcomes dancers of all genders into our programs, including the competitive team. We are proud of our inclusive environment. For specific information about current team composition, please contact the studio directly."
  },
  {
  question:"Is the studio wheelchair accessible?",
  answer:"Yes, our studio is wheelchair accessible."
  },
  {
  question:"Do you offer adaptive or inclusive programs for children with special needs?",
  answer:"Yes, we do offer inclusive programs. Please explore our weekly class schedule or contact the studio to discuss the best fit for your child."
  },
  {
  question:"Do you guys do anything for Pride Month or is the studio welcoming to LGBTQ+ dancers?",
  answer:"Absolutely. D.A.T.A. is proud to be a welcoming and inclusive studio for dancers of all backgrounds, identities, and orientations, including LGBTQ+ students and families. We believe dance is for everyone. For specific information about any Pride Month activities or events, please follow us on social media @dynamicacademyofthearts."
  },
  {
  question:"Does DATOA offer adaptive or inclusive dance programs? (Expanded)",
  answer:"We are committed to making dance accessible to everyone. While we don't currently have a dedicated adaptive program, we are happy to discuss accommodations for dancers with special needs. Please contact us to talk about how we can support your child."
  },
  {
  question:"Is the studio wheelchair accessible? (Expanded)",
  answer:"Our studio is located in a ground-level commercial space. Please contact us to discuss specific accessibility needs, and we will do our best to accommodate."
  },
  {
  question:"Does DATOA have a formal sponsorship or community partnership program?",
  answer:"We welcome community partnerships and sponsorship inquiries! While a formal sponsorship program is still being developed, we are open to collaborations that support our students and the broader dance community. Please contact the studio by email to discuss partnership opportunities."
  },
  // --- Alias / short-form entries for better keyword matching ---
  {
  question:"What are your prices?",
  answer:"Recreational tuition: 30 min = $48.30/mo, 60 min = $61.70/mo, 90 min = $86.40/mo, 2 hrs = $98.75/mo. All prices + HST. Competitive program tuition varies—please contact us at dynamicacademyofthearts@gmail.com or visit dynamicacademy.ca/classes for the most current pricing."
  },
  {
  question:"What is the cost of classes?",
  answer:"Recreational tuition: 30 min = $48.30/mo, 60 min = $61.70/mo, 90 min = $86.40/mo, 2 hrs = $98.75/mo. All prices + HST. Competitive program tuition varies—please contact us at dynamicacademyofthearts@gmail.com or visit dynamicacademy.ca/classes for the most current pricing."
  },
  {
  question:"How much does dance class cost?",
  answer:"Recreational tuition: 30 min = $48.30/mo, 60 min = $61.70/mo, 90 min = $86.40/mo, 2 hrs = $98.75/mo. All prices + HST. Competitive program tuition varies—please contact us at dynamicacademyofthearts@gmail.com or visit dynamicacademy.ca/classes for the most current pricing."
  },
  {
  question:"What are your fees?",
  answer:"Recreational tuition: 30 min = $48.30/mo, 60 min = $61.70/mo, 90 min = $86.40/mo, 2 hrs = $98.75/mo. All prices + HST. Competitive program tuition varies—please contact us at dynamicacademyofthearts@gmail.com or visit dynamicacademy.ca/classes for the most current pricing."
  },
  {
  question:"Do you have pricing details?",
  answer:"Recreational tuition: 30 min = $48.30/mo, 60 min = $61.70/mo, 90 min = $86.40/mo, 2 hrs = $98.75/mo. All prices + HST. Competitive program tuition varies—please contact us at dynamicacademyofthearts@gmail.com or visit dynamicacademy.ca/classes for the most current pricing."
  },
  {
  question:"Can parents watch classes?",
  answer:"Parents are welcome to observe during designated observation weeks. For regular classes, we ask that parents use the waiting area to minimize distractions for the dancers. This helps our instructors maintain focus and keeps the classroom environment productive."
  },
  {
  question:"Where are you located?",
  answer:"6 Market Street, Quispamsis, New Brunswick, E2E 4B1."
  },
  {
  question:"Where are you located",
  answer:"6 Market Street, Quispamsis, New Brunswick, E2E 4B1."
  },
  {
  question:"Where is your studio?",
  answer:"6 Market Street, Quispamsis, New Brunswick, E2E 4B1."
  },
  {
  question:"Where is your studio",
  answer:"6 Market Street, Quispamsis, New Brunswick, E2E 4B1."
  },
  {
  question:"Where is the studio?",
  answer:"6 Market Street, Quispamsis, New Brunswick, E2E 4B1."
  },
  {
  question:"What is your address?",
  answer:"6 Market Street, Quispamsis, New Brunswick, E2E 4B1."
  },
  {
  question:"What is your address",
  answer:"6 Market Street, Quispamsis, New Brunswick, E2E 4B1."
  },
  {
  question:"Location",
  answer:"6 Market Street, Quispamsis, New Brunswick, E2E 4B1."
  },
  {
  question:"location",
  answer:"6 Market Street, Quispamsis, New Brunswick, E2E 4B1."
  },
  {
  question:"Studio location",
  answer:"6 Market Street, Quispamsis, New Brunswick, E2E 4B1."
  },
  {
  question:"studio location",
  answer:"6 Market Street, Quispamsis, New Brunswick, E2E 4B1."
  },
  {
  question:"Where can I find you?",
  answer:"6 Market Street, Quispamsis, New Brunswick, E2E 4B1."
  },
  {
  question:"where can i find you",
  answer:"6 Market Street, Quispamsis, New Brunswick, E2E 4B1."
  },
 ];
  
 module.exports = KNOWLEDGE_BASE;
 
 
 
 
 
 
 
 
 
 
 
import { motion } from "motion/react";
import { Link } from "react-router";
import { Crown, Zap, Award, ChevronLeft, UserCircle2 } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type School = "rbs" | "data";

type ExpandedMember = {
  id: string;
  name: string;
  title: string;
  badge: string;
  credentialsLine: string;
  photo: string;
  certifications: string[];
  training: string;
  philosophy: string;
};

type LegacyMember = {
  name: string;
  title: string;
  credentialsLine: string;
  photo: string;
  certifications: string[];
  training: string;
  philosophy: string;
};

type FacultyMember = {
  id: string;
  name: string;
  title: string;
  school: School;
  photo: string | null;
  certifications: string[];
  training: string;
  philosophy: string;
  comingSoon?: boolean;
};

// ─── Heritage Data ─────────────────────────────────────────────────────────────

const HERITAGE_EXPANDED: ExpandedMember[] = [
  {
    id: "frank",
    name: "Frank Augustyn",
    title: "Guest Principal",
    badge: "Joined RBS · August 2024",
    credentialsLine: "Officer of the Order of Canada · Former Principal Dancer, National Ballet of Canada · Assoc. Prof., Adelphi University",
    photo: "https://static.wixstatic.com/media/967064_f669b3c1ccb14a639d8e9cc3b050ae73~mv2.jpg",
    certifications: ["Officer of the Order of Canada", "Principal Dancer, NBC (1970–)", "Assoc. Prof., Adelphi University", "Chair of Dance, Adelphi 2000–2019"],
    training: "Trained at the National Ballet School of Canada before joining the National Ballet of Canada in 1970. Performed as principal dancer with Boston Ballet, Berlin Ballet, Royal Winnipeg Ballet, Shanghai Ballet, Beijing Ballet, the Bolshoi, and the Kirov — at Lincoln Center, Kennedy Center, Covent Garden, and Rome's Caracalla Teatro. Co-produced and hosted the TV series Footnotes, The Classics of Ballet and authored the companion book.",
    philosophy: "Frank brings to Rothesay Ballet School the full weight of a career spent at the absolute summit of classical ballet. As Associate Professor and former Chair of Dance at Adelphi University (2000–2024), he refined his gift for transmission — turning a lifetime of principal-dancer knowledge into instruction that genuinely changes a young dancer's trajectory. His presence signals something unambiguous: that world-class ballet training is now available right here in the Kennebecasis Valley.",
  },
  {
    id: "carolyn",
    name: "Carolyn Zettel-Augustyn",
    title: "Faculty",
    badge: "Joined RBS · August 2024",
    credentialsLine: "ABT® Affiliate Teacher Pre-Primary–Level 7 · ABT® NTC Examiner · CDTA Life Member · 40+ Years of Ballet Education",
    photo: "https://static.wixstatic.com/media/967064_250a8cc78f904884b1d4e4d170590662~mv2.jpg",
    certifications: ["ABT® Affiliate Teacher Pre-Primary–Level 7", "ABT® National Training Curriculum Examiner", "CDTA Life Member", "Certified Yoga Teacher", "Music Together Teacher"],
    training: "Nearly four decades as an educator, director, examiner, adjudicator, and consultant. Founded Academy of Dance in Waterloo, Ontario (1982) and directed it for 25 years. Founded Classical School of Ballet on Long Island, NY (2011), directing it until 2024. Served as Chair of the CDTA Ballet Division and sat on the Examiner Syllabus Committee.",
    philosophy: "Carolyn's credential stack is among the most comprehensive in Atlantic Canada — ABT-certified through Level 7, a national curriculum examiner, and a lifetime CDTA member who has shaped how ballet is taught and evaluated at a systemic level. Her standards are not merely high; they are the standards others are measured against. Every student she teaches is trained on a foundation that is internationally recognized and professionally transferable.",
  },
];

const LEGACY_MEMBER: LegacyMember = {
  name: "Miss Sylvia Logan",
  title: "Founder & Ballet Mistress Emerita",
  credentialsLine: "Registered RAD Teacher · Founder, Rothesay Ballet School (1975) · Founder, Gala Ballet Company (1982)",
  photo: "/Miss_Slyvia_Logan.png",
  certifications: ["RAD Registered Teacher", "Vaganova Method", "Royal Academy of Dance", "Gala Ballet Productions"],
  training: "Trained in both Royal Academy and Vaganova methodologies in England before emigrating to Canada in 1962. Founded Rothesay Ballet School in 1975 — the same year she became a Registered RAD Teacher in the first year registration was mandated in Canada. Founded Gala Ballet Company in 1982, leading the company to perform for HRH Prince Charles and Princess Diana.",
  philosophy: "Sylvia Logan's founding philosophy is the bedrock beneath everything Rothesay Ballet School has ever been: a safe and welcoming environment where students of all ages can experience the joy of dance while striving towards excellence. After nearly five decades of instruction, that vision lives on — in the school she built, and in the teachers who were once her students.",
};

// ─── Current Faculty Data ─────────────────────────────────────────────────────

const CURRENT_FACULTY: FacultyMember[] = [
  // ── Rothesay Ballet School ──
  {
    id: "corissa",
    name: "Corissa Arseneau",
    title: "Teacher · RAD Ballet & Body Conditioning",
    school: "rbs",
    photo: "https://static.wixstatic.com/media/6a745f_79460ccfc12f4c90a467e29e270037a4~mv2.jpg",
    certifications: ["Certificate in Ballet Teaching Studies (CBTS)", "RAD Registered Teacher"],
    training: "Dancing at RBS since age 3. Trained in ballet, contemporary, jazz, hip-hop, flamenco, and Broadway styles. Performed professionally with Alberta Ballet, Ballet Jorgen, and Motus O before returning to the RBS teaching staff. Now in her 14th year on faculty.",
    philosophy: "Corissa brings the lived experience of a professional dancer with major companies, paired with the warmth of someone who grew up in this very studio. Her classes carry RAD technical precision and full-body performance awareness in equal measure.",
  },
  {
    id: "lorna",
    name: "Lorna Pond",
    title: "Instructor · Adult Ballet & Pilates",
    school: "rbs",
    photo: "https://static.wixstatic.com/media/6a745f_69848e426180469988fe093f58ee6a17~mv2.jpg",
    certifications: ["RAD Intermediate Level I (Advanced)", "IBFA Certification (in progress)"],
    training: "A student of Sylvia Logan in RBS's inaugural class — one of the very first dancers through the school's doors in 1975. Trained at National Ballet School summer programs in Toronto and studied the RAD professional program. Over 45 years involved with RBS as performer and instructor, with lead roles in The Nutcracker, La Fille Mal Gardée, and Sleeping Beauty with Gala Ballet Company.",
    philosophy: "Lorna embodies continuity. Having danced on RBS's first stages and now leading its adult programs, she carries the unbroken thread of the school's founding vision into every Pilates and ballet barre class. Her approach is rooted in the deep physical intelligence of a lifetime in movement.",
  },
  {
    id: "linda",
    name: "Linda Yang Poirier",
    title: "Teacher · All Levels, Babies to Silver Swans",
    school: "rbs",
    photo: "https://static.wixstatic.com/media/6a745f_b167cd7ff12b4f3892a2b981771d414f~mv2.jpg",
    certifications: ["CBTS · Royal Academy of Dance", "RAD Registered Teacher", "Progressing Ballet Technique (PBT)", "Silver Swans® Certified", "IADMS Member"],
    training: "One of RBS's first students, trained under Sylvia Logan from the school's earliest years. Earned her Elementary Executant Examination certificate at 16. Danced 'Sugarplum Fairy' with the Saint John Symphony Orchestra; performed 'Giselle' in spring recital. Holds a B.A., M.A., and B.Ed.; former French teacher at public school and college levels.",
    philosophy: "Linda spans the entire arc of dance education — from babies discovering movement for the first time to Silver Swans seniors finding it again. Her layered credentials give her the range to meet every student exactly where they are, and her background as a trained educator means she understands how people learn, not just how to dance.",
  },
  {
    id: "emma",
    name: "Emma McEvoy",
    title: "Teacher · Ballet & Contemporary",
    school: "rbs",
    photo: "https://static.wixstatic.com/media/6a745f_2b0d98fc693a417eb287881e0f216640~mv2.jpg",
    certifications: ["Certificate of Ballet Teaching Studies (CBTS)", "RAD Registered Teacher", "Enriched Performing Arts Diploma, CCPA"],
    training: "A student at RBS since 2001, trained across ballet, jazz, contemporary, and tap. Completed a two-year intensive Enriched Performing Arts Diploma at the Canadian College of Performing Arts in Victoria — choreographing, serving as dance captain, and performing in CCPA productions. Holds a B.A. in English & Communication Studies and a Digital Media & Marketing certificate from Duke University.",
    philosophy: "Emma's path from RBS student to RBS teacher gives her a particular credibility with young dancers — she knows exactly what it feels like to train in these studios. Her CCPA foundation adds rigorous professional performance perspective to a technically polished, genuinely encouraging classroom.",
  },
  {
    id: "james",
    name: "James Smith",
    title: "Teacher · Adult Tap & Musical Theatre Jazz",
    school: "rbs",
    photo: "https://static.wixstatic.com/media/6a745f_012fbd225e714055a4a182ddfad66296~jpeg",
    certifications: ["Music Theatre Performance Diploma, St. Clair College (2018)"],
    training: "Originally from Hamilton, Ontario. Began with gymnastics before training across ballet, tap, jazz, modern, and hip-hop. Graduated from St. Clair College's Music Theatre Performance Program — a professional-level triple-threat program covering acting, singing, and dance at a performance standard.",
    philosophy: "James brings infectious energy and a triple-threat perspective to every class. His musical theatre foundation means rhythm, performance quality, and expressive interpretation are always part of the technical conversation — not optional extras.",
  },
  {
    id: "alyssa",
    name: "Alyssa Long",
    title: "Instructor",
    school: "rbs",
    photo: null,
    certifications: [],
    training: "",
    philosophy: "",
    comingSoon: true,
  },
  {
    id: "marlee",
    name: "Marlee Holland",
    title: "Instructor",
    school: "rbs",
    photo: null,
    certifications: [],
    training: "",
    philosophy: "",
    comingSoon: true,
  },
  {
    id: "courtney",
    name: "Courtney Keating",
    title: "Instructor",
    school: "rbs",
    photo: null,
    certifications: [],
    training: "",
    philosophy: "",
    comingSoon: true,
  },
  // ── Dynamic Academy of The Arts ──
  {
    id: "justin",
    name: "Justin Saulnier",
    title: "Founder & Director",
    school: "data",
    photo: "/Justin.png",
    certifications: ["Certified AcroDance Instructor", "Barre Essentials Certified", "Progressive Ballet Certified", "Shannon Mather Teacher Training"],
    training: "Born in Saint John, NB. Competitive dancer from age 9, earning numerous special awards and scholarships. Completed the Commercial Dance Studies Program at George Brown College; trained in circus arts with A2D2 Cirque Company; performed with Jersey Boys (DivaGirl Entertainment) and the Lindsay Ritter Dance Company in Toronto.",
    philosophy: "Justin built D.A.T.A on the conviction that rigorous training and genuine belonging are not competing values — they're the same value, expressed differently. Every dancer at every level receives real attention and real belief in their potential.",
  },
  {
    id: "carina",
    name: "Carina Charest",
    title: "Instructor · Ballet, Jazz, Tap & Musical Theatre",
    school: "data",
    photo: "https://images.squarespace-cdn.com/content/v1/5d504272384fa9000133c901/0216e54e-2992-4f70-a0fb-8fbd7ca8ff64/STAFF-5A.jpg",
    certifications: ["CBTF Level 1 Coaching (Baton)", "NCCP Level 1 (Baton)", "B.Ed., Université de Moncton", "Mental Health First Aid"],
    training: "Dancing since age 2 across ballet, jazz, tap, musical theatre, lyrical, contemporary, gymnastics, and baton twirling. Performed at the Canada Games Opening/Closing Ceremony (2003) and as a National Artist at Canada Games in Yukon (2007). Multiple provincial, national, and international baton twirling awards. Teaching since age 14.",
    philosophy: "Carina's mission is to share her passion for movement in a comforting, encouraging, and positive environment. As a B.Ed.-qualified educator with classroom teaching experience, she brings genuine pedagogical skill to the studio — understanding not just how to dance, but how to teach.",
  },
  {
    id: "vanessa",
    name: "Vanessa Calhoun",
    title: "Instructor & Choreographer",
    school: "data",
    photo: "https://images.squarespace-cdn.com/content/v1/5d504272384fa9000133c901/7d62f1a6-ff79-49d3-9bc1-02a2487a4457/Staff-6a.jpg",
    certifications: ["RAD Graded Syllabus", "George Brown College Commercial Dance", "Ballet Jorgen Training"],
    training: "A career spanning over three decades. Trained through the RAD graded syllabus and George Brown College Commercial Dance program. Dance captain and performer for Royal Caribbean Cruise Line and Japan Cruise Line; choreographer for the Saint John Mill Rats Dance Team. Named 'Rising Star' by Dance Spirit Magazine.",
    philosophy: "Vanessa's decade-plus at D.A.T.A has been defined by making professional-level performance quality genuinely accessible — showing students that the precision and presence of cruise ship stages and competition floors is a skill that is built, step by step, right here.",
  },
  {
    id: "emily",
    name: "Emily Burton",
    title: "Instructor · Contemporary, Jazz, Hip-Hop & Acro",
    school: "data",
    photo: "https://images.squarespace-cdn.com/content/v1/5d504272384fa9000133c901/59ed2fd5-b34a-4ac5-b9db-23b6c0c4cc68/Staff-8A.jpg",
    certifications: ["BA/BEd (Concurrent), UNBSJ"],
    training: "A D.A.T.A family member since 2016. Dancing since age 4 across contemporary, jazz, hip-hop, lyrical, and acro. Teaching recreational and competitive classes since 2018 while organizing D.A.T.A's summer camp programs. Currently completing her concurrent BA/BEd at UNBSJ.",
    philosophy: "Emily's enthusiasm for dance is matched only by her care for every student in front of her. Having grown up inside D.A.T.A's culture, she understands its values from the inside — and brings the energy and investment of a teacher who dances not as a discipline, but as a way of life.",
  },
  {
    id: "data-placeholder-1",
    name: "Faculty Member",
    title: "Instructor",
    school: "data",
    photo: null,
    certifications: [],
    training: "",
    philosophy: "",
    comingSoon: true,
  },
  {
    id: "data-placeholder-2",
    name: "Faculty Member",
    title: "Instructor",
    school: "data",
    photo: null,
    certifications: [],
    training: "",
    philosophy: "",
    comingSoon: true,
  },
  {
    id: "data-placeholder-3",
    name: "Faculty Member",
    title: "Instructor",
    school: "data",
    photo: null,
    certifications: [],
    training: "",
    philosophy: "",
    comingSoon: true,
  },
  {
    id: "data-placeholder-4",
    name: "Faculty Member",
    title: "Instructor",
    school: "data",
    photo: null,
    certifications: [],
    training: "",
    philosophy: "",
    comingSoon: true,
  },
  {
    id: "data-placeholder-5",
    name: "Faculty Member",
    title: "Instructor",
    school: "data",
    photo: null,
    certifications: [],
    training: "",
    philosophy: "",
    comingSoon: true,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ExpandedHeritageCard({ member, delay = 0 }: { member: ExpandedMember; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: "easeOut", delay }}
      className="group flex flex-col md:flex-row rounded-3xl overflow-hidden bg-white/[0.03] border border-amber-500/15 hover:border-amber-500/30 transition-all duration-500 shadow-2xl shadow-black/60"
    >
      {/* Photo — B&W */}
      <div className="relative md:w-[38%] aspect-[3/4] md:aspect-auto overflow-hidden flex-shrink-0 min-h-[320px]">
        <img
          src={member.photo}
          alt={member.name}
          className="w-full h-full object-cover object-top grayscale contrast-110 brightness-85 transition-all duration-700 group-hover:brightness-95"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-slate-950/60" />
        {/* Badge */}
        <div className="absolute top-5 left-5">
          <div className="flex items-center gap-2 bg-amber-500/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
            <Award className="w-3 h-3 text-white" />
            <span className="text-white text-[10px] font-bold uppercase tracking-wider">{member.badge}</span>
          </div>
        </div>
        {/* Mobile name overlay */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 px-6 pb-6">
          <div className="h-0.5 w-8 bg-amber-400 mb-3 rounded-full" />
          <h3 className="text-2xl font-extrabold text-white">{member.name}</h3>
          <p className="text-amber-300 text-xs font-semibold mt-0.5">{member.title}</p>
        </div>
      </div>

      {/* Bio */}
      <div className="flex-1 p-8 lg:p-10 flex flex-col justify-center gap-7">
        {/* Name — desktop only */}
        <div className="hidden md:block">
          <div className="h-0.5 w-8 bg-amber-400 mb-4 rounded-full" />
          <h3 className="text-3xl lg:text-4xl font-extrabold text-white mb-2 tracking-tight">{member.name}</h3>
          <p className="text-amber-300/80 text-sm font-semibold">{member.title}</p>
        </div>

        {/* Credentials line */}
        <div>
          <p className="text-amber-400/60 font-bold text-[10px] uppercase tracking-[0.18em] mb-2">Credentials</p>
          <p className="text-amber-200 text-sm font-semibold leading-relaxed mb-3">{member.credentialsLine}</p>
          <div className="flex flex-wrap gap-2">
            {member.certifications.map((cert) => (
              <span key={cert} className="text-[10px] bg-amber-500/10 border border-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full font-semibold">
                {cert}
              </span>
            ))}
          </div>
        </div>

        {/* Training */}
        <div>
          <p className="text-amber-400/60 font-bold text-[10px] uppercase tracking-[0.18em] mb-2">Training & Career</p>
          <p className="text-slate-400 text-sm leading-relaxed">{member.training}</p>
        </div>

        {/* Philosophy */}
        <div>
          <p className="text-amber-400/60 font-bold text-[10px] uppercase tracking-[0.18em] mb-2">Teaching Philosophy</p>
          <p className="text-slate-200 text-[15px] leading-relaxed">{member.philosophy}</p>
        </div>
      </div>
    </motion.div>
  );
}

function LegacyCard({ member }: { member: LegacyMember }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
      className="group max-w-4xl mx-auto w-full flex flex-col md:flex-row rounded-3xl overflow-hidden bg-white/[0.03] border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 shadow-2xl shadow-black/60"
    >
      {/* Photo — B&W */}
      <div className="relative md:w-[32%] aspect-[3/4] md:aspect-auto overflow-hidden flex-shrink-0 min-h-[280px]">
        <img
          src={member.photo}
          alt={member.name}
          className="w-full h-full object-cover object-top grayscale contrast-110 brightness-85 transition-all duration-700 group-hover:brightness-95"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-slate-950/60" />

        {/* Legacy badge */}
        <div className="absolute top-5 left-5">
          <div className="flex items-center gap-2 bg-purple-600/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
            <Crown className="w-3 h-3 text-white" />
            <span className="text-white text-[10px] font-bold uppercase tracking-wider">Legacy Faculty · RBS Since 1975</span>
          </div>
        </div>

        {/* Mobile name overlay */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 px-6 pb-6">
          <div className="h-0.5 w-8 bg-purple-400 mb-3 rounded-full" />
          <h3 className="text-2xl font-extrabold text-white">{member.name}</h3>
          <p className="text-purple-300 text-xs font-semibold mt-0.5">{member.title}</p>
        </div>
      </div>

      {/* Bio */}
      <div className="flex-1 p-8 lg:p-10 flex flex-col justify-center gap-6">
        <div className="hidden md:block">
          <div className="h-0.5 w-8 bg-purple-400 mb-4 rounded-full" />
          <h3 className="text-3xl font-extrabold text-white mb-1.5 tracking-tight">{member.name}</h3>
          <p className="text-purple-300/80 text-sm font-semibold">{member.title}</p>
        </div>

        <div>
          <p className="text-purple-400/60 font-bold text-[10px] uppercase tracking-[0.18em] mb-2">Credentials</p>
          <p className="text-purple-200 text-sm font-semibold leading-relaxed mb-3">{member.credentialsLine}</p>
          <div className="flex flex-wrap gap-2">
            {member.certifications.map((cert) => (
              <span key={cert} className="text-[10px] bg-purple-500/15 border border-purple-500/25 text-purple-300 px-2.5 py-0.5 rounded-full font-semibold">
                {cert}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-purple-400/60 font-bold text-[10px] uppercase tracking-[0.18em] mb-2">Legacy</p>
          <p className="text-slate-400 text-sm leading-relaxed">{member.training}</p>
        </div>

        <div>
          <p className="text-purple-400/60 font-bold text-[10px] uppercase tracking-[0.18em] mb-2">Founding Philosophy</p>
          <p className="text-slate-200 text-[15px] leading-relaxed italic">&ldquo;{member.philosophy}&rdquo;</p>
        </div>
      </div>
    </motion.div>
  );
}

function StandardCard({ member, index }: { member: FacultyMember; index: number }) {
  const isRBS = member.school === "rbs";
  const accent = isRBS
    ? { pill: "bg-purple-100 border-purple-200 text-purple-700", badge: "bg-purple-600/85 text-white", label: "Rothesay Ballet", bar: "bg-purple-400", section: "text-purple-500" }
    : { pill: "bg-orange-50 border-orange-200 text-orange-700", badge: "bg-orange-500/85 text-white", label: "D.A.T.A", bar: "bg-orange-400", section: "text-orange-500" };

  if (member.comingSoon) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: (index % 3) * 0.07 }}
        className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 overflow-hidden flex flex-col"
      >
        <div className="aspect-[3/4] bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center gap-3 relative">
          <UserCircle2 className="w-14 h-14 text-slate-300" />
          <p className="text-xs text-slate-400 font-medium italic">Photo coming soon</p>
          <div className="absolute top-3 left-3">
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${isRBS ? "bg-purple-100 text-purple-600" : "bg-orange-100 text-orange-600"}`}>
              {isRBS ? <Crown className="w-2.5 h-2.5" /> : <Zap className="w-2.5 h-2.5" />}
              {accent.label}
            </div>
          </div>
        </div>
        <div className="p-5 flex-1">
          <h3 className="font-bold text-slate-500 mb-0.5">{member.name}</h3>
          <p className="text-slate-400 text-xs mb-3">{member.title}</p>
          <p className="text-slate-300 text-xs italic">Full bio coming soon</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
      className="group rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-md shadow-slate-200/60 hover:shadow-xl hover:shadow-slate-200/80 hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      {/* Photo */}
      <div className="relative aspect-[3/4] overflow-hidden bg-slate-100 flex-shrink-0">
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
            <UserCircle2 className="w-16 h-16 text-slate-300" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        {/* School badge */}
        <div className="absolute bottom-3 left-3">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-sm ${accent.badge}`}>
            {isRBS ? <Crown className="w-2.5 h-2.5" /> : <Zap className="w-2.5 h-2.5" />}
            {accent.label}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-4">
        <div>
          <div className={`h-0.5 w-6 ${accent.bar} rounded-full mb-3`} />
          <h3 className="font-extrabold text-slate-900 text-lg leading-snug mb-0.5">{member.name}</h3>
          <p className={`text-xs font-semibold ${accent.section}`}>{member.title}</p>
        </div>

        {member.certifications.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {member.certifications.map((cert) => (
              <span key={cert} className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold border ${accent.pill}`}>
                {cert}
              </span>
            ))}
          </div>
        )}

        {member.training && (
          <div className="flex-1">
            <p className={`text-[9px] font-bold uppercase tracking-[0.15em] mb-1.5 ${accent.section}`}>Training History</p>
            <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">{member.training}</p>
          </div>
        )}

        {member.philosophy && (
          <div>
            <p className={`text-[9px] font-bold uppercase tracking-[0.15em] mb-1.5 ${accent.section}`}>Teaching Philosophy</p>
            <p className="text-slate-600 text-[13px] leading-relaxed line-clamp-4">{member.philosophy}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function Faculty() {
  return (
    <div className="flex flex-col w-full overflow-hidden">

      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section className="relative min-h-[52vh] flex items-center justify-center pt-20 pb-16 bg-slate-950">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl -translate-y-1/2" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange-500/8 rounded-full blur-3xl translate-y-1/2" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(139,92,246,0.07),transparent_65%)]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Back link */}
            <div className="flex justify-center mb-8">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Our Story
              </Link>
            </div>

            <span className="inline-block text-amber-400 font-bold tracking-widest uppercase text-sm bg-amber-400/10 border border-amber-400/20 px-5 py-1.5 rounded-full mb-8">
              Our Faculty
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.06]">
              The People Who<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">
                Make the Magic.
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed">
              Two schools. Five decades of combined tradition. Twenty educators who have dedicated their lives to the craft — now teaching together under one roof.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          HERITAGE FACULTY
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        {/* Subtle divider glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/30" />
              <span className="text-amber-400 font-bold tracking-widest uppercase text-xs bg-amber-400/10 border border-amber-400/20 px-4 py-1.5 rounded-full whitespace-nowrap">
                Heritage Faculty
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/30" />
            </div>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                Foundational Figures.
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200"> Defining Standards.</span>
              </h2>
              <p className="text-slate-400 leading-relaxed">
                These are the individuals whose careers — across the National Ballet of Canada, the Bolshoi, ABT's national curriculum, and 50 years of Atlantic Canadian dance — form the credentialing backbone of the school. Their presence here is not incidental. It is a statement about what this school is.
              </p>
            </div>
          </motion.div>

          {/* Frank & Carolyn — expanded 2× cards */}
          <div className="space-y-8 mb-16">
            {HERITAGE_EXPANDED.map((member, i) => (
              <ExpandedHeritageCard key={member.id} member={member} delay={i * 0.12} />
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-500/20" />
            <span className="text-purple-400 font-bold tracking-widest uppercase text-[10px] bg-purple-500/10 border border-purple-500/20 px-4 py-1.5 rounded-full whitespace-nowrap">
              Legacy Faculty · RBS Since 1975
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-500/20" />
          </div>

          {/* Sylvia Logan — legacy card */}
          <LegacyCard member={LEGACY_MEMBER} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </section>

      {/* ═══════════════════════════════════════════
          CURRENT FACULTY
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <div className="flex justify-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-purple-100 text-purple-700 px-3 py-1 rounded-full border border-purple-200">
                <Crown className="w-3 h-3" /> Rothesay Ballet School
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-orange-100 text-orange-700 px-3 py-1 rounded-full border border-orange-200">
                <Zap className="w-3 h-3" /> Dynamic Academy of The Arts
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
              Current Faculty
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Every teacher from both schools continues — zero disruption to the families who trust them. One unified team, two campuses, one standard of excellence.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {CURRENT_FACULTY.map((member, i) => (
              <StandardCard key={member.id} member={member} index={i} />
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════ */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-slate-500 mb-8 text-lg leading-relaxed">
              Want to experience the teaching for yourself? Every new dancer gets one free trial class — no commitment required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-md font-bold text-base transition-all shadow-lg shadow-orange-500/30 inline-flex items-center justify-center gap-2 group"
              >
                Book a Free Trial Class
              </Link>
              <Link
                to="/programs"
                className="border-2 border-purple-600 text-purple-700 px-8 py-4 rounded-md font-bold text-base hover:bg-purple-50 transition-colors inline-flex items-center justify-center gap-2"
              >
                View All Programs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

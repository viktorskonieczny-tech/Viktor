# 🎓 Admissions Application Grader

**Elite Review Committee Simulation for Canadian Commerce Programs**

This tool simulates the brutal, transparent feedback of actual admissions panels reviewing supplementary essays and video responses for:
- **Queen's Smith Commerce** (Focus: Reflection, Judgment, Self-Awareness)
- **Western Ivey AEO** (Focus: Initiative, Leadership, Measurable Impact)
- **U of T Rotman Commerce** (Focus: Analytical Thinking, Curiosity, Structured Logic)

---

## Features

✅ **School-Specific Prompt Generation**
- Original questions inspired by each program's institutional priorities
- Realistic constraints (45-min essays, 650 words; 3-min video, 450 words)

✅ **Real-Time Timer**
- Start, pause, and reset a countdown timer that mimics exam conditions
- Word counter with visual feedback when you exceed limits

✅ **Comprehensive Grading Rubric** (Out of 100)
- Structure & Constraint Compliance (25 pts)
- Character, Judgment & Maturity (25 pts)
- Leadership & Ownership (15 pts)
- Impact & Results (15 pts)
- Authenticity & Reflection (20 pts)

✅ **Brutal, Honest Feedback**
- Memorability test: Would an admissions officer remember you?
- Cliché detector: Identifies generic phrases that hurt your file
- Credibility audit: Flags unsubstantiated claims
- Strategic deconstruction: Pinpoints weaknesses and suggests improvements
- Tier comparison: Shows where you rank vs. rejected/admitted/exceptional applicants
- Panel follow-up questions: Challenges weak points with targeted questions

---

## Quick Start

### Option 1: Deploy on GitHub Pages (Live Website)

1. Go to your repository settings: **Settings → Pages**
2. Under "Source," select **Deploy from a branch**
3. Choose **main** branch and **/ (root)** folder
4. Click **Save**
5. Your site will be live at: `https://your-username.github.io/Viktor/`

### Option 2: Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Viktor.git
   cd Viktor
   ```

2. Open `index.html` in your browser (or use a local server):
   ```bash
   # Using Python 3
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

---

## How to Use

### Step 1: Select Your Program
Choose between Queen's Commerce, Western Ivey AEO, or U of T Rotman Commerce. Each program weights evaluation criteria differently.

### Step 2: Choose Format
Select either a **timed essay** (45 minutes, 650 words) or **video transcription** (3 minutes, 450 words).

### Step 3: Read the Prompt
You'll receive an original, school-specific question. **Start your personal timer before reading.**

### Step 4: Respond
Write or paste your response in the text area. The word counter updates in real-time. You can pause the timer if needed, but admissions panels won't show you the same courtesy.

### Step 5: Get Evaluated
Submit and receive a comprehensive evaluation report with:
- Your scores across all 5 rubric categories
- A verdict on whether your response would strengthen or hurt your file
- Specific clichés and credibility red flags
- A candid tier comparison (rejected vs. admitted vs. exceptional)
- 2-3 follow-up questions a real admissions panel would ask you

---

## Evaluation Criteria Explained

### 1. Structure & Constraint Compliance (25 pts)
**What we're measuring:** Can you follow instructions and organize your thoughts clearly?
- Respect for word/time limits (exceeding by 15%+ loses points)
- Logical flow and paragraph structure
- Clear opening and closing

**Red flag:** "I don't have time to structure this properly." Elite candidates always make time.

### 2. Character, Judgment & Maturity (25 pts)
**What we're measuring:** Are you emotionally mature? Do you think clearly under pressure?
- Evidence of emotional intelligence (reflection, acknowledgment, understanding)
- Vulnerability and self-awareness (not hiding behind polish)
- Clarity of communication

**Red flag:** Generic phrases like "I learned teamwork" with zero specificity.

### 3. Leadership & Ownership (15 pts)
**What we're measuring:** Did you actually lead, or just participate?
- **Queen's:** Thoughtful influence and collaboration (18+ pts if demonstrated)
- **Ivey:** Spearheading initiatives with clear decision authority (13+ pts if 3+ leadership verbs used)
- **Rotman:** Analytical decision-making under constraints (10+ pts if 2+ frameworks used)

**Red flag:** "I helped" or "I was part of the team." Own your role.

### 4. Impact & Results (15 pts)
**What we're measuring:** What actually changed because of you?
- Quantifiable metrics (# people, $, %, improvements)
- Concrete outcomes (not just feelings or intentions)
- Scale and scope of change

**Red flag:** "I made a difference" with zero numbers. How?

### 5. Authenticity & Reflection (20 pts)
**What we're measuring:** Did you genuinely learn and change, or did you just recite a polished story?
- Real transformation (before/after thinking)
- Application of learning to future behavior
- Vulnerability and humility
- Acknowledgment of what you'd do differently

**Red flag:** "This taught me resilience" without showing how resilience changed your actions.

---

## Understanding Your Score

| Score | Verdict | What It Means |
|-------|---------|---------------|
| **85-100** | **EXCEPTIONAL** | You're genuinely competitive. Strong admit candidate. |
| **75-84** | **ADMITTED** | You're above average but need polish. Likely admit. |
| **65-74** | **NEUTRAL** | Competent but forgettable. On the border. |
| **50-64** | **WEAK** | Significant weaknesses. Likely reject. |
| **<50** | **CRITICAL** | Major red flags. Almost certain rejection. |

---

## Tips for Success

### ✅ DO:
- Use specific names, dates, numbers, and outcomes
- Show the "before" and "after" of your thinking
- Acknowledge what you got wrong or would do differently
- Use your authentic voice (not a thesaurus)
- Demonstrate ownership and decision-making authority
- Provide context for why your story matters

### ❌ DON'T:
- Use filler phrases: "I learned the importance of," "stepped out of comfort zone," "worked hard"
- Exceed word limits by >15% (shows you can't edit)
- Claim solo credit when it was collaborative
- Provide no metrics or evidence
- Submit generic stories that could apply to 1,000+ applicants
- Hide behind polish instead of being real

---

## Frequently Asked Questions

**Q: Can I use this multiple times?**
Yes. Every prompt is unique. Take the same question 5 times, see your score improve.

**Q: Are the prompts exactly what the schools ask?**
No. We generate **inspired-by** questions that match each school's priorities. The actual application prompts may differ slightly, but the evaluation rubric matches their real assessment criteria.

**Q: What if I disagree with my score?**
First: reread your response with fresh eyes. The grading is harsh but fair. If you still think the score is off, the follow-up questions will clarify what the admissions panel would probe deeper on.

**Q: Can I submit this exact response to the schools?**
Absolutely not. This is practice. Use feedback to identify weaknesses and rewrite. Treat every response as a draft.

**Q: How long should responses be?**
Use the full word/time limit. Short responses often lack depth. But never pad—every sentence should earn its place.

---

## School-Specific Guidance

### Queen's Smith Commerce
- **Priority:** Reflection, self-awareness, judgment under uncertainty
- **What they want:** Evidence that you think deeply and critically about your decisions
- **Red flag:** Overconfidence or lack of nuance
- **Strategy:** Show the messiness of real decision-making. Admit uncertainty. Explain your thinking.

### Western Ivey AEO
- **Priority:** Initiative, leadership, measurable impact
- **What they want:** Proof you drive change and mobilize others
- **Red flag:** Passive participation. Weak metrics.
- **Strategy:** Use action verbs. Quantify everything. Show what happened *because* you led.

### U of T Rotman Commerce
- **Priority:** Analytical thinking, intellectual curiosity, frameworks
- **What they want:** Evidence of rigorous, structured problem-solving
- **Red flag:** Emotional decisions without logic. No frameworks.
- **Strategy:** Show your analytical process. Reference models/frameworks. Make trade-offs explicit.

---

## Contributing

Found a bug? Have a better prompt? Open an issue or PR.

---

## License

MIT License. Use freely for educational purposes.

---

**Built for ambitious students who don't settle for generic feedback.**

*"The best rehearsal is the one where you discover your weaknesses before the real audition."*

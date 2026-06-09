// Prompt Database
const prompts = {
    queens: [
        {
            question: "Describe a moment when you had to make a difficult decision under uncertainty. How did you approach it, and what would you do differently knowing what you know now?",
            timeLimit: 45,
            wordLimit: 650
        },
        {
            question: "Tell us about a time when your initial perspective on a problem was challenged by someone else. How did that experience shape your thinking?",
            timeLimit: 45,
            wordLimit: 650
        },
        {
            question: "Reflect on a failure or setback. What did it reveal about your character, and how has it influenced your approach to future challenges?",
            timeLimit: 45,
            wordLimit: 650
        }
    ],
    ivey: [
        {
            question: "Describe a situation where you identified a problem in your school or community and took concrete action to address it. What was the measurable impact of your initiative, and what challenges did you overcome as the project owner?",
            timeLimit: 45,
            wordLimit: 650
        },
        {
            question: "Tell us about a time you led a team or group through a complex challenge. How did you mobilize others, and what specific outcomes did your leadership produce?",
            timeLimit: 45,
            wordLimit: 650
        },
        {
            question: "Describe an initiative you spearheaded where you had to balance competing priorities or interests. What trade-offs did you make, and why did you make them?",
            timeLimit: 45,
            wordLimit: 650
        }
    ],
    rotman: [
        {
            question: "Walk us through your analysis of a complex business problem you've encountered (real or hypothetical). What frameworks did you use to break it down, and what conclusion did you reach?",
            timeLimit: 45,
            wordLimit: 650
        },
        {
            question: "Describe a time when you had to learn something entirely new within a tight timeframe. How did you structure your learning, and what analytical approach helped you master it?",
            timeLimit: 45,
            wordLimit: 650
        },
        {
            question: "Tell us about a decision where quantitative data pointed in one direction but your intuition pointed in another. How did you reconcile the two, and what was the outcome?",
            timeLimit: 45,
            wordLimit: 650
        }
    ]
};

// Generate Prompt
function generatePrompt(school, format) {
    const schoolPrompts = prompts[school];
    const randomPrompt = schoolPrompts[Math.floor(Math.random() * schoolPrompts.length)];
    return randomPrompt;
}

// Grading Engine
function gradeResponse(school, format, response, timeElapsed, wordLimit) {
    const scores = {};
    const details = {};

    // 1. Structure & Constraint Compliance (25 points)
    scores.structure = gradeStructure(response, wordLimit, format);

    // 2. Character, Judgment & Maturity (25 points)
    scores.character = gradeCharacter(response, school);

    // 3. Leadership & Ownership (15 points)
    scores.leadership = gradeLeadership(response, school);

    // 4. Impact & Results (15 points)
    scores.impact = gradeImpact(response);

    // 5. Authenticity & Reflection (20 points)
    scores.reflection = gradeReflection(response);

    // Calculate total
    scores.total = scores.structure + scores.character + scores.leadership + scores.impact + scores.reflection;

    // Analyze details
    details.cliches = detectCliches(response);
    details.credibilityIssues = findCredibilityIssues(response);
    details.memorability = assessMemorability(response, school);
    details.followupQuestions = generateFollowupQuestions(response, school, details);

    return {
        scores,
        details,
        school,
        response
    };
}

// Rubric Scoring Functions
function gradeStructure(response, wordLimit, format) {
    let score = 20; // Start at 80%
    const wordCount = response.trim().split(/\s+/).filter(w => w.length > 0).length;

    // Deduct for significantly exceeding word limit
    if (wordCount > wordLimit * 1.15) score -= 5;
    if (wordCount > wordLimit * 1.3) score -= 3;

    // Deduct for extremely short responses (under 30% of limit)
    if (wordCount < wordLimit * 0.3) score -= 8;

    // Check for logical flow
    const hasClearStart = /^[A-Z][a-z]/.test(response);
    const hasMultipleParagraphs = response.split('\n\n').length >= 2 || response.split('\n').length >= 3;

    if (!hasClearStart) score -= 2;
    if (!hasMultipleParagraphs && wordCount > 200) score -= 3;

    return Math.max(0, Math.min(25, score));
}

function gradeCharacter(response, school) {
    let score = 18; // Start at 72%

    // Look for evidence of emotional maturity
    const emotionalKeywords = ['reflected', 'realized', 'understood', 'acknowledged', 'recognized', 'considered', 'realized my'];
    const emotionalMaturityCount = emotionalKeywords.filter(kw => response.toLowerCase().includes(kw)).length;

    // Look for self-awareness
    const selfAwarenessKeywords = ['weakness', 'struggle', 'challenge', 'difficult', 'uncomfortable', 'mistake', 'failure'];
    const selfAwarenessCount = selfAwarenessKeywords.filter(kw => response.toLowerCase().includes(kw)).length;

    // Look for communication clarity
    const hasThesisStatement = /^[^.!?]*\b(believe|argue|demonstrate|show|highlight|underscore|prove|illustrate)\b/i.test(response);

    if (emotionalMaturityCount < 2) score -= 3;
    if (selfAwarenessCount === 0) score -= 5;
    if (!hasThesisStatement) score -= 2;

    // Check for clichés (deduct significantly)
    if (response.toLowerCase().includes('stepped out of my comfort zone')) score -= 4;
    if (response.toLowerCase().includes('i learned the importance')) score -= 4;

    return Math.max(0, Math.min(25, score));
}

function gradeLeadership(response, school) {
    let score = 0;

    // School-specific evaluation
    if (school === 'ivey') {
        // Ivey heavily weights leadership
        const leadershipKeywords = ['led', 'spearheaded', 'initiated', 'organized', 'mobilized', 'coordinated', 'directed', 'established'];
        const leadershipCount = leadershipKeywords.filter(kw => response.toLowerCase().includes(kw)).length;

        if (leadershipCount >= 3) score = 13;
        else if (leadershipCount >= 2) score = 10;
        else if (leadershipCount >= 1) score = 7;
        else score = 3;

        // Check for ownership language
        const ownershipKeywords = ['I decided', 'I took responsibility', 'I chose', 'my decision', 'I led', 'I owned'];
        const ownershipCount = ownershipKeywords.filter(kw => response.toLowerCase().includes(kw)).length;
        if (ownershipCount > 0) score += 2;
    } else if (school === 'queens') {
        // Queens is less focused on leadership titles
        const thoughtfulLeadershipKeywords = ['guided', 'influenced', 'helped', 'supported', 'collaborated', 'listened'];
        const thoughtfulCount = thoughtfulLeadershipKeywords.filter(kw => response.toLowerCase().includes(kw)).length;
        score = thoughtfulCount > 0 ? 8 : 4;
    } else {
        // Rotman: leadership as analytical thinking and decision-making
        const analyticalKeywords = ['analyzed', 'evaluated', 'assessed', 'considered multiple', 'perspective'];
        const analyticalCount = analyticalKeywords.filter(kw => response.toLowerCase().includes(kw)).length;
        score = analyticalCount >= 2 ? 10 : 5;
    }

    return Math.max(0, Math.min(15, score));
}

function gradeImpact(response) {
    let score = 8; // Start at 53%

    // Look for quantifiable metrics
    const metrics = response.match(/\b\d+\s*(?:people|students|dollars|percent|%|increased|raised|members|hours|days|weeks|months)\b/gi);
    if (metrics && metrics.length >= 2) score += 5;
    else if (metrics && metrics.length === 1) score += 2;

    // Look for concrete outcomes
    const outcomeKeywords = ['resulted in', 'led to', 'outcome', 'impact', 'change', 'improvement', 'success', 'achieved'];
    const outcomeCount = outcomeKeywords.filter(kw => response.toLowerCase().includes(kw)).length;
    if (outcomeCount >= 2) score += 2;
    if (outcomeCount === 0) score -= 3;

    // Check for vague language (deduct)
    const vagueKeywords = ['tried to', 'attempted to', 'hoped to', 'felt like', 'seemed to'];
    const vagueCount = vagueKeywords.filter(kw => response.toLowerCase().includes(kw)).length;
    if (vagueCount > 0) score -= 3;

    return Math.max(0, Math.min(15, score));
}

function gradeReflection(response) {
    let score = 12; // Start at 60%

    // Check for genuine self-reflection (not humblebrag)
    const reflectionKeywords = ['would do differently', 'learned', 'recognized', 'understand now', 'perspective changed', 'grown'];
    const reflectionCount = reflectionKeywords.filter(kw => response.toLowerCase().includes(kw)).length;

    if (reflectionCount >= 3) score += 6;
    else if (reflectionCount >= 2) score += 3;
    else if (reflectionCount === 0) score -= 5;

    // Check for future application
    const futureKeywords = ['now i', 'going forward', 'in the future', 'will continue', 'apply this', 'use this'];
    const futureCount = futureKeywords.filter(kw => response.toLowerCase().includes(kw)).length;
    if (futureCount > 0) score += 2;

    // Check for vulnerability (not hiding behind positivity)
    const vulnerabilityKeywords = ['struggled', 'wasn\'t sure', 'uncertain', 'doubt', 'afraid', 'wasn\'t prepared'];
    const vulnerabilityCount = vulnerabilityKeywords.filter(kw => response.toLowerCase().includes(kw)).length;
    if (vulnerabilityCount > 0) score += 2;

    return Math.max(0, Math.min(20, score));
}

// Cliché Detection
function detectCliches(response) {
    const cliches = [
        { phrase: "stepped out of my comfort zone", weakness: "Overused and lacks specificity about what was actually uncomfortable" },
        { phrase: "I learned the importance of teamwork", weakness: "Generic conclusion that doesn't demonstrate unique insight" },
        { phrase: "this experience taught me resilience", weakness: "Vague and fails to show how resilience manifested" },
        { phrase: "I worked hard and overcame challenges", weakness: "Effort alone is not a differentiator; results matter" },
        { phrase: "changed my perspective", weakness: "No evidence of how perspective actually changed behavior" },
        { phrase: "realized the power of", weakness: "Weak reflection that doesn't show depth of understanding" },
        { phrase: "never gave up", weakness: "Persistence without strategic thinking is not compelling" },
        { phrase: "passion for", weakness: "Generic term that lacks concrete evidence" }
    ];

    const detected = cliches.filter(c => response.toLowerCase().includes(c.phrase.toLowerCase()));
    return detected;
}

// Credibility Issues
function findCredibilityIssues(response) {
    const issues = [];

    // Check for exaggeration indicators
    if (response.toLowerCase().includes('single-handedly') || response.toLowerCase().includes('all by myself')) {
        issues.push({
            claim: "'Single-handedly' or 'all by myself' language",
            question: "Did you truly execute this entirely alone, or did you oversimplify? Admissions panels know most real work is collaborative."
        });
    }

    // Check for unsubstantiated impact claims
    const impactClaimsRegex = /(?:transformed|revolutionized|changed the entire|completely|fundamentally changed)/gi;
    if (impactClaimsRegex.test(response) && !response.match(/\d+/)) {
        issues.push({
            claim: "Large impact claims without metrics",
            question: "You used strong language like 'transformed' or 'revolutionized,' but provided no quantifiable evidence. What specific data supports this?"
        });
    }

    // Check for unclear decision-making
    if (response.toLowerCase().includes('just decided') || response.toLowerCase().includes('just knew')) {
        issues.push({
            claim: "'Just decided' or 'just knew' without reasoning",
            question: "You glossed over the decision-making process. What factors influenced your choice?"
        });
    }

    return issues;
}

// Memorability Assessment
function assessMemorability(response, school) {
    const wordCount = response.trim().split(/\s+/).length;
    const hasSpecificDetails = /[A-Z][a-z]+\s+[A-Z][a-z]+/.test(response); // Proper nouns
    const hasNumbers = /\d+/.test(response);
    const hasQuote = /["'].+["']/.test(response);
    const hasPersonalVoice = /I believe|I think|I felt|I realized/.test(response);

    let memorabilityScore = 0;
    if (hasSpecificDetails) memorabilityScore++;
    if (hasNumbers) memorabilityScore++;
    if (hasQuote) memorabilityScore++;
    if (hasPersonalVoice) memorabilityScore++;

    return {
        score: memorabilityScore,
        details: {
            hasSpecificDetails,
            hasNumbers,
            hasQuote,
            hasPersonalVoice,
            wordCount
        }
    };
}

// Follow-up Questions
function generateFollowupQuestions(response, school, details) {
    const questions = [];

    if (school === 'ivey' && !response.toLowerCase().includes('led')) {
        questions.push({
            num: 1,
            question: "You mentioned this initiative, but it's unclear what specific decisions YOU made as a leader. What authority did you have, and what would have happened differently if you hadn't been involved?"
        });
    }

    if (!response.match(/\d+/) || details.credibilityIssues.length > 0) {
        questions.push({
            num: questions.length + 1,
            question: "Your response lacks quantifiable evidence of impact. Can you provide specific metrics: how many people did this reach? What was the dollar value? What percentage improvement occurred?"
        });
    }

    if (response.toLowerCase().includes('learned') && !response.toLowerCase().includes('would do differently')) {
        questions.push({
            num: questions.length + 1,
            question: "You say you 'learned' something, but you don't explain how this learning changed your subsequent actions. Can you give an example of how you applied this lesson differently in a later situation?"
        });
    }

    if (questions.length < 2) {
        questions.push({
            num: questions.length + 1,
            question: "Walk me through your decision-making process in this situation. What were the trade-offs you considered, and why did you choose this path over alternatives?"
        });
    }

    if (questions.length < 3) {
        questions.push({
            num: questions.length + 1,
            question: "What aspect of this experience surprised you, or didn't go according to plan? How did you adapt?"
        });
    }

    return questions.slice(0, 3);
}

// Report Display
function displayReport(evaluation) {
    const { scores, details, school } = evaluation;

    // Score Display
    document.getElementById('final-score').textContent = scores.total;
    document.getElementById('score-structure').textContent = scores.structure;
    document.getElementById('score-character').textContent = scores.character;
    document.getElementById('score-leadership').textContent = scores.leadership;
    document.getElementById('score-impact').textContent = scores.impact;
    document.getElementById('score-reflection').textContent = scores.reflection;

    // Rejection Threshold
    const thresholdResult = scores.total >= 80 ? 'STRENGTHEN THE FILE' : scores.total >= 65 ? 'BE NEUTRAL' : 'HURT THE FILE';
    const thresholdReasonText = getThresholdReason(scores.total, school);

    document.getElementById('threshold-result').innerHTML = `<strong>If reviewing this application among highly competitive candidates, this response would: <span style="color: var(--accent)">${thresholdResult}</span></strong>`;
    document.getElementById('threshold-reason').textContent = thresholdReasonText;

    // Memorability Test
    const memorability = details.memorability;
    let memorabilityHTML = '';

    memorabilityHTML += `<div class="memorability-item"><strong>The Applicant:</strong> ${memorability.details.hasPersonalVoice ? 'Yes — Personal voice is evident' : 'No — Lacks personal voice and perspective'}</div>`;
    memorabilityHTML += `<div class="memorability-item"><strong>The Accomplishment:</strong> ${memorability.details.hasSpecificDetails && memorability.details.hasNumbers ? 'Yes — Specific details and metrics make it concrete' : 'No — Too vague or generic'}</div>`;
    memorabilityHTML += `<div class="memorability-item"><strong>The Lesson:</strong> ${scores.reflection >= 12 ? 'Yes — Clear learning demonstrated' : 'No — Reflection is superficial'}</div>`;

    document.getElementById('memorability-test').innerHTML = memorabilityHTML;

    // Credibility Audit
    if (details.credibilityIssues.length > 0) {
        let auditHTML = '<ul class="cliche-list">';
        details.credibilityIssues.forEach(issue => {
            auditHTML += `<li><strong>${issue.claim}</strong><br/>${issue.question}</li>`;
        });
        auditHTML += '</ul>';
        document.getElementById('credibility-audit').innerHTML = auditHTML;
    } else {
        document.getElementById('credibility-audit').innerHTML = '<p>✓ No major credibility red flags detected.</p>';
    }

    // Cliché Detector
    if (details.cliches.length > 0) {
        let clicheHTML = `<p><strong>Detected Clichés:</strong></p><ul class="cliche-list">`;
        details.cliches.forEach(c => {
            clicheHTML += `<li><strong>"${c.phrase}"</strong> — ${c.weakness}</li>`;
        });
        clicheHTML += '</ul>';
        document.getElementById('cliche-detector').innerHTML = clicheHTML;
    } else {
        document.getElementById('cliche-detector').innerHTML = '<p>✓ No major clichés detected. Good originality.</p>';
    }

    // Strategic Deconstruction
    const deconstructionHTML = getStrategicDeconstruction(scores, school);
    document.getElementById('strategic-deconstruction').innerHTML = deconstructionHTML;

    // Tier Comparison
    const tierHTML = getTierComparison(scores, school);
    document.getElementById('tier-comparison').innerHTML = tierHTML;

    // Follow-up Questions
    let followupHTML = '';
    details.followupQuestions.forEach(q => {
        followupHTML += `<div class="followup-question"><strong>${q.num}. ${q.question}</strong></div>`;
    });
    document.getElementById('followup-questions').innerHTML = followupHTML;

    showStage('report');
}

// Helper Functions
function getThresholdReason(score, school) {
    if (score >= 80) {
        return `This response demonstrates strong alignment with ${school === 'queens' ? "Queen's focus on reflection and judgment" : school === 'ivey' ? "Ivey's emphasis on leadership and measurable impact" : "Rotman's analytical rigor and structured thinking"}. The applicant would be competitive in a strong candidate pool.`;
    } else if (score >= 65) {
        return `This response is competent but lacks the depth, specificity, or authenticity needed to stand out. It would need significant strengthening to be competitive against other applicants.`;
    } else {
        return `This response has significant weaknesses in structure, credibility, or reflection. It would likely be rejected in favor of stronger candidates. Rewrite focusing on concrete evidence and genuine self-awareness.`;
    }
}

function getStrategicDeconstruction(scores, school) {
    let html = '<div>';

    if (scores.impact < 10) {
        html += '<p><strong>Weakness: Lack of Quantifiable Impact</strong><br/>Your response emphasizes effort and feeling but provides no metrics. Add: number of people affected, dollar amounts, percentage improvements, or specific outcomes. Instead of "I made a difference," say "I raised $5,000 for the food bank, providing meals to 200+ families monthly."</p>';
    }

    if (scores.reflection < 12) {
        html += '<p><strong>Weakness: Surface-Level Reflection</strong><br/>You describe what happened but not why it matters or how you changed. Add: "Before this, I would have... Now, I..." Show the before/after mindset shift.</p>';
    }

    if (scores.leadership < 10 && school === 'ivey') {
        html += '<p><strong>Weakness: Passive Language (Critical for Ivey)</strong><br/>You used "participated" and "helped" instead of "led" and "owned." Ivey wants decision-makers. Reframe: "I identified the problem, proposed a solution, assembled the team, and drove the project to completion."</p>';
    }

    if (scores.character < 18) {
        html += '<p><strong>Weakness: Lack of Vulnerability or Self-Awareness</strong><br/>Your response feels polished but lacks depth. Share: What surprised you? What did you get wrong? What do you still struggle with? Authenticity trumps perfection.</p>';
    }

    html += '</div>';
    return html;
}

function getTierComparison(scores, school) {
    let html = '';

    html += `<div class="tier-box rejected"><strong>🚫 Typical Rejected Applicant:</strong> Generic story with no metrics, clichéd language, and weak self-reflection. "I led a club, learned teamwork, and grew as a person." No evidence. No specifics. Indistinguishable from 100 other applications.</div>`;

    html += `<div class="tier-box admitted"><strong>✅ Typical Admitted Applicant:</strong> Clear narrative with 2-3 specific metrics, thoughtful reflection on a real trade-off or failure, and authentic voice. "I increased membership 150%, but the program collapsed after I graduated because I didn't build leadership capacity—a lesson I now apply by mentoring my successor."</div>`;

    const tier = scores.total >= 85 ? 'exceptional' : scores.total >= 75 ? 'admitted' : scores.total >= 65 ? 'admitted' : 'rejected';
    const tierLabel = tier === 'exceptional' ? '🌟 Your Response Most Resembles: EXCEPTIONAL' : tier === 'admitted' ? '✅ Your Response Most Resembles: ADMITTED' : '🚫 Your Response Most Resembles: REJECTED';
    const tierExplanation = tier === 'exceptional' ? 'You demonstrated exceptional judgment, specificity, and self-awareness.' : tier === 'admitted' ? 'You're in the admitted range but need polish and stronger metrics.' : 'Significant gaps in authenticity, impact, or reflection need addressing.';

    html += `<div class="tier-box ${tier}"><strong>${tierLabel}</strong><br/>${tierExplanation}</div>`;

    return html;
}

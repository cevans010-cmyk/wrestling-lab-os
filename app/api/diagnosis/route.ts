import OpenAI from "openai";
import { NextResponse } from "next/server";

// Toggle this to control AI usage
const USE_AI = false;

// OpenAI client (only used if USE_AI = true)
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Confidence = "Low" | "Medium" | "High";
type PriorityLevel = "Low" | "Medium" | "High";

type DiagnosisResult = {
  primaryFactor: string;
  secondaryFactor: string;
  thirdFactor: string;
  summary: string;
  firstFix: string;
  confidence: Confidence;
  severityScore: number;
  priorityLevel: PriorityLevel;
};

type RuleInput = {
  experienceLevel?: string;
  style?: string;
  trainingDays?: string;
  competitionLevel?: string;
  goal?: string;
  weakness?: string;
  matchBreakdown?: string;
  attackOutcome?: string;
  defenseResponse?: string;
  postAttackReaction?: string;
  unclearPositionResponse?: string;
  pressureResponse?: string;
  decisionControl?: string;
  scoringPattern?: string;
  chainBreakPoint?: string;
  chainFrequency?: string;
  postAttackOutcome?: string;
  stanceConfidence?: string;
  handFightConfidence?: string;
  positionConfidence?: string;
  setupConfidence?: string;
  finishConfidence?: string;
  reAttackConfidence?: string;
  scrambleConfidence?: string;
  tacticalConfidence?: string;
  relianceType?: string;
  fatigueBreakdown?: string;
  archetype?: string;
  frustration?: string;
};

function isLow(value?: string): boolean {
  return value === "Very low" || value === "Low";
}

function isMediumOrLower(value?: string): boolean {
  return value === "Very low" || value === "Low" || value === "Medium";
}

function clampScore(score: number): number {
  return Math.max(1, Math.min(10, score));
}

function getPriorityLevel(score: number): PriorityLevel {
  if (score >= 8) return "High";
  if (score >= 5) return "Medium";
  return "Low";
}

function buildRuleBasedDiagnosis(body: RuleInput): DiagnosisResult {
  let primaryFactor = "Chain wrestling breakdown";
  let secondaryFactor = "Poor decision making under pressure";
  let thirdFactor = "Low attention to positional upgrades";
  let firstFix =
    "Build one simple 2-step chain from first contact instead of relying on one isolated attack.";
  let confidence: Confidence = "Medium";

  let severityScore = 5;
  const reasons: string[] = [];

  // RULE 1: Chain breakdown
  if (
    body.chainBreakPoint === "Transition to next attack" ||
    body.chainBreakPoint === "During attack entry" ||
    body.chainBreakPoint === "During finishing phase" ||
    body.chainFrequency === "Often" ||
    body.chainFrequency === "Almost every match" ||
    body.postAttackOutcome === "I pause instead of continuing" ||
    body.postAttackOutcome === "I lose position after attacking"
  ) {
    primaryFactor = "Chain wrestling breakdown";
    severityScore += 2;
    reasons.push(
      "Your answers show that your sequences are breaking after the first action instead of flowing into the next scoring opportunity."
    );
    firstFix =
      "Choose one reliable entry and one immediate follow-up attack, then drill them as one connected sequence.";
    confidence = "High";
  }

  // RULE 2: Decision making under pressure
  if (
    body.pressureResponse === "I hesitate" ||
    body.pressureResponse === "I become defensive" ||
    body.unclearPositionResponse === "I freeze or pause" ||
    body.decisionControl ===
      "I often choose the wrong option under pressure" ||
    body.decisionControl === "My decisions break down late in the match" ||
    body.frustration === "I make bad decisions under pressure"
  ) {
    severityScore += 2;

    if (primaryFactor !== "Poor decision making under pressure") {
      secondaryFactor = "Poor decision making under pressure";
    } else {
      primaryFactor = "Poor decision making under pressure";
    }

    reasons.push(
      "Your responses suggest that pressure is narrowing your choices and causing hesitation, defensive reactions, or poor timing."
    );

    if (primaryFactor === "Poor decision making under pressure") {
      firstFix =
        "Reduce your match decisions to one clear response from neutral, one from first contact, and one from a failed attack.";
      confidence = "High";
    }
  }

  // RULE 3: Inside space / position problems
  if (
    body.attackOutcome === "I get blocked before I can enter" ||
    body.attackOutcome === "I enter but lose position" ||
    body.defenseResponse === "I get stuck reacting late" ||
    body.matchBreakdown === "At first contact" ||
    isLow(body.handFightConfidence) ||
    isLow(body.positionConfidence) ||
    isLow(body.stanceConfidence)
  ) {
    severityScore += 2;

    if (
      primaryFactor !== "Inside space control problems" &&
      secondaryFactor !== "Inside space control problems"
    ) {
      secondaryFactor = "Inside space control problems";
    } else {
      primaryFactor = "Inside space control problems";
    }

    reasons.push(
      "You appear to be losing position too early, especially around first contact, hand fighting, and initial space control."
    );

    if (primaryFactor === "Inside space control problems") {
      firstFix =
        "Spend a full training block on winning inside position before attacking, rather than rushing straight to finishes.";
      confidence = "High";
    }
  }

  // RULE 4: Finish / conversion issue
  if (
    body.attackOutcome === "I get to the leg but cannot finish" ||
    body.frustration === "I cannot finish attacks" ||
    isLow(body.finishConfidence)
  ) {
    severityScore += 1;

    if (
      primaryFactor !== "Poor attack conversion" &&
      secondaryFactor !== "Poor attack conversion"
    ) {
      secondaryFactor = "Poor attack conversion";
    } else {
      primaryFactor = "Poor attack conversion";
    }

    reasons.push(
      "You are getting close enough to attack, but the scoring sequence is breaking before completion."
    );

    if (primaryFactor === "Poor attack conversion") {
      firstFix =
        "Narrow your focus to one finish from clean entry and one finish from a messy entry, then repeat them under fatigue.";
      confidence = "High";
    }
  }

  // RULE 5: Over-reliance on scramble / reactive style
  if (
    body.archetype === "Reactive scrambler" ||
    body.relianceType === "Scrambling" ||
    body.unclearPositionResponse === "I scramble immediately" ||
    body.scrambleConfidence === "High" ||
    body.scrambleConfidence === "Very high"
  ) {
    severityScore += 1;

    if (
      primaryFactor !== "Reactive wrestling habits" &&
      secondaryFactor !== "Reactive wrestling habits"
    ) {
      thirdFactor = "Reactive wrestling habits";
    } else {
      primaryFactor = "Reactive wrestling habits";
    }

    reasons.push(
      "You seem to be relying on reactive movement and scrambles instead of building control through structure."
    );

    if (primaryFactor === "Reactive wrestling habits") {
      firstFix =
        "Replace your first scramble instinct with one positional recovery rule and one re-attack rule.";
      confidence = "Medium";
    }
  }

  // RULE 6: Tactical awareness / match management
  if (
    isLow(body.tacticalConfidence) ||
    body.scoringPattern === "I score early but cannot maintain control" ||
    body.scoringPattern === "I struggle to create scoring chances" ||
    body.frustration === "I lose to worse opponents"
  ) {
    severityScore += 1;

    if (
      primaryFactor !== "Low tactical awareness" &&
      secondaryFactor !== "Low tactical awareness"
    ) {
      thirdFactor = "Low tactical awareness";
    } else {
      primaryFactor = "Low tactical awareness";
    }

    reasons.push(
      "Your scoring pattern suggests a tactical issue, not just a technical one. You may be struggling to manage match direction."
    );

    if (primaryFactor === "Low tactical awareness") {
      firstFix =
        "Define one match-opening objective, one scoring route, and one shutdown response after you score.";
      confidence = "Medium";
    }
  }

  // RULE 7: Physical / fatigue-led breakdown
  if (
    body.frustration === "I gas out too quickly" ||
    body.fatigueBreakdown === "Effort/output" ||
    body.fatigueBreakdown === "Decisions" ||
    body.fatigueBreakdown === "Stance"
  ) {
    severityScore += 1;

    if (
      primaryFactor !== "Fatigue-driven breakdown" &&
      secondaryFactor !== "Fatigue-driven breakdown"
    ) {
      thirdFactor = "Fatigue-driven breakdown";
    } else {
      primaryFactor = "Fatigue-driven breakdown";
    }

    reasons.push(
      "Your answers suggest that fatigue is not just lowering output, but also disrupting decisions, posture, and technical consistency."
    );

    if (primaryFactor === "Fatigue-driven breakdown") {
      firstFix =
        "Train your best 2 actions at the end of rounds so your decision quality holds when tired.";
      confidence = "Medium";
    }
  }

  // RULE 8: Beginner foundation issue
  if (
    body.experienceLevel === "Beginner" ||
    body.archetype === "Beginner learning foundation"
  ) {
    severityScore += 1;

    if (
      primaryFactor !== "Under-developed fundamental understanding" &&
      secondaryFactor !== "Under-developed fundamental understanding"
    ) {
      thirdFactor = "Under-developed fundamental understanding";
    } else {
      primaryFactor = "Under-developed fundamental understanding";
    }

    reasons.push(
      "Your profile suggests the main issue may be a foundation problem rather than one isolated technical flaw."
    );

    if (primaryFactor === "Under-developed fundamental understanding") {
      firstFix =
        "Build your game around stance, first contact, inside control, one entry, and one finish before adding complexity.";
      confidence = "High";
    }
  }

  severityScore = clampScore(severityScore);
  const priorityLevel = getPriorityLevel(severityScore);

  const summary =
    reasons.length > 0
      ? reasons.join(" ")
      : "Your responses suggest that your wrestling is being limited more by pattern breakdowns than by a lack of effort. The main issue appears to be structure, decision clarity, and positional control under pressure.";

  return {
    primaryFactor,
    secondaryFactor,
    thirdFactor,
    summary,
    firstFix,
    confidence,
    severityScore,
    priorityLevel,
  };
}

export async function POST(req: Request) {
  try {
    const body: RuleInput = await req.json();

    if (!USE_AI) {
      const ruleBasedDiagnosis = buildRuleBasedDiagnosis(body);
      return NextResponse.json(ruleBasedDiagnosis);
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Missing OpenAI API key" },
        { status: 500 }
      );
    }

    const input = `
You are an elite wrestling coach inside The Wrestling Lab system.

Your job is to identify the REAL limiting factors — not surface-level answers.

You MUST:
- Think in first principles
- Prioritize position before action
- Identify breakdowns in chain wrestling
- Identify decision-making errors under pressure

Return ONLY valid JSON in this format:

{
  "primaryFactor": "...",
  "secondaryFactor": "...",
  "thirdFactor": "...",
  "summary": "...",
  "firstFix": "...",
  "confidence": "Low | Medium | High",
  "severityScore": 1,
  "priorityLevel": "Low | Medium | High"
}

Rules:
- Be direct and specific (no fluff)
- Call out mistakes clearly
- Focus on patterns, not isolated events
- Tie everything back to Wrestling Lab principles

User data:

Experience: ${body.experienceLevel}
Style: ${body.style}
Training days: ${body.trainingDays}
Competition: ${body.competitionLevel}
Goal: ${body.goal}
Weakness: ${body.weakness}

Match breakdown: ${body.matchBreakdown}
Attack outcome: ${body.attackOutcome}
Defense response: ${body.defenseResponse}
Pressure response: ${body.pressureResponse}
Chain break: ${body.chainBreakPoint}
Fatigue: ${body.fatigueBreakdown}
Archetype: ${body.archetype}
`;

    const response = await client.responses.create({
      model: "gpt-5.4-mini",
      input,
    });

    const text = response.output_text;

    if (!text) {
      return NextResponse.json(
        { error: "No output from AI" },
        { status: 500 }
      );
    }

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON from AI", raw: text },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
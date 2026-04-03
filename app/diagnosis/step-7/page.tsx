"use client";
import { useEffect, useState } from "react";

export default function DiagnosisResultsPage() {
  const [style, setStyle] = useState("");
  const [weakness, setWeakness] = useState("");
  const [matchBreakdown, setMatchBreakdown] = useState("");
  const [attackOutcome, setAttackOutcome] = useState("");
  const [defenseResponse, setDefenseResponse] = useState("");
  const [postAttackReaction, setPostAttackReaction] = useState("");
  const [pressureResponse, setPressureResponse] = useState("");
  const [unclearPositionResponse, setUnclearPositionResponse] = useState("");
  const [decisionControl, setDecisionControl] = useState("");
  const [scoringPattern, setScoringPattern] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [trainingDays, setTrainingDays] = useState("");
  const [competitionLevel, setCompetitionLevel] = useState("");
  const [goal, setGoal] = useState("");
  const [chainBreakPoint, setChainBreakPoint] = useState("");
  const [chainFrequency, setChainFrequency] = useState("");
  const [postAttackOutcome, setPostAttackOutcome] = useState("");
  const [stanceConfidence, setStanceConfidence] = useState("");
  const [handFightConfidence, setHandFightConfidence] = useState("");
  const [positionConfidence, setPositionConfidence] = useState("");
  const [setupConfidence, setSetupConfidence] = useState("");
  const [finishConfidence, setFinishConfidence] = useState("");
  const [reAttackConfidence, setReAttackConfidence] = useState("");
  const [scrambleConfidence, setScrambleConfidence] = useState("");
  const [tacticalConfidence, setTacticalConfidence] = useState("");
  const [relianceType, setRelianceType] = useState("");
  const [fatigueBreakdown, setFatigueBreakdown] = useState("");
  const [archetype, setArchetype] = useState("");
  const [frustration, setFrustration] = useState("");
  const [customFrustration, setCustomFrustration] = useState("");

  useEffect(() => {
    const savedStyle = localStorage.getItem("style") || "";
    const savedWeakness = localStorage.getItem("weakness") || "";
    const savedMatchBreakdown = localStorage.getItem("matchBreakdown") || "";
    const savedAttackOutcome = localStorage.getItem("attackOutcome") || "";
    const savedDefenseResponse = localStorage.getItem("defenseResponse") || "";
    const savedPostAttackReaction =
      localStorage.getItem("postAttackReaction") || "";
    const savedPressureResponse =
      localStorage.getItem("pressureResponse") || "";
    const savedUnclearPositionResponse =
      localStorage.getItem("unclearPositionResponse") || "";
    const savedDecisionControl =
      localStorage.getItem("decisionControl") || "";
    const savedScoringPattern = localStorage.getItem("scoringPattern") || "";
    const savedExperienceLevel =
      localStorage.getItem("experienceLevel") || "";
    const savedTrainingDays = localStorage.getItem("trainingDays") || "";
    const savedCompetitionLevel =
      localStorage.getItem("competitionLevel") || "";
    const savedGoal = localStorage.getItem("goal") || "";
    const savedChainBreakPoint =
      localStorage.getItem("chainBreakPoint") || "";
    const savedChainFrequency =
      localStorage.getItem("chainFrequency") || "";
    const savedPostAttackOutcome =
      localStorage.getItem("postAttackOutcome") || "";
    const savedStanceConfidence =
      localStorage.getItem("stanceConfidence") || "";
    const savedHandFightConfidence =
      localStorage.getItem("handFightConfidence") || "";
    const savedPositionConfidence =
      localStorage.getItem("positionConfidence") || "";
    const savedSetupConfidence =
      localStorage.getItem("setupConfidence") || "";
    const savedFinishConfidence =
      localStorage.getItem("finishConfidence") || "";
    const savedReAttackConfidence =
      localStorage.getItem("reAttackConfidence") || "";
    const savedScrambleConfidence =
      localStorage.getItem("scrambleConfidence") || "";
    const savedTacticalConfidence =
      localStorage.getItem("tacticalConfidence") || "";
    const savedRelianceType = localStorage.getItem("relianceType") || "";
    const savedFatigueBreakdown =
      localStorage.getItem("fatigueBreakdown") || "";
    const savedArchetype = localStorage.getItem("archetype") || "";
    const savedFrustration = localStorage.getItem("frustration") || "";
    const savedCustomFrustration =
      localStorage.getItem("customFrustration") || "";

    setStyle(savedStyle);
    setWeakness(savedWeakness);
    setMatchBreakdown(savedMatchBreakdown);
    setAttackOutcome(savedAttackOutcome);
    setDefenseResponse(savedDefenseResponse);
    setPostAttackReaction(savedPostAttackReaction);
    setPressureResponse(savedPressureResponse);
    setUnclearPositionResponse(savedUnclearPositionResponse);
    setDecisionControl(savedDecisionControl);
    setScoringPattern(savedScoringPattern);
    setExperienceLevel(savedExperienceLevel);
    setTrainingDays(savedTrainingDays);
    setCompetitionLevel(savedCompetitionLevel);
    setGoal(savedGoal);
    setChainBreakPoint(savedChainBreakPoint);
    setChainFrequency(savedChainFrequency);
    setPostAttackOutcome(savedPostAttackOutcome);
    setStanceConfidence(savedStanceConfidence);
    setHandFightConfidence(savedHandFightConfidence);
    setPositionConfidence(savedPositionConfidence);
    setSetupConfidence(savedSetupConfidence);
    setFinishConfidence(savedFinishConfidence);
    setReAttackConfidence(savedReAttackConfidence);
    setScrambleConfidence(savedScrambleConfidence);
    setTacticalConfidence(savedTacticalConfidence);
    setRelianceType(savedRelianceType);
    setFatigueBreakdown(savedFatigueBreakdown);
    setArchetype(savedArchetype);
    setFrustration(savedFrustration);
    setCustomFrustration(savedCustomFrustration);
  }, []);

  let primaryFactor = "Lack of tactical awareness";

  if (weakness === "Poor decision making under pressure") {
    primaryFactor = "Decision making under pressure";
  } else if (weakness === "Chain wrestling breakdown") {
    primaryFactor = "Chain wrestling breakdown";
  } else if (weakness === "Low percentage scrambling outcomes") {
    primaryFactor = "Low percentage scrambling outcomes";
  } else if (weakness === "Under-developed understanding of fundamentals") {
    primaryFactor = "Fundamental understanding gap";
  } else if (weakness === "Physical condition") {
    primaryFactor = "Physical conditioning limitation";
  }

  if (pressureResponse === "I hesitate") {
    primaryFactor = "Decision making under pressure";
  }

  if (matchBreakdown === "In scramble situations") {
    primaryFactor = "Low percentage scrambling outcomes";
  }

  if (chainBreakPoint === "Transition to next attack") {
    primaryFactor = "Chain wrestling breakdown";
  }

  if (fatigueBreakdown === "Effort/output" || matchBreakdown === "Late in the match") {
    primaryFactor = "Physical conditioning limitation";
  }

  let secondaryFactor = "Decision making under pressure";
  let secondaryExplanation =
    "Even when your technique is correct, hesitation or rushed decisions reduce your ability to execute consistently.";

  if (primaryFactor === "Decision making under pressure") {
    secondaryFactor = "Positional control inconsistency";
    secondaryExplanation =
      "Small positional breakdowns are making it harder to stabilise exchanges and stay in control under pressure.";
  }

  if (primaryFactor === "Chain wrestling breakdown") {
    secondaryFactor = "Decision making under pressure";
    secondaryExplanation =
      "Once your first attack stalls, hesitation in the next decision makes it harder to keep the sequence alive.";
  }

  if (primaryFactor === "Low percentage scrambling outcomes") {
    secondaryFactor = "Positional control inconsistency";
    secondaryExplanation =
      "Losing control early is forcing you into reactive scrambles and making your outcomes less reliable.";
  }

  if (primaryFactor === "Fundamental understanding gap") {
    secondaryFactor = "Positional control inconsistency";
    secondaryExplanation =
      "Without strong fundamentals, your positions become harder to hold and your control breaks down more often.";
  }

  if (primaryFactor === "Lack of tactical awareness") {
    secondaryFactor = "Decision making under pressure";
    secondaryExplanation =
      "Missing the right moment often leads to rushed decisions once the position becomes more chaotic.";
  }

  if (primaryFactor === "Physical conditioning limitation") {
    secondaryFactor = "Decision making under pressure";
    secondaryExplanation =
      "As fatigue rises, your choices become slower and less accurate, which reduces execution quality.";
  }

  let thirdFactor = "Positional control inconsistency";
  let thirdExplanation =
    "Small breakdowns in position are compounding over time, making it harder to maintain control through exchanges.";

  if (primaryFactor === "Decision making under pressure") {
    thirdFactor = "Chain wrestling breakdown";
    thirdExplanation =
      "Even when you make a good initial decision, the sequence often stops early instead of continuing into a clean finish.";
  }

  if (primaryFactor === "Chain wrestling breakdown") {
    thirdFactor = "Positional control inconsistency";
    thirdExplanation =
      "Without stable positions between actions, it becomes harder to connect your attacks cleanly.";
  }

  if (primaryFactor === "Low percentage scrambling outcomes") {
    thirdFactor = "Decision making under pressure";
    thirdExplanation =
      "Scramble-heavy wrestling often forces fast decisions, which reduces consistency under pressure.";
  }

  if (primaryFactor === "Fundamental understanding gap") {
    thirdFactor = "Chain wrestling breakdown";
    thirdExplanation =
      "Without strong fundamentals, your ability to link actions together becomes limited.";
  }

  if (primaryFactor === "Lack of tactical awareness") {
    thirdFactor = "Positional control inconsistency";
    thirdExplanation =
      "Missing key moments often leads to losing control in positions that should be stable.";
  }

  if (primaryFactor === "Physical conditioning limitation") {
    thirdFactor = "Positional control inconsistency";
    thirdExplanation =
      "Fatigue reduces your ability to maintain strong positions over time.";
  }

  let priorityScore = "88 / 100";

  if (primaryFactor === "Decision making under pressure") {
    priorityScore = "91 / 100";
  }

  if (primaryFactor === "Chain wrestling breakdown") {
    priorityScore = "89 / 100";
  }

  if (primaryFactor === "Low percentage scrambling outcomes") {
    priorityScore = "84 / 100";
  }

  if (primaryFactor === "Fundamental understanding gap") {
    priorityScore = "93 / 100";
  }

  if (primaryFactor === "Lack of tactical awareness") {
    priorityScore = "86 / 100";
  }

  if (primaryFactor === "Physical conditioning limitation") {
    priorityScore = "82 / 100";
  }

  let confidenceScore = "High";

  if (
    primaryFactor === "Low percentage scrambling outcomes" ||
    primaryFactor === "Lack of tactical awareness" ||
    primaryFactor === "Physical conditioning limitation"
  ) {
    confidenceScore = "Medium";
  }

  let primaryExplanation =
    "You may be missing key moments to attack or defend, leading to poor timing and inefficient match strategy.";

  if (primaryFactor === "Decision making under pressure") {
    primaryExplanation =
      "You likely know what to do, but under pressure your decisions become rushed or unclear, leading to missed opportunities and defensive mistakes.";
  }

  if (primaryFactor === "Chain wrestling breakdown") {
    primaryExplanation =
      "You are likely getting to positions but failing to connect actions together. This causes your attacks to stall and gives your opponent time to recover.";
  }

  if (primaryFactor === "Low percentage scrambling outcomes") {
    primaryExplanation =
      "You are relying too heavily on reactive scrambles instead of controlling positions, which leads to inconsistent results and unnecessary risk.";
  }

  if (primaryFactor === "Fundamental understanding gap") {
    primaryExplanation =
      "Your base positioning and core mechanics are limiting everything else, making it harder to execute even simple techniques effectively.";
  }

  if (primaryFactor === "Physical conditioning limitation") {
    primaryExplanation =
      "Fatigue is likely affecting your ability to execute and make decisions, especially later in matches.";
  }

  let whatThisLooksLike =
    "You miss scoring windows, fail to recognise momentum shifts, or keep wrestling at the wrong tempo for the situation.";

  if (primaryFactor === "Decision making under pressure") {
    whatThisLooksLike =
      "You hesitate in key moments, force attacks too late, or choose the wrong response once the pace rises and the position becomes unclear.";
  }

  if (primaryFactor === "Chain wrestling breakdown") {
    whatThisLooksLike =
      "You get to an attack, but the sequence stalls after first contact. Your opponent recovers position before you can connect to the next action.";
  }

  if (primaryFactor === "Low percentage scrambling outcomes") {
    whatThisLooksLike =
      "You end up in messy exchanges too often, relying on reactions instead of control, and the outcomes become inconsistent.";
  }

  if (primaryFactor === "Fundamental understanding gap") {
    whatThisLooksLike =
      "Your stance, head position, posture, or movement break down early, which makes the rest of the exchange much harder to win cleanly.";
  }

  if (primaryFactor === "Physical conditioning limitation") {
    whatThisLooksLike =
      "Your positions and decisions get noticeably worse as the match goes on, especially once fatigue starts affecting your reactions.";
  }

  let firstFix =
    "Start reviewing your matches with one question: what moment did I miss? Build awareness of when to press, when to reset, and when to conserve position.";

  if (primaryFactor === "Decision making under pressure") {
    firstFix =
      "Reduce your options and work from a smaller decision tree. Train one clear response for each common position so you do not hesitate when the pace rises.";
  }

  if (primaryFactor === "Chain wrestling breakdown") {
    firstFix =
      "Focus on linking one reliable setup to one reliable finish. Build a simple chain you can repeat under pressure instead of jumping between disconnected attacks.";
  }

  if (primaryFactor === "Low percentage scrambling outcomes") {
    firstFix =
      "Stop chasing reactive movements first. Rebuild your game around winning position early, controlling inside space, and only scrambling when truly necessary.";
  }

  if (primaryFactor === "Fundamental understanding gap") {
    firstFix =
      "Go back to stance, posture, head position, and basic movement. If the foundation improves, everything built on top of it becomes more effective.";
  }

  if (primaryFactor === "Physical conditioning limitation") {
    firstFix =
      "Keep the technical focus simple and add structured conditioning that matches wrestling pace. Better recovery and repeat effort will improve your execution quickly.";
  }

  const displayFrustration =
    frustration === "Other" && customFrustration
      ? customFrustration
      : frustration;

  return (
    <main className="min-h-screen text-white">
      <div className="relative min-h-screen overflow-hidden bg-black">
        <div className="absolute inset-0">
          <img
            src="/bg.jpg"
            alt="background"
            className="h-full w-full object-cover opacity-55"
          />
        </div>

        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:42px_42px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,220,0.08),_transparent_40%)]" />
        <div className="absolute inset-x-0 top-[18%] h-px bg-gradient-to-r from-transparent via-teal-400/35 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-teal-400">
            Wrestling Lab Diagnostic System
          </p>

          <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
            Your Diagnosis Summary
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-zinc-300">
            Based on your inputs, these are the three factors most likely
            limiting your current wrestling performance.
          </p>

          <div className="mt-10 w-full max-w-2xl rounded-3xl border border-teal-400/30 bg-black/40 p-6 text-left">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
              Selected style
            </p>
            <p className="mt-2 text-xl font-bold text-teal-400">{style}</p>

            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-zinc-400">
              Experience level
            </p>
            <p className="mt-2 text-xl font-bold text-teal-400">
              {experienceLevel}
            </p>

            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-zinc-400">
              Training days
            </p>
            <p className="mt-2 text-xl font-bold text-teal-400">
              {trainingDays}
            </p>

            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-zinc-400">
              Competition level
            </p>
            <p className="mt-2 text-xl font-bold text-teal-400">
              {competitionLevel}
            </p>

            {goal && (
              <>
                <p className="mt-6 text-sm uppercase tracking-[0.2em] text-zinc-400">
                  Primary goal
                </p>
                <p className="mt-2 text-xl font-bold text-teal-400">{goal}</p>
              </>
            )}

            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-zinc-400">
              Biggest weakness
            </p>
            <p className="mt-2 text-xl font-bold text-teal-400">{weakness}</p>

            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-zinc-400">
              Match breakdown point
            </p>
            <p className="mt-2 text-xl font-bold text-teal-400">
              {matchBreakdown}
            </p>

            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-zinc-400">
              Attack outcome
            </p>
            <p className="mt-2 text-xl font-bold text-teal-400">
              {attackOutcome}
            </p>

            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-zinc-400">
              Defensive response
            </p>
            <p className="mt-2 text-xl font-bold text-teal-400">
              {defenseResponse}
            </p>

            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-zinc-400">
              After failed attack
            </p>
            <p className="mt-2 text-xl font-bold text-teal-400">
              {postAttackReaction}
            </p>

            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-zinc-400">
              Pressure response
            </p>
            <p className="mt-2 text-xl font-bold text-teal-400">
              {pressureResponse}
            </p>

            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-zinc-400">
              Unclear position response
            </p>
            <p className="mt-2 text-xl font-bold text-teal-400">
              {unclearPositionResponse}
            </p>

            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-zinc-400">
              Decision control
            </p>
            <p className="mt-2 text-xl font-bold text-teal-400">
              {decisionControl}
            </p>

            {scoringPattern && (
              <>
                <p className="mt-6 text-sm uppercase tracking-[0.2em] text-zinc-400">
                  Scoring pattern
                </p>
                <p className="mt-2 text-xl font-bold text-teal-400">
                  {scoringPattern}
                </p>
              </>
            )}

            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-zinc-400">
              Chain break point
            </p>
            <p className="mt-2 text-xl font-bold text-teal-400">
              {chainBreakPoint}
            </p>

            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-zinc-400">
              Chain frequency
            </p>
            <p className="mt-2 text-xl font-bold text-teal-400">
              {chainFrequency}
            </p>

            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-zinc-400">
              Post-attack outcome
            </p>
            <p className="mt-2 text-xl font-bold text-teal-400">
              {postAttackOutcome}
            </p>

            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-zinc-400">
              Athlete type
            </p>
            <p className="mt-2 text-xl font-bold text-teal-400">{archetype}</p>

            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-zinc-400">
              Main frustration
            </p>
            <p className="mt-2 text-xl font-bold text-teal-400">
              {displayFrustration}
            </p>
          </div>

          <div className="mt-6 w-full max-w-2xl rounded-3xl border border-teal-400/30 bg-black/40 p-6 text-left">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
              Primary limiting factor
            </p>

            <h2 className="mt-2 text-2xl font-black uppercase text-white">
              {primaryFactor}
            </h2>

            <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-teal-400">
              Priority score: {priorityScore}
            </p>

            <p className="mt-1 text-sm font-bold uppercase tracking-[0.2em] text-zinc-400">
              Confidence: {confidenceScore}
            </p>

            <p className="mt-4 text-zinc-300">{primaryExplanation}</p>
          </div>

          <div className="mt-6 w-full max-w-2xl rounded-3xl border border-teal-400/20 bg-black/40 p-6 text-left">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
              Secondary limiting factor
            </p>

            <h2 className="mt-2 text-2xl font-black uppercase text-white">
              {secondaryFactor}
            </h2>

            <p className="mt-3 text-zinc-300">{secondaryExplanation}</p>
          </div>

          <div className="mt-6 w-full max-w-2xl rounded-3xl border border-teal-400/20 bg-black/40 p-6 text-left">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
              Third limiting factor
            </p>

            <h2 className="mt-2 text-2xl font-black uppercase text-white">
              {thirdFactor}
            </h2>

            <p className="mt-3 text-zinc-300">{thirdExplanation}</p>
          </div>

          <div className="mt-6 w-full max-w-2xl rounded-3xl border border-teal-400/20 bg-black/40 p-6 text-left">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
              Why this matters
            </p>

            <p className="mt-3 text-zinc-300">
              When this area breaks down, it becomes harder to stay in strong
              positions, make good decisions under pressure, and connect your
              attacks with control.
            </p>
          </div>

          <div className="mt-6 w-full max-w-2xl rounded-3xl border border-teal-400/20 bg-black/40 p-6 text-left">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
              What this looks like in matches
            </p>

            <p className="mt-3 text-zinc-300">{whatThisLooksLike}</p>
          </div>

          <div className="mt-6 w-full max-w-2xl rounded-3xl border border-teal-400/20 bg-black/40 p-6 text-left">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
              First fix
            </p>

            <p className="mt-3 text-zinc-300">{firstFix}</p>
          </div>

          <div className="mt-6 grid w-full max-w-2xl gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-teal-400/20 bg-black/40 p-6 text-left">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
                Technical audit snapshot
              </p>

              <div className="mt-4 space-y-3 text-zinc-300">
                <p>
                  <span className="font-bold text-teal-400">Stance:</span>{" "}
                  {stanceConfidence}
                </p>
                <p>
                  <span className="font-bold text-teal-400">Hand fight:</span>{" "}
                  {handFightConfidence}
                </p>
                <p>
                  <span className="font-bold text-teal-400">Position:</span>{" "}
                  {positionConfidence}
                </p>
                <p>
                  <span className="font-bold text-teal-400">Setups:</span>{" "}
                  {setupConfidence}
                </p>
                <p>
                  <span className="font-bold text-teal-400">Finishes:</span>{" "}
                  {finishConfidence}
                </p>
                <p>
                  <span className="font-bold text-teal-400">Re-attacks:</span>{" "}
                  {reAttackConfidence}
                </p>
                <p>
                  <span className="font-bold text-teal-400">Scrambles:</span>{" "}
                  {scrambleConfidence}
                </p>
                <p>
                  <span className="font-bold text-teal-400">Tactical awareness:</span>{" "}
                  {tacticalConfidence}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-teal-400/20 bg-black/40 p-6 text-left">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
                Pattern indicators
              </p>

              <div className="mt-4 space-y-3 text-zinc-300">
                <p>
                  <span className="font-bold text-teal-400">Reliance type:</span>{" "}
                  {relianceType}
                </p>
                <p>
                  <span className="font-bold text-teal-400">Fatigue breakdown:</span>{" "}
                  {fatigueBreakdown}
                </p>
                <p>
                  <span className="font-bold text-teal-400">Archetype:</span>{" "}
                  {archetype}
                </p>
                <p>
                  <span className="font-bold text-teal-400">Frustration:</span>{" "}
                  {displayFrustration}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 w-full max-w-2xl space-y-4">
            <a
              href="#"
              className="block w-full rounded-full bg-teal-400 px-6 py-4 text-center text-lg font-black uppercase text-black shadow-[0_0_25px_rgba(45,212,191,0.5)]"
            >
              Get My Full Fix Plan
            </a>

            <a
              href="/diagnosis"
              className="block w-full rounded-full border border-teal-400 px-6 py-4 text-center text-lg font-black uppercase text-teal-400"
            >
              Start Again
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
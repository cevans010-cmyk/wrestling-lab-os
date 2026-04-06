"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type DiagnosisResponse = {
  primaryFactor: string;
  secondaryFactor: string;
  thirdFactor: string;
  summary: string;
  firstFix: string;
  confidence: "Low" | "Medium" | "High";
  severityScore: number;
  priorityLevel: "Low" | "Medium" | "High";
};

export default function DiagnosisResultsPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [result, setResult] = useState<DiagnosisResponse | null>(null);

  const [experienceLevel, setExperienceLevel] = useState("");
  const [style, setStyle] = useState("");
  const [trainingDays, setTrainingDays] = useState("");
  const [competitionLevel, setCompetitionLevel] = useState("");
  const [goal, setGoal] = useState("");
  const [matchBreakdown, setMatchBreakdown] = useState("");
  const [pressureResponse, setPressureResponse] = useState("");
  const [chainBreakPoint, setChainBreakPoint] = useState("");
  const [relianceType, setRelianceType] = useState("");
  const [fatigueBreakdown, setFatigueBreakdown] = useState("");
  const [archetype, setArchetype] = useState("");
  const [frustration, setFrustration] = useState("");
  const [customFrustration, setCustomFrustration] = useState("");

  useEffect(() => {
    const loadAndGenerateDiagnosis = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/auth");
          return;
        }

        const diagnosisId = localStorage.getItem("currentDiagnosisId");

        if (!diagnosisId) {
          setError("No active diagnosis found. Please restart the diagnosis.");
          setIsLoading(false);
          return;
        }

        const localExperienceLevel =
          localStorage.getItem("experienceLevel") || "";
        const localStyle = localStorage.getItem("style") || "";
        const localTrainingDays = localStorage.getItem("trainingDays") || "";
        const localCompetitionLevel =
          localStorage.getItem("competitionLevel") || "";
        const localGoal = localStorage.getItem("finalGoal") || "";
        const localMatchBreakdown =
          localStorage.getItem("matchBreakdown") || "";
        const localAttackOutcome =
          localStorage.getItem("attackOutcome") || "";
        const localDefenseResponse =
          localStorage.getItem("defenseResponse") || "";
        const localPostAttackReaction =
          localStorage.getItem("postAttackReaction") || "";
        const localPressureResponse =
          localStorage.getItem("pressureResponse") || "";
        const localUnclearPositionResponse =
          localStorage.getItem("unclearPositionResponse") || "";
        const localDecisionControl =
          localStorage.getItem("decisionControl") || "";
        const localScoringPattern =
          localStorage.getItem("scoringPattern") || "";
        const localChainBreakPoint =
          localStorage.getItem("chainBreakPoint") || "";
        const localChainFrequency =
          localStorage.getItem("chainFrequency") || "";
        const localPostAttackOutcome =
          localStorage.getItem("postAttackOutcome") || "";
        const localStanceConfidence =
          localStorage.getItem("stanceConfidence") || "";
        const localHandFightConfidence =
          localStorage.getItem("handFightConfidence") || "";
        const localPositionConfidence =
          localStorage.getItem("positionConfidence") || "";
        const localSetupConfidence =
          localStorage.getItem("setupConfidence") || "";
        const localFinishConfidence =
          localStorage.getItem("finishConfidence") || "";
        const localReAttackConfidence =
          localStorage.getItem("reAttackConfidence") || "";
        const localScrambleConfidence =
          localStorage.getItem("scrambleConfidence") || "";
        const localTacticalConfidence =
          localStorage.getItem("tacticalConfidence") || "";
        const localRelianceType =
          localStorage.getItem("relianceType") || "";
        const localFatigueBreakdown =
          localStorage.getItem("fatigueBreakdown") || "";
        const localArchetype = localStorage.getItem("archetype") || "";
        const localFrustration = localStorage.getItem("frustration") || "";
        const localCustomFrustration =
          localStorage.getItem("customFrustration") || "";

        setExperienceLevel(localExperienceLevel);
        setStyle(localStyle);
        setTrainingDays(localTrainingDays);
        setCompetitionLevel(localCompetitionLevel);
        setGoal(localGoal);
        setMatchBreakdown(localMatchBreakdown);
        setPressureResponse(localPressureResponse);
        setChainBreakPoint(localChainBreakPoint);
        setRelianceType(localRelianceType);
        setFatigueBreakdown(localFatigueBreakdown);
        setArchetype(localArchetype);
        setFrustration(localFrustration);
        setCustomFrustration(localCustomFrustration);

        const response = await fetch("/api/diagnosis", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            experienceLevel: localExperienceLevel,
            style: localStyle,
            trainingDays: localTrainingDays,
            competitionLevel: localCompetitionLevel,
            goal: localGoal,
            weakness: localFrustration,
            matchBreakdown: localMatchBreakdown,
            attackOutcome: localAttackOutcome,
            defenseResponse: localDefenseResponse,
            postAttackReaction: localPostAttackReaction,
            pressureResponse: localPressureResponse,
            unclearPositionResponse: localUnclearPositionResponse,
            decisionControl: localDecisionControl,
            scoringPattern: localScoringPattern,
            chainBreakPoint: localChainBreakPoint,
            chainFrequency: localChainFrequency,
            postAttackOutcome: localPostAttackOutcome,
            stanceConfidence: localStanceConfidence,
            handFightConfidence: localHandFightConfidence,
            positionConfidence: localPositionConfidence,
            setupConfidence: localSetupConfidence,
            finishConfidence: localFinishConfidence,
            reAttackConfidence: localReAttackConfidence,
            scrambleConfidence: localScrambleConfidence,
            tacticalConfidence: localTacticalConfidence,
            relianceType: localRelianceType,
            fatigueBreakdown: localFatigueBreakdown,
            archetype: localArchetype,
            frustration:
              localFrustration === "Other"
                ? localCustomFrustration
                : localFrustration,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(
            errorData?.error || `Diagnosis API failed with status ${response.status}`
          );
        }

        const data: DiagnosisResponse = await response.json();
        setResult(data);

        const { error: saveError } = await supabase
         .from("diagnoses")
         .update({
           goal: localGoal,
           pressure_response: localPressureResponse,
           reliance_type: localRelianceType,
           frustration:
             localFrustration === "Other"
               ? localCustomFrustration
               : localFrustration,
           primary_factor: data.primaryFactor,
           secondary_factor: data.secondaryFactor,
           third_factor: data.thirdFactor,
           ai_summary: data.summary,
           first_fix: data.firstFix,
           confidence: data.confidence,
           severity_score: data.severityScore,
           priority_level: data.priorityLevel,
           completed: true,
         })
           .eq("id", diagnosisId)
           .eq("user_id", user.id);

        if (saveError) {
         console.error("Error saving AI result:", saveError);
         setError("Could not save your completed diagnosis.");
         setIsLoading(false);
         return;
        }

        localStorage.removeItem("currentDiagnosisId");
      } catch (err: any) {
        console.error(err);
        setError(err?.message || "Could not generate your diagnosis.");
      } finally {
        setIsLoading(false);
      }
    };

    loadAndGenerateDiagnosis();
  }, [router]);

  const displayFrustration =
    frustration === "Other" && customFrustration
      ? customFrustration
      : frustration;

  const archetypeInsight = useMemo(() => {
    switch (archetype) {
      case "Reactive scrambler":
        return {
          title: "Reactive Scrambler",
          summary:
            "You rely heavily on reactions once the position becomes messy. That can create moments of success, but it also makes your wrestling unstable and hard to repeat under pressure.",
          fix:
            "Start replacing reactive scrambles with one recovery rule and one structured re-attack you can trust.",
        };
      case "Training room champion":
        return {
          title: "Training Room Champion",
          summary:
            "Your skill may show up well in practice, but competition pressure is stopping your normal level from carrying over cleanly.",
          fix:
            "Simplify your match plan so it is easier to execute under pressure than it is in training.",
        };
      case "Broken chain wrestler":
        return {
          title: "Broken Chain Wrestler",
          summary:
            "You are likely getting to moments that should lead to scores, but the sequence breaks before the exchange is finished.",
          fix:
            "Build one reliable entry-to-finish chain and repeat it until your second action becomes automatic.",
        };
      case "Perfectionist":
        return {
          title: "Perfectionist",
          summary:
            "You may be over-waiting for the perfect opening instead of building pressure through repeatable decisions.",
          fix:
            "Choose one good option earlier instead of delaying for the perfect one.",
        };
      case "Highlight hunter":
        return {
          title: "Highlight Hunter",
          summary:
            "You are likely chasing big outcomes before you have fully won the position, which makes your wrestling lower percentage than it needs to be.",
          fix:
            "Prioritise control and sequence quality before chasing big finishes.",
        };
      case "All or nothing":
        return {
          title: "All or Nothing",
          summary:
            "Your wrestling swings hard between attack and breakdown. That makes your best moments dangerous, but your consistency suffers.",
          fix:
            "Add one stabilising decision after every attack so your exchanges stay connected.",
        };
      case "Beginner learning foundation":
        return {
          title: "Foundation Builder",
          summary:
            "Your biggest opportunity is not advanced technique. It is building a stronger foundation so everything else has something stable to sit on.",
          fix:
            "Spend more time on stance, contact, inside control, and one clean scoring path.",
        };
      default:
        return {
          title: archetype || "Wrestling Pattern",
          summary:
            "Your responses suggest a repeatable pattern in how your wrestling breaks down under pressure.",
          fix:
            "Focus on the earliest moment where the pattern appears and build one rule to interrupt it.",
        };
    }
  }, [archetype]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-teal-400">
            Wrestling Lab Diagnostic System
          </p>
          <h1 className="mt-4 text-4xl font-black uppercase">
            Generating Diagnosis
          </h1>
          <p className="mt-4 text-zinc-300">
            Please wait while your diagnosis is being created.
          </p>
        </div>
      </main>
    );
  }

  if (error || !result) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="text-center max-w-xl">
          <h1 className="text-3xl font-black uppercase text-red-500">
            Something went wrong
          </h1>
          <p className="mt-4 text-zinc-300">{error}</p>
          <button
            onClick={() => router.push("/diagnosis")}
            className="mt-8 rounded-full border border-teal-400 px-6 py-3 font-black uppercase text-teal-400"
          >
            Restart Diagnosis
          </button>
        </div>
      </main>
    );
  }

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

        <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-16 text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-teal-400">
            Wrestling Lab Diagnostic System
          </p>

          <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
            Your Performance Breakdown
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-zinc-300">
            Based on your full diagnostic, these are the factors most likely
            limiting your performance right now.
          </p>

          <div className="mt-10 w-full max-w-3xl rounded-3xl border border-teal-400/30 bg-black/40 p-6 text-left">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
              Primary limiting factor
            </p>
            <h2 className="mt-2 text-2xl font-black uppercase text-white">
              {result.primaryFactor}
            </h2>

            <p className="mt-2 text-sm text-red-400 font-bold">
              This is the #1 thing holding you back right now.
            </p>

            <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-teal-400">
              Confidence: {result.confidence}
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
               <div className="rounded-2xl border border-teal-400/20 bg-black/30 p-4">
                 <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                   Severity score
                 </p>
                 <p className="mt-2 text-3xl font-black text-white">
                   {result.severityScore}
                   <span className="text-lg text-zinc-400">/10</span>
                 </p>
               </div>

               <div className="rounded-2xl border border-teal-400/20 bg-black/30 p-4">
                 <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                   Fix priority
                 </p>
                 <p className="mt-2 text-3xl font-black text-white">
                   {result.priorityLevel}
                 </p>
               </div>
             </div>

            <p className="mt-4 text-zinc-300">{result.summary}</p>
          </div>

          <div className="mt-6 w-full max-w-3xl rounded-3xl border border-teal-400/20 bg-black/40 p-6 text-left">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
              Your wrestler pattern
            </p>
            <h3 className="mt-2 text-2xl font-black uppercase text-white">
              {archetypeInsight.title}
            </h3>
            <p className="mt-4 text-zinc-300">{archetypeInsight.summary}</p>
            <p className="mt-4 text-sm font-bold uppercase tracking-[0.2em] text-teal-400">
              What this means for you
            </p>
            <p className="mt-2 text-zinc-300">{archetypeInsight.fix}</p>
          </div>

          <div className="mt-6 grid w-full max-w-3xl gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-teal-400/20 bg-black/40 p-6 text-left">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
                Secondary limiting factor
              </p>
              <h3 className="mt-2 text-xl font-black uppercase text-white">
                {result.secondaryFactor}
              </h3>
            </div>

            <div className="rounded-3xl border border-teal-400/20 bg-black/40 p-6 text-left">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
                Third limiting factor
              </p>
              <h3 className="mt-2 text-xl font-black uppercase text-white">
                {result.thirdFactor}
              </h3>
            </div>
          </div>

          <div className="mt-6 w-full max-w-3xl rounded-3xl border border-teal-400/20 bg-black/40 p-6 text-left">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
              First fix
            </p>
            <p className="mt-3 text-zinc-300">{result.firstFix}</p>
          </div>

          <div className="mt-6 grid w-full max-w-3xl gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-teal-400/20 bg-black/40 p-6 text-left">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
                Key profile signals
              </p>
              <div className="mt-4 space-y-3 text-zinc-300">
                <p>
                  <span className="font-bold text-teal-400">Experience:</span>{" "}
                  {experienceLevel}
                </p>
                <p>
                  <span className="font-bold text-teal-400">Style:</span> {style}
                </p>
                <p>
                  <span className="font-bold text-teal-400">Training days:</span>{" "}
                  {trainingDays}
                </p>
                <p>
                  <span className="font-bold text-teal-400">Competition:</span>{" "}
                  {competitionLevel}
                </p>
                <p>
                  <span className="font-bold text-teal-400">Goal:</span> {goal}
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

            <div className="rounded-3xl border border-teal-400/20 bg-black/40 p-6 text-left">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
                Key pattern signals
              </p>
              <div className="mt-4 space-y-3 text-zinc-300">
                <p>
                  <span className="font-bold text-teal-400">Match breakdown:</span>{" "}
                  {matchBreakdown}
                </p>
                <p>
                  <span className="font-bold text-teal-400">Pressure response:</span>{" "}
                  {pressureResponse}
                </p>
                <p>
                  <span className="font-bold text-teal-400">Chain break point:</span>{" "}
                  {chainBreakPoint}
                </p>
                <p>
                  <span className="font-bold text-teal-400">Reliance type:</span>{" "}
                  {relianceType}
                </p>
                <p>
                  <span className="font-bold text-teal-400">Fatigue breakdown:</span>{" "}
                  {fatigueBreakdown}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 w-full max-w-3xl space-y-4">
           <div className="rounded-3xl border border-teal-400/20 bg-black/40 p-6 text-left">
             <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
               Shareable summary
             </p>
             <p className="mt-3 text-white font-bold">
               Primary issue: {result.primaryFactor}
             </p>
             <p className="mt-2 text-zinc-300">
               Priority: {result.priorityLevel} | Severity: {result.severityScore}/10
             </p>
             <p className="mt-2 text-zinc-300">
               First fix: {result.firstFix}
             </p>
           </div>

          <button
             onClick={() =>
               navigator.clipboard.writeText(
                 `My Wrestling Lab diagnosis:\nPrimary issue: ${result.primaryFactor}\nPriority: ${result.priorityLevel}\nSeverity: ${result.severityScore}/10\nFirst fix: ${result.firstFix}`
               )
             }
             className="block w-full rounded-full border border-teal-400 px-6 py-4 text-center text-lg font-black uppercase text-teal-400"
          >
             Copy Summary
          </button>

          <button
             onClick={() => window.open("https://calendly.com/cevans010/30min", "_blank")}
             className="block w-full rounded-full bg-teal-400 px-6 py-4 text-center text-lg font-black uppercase text-black shadow-[0_0_25px_rgba(45,212,191,0.5)]"
          >
             Book Your Free Consult
          </button>
        </div>

            
      
        </div>
      </div>
    </main>
  );
}
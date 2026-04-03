"use client";
import { useEffect, useState } from "react";

export default function DiagnosisResultsPage() {
  const [style, setStyle] = useState("");
  const [weakness, setWeakness] = useState("");

  useEffect(() => {
    const savedStyle = localStorage.getItem("style") || "";
    const savedWeakness = localStorage.getItem("weakness") || "";

    setStyle(savedStyle);
    setWeakness(savedWeakness);
  }, []);

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

          <div className="mt-10 w-full max-w-2xl rounded-3xl border border-teal-400/30 bg-black/40 p-6 text-left">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
              Selected style
            </p>
            <p className="mt-2 text-xl font-bold text-teal-400">{style}</p>

            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-zinc-400">
              Biggest weakness
            </p>
            <p className="mt-2 text-xl font-bold text-teal-400">{weakness}</p>
          </div>

          <div className="mt-6 w-full max-w-2xl rounded-3xl border border-teal-400/30 bg-black/40 p-6 text-left">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
              Primary limiting factor
            </p>

            <h2 className="mt-2 text-2xl font-black uppercase text-white">
              {weakness}
            </h2>

            <p className="mt-4 text-zinc-300">
              {weakness === "Chain wrestling breakdown" &&
                "You are likely getting to positions but failing to connect actions together. This causes your attacks to stall and gives your opponent time to recover."}

              {weakness === "Poor decision making under pressure" &&
                "You likely know what to do, but under pressure your decisions become rushed or unclear, leading to missed opportunities and defensive mistakes."}

              {weakness === "Low percentage scrambling outcomes" &&
                "You are relying too heavily on reactive scrambles instead of controlling positions, which leads to inconsistent results and unnecessary risk."}

              {weakness === "Under-developed understanding of fundamentals" &&
                "Your base positioning and core mechanics are limiting everything else, making it harder to execute even simple techniques effectively."}

              {weakness === "Lack of tactical awareness" &&
                "You may be missing key moments to attack or defend, leading to poor timing and inefficient match strategy."}

              {weakness === "Physical condition" &&
                "Fatigue is likely affecting your ability to execute and make decisions, especially later in matches."}
            </p>
          </div>

          <div className="mt-6 w-full max-w-2xl rounded-3xl border border-teal-400/20 bg-black/40 p-6 text-left">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
              Secondary limiting factor
            </p>

            <h2 className="mt-2 text-2xl font-black uppercase text-white">
              Decision making under pressure
            </h2>

            <p className="mt-3 text-zinc-300">
              Even when your technique is correct, hesitation or rushed decisions
              reduce your ability to execute consistently.
            </p>
          </div>

          <div className="mt-6 w-full max-w-2xl rounded-3xl border border-teal-400/20 bg-black/40 p-6 text-left">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
              Third limiting factor
            </p>

            <h2 className="mt-2 text-2xl font-black uppercase text-white">
              Positional control consistency
            </h2>

            <p className="mt-3 text-zinc-300">
              Small breakdowns in position are compounding over time, making it
              harder to maintain control through exchanges.
            </p>
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

            <p className="mt-3 text-zinc-300">
              {weakness === "Chain wrestling breakdown" &&
                "You get to an attack, but the sequence stalls after first contact. Your opponent recovers position before you can connect to the next action."}

              {weakness === "Poor decision making under pressure" &&
                "You hesitate in key moments, force attacks too late, or choose the wrong response once the pace rises and the position becomes unclear."}

              {weakness === "Low percentage scrambling outcomes" &&
                "You end up in messy exchanges too often, relying on reactions instead of control, and the outcomes become inconsistent."}

              {weakness === "Under-developed understanding of fundamentals" &&
                "Your stance, head position, posture, or movement break down early, which makes the rest of the exchange much harder to win cleanly."}

              {weakness === "Lack of tactical awareness" &&
                "You miss scoring windows, fail to recognise momentum shifts, or keep wrestling at the wrong tempo for the situation."}

              {weakness === "Physical condition" &&
                "Your positions and decisions get noticeably worse as the match goes on, especially once fatigue starts affecting your reactions."}
            </p>
          </div>

          <div className="mt-6 w-full max-w-2xl rounded-3xl border border-teal-400/20 bg-black/40 p-6 text-left">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
              First fix
            </p>

            <p className="mt-3 text-zinc-300">
              {weakness === "Chain wrestling breakdown" &&
                "Focus on linking one reliable setup to one reliable finish. Build a simple chain you can repeat under pressure instead of jumping between disconnected attacks."}

              {weakness === "Poor decision making under pressure" &&
                "Reduce your options and work from a smaller decision tree. Train one clear response for each common position so you do not hesitate when the pace rises."}

              {weakness === "Low percentage scrambling outcomes" &&
                "Stop chasing reactive movements first. Rebuild your game around winning position early, controlling inside space, and only scrambling when truly necessary."}

              {weakness === "Under-developed understanding of fundamentals" &&
                "Go back to stance, posture, head position, and basic movement. If the foundation improves, everything built on top of it becomes more effective."}

              {weakness === "Lack of tactical awareness" &&
                "Start reviewing your matches with one question: what moment did I miss? Build awareness of when to press, when to reset, and when to conserve position."}

              {weakness === "Physical condition" &&
                "Keep the technical focus simple and add structured conditioning that matches wrestling pace. Better recovery and repeat effort will improve your execution quickly."}
            </p>
          </div>

          <div className="mt-8 w-full max-w-2xl">
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
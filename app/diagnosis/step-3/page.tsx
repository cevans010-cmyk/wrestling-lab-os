"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DiagnosisStep3Page() {
  const [pressureResponse, setPressureResponse] = useState("I hesitate");
  const [unclearPositionResponse, setUnclearPositionResponse] = useState("Freeze");
  const [decisionControl, setDecisionControl] = useState("Sometimes");

  useEffect(() => {
    const savedPressureResponse =
      localStorage.getItem("pressureResponse") || "I hesitate";
    const savedUnclearPositionResponse =
      localStorage.getItem("unclearPositionResponse") || "Freeze";
    const savedDecisionControl =
      localStorage.getItem("decisionControl") || "Sometimes";

    setPressureResponse(savedPressureResponse);
    setUnclearPositionResponse(savedUnclearPositionResponse);
    setDecisionControl(savedDecisionControl);
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
            Decision Making (3/7)
          </p>

          <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
            Decision Making Under Pressure
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-zinc-300">
            This section identifies how you respond when the match becomes fast,
            unclear, or high pressure.
          </p>

          <div className="mt-10 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              Under pressure, what do you tend to do?
            </label>

            <select
              value={pressureResponse}
              onChange={(e) => {
                setPressureResponse(e.target.value);
                localStorage.setItem("pressureResponse", e.target.value);
              }}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              <option value="I hesitate">I hesitate</option>
              <option value="I rush">I rush</option>
              <option value="I force attacks">I force attacks</option>
              <option value="I get reactive">I get reactive</option>
              <option value="I play too safe">I play too safe</option>
              <option value="I have the presence of mind to stay composed">
                I have the presence of mind to stay composed
              </option>
            </select>
          </div>

          <div className="mt-6 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              When a position becomes unclear, you:
            </label>

            <select
              value={unclearPositionResponse}
              onChange={(e) => {
                setUnclearPositionResponse(e.target.value);
                localStorage.setItem("unclearPositionResponse", e.target.value);
              }}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              <option value="Freeze">Freeze</option>
              <option value="Choose randomly">Choose randomly</option>
              <option value="Default to strength/explosiveness">
                Default to strength/explosiveness
              </option>
              <option value="Revert to one move">Revert to one move</option>
              <option value="Stay composed and structured">
                Stay composed and structured
              </option>
            </select>
          </div>

          <div className="mt-6 w-full max-w-xl text-left">
            <label className="mb-2 block text-sm font-bold uppercase text-teal-400">
              How often do you feel in control of your decisions?
            </label>

            <select
              value={decisionControl}
              onChange={(e) => {
                setDecisionControl(e.target.value);
                localStorage.setItem("decisionControl", e.target.value);
              }}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              <option value="Rarely">Rarely</option>
              <option value="Sometimes">Sometimes</option>
              <option value="Often">Often</option>
              <option value="Almost always">Almost always</option>
            </select>
          </div>

          <div className="mt-10 flex w-full max-w-xl gap-4">
            <Link
              href="/diagnosis/step-2"
              className="block w-1/2 rounded-full border border-teal-400 px-6 py-4 text-center text-lg font-black uppercase text-teal-400"
            >
              Back
            </Link>

            <Link
              href="/diagnosis/step-4"
              onClick={() => {
                localStorage.setItem("pressureResponse", pressureResponse);
                localStorage.setItem(
                  "unclearPositionResponse",
                  unclearPositionResponse
                );
                localStorage.setItem("decisionControl", decisionControl);
              }}
              className="block w-1/2 rounded-full bg-teal-400 px-6 py-4 text-center text-lg font-black uppercase text-black shadow-[0_0_25px_rgba(45,212,191,0.5)]"
            >
              Continue
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
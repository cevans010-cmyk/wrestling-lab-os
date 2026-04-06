import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="relative min-h-screen overflow-hidden bg-black">
        <div className="absolute inset-0">
        <img
          src="/bg.jpg"
          alt="background"
          className="w-full h-full object-cover opacity-55"
        />
      </div>
      <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,220,0.08),_transparent_45%)]" />

        <header className="relative z-10 flex items-center justify-between border-b border-teal-400/20 px-6 py-5">
          <button className="flex items-center gap-3" aria-label="Go home">
            <img
               src="/logo.png"
               alt="Wrestling Lab Logo"
               className="h-14 w-14 rounded-full object-cover shadow-[0_0_30px_rgba(45,212,191,0.65)]"
             />
            <div className="leading-tight">
              <p className="text-sm font-bold uppercase tracking-wide text-white">
                The
              </p>
              <p className="text-2xl font-black uppercase tracking-tight text-teal-400">
                Wrestling Lab
              </p>
            </div>
          </button>

          <button
            className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-teal-400 text-teal-400 shadow-[0_0_25px_rgba(45,212,191,0.35)]"
            aria-label="Menu"
          >
            <div className="flex flex-col gap-2">
              <span className="block h-1 w-7 rounded bg-current" />
              <span className="block h-1 w-7 rounded bg-current" />
              <span className="block h-1 w-7 rounded bg-current" />
            </div>
          </button>
        </header>

        <section className="relative z-10 mx-auto flex min-h-[calc(100vh-96px)] max-w-3xl flex-col items-center px-6 pb-16 pt-8 text-center">
          <div className="mb-6 rounded-full border border-teal-400/30 bg-teal-400/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.28em] text-teal-300">
            Wrestling Lab Diagnostic System
          </div>

          <h1 className="max-w-4xl text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl">
            Training hard but
            <br />
            not seeing
            <br />
            results?
          </h1>

          <h2 className="mt-8 max-w-4xl text-4xl font-black uppercase leading-[1.02] tracking-tight sm:text-5xl">
            Your wrestling isn&apos;t
            <br />
            the problem —
            <br />
            <span className="text-teal-400">your system is</span>
          </h2>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl">
            Identify your top 3 limiting factors and get a structured
            improvement plan in under
          </p>

         

          <div className="mt-1 text-7xl font-black uppercase leading-none tracking-tight text-teal-400 drop-shadow-[0_0_24px_rgba(45,212,191,0.6)] sm:text-8xl">
            5 Minutes
          </div>

          <p className="mt-8 max-w-xl text-xl font-semibold italic leading-9 text-zinc-300">
            Most wrestlers train harder.
            <br />
            The best wrestlers train smarter.
          </p>

          
        <Link
         href="/diagnosis"
         className="mt-10 block w-full max-w-2xl rounded-full bg-teal-400 px-8 py-6 text-center text-xl font-black uppercase tracking-wide text-black shadow-[0_0_35px_rgba(45,212,191,0.55)] transition hover:scale-[1.01]"
        >
         Get My Free Diagnosis
        </Link>

          <p className="mt-5 text-base text-zinc-400">
            Takes less than 5 minutes &nbsp;·&nbsp; No guesswork &nbsp;·&nbsp;
            No wasted training.
          </p>

          <p className="mt-4 text-lg font-bold uppercase tracking-wide text-zinc-400">
            — Built by a 6x national champion and national coach —
          </p>

          <p className="mt-12 text-2xl font-semibold italic text-zinc-300">
            If your results haven&apos;t changed...
            <span className="text-teal-400"> this is why.</span>
          </p>

          <div className="mt-8 grid w-full gap-5">
            <div className="flex items-center justify-between rounded-3xl border border-teal-400/40 bg-white/5 px-6 py-6 shadow-[0_0_20px_rgba(45,212,191,0.08)]">
              <div className="text-left">
                <h3 className="text-3xl font-black uppercase">Analyze</h3>
                <p className="mt-2 text-lg font-semibold uppercase text-zinc-400">
                  Identify exactly what&apos;s holding you back
                </p>
              </div>
              <div className="ml-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-teal-400/40 text-teal-400">
                 <span className="text-3xl">⌕</span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-3xl border border-teal-400/40 bg-white/5 px-6 py-6 shadow-[0_0_20px_rgba(45,212,191,0.08)]">
              <div className="text-left">
                <h3 className="text-3xl font-black uppercase">Implement</h3>
                <p className="mt-2 text-lg font-semibold uppercase text-zinc-400">
                  Follow a proven system that actually works
                </p>
              </div>
              <div className="ml-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-teal-400/40 text-teal-400">
               <span className="text-3xl">⇡</span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-3xl border border-teal-400/40 bg-white/5 px-6 py-6 shadow-[0_0_20px_rgba(45,212,191,0.08)]">
              <div className="text-left">
                <h3 className="text-3xl font-black uppercase">Dominate</h3>
                <p className="mt-2 text-lg font-semibold uppercase text-zinc-400">
                  Win more matches with less guesswork
                </p>
              </div>
              <div className="ml-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-teal-400/40 text-teal-400">
                <span className="text-3xl">✦</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

// redeploy trigger
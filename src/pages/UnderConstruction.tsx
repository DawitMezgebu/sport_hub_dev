import { Link } from "react-router-dom";
import TopNav from "../components/TopBar";

export default function UnderConstructionPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-white">
      <TopNav />

      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-6">
        <div className="w-full max-w-[520px] text-center">
          <img
            src="https://yefil.com/public/img/auth/chart.png"
            alt="Under construction illustration"
            className="mx-auto mb-6"
          />

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Page Under Construction
          </h1>

          <p className="mt-3 text-xs font-medium leading-relaxed text-white/60 sm:text-base">
            We're currently working on this section to bring you the best
            experience.
          </p>

          <Link
            to="/"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--textColor)] transition hover:brightness-110 active:scale-[0.98]"
          >
            Go Back Home
          </Link>
        </div>
      </main>
    </div>
  );
}

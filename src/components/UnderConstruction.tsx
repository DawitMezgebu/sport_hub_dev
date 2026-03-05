import { Link } from "react-router-dom";
import TopNav from "./TopBar";

export default function UnderConstructionPage() {
  return (
    <>
      <div className="z-100">
        <TopNav />
      </div>
      <div className="min-h-screen  flex items-center justify-center px-6 text-white mt-[-64px] z-10">
        <div className="w-full max-w-[520px] text-center">
          <img src="../src/assets/under-construction.svg" alt="img" />

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Page Under Construction
          </h1>

          <p className="mt-3 text-xs font-medium sm:text-base text-white/60 leading-relaxed">
            We're currently working on this section to bring you the best
            experience.
          </p>

          <Link
            to="/"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-[#00FFB3] px-6 py-3 text-sm font-semibold text-[#0B0F17] transition hover:brightness-110 active:scale-[0.98]"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </>
  );
}

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#141824] flex items-center justify-center px-6 text-white">
      <div className="text-center max-w-[520px] w-full">
        
        <img
          src="
        https://static.vecteezy.com/system/resources/thumbnails/024/217/744/small/design-template-for-web-page-with-404-error-isometric-page-not-working-error-png.png
            "
          alt="Under construction illustration"
          className="mx-auto mb-6"
        />

        <h1 className="text-5xl font-extrabold tracking-tight text-[#00FFB3]">
          404
        </h1>

        <h2 className="mt-3 text-xl font-semibold">Page Not Found</h2>

        <p className="mt-4 text-white/60 text-sm leading-relaxed">
          The page you're looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-[#00FFB3] px-6 py-3 text-sm font-semibold text-[#0B0F17]  transition hover:brightness-110 active:scale-[0.98]"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

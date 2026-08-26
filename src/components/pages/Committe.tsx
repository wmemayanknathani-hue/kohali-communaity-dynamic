import { useNavigate } from "react-router-dom";

export default function Committe() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--cream)] p-5">
      <h1 className="text-2xl font-bold text-[var(--maroon-950)]">
        Kohali Samaj
      </h1>

      <p className="mt-1 text-sm text-[var(--text-muted)]">
        Committee
      </p>

      <button
        type="button"
        onClick={() => navigate("/committee")}
        className="mt-6 w-full rounded-2xl bg-[var(--maroon-800)] px-5 py-4 text-left text-white shadow-lg"
      >
        <div className="text-lg font-bold">
          Executive Committee
        </div>

        <div className="mt-1 text-sm text-white/70">
          कार्यकारी मंडळ
        </div>
      </button>
    </div>
  );
}
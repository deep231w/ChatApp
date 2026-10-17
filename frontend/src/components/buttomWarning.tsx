import { Link } from "react-router-dom";

export const ButtomWarning = ({ label, to, buttonText }: { label: string; to: string; buttonText: string }) => {
  return (
    <div className="flex items-center justify-center gap-1 text-sm text-slate-500">
      <span>{label}</span>
      <Link to={to} className="font-semibold text-slate-900 transition hover:text-slate-700 hover:underline">
        {buttonText}
      </Link>
    </div>
  );
};

import Link from "next/link";
import { MessageSquare } from "lucide-react";

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footerText: string;
  footerLink: string;
  footerHref: string;
}

export default function AuthCard({
  title,
  description,
  children,
  footerText,
  footerLink,
  footerHref,
}: AuthCardProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">

      <div className="w-full max-w-md">

        {/* Logo */}
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-2"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <MessageSquare size={23} />
          </div>

          <span className="text-2xl font-bold text-slate-900">
            DevCollab
          </span>
        </Link>

        {/* Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">

          <div className="mb-7 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {title}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {description}
            </p>
          </div>

          {children}

          <div className="mt-7 border-t border-slate-100 pt-6 text-center text-sm text-slate-500">
            {footerText}{" "}
            <Link
              href={footerHref}
              className="font-semibold text-indigo-600 hover:text-indigo-700"
            >
              {footerLink}
            </Link>
          </div>

        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Private workspace for your team.
        </p>

      </div>
    </main>
  );
}

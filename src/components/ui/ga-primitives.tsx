import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "navy" | "gold" | "success" | "warning" | "demo";
}

export function GaBadge({ children, variant = "navy" }: BadgeProps) {
  const styles: Record<NonNullable<BadgeProps["variant"]>, string> = {
    navy: "bg-ga-navy text-white",
    gold: "bg-ga-gold/20 text-ga-navy border border-ga-gold",
    success: "bg-emerald-900/10 text-emerald-900 border border-emerald-700/30",
    warning: "bg-amber-900/10 text-amber-900 border border-amber-700/30",
    demo: "bg-purple-900/10 text-purple-950 border border-purple-800/40 font-semibold",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-xs tracking-wide uppercase rounded-sm ${styles[variant]}`}
    >
      {children}
    </span>
  );
}

interface CardProps {
  title?: string;
  subtitle?: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function GaCard({
  title,
  subtitle,
  badge,
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`bg-white border border-ga-slate-light/80 shadow-editorial rounded-sm p-6 ${className}`}
    >
      {(title || badge) && (
        <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-ga-ivory-warm">
          <div>
            {title && (
              <h3 className="text-lg font-editorial font-semibold text-ga-navy">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-ga-slate mt-0.5">{subtitle}</p>
            )}
          </div>
          {badge && <div>{badge}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
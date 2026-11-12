import React from "react";

export default function PortalPublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-[#FAF8F5] text-[#0F1E36]">{children}</div>;
}
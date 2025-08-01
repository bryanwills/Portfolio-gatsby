import React from "react";

import DonationBox from "@/components/common/donation-box";
import { Heading } from "@/components/ui/heading";
import { cn } from "@/utils/cn";

interface LayoutProps extends React.HTMLAttributes<HTMLElement> {
  heading: string;
  description: React.ReactNode;
}

export default function ToolLayout({
  children,
  className,
  heading,
  description,
}: Readonly<LayoutProps>) {
  return (
    <div
      className={cn(
        "space-y-16 text-center items-center flex flex-col",
        className
      )}
    >
      <div className="space-y-6">
        <Heading level={1}>{heading}</Heading>
        <p>{description}</p>
      </div>
      {children}
      <DonationBox title="Liked this tool?" />
    </div>
  );
}

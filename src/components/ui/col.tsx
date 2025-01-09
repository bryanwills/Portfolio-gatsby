import React from "react";

import { cn } from "@/utils/cn";

type ColProps = React.HTMLAttributes<HTMLDivElement>;

export default function Col({ className, ...props }: Readonly<ColProps>) {
  return (
    <div className={cn("flex flex-col items-center", className)} {...props} />
  );
}

import React from "react";

import { cn } from "@/utils/cn";

type RowProps = React.HTMLAttributes<HTMLDivElement>;

export default function Row({ className, ...props }: Readonly<RowProps>) {
  return (
    <div className={cn("flex flex-row items-center", className)} {...props} />
  );
}

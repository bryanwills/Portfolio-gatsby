import React from "react";

import { cn } from "@/utils/cn";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Heading({
  level = 1,
  children,
  className,
  ...props
}: Readonly<HeadingProps>) {
  switch (level) {
    case 1: {
      return (
        <h1
          className={cn("text-5xl font-medium text-chart-6", className)}
          {...props}
        >
          {children}
        </h1>
      );
    }
    case 2: {
      return (
        <h2
          className={cn("text-4xl text-chart-2 font-medium", className)}
          {...props}
        >
          {children}
        </h2>
      );
    }
    case 3: {
      return (
        <h3
          className={cn("text-3xl font-medium text-chart-5", className)}
          {...props}
        >
          {children}
        </h3>
      );
    }
    case 4: {
      return (
        <h4 className={cn("text-2xl font-medium", className)} {...props}>
          {children}
        </h4>
      );
    }
    case 5: {
      return (
        <h5 className={cn("text-xl font-medium", className)} {...props}>
          {children}
        </h5>
      );
    }
    case 6: {
      return (
        <h6 className={cn("text-lg font-medium", className)} {...props}>
          {children}
        </h6>
      );
    }
    default:
  }
}

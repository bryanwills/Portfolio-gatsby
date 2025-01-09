import React from "react";

import { SocialItems } from "../modules/home/hero";
import Col from "../ui/col";

export default function Footer() {
  return (
    <footer className="bg-black p-[7%]">
      <Col className="space-y-4">
        <p className="text-6xl font-bold text-center">Let's Connect</p>
        <SocialItems />
        <p className="text-muted-foreground">
          &copy; 2021 - {new Date().getFullYear()} itsrakesh. v2.
        </p>
      </Col>
    </footer>
  );
}

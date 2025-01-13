import { Link } from "gatsby";
import React from "react";

import { Icons } from "@/assets/icons";

import { SocialItems } from "../modules/home/hero";
import Col from "../ui/col";
import Row from "../ui/row";

export default function Footer() {
  return (
    <footer className="bg-black p-[7%]">
      <Col className="space-y-4">
        <p className="text-6xl font-bold text-center">Let's Connect</p>
        <Row className="gap-2">
          <SocialItems />
          <Link
            className="text-2xl hover:opacity-90"
            to="/rss.xml"
            title="RSS Feed"
          >
            <Icons.Feed />
          </Link>
        </Row>
        <p className="text-muted-foreground">
          &copy; 2021 - {new Date().getFullYear()} itsrakesh. v2.
        </p>
      </Col>
    </footer>
  );
}

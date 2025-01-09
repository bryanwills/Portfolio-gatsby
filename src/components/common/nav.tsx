import { Link, PageProps } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { Menu } from "lucide-react";
import React from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/utils/cn";

import { Button } from "../ui/reusables/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/reusables/dropdown-menu";
import Row from "../ui/row";

export default function Nav({
  location,
}: Readonly<{ location: PageProps["location"] }>) {
  return (
    <>
      <header
        role="banner"
        className="p-2 bg-[linear-gradient(_43deg,#4158d0_0%,#c850c0_46%,#ffcc70_100%_)] text-white text-center underline"
      >
        <a href={siteConfig.links.email}>Hire Me</a>
      </header>
      <nav
        role="navigation"
        className="relative flex justify-between items-center py-8 px-[7%]"
      >
        <Link to="/">
          <StaticImage
            src={"../../images/icon.png"}
            alt="itsrakesh logo"
            width={60}
            height={60}
            class="hover:animate-spin rounded-full cursor-pointer"
          />
        </Link>

        {/* Desktop Menu */}
        <Row className="hidden md:flex gap-2">
          {Object.values(siteConfig.pages).map((item) => (
            <Link key={item.link} to={item.link}>
              <Button
                variant={"ghost"}
                className={cn("font-semibold text-md", {
                  "text-primary": location.pathname === item.link,
                })}
              >
                {item.title}
              </Button>
            </Link>
          ))}
          <a href={siteConfig.links.blog} target="_blank" rel="noreferrer">
            <Button variant={"ghost"} className="font-semibold text-md">
              Articles
            </Button>
          </a>
        </Row>

        {/* Mobile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {Object.values(siteConfig.pages).map((item) => (
              <DropdownMenuItem key={item.link} asChild>
                <Link to={item.link} className="w-full">
                  <span
                    className={cn("font-semibold", {
                      "text-primary": location.pathname === item.link,
                    })}
                  >
                    {item.title}
                  </span>
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem asChild>
              <a
                href={siteConfig.links.blog}
                target="_blank"
                className="w-full" rel="noreferrer"
              >
                <span className="font-semibold">Articles</span>
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </>
  );
}

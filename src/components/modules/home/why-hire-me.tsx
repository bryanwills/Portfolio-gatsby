import { StaticImage } from "gatsby-plugin-image";
import React from "react";

import Col from "@/components/ui/col";
import { Heading } from "@/components/ui/heading";

export default function WhyHireMe() {
  return (
    <Col className="space-y-16">
      <Heading level={2}>
        Why Hire Me<span className="text-primary">?</span>
      </Heading>
      <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-4 text-center">
        {[
          {
            img: (
              <StaticImage
                src={"../../../images/self-motivation.png"}
                alt={"Self Motivated"}
                placeholder="blurred"
                className="bg-white rounded-3xl"
              />
            ),
            title: "Self Motivated",
            description: "I put myself into action to achieve my goals.",
          },
          {
            img: (
              <StaticImage
                src={"../../../images/collaborative.png"}
                alt={"Collaborative"}
                placeholder="blurred"
                className="bg-white rounded-3xl"
              />
            ),
            title: "Collaborative",
            description: "Teamwork makes the dream work, right?",
          },
          {
            img: (
              <StaticImage
                src={"../../../images/work-ethic.png"}
                alt={"Workaholic"}
                placeholder="blurred"
                className="bg-white rounded-3xl"
              />
            ),
            title: "Workaholic",
            description: "I don't wait for deadlines, deadlines wait for me.",
          },
          {
            img: (
              <StaticImage
                src={"../../../images/communicative.png"}
                alt={"Communicative"}
                placeholder="blurred"
                className="bg-white rounded-3xl"
              />
            ),
            title: "Communicative",
            description:
              "I balance talking and listening for effective communication.",
          },
        ].map((item) => (
          <Col key={item.title} className="space-y-3">
            {item.img}
            <Heading level={3} className="text-chart-6">
              {item.title}
            </Heading>
            <p>{item.description}</p>
          </Col>
        ))}
      </div>
    </Col>
  );
}

import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import Marquee from "react-fast-marquee";

import Col from "@/components/ui/col";
import { Heading } from "@/components/ui/heading";
import Row from "@/components/ui/row";

export default function PastClients({
  pastClients,
}: Readonly<{
  pastClients: Queries.HomePageQuery["allContentfulClient"];
}>) {
  return (
    <Col className="space-y-16">
      <Heading level={2}>Past Clients</Heading>
      <Marquee autoFill pauseOnHover>
        <Row>
          {pastClients.nodes.map((client) => (
            <GatsbyImage
              key={client.name}
              image={client.logo?.gatsbyImageData as IGatsbyImageData}
              alt={client.name ?? ""}
              className="grayscale hover:grayscale-0 w-28 h-full mx-10"
              title={client.name ?? ""}
            />
          ))}
        </Row>
      </Marquee>
    </Col>
  );
}

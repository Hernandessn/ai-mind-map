// index.jsx - versão responsiva
import React from "react";
import { Container, OrgChart, ResponsiveOrgChart } from "./styles";
import Node from "./Node";

const Hierarchical = ({ data }) => {
  return (
    <Container>
      <ResponsiveOrgChart>
        <OrgChart>
          <Node data={data} level={0} />
        </OrgChart>
      </ResponsiveOrgChart>
    </Container>
  );
};

export default Hierarchical;
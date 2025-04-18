// Node.jsx
import React from "react";
import { 
  NodeContainer, 
  NodeContent, 
  ChildrenContainer, 
  LineDown, 
  LineAcross,
  HorizontalConnector,
  ConnectorsWrapper
} from "./styles";

const Node = ({ data, level }) => {
  const hasChildren = data.children && data.children.length > 0;
  
  return (
    <NodeContainer level={level}>
      <NodeContent level={level} nodeType={data.type}>
        {data.title}
      </NodeContent>
      
      {hasChildren && (
        <>
          {level === 0 && data.connector && (
            <HorizontalConnector>
              <LineAcross />
              <NodeContent level={0} nodeType="ceo">
                {data.connector}
              </NodeContent>
            </HorizontalConnector>
          )}
          
          <LineDown />
          
          <ConnectorsWrapper childCount={data.children.length}>
            {data.children.map((_, index) => (
              <LineAcross key={`connector-${index}`} />
            ))}
          </ConnectorsWrapper>
          
          <ChildrenContainer>
            {data.children.map((child, index) => (
              <Node key={index} data={child} level={level + 1} />
            ))}
          </ChildrenContainer>
        </>
      )}
    </NodeContainer>
  );
};

export default Node;

import React, { useState } from 'react';
import { 
  HierarchicalMapContainer, 
  NodeWrapper,
  NodeCard, 
  NodeContent,
  NodeTitle,
  ChildrenContainer,
  ConnectionLine
} from './styles';

export const HierarchicalNode = ({ node = {}, level = 0, index = 0, parentWidth = 0 }) => {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  
  const toggleExpand = () => {
    if (hasChildren) {
      setExpanded(!expanded);
    }
  };

  // Garantimos que title sempre tenha um valor
  const nodeTitle = node.title || "Tópico";

  return (
    <NodeWrapper level={level}>
      {level > 0 && (
        <ConnectionLine level={level} />
      )}
      
      <NodeCard level={level} onClick={toggleExpand} hasChildren={hasChildren}>
        <NodeContent>
          {node.icon && <span className="icon">{node.icon}</span>}
          <NodeTitle level={level}>{nodeTitle}</NodeTitle>
        </NodeContent>
      </NodeCard>

      {hasChildren && expanded && (
        <ChildrenContainer>
          {node.children.map((child, childIndex) => (
            <HierarchicalNode 
              key={`${level}-${childIndex}`}
              node={child}
              level={level + 1}
              index={childIndex}
              parentWidth={parentWidth / node.children.length}
            />
          ))}
        </ChildrenContainer>
      )}
    </NodeWrapper>
  );
};

const HierarchicalMindMap = ({ data = {} }) => {
  // Se não houver dados, criar um objeto padrão
  const safeData = data || {
    title: "Tópico Principal",
    children: []
  };
  
  return (
    <HierarchicalMapContainer>
      <HierarchicalNode node={safeData} />
    </HierarchicalMapContainer>
  );
};



// Usage example:
/*
const data = {
  title: "Tópico Principal",
  icon: "🏆",
  children: [
    {
      title: "Categoria A",
      icon: "📊",
      children: [
        { title: "Subcategoria A1", icon: "📝" },
        { title: "Subcategoria A2", icon: "📋" }
      ]
    },
    {
      title: "Categoria B",
      icon: "🔍",
      children: [
        { title: "Subcategoria B1", icon: "🔑" },
        { title: "Subcategoria B2", icon: "🎯" }
      ]
    }
  ]
};

<HierarchicalMindMap data={data} />
*/
import React, { useState } from 'react';
import { 
  GridMapContainer, 
  CategorySection,
  CategoryTitle,
  CardsGrid,
  ItemCard,
  ItemHeader,
  ItemIcon,
  ItemTitle,
  ItemDescription,
  ConnectionLine,
  FilterBar,
  FilterButton,
  EmptyState
} from './styles';

export const GridMindMap = ({ data = {} }) => {
  // Garantir que data.items existe
  const items = data && data.items ? data.items : [];
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredItem, setHoveredItem] = useState(null);
  
  // Se não houver itens, mostrar estado vazio
  if (items.length === 0) {
    return (
      <GridMapContainer>
        <EmptyState>
          <p>Sem dados para exibir. Adicione itens ao grid.</p>
        </EmptyState>
      </GridMapContainer>
    );
  }
  
  // Extract all categories
  const categories = ['all', ...new Set(items.map(item => item.category || 'outros'))];
  
  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);
  
  // Group items by category for visual organization
  const groupedItems = {};
  filteredItems.forEach(item => {
    const category = item.category || 'outros';
    if (!groupedItems[category]) {
      groupedItems[category] = [];
    }
    groupedItems[category].push(item);
  });
  
  const getCategoryColor = (category) => {
    const colorMap = {
      strategy: '#2563eb',    // Blue
      execution: '#16a34a',   // Green
      analysis: '#9333ea',    // Purple
      feedback: '#f59e0b',    // Amber
      default: '#64748b'      // Slate
    };
    
    return colorMap[category] || colorMap.default;
  };
  
  return (
    <GridMapContainer>
      <FilterBar>
        {categories.map(category => (
          <FilterButton 
            key={category}
            isActive={activeCategory === category}
            color={category !== 'all' ? getCategoryColor(category) : '#64748b'}
            onClick={() => setActiveCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </FilterButton>
        ))}
      </FilterBar>
      
      {Object.keys(groupedItems).map(category => (
        <CategorySection key={category}>
          <CategoryTitle color={getCategoryColor(category)}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </CategoryTitle>
          
          <CardsGrid>
            {groupedItems[category].map((item, index) => {
              const itemId = `${category}-${index}`;
              
              return (
                <ItemCard 
                  key={itemId}
                  id={itemId} // Importante adicionar ID para as conexões funcionarem
                  onMouseEnter={() => setHoveredItem(itemId)}
                  onMouseLeave={() => setHoveredItem(null)}
                  category={item.category || 'outros'}
                  color={getCategoryColor(item.category)}
                >
                  <ItemHeader>
                    {item.icon && <ItemIcon>{item.icon}</ItemIcon>}
                    <ItemTitle>{item.title || "Item"}</ItemTitle>
                  </ItemHeader>
                  {item.description && (
                    <ItemDescription>{item.description}</ItemDescription>
                  )}
                  
                  {/* Show connections when item is hovered - com verificação de segurança */}
                  {item.connections && hoveredItem === itemId && item.connections.map((connectedId, cIndex) => {
                    // Só tentamos renderizar se estivermos no navegador
                    if (typeof document === 'undefined') return null;
                    
                    const targetElement = document.getElementById(connectedId);
                    const sourceElement = document.getElementById(itemId);
                    
                    if (!targetElement || !sourceElement) return null;
                    
                    // Calculate connection positions
                    const sourceRect = sourceElement.getBoundingClientRect();
                    const targetRect = targetElement.getBoundingClientRect();
                    
                    return (
                      <ConnectionLine 
                        key={`conn-${itemId}-${cIndex}`}
                        x1={sourceRect.left + sourceRect.width / 2} 
                        y1={sourceRect.top + sourceRect.height / 2}
                        x2={targetRect.left + targetRect.width / 2} 
                        y2={targetRect.top + targetRect.height / 2}  
                        color={getCategoryColor(item.category)}
                      />
                    );
                  })}
                </ItemCard>
              );
            })}
          </CardsGrid>
        </CategorySection>
      ))}
    </GridMapContainer>
  );
};



// Usage example:
/*
const data = {
  items: [
    {
      title: "Pesquisa de Mercado",
      icon: "🔍",
      description: "Analisar concorrentes e tendências",
      category: "strategy",
      connections: ["strategy-1", "execution-0"]
    },
    {
      title: "Definição de Objetivos",
      icon: "🎯",
      description: "Estabelecer metas SMART",
      category: "strategy"
    },
    {
      title: "Desenvolvimento MVP",
      icon: "🛠️",
      description: "Criar versão mínima viável",
      category: "execution"
    },
    {
      title: "Análise de Dados",
      icon: "📊",
      description: "Métricas e KPIs",
      category: "analysis"
    },
    {
      title: "Testes de Usabilidade",
      icon: "👥",
      description: "Feedback dos usuários",
      category: "feedback"
    }
  ]
};

<GridMindMap data={data} />
*/
import React, { useState, useRef } from 'react';
import { 
  LinearMapContainer, 
  MapScroller,
  StepCard, 
  StepArrow,
  StepTitle,
  StepContent,
  StepIcon,
  BranchContainer,
  BranchConnector,
  SubStepCard
} from './styles';

export const LinearMindMap = ({ data = {} }) => {
  const [expandedSteps, setExpandedSteps] = useState({});
  const scrollerRef = useRef(null);
  
  // Garantir que data.steps existe
  const steps = data && data.steps ? data.steps : [];
  
  const toggleStep = (stepId) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const handleScroll = (direction) => {
    if (scrollerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <LinearMapContainer>
      <button 
        className="scroll-button left" 
        onClick={() => handleScroll('left')}
        aria-label="Scroll left"
      >
        ←
      </button>
      
      <MapScroller ref={scrollerRef}>
        {steps.length > 0 ? steps.map((step, index) => {
          const stepId = `step-${index}`;
          const hasSubSteps = step.subSteps && step.subSteps.length > 0;
          const isExpanded = expandedSteps[stepId];
          
          return (
            <div key={stepId} className="step-wrapper">
              <StepCard 
                onClick={() => hasSubSteps && toggleStep(stepId)}
                isClickable={hasSubSteps}
              >
                {step.icon && <StepIcon>{step.icon}</StepIcon>}
                <StepTitle>{step.title || "Passo"}</StepTitle>
                {step.content && <StepContent>{step.content}</StepContent>}
                {hasSubSteps && (
                  <span className="expand-indicator">
                    {isExpanded ? '▲' : '▼'}
                  </span>
                )}
              </StepCard>
              
              {index < steps.length - 1 && (
                <StepArrow>→</StepArrow>
              )}
              
              {hasSubSteps && isExpanded && (
                <BranchContainer>
                  <BranchConnector />
                  {step.subSteps.map((subStep, subIndex) => (
                    <React.Fragment key={`${stepId}-sub-${subIndex}`}>
                      <SubStepCard>
                        {subStep.icon && <span className="sub-icon">{subStep.icon}</span>}
                        <span className="sub-title">{subStep.title || "Sub-passo"}</span>
                      </SubStepCard>
                      {subIndex < step.subSteps.length - 1 && (
                        <div className="sub-arrow">→</div>
                      )}
                    </React.Fragment>
                  ))}
                </BranchContainer>
              )}
            </div>
          );
        }) : (
          <div className="empty-state">
            <StepCard>
              <StepTitle>Sem passos definidos</StepTitle>
              <StepContent>Adicione passos para visualizar o mapa linear</StepContent>
            </StepCard>
          </div>
        )}
      </MapScroller>
      
      <button 
        className="scroll-button right" 
        onClick={() => handleScroll('right')}
        aria-label="Scroll right"
      >
        →
      </button>
    </LinearMapContainer>
  );
};


// Usage example:
/*
const data = {
  steps: [
    {
      title: "Planejamento",
      icon: "📝",
      content: "Definir objetivos",
      subSteps: [
        { title: "Análise inicial", icon: "🔍" },
        { title: "Definir KPIs", icon: "📊" }
      ]
    },
    {
      title: "Desenvolvimento",
      icon: "🛠️",
      content: "Criação do produto"
    },
    {
      title: "Testes",
      icon: "🧪",
      content: "Verificar qualidade",
      subSteps: [
        { title: "Testes unitários", icon: "✓" },
        { title: "Testes de integração", icon: "🔄" }
      ]
    },
    {
      title: "Lançamento",
      icon: "🚀",
      content: "Disponibilizar ao público"
    }
  ]
};

<LinearMindMap data={data} />
*/
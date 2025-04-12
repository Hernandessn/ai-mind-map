// src/App.jsx
import React from 'react';
import RadialMindMap from '../../components/MindMaps/Radial';

export function TestPage() {
  const mockRadial = {
    title: 'Programação',
    nodes: [
      {
        title: 'Frontend',
        subtopics: ['React', 'CSS', 'HTML', 'Styled Components'],
      },
      {
        title: 'Backend',
        subtopics: ['Node.js', 'Express', 'API REST'],
      },
      {
        title: 'Banco de Dados',
        subtopics: ['MongoDB', 'PostgreSQL'],
      },
      {
        title: 'DevOps',
        subtopics: ['Docker', 'CI/CD'],
      },
      {
        title: 'Mobile',
        subtopics: ['React Native', 'Flutter'],
      },
      {
        title: 'Testes',
        subtopics: ['Jest', 'Cypress'],
      },
      {
        title: 'Segurança',
        subtopics: ['JWT', 'Criptografia'],
      },
    ],
  };
  
  return (
    <div>
   
    <RadialMindMap data={mockRadial} />
  </div>
);

}


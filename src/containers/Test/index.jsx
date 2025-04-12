// src/App.jsx
import React from 'react';
import Radial from '../../components/MindMaps/Radial';
import { Div } from './styles';
import Hierarchical from '../../components/MindMaps/Hierarquico';
import Linear from '../../components/MindMaps/Linear';

export function TestPage() {
  //Radial
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
  //Hierarquico
  const mockHierarchical = {
      title: "Company X",
      type: "company",
      children: [
        {
          title: "CMO",
          type: "cmo",
          children: [
            {
              title: "Marketing Manager",
              type: "marketing",
              children: [
                {
                  title: "Content Specialist",
                  type: "marketing"
                },
                {
                  title: "Marketing Designer",
                  type: "marketing"
                }
              ]
            },
            {
              title: "SEO Lead",
              type: "marketing"
            }
          ]
        },
        {
          title: "CTO",
          type: "cto",
          children: [
            {
              title: "Head of Engineering",
              type: "engineering",
              children: [
                {
                  title: "Engineer",
                  type: "engineering"
                },
                {
                  title: "Engineer",
                  type: "engineering"
                }
              ]
            },
            {
              title: "Head of IT",
              type: "engineering",
              children: [
                {
                  title: "IT Specialist",
                  type: "engineering"
                }
              ]
            }
          ]
        },
        {
          title: "COO",
          type: "coo",
          children: [
            {
              title: "Head of Operations",
              type: "operations",
              children: [
                {
                  title: "CX Manager",
                  type: "operations"
                }
              ]
            }
          ]
        },
        {
          title: "CPO",
          type: "cpo",
          children: [
            {
              title: "Head of Product",
              type: "product",
              children: [
                {
                  title: "Product Manager",
                  type: "product"
                },
                {
                  title: "Product Manager",
                  type: "product"
                }
              ]
            }
          ]
        }
      ]
    };

    //Linear
    const mockLinear = [
      {
        title: "Introdução ao Tema",
        description: "Apresentação da ideia central e contexto do mapa mental."
      },
      {
        title: "Exploração",
        description: "Detalhamento dos conceitos principais em ordem lógica."
      },
      {
        title: "Exploração",
        description: "Detalhamento dos conceitos principais em ordem lógica."
      },
      {
        title: "Exploração",
        description: "Detalhamento dos conceitos principais em ordem lógica."
      },
      {
        title: "Conclusão",
        description: "Resumo e encerramento da linha de raciocínio."
      }
    ];
    const mockGrade = [
      {
        title: 'Frontend',
        subtopics: ['React', 'CSS', 'JavaScript'],
      },
      {
        title: 'Backend',
        subtopics: ['Node.js', 'Express', 'MongoDB'],
      },
      {
        title: 'DevOps',
        subtopics: ['Docker', 'CI/CD', 'AWS'],
      },
      {
        title: 'UI/UX',
        subtopics: ['Figma', 'Prototypagem', 'Testes'],
      },
    ];
    
  return (
    <Div>
    <Radial data={mockRadial} />
    <Hierarchical data={mockHierarchical} />
    <Linear data={mockLinear} />
  </Div>
);

}


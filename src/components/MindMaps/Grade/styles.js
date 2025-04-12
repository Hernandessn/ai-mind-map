import styled from 'styled-components';

export const GridMapContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f8fafc;
  border-radius: 8px;
`;

export const FilterButton = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid ${props => props.isActive ? props.color : '#e2e8f0'};
  background-color: ${props => props.isActive ? props.color : 'transparent'};
  color: ${props => props.isActive ? 'white' : props.color};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.isActive ? props.color : '#f1f5f9'};
    transform: translateY(-2px);
  }
`;

export const CategorySection = styled.div`
  margin-bottom: 30px;
`;

export const CategoryTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.color || '#1e293b'};
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid ${props => props.color || '#e2e8f0'};
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

export const ItemCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  border-top: 4px solid ${props => props.color || '#64748b'};`;
import styled from 'styled-components';

export const LinearMapContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 20px 0;
  display: flex;
  align-items: center;
  
  .scroll-button {
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    border: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    cursor: pointer;
    z-index: 10;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
    
    &:hover {
      background-color: #f8fafc;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    &.left {
      left: 10px;
    }
    
    &.right {
      right: 10px;
    }
  }
`;

export const MapScroller = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 30px 60px;
  width: 100%;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  
  .step-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
    min-width: 200px;
    position: relative;
  }
`;

export const StepCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  min-width: 180px;
  max-width: 240px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-left: 4px solid #3b82f6;
  transition: all 0.3s ease;
  cursor: ${props => props.isClickable ? 'pointer' : 'default'};
  
  &:hover {
    transform: ${props => props.isClickable ? 'translateY(-5px)' : 'none'};
    box-shadow: ${props => props.isClickable ? '0 8px 20px rgba(0, 0, 0, 0.12)' : '0 4px 12px rgba(0, 0, 0, 0.08)'};
  }
  
  .expand-indicator {
    margin-top: 8px;
    font-size: 12px;
    color: #64748b;
  }
`;

export const StepTitle = styled.h3`
  margin: 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  text-align: center;
`;

export const StepContent = styled.p`
  margin: 0;
  font-size: 14px;
  color: #64748b;
  text-align: center;
`;

export const StepIcon = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
`;

export const StepArrow = styled.div`
  font-size: 24px;
  margin: 0 16px;
  color: #94a3b8;
  align-self: center;
`;

export const BranchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
  position: relative;
  padding: 20px 0;
  
  .sub-arrow {
    margin: 0 10px;
    color: #94a3b8;
    font-size: 16px;
  }
`;

export const BranchConnector = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 20px;
  background-color: #94a3b8;
`;

export const SubStepCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border-left: 3px solid #60a5fa;
  
  .sub-icon {
    font-size: 16px;
  }
  
  .sub-title {
    font-size: 14px;
    font-weight: 500;
    color: #334155;
  }
`;
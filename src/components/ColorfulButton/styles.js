import styled from "styled-components";


export const Button = styled.button`
  width: 150px;
  height: 50px;
  border-radius: 25px;
  position: relative;
  background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
  background: 
  ${(props)=> props.$theme === true ? "transparent" 
  : "linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82)"};
  cursor: pointer;
  border: ${props => props.$theme === true ? "2px solid #ffff" : "2px solid transparent"}; 
  color: white;
  font-size: 16px;
  font-weight: bold;
  outline: none;
  text-align: center;
  transition: border-color 0.3s ease-in-out; /* Animação suave da borda */

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  &:hover {
    background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
    box-shadow: 0 0 25px rgba(10, 124, 177, 0.8); /* Sombra ao passar o mouse */
    transition: all 0.3s ease-in-out; /* Animação suave ao passar o mouse */
  }
  `;
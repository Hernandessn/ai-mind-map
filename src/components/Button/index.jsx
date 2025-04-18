// index.jsx
import React from "react";
import { Button, LoadingSpinner } from "./styles";

export function DefaultButton({ 
  children, 
  $color, 
  $colorStart,
  $colorEnd, 
  $gradient, 
  $rounded, 
  $borderColor, 
  loading = false,
  onClick,
  ...props 
}) {
  // Manipula o clique do botão, acionando o callback se fornecido
  const handleClick = (e) => {
    if (onClick && !loading) {
      onClick(e);
    }
  };

  return (
    <Button
      $color={$color}
      $colorStart={$colorStart}
      $colorEnd={$colorEnd}
      $gradient={$gradient}
      $rounded={$rounded}
      $borderColor={$borderColor}
      $loading={loading}
      onClick={handleClick}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <>
          <LoadingSpinner />
          {children}
        </>
      ) : (
        children
      )}
    </Button>
  );
}

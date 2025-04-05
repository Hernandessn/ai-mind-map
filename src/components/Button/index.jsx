import { Button } from "./styles";

export function DefaultButton({ children, $color, $colorStart,
   $colorEnd, $gradient, $rounded, $borderColor, ...props }) {
  return (
    <Button
      $color={$color}
      $colorStart={$colorStart}
      $colorEnd={$colorEnd}
      $gradient={$gradient}
      $rounded={$rounded}
      $borderColor={$borderColor}
      {...props}
    >
      {children}
    </Button>
  );
}

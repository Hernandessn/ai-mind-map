import { Button } from "./styles";



export function ColorfulButton({ children, theme ,...props }) {
  return (
    <Button {...props} theme={theme}>
        {children}
    </Button>
  );
}
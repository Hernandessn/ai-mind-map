import { Button } from "./styles";



export function ColorfulButton({ children ,...props }) {

    


  return (
    <Button {...props}>
        {children}
    </Button>
  );
}
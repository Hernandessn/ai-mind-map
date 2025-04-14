import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import GlobalStyles from './styles/globalStyles';
import { AppRoutes } from './routes/routes'; // << muda isso aqui!

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoutes /> {/* << muda isso aqui também */}
    <GlobalStyles />
  </StrictMode>,
);

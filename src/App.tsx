import Index from "./pages/Index";
import ComingSoon from "./pages/ComingSoon";

// Con VITE_COMING_SOON=1, nildu.com y www.nildu.com muestran solo "Próximamente"; la URL de
// Vercel (*.vercel.app) y localhost muestran la landing completa para revisarla antes del lanzamiento.
const comingSoon = import.meta.env.VITE_COMING_SOON === "1" && location.hostname.endsWith("nildu.com");

const App = () => (comingSoon ? <ComingSoon /> : <Index />);

export default App;

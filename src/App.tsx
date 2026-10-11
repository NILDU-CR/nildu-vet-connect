import Index from "./pages/Index";
import ComingSoon from "./pages/ComingSoon";
import Ayuda from "./pages/Ayuda";
import Terminos from "./pages/Terminos";
import Privacidad from "./pages/Privacidad";

// Con VITE_COMING_SOON=1, nildu.com y www.nildu.com muestran solo "Próximamente"; la URL de
// Vercel (*.vercel.app) y localhost muestran la landing completa para revisarla antes del lanzamiento.
const comingSoon = import.meta.env.VITE_COMING_SOON === "1" && location.hostname.endsWith("nildu.com");

// Páginas sueltas: se ven siempre, también durante el "Próximamente", porque el portal enlaza /terms y /privacy.
// En Vercel, /terms, /privacy y /help redirigen a su nombre en español (vercel.json); aquí se aceptan para el servidor local.
const paginas: Record<string, () => JSX.Element> = { "/ayuda": Ayuda, "/help": Ayuda, "/terminos": Terminos, "/terms": Terminos, "/privacidad": Privacidad, "/privacy": Privacidad };
const Pagina = paginas[location.pathname.replace(/\/$/, "")];

const App = () => (Pagina ? <Pagina /> : comingSoon ? <ComingSoon /> : <Index />);

export default App;

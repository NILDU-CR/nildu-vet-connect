import type { Lang } from "./i18n";

// Canales de contacto de Nildu, compartidos por el menú, la ayuda y los términos.
// info@: contacto general y ventas (formulario de demo, términos). Soporte: ayuda a clientes y solicitudes sobre
// datos personales (página de ayuda, política de privacidad), con la dirección en el idioma de la página.
export const correoInfo = "info@nildu.com";
export const correoSoporte: Record<Lang, string> = { es: "soporte@nildu.com", en: "support@nildu.com" };
export const telefonoWhatsApp = "+506 8920 5444";

export const whatsappUrl = (texto: string) => "https://wa.me/50689205444?text=" + encodeURIComponent(texto);

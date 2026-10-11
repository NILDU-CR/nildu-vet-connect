import LegalDocument from "@/components/LegalDocument";
import type { Seccion } from "@/components/LegalDocument";
import { correoSoporte } from "@/lib/contact";

// ponytail: borrador redactado sin revisión legal (2026-10-10). Antes del lanzamiento debe revisarlo un abogado.
// Si cambia un proveedor (alojamiento, red, correo, formulario, captcha), hay que actualizar la sección 4.
const ACTUALIZADO = "11 de octubre de 2026";

const secciones: Seccion[] = [
  {
    titulo: "1. Quién es responsable",
    parrafos: [
      `NILDU S.R.L. («Nildu»), sociedad costarricense, es responsable de los datos que recibe en este sitio y de los datos de las cuentas de usuario de Nildu. Puedes escribir a ${correoSoporte} para cualquier tema de privacidad.`,
      "Los datos que cada clínica registra en Nildu sobre sus clientes y sus pacientes son responsabilidad de esa clínica. Nildu los trata en su nombre y solo para prestarle el servicio.",
    ],
  },
  {
    titulo: "2. Datos que recibe este sitio",
    parrafos: [
      "Formulario de demo: tu nombre, correo, teléfono y el nombre de tu veterinaria. Nildu los usa solo para contactarte sobre la demo. El formulario se envía a través de Web3Forms, que lo reenvía al correo de Nildu.",
      "Verificación: antes de enviar el formulario, hCaptcha comprueba que lo envía una persona. Para eso recibe datos técnicos de tu navegador y puede usar cookies, según su propia política de privacidad.",
      "WhatsApp: si escribes a Nildu por WhatsApp, la conversación pasa por WhatsApp y se rige también por sus condiciones.",
      "Datos técnicos: el sitio está alojado en Vercel y pasa por Cloudflare, que lo protege de ataques y lo entrega más rápido. Los dos registran datos técnicos de las visitas, como la dirección IP, para operar el servicio. Cloudflare puede usar cookies técnicas cuando necesita comprobar que una visita no es un ataque.",
      "Este sitio no usa cookies propias ni herramientas de analítica o de publicidad.",
    ],
  },
  {
    titulo: "3. Datos en el software Nildu",
    parrafos: [
      "Usuarios de la clínica: nombre, correo y datos de acceso, para identificarte y aplicar los permisos que la clínica te asigna. nildu.app usa cookies o el almacenamiento del navegador para mantener abierta tu sesión.",
      "Clientes y pacientes: los datos que la clínica registra, como nombre, cédula, correo y teléfono de los dueños, los datos de las mascotas y su historia clínica, las citas y las facturas.",
      "Con esos datos, Nildu muestra y guarda los registros de la clínica, envía en su nombre los correos de citas y los comprobantes electrónicos (XML y PDF) y transmite los comprobantes a Hacienda.",
    ],
  },
  {
    titulo: "4. Con quién se comparten",
    parrafos: [
      "Ministerio de Hacienda: los datos de los comprobantes electrónicos, como exige la ley.",
      "Proveedores que ayudan a operar el servicio: Microsoft Azure (alojamiento del software), Vercel (alojamiento de este sitio), Cloudflare (red y protección de este sitio), Web3Forms y hCaptcha (formulario de demo) y el servicio de envío de correos. Cada uno recibe solo lo necesario para su tarea.",
      "Autoridades, cuando una ley o una orden judicial lo exijan.",
      "Nildu no vende datos personales ni los usa para publicidad.",
    ],
  },
  {
    titulo: "5. Dónde se guardan",
    parrafos: ["Los datos se guardan en servidores en la nube que pueden estar fuera de Costa Rica."],
  },
  {
    titulo: "6. Cuánto tiempo se guardan",
    parrafos: [
      "Los datos del formulario se guardan mientras sirvan para atender tu solicitud; puedes pedir que se borren antes.",
      "Los datos de una clínica se guardan mientras su suscripción esté activa. Al cancelar, la clínica puede pedir que se eliminen, salvo los que la ley obligue a conservar, como los comprobantes electrónicos.",
    ],
  },
  {
    titulo: "7. Seguridad",
    parrafos: [
      "La conexión con este sitio y con nildu.app va cifrada (HTTPS), y en Nildu cada usuario entra con su propia cuenta y con los permisos de su rol.",
      "Ningún sistema es infalible. Si ocurre un incidente que afecte datos personales, Nildu avisará a las clínicas afectadas.",
    ],
  },
  {
    titulo: "8. Tus derechos",
    parrafos: [
      `Puedes pedir acceso a tus datos, corregirlos o eliminarlos escribiendo a ${correoSoporte}.`,
      "Si eres cliente de una clínica que usa Nildu, escribe primero a tu clínica, porque es la responsable de tus datos; Nildu la ayudará a atender tu solicitud.",
      "También puedes acudir a la Agencia de Protección de Datos de los Habitantes (PRODHAB).",
    ],
  },
  {
    titulo: "9. Cambios a esta política",
    parrafos: ["Nildu puede actualizar esta política. La fecha de la última versión aparece al inicio de esta página."],
  },
  {
    titulo: "10. Contacto",
    parrafos: [`Para cualquier consulta sobre privacidad, escribe a ${correoSoporte}.`],
  },
];

const Privacidad = () => (
  <LegalDocument
    titulo="Política de privacidad"
    actualizado={ACTUALIZADO}
    intro="Esta política explica qué datos personales trata Nildu, para qué y con quién los comparte, tanto en este sitio (www.nildu.com) como en el software Nildu (nildu.app), de acuerdo con la Ley N.º 8968 de Protección de la Persona frente al Tratamiento de sus Datos Personales."
    secciones={secciones}
  />
);

export default Privacidad;

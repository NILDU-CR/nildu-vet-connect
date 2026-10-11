import LegalDocument from "@/components/LegalDocument";
import type { Seccion } from "@/components/LegalDocument";
import { correoSoporte, telefonoWhatsApp } from "@/lib/contact";

// ponytail: borrador redactado sin revisión legal (2026-10-10). Antes del lanzamiento debe revisarlo un abogado,
// sobre todo cancelación y reembolsos, responsabilidad y datos personales.
const ACTUALIZADO = "10 de octubre de 2026";

const secciones: Seccion[] = [
  {
    titulo: "1. El servicio",
    parrafos: [
      "Nildu es un software en la nube para administrar una veterinaria: agenda, expediente clínico, facturación electrónica, inventario, tareas y reportes. Se usa desde el navegador, en nildu.app.",
      "Nildu puede mejorar, cambiar o retirar funciones. Si un cambio quita algo importante del plan que pagas, Nildu te avisará antes por correo.",
    ],
  },
  {
    titulo: "2. Tu cuenta y tus usuarios",
    parrafos: [
      "La clínica crea los usuarios de su equipo y define qué puede hacer cada uno. Cada persona debe usar su propia cuenta y guardar su contraseña en secreto.",
      `La clínica responde por lo que hagan sus usuarios dentro de Nildu. Si crees que alguien entró a tu cuenta sin permiso, escribe de inmediato a ${correoSoporte}.`,
    ],
  },
  {
    titulo: "3. Suscripción y pagos",
    parrafos: [
      "Nildu se paga por suscripción mensual o anual, según el plan y la cantidad de usuarios. Los precios vigentes son los publicados en www.nildu.com o los acordados al contratar, y no incluyen IVA.",
      "Si los precios cambian, Nildu te avisará antes de que el cambio se aplique a tu siguiente periodo. Si un pago queda pendiente, Nildu puede suspender el acceso hasta que se ponga al día.",
    ],
  },
  {
    titulo: "4. Tus datos",
    parrafos: [
      "La información que registras en Nildu (clientes, pacientes, consultas, facturas, inventario) es de la clínica. Nildu la guarda y la procesa solo para prestarte el servicio; no la vende ni la usa para publicidad.",
      "La clínica es responsable de contar con la autorización de sus clientes para registrar sus datos y para que Nildu les envíe correos en su nombre, como los avisos de citas, según la Ley N.º 8968 de Protección de la Persona frente al Tratamiento de sus Datos Personales.",
      "Nildu aplica medidas razonables de seguridad para proteger la información. Si ocurre un incidente que afecte los datos de tu clínica, Nildu te avisará.",
    ],
  },
  {
    titulo: "5. Factura electrónica",
    parrafos: [
      "Para emitir comprobantes electrónicos, la clínica entrega a Nildu su llave criptográfica de Hacienda con su PIN y su usuario y contraseña de Hacienda. Nildu los usa solo para firmar y enviar los comprobantes de la clínica.",
      "La clínica es responsable de que su información tributaria sea correcta, incluidos los códigos CABYS, las tarifas de IVA y los datos de sus clientes. Nildu no responde por rechazos ni multas de Hacienda causados por datos incorrectos.",
    ],
  },
  {
    titulo: "6. Uso aceptable",
    parrafos: [
      "No puedes usar Nildu para actividades ilegales, para enviar correo no deseado, para intentar entrar a la cuenta de otra clínica ni para copiar o revender el software.",
    ],
  },
  {
    titulo: "7. Disponibilidad y soporte",
    parrafos: [
      "Nildu trabaja para que el servicio esté disponible siempre, pero puede haber interrupciones por mantenimiento o por fallas de sus proveedores. Nildu no garantiza un funcionamiento sin interrupciones.",
      `Para soporte, escribe por WhatsApp al ${telefonoWhatsApp} o a ${correoSoporte}.`,
    ],
  },
  {
    titulo: "8. Propiedad intelectual",
    parrafos: [
      "El software, la marca y el diseño de Nildu son de NILDU S.R.L. La suscripción te da derecho a usar Nildu mientras esté vigente; no te transfiere la propiedad del software.",
    ],
  },
  {
    titulo: "9. Responsabilidad",
    parrafos: [
      "Nildu es una herramienta de registro y administración. Las decisiones clínicas son siempre del profesional veterinario.",
      "En la medida en que la ley lo permita, Nildu no responde por daños indirectos, como pérdida de ingresos o de clientes, y su responsabilidad total no supera lo que la clínica pagó por Nildu en los últimos 12 meses.",
    ],
  },
  {
    titulo: "10. Cancelación y suspensión",
    parrafos: [
      `Puedes cancelar tu suscripción cuando quieras escribiendo a ${correoSoporte}. El acceso sigue hasta el final del periodo pagado y no se hacen reembolsos por el tiempo que quede.`,
      "Antes de cancelar, puedes descargar los reportes de citas y de pacientes en Excel. Después, puedes pedir que Nildu elimine los datos de tu clínica, salvo los que la ley obligue a conservar.",
      "Nildu puede suspender o cerrar una cuenta que incumpla estos términos.",
    ],
  },
  {
    titulo: "11. Cambios a estos términos",
    parrafos: [
      "Nildu puede actualizar estos términos. La fecha de la última versión aparece al inicio de esta página y, si el cambio es importante, Nildu te avisará por correo.",
    ],
  },
  {
    titulo: "12. Ley aplicable",
    parrafos: ["Estos términos se rigen por las leyes de la República de Costa Rica, y cualquier disputa se resolverá ante sus tribunales."],
  },
  {
    titulo: "13. Contacto",
    parrafos: [`Si tienes preguntas sobre estos términos, escribe a ${correoSoporte}.`],
  },
];

const Terminos = () => (
  <LegalDocument
    titulo="Términos del servicio"
    actualizado={ACTUALIZADO}
    intro="Estos términos regulan el uso de Nildu, el software para veterinarias de NILDU S.R.L., sociedad costarricense. Al crear una cuenta o usar Nildu, la clínica que contrata el servicio y sus usuarios aceptan estos términos."
    secciones={secciones}
  />
);

export default Terminos;

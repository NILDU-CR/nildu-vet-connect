import LegalDocument from "@/components/LegalDocument";
import type { Documento, Seccion } from "@/components/LegalDocument";
import { correoInfo, correoSoporte } from "@/lib/contact";
import type { Lang } from "@/lib/i18n";

// Borrador sin revisión legal (2026-11-23). Antes de publicarlo debe revisarlo un abogado, sobre todo la cancelación y
// los reembolsos, la responsabilidad y el acuerdo de tratamiento de datos (sección 6). La sección 6 no da plazos en
// días ni horas: remite a lo que estipula la ley, igual que las secciones 3 y 4 de la política de privacidad. Tampoco
// nombra a los proveedores, solo el tipo de servicio que dan. El texto que vale es el español; la
// versión en inglés es una traducción de referencia y debe decir lo mismo, sección por sección.
// info@ solo para preguntas sobre estos términos; lo que hace un cliente con su cuenta (soporte, accesos, seguridad,
// cancelación) va al correo de soporte, en el idioma de la versión.
const C = correoInfo;

const seccionesEs: Seccion[] = [
  {
    titulo: "1. Definiciones",
    contenido: [
      {
        lista: [
          "Veterinaria: la persona física o jurídica para la que se contrata Nildu.",
          "Suscriptor: quien contrata Nildu para su veterinaria. Es el responsable de hacer los pagos y de manejar los usuarios.",
          "Usuarios: las personas a quienes el suscriptor da acceso a la cuenta de la veterinaria.",
          "Datos de la veterinaria: la información que la veterinaria y sus usuarios registran en Nildu, incluidos los datos personales de sus clientes.",
          "Servicio: el software Nildu en nildu.app, con sus funciones, actualizaciones y soporte.",
        ],
      },
    ],
  },
  {
    titulo: "2. El servicio",
    contenido: [
      "Nildu es un software en la nube para administrar una veterinaria: agenda, expediente clínico, facturación electrónica, inventario, tareas y reportes. Se usa desde el navegador, en nildu.app, en dispositivos como computadoras, celulares o tabletas con un sistema operativo y un navegador compatibles:",
      {
        lista: [
          "Sistemas operativos: Windows 11, macOS 26, iOS 26 y Android 16, o versiones posteriores.",
          "Navegadores: Google Chrome 158, Microsoft Edge 157 y Safari 27, o versiones posteriores.",
        ],
      },
      "Nildu funciona correctamente con esa configuración. Con otros sistemas, navegadores o versiones puede no funcionar bien, y Nildu no lo garantiza.",
      "Nildu puede mejorar, cambiar o retirar funciones. Si un cambio quita algo importante del plan que pagas, Nildu te avisará antes por correo.",
    ],
  },
  {
    titulo: "3. Responsabilidades del suscriptor y sus usuarios",
    contenido: [
      "El suscriptor crea los usuarios del equipo de la veterinaria y define qué puede hacer cada uno. Los usuarios deben ser mayores de edad, y la veterinaria responde por lo que hagan dentro de Nildu.",
      "El suscriptor y sus usuarios se comprometen a:",
      {
        lista: [
          "usar Nildu de buena fe y solo para la gestión de la veterinaria;",
          "usar cada persona su propia cuenta, sin compartirla, y guardar su contraseña en secreto; cada usuario responde por la información que ingresa, cambia o elimina;",
          "dar información verdadera y completa, y mantener al día los datos de contacto del suscriptor, en especial su correo y su teléfono;",
          "contar con los equipos, el sistema operativo, el navegador y la conexión a internet que pide la sección 2, y asumir su costo;",
          "tener el derecho y el consentimiento necesarios para registrar o importar en Nildu los datos de sus clientes, y cuidar que sean correctos: Nildu no revisa la exactitud de lo que se registra o se importa;",
          "conservar los expedientes, comprobantes y demás registros que les exijan la ley o su colegio profesional, y descargarlos antes de cancelar;",
          "avisar a Nildu si cambia el dueño de la veterinaria o la persona que administra la cuenta; mientras no lo hagan, Nildu tratará con el suscriptor registrado.",
        ],
      },
      `Si crees que alguien entró a tu cuenta sin permiso, escribe de inmediato a ${correoSoporte.es}.`,
      "Nildu puede bloquear un acceso de forma preventiva si detecta un uso indebido o un riesgo de seguridad, y se lo avisará al suscriptor.",
    ],
  },
  {
    titulo: "4. Suscripción y pagos",
    contenido: [
      "Nildu se paga por suscripción mensual o anual, según el plan y la cantidad de usuarios. Los precios vigentes son los publicados en www.nildu.com o los acordados al contratar, e incluyen el IVA. Están en dólares estadounidenses. Nildu define, a su criterio, el medio de pago que debe usar cada suscriptor y la moneda en que se emite su factura; si se factura en colones, se usa el tipo de cambio de referencia de venta del Banco Central de Costa Rica del día en que se emite la factura.",
      "Si los precios cambian, Nildu te avisará antes de que el cambio se aplique a tu siguiente periodo. Si un pago queda pendiente, Nildu puede suspender el acceso hasta que el suscriptor se ponga al día.",
    ],
  },
  {
    titulo: "5. Los datos de la veterinaria",
    contenido: [
      "Los datos de la veterinaria son suyos. Nildu los guarda y los procesa solo para prestar el servicio; no los vende, no los usa para publicidad ni los comparte con otras veterinarias.",
      "La veterinaria puede descargar en cualquier momento los reportes de citas y de pacientes en Excel. Si lo pide, Nildu le entrega una copia de sus datos en un formato de uso común.",
    ],
  },
  {
    titulo: "6. Acuerdo de tratamiento de datos personales",
    contenido: [
      "Para los datos personales que la veterinaria registra en Nildu, la veterinaria es la responsable de la base de datos y Nildu es el encargado que los trata por su cuenta. Esta sección es el acuerdo entre ambas sobre cómo Nildu trata esos datos.",
      {
        lista: [
          "Instrucciones: Nildu trata los datos solo para prestar el servicio, según estos términos y las indicaciones de la veterinaria; el uso que la veterinaria hace del sistema es su instrucción y su responsabilidad.",
          "Consentimiento de los clientes: la veterinaria debe informar a sus clientes y obtener su consentimiento, incluido que sus datos se guardan en Nildu y en sus proveedores, también fuera de Costa Rica, y que pueden recibir correos de citas y comprobantes.",
          "Confidencialidad: el personal de Nildu que accede a los datos debe guardar secreto sobre ellos, aun después de terminar su relación con Nildu.",
          "Seguridad: Nildu aplica las medidas de la sección 3 de la [política de privacidad](/privacidad).",
          `Proveedores: para operar el servicio, Nildu se apoya en proveedores reconocidos y especializados en alojamiento en la nube, red y protección, envío de correos, detección de errores y factura electrónica. Les exige obligaciones de protección de datos equivalentes a las de este acuerdo y responde por ellos.`,
          "Derechos de los clientes: Nildu ayuda a la veterinaria a atender las solicitudes de acceso, rectificación y eliminación de sus clientes. Lo que la veterinaria no pueda hacer desde el sistema, Nildu lo hace a tiempo para que ella pueda responder a sus clientes de acuerdo con lo estipulado en la ley.",
          "Incidentes: si Nildu confirma un incidente que afecte los datos de la veterinaria, se lo avisa sin demora y de acuerdo con lo estipulado en la ley. En el aviso le explica qué pasó, qué datos se vieron afectados y qué medidas está tomando, y la apoya para avisar a sus clientes y a las autoridades que corresponda.",
          "Fin del servicio: al terminar la suscripción, la veterinaria puede descargar sus datos y después Nildu los elimina, de acuerdo con lo estipulado en la ley. Las copias de seguridad se sobrescriben en su ciclo normal.",
          "Ubicación de los datos: los datos se alojan en la nube, en centros de datos fuera de Costa Rica, y los proveedores se comprometen por contrato a protegerlos y a usarlos solo para prestar su servicio.",
        ],
      },
    ],
  },
  {
    titulo: "7. Acceso del soporte de Nildu",
    contenido: [
      "El personal de soporte de Nildu solo accede a la cuenta de la veterinaria a solicitud directa del suscriptor. Cada ingreso y acción queda registrado.",
    ],
  },
  {
    titulo: "8. Factura electrónica",
    contenido: [
      "Para emitir comprobantes electrónicos, la veterinaria ingresa en Nildu su llave criptográfica de Hacienda con su PIN y su usuario y contraseña de Hacienda. Estos datos se usan solo para firmar los comprobantes de la veterinaria y enviarlos a Hacienda.",
      "La veterinaria es responsable de que su información tributaria sea correcta, incluidos los códigos CABYS, las tarifas de IVA y los datos de sus clientes. Nildu no responde por rechazos ni multas de Hacienda causados por datos incorrectos.",
    ],
  },
  {
    titulo: "9. Seguridad de la información",
    contenido: [
      "Nildu protege la información con medidas técnicas y administrativas: conexiones cifradas, cuentas individuales con permisos por rol, bloqueo tras varios intentos fallidos de inicio de sesión, copias de seguridad y registro de accesos. El detalle está en la sección 3 de la [política de privacidad](/privacidad).",
      "El suscriptor y sus usuarios son responsables de su parte: usar contraseñas seguras, dar a cada usuario solo los permisos que necesita, desactivar a quien ya no trabaja con la veterinaria y proteger los equipos desde los que entran a Nildu.",
    ],
  },
  {
    titulo: "10. Uso aceptable",
    contenido: [
      "No puedes usar Nildu para:",
      {
        lista: [
          "actividades ilegales o para registrar datos de personas sin su consentimiento;",
          "enviar correo no deseado;",
          "intentar entrar a la cuenta de otra veterinaria o saltarte los controles de acceso;",
          "hacer pruebas de vulnerabilidad, cargar código malicioso o sobrecargar el servicio sin autorización escrita de Nildu;",
          "copiar, descompilar o revender el software.",
        ],
      },
      `Si encuentras una vulnerabilidad, avísala a ${correoSoporte.es} sin divulgarla ni aprovecharla.`,
    ],
  },
  {
    titulo: "11. Disponibilidad y soporte",
    contenido: [
      "Nildu trabaja para que el servicio esté disponible siempre, pero puede haber interrupciones por mantenimiento o por fallas de sus proveedores. Nildu no garantiza un funcionamiento sin interrupciones y, cuando sea posible, avisará con anticipación los mantenimientos programados.",
      `Para soporte, escribe a ${correoSoporte.es}.`,
    ],
  },
  {
    titulo: "12. Propiedad intelectual",
    contenido: [
      "El software, la marca y el diseño son propiedad de Nildu. La suscripción te da derecho a usar Nildu mientras esté vigente; no te transfiere la propiedad del software.",
      "Si envías sugerencias, Nildu puede usarlas para mejorar el servicio sin obligación de pago.",
    ],
  },
  {
    titulo: "13. Confidencialidad",
    contenido: [
      "Cada parte guardará en reserva la información no pública de la otra que conozca por el servicio y la usará solo para cumplir estos términos. Esta obligación sigue vigente después de terminar el servicio.",
    ],
  },
  {
    titulo: "14. Responsabilidad",
    contenido: [
      "Nildu es una herramienta de registro y administración. Las decisiones clínicas son siempre del profesional veterinario.",
      "En la medida en que la ley lo permita, y salvo dolo o culpa grave, Nildu no responde por daños indirectos, como pérdida de ingresos o de clientes.",
    ],
  },
  {
    titulo: "15. Fuerza mayor",
    contenido: [
      "Nildu no incumple estos términos cuando una falla o un retraso se debe a hechos fuera de su control razonable, como caídas globales de sus proveedores de nube, de red o de correo, desastres naturales, epidemias, guerras, actos de terrorismo o decisiones de autoridades.",
      "En esos casos, el equipo de soporte de Nildu hará lo necesario para dar continuidad al servicio y recuperarlo en un tiempo razonable, tan pronto el proveedor resuelva la falla.",
    ],
  },
  {
    titulo: "16. Cancelación y suspensión",
    contenido: [
      `Puedes cancelar tu suscripción cuando quieras escribiendo a ${correoSoporte.es}. El acceso sigue hasta el final del periodo pagado y no se hacen reembolsos por el tiempo que quede.`,
      "Al terminar, la veterinaria puede descargar sus datos y después Nildu los elimina, según la sección 6. Antes de cancelar, conviene descargar los reportes y los comprobantes electrónicos.",
      "Nildu puede suspender o cerrar una cuenta que incumpla estos términos y, cuando sea posible, lo avisará antes para que la veterinaria corrija el incumplimiento.",
    ],
  },
  {
    titulo: "17. Cambios a estos términos",
    contenido: [
      "Nildu puede actualizar estos términos. La fecha de la última versión aparece al inicio de esta página. Si el cambio es importante, Nildu lo avisará por correo antes de que rija, y si no estás de acuerdo puedes cancelar. Seguir usando Nildu después de que un cambio rija significa que lo aceptas.",
    ],
  },
  {
    titulo: "18. Ley aplicable",
    contenido: [
      "Estos términos se rigen por las leyes de la República de Costa Rica y se interpretan de acuerdo con ellas.",
    ],
  },
  {
    titulo: "19. Notificaciones y contacto",
    contenido: [
      "Nildu envía sus avisos, comunicaciones y notificaciones al correo que el suscriptor tiene registrado en su cuenta. El suscriptor debe mantener ese correo activo y revisarlo con regularidad.",
      `Si tienes preguntas sobre estos términos, escribe a ${C}.`,
    ],
  },
];

const seccionesEn: Seccion[] = [
  {
    titulo: "1. Definitions",
    contenido: [
      {
        lista: [
          "Vet clinic: the individual or legal entity for which Nildu is subscribed.",
          "Subscriber: the person who subscribes to Nildu for their vet clinic. They are responsible for making payments and managing users.",
          "Users: the people the subscriber gives access to the vet clinic's account.",
          "Vet clinic data: the information the vet clinic and its users record in Nildu, including their clients' personal data.",
          "Service: the Nildu software at nildu.app, with its features, updates and support.",
        ],
      },
    ],
  },
  {
    titulo: "2. The service",
    contenido: [
      "Nildu is cloud software for running a veterinary clinic: schedule, medical records, electronic invoicing, inventory, tasks and reports. It is used from the browser, at nildu.app, on devices such as computers, phones or tablets with a compatible operating system and browser:",
      {
        lista: [
          "Operating systems: Windows 11, macOS 26, iOS 26 and Android 16, or later versions.",
          "Browsers: Google Chrome 158, Microsoft Edge 157 and Safari 27, or later versions.",
        ],
      },
      "Nildu works correctly with that configuration. With other systems, browsers or versions it may not work well, and Nildu does not guarantee it.",
      "Nildu may improve, change or remove features. If a change removes something important from the plan you pay for, Nildu will notify you by email beforehand.",
    ],
  },
  {
    titulo: "3. Responsibilities of the subscriber and their users",
    contenido: [
      "The subscriber creates the users for the vet clinic's team and decides what each one can do. Users must be of legal age, and the vet clinic is responsible for what they do in Nildu.",
      "The subscriber and their users agree to:",
      {
        lista: [
          "use Nildu in good faith and only to run the vet clinic;",
          "each use their own account, without sharing it, and keep their password secret; each user is responsible for the information they enter, change or delete;",
          "provide true and complete information, and keep the subscriber's contact details up to date, especially their email and phone;",
          "have the devices, operating system, browser and internet connection required in section 2, and cover their cost;",
          "have the right and consent needed to record or import their clients' data in Nildu, and make sure it is correct: Nildu does not check the accuracy of what is recorded or imported;",
          "keep the records, receipts and other documents required by law or by their professional association, and download them before cancelling;",
          "tell Nildu if the vet clinic's owner or the person who manages the account changes; until they do, Nildu will deal with the registered subscriber.",
        ],
      },
      `If you think someone accessed your account without permission, write to ${correoSoporte.en} immediately.`,
      "Nildu may block access as a precaution if it detects misuse or a security risk, and will notify the subscriber.",
    ],
  },
  {
    titulo: "4. Subscription and payments",
    contenido: [
      "Nildu is paid by monthly or annual subscription, according to the plan and the number of users. Current prices are those published at www.nildu.com or agreed at signup, and include VAT. They are in US dollars. Nildu decides, at its discretion, the payment method each subscriber must use and the currency in which their invoice is issued; if it is invoiced in colones, the Central Bank of Costa Rica's reference selling exchange rate on the invoice date is used.",
      "If prices change, Nildu will notify you before the change applies to your next period. If a payment is overdue, Nildu may suspend access until the subscriber brings the account up to date.",
    ],
  },
  {
    titulo: "5. The vet clinic's data",
    contenido: [
      "The vet clinic's data belongs to the vet clinic. Nildu stores and processes it only to provide the service; it does not sell it, use it for advertising or share it with other vet clinics.",
      "The vet clinic can download its appointment and patient reports in Excel at any time. On request, Nildu provides a copy of its data in a commonly used format.",
    ],
  },
  {
    titulo: "6. Personal data processing agreement",
    contenido: [
      "For the personal data the vet clinic records in Nildu, the vet clinic is the controller of the database and Nildu is the processor that handles it on its behalf. This section is the agreement between them on how Nildu processes that data.",
      {
        lista: [
          "Instructions: Nildu processes the data only to provide the service, according to these terms and the vet clinic's instructions; the vet clinic's use of the system is its instruction and its responsibility.",
          "Clients' consent: the vet clinic must inform its clients and obtain their consent, including that their data is stored in Nildu and with its providers, also outside Costa Rica, and that they may receive appointment emails and receipts.",
          "Confidentiality: Nildu staff who access the data must keep it secret, even after their relationship with Nildu ends.",
          "Security: Nildu applies the measures in section 3 of the [Privacy Policy](/privacidad).",
          `Providers: to run the service, Nildu relies on recognized providers specialized in cloud hosting, network and protection, email delivery, error detection and electronic invoicing. It requires them to meet data protection obligations equivalent to those in this agreement and is responsible for them.`,
          "Clients' rights: Nildu helps the vet clinic handle its clients' access, correction and deletion requests. Anything the vet clinic cannot do from the system, Nildu does in time for the vet clinic to reply to its clients in accordance with the law.",
          "Incidents: if Nildu confirms an incident that affects the vet clinic's data, it notifies the vet clinic without delay and in accordance with the law. The notice explains what happened, which data was affected and what measures Nildu is taking, and Nildu supports the vet clinic in notifying its clients and the relevant authorities.",
          "End of service: when the subscription ends, the vet clinic can download its data, and Nildu then deletes it in accordance with the law. Backups are overwritten in their normal cycle.",
          "Data location: the data is hosted in the cloud, in data centers outside Costa Rica, and providers commit by contract to protect it and use it only to provide their service.",
        ],
      },
    ],
  },
  {
    titulo: "7. Nildu support access",
    contenido: [
      "Nildu support staff only access the vet clinic's account at the subscriber's direct request. Every sign-in and action is logged.",
    ],
  },
  {
    titulo: "8. Electronic invoicing",
    contenido: [
      "To issue electronic receipts, the vet clinic enters in Nildu its Ministry of Finance (Hacienda) cryptographic key with its PIN and its Ministry of Finance username and password. These details are used only to sign the vet clinic's receipts and submit them to the Ministry of Finance.",
      "The vet clinic is responsible for its tax information being correct, including CABYS codes, VAT rates and its clients' details. Nildu is not liable for rejections or fines from the Ministry of Finance caused by incorrect data.",
    ],
  },
  {
    titulo: "9. Information security",
    contenido: [
      "Nildu protects information with technical and administrative measures: encrypted connections, individual accounts with role-based permissions, lockout after several failed sign-in attempts, backups and access logging. The details are in section 3 of the [Privacy Policy](/privacidad).",
      "The subscriber and their users are responsible for their part: using strong passwords, giving each user only the permissions they need, deactivating people who no longer work with the vet clinic and protecting the devices they use to access Nildu.",
    ],
  },
  {
    titulo: "10. Acceptable use",
    contenido: [
      "You may not use Nildu to:",
      {
        lista: [
          "carry out illegal activities or record people's data without their consent;",
          "send spam;",
          "try to access another vet clinic's account or bypass access controls;",
          "run vulnerability tests, upload malicious code or overload the service without Nildu's written permission;",
          "copy, decompile or resell the software.",
        ],
      },
      `If you find a vulnerability, report it to ${correoSoporte.en} without disclosing or exploiting it.`,
    ],
  },
  {
    titulo: "11. Availability and support",
    contenido: [
      "Nildu works to keep the service always available, but there may be interruptions for maintenance or due to failures of its providers. Nildu does not guarantee uninterrupted operation and, when possible, will announce scheduled maintenance in advance.",
      `For support, write to ${correoSoporte.en}.`,
    ],
  },
  {
    titulo: "12. Intellectual property",
    contenido: [
      "The software, brand and design are Nildu's property. The subscription gives you the right to use Nildu while it is active; it does not transfer ownership of the software to you.",
      "If you send suggestions, Nildu may use them to improve the service with no obligation to pay.",
    ],
  },
  {
    titulo: "13. Confidentiality",
    contenido: [
      "Each party will keep confidential the other's non-public information it learns through the service and will use it only to fulfil these terms. This obligation continues after the service ends.",
    ],
  },
  {
    titulo: "14. Liability",
    contenido: [
      "Nildu is a record-keeping and management tool. Clinical decisions are always the veterinary professional's.",
      "To the extent permitted by law, and except in cases of fraud or gross negligence, Nildu is not liable for indirect damages, such as loss of income or clients.",
    ],
  },
  {
    titulo: "15. Force majeure",
    contenido: [
      "Nildu is not in breach of these terms when a failure or delay is caused by events beyond its reasonable control, such as global outages of its cloud, network or email providers, natural disasters, epidemics, wars, acts of terrorism or decisions by authorities.",
      "In those cases, Nildu's support team will do what is needed to keep the service running and restore it within a reasonable time, as soon as the provider resolves the failure.",
    ],
  },
  {
    titulo: "16. Cancellation and suspension",
    contenido: [
      `You can cancel your subscription at any time by writing to ${correoSoporte.en}. Access continues until the end of the paid period, and no refunds are given for the remaining time.`,
      "When the service ends, the vet clinic can download its data, and Nildu then deletes it as described in section 6. Before cancelling, you should download your reports and electronic receipts.",
      "Nildu may suspend or close an account that breaches these terms and, when possible, will warn the vet clinic first so it can fix the breach.",
    ],
  },
  {
    titulo: "17. Changes to these terms",
    contenido: [
      "Nildu may update these terms. The date of the latest version appears at the top of this page. If the change is significant, Nildu will notify you by email before it takes effect, and if you do not agree you can cancel. Continuing to use Nildu after a change takes effect means you accept it.",
    ],
  },
  {
    titulo: "18. Governing law",
    contenido: [
      "These terms are governed by the laws of the Republic of Costa Rica and are interpreted in accordance with them.",
    ],
  },
  {
    titulo: "19. Notices and contact",
    contenido: [
      "Nildu sends its notices, communications and notifications to the email the subscriber has registered in their account. The subscriber must keep that email active and check it regularly.",
      `If you have questions about these terms, write to ${C}.`,
    ],
  },
];

const documento: Record<Lang, Documento> = {
  es: {
    titulo: "Términos del servicio",
    actualizado: "23 de noviembre de 2026",
    intro: [
      "Estos términos regulan el uso de Nildu, el software para veterinarias. Al crear una cuenta o usar Nildu, el suscriptor y sus usuarios aceptan estos términos y sus actualizaciones futuras, que Nildu publicará en esta página.",    ],
    secciones: seccionesEs,
  },
  en: {
    titulo: "Terms of Service",
    actualizado: "November 23, 2026",
    intro: [
      "These terms govern the use of Nildu, the software for veterinary clinics. By creating an account or using Nildu, the subscriber and their users accept these terms and their future updates, which Nildu will publish on this page.",    ],
    secciones: seccionesEn,
  },
};

const Terminos = () => <LegalDocument documento={documento} />;

export default Terminos;

import LegalDocument from "@/components/LegalDocument";
import type { Documento, Seccion } from "@/components/LegalDocument";
import { correoSoporte } from "@/lib/contact";
import type { Lang } from "@/lib/i18n";

// Borrador sin revisión legal (2026-11-23). Antes de publicarlo debe revisarlo un abogado.
// Versión resumida: el acuerdo con cada veterinaria sobre los datos de sus clientes está en la sección 6 de los
// términos. Lo que dice sale del código de Nildu (rama dev) y de la Ley 8968 y su Reglamento 37554-JP; si cambia una
// medida de seguridad, el acceso del soporte o un criterio de conservación, hay que revisar las secciones 3 y 4 y,
// en los términos, las secciones 6, 7, 9 y 16, que dicen lo mismo.
// El texto que vale es el español; la versión en inglés es una traducción de referencia y debe decir lo mismo,
// sección por sección.

const seccionesEs: Seccion[] = [
  {
    titulo: "1. Datos que trata Nildu",
    contenido: [
      "Nildu recopila solo los datos necesarios para prestar el servicio:",
      {
        lista: [
          "Formulario de demo: nombre, apellido, correo, teléfono, país y nombre de la veterinaria.",
          "Cuenta de usuario: nombre, correo, rol y contraseña.",
          "Datos técnicos: dirección IP, navegador, accesos y errores, para proteger y mantener el servicio.",
          "Datos que cada veterinaria registra sobre sus clientes y sus mascotas: contacto de los dueños, historia clínica, citas y facturas.",
        ],
      },
      "Los datos del formulario y de la cuenta son obligatorios: sin ellos Nildu no puede contactarte ni darte acceso.",
    ],
  },
  {
    titulo: "2. Para qué se usan",
    contenido: [
      {
        lista: [
          "Prestar el servicio, dar soporte y controlar el acceso según el rol de cada usuario.",
          "Responder las solicitudes de demo y facturar la suscripción.",
          "Proteger el servicio, investigar incidentes y corregir errores.",
          "Avisar de cambios en el servicio o en esta política.",
          "Enviar, por cuenta de cada veterinaria, los correos de citas y los comprobantes electrónicos, y transmitir los comprobantes a Hacienda.",
        ],
      },
      "Nildu no vende datos personales ni los usa para publicidad de terceros. Solo los comparte con los proveedores que necesita para operar el servicio, como el alojamiento en la nube (también fuera de Costa Rica) y el envío de correos, y con las autoridades cuando la ley lo exija.",
    ],
  },
  {
    titulo: "3. Resguardo de datos",
    contenido: [
      "Nildu protege los datos con medidas técnicas y administrativas: conexiones cifradas, cuentas individuales con permisos por rol, bloqueo tras varios intentos fallidos de inicio de sesión, copias de seguridad y registro de accesos.",
      "El soporte de Nildu solo accede a la cuenta de una veterinaria a solicitud directa del suscriptor. Cada ingreso y acción queda registrado.",
    ],
  },
  {
    titulo: "4. Cuánto tiempo se guardan",
    contenido: [
      "Nildu conserva los datos personales solo mientras sean necesarios para los fines de esta política, según estos criterios:",
      {
        lista: [
          "Cuentas y uso de la plataforma: mientras la cuenta esté activa y la suscripción vigente. Al cerrarse la cuenta, se eliminan o se anonimizan cuando ya no son necesarios.",
          "Datos de los clientes y mascotas de una veterinaria: la veterinaria es la responsable de esta información y Nildu la trata por cuenta de ella y según sus instrucciones. Al cancelarse la suscripción, la veterinaria puede descargarlos y después se eliminan de los sistemas de Nildu.",
          "Copias de seguridad: los datos eliminados pueden seguir en las copias hasta que estas se sobrescriban en su ciclo normal; mientras tanto quedan bloqueados y no se usan.",
          "Facturación y registros contables y fiscales: durante los plazos que exija la legislación vigente, aun después de cerrada la cuenta.",
          "Obligaciones legales y reclamos: si la ley obliga a conservar algún dato, o si es necesario para atender un reclamo, como los registros de seguridad, queda bloqueado hasta que venza el plazo correspondiente.",
        ],
      },
      "Vencidos esos plazos, los datos se eliminan de forma segura o se anonimizan de forma irreversible.",
    ],
  },
  {
    titulo: "5. Eliminación de datos",
    contenido: [
      `Puedes pedir en cualquier momento y sin costo ver, corregir o eliminar tus datos o tu cuenta, o revocar tu consentimiento. Escribe a ${correoSoporte.es} con el asunto «Solicitud de datos personales» e indica:`,
      {
        lista: [
          "Tu nombre completo.",
          "El correo asociado a tu cuenta.",
          "Qué quieres hacer: ver, corregir o eliminar tus datos (toda la cuenta o solo algunos), o revocar tu consentimiento.",
        ],
      },
      "Nildu atenderá tu solicitud sin demora y dentro del plazo que fija la ley vigente. Antes de hacerlo, puede pedirte información para verificar tu identidad.",
      "Al eliminar tu cuenta se borran tus datos de perfil y tus credenciales de acceso. Solo se conserva lo que la ley obliga a guardar o lo necesario para atender reclamos, como la facturación y los registros de seguridad; esa información queda bloqueada y se elimina al vencer su plazo.",
      "Si eres cliente de una veterinaria que usa Nildu, el expediente de tu mascota y tus datos de contacto pertenecen a esa veterinaria, que es la responsable de tratarlos. Dirige tu solicitud directamente a ella; Nildu la ayudará a atenderla dentro del plazo que fija la ley vigente.",
    ],
  },
  {
    titulo: "6. Cambios a esta política",
    contenido: [
      "Nildu puede actualizar esta política; la fecha de la última versión aparece al inicio. Si un cambio es importante, Nildu lo avisará por correo a los clientes activos.",
    ],
  },
];

const seccionesEn: Seccion[] = [
  {
    titulo: "1. Data Nildu processes",
    contenido: [
      "Nildu collects only the data it needs to provide the service:",
      {
        lista: [
          "Demo form: first name, last name, email, phone, country and veterinary clinic name.",
          "User account: name, email, role and password.",
          "Technical data: IP address, browser, access records and errors, to protect and maintain the service.",
          "Data each vet clinic records about its clients and their pets: owners' contact details, medical records, appointments and invoices.",
        ],
      },
      "The demo form and account details are required: without them Nildu cannot contact you or give you access.",
    ],
  },
  {
    titulo: "2. What the data is used for",
    contenido: [
      {
        lista: [
          "Providing the service and support, and controlling access according to each user's role.",
          "Responding to demo requests and billing the subscription.",
          "Protecting the service, investigating incidents and fixing errors.",
          "Notifying you of changes to the service or to this policy.",
          "Sending appointment emails and electronic receipts on behalf of each vet clinic, and submitting receipts to the Ministry of Finance (Hacienda).",
        ],
      },
      "Nildu does not sell personal data or use it for third-party advertising. It shares it only with the providers it needs to run the service, such as cloud hosting (also outside Costa Rica) and email delivery, and with authorities when the law requires it.",
    ],
  },
  {
    titulo: "3. Data safeguarding",
    contenido: [
      "Nildu protects data with technical and administrative measures: encrypted connections, individual accounts with role-based permissions, lockout after several failed sign-in attempts, backups and access logging.",
      "Nildu support only accesses a vet clinic's account at the subscriber's direct request. Every sign-in and action is logged.",
    ],
  },
  {
    titulo: "4. How long the data is kept",
    contenido: [
      "Nildu keeps personal data only as long as it is needed for the purposes of this policy, according to these criteria:",
      {
        lista: [
          "Accounts and platform use: while the account is active and the subscription is in force. When the account is closed, the data is deleted or anonymized once it is no longer needed.",
          "Data about a vet clinic's clients and pets: the vet clinic is responsible for this information, and Nildu processes it on the vet clinic's behalf and following its instructions. When the subscription is cancelled, the vet clinic can download it, and it is then deleted from Nildu's systems.",
          "Backups: deleted data may remain in backups until they are overwritten in their normal cycle; until then it is blocked and not used.",
          "Billing, accounting and tax records: for the periods required by current law, even after the account is closed.",
          "Legal obligations and claims: if the law requires keeping some data, or it is needed to handle a claim, such as security records, it stays blocked until the relevant period ends.",
        ],
      },
      "Once those periods end, the data is securely deleted or irreversibly anonymized.",
    ],
  },
  {
    titulo: "5. Data deletion",
    contenido: [
      `You can ask at any time, free of charge, to see, correct or delete your data or your account, or to withdraw your consent. Write to ${correoSoporte.en} with the subject "Personal data request" and include:`,
      {
        lista: [
          "Your full name.",
          "The email linked to your account.",
          "What you want to do: see, correct or delete your data (the whole account or only some data), or withdraw your consent.",
        ],
      },
      "Nildu will handle your request without delay and within the period set by current law. Before doing so, it may ask for information to verify your identity.",
      "Deleting your account erases your profile data and sign-in credentials. Nildu keeps only what the law requires or what is needed to handle claims, such as billing and security records; that information is blocked and deleted when its period ends.",
      "If you are a client of a veterinary clinic that uses Nildu, your pet's record and your contact details belong to that vet clinic, which is responsible for processing them. Send your request directly to the vet clinic; Nildu will help it respond within the period set by current law.",
    ],
  },
  {
    titulo: "6. Changes to this policy",
    contenido: [
      "Nildu may update this policy; the date of the latest version appears at the top. If a change is significant, Nildu will notify active customers by email.",
    ],
  },
];

const documento: Record<Lang, Documento> = {
  es: {
    titulo: "Política de privacidad",
    actualizado: "23 de noviembre de 2026",
    intro: [
      "Esta política explica qué datos personales trata Nildu en este sitio (www.nildu.com) y en el software Nildu (nildu.app), para qué los usa, con quién los comparte y cómo los protege. Al enviar el formulario de demo o crear tu cuenta, aceptas esta política. Puedes revocar tu consentimiento en cualquier momento.",
    ],
    secciones: seccionesEs,
  },
  en: {
    titulo: "Privacy Policy",
    actualizado: "November 23, 2026",
    intro: [
      "This policy explains what personal data Nildu processes on this website (www.nildu.com) and in the Nildu software (nildu.app), what it uses it for, who it shares it with and how it protects it. By submitting the demo form or creating your account, you accept this policy. You can withdraw your consent at any time.",
    ],
    secciones: seccionesEn,
  },
};

const Privacidad = () => <LegalDocument documento={documento} />;

export default Privacidad;

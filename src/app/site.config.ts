import { formatPrice, Plan, SocialLink, titleCase, whatsappUrl } from '@c-code/c-code-fw/ui';

/** Datos del sitio que usan varias páginas. Cambia aquí teléfonos, horarios o redes. */
export const SITE_URL = 'https://ixoraspabucaramanga.com';
export const SITE_NAME = 'Ixora Spa Bucaramanga';
export const DEFAULT_SEO_IMAGE = '/assets/images/galery/17.webp';

/** Número principal de WhatsApp, con código de país. */
export const WHATSAPP_PHONE = '573209416091';

export const CONTACT = {
  /** Teléfonos visibles; `whatsapp` indica si el número recibe chats. */
  phones: [
    { label: '320 941 6091', value: '573209416091', whatsapp: true },
    { label: '320 936 8933', value: '573209368933', whatsapp: false },
  ],
  email: 'Ixorasparelajacion@gmail.com',
  address: 'Calle 59 # 32-18, Barrio Conucos, Bucaramanga',
  hours: 'Lunes a domingo y festivos, 8:00 a. m. – 9:00 p. m.',
  hoursShort: 'Todos los días · 8 a. m. – 9 p. m.',
  mapsUrl: 'https://maps.google.com/?q=Calle+59+%2332-18,+Bucaramanga,+Santander',
};

export const SOCIAL_LINKS: SocialLink[] = [
  { href: 'https://www.instagram.com/ixoraspabga/', iconSrc: 'assets/icons/ig.png', label: 'Instagram de Ixora Spa' },
  { href: 'https://www.tiktok.com/@ixoraspabga', iconSrc: 'assets/icons/tik-tok.png', label: 'TikTok de Ixora Spa' },
  { href: 'https://www.facebook.com/ixoraspabga/', iconSrc: 'assets/icons/face.png', label: 'Facebook de Ixora Spa' },
];

/** Enlace general de WhatsApp: barra superior, botón flotante y home. */
export const WHATSAPP_URL = whatsappUrl(WHATSAPP_PHONE, 'Hola Ixora Spa. Necesito más información sobre sus planes en Bucaramanga.');

/** WhatsApp con el plan elegido, para que el spa no tenga que preguntar cuál es. */
export function planWhatsappUrl(plan: Plan): string {
  return whatsappUrl(
    WHATSAPP_PHONE,
    `Hola Ixora Spa, quiero reservar el ${titleCase(plan.name)} (${formatPrice(plan.price)}). ¿Qué disponibilidad tienen?`
  );
}


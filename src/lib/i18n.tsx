'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type Lang = 'en' | 'fr' | 'es';

const messages = {
  en: {
    nav_discover: 'Discover',
    nav_experiences: 'Experiences',
    nav_plan: 'Plan a trip',
    nav_blog: 'Blog',
    nav_early: 'Early access',
    nav_partners: 'List your business',
    nav_start: 'Get Started',
    hero_tagline: 'Your journey starts here',
    hero_plan: 'Plan a trip',
    hero_discover: 'Discover places',
    hero_early: 'Get early access',
    modes_title: 'Not just an itinerary app',
    modes_sub:
      'MoroccoMate is your travel companion: discover real spots, book thrills, plan days that actually make sense.',
    mode_plan_title: 'AI Trip Planner',
    mode_plan_text:
      'Build a day-by-day plan with real restaurants, clubs, shops, and adventures. Not vague filler.',
    mode_discover_title: 'Discover places',
    mode_discover_text:
      'Browse cafés, nightlife, souks, and landmarks. Open any spot straight in Google Maps.',
    mode_xp_title: 'Book experiences',
    mode_xp_text:
      'Quad tours, paragliding, balloons, desert camps, hammams. Partner activities you can actually do.',
    open: 'Open',
    real_spots: 'Real spots',
    real_spots_title: 'Restaurants, clubs & shops you can open on Maps',
    browse_all: 'Browse all',
    google_maps: 'Google Maps',
    xp_title: 'Experiences partners can feature',
    xp_sub:
      'Quad bikes, paragliding, balloons, desert camps. The stuff people actually book.',
    see_all_xp: 'See all experiences',
    early_title: 'Get early access',
    early_text:
      'Be first when we launch the full app. Travelers who want Morocco done right.',
    early_cta: 'Join the waitlist',
    partner_title: 'List your business',
    partner_text:
      'Restaurants, clubs, shops, quad tours, parachute / paragliding operators. Get featured to travelers using MoroccoMate.',
    partner_cta: 'Register as a partner',
    footer_line: 'Discover · Experience · Plan. Your Morocco companion',
    follow_us: 'Follow us',
    discover_label: 'Discover',
    discover_title: 'Places worth going',
    discover_sub:
      'Real restaurants, clubs, shops, and landmarks. Open Google Maps for directions, hours, and reviews. We only show names and details. No fake stock photos.',
    filter: 'Filter',
    all: 'All',
    all_cities: 'All cities',
    restaurants: 'Restaurants',
    nightlife: 'Clubs & nightlife',
    shopping: 'Shopping',
    cafes: 'Cafés',
    landmarks: 'Landmarks',
    build_itinerary: 'Build an itinerary',
    want_plan: 'Want these woven into a day plan?',
    xp_page_label: 'Experiences',
    xp_page_title: 'Quads, sky sports, desert nights & more',
    xp_page_sub:
      'Partner-powered activities travelers book. And a place for operators to get featured on MoroccoMate.',
    xp_partner_cta_title: 'Run quads, jumps, tours, spas?',
    xp_partner_cta_text:
      'Register as a partner and get in front of travelers planning trips on MoroccoMate.',
    find_maps: 'Find area on Google Maps',
    early_page_title: 'Early access',
    early_page_sub:
      "Join the waitlist for MoroccoMate. We'll email you when traveler features and the full app open up.",
    early_done_title: 'Choukran bazaf',
    early_done_sub: "That's thank you in Darija ;)",
    back_home: 'Back home',
    name: 'Name',
    email: 'Email',
    city_care: 'City you care about',
    both_cities: 'Both / more cities',
    want_most: 'What do you want most? (optional)',
    join_early: 'Join early access',
    submitting: 'Submitting…',
    partners_page_title: 'List your business',
    partners_page_sub:
      'Get featured on MoroccoMate. Restaurants, clubs, shops, quad tours, paragliding, balloons, desert camps, and more.',
    benefit_1: 'Shown in Discover & Experiences',
    benefit_2: 'Added into AI itineraries',
    benefit_3: 'Google Maps deep-link to your location',
    benefit_4: 'Early partner pricing when we launch',
    partners_done_title: 'Application received',
    partners_done_sub: "We'll review and reach out about featuring your business.",
    see_xp_examples: 'See experience examples',
    contact_name: 'Contact name',
    business_name: 'Business name',
    phone: 'Phone / WhatsApp',
    type: 'Type',
    city_region: 'City / region',
    tell_offer: 'Tell us about your offer',
    register_featured: 'Register to be featured',
  },
  fr: {
    nav_discover: 'Découvrir',
    nav_experiences: 'Expériences',
    nav_plan: 'Planifier',
    nav_blog: 'Blog',
    nav_early: 'Accès anticipé',
    nav_partners: 'Référencer mon activité',
    nav_start: 'Commencer',
    hero_tagline: 'Votre voyage commence ici',
    hero_plan: 'Planifier un voyage',
    hero_discover: 'Découvrir des lieux',
    hero_early: 'Accès anticipé',
    modes_title: 'Pas seulement un itinéraire',
    modes_sub:
      'MoroccoMate est votre compagnon de voyage : lieux réels, expériences, plans de journée qui ont du sens.',
    mode_plan_title: 'Planificateur IA',
    mode_plan_text:
      'Un plan jour par jour avec vrais restos, clubs, boutiques et aventures. Pas du remplissage vague.',
    mode_discover_title: 'Découvrir des lieux',
    mode_discover_text:
      'Cafés, nightlife, souks et monuments. Ouvrez chaque spot directement dans Google Maps.',
    mode_xp_title: 'Réserver des expériences',
    mode_xp_text:
      'Quads, parapente, montgolfières, camps du désert, hammams. Des activités partenaires concrètes.',
    open: 'Ouvrir',
    real_spots: 'Lieux réels',
    real_spots_title: 'Restos, clubs & boutiques à ouvrir sur Maps',
    browse_all: 'Tout voir',
    google_maps: 'Google Maps',
    xp_title: 'Expériences que les partenaires peuvent proposer',
    xp_sub:
      'Quads, parapente, montgolfières, camps du désert. Ce que les gens réservent vraiment.',
    see_all_xp: 'Voir toutes les expériences',
    early_title: 'Accès anticipé',
    early_text:
      'Soyez les premiers au lancement de l’app. Pour voyager au Maroc autrement.',
    early_cta: 'Rejoindre la liste',
    partner_title: 'Référencer mon activité',
    partner_text:
      'Restos, clubs, boutiques, quads, parapente. Soyez mis en avant auprès des voyageurs MoroccoMate.',
    partner_cta: 'S’inscrire comme partenaire',
    footer_line: 'Découvrir · Expériences · Planifier. Votre compagnon Maroc',
    follow_us: 'Suivez-nous',
    discover_label: 'Découvrir',
    discover_title: 'Des lieux qui valent le détour',
    discover_sub:
      'Vrais restos, clubs, boutiques et monuments. Google Maps pour les horaires et avis. Pas de fausses photos stock.',
    filter: 'Filtrer',
    all: 'Tout',
    all_cities: 'Toutes les villes',
    restaurants: 'Restaurants',
    nightlife: 'Clubs & nightlife',
    shopping: 'Shopping',
    cafes: 'Cafés',
    landmarks: 'Monuments',
    build_itinerary: 'Créer un itinéraire',
    want_plan: 'Envie de les intégrer dans un plan ?',
    xp_page_label: 'Expériences',
    xp_page_title: 'Quads, sports aériens, nuits dans le désert…',
    xp_page_sub:
      'Des activités partenaires que les voyageurs réservent. Et un espace pour les opérateurs.',
    xp_partner_cta_title: 'Vous proposez quads, vols, tours, spas ?',
    xp_partner_cta_text:
      'Inscrivez-vous comme partenaire et apparaissez face aux voyageurs qui planifient.',
    find_maps: 'Voir la zone sur Google Maps',
    early_page_title: 'Accès anticipé',
    early_page_sub:
      'Rejoignez la liste d’attente MoroccoMate. On vous écrira à l’ouverture.',
    early_done_title: 'Choukran bazaf',
    early_done_sub: "That's thank you in Darija ;)",
    back_home: 'Retour à l’accueil',
    name: 'Nom',
    email: 'E-mail',
    city_care: 'Ville qui vous intéresse',
    both_cities: 'Les deux / plus de villes',
    want_most: 'Ce que vous voulez le plus (optionnel)',
    join_early: 'Rejoindre l’accès anticipé',
    submitting: 'Envoi…',
    partners_page_title: 'Référencer mon activité',
    partners_page_sub:
      'Apparaissez sur MoroccoMate. Restos, clubs, boutiques, quads, parapente, montgolfières, camps…',
    benefit_1: 'Visible dans Découvrir & Expériences',
    benefit_2: 'Intégré aux itinéraires IA',
    benefit_3: 'Lien Google Maps vers votre lieu',
    benefit_4: 'Tarifs partenaires au lancement',
    partners_done_title: 'Demande reçue',
    partners_done_sub: 'Nous examinons et vous recontactons.',
    see_xp_examples: 'Voir des exemples d’expériences',
    contact_name: 'Nom du contact',
    business_name: 'Nom de l’activité',
    phone: 'Téléphone / WhatsApp',
    type: 'Type',
    city_region: 'Ville / région',
    tell_offer: 'Décrivez votre offre',
    register_featured: 'Demander à être mis en avant',
  },
  es: {
    nav_discover: 'Descubrir',
    nav_experiences: 'Experiencias',
    nav_plan: 'Planificar',
    nav_blog: 'Blog',
    nav_early: 'Acceso anticipado',
    nav_partners: 'Registrar mi negocio',
    nav_start: 'Empezar',
    hero_tagline: 'Tu viaje empieza aquí',
    hero_plan: 'Planificar un viaje',
    hero_discover: 'Descubrir lugares',
    hero_early: 'Acceso anticipado',
    modes_title: 'No solo un itinerario',
    modes_sub:
      'MoroccoMate es tu compañero de viaje: lugares reales, experiencias y planes que tienen sentido.',
    mode_plan_title: 'Planificador IA',
    mode_plan_text:
      'Un plan día a día con restaurantes, clubs, tiendas y aventuras reales. Sin relleno vacío.',
    mode_discover_title: 'Descubrir lugares',
    mode_discover_text:
      'Cafés, nightlife, zocos y monumentos. Abre cada sitio en Google Maps.',
    mode_xp_title: 'Reservar experiencias',
    mode_xp_text:
      'Quads, parapente, globos, campamentos del desierto, hammams. Actividades de partners.',
    open: 'Abrir',
    real_spots: 'Lugares reales',
    real_spots_title: 'Restos, clubs y tiendas para abrir en Maps',
    browse_all: 'Ver todos',
    google_maps: 'Google Maps',
    xp_title: 'Experiencias que los partners pueden destacar',
    xp_sub:
      'Quads, parapente, globos, desierto. Lo que la gente reserva de verdad.',
    see_all_xp: 'Ver todas las experiencias',
    early_title: 'Acceso anticipado',
    early_text:
      'Sé de los primeros al lanzar la app. Viajeros que quieren Marruecos bien hecho.',
    early_cta: 'Unirme a la lista',
    partner_title: 'Registrar mi negocio',
    partner_text:
      'Restaurantes, clubs, tiendas, quads, parapente. Aparece ante viajeros de MoroccoMate.',
    partner_cta: 'Registrarme como partner',
    footer_line: 'Descubrir · Experiencias · Planificar. Tu compañero en Marruecos',
    follow_us: 'Síguenos',
    discover_label: 'Descubrir',
    discover_title: 'Lugares que merecen la pena',
    discover_sub:
      'Restaurantes, clubs, tiendas y monumentos reales. Google Maps para horarios y reseñas. Sin fotos de stock falsas.',
    filter: 'Filtrar',
    all: 'Todo',
    all_cities: 'Todas las ciudades',
    restaurants: 'Restaurantes',
    nightlife: 'Clubs y nightlife',
    shopping: 'Compras',
    cafes: 'Cafés',
    landmarks: 'Monumentos',
    build_itinerary: 'Crear un itinerario',
    want_plan: '¿Quieres meterlos en un plan?',
    xp_page_label: 'Experiencias',
    xp_page_title: 'Quads, deportes aéreos, noches en el desierto…',
    xp_page_sub:
      'Actividades de partners que los viajeros reservan. Y un espacio para operadores.',
    xp_partner_cta_title: '¿Haces quads, saltos, tours, spas?',
    xp_partner_cta_text:
      'Regístrate como partner y llega a viajeros que están planificando.',
    find_maps: 'Ver zona en Google Maps',
    early_page_title: 'Acceso anticipado',
    early_page_sub:
      'Únete a la lista de MoroccoMate. Te escribiremos cuando abramos.',
    early_done_title: 'Choukran bazaf',
    early_done_sub: "That's thank you in Darija ;)",
    back_home: 'Volver al inicio',
    name: 'Nombre',
    email: 'Email',
    city_care: 'Ciudad que te interesa',
    both_cities: 'Ambas / más ciudades',
    want_most: '¿Qué quieres más? (opcional)',
    join_early: 'Unirme al acceso anticipado',
    submitting: 'Enviando…',
    partners_page_title: 'Registrar mi negocio',
    partners_page_sub:
      'Aparece en MoroccoMate. Restos, clubs, tiendas, quads, parapente, globos, campamentos…',
    benefit_1: 'Visible en Descubrir y Experiencias',
    benefit_2: 'Incluido en itinerarios IA',
    benefit_3: 'Enlace de Google Maps a tu ubicación',
    benefit_4: 'Precio partner al lanzamiento',
    partners_done_title: 'Solicitud recibida',
    partners_done_sub: 'Revisaremos y te contactaremos.',
    see_xp_examples: 'Ver ejemplos de experiencias',
    contact_name: 'Nombre de contacto',
    business_name: 'Nombre del negocio',
    phone: 'Teléfono / WhatsApp',
    type: 'Tipo',
    city_region: 'Ciudad / región',
    tell_offer: 'Cuéntanos tu oferta',
    register_featured: 'Solicitar aparecer',
  },
} as const;

export type MessageKey = keyof typeof messages.en;

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: MessageKey) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const saved = localStorage.getItem('mm_lang') as Lang | null;
    if (saved && (saved === 'en' || saved === 'fr' || saved === 'es')) {
      setLangState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    localStorage.setItem('mm_lang', next);
    document.documentElement.lang = next;
  }, []);

  const t = useCallback(
    (key: MessageKey) => messages[lang][key] ?? messages.en[key] ?? key,
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider');
  return ctx;
}

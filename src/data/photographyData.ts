import { ShootPackage, PortfolioItem, Review, AvailableDay, Booking, CalendarSettings, LoveStoryItem } from '../types';
import heroImg from '../assets/images/hero_golden_hour_1789723084074.jpg';
import maternityImg from '../assets/images/maternity_sunset_1789723099413.jpg';
import newbornImg from '../assets/images/newborn_pure_1789723113106.jpg';
import coupleImg from '../assets/images/couple_golden_sunset_1789723141224.jpg';
import portraitImg from '../assets/images/photographer_portrait_1789723124705.jpg';

// Nikki's actual photography assets
import coupleMeadowImg from '../assets/images/couple_meadow_sunset_1790850013841.jpeg';
import maternityDunesImg from '../assets/images/maternity_dunes_bump_1790850026527.jpeg';
import motherToddlerImg from '../assets/images/mother_toddler_studio_1790850037968.jpeg';
import newbornHandsImg from '../assets/images/newborn_peaceful_hands_1790850047140.jpeg';
import brandingDunesImg from '../assets/images/branding_dunes_dress_1790850055961.jpg';
import clientClosetDunesWalkImg from '../assets/images/client_closet_dunes_walk_1790858799287.jpg';
import coupleBannerImg from '../assets/images/couple_meadow_banner_1790850066606.jpg';
import maternityStudioImg from '../assets/images/maternity_studio_brown_1790850087474.jpeg';
import kinderPortretGoldenImg from '../assets/images/kinder_portret_golden_laugh_1790858833245.jpg';

export const PHOTOGRAPHER_INFO: CalendarSettings = {
  photographerName: 'Nikki | Golden Light Stories Fotografie',
  email: 'info@goldenlightstories.nl',
  phone: '+31 6 12 34 56 78',
  instagramUrl: 'https://www.instagram.com/goldenls_photography/',
  facebookUrl: 'https://www.facebook.com/mylooksbyn',
  city: 'Landgraaf',
  travelRadius: 'Gevestigd in Landgraaf, Werkzaam in Limburg, NL',
  externalCalendarUrl: '',
  autoConfirmBookings: true,
  defaultDepositAmount: 50,
};

export const PACKAGES: ShootPackage[] = [
  {
    id: 'gezin-shoot',
    title: 'Gezinsshoot',
    category: 'gezin',
    price: '€ 175,-',
    deposit: '€ 50,-',
    subtitle: 'Ongedwongen rennen, knuffelen en plezier maken in zacht natuurlijk licht',
    duration: '60 tot 75 minuten',
    description: 'Geen stijve poses of geforceerde glimlachen. We maken een ontspannen wandeling door de natuur. Ik vang de liefdevolle blikken, de kleine handjes en de pure interactie tussen jullie.',
    inclusions: [
      'Inclusief 15 zorgvuldig bewerkte beelden in hoge resolutie',
      'Persoonlijk stylingadvies vooraf + toegang tot de Client Closet',
      'Keuze uit prachtige locaties in overleg',
      'Eigen beveiligde online keuzegalerij binnen 2 weken',
      'Inclusief tot 5 personen (extra personen € 15,- p.p.)',
      'Aanbetaling € 50,- bij boeking, restbedrag (€ 125,-) pas na de shoot',
    ],
    recommendedTime: 'Zacht natuurlijk avondlicht',
    isPopular: true,
  },
  {
    id: 'zwangerschap-wonder',
    title: 'Pregnancy',
    category: 'zwangerschap',
    price: '€ 175,-',
    deposit: '€ 50,-',
    subtitle: 'Vier de magie van jouw groeiende buik en dit bijzondere begin',
    duration: '60 minuten',
    description: 'Jouw lichaam dat een nieuw wonder draagt verdient het om voor altijd gekoesterd te worden. We fotograferen op een dromerige buitenlocatie of een intieme binnenlocatie met natuurlijk licht.',
    inclusions: [
      'Inclusief 15 artistiek nabewerkte foto’s in hoge resolutie',
      'Vrij gebruik van luxe zwangerschapsjurken uit de Client Closet',
      'Je partner en eventuele kindjes zijn van harte welkom om mee te doen',
      'Gedetailleerde styling- en kledinggids vooraf',
      'Aanbetaling € 50,- bij boeking, restbedrag (€ 125,-) pas na de shoot',
    ],
    recommendedTime: 'Rond 30 - 35 weken zwangerschap in warm avondlicht',
    isPopular: false,
  },
  {
    id: 'newborn-pure',
    title: 'Newborn',
    category: 'newborn',
    price: '€ 195,-',
    deposit: '€ 50,-',
    subtitle: 'De allereerste magische dagen in de geborgenheid van jullie gezin',
    duration: '90 tot 120 minuten (in alle rust met voeding en knuffels)',
    description: 'Heerlijk in de geborgenheid van jullie eigen huis of in de natuur. Geen geposeerde baby’s in mandjes, maar echte, pure momenten: die mini teentjes, geeuwen en de tederheid van kersverse ouders.',
    inclusions: [
      'Inclusief 20 liefdevol bewerkte beelden in hoge resolutie',
      'Alle tijd en rust voor voedingen, troosten en verschonen',
      'Gebruik van zachte gebreide dekentjes, wikkeldoeken en neutrale rompertjes',
      'Foto’s van de baby alleen én intieme beelden met ouders en broertjes/zusjes',
      'Aanbetaling € 50,- bij boeking, restbedrag (€ 145,-) pas na de shoot',
    ],
    recommendedTime: 'In de eerste 1 tot 6 weken na de geboorte (ochtendlicht)',
    isPopular: false,
  },
  {
    id: 'kinder-portret',
    title: 'Kinder Portret',
    category: 'gezin',
    price: '€ 145,-',
    deposit: '€ 50,-',
    subtitle: 'Tijdloze, onbezorgde portretten vol verwondering en kinderlijke magie',
    duration: '45 minuten',
    description: 'Geen stijve poses voor een wit scherm, maar lekker kind zijn in de natuur. Vrolijke, pure kinderportretten die hun unieke karakter en ondeugende lachjes vereeuwigen in warm zonlicht.',
    inclusions: [
      'Inclusief 12 zorgvuldig bewerkte beelden in hoge resolutie',
      'Persoonlijk advies + gebruik van neutrale outfits uit de Client Closet',
      'Locatie in overleg',
      'Aanbetaling € 50,- bij boeking, restbedrag (€ 95,-) pas na de shoot',
    ],
    recommendedTime: 'Ochtendzon of zacht namiddaglicht',
    isPopular: false,
  },
  {
    id: 'cake-smash-feest',
    title: 'Cakesmash',
    category: 'gezin',
    price: '€ 165,-',
    deposit: '€ 50,-',
    subtitle: 'Vier de allereerste verjaardag met taart, plezier en mooie herinneringen',
    duration: '45 tot 60 minuten',
    description: 'Een mijlpaal om nooit te vergeten! We starten met mooie tijdloze portretjes vooraf, waarna je kleintje heerlijk mag smullen, kliederen en ontdekken met de taart in een rustieke, natuurlijke setting.',
    inclusions: [
      'Inclusief 15 zorgvuldig bewerkte beelden in hoge resolutie',
      'Tijdloze natuurlijke styling (houten details, neutrale slingers & ballonnen)',
      'Portretfoto’s van het kindje vooraf én smulfoto’s met de cake',
      'Aanbetaling € 50,- bij boeking, restbedrag (€ 115,-) pas na de shoot',
    ],
    recommendedTime: 'Ochtend of vroege middag (afgestemd op slaapjes)',
    isPopular: false,
  },
  {
    id: 'branding-ondernemer',
    title: 'Personal Branding & Beeldbank',
    category: 'branding',
    price: '€ 225,-',
    deposit: '€ 50,-',
    subtitle: 'Professionele, warme en authentieke beelden voor jouw bedrijf',
    duration: '75 tot 90 minuten',
    description: 'Laat het gezicht achter jouw merk zien. Geen kille zakelijke foto’s, maar warme, spontane en krachtige beelden die jouw ideale klanten direct aanspreken op je website en Instagram.',
    inclusions: [
      'Inclusief 20 commercieel bruikbare beelden in hoge resolutie',
      'Voorbespreking over jouw merkidentiteit, doelgroep en stijl',
      'Mogelijkheid tot outfitwissel (2 tot 3 outfits)',
      'Aanbetaling € 50,- bij boeking, restbedrag (€ 175,-) pas na de shoot',
    ],
    recommendedTime: 'Natuurlijk ochtend- of namiddaglicht',
    isPopular: false,
  },
];

// Curated 6 Golden Stories matching the brochure themes: newborn, cakesmash, branding, pregnancy, gezinsshoot, kinder portret
export const GOLDEN_STORIES: LoveStoryItem[] = [
  {
    id: 'story-newborn',
    title: 'NEWBORN',
    country: 'PUUR & INTIEM',
    coverImage: newbornHandsImg,
    galleryImages: [
      newbornHandsImg,
      newbornImg,
    ],
    description: 'De allereerste magische dagen in alle rust vastgelegd. Geen geforceerde poses, maar pure teentjes, geeuwen en de geborgenheid van jullie gezin.',
  },
  {
    id: 'story-cakesmash',
    title: 'CAKESMASH',
    country: 'EERSTE VERJAARDAG',
    coverImage: '',
    galleryImages: [],
    isComingSoon: true,
    description: 'Vier de allereerste verjaardag met een prachtige natuurlijke taart en volop kliederplezier in een warme setting.',
  },
  {
    id: 'story-branding',
    title: 'BRANDING',
    country: 'ONDERNEMERS & BEELDBANK',
    coverImage: brandingDunesImg,
    galleryImages: [
      brandingDunesImg,
      clientClosetDunesWalkImg,
      maternityStudioImg,
    ],
    description: 'Warme, authentieke en krachtige beelden voor zelfstandige ondernemers en creatieve merken die het échte gezicht achter het bedrijf laten zien.',
  },
  {
    id: 'story-pregnancy',
    title: 'PREGNANCY',
    country: 'ZWANGERSCHAP & VERWACHTING',
    coverImage: maternityDunesImg,
    galleryImages: [
      maternityDunesImg,
      maternityStudioImg,
      maternityImg,
    ],
    description: 'De magie van jouw groeiende buik tijdens het zachte gouden avonduur. Inclusief gratis gebruik van onze luxe zwangerschapsjurken.',
  },
  {
    id: 'story-gezin',
    title: 'GEZINSSHOOT',
    country: 'PUUR & ONGEDWONGEN',
    coverImage: coupleMeadowImg,
    galleryImages: [
      coupleMeadowImg,
      coupleBannerImg,
      heroImg,
    ],
    description: 'Ongedwongen rennen, knuffelen en plezier maken in de natuur. Echte connectie en oprechte lachjes van het hele gezin.',
  },
  {
    id: 'story-kinderportret',
    title: 'KINDER PORTRET',
    country: 'ONBEZORGD & PUUR',
    coverImage: motherToddlerImg,
    galleryImages: [
      motherToddlerImg,
      kinderPortretGoldenImg,
    ],
    description: 'Tijdloze, pure kinderportretten vol verwondering, ontdekking en ondeugende lachjes. Zonder stijve poses, maar gewoon lekker kind zijn in het mooiste gouden licht.',
  },
];

// Alias for backwards compatibility
export const LOVE_STORIES = GOLDEN_STORIES;

// Curated portfolio items combining generated assets and warm photography
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'Gouden uur in de duinen',
    category: 'zwangerschap',
    imageUrl: maternityDunesImg,
    location: 'Brunssummerheide / Duinen',
    description: 'De magie van nieuw leven gekoesterd in warm strijklicht.',
  },
  {
    id: 'port-2',
    title: 'Zomers geluk in de weide',
    category: 'koppels',
    imageUrl: coupleMeadowImg,
    location: 'Limburgs heuvellandschap',
    description: 'Wandeling in warm natuurlijk licht vol tederheid en spontane humor.',
  },
  {
    id: 'port-3',
    title: 'Teder in vaders handen',
    category: 'newborn',
    imageUrl: newbornHandsImg,
    location: 'Rustig bij het gezin thuis',
    description: 'Kleine Luuk, vredig slapend in de geborgenheid van sterke handen.',
  },
  {
    id: 'port-4',
    title: 'Eskimokus & schaterlach',
    category: 'gezin',
    imageUrl: motherToddlerImg,
    location: 'Studio / Natuurlijk licht',
    description: 'Onbetaalbare tederheid tussen mama en haar kleine meid.',
  },
  {
    id: 'port-5',
    title: 'Zwierige zandtinten',
    category: 'branding',
    imageUrl: brandingDunesImg,
    location: 'Brunssummerheide zandvlakte',
    description: 'Luxe jurk uit de Client Closet die danst in de zachte avondwind.',
  },
  {
    id: 'port-6',
    title: 'Serene studio verwachting',
    category: 'zwangerschap',
    imageUrl: maternityStudioImg,
    location: 'Lichtrijke studio setting',
    description: 'Tijdloos esthetisch portret van een groeiend wonder in chocoladebruin tricot.',
  },
  {
    id: 'port-7',
    title: 'Dromen in het gras',
    category: 'koppels',
    imageUrl: coupleBannerImg,
    location: 'Bloeiende weide',
    description: 'Samen ontspannen in het zachtste gouden licht van de dag.',
  },
  {
    id: 'port-8',
    title: 'Moederliefde & tederheid',
    category: 'gezin',
    imageUrl: motherToddlerImg,
    location: 'Lichtrijke studio setting',
    description: 'Onvoorwaardelijke liefde, zachtheid en pure knuffels.',
  },
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'S. & M.',
    shootType: 'Gezinsshoot',
    location: '',
    rating: 5,
    text: 'Wat een magische ervaring! Normaal vindt mijn partner shoots verschrikkelijk ongemakkelijk, maar door de ontspannen en warme sfeer van Nikki vergaten we de camera al na vijf minuten. De beelden hangen nu groot in onze woonkamer en we krijgen er zóveel complimenten over.',
    date: 'Augustus 2026',
  },
  {
    id: 'rev-2',
    author: 'Chayenne',
    shootType: 'Zwangerschapsshoot',
    location: '',
    rating: 5,
    text: 'De jurk uit de Client Closet zat als gegoten en het gouden licht op de foto’s is adembenemend. Ik voelde me zó mooi en ontspannen. Het is een van de dierbaarste herinneringen aan mijn zwangerschap.',
    date: 'Juli 2026',
  },
  {
    id: 'rev-3',
    author: 'Familie Van Dijk',
    shootType: 'Gezinsshoot',
    location: '',
    rating: 5,
    text: 'Wat hebben we een geweldige middag gehad met Nikki! Onze kinderen mochten lekker zichzelf zijn, rennen en plezier maken in de natuur. Nikki ving de spontane knuffels en echte connectie zó puur in het zachte gouden licht. Een onbetaalbare herinnering voor ons hele gezin!',
    date: 'Recent',
  },
];

// Initial available dates for October 2026
export const INITIAL_AVAILABLE_DAYS: AvailableDay[] = [
  {
    date: '2026-10-03',
    slots: [
      { id: 'slot-1001', time: '10:00 - 11:30', type: 'morning', label: 'Newborn' },
      { id: 'slot-1002', time: '16:00 - 17:15', type: 'evening', label: 'Gezin' },
    ],
  },
  {
    date: '2026-10-06',
    slots: [
      { id: 'slot-1003', time: '16:30 - 17:45', type: 'evening', label: 'Pregnancy' },
    ],
  },
  {
    date: '2026-10-09',
    slots: [
      { id: 'slot-1004', time: '14:00 - 15:15', type: 'evening', label: 'Kinder Portret' },
      { id: 'slot-1005', time: '16:00 - 17:15', type: 'evening', label: 'Gezin' },
    ],
  },
  {
    date: '2026-10-11',
    slots: [
      { id: 'slot-1006', time: '11:00 - 12:15', type: 'morning', label: 'Cakesmash' },
      { id: 'slot-1007', time: '16:00 - 17:15', type: 'evening', label: 'Gezin' },
    ],
  },
  {
    date: '2026-10-14',
    slots: [
      { id: 'slot-1008', time: '16:30 - 17:45', type: 'evening', label: 'Pregnancy' },
    ],
  },
  {
    date: '2026-10-17',
    slots: [
      { id: 'slot-1009', time: '10:00 - 11:30', type: 'morning', label: 'Newborn' },
      { id: 'slot-1010', time: '16:00 - 17:15', type: 'evening', label: 'Gezin' },
    ],
  },
  {
    date: '2026-10-21',
    slots: [
      { id: 'slot-1011', time: '14:00 - 15:15', type: 'evening', label: 'Kinder Portret' },
    ],
  },
  {
    date: '2026-10-24',
    slots: [
      { id: 'slot-1012', time: '11:00 - 12:15', type: 'morning', label: 'Cakesmash' },
      { id: 'slot-1013', time: '16:00 - 17:15', type: 'evening', label: 'Gezin' },
    ],
  },
  {
    date: '2026-10-28',
    slots: [
      { id: 'slot-1014', time: '16:30 - 17:45', type: 'evening', label: 'Pregnancy' },
    ],
  },
  {
    date: '2026-10-31',
    slots: [
      { id: 'slot-1015', time: '10:00 - 11:30', type: 'morning', label: 'Newborn' },
      { id: 'slot-1016', time: '16:00 - 17:15', type: 'evening', label: 'Gezin' },
    ],
  },
];

// Sample initial bookings for October 2026
export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-101',
    packageId: 'gezin-shoot',
    packageName: 'Gezin',
    date: '2026-10-03',
    timeSlotId: 'slot-1002',
    timeSlotLabel: 'Gezin',
    timeSlotTime: '16:00 - 17:15',
    clientName: 'Reservering',
    clientEmail: 'reservering@example.nl',
    clientPhone: '',
    groupSize: '',
    preferredLocation: '',
    message: '',
    createdAt: '2026-10-01T08:00:00Z',
    status: 'bevestigd',
    notes: '',
  },
];

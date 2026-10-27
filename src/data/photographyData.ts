import { ShootPackage, PortfolioItem, Review, AvailableDay, Booking, CalendarSettings, LoveStoryItem } from '../types';
import heroImg from '../assets/images/hero_golden_hour_1789723084074.jpeg';
import maternityImg from '../assets/images/maternity_sunset_1789723099413.jpg';
import newbornImg from '../assets/images/newborn_pure_1789723113106.jpg';
import portraitImg from '../assets/images/photographer_portrait_1789723124705.jpg';

// Nikki's actual photography assets
import coupleMeadowImg from '../assets/images/couple_meadow_sunset_1790850013841.jpeg';
import maternityDunesImg from '../assets/images/maternity_dunes_bump_1790850026527.jpeg';
import motherToddlerImg from '../assets/images/mother_toddler_studio_1790850037968.jpeg';
import newbornHandsImg from '../assets/images/newborn_peaceful_hands_1790850047140.jpeg';
import brandingDunesImg from '../assets/images/branding_dunes_dress_1790850055961.jpg';
import clientClosetDunesWalkImg from '../assets/images/client_closet_dunes_walk_1790858799287.jpg';
import coupleBannerImg from '../assets/images/couple_meadow_banner_1790850066606.jpeg';
import maternityStudioImg from '../assets/images/maternity_studio_brown_1790850087474.jpeg';
import kinderPortretLaughImg from '../assets/images/kinder_portret_golden_laugh_1790858833245.jpeg';

// Kinderportret additions (3 photos)
import kinderPortretMeadowImg from '../assets/images/kinder_portret_meadow_1792015860690.jpeg';
import kinderPortretForestImg from '../assets/images/kinder_portret_forest_1792015860942.jpeg';
import kinderPortretLaughterImg from '../assets/images/kinder_portret_laughter_1792015861025.jpeg';

// Gezinsshoot additions (3 photos)
import gezinStrandImg from '../assets/images/gezin_strand_zonsondergang_1792015879300.jpeg';
import gezinKnuffelImg from '../assets/images/gezin_knuffel_weide_1792015879289.jpeg';
import gezinVaderKindImg from '../assets/images/gezin_vader_kind_1792015879871.jpeg';

// Newborn additions (3 photos)
import newbornSlapendImg from '../assets/images/newborn_slapend_deken_1792015903947.jpeg';
import newbornMoederImg from '../assets/images/newborn_moeder_omhelzing_1792015905861.jpeg';
import newbornVoetjesImg from '../assets/images/newborn_details_voetjes_1792015905240.jpeg';

// Pregnant additions (4 photos)
import pregnantDuinenJurkImg from '../assets/images/pregnant_duinen_jurk_1792015935714.jpeg';
import pregnantKoppelImg from '../assets/images/pregnant_koppel_zonsondergang_1792015935625.jpeg';
import pregnantStudioVensterImg from '../assets/images/pregnant_studio_venster_1792015935729.jpeg';
import pregnantBloemenweideImg from '../assets/images/pregnant_bloemenweide_1792015969115.jpeg';

// Branding additions (3 photos)
import brandingStudioCafeImg from '../assets/images/branding_studio_cafe_1792016006207.jpeg';
import brandingBuitenWerkImg from '../assets/images/branding_buiten_werk_1792016005870.jpeg';
import brandingCreatiefPortretImg from '../assets/images/branding_creatief_portret_1792016005433.jpeg';

export const PHOTOGRAPHER_INFO: CalendarSettings = {
  photographerName: 'Nikki | Golden Light Stories Fotografie',
  email: 'goldenlsphotography@gmail.com',
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
    id: 'pakket-1',
    title: 'Pakket 1',
    category: 'gezin',
    price: '€ 195,- excl. studio',
    deposit: '€ 50,-',
    subtitle: 'Een mooie, compacte fotosessie voor kleine gezelschappen (1 tot 4 personen)',
    duration: '45 tot 60 minuten',
    description: 'Een mooie, compacte fotosessie voor kleine gezelschappen. Dit pakket is geschikt voor 1 tot 4 personen en levert 12 zorgvuldig bewerkte beelden op. Ideaal voor bijvoorbeeld een gezinsshoot of portretserie. Kom je met meer personen? Dat kan, voor €15 per extra persoon. Voor een meerprijs van 75 euro kan studio Vita worden bij geboekt.',
    inclusions: [
      'Inclusief 12 zorgvuldig bewerkte beelden in hoge resolutie',
      'Geschikt voor 1 tot 4 personen',
      'Kom je met meer personen? Voor € 15,- per extra persoon',
      'Optie: Voor een meerprijs van € 75,- kan studio Vita worden bijgeboekt',
      'Foto’s bijbestellen: € 10,- p.s. • € 45,- voor 5 foto’s • € 85,- voor 10 foto’s',
      'Aanbetaling € 50,- bij boeking',
    ],
    recommendedTime: 'Zacht natuurlijk daglicht of gouden uurtje',
    isPopular: false,
  },
  {
    id: 'pakket-2',
    title: 'Pakket 2',
    category: 'gezin',
    price: '€ 245,- excl. studio',
    deposit: '€ 50,-',
    subtitle: 'Meer ruimte, meer variatie voor gezinnen of vriendengroepen (1 tot 6 personen)',
    duration: '60 tot 75 minuten',
    description: 'Meer ruimte, meer variatie. Met dit pakket kun je met 1 tot 6 personen terecht en ontvang je 20 professioneel bewerkte foto’s. Perfect voor gezinnen of vriendengroepen die nét wat meer keuze willen uit hun beelden. Optie om studio Vita bij te boeken voor € 75,- meerprijs.',
    inclusions: [
      'Inclusief 20 professioneel bewerkte foto’s in hoge resolutie',
      'Geschikt voor 1 tot 6 personen',
      'Ideaal voor gezinnen of vriendengroepen met extra variatie',
      'Optie: Voor een meerprijs van € 75,- kan studio Vita worden bijgeboekt',
      'Foto’s bijbestellen: € 10,- p.s. • € 45,- voor 5 foto’s • € 85,- voor 10 foto’s',
      'Aanbetaling € 50,- bij boeking',
    ],
    recommendedTime: 'Warm ochtend- of namiddaglicht',
    isPopular: true,
  },
  {
    id: 'pakket-3',
    title: 'Pakket 3',
    category: 'gezin',
    price: '€ 375,- excl. studio',
    deposit: '€ 50,-',
    subtitle: 'Voor wie écht wil uitpakken en een compleet beeldverhaal wil laten vastleggen',
    duration: '90 minuten',
    description: 'Voor wie écht wil uitpakken. Dit uitgebreide pakket biedt ruimte voor 1 tot 6 personen en levert maar liefst 35-45 bewerkte beelden op. Ideaal voor bijzondere momenten, grotere shoots of wanneer je een compleet verhaal wilt laten vastleggen. Voor een meerprijs van 75 euro kan studio Vita worden bij geboekt.',
    inclusions: [
      'Maar liefst 35 tot 45 bewerkte beelden in hoge resolutie',
      'Geschikt voor 1 tot 6 personen',
      'Compleet en uitgebreid herinneringsverhaal met alle rust',
      'Optie: Voor een meerprijs van € 75,- kan studio Vita worden bijgeboekt',
      'Foto’s bijbestellen: € 10,- p.s. • € 45,- voor 5 foto’s • € 85,- voor 10 foto’s',
      'Aanbetaling € 50,- bij boeking',
    ],
    recommendedTime: 'Zacht natuurlijk strijklicht',
    isPopular: false,
  },
  {
    id: 'newborn-pregnancy',
    title: 'Newborn & Pregnancy',
    category: 'zwangerschap',
    price: '€ 375,- excl. studio',
    deposit: '€ 50,-',
    subtitle: 'Combinatie shoot: 15 zwangerschapsfoto’s + 20 intieme newborn beelden',
    duration: 'Twee afzonderlijke sessies (60 min zwangerschap + 90 min newborn)',
    description: 'Leg het begin van nieuw leven vast met deze combinatie. Tijdens de zwangerschapsshoot ontvang je 15 bewerkte foto’s waarin de verwachting centraal staat. De newbornshoot levert 20 zachte, intieme beelden van je pasgeboren baby. Samen vormen ze een compleet en waardevol herinneringsverhaal. Voor een meerprijs van 75 euro kan studio Vita worden bij geboekt.',
    inclusions: [
      'Zwangerschapsshoot: 15 bewerkte foto’s in verwachting',
      'Newbornshoot: 20 zachte, intieme beelden van je baby',
      'Samen een compleet en waardevol herinneringsverhaal',
      'Optie: Voor een meerprijs van € 75,- kan studio Vita worden bijgeboekt',
      'Foto’s bijbestellen: € 10,- p.s. • € 45,- voor 5 foto’s • € 85,- voor 10 foto’s',
      'Aanbetaling € 50,- bij boeking',
    ],
    recommendedTime: 'Rond 32 weken zwangerschap & eerste weken baby',
    isPopular: true,
  },
  {
    id: 'kinderportret',
    title: 'Kinderportret',
    category: 'gezin',
    price: '€ 99,-',
    deposit: '€ 50,-',
    subtitle: 'Tijdloos en puur portret in een rustige studio-setting bij mij thuis',
    duration: '45 minuten',
    description: 'Een tijdloos en puur portret van jouw kind, gemaakt in een rustige studio-setting bij mij thuis. Geschikt voor 1 kind en inclusief 4 zorgvuldig bewerkte beelden. Minimalistisch, zacht en volledig gericht op de essentie.',
    inclusions: [
      'Inclusief 4 zorgvuldig bewerkte beelden in hoge resolutie',
      'Geschikt voor 1 kind',
      'Rustige studio-setting bij Nikki thuis',
      'Minimalistisch, zacht en volledig gericht op de essentie',
      'Foto’s bijbestellen: € 10,- p.s. • € 45,- voor 5 foto’s • € 85,- voor 10 foto’s',
      'Aanbetaling € 50,- bij boeking',
    ],
    recommendedTime: 'Ochtendzon of zacht middaglicht',
    isPopular: false,
  },
  {
    id: 'cakesmash',
    title: 'CakeSmash',
    category: 'gezin',
    price: '€ 150,-',
    deposit: '€ 50,-',
    subtitle: 'Vrolijke & feestelijke shoot speciaal voor de eerste verjaardag (inclusief cake)',
    duration: '45 tot 60 minuten',
    description: 'Een vrolijke en feestelijke shoot speciaal voor de allerkleinsten. Inclusief cake en geschikt voor 1 kind. Spontane momenten en pure blijdschap worden vastgelegd in speelse beelden — perfect om een eerste verjaardag te vieren. Voor een meerprijs van 75 euro kan studio Vita worden bij geboekt.',
    inclusions: [
      'Inclusief feestelijke cake en natuurlijke styling',
      'Geschikt voor 1 kind',
      'Spontane momenten & pure blijdschap vastgelegd',
      'Optie: Voor een meerprijs van € 75,- kan studio Vita worden bijgeboekt',
      'Foto’s bijbestellen: € 10,- p.s. • € 45,- voor 5 foto’s • € 85,- voor 10 foto’s',
      'Aanbetaling € 50,- bij boeking',
    ],
    recommendedTime: 'Afgestemd op het slaapje van de kleine',
    isPopular: false,
  },
  {
    id: 'branding',
    title: 'Branding',
    category: 'branding',
    price: '€ 200,- excl. studio',
    deposit: '€ 50,-',
    subtitle: 'Persoonlijke, rustige en pure beelden voor jouw merk & website',
    duration: '60 tot 75 minuten',
    description: 'Speciaal voor ondernemers die hun merk visueel willen versterken. Je ontvangt 15 bewerkte beelden die perfect zijn voor social media en je website. De focus ligt op een persoonlijke, rustige en pure uitstraling die jouw verhaal en professionaliteit zichtbaar maakt. Voor een meerprijs van 75 euro kan studio Vita worden bij geboekt.',
    inclusions: [
      'Inclusief 15 bewerkte beelden voor social media & website',
      'Focus op persoonlijke, rustige en professionele uitstraling',
      'Commercieel gebruiksrecht voor eigen branding',
      'Optie: Voor een meerprijs van € 75,- kan studio Vita worden bijgeboekt',
      'Foto’s bijbestellen: € 10,- p.s. • € 45,- voor 5 foto’s • € 85,- voor 10 foto’s',
      'Aanbetaling € 50,- bij boeking',
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
    coverImage: newbornSlapendImg,
    galleryImages: [
      newbornSlapendImg,
      newbornImg,
      newbornMoederImg,
      newbornVoetjesImg,
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
      brandingStudioCafeImg,
      brandingBuitenWerkImg,
      brandingCreatiefPortretImg,
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
      pregnantDuinenJurkImg,
      pregnantKoppelImg,
      pregnantStudioVensterImg,
      pregnantBloemenweideImg,
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
      gezinKnuffelImg,
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
      kinderPortretMeadowImg,
      kinderPortretLaughterImg,
    ],
    description: 'Tijdloze, pure kinderportretten vol verwondering, ontdekking en liefdevolle momenten.',
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
    title: 'Puur & vredig slapend',
    category: 'newborn',
    imageUrl: newbornSlapendImg,
    location: 'Rustig bij het gezin thuis',
    description: 'Kleine Luuk, vredig slapend in een warm wollen truitje.',
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
    title: 'Puur kinderportret in de zon',
    category: 'gezin',
    imageUrl: motherToddlerImg,
    location: 'Buiten in natuurlijk gouden licht',
    description: 'Onbezorgd en vrolijk kind zijn vol ondeugende lachjes en verwondering.',
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

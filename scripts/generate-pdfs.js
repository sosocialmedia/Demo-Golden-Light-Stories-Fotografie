import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

// Output directory
const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Generate Brochure PDF
function generateBrochure() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Background styling
  doc.setFillColor(250, 247, 242); // #FAF7F2
  doc.rect(0, 0, pageWidth, 297, 'F');

  // Header banner
  doc.setFillColor(42, 33, 29); // #2A211D
  doc.rect(0, 0, pageWidth, 38, 'F');

  doc.setTextColor(230, 201, 162); // Gold accent
  doc.setFont('times', 'normal');
  doc.setFontSize(10);
  doc.text('GOLDEN LIGHT STORIES FOTOGRAFIE', pageWidth / 2, 14, { align: 'center' });

  doc.setTextColor(255, 255, 255);
  doc.setFont('times', 'bold');
  doc.setFontSize(16);
  doc.text('Brochure & Investeringsgids', pageWidth / 2, 23, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(213, 199, 184);
  doc.text('Seizoen 2025 / 2026 • Landgraaf, Limburg • www.goldenlightstories.nl', pageWidth / 2, 31, { align: 'center' });

  // Intro text
  let y = 48;
  doc.setTextColor(42, 33, 29);
  doc.setFont('times', 'italic');
  doc.setFontSize(12);
  doc.text('"Warme, pure en liefdevolle herinneringen gevangen in natuurlijk zacht licht."', pageWidth / 2, y, { align: 'center' });

  y += 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(104, 90, 82);
  const introText = 'Welkom bij Golden Light Stories. Ik leg jullie kostbaarste momenten vast met warmte, rust en oog voor detail. Of het nu gaat om de eerste pure dagen met je pasgeboren baby, een ronde zwangere buik, het feest van de eerste verjaardag of een spontane wandeling met het hele gezin.';
  const introLines = doc.splitTextToSize(introText, pageWidth - 32);
  doc.text(introLines, 16, y);

  y += introLines.length * 5 + 6;

  // Packages Header
  doc.setFillColor(239, 231, 220); // #EFE7DC
  doc.roundedRect(16, y, pageWidth - 32, 8, 2, 2, 'F');
  doc.setTextColor(42, 33, 29);
  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.text('FOTOSHOOT COLLECTIES & TARIEVEN', 20, y + 5.5);

  y += 13;

  const packages = [
    {
      title: 'Newborn Story (ca. 90 - 120 min)',
      price: 'Vanaf € 249,-',
      desc: 'Rustgevende shoot in jullie eigen tempo. Inclusief 15 zorgvuldig bewerkte hoge resolutie foto\'s in een persoonlijke online galerij, gebruik van zachte dekentjes en gratis Client Closet.'
    },
    {
      title: 'Gezinsfotografie / Family Story (ca. 60 min)',
      price: 'Vanaf € 225,-',
      desc: 'Spontaan, speels en zonder ongemakkelijk poseren. Inclusief 15 bewerkte foto\'s in hoge resolutie, kledingadvies voor het hele gezin en slecht-weer garantie.'
    },
    {
      title: 'Pregnancy Story / Zwangerschap (ca. 60 min)',
      price: 'Vanaf € 219,-',
      desc: 'Vier het wonder van nieuw leven. Inclusief 12 bewerkte beelden, gratis gebruik van de exclusieve linnen en zijden jurken uit de Client Closet, partner & kids zijn welkom.'
    },
    {
      title: 'Cakesmash Feestshoot (ca. 45 - 60 min)',
      price: 'Vanaf € 195,-',
      desc: 'Een feestelijk badje en taartsetting voor de 1e verjaardag. Inclusief styling, bellenblaas, badje na afloop en 12 feestelijke foto\'s.'
    },
    {
      title: 'Kinderportret & Mini Shoot (ca. 40 min)',
      price: 'Vanaf € 175,-',
      desc: 'Pure, tijdloze portretten van je kindje. Oogcontact, ondeugende lachjes en echte expressies. Inclusief 10 bewerkte beelden.'
    }
  ];

  packages.forEach(pkg => {
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(232, 223, 213);
    doc.roundedRect(16, y, pageWidth - 32, 18, 2, 2, 'FD');

    doc.setFont('times', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(42, 33, 29);
    doc.text(pkg.title, 20, y + 6);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(166, 124, 70); // Gold
    doc.text(pkg.price, pageWidth - 20, y + 6, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(104, 90, 82);
    const descLines = doc.splitTextToSize(pkg.desc, pageWidth - 42);
    doc.text(descLines, 20, y + 11);

    y += 21;
  });

  // Services included box
  y += 2;
  doc.setFillColor(245, 240, 232);
  doc.roundedRect(16, y, pageWidth - 32, 22, 2, 2, 'F');
  
  doc.setFont('times', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(42, 33, 29);
  doc.text('Wat is altijd inbegrepen bij iedere shoot?', 20, y + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(90, 77, 69);
  doc.text('• Gratis toegang tot de Client Closet met prachtige zwierige jurken en baby-outfits.', 20, y + 10.5);
  doc.text('• Slecht-weer garantie: bij aanhoudende regen verplaatsen we de buitenshoot kosteloos.', 20, y + 14.5);
  doc.text('• Veilige aanbetaling van slechts € 50,-; restantbedrag voldoe je pas na ontvangst van de galerij.', 20, y + 18.5);

  // Footer note
  y += 28;
  doc.setFont('times', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(120, 105, 95);
  doc.text('Vragen of een datum reserveren? info@goldenlightstories.nl • Tel / WhatsApp: 06 - 12 34 56 78', pageWidth / 2, y, { align: 'center' });

  const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
  fs.writeFileSync(path.join(publicDir, 'brochure-tarieven-golden-light-stories.pdf'), pdfBuffer);
  console.log('Generated brochure-tarieven-golden-light-stories.pdf');
}

// 2. Generate Terms PDF
function generateTerms() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();

  // Background
  doc.setFillColor(250, 247, 242);
  doc.rect(0, 0, pageWidth, 297, 'F');

  // Header
  doc.setFillColor(42, 33, 29);
  doc.rect(0, 0, pageWidth, 36, 'F');

  doc.setTextColor(230, 201, 162);
  doc.setFont('times', 'normal');
  doc.setFontSize(10);
  doc.text('GOLDEN LIGHT STORIES FOTOGRAFIE', pageWidth / 2, 13, { align: 'center' });

  doc.setTextColor(255, 255, 255);
  doc.setFont('times', 'bold');
  doc.setFontSize(16);
  doc.text('Algemene Voorwaarden', pageWidth / 2, 22, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(213, 199, 184);
  doc.text('Versie 2026 • Gevestigd te Landgraaf, Limburg', pageWidth / 2, 30, { align: 'center' });

  let y = 46;

  // Short summary
  doc.setFillColor(242, 236, 225);
  doc.roundedRect(16, y, pageWidth - 32, 24, 2, 2, 'F');

  doc.setTextColor(166, 124, 70);
  doc.setFont('times', 'bold');
  doc.setFontSize(9.5);
  doc.text('DE BELANGRIJKSTE PUNTEN IN HET KORT:', 20, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(74, 62, 55);
  doc.text('1. Aanbetaling van € 50,- legt de datum en het tijdslot definitief vast in de agenda.', 20, y + 11);
  doc.text('2. Slecht-weer garantie: buitenshoots worden bij aanhoudende regen kosteloos verplaatst.', 20, y + 15);
  doc.text('3. Ziekte: ziek kindje of zelf koorts? Geen probleem, we zoeken samen kosteloos een nieuwe datum.', 20, y + 19);

  y += 30;

  const sections = [
    {
      title: 'Artikel 1 – Toepasselijkheid & Totstandkoming',
      text: 'Deze algemene voorwaarden zijn van toepassing op alle fotoshoots, reserveringen en overeenkomsten met Golden Light Stories Fotografie (gevestigd te Landgraaf, Limburg). Een boeking is definitief zodra de klant via de website een datum heeft gekozen en de overeengekomen aanbetaling heeft voldaan.'
    },
    {
      title: 'Artikel 2 – Tarieven, Aanbetaling & Betaling',
      text: 'De vermelde tarieven in de brochure zijn inclusief BTW en voorbereiding. De reservering wordt definitief na betaling van de aanbetaling van € 50,-. Het resterende factuurbedrag dient te worden voldaan binnen 14 dagen na ontvangst van de concept-keuzegalerij.'
    },
    {
      title: 'Artikel 3 – Annulering, Ziekte & Slecht-Weer Garantie',
      text: 'Buitenshoots zijn afhankelijk van natuurlijk licht. Bij aanhoudende regen of zware storm wordt de shoot kosteloos verplaatst in onderling overleg. Bij plotselinge ziekte van de klant of het kindje kan de afspraak eveneens kosteloos worden verzet naar een andere beschikbare datum.'
    },
    {
      title: 'Artikel 4 – Client Closet & Styling',
      text: 'Klanten hebben kosteloos toegang tot de exclusieve jurken en outfits in de Client Closet. Kleding wordt na iedere shoot zorgvuldig en professioneel gereinigd door de fotograaf. Normale gebruikssporen zijn inbegrepen.'
    },
    {
      title: 'Artikel 5 – Levering & Auteursrecht',
      text: 'Binnen 2 tot 3 weken na de shoot ontvangt de klant toegang tot een beveiligde online galerij. Na de definitieve fotoselectie worden de beelden in hoge resolutie geleverd zonder watermerk. De foto\'s mogen voor privédoeleinden vrij worden afgedrukt en gedeeld op social media.'
    }
  ];

  sections.forEach(sec => {
    doc.setFont('times', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(42, 33, 29);
    doc.text(sec.title, 16, y);

    y += 4.5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(80, 68, 60);
    const lines = doc.splitTextToSize(sec.text, pageWidth - 32);
    doc.text(lines, 16, y);

    y += lines.length * 4.2 + 5;
  });

  const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
  fs.writeFileSync(path.join(publicDir, 'algemene-voorwaarden-golden-light-stories.pdf'), pdfBuffer);
  console.log('Generated algemene-voorwaarden-golden-light-stories.pdf');
}

generateBrochure();
generateTerms();

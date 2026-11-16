import { Booking } from '../types';

/**
 * Generates a direct Google Calendar web event creation link
 */
export function createGoogleCalendarUrl(booking: Booking): string {
  const todayStr = new Date().toISOString().split('T')[0];
  const cleanDate = (booking.date || todayStr).replace(/-/g, '');
  let startFormatted = `${cleanDate}T100000`;
  let endFormatted = `${cleanDate}T120000`;

  if (booking.timeSlotTime && booking.timeSlotTime.includes('-')) {
    const parts = booking.timeSlotTime.split('-').map(s => s.trim());
    const startTimeStr = parts[0] || '10:00';
    const endTimeStr = parts[1] || '12:00';
    const formatTime = (tStr?: string) => {
      if (!tStr) return '100000';
      const clean = tStr.replace(/[^0-9]/g, '');
      return clean.padEnd(4, '0') + '00';
    };
    startFormatted = `${cleanDate}T${formatTime(startTimeStr)}`;
    endFormatted = `${cleanDate}T${formatTime(endTimeStr)}`;
  }

  const title = encodeURIComponent(`${booking.packageName} – ${booking.clientName} [Golden Light Stories Fotografie]`);
  const details = encodeURIComponent(
    `Fotoshoot met ${booking.clientName}\n` +
    `Gekozen shoot: ${booking.packageName}\n` +
    `Datum: ${booking.date}\n` +
    (booking.timeSlotTime ? `Tijdslot: ${booking.timeSlotTime}\n` : '') +
    `Telefoon: ${booking.clientPhone || '-'}\n` +
    `E-mail: ${booking.clientEmail || '-'}\n` +
    (booking.message ? `Notitie: ${booking.message}\n` : '') +
    `\nGolden Light Stories Fotografie\nLocatie: In overleg\nInstagram: @goldenls_photography`
  );
  const location = encodeURIComponent(booking.preferredLocation || 'In overleg (Nederland)');

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startFormatted}/${endFormatted}&ctz=Europe/Amsterdam&details=${details}&location=${location}`;
}

/**
 * Generates and triggers download of a standardized .ics file (iCalendar)
 * compatible with Apple Calendar, Google Calendar, and Microsoft Outlook.
 */
export function downloadIcsFile(booking: Booking) {
  const todayStr = new Date().toISOString().split('T')[0];
  const cleanDate = (booking.date || todayStr).replace(/-/g, '');
  let dtStart = `${cleanDate}T100000`;
  let dtEnd = `${cleanDate}T120000`;

  if (booking.timeSlotTime && booking.timeSlotTime.includes('-')) {
    const [startTimeStr, endTimeStr] = booking.timeSlotTime.split('-').map(s => s.trim());
    const formatTime = (tStr?: string) => (tStr ? tStr.replace(':', '') + '00' : '120000');
    dtStart = `${cleanDate}T${formatTime(startTimeStr)}`;
    dtEnd = `${cleanDate}T${formatTime(endTimeStr || '12:00')}`;
  }

  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Golden Light Stories Fotografie//NL',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:goldenlight-${booking.id}@goldenlightstories.nl`,
    `DTSTAMP:${now}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${booking.packageName} – Golden Light Stories`,
    `DESCRIPTION:${booking.packageName} met ${booking.clientName}. Datum: ${booking.date}. Contact: ${booking.clientPhone}`,
    `LOCATION:${booking.preferredLocation || 'In overleg'}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Fotoshoot-${booking.packageName.replace(/\s+/g, '-')}-${booking.date}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Exports all confirmed bookings as a combined .ics calendar file for the photographer
 */
export function exportAllBookingsIcs(bookings: Booking[]) {
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const events = bookings.map(b => {
    const todayStr = new Date().toISOString().split('T')[0];
    const cleanDate = (b.date || todayStr).replace(/-/g, '');
    let dtStart = `${cleanDate}T100000`;
    let dtEnd = `${cleanDate}T120000`;

    if (b.timeSlotTime && b.timeSlotTime.includes('-')) {
      const [startTimeStr, endTimeStr] = b.timeSlotTime.split('-').map(s => s.trim());
      const formatTime = (tStr?: string) => (tStr ? tStr.replace(':', '') + '00' : '120000');
      dtStart = `${cleanDate}T${formatTime(startTimeStr)}`;
      dtEnd = `${cleanDate}T${formatTime(endTimeStr || '12:00')}`;
    }

    return [
      'BEGIN:VEVENT',
      `UID:goldenlight-admin-${b.id}@goldenlightstories.nl`,
      `DTSTAMP:${now}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:Fotoshoot: ${b.clientName} (${b.packageName})`,
      `DESCRIPTION:Klant: ${b.clientName}\\nTel: ${b.clientPhone}\\nEmail: ${b.clientEmail}\\nPakket: ${b.packageName}\\nDatum: ${b.date}\\nOpmerking: ${b.message || '-'}`,
      `LOCATION:${b.preferredLocation || 'Nederland'}`,
      `STATUS:${b.status === 'geannuleerd' ? 'CANCELLED' : 'CONFIRMED'}`,
      'END:VEVENT',
    ].join('\r\n');
  }).join('\r\n');

  const icsFull = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Golden Light Stories//Fotograaf Agenda//NL',
    'CALSCALE:GREGORIAN',
    'X-WR-CALNAME:Golden Light Stories Boekingen',
    events,
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsFull], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Golden-Light-Stories-Alle-Boekingen-${new Date().toISOString().split('T')[0]}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

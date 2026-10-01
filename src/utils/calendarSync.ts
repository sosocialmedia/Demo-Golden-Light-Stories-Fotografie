import { Booking } from '../types';

/**
 * Generates a direct Google Calendar web event creation link
 */
export function createGoogleCalendarUrl(booking: Booking): string {
  const [startTimeStr, endTimeStr] = booking.timeSlotTime.split('-').map(s => s.trim());
  
  // Format date and times into YYYYMMDDTHHmmssZ
  // Example: 2026-09-20 and 18:45 -> 20260920T184500
  const cleanDate = booking.date.replace(/-/g, '');
  const formatTime = (tStr?: string) => {
    if (!tStr) return '180000';
    return tStr.replace(':', '') + '00';
  };

  const startFormatted = `${cleanDate}T${formatTime(startTimeStr)}`;
  const endFormatted = `${cleanDate}T${formatTime(endTimeStr || '2000')}`;

  const title = encodeURIComponent(`${booking.packageName} – ${booking.clientName} [Golden Light Stories]`);
  const details = encodeURIComponent(
    `Fotoshoot met ${booking.clientName}\n` +
    `Pakket: ${booking.packageName}\n` +
    `Tijdslot: ${booking.timeSlotLabel} (${booking.timeSlotTime})\n` +
    `Locatievoorkeur: ${booking.preferredLocation}\n` +
    `Telefoon: ${booking.clientPhone}\n` +
    `E-mail: ${booking.clientEmail}\n` +
    `Groep: ${booking.groupSize}\n` +
    (booking.message ? `Bericht: ${booking.message}\n` : '') +
    `\nGolden Light Stories Fotografie\nInstagram: @goldenls_photography`
  );
  const location = encodeURIComponent(booking.preferredLocation || 'In overleg (Nederland)');

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startFormatted}/${endFormatted}&details=${details}&location=${location}`;
}

/**
 * Generates and triggers download of a standardized .ics file (iCalendar)
 * compatible with Apple Calendar, Google Calendar, and Microsoft Outlook.
 */
export function downloadIcsFile(booking: Booking) {
  const [startTimeStr, endTimeStr] = booking.timeSlotTime.split('-').map(s => s.trim());
  const cleanDate = booking.date.replace(/-/g, '');
  const formatTime = (tStr?: string) => (tStr ? tStr.replace(':', '') + '00' : '180000');
  
  const dtStart = `${cleanDate}T${formatTime(startTimeStr)}`;
  const dtEnd = `${cleanDate}T${formatTime(endTimeStr || '2000')}`;
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
    `DESCRIPTION:${booking.packageName} met ${booking.clientName}. Locatie: ${booking.preferredLocation}. Contact: ${booking.clientPhone}`,
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
    const [startTimeStr, endTimeStr] = b.timeSlotTime.split('-').map(s => s.trim());
    const cleanDate = b.date.replace(/-/g, '');
    const formatTime = (tStr?: string) => (tStr ? tStr.replace(':', '') + '00' : '180000');
    const dtStart = `${cleanDate}T${formatTime(startTimeStr)}`;
    const dtEnd = `${cleanDate}T${formatTime(endTimeStr || '2000')}`;

    return [
      'BEGIN:VEVENT',
      `UID:goldenlight-admin-${b.id}@goldenlightstories.nl`,
      `DTSTAMP:${now}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:Fotoshoot: ${b.clientName} (${b.packageName})`,
      `DESCRIPTION:Klant: ${b.clientName}\\nTel: ${b.clientPhone}\\nEmail: ${b.clientEmail}\\nPakket: ${b.packageName}\\nLocatie: ${b.preferredLocation}\\nOpmerking: ${b.message || '-'}`,
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

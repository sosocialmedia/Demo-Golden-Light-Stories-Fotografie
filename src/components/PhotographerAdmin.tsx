import React, { useState } from 'react';
import { X, Calendar, Clock, Plus, Trash2, CheckCircle, AlertCircle, Download, ExternalLink, RefreshCw, MapPin, Phone, Mail, MessageCircle, ShieldCheck, Sun, Check, Eye } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { exportAllBookingsIcs, createGoogleCalendarUrl } from '../utils/calendarSync';
import { SlotType, BookingStatus } from '../types';

export const PhotographerAdmin: React.FC = () => {
  const {
    isPhotographerAdminOpen,
    closePhotographerAdmin,
    activeAdminTab,
    availableDays,
    bookings,
    addAvailableDate,
    removeAvailableDate,
    addSlotToDate,
    removeSlotFromDate,
    toggleDateBlocked,
    batchAddWeekendSunsetSlots,
    updateBookingStatus,
    deleteBooking,
    updateBookingNotes,
    resetAllData,
    defaultDepositAmount,
    updateDefaultDepositAmount,
  } = useBooking();

  const [currentTab, setCurrentTab] = useState<'beschikbaarheid' | 'boekingen' | 'synchronisatie'>(
    activeAdminTab || 'beschikbaarheid'
  );

  // New date input
  const [newDateVal, setNewDateVal] = useState('');

  // Slot modal or input state per day
  const [activeDateForNewSlot, setActiveDateForNewSlot] = useState<string | null>(null);
  const [newSlotTime, setNewSlotTime] = useState('16:00 - 17:15');
  const [newSlotType, setNewSlotType] = useState<SlotType>('evening');
  const [newSlotLabel, setNewSlotLabel] = useState('Gezin');

  // External calendar sync state
  const [googleSyncUrl, setGoogleSyncUrl] = useState(() => {
    return localStorage.getItem('golden_light_photographer_cal_url') || '';
  });
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  if (!isPhotographerAdminOpen) return null;

  const handleCreateDate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDateVal) return;
    addAvailableDate(newDateVal);
    setNewDateVal('');
  };

  const handleAddSlot = (dateStr: string) => {
    addSlotToDate(dateStr, {
      time: newSlotTime,
      type: newSlotType,
      label: newSlotLabel,
    });
    setActiveDateForNewSlot(null);
  };

  const handleSaveGoogleCalUrl = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('golden_light_photographer_cal_url', googleSyncUrl);
    setSaveSuccessMsg('Google Agenda koppeling opgeslagen!');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  // Quick preset helper
  const applyPreset = (time: string, type: SlotType, label: string) => {
    setNewSlotTime(time);
    setNewSlotType(type);
    setNewSlotLabel(label);
  };

  // Stats
  const totalSlots = availableDays.reduce((acc, d) => acc + d.slots.length, 0);
  const bookedSlots = availableDays.reduce((acc, d) => acc + d.slots.filter(s => s.isBooked).length, 0);
  const freeSlots = totalSlots - bookedSlots;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#2A211D]/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#DFCFC0] overflow-hidden my-auto max-h-[92vh] flex flex-col text-left">
        
        {/* Admin Header */}
        <div className="p-5 sm:p-6 border-b border-[#E8DFD5] bg-[#F2ECE1] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#2A211D] text-[#FAF7F2] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#E6C9A2]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif-editorial text-2xl text-[#2A211D] font-medium leading-none">
                  Fotograaf Agenda Beheer
                </h3>
                <span className="text-[10px] bg-[#A67C46] text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                  Eigenaar Portaal
                </span>
              </div>
              <p className="text-xs text-[#705E53] mt-1">
                Beheer jouw openstaande data, bekijk klantboekingen en synchroniseer met je eigen agenda.
              </p>
            </div>
          </div>

          <button
            onClick={closePhotographerAdmin}
            className="p-2 rounded-full hover:bg-[#E0D6CB] text-[#705E53] transition-colors"
            aria-label="Sluiten"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin Navigation Tabs & Quick Metrics */}
        <div className="px-6 py-3 bg-[#FAF7F2] border-b border-[#E8DFD5] flex flex-wrap items-center justify-between gap-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentTab('beschikbaarheid')}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                currentTab === 'beschikbaarheid'
                  ? 'bg-[#2A211D] text-white shadow-xs'
                  : 'bg-[#F2ECE1] text-[#5A4D45] hover:bg-[#E8DFD5]'
              }`}
            >
              Beschikbare Data & Tijdsloten ({availableDays.length})
            </button>

            <button
              onClick={() => setCurrentTab('boekingen')}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all relative ${
                currentTab === 'boekingen'
                  ? 'bg-[#2A211D] text-white shadow-xs'
                  : 'bg-[#F2ECE1] text-[#5A4D45] hover:bg-[#E8DFD5]'
              }`}
            >
              <span>Klantboekingen</span>
              {bookings.length > 0 && (
                <span className="ml-1.5 bg-[#A67C46] text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {bookings.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setCurrentTab('synchronisatie')}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                currentTab === 'synchronisatie'
                  ? 'bg-[#2A211D] text-white shadow-xs'
                  : 'bg-[#F2ECE1] text-[#5A4D45] hover:bg-[#E8DFD5]'
              }`}
            >
              Agenda Koppelen & Export
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center space-x-3 text-xs text-[#705E53]">
            <span>Vrij: <strong className="text-emerald-700 font-semibold">{freeSlots}</strong></span>
            <span>•</span>
            <span>Gereserveerd: <strong className="text-[#A67C46] font-semibold">{bookedSlots}</strong></span>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* TAB 1: BESCHIKBAARHEID INSTELLEN (The core requirement: Photographer fills in available dates) */}
          {currentTab === 'beschikbaarheid' && (
            <div className="space-y-6">
              
              {/* Form to Add New Date */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F2ECE1] border border-[#DFCFC0]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <h4 className="font-serif-editorial text-lg text-[#2A211D] font-semibold">
                    Nieuwe Beschikbare Datum Toevoegen
                  </h4>
                  {/* Quick batch generator for October 2026 */}
                  <button
                    type="button"
                    onClick={() => {
                      batchAddWeekendSunsetSlots(2026, 9);
                    }}
                    className="text-xs text-[#A67C46] hover:text-[#2A211D] font-medium underline flex items-center space-x-1"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>+ Voeg automatisch alle weekenden van oktober 2026 toe</span>
                  </button>
                </div>

                <form onSubmit={handleCreateDate} className="flex flex-col sm:flex-row items-end gap-3">
                  <div className="flex-1 w-full">
                    <label className="block text-[11px] font-semibold text-[#705E53] uppercase mb-1">
                      Kies Datum (vanaf oktober 2026)
                    </label>
                    <input
                      type="date"
                      required
                      min="2026-10-01"
                      value={newDateVal}
                      onChange={e => setNewDateVal(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#D5C7B8] bg-[#FAF7F2] text-[#2A211D]"
                    />
                  </div>

                  <div className="shrink-0 w-full sm:w-auto">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center space-x-1.5 bg-[#2A211D] hover:bg-[#3D312A] text-white py-2 px-5 rounded-xl text-xs font-semibold transition-all shadow-xs"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Datum Openstellen</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* List of Configured Days */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif-editorial text-xl text-[#2A211D]">
                    Huidige Beschikbare Data in de Agenda ({availableDays.length})
                  </h4>
                  <p className="text-xs text-[#705E53]">
                    Klanten kunnen alleen kiezen uit onderstaande tijdsloten.
                  </p>
                </div>

                {availableDays.length === 0 ? (
                  <p className="p-8 text-center text-xs text-[#705E53] bg-[#FAF7F2] rounded-2xl border border-dashed border-[#DFCFC0]">
                    Nog geen data ingesteld. Voeg hierboven je eerste datum toe!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {availableDays.map(day => {
                      const isAddingSlot = activeDateForNewSlot === day.date;
                      return (
                        <div
                          key={day.date}
                          className={`p-4 rounded-2xl border transition-all ${
                            day.isBlocked
                              ? 'bg-stone-100 border-stone-300 opacity-60'
                              : 'bg-[#FAF7F2] border-[#DFCFC0] shadow-2xs'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E8DFD5]">
                            <div className="flex items-center space-x-3">
                              <Calendar className="w-4 h-4 text-[#A67C46]" />
                              <div>
                                <span className="font-serif-editorial text-lg font-semibold text-[#2A211D]">
                                  {day.date}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              {/* Block toggle */}
                              <button
                                onClick={() => toggleDateBlocked(day.date)}
                                className={`text-[11px] px-2.5 py-1 rounded-full font-medium border ${
                                  day.isBlocked
                                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                                    : 'bg-[#F2ECE1] text-[#5A4D45] border-[#D5C7B8]'
                                }`}
                              >
                                {day.isBlocked ? 'Geblokkeerd (Pauze)' : 'Actief'}
                              </button>

                              {/* Add slot button */}
                              <button
                                onClick={() => {
                                  setActiveDateForNewSlot(isAddingSlot ? null : day.date);
                                }}
                                className="text-[11px] px-2.5 py-1 rounded-full bg-[#EFE7DC] text-[#2A211D] hover:bg-[#E2D6C6] font-medium flex items-center space-x-1"
                              >
                                <Plus className="w-3 h-3" />
                                <span>Tijdslot Toevoegen</span>
                              </button>

                              {/* Delete date */}
                              <button
                                onClick={() => removeAvailableDate(day.date)}
                                className="p-1 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                                title="Datum verwijderen"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Time slots for this day */}
                          <div className="pt-3 flex flex-wrap gap-2 items-center">
                            {day.slots.map(slot => (
                              <div
                                key={slot.id}
                                className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl border text-xs ${
                                  slot.isBooked
                                    ? 'bg-red-50 border-red-200 text-red-800'
                                    : 'bg-[#F2ECE1] border-[#DFCFC0] text-[#2A211D]'
                                }`}
                              >
                                <Clock className="w-3 h-3 text-[#A67C46]" />
                                <span className="font-semibold">{slot.time}</span>
                                <span className="text-[10px] text-[#705E53]">({slot.label})</span>
                                {slot.isBooked ? (
                                  <span className="text-[9px] font-bold uppercase bg-red-200 text-red-800 px-1.5 py-0.2 rounded-full">
                                    Gereserveerd
                                  </span>
                                ) : (
                                  <button
                                    onClick={() => removeSlotFromDate(day.date, slot.id)}
                                    className="text-stone-400 hover:text-stone-600 ml-1"
                                    title="Slot verwijderen"
                                  >
                                    ×
                                  </button>
                                )}
                              </div>
                            ))}

                            {day.slots.length === 0 && (
                              <span className="text-xs text-[#8C7A6F] italic">
                                Geen tijdsloten ingesteld voor deze datum.
                              </span>
                            )}
                          </div>

                          {/* Inline Slot Creator Drawer */}
                          {isAddingSlot && (
                            <div className="mt-3 p-3.5 rounded-xl bg-white border border-[#DFCFC0] animate-in fade-in duration-150 space-y-3">
                              <p className="text-xs font-semibold text-[#2A211D]">
                                Tijdslot toevoegen aan {day.date}
                              </p>

                              {/* Presets met Golden Stories benamingen */}
                              <div className="space-y-1">
                                <span className="text-[10px] uppercase font-semibold text-[#705E53] block">
                                  Kies thema (Golden Stories):
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => applyPreset('16:00 - 17:15', 'evening', 'Gezin')}
                                    className={`text-[10px] px-2.5 py-1 rounded-full border transition-all ${
                                      newSlotLabel === 'Gezin'
                                        ? 'bg-[#2A211D] text-white border-[#2A211D]'
                                        : 'bg-[#F2ECE1] hover:bg-[#E8DFD5] text-[#2A211D] border-transparent'
                                    }`}
                                  >
                                    Gezin (16:00 - 17:15)
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => applyPreset('10:00 - 11:30', 'morning', 'Newborn')}
                                    className={`text-[10px] px-2.5 py-1 rounded-full border transition-all ${
                                      newSlotLabel === 'Newborn'
                                        ? 'bg-[#2A211D] text-white border-[#2A211D]'
                                        : 'bg-[#F2ECE1] hover:bg-[#E8DFD5] text-[#2A211D] border-transparent'
                                    }`}
                                  >
                                    Newborn (10:00 - 11:30)
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => applyPreset('16:30 - 17:45', 'evening', 'Pregnancy')}
                                    className={`text-[10px] px-2.5 py-1 rounded-full border transition-all ${
                                      newSlotLabel === 'Pregnancy'
                                        ? 'bg-[#2A211D] text-white border-[#2A211D]'
                                        : 'bg-[#F2ECE1] hover:bg-[#E8DFD5] text-[#2A211D] border-transparent'
                                    }`}
                                  >
                                    Pregnancy (16:30 - 17:45)
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => applyPreset('14:00 - 15:15', 'evening', 'Kinder Portret')}
                                    className={`text-[10px] px-2.5 py-1 rounded-full border transition-all ${
                                      newSlotLabel === 'Kinder Portret'
                                        ? 'bg-[#2A211D] text-white border-[#2A211D]'
                                        : 'bg-[#F2ECE1] hover:bg-[#E8DFD5] text-[#2A211D] border-transparent'
                                    }`}
                                  >
                                    Kinder Portret (14:00 - 15:15)
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => applyPreset('11:00 - 12:15', 'morning', 'Cakesmash')}
                                    className={`text-[10px] px-2.5 py-1 rounded-full border transition-all ${
                                      newSlotLabel === 'Cakesmash'
                                        ? 'bg-[#2A211D] text-white border-[#2A211D]'
                                        : 'bg-[#F2ECE1] hover:bg-[#E8DFD5] text-[#2A211D] border-transparent'
                                    }`}
                                  >
                                    Cakesmash (11:00 - 12:15)
                                  </button>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                <div>
                                  <label className="text-[10px] uppercase font-semibold text-[#705E53] block">Tijd</label>
                                  <input
                                    type="text"
                                    value={newSlotTime}
                                    onChange={e => setNewSlotTime(e.target.value)}
                                    placeholder="16:00 - 17:15"
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[#D5C7B8]"
                                  />
                                </div>
                                <div>
                                  <label className="text-[10px] uppercase font-semibold text-[#705E53] block">Thema / Label</label>
                                  <input
                                    type="text"
                                    value={newSlotLabel}
                                    onChange={e => setNewSlotLabel(e.target.value)}
                                    placeholder="Gezin, Newborn, Pregnancy, Kinder Portret..."
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[#D5C7B8]"
                                  />
                                </div>
                                <div className="flex items-end space-x-2">
                                  <button
                                    type="button"
                                    onClick={() => handleAddSlot(day.date)}
                                    className="bg-[#2A211D] text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#3D312A]"
                                  >
                                    Opslaan
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setActiveDateForNewSlot(null)}
                                    className="px-2 py-1.5 text-xs text-[#705E53]"
                                  >
                                    Annuleren
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: BINNENGEKOMEN BOEKINGEN */}
          {currentTab === 'boekingen' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif-editorial text-xl text-[#2A211D]">
                    Ingekomen Aanvragen & Afspraken ({bookings.length})
                  </h4>
                  <p className="text-xs text-[#705E53]">
                    Klanten die via de website een datum en slot hebben gekozen.
                  </p>
                </div>

                {bookings.length > 0 && (
                  <button
                    onClick={() => exportAllBookingsIcs(bookings)}
                    className="flex items-center space-x-1.5 text-xs px-3.5 py-2 rounded-full bg-[#2A211D] text-white hover:bg-[#3D312A] transition-all"
                  >
                    <Download className="w-3.5 h-3.5 text-[#E6C9A2]" />
                    <span>Download Alle Afspraken (.ics)</span>
                  </button>
                )}
              </div>

              {bookings.length === 0 ? (
                <div className="p-8 text-center bg-[#FAF7F2] rounded-2xl border border-dashed border-[#DFCFC0]">
                  <p className="text-sm text-[#705E53]">
                    Nog geen boekingen ontvangen. Zodra een klant een shoot reserveert, verschijnt deze direct hier!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map(booking => (
                    <div
                      key={booking.id}
                      className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#DFCFC0] shadow-xs space-y-3"
                    >
                      {/* Top row: Client name, status, and package */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#E8DFD5]">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-serif-editorial text-xl font-medium text-[#2A211D]">
                              {booking.clientName}
                            </span>
                            <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                              booking.status === 'bevestigd'
                                ? 'bg-emerald-100 text-emerald-800'
                                : booking.status === 'geannuleerd'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {booking.status}
                            </span>
                            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-semibold bg-[#EFE7DC] text-[#2A211D] border border-[#DFCFC0]">
                              Aanbetaling: € {booking.depositAmount || 50},- {booking.depositPaid !== false ? '✓ Voldaan' : 'Openstaand'}
                            </span>
                          </div>
                          <p className="text-xs text-[#A67C46] font-semibold">
                            {booking.packageName}
                          </p>
                        </div>

                        {/* Date & Time pill */}
                        <div className="flex items-center space-x-2 text-xs bg-[#F2ECE1] px-3 py-1.5 rounded-xl text-[#2A211D]">
                          <Calendar className="w-3.5 h-3.5 text-[#A67C46]" />
                          <span className="font-semibold">{booking.date}</span>
                          <span>•</span>
                          <span>{booking.timeSlotTime}</span>
                        </div>
                      </div>

                      {/* Client Contact Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#5A4D45]">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-3.5 h-3.5 text-[#A67C46] shrink-0" />
                          <a href={`mailto:${booking.clientEmail}`} className="underline hover:text-[#2A211D] truncate">
                            {booking.clientEmail}
                          </a>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-3.5 h-3.5 text-[#A67C46] shrink-0" />
                          <a href={`tel:${booking.clientPhone}`} className="hover:text-[#2A211D]">
                            {booking.clientPhone}
                          </a>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-3.5 h-3.5 text-[#A67C46] shrink-0" />
                          <span>{booking.preferredLocation}</span>
                        </div>
                      </div>

                      {/* Group and message */}
                      <div className="p-3 bg-[#F5F0E8] rounded-xl text-xs space-y-1">
                        <p><strong>Gezelschap:</strong> {booking.groupSize}</p>
                        {booking.message && (
                          <p><strong>Bericht van klant:</strong> "{booking.message}"</p>
                        )}
                      </div>

                      {/* Actions & Calendar Sync */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E8DFD5]">
                        <div className="flex items-center space-x-2">
                          {/* Direct WhatsApp button */}
                          <a
                            href={`https://wa.me/${booking.clientPhone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-xs px-3 py-1.5 rounded-lg bg-[#EFE7DC] text-[#2A211D] hover:bg-[#E2D6C6]"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                            <span>WhatsApp Klant</span>
                          </a>

                          {/* Add to Google Calendar */}
                          <a
                            href={createGoogleCalendarUrl(booking)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-xs px-3 py-1.5 rounded-lg bg-[#EFE7DC] text-[#2A211D] hover:bg-[#E2D6C6]"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-[#A67C46]" />
                            <span>In Google Agenda zetten</span>
                          </a>
                        </div>

                        {/* Status switcher */}
                        <div className="flex items-center space-x-2">
                          {booking.status !== 'bevestigd' && (
                            <button
                              onClick={() => updateBookingStatus(booking.id, 'bevestigd')}
                              className="text-xs text-emerald-700 hover:underline font-medium"
                            >
                              Markeer als Bevestigd
                            </button>
                          )}
                          {booking.status !== 'geannuleerd' && (
                            <button
                              onClick={() => updateBookingStatus(booking.id, 'geannuleerd')}
                              className="text-xs text-rose-600 hover:underline font-medium"
                            >
                              Annuleren (slot vrijgeven)
                            </button>
                          )}
                          <button
                            onClick={() => deleteBooking(booking.id)}
                            className="p-1.5 text-stone-400 hover:text-stone-600"
                            title="Verwijder afspraak"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: AGENDA KOPPELEN & SYNCHRONISATIE */}
          {currentTab === 'synchronisatie' && (
            <div className="space-y-6 text-left">
              <div>
                <h4 className="font-serif-editorial text-2xl text-[#2A211D]">
                  Jouw Agenda Koppelen met de Website
                </h4>
                <p className="text-xs text-[#5A4D45] mt-1 leading-relaxed">
                  Hiermee zorg je ervoor dat alle gemaakte afspraken automatisch gesynchroniseerd worden met
                  jouw eigen Google Agenda, Apple Agenda of Outlook op je telefoon en laptop.
                </p>
              </div>

              {/* Sync Option 1: 1-Click iCal Export */}
              <div className="p-5 rounded-2xl bg-[#F2ECE1] border border-[#DFCFC0] space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#A67C46]">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm text-[#2A211D]">
                      1. Download Volledig Agendabestand (.ics)
                    </h5>
                    <p className="text-xs text-[#705E53]">
                      Exporteert in 1 klik alle bevestigde klantafspraken naar een universeel bestand voor Apple/Google/Outlook.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => exportAllBookingsIcs(bookings)}
                    className="flex items-center space-x-2 bg-[#2A211D] hover:bg-[#3D312A] text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition-all"
                  >
                    <Download className="w-4 h-4 text-[#E6C9A2]" />
                    <span>Download {bookings.length} Afspraken naar Mijn Agenda</span>
                  </button>
                </div>
              </div>

              {/* Sync Option 2: Google Agenda URL Sync */}
              <div className="p-5 rounded-2xl bg-[#F2ECE1] border border-[#DFCFC0] space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#A67C46]">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm text-[#2A211D]">
                      2. Google Agenda Koppeling (iCal Feed URL)
                    </h5>
                    <p className="text-xs text-[#705E53]">
                      Plak hieronder eventueel jouw openbare of geheime iCal-feed link van Google Agenda om bezette vakanties of privé-afspraken te koppelen.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSaveGoogleCalUrl} className="space-y-3 pt-1">
                  <input
                    type="url"
                    value={googleSyncUrl}
                    onChange={e => setGoogleSyncUrl(e.target.value)}
                    placeholder="https://calendar.google.com/calendar/ical/.../basic.ics"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#D5C7B8] bg-[#FAF7F2] text-[#2A211D]"
                  />

                  <div className="flex items-center space-x-3">
                    <button
                      type="submit"
                      className="bg-[#2A211D] hover:bg-[#3D312A] text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all"
                    >
                      Koppeling Opslaan
                    </button>
                    {saveSuccessMsg && (
                      <span className="text-xs text-emerald-700 font-semibold animate-in fade-in">
                        ✓ {saveSuccessMsg}
                      </span>
                    )}
                  </div>
                </form>
              </div>

              {/* Reset to demo */}
              <div className="pt-4 border-t border-[#E8DFD5] flex items-center justify-between text-xs text-[#705E53]">
                <span>Wil je de voorbeelddata herstellen?</span>
                <button
                  onClick={() => {
                    if (confirm('Weet je zeker dat je alle data wilt resetten naar de standaard voorbeelddata?')) {
                      resetAllData();
                    }
                  }}
                  className="flex items-center space-x-1 text-stone-500 hover:text-[#2A211D]"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Standaarddata herstellen</span>
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F2ECE1] border-t border-[#E8DFD5] flex justify-end">
          <button
            onClick={closePhotographerAdmin}
            className="bg-[#2A211D] hover:bg-[#3D312A] text-white px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold"
          >
            Sluiten & Wijzigingen Behouden
          </button>
        </div>

      </div>
    </div>
  );
};

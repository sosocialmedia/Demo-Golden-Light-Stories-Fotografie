import React, { useState, useEffect, useRef } from 'react';
import { Lock, X, ShieldCheck, AlertCircle, Eye, EyeOff, Check } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

interface AdminPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminPinModal: React.FC<AdminPinModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Default PIN is 2026, or whatever the photographer saved
  const getStoredPin = () => {
    return localStorage.getItem('golden_light_admin_pin') || '2026';
  };

  useEffect(() => {
    if (isOpen) {
      setPin('');
      setError(false);
      setErrorMessage('');
      setIsSuccess(false);
      // Auto focus after open
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDigitClick = (digit: string) => {
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      setError(false);
      if (newPin.length === 4) {
        verifyPin(newPin);
      }
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
    setError(false);
    setErrorMessage('');
  };

  const handleClear = () => {
    setPin('');
    setError(false);
    setErrorMessage('');
  };

  const verifyPin = (candidatePin: string) => {
    const correctPin = getStoredPin();
    if (candidatePin === correctPin) {
      setIsSuccess(true);
      setError(false);
      setErrorMessage('');
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 400);
    } else {
      setError(true);
      setErrorMessage('Onjuiste toegangscode. Probeer opnieuw.');
      setTimeout(() => {
        setPin('');
      }, 500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && pin.length > 0) {
      verifyPin(pin);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    setPin(val);
    setError(false);
    if (val.length === 4) {
      verifyPin(val);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2A211D]/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-sm bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#DFCFC0] overflow-hidden p-6 sm:p-7 text-center transition-all ${
          error ? 'animate-shake' : ''
        }`}
      >
        {/* Sluitknop */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#8C7B71] hover:text-[#2A211D] hover:bg-[#EFE8DE] rounded-full transition-colors cursor-pointer"
          aria-label="Sluiten"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Lock Icon Header */}
        <div className="mx-auto w-12 h-12 rounded-2xl bg-[#EFE8DE] text-[#2A211D] flex items-center justify-center mb-4 shadow-xs">
          {isSuccess ? (
            <Check className="w-6 h-6 text-emerald-600 animate-in zoom-in-50" />
          ) : (
            <Lock className="w-5 h-5 text-[#A67C46]" />
          )}
        </div>

        <h3
          className="text-xl sm:text-2xl font-normal text-[#1A1412] mb-1.5"
          style={{ fontFamily: "'Bodoni Moda', 'Cormorant Garamond', Georgia, serif" }}
        >
          Fotograaf Beheer
        </h3>

        <p
          className="text-xs text-[#7A6B62] font-light mb-6"
          style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
        >
          Voer je 4-cijferige toegangscode in om je agenda en tijdsloten te beheren.
        </p>

        {/* Verborgen native input voor toetsenbord/mobiel keyboard support */}
        <input
          ref={inputRef}
          type={showPassword ? 'text' : 'password'}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={4}
          value={pin}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="opacity-0 absolute -z-10 w-0 h-0"
          autoFocus
        />

        {/* 4 Digit Visual Indicators */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="flex items-center justify-center space-x-3 mb-5 cursor-pointer"
        >
          {[0, 1, 2, 3].map((idx) => {
            const hasValue = pin.length > idx;
            const digit = pin[idx];
            return (
              <div
                key={idx}
                className={`w-12 h-14 rounded-2xl border flex items-center justify-center text-xl font-semibold transition-all ${
                  isSuccess
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : error
                    ? 'border-rose-400 bg-rose-50 text-rose-700'
                    : hasValue
                    ? 'border-[#A67C46] bg-white text-[#1A1412] shadow-xs'
                    : 'border-[#DFCFC0] bg-[#F2ECE1] text-[#9E8D81]'
                }`}
              >
                {hasValue ? (showPassword ? digit : '•') : ''}
              </div>
            );
          })}
        </div>

        {/* Error of Statusbericht */}
        <div className="min-h-6 mb-4">
          {error && (
            <p className="text-xs text-rose-600 font-medium flex items-center justify-center space-x-1.5 animate-in fade-in">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMessage}</span>
            </p>
          )}
          {isSuccess && (
            <p className="text-xs text-emerald-700 font-medium flex items-center justify-center space-x-1 animate-in fade-in">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>Toegang verleend...</span>
            </p>
          )}
        </div>

        {/* Numeriek Toetsenbord voor touch / muis */}
        <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto mb-4">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleDigitClick(num)}
              className="h-11 rounded-xl bg-white hover:bg-[#EFE8DE] active:scale-95 text-[#241C18] border border-[#E8DFD5] text-base font-semibold shadow-2xs transition-all cursor-pointer"
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            onClick={handleClear}
            className="h-11 rounded-xl bg-white/60 hover:bg-[#EFE8DE] active:scale-95 text-[#8C7B71] text-xs font-medium transition-all cursor-pointer flex items-center justify-center"
          >
            Wis
          </button>
          <button
            type="button"
            onClick={() => handleDigitClick('0')}
            className="h-11 rounded-xl bg-white hover:bg-[#EFE8DE] active:scale-95 text-[#241C18] border border-[#E8DFD5] text-base font-semibold shadow-2xs transition-all cursor-pointer"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleBackspace}
            className="h-11 rounded-xl bg-white/60 hover:bg-[#EFE8DE] active:scale-95 text-[#8C7B71] text-xs font-medium transition-all cursor-pointer flex items-center justify-center"
          >
            ←
          </button>
        </div>

        {/* Toggle password zichtbaarheid & discrete hint voor de fotografe */}
        <div className="pt-2 border-t border-[#EFE8DE] flex items-center justify-between text-[11px] text-[#8C7B71]">
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="hover:text-[#241C18] flex items-center space-x-1 cursor-pointer"
          >
            {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showPassword ? 'Verberg code' : 'Toon code'}</span>
          </button>

          <span className="text-[10px] text-[#A6978B] font-light">
            Standaard: <span className="font-mono font-medium text-[#7A6B62]">2026</span>
          </span>
        </div>
      </div>
    </div>
  );
};

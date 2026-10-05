import { useState } from 'react';
import { TASTING_EXPERIENCES } from '../data/coffeeData';
import { ReservationData } from '../types/coffee';
import { Calendar, Clock, Users, Check, Sparkles } from 'lucide-react';

interface TastingReservationProps {
  isOpenModal?: boolean;
  onCloseModal?: () => void;
}

export function TastingReservation({ isOpenModal = false, onCloseModal }: TastingReservationProps) {
  const [selectedExperienceId, setSelectedExperienceId] = useState<string>('terroir-flight');
  const [date, setDate] = useState<string>('2026-10-06');
  const [time, setTime] = useState<string>('11:30 AM');
  const [guests, setGuests] = useState<number>(2);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<ReservationData | null>(null);

  const activeExp = TASTING_EXPERIENCES.find((e) => e.id === selectedExperienceId) || TASTING_EXPERIENCES[0];
  const totalPrice = activeExp.price * guests;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const reservation: ReservationData = {
      id: `ATL-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      email,
      phone,
      date,
      time,
      guests,
      experience: selectedExperienceId as any,
      notes,
    };
    setConfirmedBooking(reservation);
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    if (onCloseModal) onCloseModal();
  };

  const content = (
    <div className="max-w-7xl mx-auto px-6">
      {/* Section Header */}
      <div className="max-w-2xl mb-12">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#966742] mb-2">
          <span>Sensory Flights & Roastery Bay</span>
          <span aria-hidden="true">·</span>
          <span>Guided Experiences</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#1E140D] font-normal tracking-tight [text-wrap:balance]">
          Reserve a Tasting Flight or Cupping Table
        </h2>
        <p className="text-sm text-[#5F4E42] mt-3 leading-relaxed">
          Join our Head Roaster at our reclaimed white oak tasting bar. Taste award-winning single-origin micro-lots side-by-side or step inside the active roasting bay for an official SCA cupping session.
        </p>
      </div>

      {confirmedBooking ? (
        <div className="max-w-xl mx-auto bg-white p-8 rounded-xl border border-[#DCD3C5] shadow-md text-center">
          <div className="w-12 h-12 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center mx-auto mb-4">
            <Check className="w-6 h-6" />
          </div>
          <p className="text-xs uppercase tracking-wider text-[#966742] font-semibold">Booking Confirmed</p>
          <h3 className="font-serif text-2xl font-medium text-[#20150E] mt-1">
            We look forward to hosting you, {confirmedBooking.name}
          </h3>
          <p className="text-xs text-[#7A675A] mt-2">
            A confirmation receipt and calendar invitation have been sent to <span className="font-semibold text-[#20150E]">{confirmedBooking.email}</span>.
          </p>

          <div className="my-6 p-4 rounded-lg bg-[#FAF8F5] border border-[#EAE3D6] text-left text-xs space-y-2">
            <div className="flex justify-between pb-2 border-b border-[#F2ECE3]">
              <span className="text-[#7A675A]">Reservation ID:</span>
              <span className="font-mono font-bold text-[#20150E]">{confirmedBooking.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7A675A]">Experience:</span>
              <span className="font-semibold text-[#20150E]">{activeExp.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7A675A]">Date & Time:</span>
              <span className="font-semibold text-[#20150E]">{confirmedBooking.date} at {confirmedBooking.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7A675A]">Party Size:</span>
              <span className="font-semibold text-[#20150E]">{confirmedBooking.guests} Guests</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[#F2ECE3]">
              <span className="text-[#7A675A]">Total Paid at Bar:</span>
              <span className="font-mono tabular-nums font-bold text-[#20150E]">${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="px-6 py-2.5 text-xs font-semibold text-[#FFFDF9] bg-[#221711] hover:bg-[#3D291D] rounded-md transition-colors"
          >
            Done
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Tasting Experience Options */}
          <div className="lg:col-span-7 space-y-4">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#695547] mb-2">
              Select Experience
            </label>
            {TASTING_EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                onClick={() => setSelectedExperienceId(exp.id)}
                className={`p-5 rounded-xl border cursor-pointer transition-all ${
                  selectedExperienceId === exp.id
                    ? 'border-[#221711] bg-white shadow-sm ring-1 ring-[#221711]'
                    : 'border-[#E5DDD0] bg-white/60 hover:bg-white hover:border-[#C4B4A2]'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h3 className="font-serif text-lg font-medium text-[#20150E]">{exp.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-[#7A675A] mt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#9C7A58]" />
                        <span>{exp.duration}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>Guided by Certified Q-Grader</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono tabular-nums text-lg font-bold text-[#20150E]">
                      ${exp.price}
                    </span>
                    <span className="block text-[10px] text-[#8C7A6D]">per person</span>
                  </div>
                </div>

                <p className="text-xs text-[#5F4E42] leading-relaxed mb-3">{exp.description}</p>

                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#F2ECE3]">
                  {exp.includes.map((inc, i) => (
                    <span
                      key={i}
                      className="text-[11px] text-[#695547] bg-[#FAF8F5] px-2.5 py-1 rounded border border-[#EBE4D8]"
                    >
                      {inc}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Reservation Form */}
          <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-[#E5DDD0] shadow-xs">
            <h3 className="font-serif text-xl font-medium text-[#20150E] mb-1">Book Your Seats</h3>
            <p className="text-xs text-[#7A675A] mb-5">Select your preferred date, party size, and arrival time.</p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Date & Guests */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#695547] mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#9C7A58]" />
                    <span>Date</span>
                  </label>
                  <select
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5C9B8] rounded-md focus:outline-none focus:border-[#221711] text-[#20150E]"
                  >
                    <option value="2026-10-06">Tue, Oct 6</option>
                    <option value="2026-10-07">Wed, Oct 7</option>
                    <option value="2026-10-08">Thu, Oct 8</option>
                    <option value="2026-10-09">Fri, Oct 9</option>
                    <option value="2026-10-10">Sat, Oct 10</option>
                    <option value="2026-10-11">Sun, Oct 11</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#695547] mb-1.5 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#9C7A58]" />
                    <span>Party Size</span>
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5C9B8] rounded-md focus:outline-none focus:border-[#221711] text-[#20150E]"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                    <option value={5}>5 Guests</option>
                    <option value={6}>6 Guests (Private Flight)</option>
                  </select>
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#695547] mb-1.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#9C7A58]" />
                  <span>Time Slot</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['10:00 AM', '11:30 AM', '2:00 PM', '4:00 PM'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTime(t)}
                      className={`py-2 px-2 text-center rounded-md border transition-all ${
                        time === t
                          ? 'border-[#221711] bg-[#221711] text-white font-semibold'
                          : 'border-[#D5C9B8] bg-[#FAF8F5] text-[#5C4A3E] hover:border-[#A69380]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#695547] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5C9B8] rounded-md focus:outline-none focus:border-[#221711] text-[#20150E]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#695547] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="eleanor@example.com"
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5C9B8] rounded-md focus:outline-none focus:border-[#221711] text-[#20150E]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#695547] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 019-2834"
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5C9B8] rounded-md focus:outline-none focus:border-[#221711] text-[#20150E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#695547] mb-1">
                    Dietary or Special Requests
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any dairy preference or anniversary notes..."
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5C9B8] rounded-md focus:outline-none focus:border-[#221711] text-[#20150E]"
                  />
                </div>
              </div>

              {/* Price Breakdown & Submit */}
              <div className="pt-4 border-t border-[#F2ECE3]">
                <div className="flex items-center justify-between text-xs mb-3 text-[#7A675A]">
                  <span>Total for {guests} {guests === 1 ? 'guest' : 'guests'}:</span>
                  <span className="font-mono tabular-nums text-lg font-bold text-[#20150E]">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-xs font-semibold text-[#FFFDF9] bg-[#221711] hover:bg-[#3D291D] rounded-md transition-colors shadow-xs"
                >
                  Confirm Table Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  if (isOpenModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#140D08]/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
        <div className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-xl border border-[#E5DDD0] shadow-2xl p-6 sm:p-8 my-8 max-h-[92vh] overflow-y-auto">
          <button
            onClick={onCloseModal}
            className="absolute top-4 right-4 text-xs font-semibold text-[#7A675A] hover:text-[#20150E] p-2"
          >
            Close
          </button>
          {content}
        </div>
      </div>
    );
  }

  return (
    <section id="tasting" className="py-16 md:py-24 bg-[#F7F3ED] border-b border-[#EAE3D6]">
      {content}
    </section>
  );
}

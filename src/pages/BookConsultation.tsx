import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Building2, 
  Globe, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Video
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BookConsultation: React.FC = () => {
  const { bookAppointment, showToast, websiteContent } = useApp();

  const [selectedDate, setSelectedDate] = useState('2026-03-30');
  const [selectedTime, setSelectedTime] = useState('11:00 AM EST');
  const [topic, setTopic] = useState('Full-Funnel Marketing & SEO Strategy');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [notes, setNotes] = useState('');

  const [confirmed, setConfirmed] = useState(false);
  const [confirmedId, setConfirmedId] = useState('');

  const availableDates = [
    { label: 'Mon, Mar 30', val: '2026-03-30' },
    { label: 'Tue, Mar 31', val: '2026-03-31' },
    { label: 'Wed, Apr 01', val: '2026-04-01' },
    { label: 'Thu, Apr 02', val: '2026-04-02' },
    { label: 'Fri, Apr 03', val: '2026-04-03' }
  ];

  const availableTimes = [
    '09:30 AM EST',
    '11:00 AM EST',
    '01:30 PM EST',
    '03:00 PM EST',
    '04:30 PM EST'
  ];

  const topics = [
    'Full-Funnel Marketing & SEO Strategy',
    'Modern Next.js Web Engineering & Headless CMS',
    '24/7 Managed IT Helpdesk & SLA Architecture',
    'Zero-Trust Network & Remote Workforce Security',
    'Enterprise Growth Audit & Fractional CTO Advisory'
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      showToast('Missing Fields', 'Please supply your name and email address.', 'warning');
      return;
    }

    const newBooking = bookAppointment({
      clientName: name,
      clientEmail: email,
      clientPhone: phone || 'N/A',
      company: company || 'Stealth / Private',
      service: topic,
      date: selectedDate,
      timeSlot: selectedTime,
      platform: 'Google Meet',
      notes: notes || `Interested in ${topic} for ${websiteUrl || 'their company'}.`
    });

    setConfirmedId(newBooking.id);
    setConfirmed(true);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // fallback
    }

    showToast('Consultation Confirmed', `Meeting confirmed for ${selectedDate} at ${selectedTime}.`, 'success');
  };

  return (
    <div className="pt-24 lg:pt-28 pb-20 overflow-hidden">
      
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold mb-4">
          <Calendar className="w-3.5 h-3.5" />
          <span>Executive Discovery</span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
          Book a 1-on-1 Strategic <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
            Discovery Consultation
          </span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
          Schedule a dedicated 30-minute video session with Abhishek Singh and our practice leads to audit your marketing acquisition funnels or enterprise IT infrastructure.
        </p>
      </section>

      {/* Main Booker Container */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pb-20">
        <div className="rounded-3xl bg-[#0b0f17] border border-slate-800 shadow-2xl p-6 sm:p-10">
          
          {confirmed ? (
            <div className="text-center py-12 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto shadow-xl shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase">
                  Booking Reference: {confirmedId}
                </span>
                <h3 className="font-display text-3xl font-bold text-white">
                  Strategy Session Confirmed!
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{name}</strong>. A calendar invite and Google Meet link have been dispatched to <strong className="text-cyan-300">{email}</strong>.
                </p>
              </div>

              {/* Summary Card */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-left space-y-2.5">
                <div className="flex items-center gap-2 text-slate-300">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>Date: <strong className="text-white">{selectedDate}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>Time: <strong className="text-white">{selectedTime}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Video className="w-4 h-4 text-cyan-400" />
                  <span>Format: <strong className="text-white">Google Meet (HD Video + Screen Share)</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Focus: <strong className="text-white">{topic}</strong></span>
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setConfirmed(false);
                    setName('');
                    setEmail('');
                    setNotes('');
                  }}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                >
                  Schedule Another Call
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="space-y-8">
              
              {/* Step 1: Select Topic */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  1. Select Consultation Focus
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {topics.map((t, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setTopic(t)}
                      className={`p-3 rounded-xl text-left text-xs font-semibold border transition-all ${
                        topic === t
                          ? 'bg-cyan-950/60 border-cyan-500/60 text-cyan-200 shadow-md'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Select Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-800/80">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    2. Select Date
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {availableDates.map((d) => (
                      <button
                        key={d.val}
                        type="button"
                        onClick={() => setSelectedDate(d.val)}
                        className={`p-2.5 rounded-xl text-xs font-semibold border flex items-center justify-between transition-all ${
                          selectedDate === d.val
                            ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span>{d.label}</span>
                        {selectedDate === d.val && <CheckCircle2 className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    3. Select Time Window
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {availableTimes.map((tm) => (
                      <button
                        key={tm}
                        type="button"
                        onClick={() => setSelectedTime(tm)}
                        className={`p-2.5 rounded-xl text-xs font-semibold border flex items-center justify-between transition-all ${
                          selectedTime === tm
                            ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span>{tm}</span>
                        {selectedTime === tm && <CheckCircle2 className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 3: Attendee Details */}
              <div className="space-y-4 pt-4 border-t border-slate-800/80">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  4. Your Contact Information
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Thomas Wayne"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="thomas@enterprises.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Direct Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Company & Website</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Wayne Enterprises (wayne.com)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">What is your #1 Goal for this call?</label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Share specific bottlenecks, monthly revenue targets, or IT compliance questions..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Confirm Discovery Session ({selectedDate} @ {selectedTime})</span>
                </button>
              </div>

            </form>
          )}

        </div>
      </section>

    </div>
  );
};

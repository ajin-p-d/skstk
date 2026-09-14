'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageSquare } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    preferredBatch: 'Evening (5:00 PM – 7:00 PM)',
    trainingLevel: 'Beginner',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-28 bg-kalari-black text-kalari-white relative border-b border-kalari-earth/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-kalari-gold block mb-3">
            Begin Your Training
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-kalari-white tracking-wider uppercase text-gold-gradient mb-6">
            JOIN OUR KALARI
          </h2>
          <p className="text-kalari-beige/80 text-base sm:text-lg font-light leading-relaxed">
            Take your first step onto the sacred red earth. Register for a trial class or contact our Gurukkal directly for admission inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details & Arena Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-2xl bg-kalari-darkBrown/80 border border-kalari-gold/30 shadow-gold space-y-6">
              <h3 className="font-serif text-2xl font-bold text-kalari-gold">
                Thulunadan Kalari Sangham
              </h3>
              <p className="text-sm text-kalari-beige/80 font-light leading-relaxed">
                Our Kuzhi Kalari arena is built with authentic red earth and consecrated according to ancient Agamic principles, providing an atmosphere of deep concentration and warrior discipline.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-kalari-black flex items-center justify-center text-kalari-gold shrink-0 border border-kalari-gold/30">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-serif uppercase tracking-widest text-kalari-gold">Arena Location</h4>
                    <p className="text-xs sm:text-sm text-kalari-beige/90 mt-0.5">
                      Kuzhi Kalari Complex, Near Chirakkal Temple Ground, Kannur, Kerala 670011, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-kalari-black flex items-center justify-center text-kalari-gold shrink-0 border border-kalari-gold/30">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-serif uppercase tracking-widest text-kalari-gold">Direct Phone</h4>
                    <p className="text-xs sm:text-sm text-kalari-beige/90 mt-0.5">
                      +91 98471 23456 / +91 94460 34567
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-kalari-black flex items-center justify-center text-kalari-gold shrink-0 border border-kalari-gold/30">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-serif uppercase tracking-widest text-kalari-gold">Official Email</h4>
                    <p className="text-xs sm:text-sm text-kalari-beige/90 mt-0.5">
                      admissions@thulunadankalari.org
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-kalari-black flex items-center justify-center text-kalari-gold shrink-0 border border-kalari-gold/30">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-serif uppercase tracking-widest text-kalari-gold">Class Hours</h4>
                    <p className="text-xs sm:text-sm text-kalari-beige/90 mt-0.5">
                      Morning: 6:00 AM – 7:30 AM <br />
                      Evening: 5:00 PM – 7:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA */}
              <div className="pt-4 border-t border-kalari-gold/20">
                <a
                  href="https://wa.me/919847123456"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-lg bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-white flex items-center justify-center gap-2 font-semibold text-xs tracking-wider uppercase transition-all duration-300"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat with Gurukkal on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Trial Class Registration Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-kalari-darkBrown/90 border border-kalari-gold/40 shadow-gold">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-kalari-gold/20 border-2 border-kalari-gold text-kalari-gold flex items-center justify-center mx-auto shadow-gold">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-kalari-gold">
                    Trial Registration Received
                  </h3>
                  <p className="text-sm text-kalari-beige/80 max-w-md mx-auto leading-relaxed font-light">
                    Namaskaram, <strong className="text-kalari-white">{formData.name}</strong>. The Gurukkal has received your trial class inquiry. Our senior instructor will contact you via WhatsApp/Phone at <strong className="text-kalari-gold">{formData.phone}</strong> with arena preparation guidelines.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2 rounded bg-kalari-black border border-kalari-gold/40 text-kalari-gold text-xs font-serif uppercase tracking-widest hover:bg-kalari-gold hover:text-kalari-black transition-all"
                    >
                      Register Another Practitioner
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-kalari-white mb-1">
                      Book a Free Trial Session
                    </h3>
                    <p className="text-xs text-kalari-beige/70 font-light">
                      Step inside the arena, meet the masters, and experience our traditional warm-up.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-serif uppercase tracking-wider text-kalari-gold mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Arun Kumar"
                        className="w-full px-4 py-2.5 rounded bg-kalari-black border border-kalari-earth/60 focus:border-kalari-gold text-kalari-white text-sm focus:outline-none focus:ring-1 focus:ring-kalari-gold transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-serif uppercase tracking-wider text-kalari-gold mb-2">
                        Mobile Number (WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98471 23456"
                        className="w-full px-4 py-2.5 rounded bg-kalari-black border border-kalari-earth/60 focus:border-kalari-gold text-kalari-white text-sm focus:outline-none focus:ring-1 focus:ring-kalari-gold transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-serif uppercase tracking-wider text-kalari-gold mb-2">
                        Age
                      </label>
                      <input
                        type="number"
                        min="5"
                        max="80"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        placeholder="e.g. 21"
                        className="w-full px-4 py-2.5 rounded bg-kalari-black border border-kalari-earth/60 focus:border-kalari-gold text-kalari-white text-sm focus:outline-none focus:ring-1 focus:ring-kalari-gold transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-serif uppercase tracking-wider text-kalari-gold mb-2">
                        Preferred Batch
                      </label>
                      <select
                        value={formData.preferredBatch}
                        onChange={(e) => setFormData({ ...formData, preferredBatch: e.target.value })}
                        className="w-full px-4 py-2.5 rounded bg-kalari-black border border-kalari-earth/60 focus:border-kalari-gold text-kalari-white text-sm focus:outline-none focus:ring-1 focus:ring-kalari-gold transition-all"
                      >
                        <option value="Morning (6:00 AM – 7:30 AM)">Morning (6:00 AM – 7:30 AM)</option>
                        <option value="Evening (5:00 PM – 7:00 PM)">Evening (5:00 PM – 7:00 PM)</option>
                        <option value="Weekend Special (7:00 AM – 9:30 AM)">Weekend Special (7:00 AM – 9:30 AM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-kalari-gold mb-2">
                      Prior Experience / Interests
                    </label>
                    <select
                      value={formData.trainingLevel}
                      onChange={(e) => setFormData({ ...formData, trainingLevel: e.target.value })}
                      className="w-full px-4 py-2.5 rounded bg-kalari-black border border-kalari-earth/60 focus:border-kalari-gold text-kalari-white text-sm focus:outline-none focus:ring-1 focus:ring-kalari-gold transition-all"
                    >
                      <option value="Beginner">Complete Beginner (No prior martial experience)</option>
                      <option value="Flexibility">Seeking Flexibility & Physical Conditioning</option>
                      <option value="Self Defense">Practical Self-Defense & Awareness</option>
                      <option value="Experienced">Practitioner of Other Martial Arts / Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-kalari-gold mb-2">
                      Questions for Gurukkal (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Any medical notes or specific goals..."
                      className="w-full px-4 py-2.5 rounded bg-kalari-black border border-kalari-earth/60 focus:border-kalari-gold text-kalari-white text-sm focus:outline-none focus:ring-1 focus:ring-kalari-gold transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-lg gold-gradient-bg text-kalari-black font-serif font-black text-sm tracking-widest uppercase shadow-gold hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Trial Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

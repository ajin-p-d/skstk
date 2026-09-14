'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PaymentRecord, FeeRecord } from '@/types';
import { X, Printer, Download, CheckCircle, Shield } from 'lucide-react';

interface FeeReceiptModalProps {
  payment: PaymentRecord;
  fee?: FeeRecord | null;
  onClose: () => void;
}

export default function FeeReceiptModal({ payment, fee, onClose }: FeeReceiptModalProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Background click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative z-10 w-full max-w-lg bg-kalari-black border-2 border-kalari-gold rounded-2xl shadow-gold-lg overflow-hidden text-kalari-white my-8"
      >
        {/* Top Control Bar (Hidden on print) */}
        <div className="no-print flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-kalari-darkBrown border-b border-kalari-gold/30">
          <div className="flex items-center gap-1.5 sm:gap-2 text-kalari-gold text-[10px] sm:text-xs font-serif uppercase tracking-widest">
            <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Official Kalari Receipt</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded bg-kalari-gold text-kalari-black text-[10px] sm:text-xs font-serif font-bold uppercase tracking-wider hover:bg-kalari-goldLight flex items-center gap-1 shadow-gold transition-all"
            >
              <Printer className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 sm:p-1.5 rounded-full text-kalari-beige hover:text-kalari-gold hover:bg-kalari-black/40 transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Paper Container */}
        <div className="printable-receipt p-4 sm:p-8 md:p-10 font-sans bg-[#FAF7F2] text-[#1E1815] border-dashed border-2 border-[#C89B3C]/50 m-2 sm:m-4 rounded-xl relative">
          {/* Watermark Crest */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <Image
              src="/images/kalari-logo.png"
              alt="Crest"
              width={220}
              height={220}
            />
          </div>

          {/* Header */}
          <div className="text-center pb-6 border-b-2 border-[#C89B3C]/40 space-y-1">
            <div className="w-12 h-12 mx-auto mb-2 relative">
              <Image
                src="/images/kalari-logo.png"
                alt="Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-black tracking-widest text-[#241A14] uppercase">
              THULUNADAN KALARI SANGHAM
            </h2>
            <p className="text-[11px] uppercase tracking-widest text-[#5C3A21] font-medium">
              Ancient Martial Heritage • Chirakkal, Kannur, Kerala
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 bg-[#C89B3C]/20 border border-[#C89B3C] text-[#5C3A21] font-serif text-xs font-bold uppercase tracking-widest rounded">
                FEE PAYMENT RECEIPT
              </span>
            </div>
          </div>

          {/* Receipt Meta */}
          <div className="py-5 border-b border-[#C89B3C]/30 flex items-center justify-between text-xs">
            <div>
              <span className="text-[#7A6E65] block uppercase font-medium">Receipt No:</span>
              <strong className="font-mono text-sm text-[#241A14] font-bold">
                {payment.receipt_number}
              </strong>
            </div>
            <div className="text-right">
              <span className="text-[#7A6E65] block uppercase font-medium">Date:</span>
              <strong className="text-[#241A14] font-bold">
                {payment.payment_date}
              </strong>
            </div>
          </div>

          {/* Student & Payment Breakdown */}
          <div className="py-6 space-y-3.5 text-xs sm:text-sm">
            <div className="flex justify-between items-center py-1 border-b border-[#E0D8CE]">
              <span className="text-[#7A6E65]">Student Name:</span>
              <span className="font-bold text-[#241A14] text-base font-serif">
                {payment.student_name}
              </span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-[#E0D8CE]">
              <span className="text-[#7A6E65]">Student ID:</span>
              <span className="font-mono font-bold text-[#5C3A21]">
                {payment.student_id}
              </span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-[#E0D8CE]">
              <span className="text-[#7A6E65]">Fee Period:</span>
              <span className="font-semibold text-[#241A14]">
                {fee?.month || 'September'} {fee?.year || 2026}
              </span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-[#E0D8CE]">
              <span className="text-[#7A6E65]">Payment Method:</span>
              <span className="font-semibold text-[#241A14] px-2 py-0.5 rounded bg-[#E8DCC8]">
                {payment.payment_method}
              </span>
            </div>

            {payment.notes && (
              <div className="flex justify-between items-center py-1 border-b border-[#E0D8CE]">
                <span className="text-[#7A6E65]">Reference / Notes:</span>
                <span className="font-mono text-xs text-[#5C3A21]">
                  {payment.notes}
                </span>
              </div>
            )}

            {/* Big Amount Paid Box */}
            <div className="mt-6 p-4 rounded-lg bg-[#EFE9DF] border border-[#C89B3C]/40 flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase font-bold text-[#5C3A21] tracking-wider block">
                  Amount Received
                </span>
                <span className="text-xs text-[#7A6E65]">Monthly Kalari Training Tuition</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-[#241A14] font-serif">
                  ₹{payment.amount.toLocaleString('en-IN')}
                </span>
                <div className="flex items-center justify-end gap-1 text-[11px] text-[#059669] font-bold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>PAID IN FULL</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer & Gurukkal Stamp */}
          <div className="pt-6 border-t-2 border-[#C89B3C]/40 mt-4 flex items-end justify-between">
            <div className="space-y-1">
              <span className="text-[11px] uppercase text-[#7A6E65] font-semibold block">
                Lineage Blessing:
              </span>
              <p className="font-serif italic text-xs text-[#5C3A21] font-medium leading-tight">
                "Train With Discipline. <br />
                Live With Strength."
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-10 border-b border-dashed border-[#5C3A21] mx-auto flex items-end justify-center pb-1">
                <span className="font-serif italic text-[11px] text-[#5C3A21]">K. Chandran</span>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-[#7A6E65] block mt-1 font-semibold">
                Chief Gurukkal Seal
              </span>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-6 text-center text-[10px] text-[#A89F91] border-t border-[#E8DCC8] pt-3">
            Computer generated official receipt • Thulunadan Kalaripayattu Academy
          </div>
        </div>

        {/* Modal Close Action for screen */}
        <div className="no-print p-4 bg-kalari-darkBrown border-t border-kalari-gold/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-kalari-black border border-kalari-gold/40 text-kalari-gold hover:bg-kalari-gold hover:text-kalari-black text-xs font-serif uppercase tracking-wider transition-all"
          >
            Close Receipt
          </button>
        </div>
      </motion.div>
    </div>
  );
}

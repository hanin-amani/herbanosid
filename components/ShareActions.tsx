"use client";

import React from 'react';

// --- SVG ICONS ---
const IconShare = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
);
const IconFacebook = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const IconX = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>;
const IconPinterest = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 0 5.397 0 12.017c0 5.077 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 12.017-5.41 12.017-12.017C24.017 5.397 18.624 0 12.017 0z"/></svg>;
const IconWhatsApp = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.022-.967-.264-.099-.456-.149-.648.149-.192.297-.764.967-.936 1.165-.172.198-.344.223-.64.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.648-1.565-.888-2.143-.232-.564-.468-.488-.64-.497-.168-.009-.36-.011-.552-.011-.192 0-.504.074-.77.371-.264.298-1.008.985-1.008 2.4s1.032 2.775 1.176 2.969c.144.194 2.024 3.085 4.903 4.331.686.297 1.222.474 1.638.607.688.22 1.314.189 1.808.114.555-.084 1.706-.697 1.944-1.37.238-.673.238-1.25.168-1.37-.07-.12-.262-.194-.558-.343zM12 22c-1.644 0-3.255-.424-4.664-1.229l-.334-.19L3.486 21.5l1.01-3.418-.209-.333C3.487 16.326 3 14.218 3 12c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9z"/></svg>;
const IconTelegram = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.32.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>;
const IconLink = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>;

interface ShareProps {
  url: string;
  title: string;
}

export default function ShareActions({ url, title }: ShareProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    alert('Link berhasil disalin!');
  };

  return (
    <div className="flex flex-wrap items-center gap-3 mb-12">
      
      {/* --- KOTAK BAGIKAN (SPEECH BUBBLE STYLE) --- */}
      <div className="relative flex items-center bg-white border border-gray-100 rounded-lg px-4 py-2.5 shadow-sm">
        <div className="text-gray-500 mr-3">
          <IconShare />
        </div>
        <div className="h-6 w-px bg-gray-200 mr-4"></div>
        <span className="text-sm font-black text-gray-900 uppercase tracking-widest">Bagikan</span>
        
        {/* Segitiga Penunjuk (Tip) */}
        <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-t border-r border-gray-100 rotate-45"></div>
      </div>

      {/* --- TOMBOL MEDIA SOSIAL --- */}
      <div className="flex flex-wrap gap-2 items-center ml-1">
        <a 
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} 
          target="_blank" 
          rel="noreferrer"
          className="bg-[#4b69b1] text-white w-10 h-10 flex items-center justify-center rounded-lg hover:brightness-110 transition-all shadow-sm"
          title="Share to Facebook"
        >
          <IconFacebook />
        </a>

        <a 
          href={`https://twitter.com/intent/tweet?url=${url}&text=${title}`} 
          target="_blank" 
          rel="noreferrer"
          className="bg-black text-white w-10 h-10 flex items-center justify-center rounded-lg hover:brightness-110 transition-all shadow-sm"
          title="Share to X"
        >
          <IconX />
        </a>

        <a 
          href={`https://pinterest.com/pin/create/button/?url=${url}&description=${title}`} 
          target="_blank" 
          rel="noreferrer"
          className="bg-[#bd081c] text-white w-10 h-10 flex items-center justify-center rounded-lg hover:brightness-110 transition-all shadow-sm"
          title="Share to Pinterest"
        >
          <IconPinterest />
        </a>

        <a 
          href={`https://api.whatsapp.com/send?text=${title}%0A${url}`} 
          target="_blank" 
          rel="noreferrer"
          className="bg-[#2ecc71] text-white w-10 h-10 flex items-center justify-center rounded-lg hover:brightness-110 transition-all shadow-sm"
          title="Share to WhatsApp"
        >
          <IconWhatsApp />
        </a>

        <a 
          href={`https://telegram.me/share/url?url=${url}&text=${title}`} 
          target="_blank" 
          rel="noreferrer"
          className="bg-[#0088cc] text-white w-10 h-10 flex items-center justify-center rounded-lg hover:brightness-110 transition-all shadow-sm"
          title="Share to Telegram"
        >
          <IconTelegram />
        </a>

        <button 
          onClick={handleCopy} 
          className="bg-black text-white w-10 h-10 flex items-center justify-center rounded-lg hover:brightness-110 transition-all shadow-sm"
          title="Copy Link"
        >
          <IconLink />
        </button>
      </div>
      
    </div>
  );
}
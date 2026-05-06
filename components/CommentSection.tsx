"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Ganti dengan file config supabase Anda jika sudah ada
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CommentSection({ postSlug }: { postSlug: string }) {
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 1. Ambil Komentar yang sudah ada
  useEffect(() => {
    fetchComments();
  }, [postSlug]);

  const fetchComments = async () => {
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('post_slug', postSlug)
      .order('created_at', { ascending: false });
    if (data) setComments(data);
  };

  // 2. Logika Login (Google/GitHub)
  const handleLogin = async (provider: 'google' | 'github') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.href }
    });
  };

  // 3. Kirim Komentar (Tamu atau User)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    const { error } = await supabase.from('comments').insert([
      {
        post_slug: postSlug,
        content: comment,
        user_id: user?.id || null,
        author_name: user?.user_metadata?.full_name || name,
        author_email: user?.email || email,
        author_website: website,
        is_approved: true // Langsung tayang!
      }
    ]);

    if (error) {
      alert("Gagal kirim komentar: " + error.message);
    } else {
      setComment('');
      fetchComments(); // Refresh daftar komentar
    }
    setLoading(false);
  };

  return (
    <div className="mt-16 pt-8 border-t border-gray-100">
      <h3 className="text-xl font-bold mb-6 text-gray-900 uppercase">KOMENTAR ({comments.length})</h3>

      {/* Tombol Login */}
      <div className="mb-8 p-5 bg-gray-50 border border-gray-100 rounded-sm">
        <p className="text-sm text-gray-600 mb-3 font-medium">Masuk cepat untuk berkomentar:</p>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => handleLogin('google')} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-sm font-medium hover:bg-gray-50 shadow-sm rounded-sm">
            Google
          </button>
          <button onClick={() => handleLogin('github')} className="flex items-center gap-2 px-4 py-2.5 bg-[#24292F] text-white text-sm font-medium hover:bg-[#1f2328] shadow-sm rounded-sm">
            GitHub
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea 
          placeholder="Tulis komentar..." 
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border border-gray-300 p-3 text-sm focus:border-green-600 outline-none"
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Nama*" value={name} onChange={(e) => setName(e.target.value)} className="border border-gray-300 p-3 text-sm outline-none" required />
          <input type="email" placeholder="Email*" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-gray-300 p-3 text-sm outline-none" required />
        </div>
        <button 
          disabled={loading}
          type="submit" 
          className="bg-green-700 text-white px-8 py-3 text-sm font-bold hover:bg-green-800 transition-colors uppercase"
        >
          {loading ? 'Mengirim...' : 'Kirim Sekarang'}
        </button>
      </form>

      {/* Daftar Komentar yang Langsung Muncul */}
      <div className="mt-10 space-y-6">
        {comments.map((c) => (
          <div key={c.id} className="border-b border-gray-50 pb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-gray-900">{c.author_name}</span>
              <span className="text-xs text-gray-400">{new Date(c.created_at).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{c.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
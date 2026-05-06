"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// --- ICONS ---
const IconGoogle = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const IconGithub = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const IconUser = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);

export default function CommentSection({ postSlug }: { postSlug: string }) {
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // 1. Cek User Aktif & Ambil Komentar
  useEffect(() => {
    fetchComments();
    checkUser();
  }, [postSlug]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) setCurrentUser(user);
  };

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
  };

  // 3. Kirim Komentar
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const authorName = currentUser?.user_metadata?.full_name || name;
    const authorEmail = currentUser?.email || email;

    const { error } = await supabase.from('comments').insert([{
      post_slug: postSlug,
      content: comment,
      user_id: currentUser?.id || null,
      author_name: authorName,
      author_email: authorEmail,
      is_approved: true
    }]);

    if (error) {
      alert("Gagal kirim komentar: " + error.message);
    } else {
      setComment('');
      if(!currentUser) { setName(''); setEmail(''); }
      fetchComments();
    }
    setLoading(false);
  };

  return (
    <div className="mt-16 pt-10 border-t border-gray-100">
      
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Diskusi & Komentar</h3>
        <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-0.5 rounded-full">{comments.length}</span>
      </div>

      {/* AREA LOGIN / OAUTH */}
      {!currentUser ? (
        <div className="mb-10 p-6 bg-gray-50 border border-gray-100 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600 mb-4 font-medium">Masuk lebih cepat untuk bergabung dalam diskusi:</p>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => handleLogin('google')} 
              className="flex items-center justify-center gap-3 w-full sm:w-auto px-6 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-bold hover:bg-gray-50 hover:border-gray-300 transition-all rounded-md shadow-sm"
            >
              <IconGoogle /> Lanjutkan dengan Google
            </button>
            <button 
              onClick={() => handleLogin('github')} 
              className="flex items-center justify-center gap-3 w-full sm:w-auto px-6 py-2.5 bg-[#24292F] text-white text-sm font-bold hover:bg-[#1b1f23] transition-all rounded-md shadow-sm"
            >
              <IconGithub /> Lanjutkan dengan GitHub
            </button>
          </div>
          <div className="mt-4 flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-xs text-gray-400 font-bold uppercase tracking-widest">Atau Komentar Sebagai Tamu</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
        </div>
      ) : (
        <div className="mb-8 p-4 bg-green-50 border border-green-100 rounded-lg flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center text-green-800">
               {currentUser.user_metadata?.avatar_url ? (
                  <img src={currentUser.user_metadata.avatar_url} alt="avatar" className="w-full h-full rounded-full" />
               ) : <IconUser />}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{currentUser.user_metadata?.full_name}</p>
              <p className="text-xs text-gray-500">Masuk sebagai User</p>
            </div>
          </div>
          <button onClick={handleLogout} className="text-xs font-bold text-red-600 hover:underline">Keluar</button>
        </div>
      )}

      {/* FORM INPUT */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-12 relative">
        {!currentUser && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" placeholder="Nama Lengkap*" value={name} onChange={(e) => setName(e.target.value)} 
              className="w-full border border-gray-200 p-3.5 text-sm bg-gray-50 focus:bg-white focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none rounded-md transition-all" required 
            />
            <input 
              type="email" placeholder="Alamat Email*" value={email} onChange={(e) => setEmail(e.target.value)} 
              className="w-full border border-gray-200 p-3.5 text-sm bg-gray-50 focus:bg-white focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none rounded-md transition-all" required 
            />
          </div>
        )}
        <textarea 
          placeholder="Tulis pendapat atau pertanyaan Anda di sini..." 
          rows={4} value={comment} onChange={(e) => setComment(e.target.value)}
          className="w-full border border-gray-200 p-4 text-sm bg-gray-50 focus:bg-white focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none rounded-md transition-all resize-y" required 
        />
        
        <div className="flex justify-end">
          <button 
            disabled={loading} type="submit" 
            className={`flex items-center justify-center min-w-[180px] bg-green-700 text-white px-8 py-3.5 text-sm font-bold hover:bg-green-800 transition-colors uppercase tracking-widest rounded-md ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : 'Kirim Komentar'}
          </button>
        </div>
      </form>

      {/* DAFTAR KOMENTAR */}
      <div className="space-y-6">
        {comments.length === 0 ? (
           <p className="text-gray-400 text-sm italic text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">Belum ada komentar. Jadilah yang pertama berdiskusi!</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="flex gap-4 border-b border-gray-100 pb-6 last:border-0">
              <div className="w-10 h-10 shrink-0 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                {/* Fallback inisial nama jika tidak ada avatar */}
                <span className="font-bold text-sm uppercase">{c.author_name.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <h4 className="font-bold text-gray-900 text-sm capitalize">{c.author_name}</h4>
                  <span className="text-[10px] text-gray-400 font-medium">• {new Date(c.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{c.content}</p>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
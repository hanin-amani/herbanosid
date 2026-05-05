import Image from 'next/image';
import { MessageSquare } from 'lucide-react';

export default function HybridSection({ title }: { title: string }) {
  return (
    <section className="mb-12">
      <div className="border-b-2 border-green-700 mb-6 flex">
        <h2 className="bg-green-700 text-white px-4 py-1.5 font-bold text-sm uppercase">{title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="relative h-64 mb-4">
            <Image src="https://images.unsplash.com/photo-1610832958506-aa56368176cf" alt="Main" fill className="object-cover" />
          </div>
          <h3 className="text-xl font-bold mb-2 hover:text-green-700 cursor-pointer line-clamp-2">7 Buah yang Harus Dikonsumsi untuk Kesehatan Mata Anda</h3>
          <p className="text-xs text-gray-400 mb-3 flex items-center gap-4">
            <span>Admin - 18 Maret 2024</span>
            <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3"/> 0</span>
          </p>
          <p className="text-sm text-gray-600 italic line-clamp-3">Ringkasan artikel herbanos yang bermanfaat bagi kesehatan mata...</p>
        </div>
        <div className="flex flex-col gap-4">
          {[1,2,3,4].map((i) => (
            <div key={i} className="flex gap-3 items-start group cursor-pointer">
               <div className="relative w-24 h-16 shrink-0 bg-gray-200">
                 <Image src={`https://picsum.photos/seed/${i}/200`} alt="thumb" fill className="object-cover" />
               </div>
               <div>
                 <h4 className="text-sm font-bold leading-tight group-hover:text-green-700">Pola Makan Sehat Sangat Penting Bagi Anda</h4>
                 <p className="text-[10px] text-gray-400 mt-1">12 April 2024</p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
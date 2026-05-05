import Image from 'next/image';

interface Post {
  title: string;
  category: string;
  image: string;
  date: string;
}

export default function FeaturedGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 mb-10 h-auto lg:h-[500px]">
      {/* Utama (Kiri) */}
      <div className="lg:col-span-2 relative group overflow-hidden cursor-pointer h-[300px] lg:h-full">
        <Image src={posts[0].image} alt="Featured" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent p-6 flex flex-col justify-end">
          <span className="bg-green-700 text-white text-[10px] px-2 py-0.5 w-fit mb-2 font-bold">{posts[0].category}</span>
          <h2 className="text-white text-2xl font-bold leading-tight group-hover:underline">{posts[0].title}</h2>
          <p className="text-gray-300 text-xs mt-2 italic">Admin - {posts[0].date}</p>
        </div>
      </div>
      {/* Grid Samping (Kanan) */}
      <div className="lg:col-span-2 grid grid-cols-2 gap-2">
        {posts.slice(1, 5).map((post, i) => (
          <div key={i} className="relative group overflow-hidden cursor-pointer h-[150px] lg:h-auto">
            <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent p-3 flex flex-col justify-end">
              <span className="bg-black/50 text-white text-[9px] px-1.5 py-0.5 w-fit mb-1 font-bold">{post.category}</span>
              <h3 className="text-white text-xs font-bold leading-tight line-clamp-2">{post.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
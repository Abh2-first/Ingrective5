import Link from 'next/link';

export default function Navbar(){
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-20">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-green-600">Ingrec­tive</div>
        <div className="flex gap-4">
          <Link href="/"><a className="px-3 py-2 rounded hover:bg-gray-50">Home</a></Link>
          <Link href="/scan"><a className="px-3 py-2 rounded bg-green-500 text-white">Scan</a></Link>
          <Link href="/profile"><a className="px-3 py-2 rounded hover:bg-gray-50">Profile</a></Link>
        </div>
      </div>
    </nav>
  );
}

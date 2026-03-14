import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-black text-white">
      <h2 className="text-4xl font-space font-bold mb-4">404 - Not Found</h2>
      <p className="text-brand-gray mb-8">Could not find requested resource</p>
      <Link href="/" className="px-6 py-3 bg-brand-blue text-brand-black font-medium rounded-full hover:bg-brand-blue/90 transition-colors">
        Return Home
      </Link>
    </div>
  );
}
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold text-blue-700 mb-4">
          College Discovery Platform
        </h1>

        <p className="text-lg text-gray-700 mb-8">
          Find, compare and explore colleges across India.
        </p>

        <div className="flex gap-4">
          <Link
            href="/colleges"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Browse Colleges
          </Link>

          <Link
            href="/compare"
            className="bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Compare Colleges
          </Link>
        </div>
      </div>
    </main>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import { colleges } from "../data/colleges";

export default function CollegesPage() {
  const [search, setSearch] = useState("");

  const filtered = colleges.filter((college) =>
    college.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-6">
        Colleges
      </h1>

      <input
        type="text"
        placeholder="Search colleges..."
        className="border p-3 rounded w-full mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid gap-4">
        {filtered.map((college) => (
          <div
            key={college.id}
            className="bg-white p-4 rounded shadow"
          >
            <h2 className="text-2xl font-semibold">
              {college.name}
            </h2>

            <p>Location: {college.location}</p>
            <p>Fees: {college.fees}</p>
            <p>Rating: {college.rating}</p>

            <Link
              href={`/colleges/${college.id}`}
              className="text-blue-600"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
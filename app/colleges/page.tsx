"use client";

import { colleges } from "../data/colleges";
import Link from "next/link";
import { useState } from "react";

export default function CollegesPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  const filtered = colleges
    .filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.location.toLowerCase().includes(search.toLowerCase()) ||
        c.type.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "placements") return parseInt(b.placements) - parseInt(a.placements);
      if (sortBy === "fees-asc")
        return parseInt(a.fees.replace(/[^0-9]/g, "")) - parseInt(b.fees.replace(/[^0-9]/g, ""));
      if (sortBy === "fees-desc")
        return parseInt(b.fees.replace(/[^0-9]/g, "")) - parseInt(a.fees.replace(/[^0-9]/g, ""));
      return 0;
    });

  return (
    <main>
      {/* Page Header */}
      <div className="bg-white border-b px-6 py-8" style={{ borderColor: "var(--card-border)" }}>
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display text-4xl font-bold" style={{ color: "var(--ink)" }}>
            Browse Colleges
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--ink3)" }}>
            Explore {colleges.length} top engineering institutions across India
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Search + Sort */}
        <div className="flex gap-3 mb-8 flex-wrap">
          <div className="relative flex-1 min-w-60">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg" style={{ color: "var(--ink3)" }}>
              🔍
            </span>
            <input
              type="text"
              placeholder="Search by name, city, or type…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full border text-sm outline-none transition-colors bg-white"
              style={{
                borderColor: "var(--card-border)",
                color: "var(--ink)",
                fontFamily: "inherit",
              }}
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-5 py-3 rounded-full border text-sm bg-white outline-none cursor-pointer"
            style={{ borderColor: "var(--card-border)", color: "var(--ink)", fontFamily: "inherit" }}
          >
            <option value="rating">Sort: Rating</option>
            <option value="placements">Sort: Placements</option>
            <option value="fees-asc">Sort: Fees (Low → High)</option>
            <option value="fees-desc">Sort: Fees (High → Low)</option>
          </select>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20" style={{ color: "var(--ink3)" }}>
            <p className="text-4xl mb-3">🏫</p>
            <p className="text-base">No colleges match your search.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((college) => (
              <Link
                key={college.id}
                href={`/colleges/${college.id}`}
                className="bg-white rounded-2xl overflow-hidden transition-all hover:-translate-y-1 group"
                style={{ border: "1px solid var(--card-border)", textDecoration: "none" }}
              >
                {/* Card top */}
                <div className="p-6 pb-4">
                  <span
                    className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mb-3"
                    style={{ background: "#eef2fb", color: "var(--accent)" }}
                  >
                    {college.type}
                  </span>
                  <h2 className="font-display text-xl font-medium leading-tight mb-2" style={{ color: "var(--ink)" }}>
                    {college.name}
                  </h2>
                  <p className="text-sm flex items-center gap-1" style={{ color: "var(--ink3)" }}>
                    📍 {college.location}
                  </p>
                </div>

                {/* Divider */}
                <div style={{ height: "1px", background: "var(--card-border)", margin: "0 1.5rem" }} />

                {/* Stats row */}
                <div className="flex gap-5 px-6 py-4">
                  {[
                    { val: college.rating, key: "Rating" },
                    { val: college.placements, key: "Placed" },
                    { val: college.fees, key: "Fees/yr" },
                  ].map(({ val, key }) => (
                    <div key={key}>
                      <p className="text-base font-medium" style={{ color: "var(--ink)" }}>{val}</p>
                      <p className="text-xs uppercase tracking-wide mt-0.5" style={{ color: "var(--ink3)" }}>{key}</p>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-6 pb-5">
                  <div className="flex gap-1.5 flex-wrap">
                    {college.courses.slice(0, 2).map((c) => (
                      <span
                        key={c}
                        className="px-2 py-0.5 rounded-md text-xs font-medium"
                        style={{ background: "#f0f7f4", color: "var(--green)" }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: "var(--accent)" }}>
                    View →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import { colleges } from "../data/colleges";

export default function ComparePage() {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");

  const c1 = colleges.find((c) => c.id.toString() === first);
  const c2 = colleges.find((c) => c.id.toString() === second);

  const feesNum = (fees: string) => parseInt(fees.replace(/[^0-9]/g, ""));

  const winner = (valA: number, valB: number, lowerIsBetter = false) => {
    if (valA === valB) return "tie";
    if (lowerIsBetter) return valA < valB ? "a" : "b";
    return valA > valB ? "a" : "b";
  };

  const rows = c1 && c2
    ? [
        { label: "Type", a: c1.type, b: c2.type, wKey: null },
        { label: "Location", a: c1.location, b: c2.location, wKey: null },
        {
          label: "Rating",
          a: `${c1.rating} ★`,
          b: `${c2.rating} ★`,
          wKey: winner(c1.rating, c2.rating),
        },
        {
          label: "Placements",
          a: c1.placements,
          b: c2.placements,
          wKey: winner(parseInt(c1.placements), parseInt(c2.placements)),
        },
        {
          label: "Annual Fees",
          a: c1.fees,
          b: c2.fees,
          wKey: winner(feesNum(c1.fees), feesNum(c2.fees), true),
        },
        {
          label: "Courses",
          a: c1.courses.join(", "),
          b: c2.courses.join(", "),
          wKey: null,
        },
      ]
    : [];

  return (
    <main>
      {/* Header */}
      <div className="bg-white border-b px-6 py-8" style={{ borderColor: "var(--card-border)" }}>
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-4xl font-bold" style={{ color: "var(--ink)" }}>
            Compare Colleges
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--ink3)" }}>
            Pick two colleges to see a head-to-head breakdown
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Selectors */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {[
            { label: "First College", val: first, set: setFirst },
            { label: "Second College", val: second, set: setSecond },
          ].map(({ label, val, set }) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-5"
              style={{ border: "1.5px solid var(--card-border)" }}
            >
              <p
                className="text-xs uppercase tracking-widest font-medium mb-3"
                style={{ color: "var(--ink3)" }}
              >
                {label}
              </p>
              <select
                value={val}
                onChange={(e) => set(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none cursor-pointer"
                style={{
                  border: "1.5px solid var(--card-border)",
                  background: "var(--cream)",
                  color: "var(--ink)",
                  fontFamily: "inherit",
                }}
              >
                <option value="">— Select a college —</option>
                {colleges.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* VS divider */}
        {c1 && c2 && (
          <div className="flex items-center gap-4 mb-6">
            <div style={{ flex: 1, height: "1px", background: "var(--card-border)" }} />
            <span
              className="px-4 py-1.5 rounded-full text-xs font-medium tracking-widest"
              style={{ background: "var(--ink)", color: "white" }}
            >
              VS
            </span>
            <div style={{ flex: 1, height: "1px", background: "var(--card-border)" }} />
          </div>
        )}

        {/* Comparison table */}
        {c1 && c2 ? (
          <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid var(--card-border)" }}>
            <table className="w-full border-collapse">
              <thead>
                <tr style={{ background: "#f8f9fb", borderBottom: "1px solid var(--card-border)" }}>
                  <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider" style={{ color: "var(--ink3)", width: "28%" }}>
                    Metric
                  </th>
                  <th className="px-5 py-4 text-left font-display text-base font-medium" style={{ color: "var(--accent)" }}>
                    {c1.name}
                  </th>
                  <th className="px-5 py-4 text-left font-display text-base font-medium" style={{ color: "var(--accent)" }}>
                    {c2.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ label, a, b, wKey }) => (
                  <tr
                    key={label}
                    className="transition-colors hover:bg-[#faf9ff]"
                    style={{ borderBottom: "1px solid var(--card-border)" }}
                  >
                    <td
                      className="px-5 py-4 text-xs font-medium uppercase tracking-wide"
                      style={{ color: "var(--ink3)" }}
                    >
                      {label}
                    </td>
                    <td
                      className="px-5 py-4 text-sm"
                      style={{ color: wKey === "a" ? "var(--green)" : "var(--ink)", fontWeight: wKey === "a" ? 500 : 400 }}
                    >
                      {wKey === "a" && <span className="mr-1">✓</span>}
                      {a}
                    </td>
                    <td
                      className="px-5 py-4 text-sm"
                      style={{ color: wKey === "b" ? "var(--green)" : "var(--ink)", fontWeight: wKey === "b" ? 500 : 400 }}
                    >
                      {wKey === "b" && <span className="mr-1">✓</span>}
                      {b}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-20" style={{ color: "var(--ink3)" }}>
            <p className="text-5xl mb-4">⚖️</p>
            <p className="text-base">Select two colleges above to compare them side by side.</p>
          </div>
        )}
      </div>
    </main>
  );
}

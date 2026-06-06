"use client";

import { useState } from "react";
import { colleges } from "../data/colleges";

export default function ComparePage() {
  const [college1, setCollege1] = useState(colleges[0]);
  const [college2, setCollege2] = useState(colleges[1]);

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">
        Compare Colleges
      </h1>

      <div className="flex gap-4 mb-8">
        <select
          className="border p-2 rounded"
          onChange={(e) =>
            setCollege1(
              colleges.find(
                (c) => c.id === Number(e.target.value)
              ) || colleges[0]
            )
          }
        >
          {colleges.map((college) => (
            <option key={college.id} value={college.id}>
              {college.name}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          onChange={(e) =>
            setCollege2(
              colleges.find(
                (c) => c.id === Number(e.target.value)
              ) || colleges[1]
            )
          }
        >
          {colleges.map((college) => (
            <option key={college.id} value={college.id}>
              {college.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold">
            {college1.name}
          </h2>

          <p>Location: {college1.location}</p>
          <p>Fees: {college1.fees}</p>
          <p>Rating: {college1.rating}</p>
          <p>Placements: {college1.placements}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold">
            {college2.name}
          </h2>

          <p>Location: {college2.location}</p>
          <p>Fees: {college2.fees}</p>
          <p>Rating: {college2.rating}</p>
          <p>Placements: {college2.placements}</p>
        </div>
      </div>
    </main>
  );
}
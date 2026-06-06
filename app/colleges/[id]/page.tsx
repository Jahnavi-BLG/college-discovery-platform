import Link from "next/link";
import { notFound } from "next/navigation";

interface College {
  id: number;
  name: string;
  location: string;
  fees: string;
  rating: number;
  placements: string;
  courses: string[];
  reviews: string;
  type: string;
}

async function getCollege(id: string): Promise<College | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/colleges/${id}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function CollegeDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const college = await getCollege(id);

  if (!college) return notFound();

  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      <Link
        href="/colleges"
        className="inline-flex items-center gap-1.5 text-sm mb-6"
        style={{ color: "var(--ink3)" }}
      >
        ← Back to browse
      </Link>

      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid var(--card-border)" }}>
        {/* Hero */}
        <div
          className="px-8 py-10"
          style={{ background: "linear-gradient(135deg, #1a1a2e, #2d4a8a)" }}
        >
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
            style={{ background: "rgba(255,255,255,0.15)", color: "white" }}
          >
            {college.type}
          </span>
          <h1 className="font-display text-4xl font-bold text-white leading-tight mb-2">
            {college.name}
          </h1>
          <p className="text-base flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.65)" }}>
            📍 {college.location}
          </p>
        </div>

        {/* Metrics */}
        <div
          className="grid grid-cols-3"
          style={{ borderBottom: "1px solid var(--card-border)", background: "var(--card-border)", gap: "1px" }}
        >
          {[
            { val: `${college.rating}/5`, label: "Overall Rating" },
            { val: college.placements, label: "Placement Rate" },
            { val: college.fees, label: "Annual Fees" },
          ].map(({ val, label }) => (
            <div key={label} className="bg-white text-center py-6 px-4">
              <p className="font-display text-3xl font-bold" style={{ color: "var(--accent)" }}>{val}</p>
              <p className="text-xs uppercase tracking-widest mt-1" style={{ color: "var(--ink3)" }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Courses */}
          <div>
            <p
              className="text-xs uppercase tracking-widest font-medium mb-4"
              style={{ color: "var(--accent2)" }}
            >
              Programmes Offered
            </p>
            <div className="flex flex-col gap-2">
              {college.courses.map((course) => (
                <div
                  key={course}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
                  style={{ background: "#f8f9fb", color: "var(--ink)" }}
                >
                  🎓 {course}
                </div>
              ))}
            </div>
          </div>

          {/* Review */}
          <div>
            <p
              className="text-xs uppercase tracking-widest font-medium mb-4"
              style={{ color: "var(--accent2)" }}
            >
              Student Review
            </p>
            <blockquote
              className="rounded-xl p-5 text-base leading-relaxed italic"
              style={{
                background: "#fffdf7",
                borderLeft: "3px solid var(--accent2)",
                color: "var(--ink2)",
              }}
            >
              &ldquo;{college.reviews}&rdquo;
            </blockquote>
            <Link
              href="/compare"
              className="inline-block mt-5 px-6 py-2.5 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: "var(--accent2)" }}
            >
              Compare this college
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

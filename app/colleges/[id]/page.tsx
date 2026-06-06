import { colleges } from "../../data/colleges";

export default async function CollegeDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const college = colleges.find(
    (c) => c.id === Number(id)
  );

  if (!college) {
    return <h1>College not found</h1>;
  }

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-4">
        {college.name}
      </h1>

      <p className="mb-2">
        📍 {college.location}
      </p>

      <p className="mb-2">
        💰 {college.fees}
      </p>

      <p className="mb-2">
        ⭐ {college.rating}
      </p>

      <p className="mb-2">
        🎯 Placements: {college.placements}
      </p>

      <div className="mt-4">
        <h2 className="text-2xl font-semibold">
          Courses
        </h2>

        <ul className="list-disc pl-6">
          {college.courses.map((course) => (
            <li key={course}>{course}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h2 className="text-2xl font-semibold">
          Reviews
        </h2>

        <p>{college.reviews}</p>
      </div>
    </main>
  );
}
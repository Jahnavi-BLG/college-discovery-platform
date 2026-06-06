import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "rating";

  const colleges = await prisma.college.findMany({
    where: search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { location: { contains: search, mode: "insensitive" } },
            { type: { contains: search, mode: "insensitive" } },
          ],
        }
      : undefined,
  });

  // Sort in-memory since fees parsing requires JS
  const sorted = [...colleges].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "placements")
      return parseInt(b.placements) - parseInt(a.placements);
    if (sortBy === "fees-asc")
      return (
        parseInt(a.fees.replace(/[^0-9]/g, "")) -
        parseInt(b.fees.replace(/[^0-9]/g, ""))
      );
    if (sortBy === "fees-desc")
      return (
        parseInt(b.fees.replace(/[^0-9]/g, "")) -
        parseInt(a.fees.replace(/[^0-9]/g, ""))
      );
    return 0;
  });

  return NextResponse.json(sorted);
}

import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { seedColleges } from "../../data/seed";

export async function GET() {
  await prisma.college.createMany({
    data: seedColleges,
    skipDuplicates: true,
  });

  return NextResponse.json({
    message: "Database seeded successfully",
  });
}
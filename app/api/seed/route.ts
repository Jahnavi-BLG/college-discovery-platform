import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { seedColleges } from "../../data/seed";

export async function GET() {
  for (const college of seedColleges) {
    await prisma.college.upsert({
      where: { name: college.name },
      update: college,
      create: college,
    });
  }

  return NextResponse.json({
    message: `Database seeded with ${seedColleges.length} colleges`,
  });
}

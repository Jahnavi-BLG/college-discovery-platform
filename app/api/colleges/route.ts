import { NextResponse } from "next/server";
import { colleges } from "../../data/colleges";

export async function GET() {
  return NextResponse.json(colleges);
}
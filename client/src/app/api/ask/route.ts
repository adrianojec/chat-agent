import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const apiResponse = await fetch(`${BACKEND_URL}/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await apiResponse.json();

    return NextResponse.json(data, {
      status: apiResponse.status,
    });
  } catch (error) {
    return NextResponse.json("Failed to fetch data", {
      status: 500,
    });
  }
};

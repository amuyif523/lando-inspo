import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  modules?: string[];
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();
    const modules = Array.isArray(body.modules) ? body.modules : [];

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
    }

    const payload = {
      name,
      email,
      message,
      modules,
      receivedAt: new Date().toISOString(),
    };

    console.info("Contact submission received:", payload);

    return NextResponse.json({ ok: true, received: payload });
  } catch (error) {
    console.error("Contact submission failed:", error);
    return NextResponse.json({ error: "Unable to submit contact form right now." }, { status: 500 });
  }
}

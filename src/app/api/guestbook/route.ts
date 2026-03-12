import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { name, message } = await req.json();

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message are required" },
        { status: 400 }
      );
    }

    // Ensure strings are reasonable length
    const cleanName = String(name).slice(0, 50);
    const cleanMessage = String(message).slice(0, 250);

    const entry = {
      id: crypto.randomUUID(),
      name: cleanName,
      message: cleanMessage,
      createdAt: Date.now(),
    };

    // Store in a Redis List (lpush adds to the start)
    await redis.lpush("guestbook_messages", JSON.stringify(entry));

    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    console.error("Guestbook POST error:", error);
    return NextResponse.json(
      { error: "Failed to post message" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Fetch the last 50 messages from the Redis List (0 to 49)
    const messages = await redis.lrange("guestbook_messages", 0, 49);

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("Guestbook GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

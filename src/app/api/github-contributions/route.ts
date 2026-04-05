import { NextResponse } from "next/server";

const GITHUB_USERNAME = "ritikkumar27";

const QUERY = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN not configured" },
      { status: 503 }
    );
  }

  const from = new Date("2026-01-01T00:00:00Z");
  const to = new Date("2026-12-31T23:59:59Z");

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: {
          username: GITHUB_USERNAME,
          from: from.toISOString(),
          to: to.toISOString(),
        },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`GitHub API responded with ${res.status}`);
    }

    const json = await res.json();

    if (json.errors) {
      throw new Error(json.errors[0]?.message ?? "GraphQL error");
    }

    const calendar =
      json.data?.user?.contributionsCollection?.contributionCalendar;

    return NextResponse.json({
      total: calendar.totalContributions,
      weeks: calendar.weeks,
    });
  } catch (err) {
    console.error("GitHub contributions fetch failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch contributions" },
      { status: 500 }
    );
  }
}

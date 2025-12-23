import { NextRequest, NextResponse } from "next/server";
import {
  saveTripToDb,
  getUserTripsFromDb,
  getTripByIdFromDb,
  deleteTripFromDb,
} from "@/lib/tripServiceDb";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const tripId = searchParams.get("tripId");

    if (tripId) {
      // Ambil trip by id
      const trip = await getTripByIdFromDb(tripId);
      if (!trip) {
        return NextResponse.json({ error: "Trip not found" }, { status: 404 });
      }
      return NextResponse.json(trip);
    }

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    // Ambil semua trip
    const trips = await getUserTripsFromDb(userId);
    return NextResponse.json(trips);
  } catch (error) {
    console.error("Error in trips GET:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { finalResponse, userId, destination } = body;

    if (!finalResponse || !userId || !destination) {
      console.error("Missing required fields:", {
        finalResponse: !!finalResponse,
        userId,
        destination,
      });
      return NextResponse.json(
        {
          error: "Missing required fields: finalResponse, userId, destination",
        },
        { status: 400 }
      );
    }

    const savedTrip = await saveTripToDb(finalResponse, userId, destination);
    return NextResponse.json(savedTrip);
  } catch (error) {
    console.error("Error in trips POST:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tripId = searchParams.get("tripId");
    const userId = searchParams.get("userId");

    if (!tripId || !userId) {
      return NextResponse.json(
        { error: "Trip ID and User ID required" },
        { status: 400 }
      );
    }

    const success = await deleteTripFromDb(tripId, userId);
    if (!success) {
      return NextResponse.json(
        { error: "Failed to delete trip" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in trips DELETE:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

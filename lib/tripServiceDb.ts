import { PrismaClient } from "@prisma/client";
import { FinalResponse } from "./types/FinalResponse";

const prisma = new PrismaClient();

// user dummy exists
async function ensureUserExists(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    // buat user dummy jika belum ada
    await prisma.user.create({
      data: {
        id: userId,
        email: `${userId}@temp.com`,
        name: "Temporary User",
      },
    });
  }
}

export interface TripData {
  tripId: string;
  title: string;
  createdAt: Date;
  fullTripData: FinalResponse;
  userId: string;
}

interface TripDetailData extends FinalResponse {
  destination: string;
  savedAt: string;
}

// simpan final response AI ke database (server-side)
export async function saveTripToDb(
  finalResponse: FinalResponse,
  userId: string,
  destination: string
): Promise<TripData> {
  try {
    // pastikan user exists di database
    await ensureUserExists(userId);

    // generate title dari destination dan tanggal
    const title = `Trip ke ${destination}`;

    const tripDetail = await prisma.tripDetail.create({
      data: {
        tripDetail: JSON.parse(
          JSON.stringify({
            ...finalResponse,
            destination,
            savedAt: new Date().toISOString(),
          })
        ),
        userId,
      },
    });

    const tripData = tripDetail.tripDetail as unknown as TripDetailData;

    return {
      tripId: tripDetail.tripId,
      title,
      createdAt: new Date(tripData.savedAt),
      fullTripData: finalResponse,
      userId,
    };
  } catch (error) {
    console.error("Error saving trip:", error);
    throw new Error(
      "Failed to save trip: " +
        (error instanceof Error ? error.message : String(error))
    );
  }
}

// ambil semua histori trip user untuk sidebar
export async function getUserTripsFromDb(userId: string): Promise<TripData[]> {
  try {
    const tripDetails = await prisma.tripDetail.findMany({
      where: {
        userId,
      },
      orderBy: {
        tripId: "desc",
      },
    });

    return tripDetails.map((trip) => {
      // extract destination dari tripDetail atau gunakan fallback
      const tripData = trip.tripDetail as unknown as TripDetailData;
      const destination = tripData.destination || "Unknown Destination";

      return {
        tripId: trip.tripId,
        title: `Trip ke ${destination}`,
        createdAt: new Date(tripData.savedAt || new Date()),
        fullTripData: tripData as FinalResponse,
        userId: trip.userId,
      };
    });
  } catch (error) {
    console.error("Error fetching user trips:", error);
    throw new Error("Failed to fetch trips");
  }
}

// ambil detail trip berdasarkan ID
export async function getTripByIdFromDb(
  tripId: string
): Promise<TripData | null> {
  try {
    const trip = await prisma.tripDetail.findUnique({
      where: {
        tripId,
      },
    });

    if (!trip) return null;

    const tripData = trip.tripDetail as unknown as TripDetailData;
    const destination = tripData.destination || "Unknown Destination";

    return {
      tripId: trip.tripId,
      title: `Trip ke ${destination}`,
      createdAt: new Date(tripData.savedAt || new Date()),
      fullTripData: tripData as FinalResponse,
      userId: trip.userId,
    };
  } catch (error) {
    console.error("Error fetching trip by ID:", error);
    return null;
  }
}

// hapus trip berdasarkan ID
export async function deleteTripFromDb(
  tripId: string,
  userId: string
): Promise<boolean> {
  try {
    await prisma.tripDetail.delete({
      where: {
        tripId,
        userId, // pastikan user hanya bisa hapus trip sendiri
      },
    });
    return true;
  } catch (error) {
    console.error("Error deleting trip:", error);
    return false;
  }
}

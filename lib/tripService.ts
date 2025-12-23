import { FinalResponse } from "./types/FinalResponse";

export interface TripData {
  tripId: string;
  title: string;
  createdAt: Date;
  fullTripData: FinalResponse;
  userId: string;
}

// simpan final response AI ke database 
export async function saveTrip(
  finalResponse: FinalResponse,
  userId: string,
  destination: string
): Promise<TripData> {
  try {
    const response = await fetch("/api/trips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        finalResponse,
        userId,
        destination,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to save trip");
    }

    const data = await response.json();

    return {
      ...data,
      createdAt: new Date(data.createdAt),
    };
  } catch (error) {
    console.error("Error saving trip:", error);
    throw new Error("Failed to save trip");
  }
}

// ambil semua histori trip user untuk sidebar
export async function getUserTrips(userId: string): Promise<TripData[]> {
  try {
    const response = await fetch(`/api/trips?userId=${userId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch trips");
    }

    const data = await response.json();

    return data.map((trip: TripData) => ({
      ...trip,
      createdAt: new Date(trip.createdAt),
    }));
  } catch (error) {
    console.error("Error fetching user trips:", error);
    return [];
  }
}

// ambil detail trip berdasarkan ID 
export async function getTripById(tripId: string): Promise<TripData | null> {
  try {
    const response = await fetch(`/api/trips?tripId=${tripId}`);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return {
      ...data,
      createdAt: new Date(data.createdAt),
    };
  } catch (error) {
    console.error("Error fetching trip by ID:", error);
    return null;
  }
}

// hapus trip berdasarkan ID 
export async function deleteTrip(
  tripId: string,
  userId: string
): Promise<boolean> {
  try {
    const response = await fetch(
      `/api/trips?tripId=${tripId}&userId=${userId}`,
      {
        method: "DELETE",
      }
    );

    return response.ok;
  } catch (error) {
    console.error("Error deleting trip:", error);
    return false;
  }
}

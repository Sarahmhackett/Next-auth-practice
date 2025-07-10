import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Workout from "@/models/Workout";
import dbConnect from "@/lib/dbConnect";

export async function POST(req) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  let userId;

  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  } else {
    userId = session.user.id;
  }

  try {
    const body = await req.json();
    console.log("body: ", body);

    const newWorkout = new Workout({
      user: userId,
      date: body.date,
      exercises: body.exercises,
    });

    await newWorkout.save();
    return new Response(JSON.stringify(newWorkout), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Workout save error:", error);
    return new Response("Failed to save workout", { status: 500 });
  }
}

import { db } from "./index";
import { INITIAL_EXERCISES } from "@/data/exercises";

export async function seedDatabase() {
  const exerciseCount = await db.exercises.count();
  
  if (exerciseCount === 0) {
    console.log("Seeding database with initial exercises...");
    try {
      await db.exercises.bulkAdd(INITIAL_EXERCISES);
      console.log("Database seeded successfully!");
    } catch (error) {
      console.error("Error seeding database:", error);
    }
  } else {
    console.log("Database already contains exercises, skipping seed.");
  }
}

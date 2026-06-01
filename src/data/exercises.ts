import { MuscleGroup, Equipment, MovementPattern, type Exercise } from "@/lib/db/types";

export const INITIAL_EXERCISES: Exercise[] = [
  // --- CHEST ---
  {
    name: "Barbell Bench Press",
    primaryMuscles: [MuscleGroup.Chest],
    secondaryMuscles: [MuscleGroup.Shoulders, MuscleGroup.Triceps],
    equipment: [Equipment.Barbell],
    movementPattern: MovementPattern.HorizontalPush,
    defaultSets: 3,
    defaultRepRange: { min: 5, max: 8 },
    defaultRestSeconds: 180,
    formCues: [
      "Keep feet planted firmly on the floor",
      "Retract shoulder blades into the bench",
      "Lower bar to mid-chest level",
      "Drive the bar up while keeping elbows at ~45 degrees"
    ],
    commonMistakes: [
      "Bouncing the bar off the chest",
      "Flaring elbows out too wide",
      "Lifting hips off the bench"
    ],
    isCustom: false,
    isFavorite: true,
    tags: ["chest", "push", "compound", "strength"]
  },
  {
    name: "Dumbbell Incline Bench Press",
    primaryMuscles: [MuscleGroup.Chest],
    secondaryMuscles: [MuscleGroup.Shoulders, MuscleGroup.Triceps],
    equipment: [Equipment.Dumbbell],
    movementPattern: MovementPattern.HorizontalPush,
    defaultSets: 3,
    defaultRepRange: { min: 8, max: 12 },
    defaultRestSeconds: 90,
    formCues: [
      "Set bench to 30-45 degree incline",
      "Press dumbbells directly over shoulders",
      "Lower dumbbells until they are level with your chest"
    ],
    commonMistakes: [
      "Bench angle too steep (targets shoulders too much)",
      "Clanging dumbbells at the top"
    ],
    isCustom: false,
    isFavorite: false,
    tags: ["chest", "upper chest", "hypertrophy"]
  },
  {
    name: "Cable Crossover",
    primaryMuscles: [MuscleGroup.Chest],
    secondaryMuscles: [MuscleGroup.Shoulders],
    equipment: [Equipment.Cable],
    movementPattern: MovementPattern.Isolation,
    defaultSets: 3,
    defaultRepRange: { min: 12, max: 15 },
    defaultRestSeconds: 60,
    formCues: [
      "Maintain a slight bend in the elbows",
      "Squeeze chest at the center of the movement",
      "Control the weight on the way back"
    ],
    commonMistakes: [
      "Using too much momentum",
      "Pressing the weight instead of flying it"
    ],
    isCustom: false,
    isFavorite: false,
    tags: ["chest", "isolation", "pump"]
  },

  // --- BACK ---
  {
    name: "Barbell Deadlift",
    primaryMuscles: [MuscleGroup.Back, MuscleGroup.Hamstrings, MuscleGroup.Glutes],
    secondaryMuscles: [MuscleGroup.Traps, MuscleGroup.Forearms],
    equipment: [Equipment.Barbell],
    movementPattern: MovementPattern.Hinge,
    defaultSets: 3,
    defaultRepRange: { min: 3, max: 5 },
    defaultRestSeconds: 180,
    formCues: [
      "Maintain a neutral spine throughout",
      "Keep the bar close to your shins",
      "Drive through your heels",
      "Engage your lats to keep the bar tight"
    ],
    commonMistakes: [
      "Rounding the lower back",
      "Hips rising too fast",
      "Hyperextending at the top"
    ],
    isCustom: false,
    isFavorite: true,
    tags: ["back", "legs", "compound", "strength", "power"]
  },
  {
    name: "Pull-Up",
    primaryMuscles: [MuscleGroup.Back],
    secondaryMuscles: [MuscleGroup.Biceps, MuscleGroup.Shoulders],
    equipment: [Equipment.PullUpBar],
    movementPattern: MovementPattern.VerticalPull,
    defaultSets: 3,
    defaultRepRange: { min: 8, max: 12 },
    defaultRestSeconds: 120,
    formCues: [
      "Start from a dead hang",
      "Pull chest to the bar",
      "Squeeze shoulder blades together at the top",
      "Lower under control"
    ],
    commonMistakes: [
      "Kipping or using momentum",
      "Not using full range of motion",
      "Shoulders shrugging at the top"
    ],
    isCustom: false,
    isFavorite: true,
    tags: ["back", "biceps", "bodyweight", "compound"]
  },
  {
    name: "Seated Cable Row",
    primaryMuscles: [MuscleGroup.Back],
    secondaryMuscles: [MuscleGroup.Biceps, MuscleGroup.Traps],
    equipment: [Equipment.Cable, Equipment.SeatedRowMachine],
    movementPattern: MovementPattern.HorizontalPull,
    defaultSets: 3,
    defaultRepRange: { min: 10, max: 12 },
    defaultRestSeconds: 90,
    formCues: [
      "Keep back straight and chest up",
      "Pull handle towards your midsection",
      "Squeeze lats and mid-back at the peak"
    ],
    commonMistakes: [
      "Leaning too far back",
      "Using momentum to pull",
      "Shrugging shoulders up"
    ],
    isCustom: false,
    isFavorite: false,
    tags: ["back", "thickness", "hypertrophy"]
  },

  // --- LEGS ---
  {
    name: "Barbell Back Squat",
    primaryMuscles: [MuscleGroup.Quads, MuscleGroup.Glutes],
    secondaryMuscles: [MuscleGroup.Hamstrings, MuscleGroup.Back],
    equipment: [Equipment.Barbell],
    movementPattern: MovementPattern.Squat,
    defaultSets: 3,
    defaultRepRange: { min: 5, max: 8 },
    defaultRestSeconds: 180,
    formCues: [
      "Bar across upper traps (high bar) or rear delts (low bar)",
      "Drive knees out in line with toes",
      "Maintain a tight core",
      "Hit depth (crease of hip below knee)"
    ],
    commonMistakes: [
      "Knees caving in (valgus)",
      "Heels lifting off the floor",
      "Rounding the lower back"
    ],
    isCustom: false,
    isFavorite: true,
    tags: ["legs", "quads", "compound", "strength"]
  },
  {
    name: "Romanian Deadlift",
    primaryMuscles: [MuscleGroup.Hamstrings, MuscleGroup.Glutes],
    secondaryMuscles: [MuscleGroup.Back],
    equipment: [Equipment.Barbell, Equipment.Dumbbell],
    movementPattern: MovementPattern.Hinge,
    defaultSets: 3,
    defaultRepRange: { min: 8, max: 12 },
    defaultRestSeconds: 120,
    formCues: [
      "Push hips back until you feel a stretch in hamstrings",
      "Keep the weight close to your legs",
      "Maintain a neutral spine",
      "Stop when hips can't go further back"
    ],
    commonMistakes: [
      "Bending knees too much",
      "Rounding the back",
      "Looking up too high"
    ],
    isCustom: false,
    isFavorite: false,
    tags: ["legs", "hamstrings", "hinge"]
  },

  // --- SHOULDERS ---
  {
    name: "Overhead Press",
    primaryMuscles: [MuscleGroup.Shoulders],
    secondaryMuscles: [MuscleGroup.Triceps, MuscleGroup.Back],
    equipment: [Equipment.Barbell],
    movementPattern: MovementPattern.VerticalPush,
    defaultSets: 3,
    defaultRepRange: { min: 5, max: 8 },
    defaultRestSeconds: 180,
    formCues: [
      "Squeeze glutes and core for stability",
      "Press bar in a straight line up",
      "Head moves through the 'window' at the top",
      "Elbows slightly forward of the bar at the start"
    ],
    commonMistakes: [
      "Excessive arching of the lower back",
      "Not locking out at the top",
      "Using leg drive (that makes it a push press)"
    ],
    isCustom: false,
    isFavorite: true,
    tags: ["shoulders", "press", "compound", "strength"]
  },
  {
    name: "Lateral Raise",
    primaryMuscles: [MuscleGroup.Shoulders],
    secondaryMuscles: [MuscleGroup.Traps],
    equipment: [Equipment.Dumbbell, Equipment.Cable],
    movementPattern: MovementPattern.Isolation,
    defaultSets: 3,
    defaultRepRange: { min: 12, max: 15 },
    defaultRestSeconds: 60,
    formCues: [
      "Slight bend in elbows",
      "Lead with the elbows",
      "Raise arms to shoulder height only"
    ],
    commonMistakes: [
      "Swinging the weights",
      "Raising arms too high",
      "Using too much trap involvement"
    ],
    isCustom: false,
    isFavorite: false,
    tags: ["shoulders", "isolation", "pump"]
  },

  // --- ARMS ---
  {
    name: "Barbell Bicep Curl",
    primaryMuscles: [MuscleGroup.Biceps],
    secondaryMuscles: [MuscleGroup.Forearms],
    equipment: [Equipment.Barbell],
    movementPattern: MovementPattern.Isolation,
    defaultSets: 3,
    defaultRepRange: { min: 8, max: 12 },
    defaultRestSeconds: 60,
    formCues: [
      "Keep elbows pinned to your sides",
      "Full range of motion - all the way down",
      "Squeeze at the top"
    ],
    commonMistakes: [
      "Swinging the weight",
      "Elbows moving forward during the curl",
      "Incomplete reps"
    ],
    isCustom: false,
    isFavorite: false,
    tags: ["arms", "biceps", "isolation"]
  },
  {
    name: "Tricep Pushdown",
    primaryMuscles: [MuscleGroup.Triceps],
    secondaryMuscles: [],
    equipment: [Equipment.Cable],
    movementPattern: MovementPattern.Isolation,
    defaultSets: 3,
    defaultRepRange: { min: 10, max: 15 },
    defaultRestSeconds: 60,
    formCues: [
      "Keep elbows tucked to your ribs",
      "Extend arms fully at the bottom",
      "Control the ascent"
    ],
    commonMistakes: [
      "Letting elbows flare out",
      "Using bodyweight to press down",
      "Moving the shoulders"
    ],
    isCustom: false,
    isFavorite: false,
    tags: ["arms", "triceps", "isolation"]
  }
];

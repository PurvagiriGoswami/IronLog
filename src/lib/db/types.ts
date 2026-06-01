// ─── Enums ────────────────────────────────────────────────────────────────────

export enum MuscleGroup {
  Chest = 'chest',
  Back = 'back',
  Shoulders = 'shoulders',
  Biceps = 'biceps',
  Triceps = 'triceps',
  Quads = 'quads',
  Hamstrings = 'hamstrings',
  Glutes = 'glutes',
  Calves = 'calves',
  Abs = 'abs',
  Forearms = 'forearms',
  Traps = 'traps',
}

export enum Equipment {
  Barbell = 'barbell',
  Dumbbell = 'dumbbell',
  Cable = 'cable',
  SmithMachine = 'smith-machine',
  LegPressMachine = 'leg-press-machine',
  LatPulldownMachine = 'lat-pulldown-machine',
  SeatedRowMachine = 'seated-row-machine',
  Machine = 'machine', // generic machines
  ResistanceBand = 'resistance-band',
  PullUpBar = 'pull-up-bar',
  DipBar = 'dip-bar',
  Bodyweight = 'bodyweight',
  None = 'none',
}

export enum MovementPattern {
  HorizontalPush = 'horizontal-push',
  VerticalPush = 'vertical-push',
  HorizontalPull = 'horizontal-pull',
  VerticalPull = 'vertical-pull',
  Hinge = 'hinge',
  Squat = 'squat',
  Carry = 'carry',
  Isolation = 'isolation',
  Compound = 'compound',
  Cardio = 'cardio',
}

export enum SetType {
  Normal = 'normal',
  Warmup = 'warmup',
  DropSet = 'dropset',
  Failure = 'failure',
}

export enum Goal {
  Strength = 'strength',
  Hypertrophy = 'hypertrophy',
  FatLoss = 'fat-loss',
  Recomposition = 'recomposition',
  Maintenance = 'maintenance',
  All = 'all',
}

export enum TrainingExperience {
  Beginner = 'beginner',
  Intermediate = 'intermediate',
  Advanced = 'advanced',
}

// ─── Exercise ─────────────────────────────────────────────────────────────────

export interface Exercise {
  id?: number;
  name: string;
  primaryMuscles: MuscleGroup[];
  secondaryMuscles: MuscleGroup[];
  equipment: Equipment[];
  movementPattern: MovementPattern;
  defaultSets: number;
  defaultRepRange: { min: number; max: number };
  defaultRestSeconds: number;
  formCues: string[];
  commonMistakes: string[];
  videoUrl?: string;
  isCustom: boolean;
  isFavorite: boolean;
  tags: string[];
}

// ─── Set & Exercise Log ───────────────────────────────────────────────────────

export interface WorkoutSet {
  id: string;
  type: SetType;
  weight: number; // kg always
  reps: number;
  rpe?: number; // 1–10, optional
  rir?: number; // 0–5, optional
  completedAt: number; // timestamp
  isPR: boolean;
  prTypes?: PRType[];
}

export type PRType = 'weight' | 'rep' | 'volume' | 'estimated-1rm';

export interface ExerciseLog {
  exerciseId: number;
  exerciseName: string; // denormalised for history resilience
  sets: WorkoutSet[];
  note?: string;
  supersetGroupId?: string;
}

// ─── Workout ──────────────────────────────────────────────────────────────────

export interface Workout {
  id?: number;
  name: string;
  date: string; // ISO YYYY-MM-DD
  startedAt: number;
  finishedAt: number;
  exercises: ExerciseLog[];
  note?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  totalVolume: number; // pre-computed on save
  prsAchieved: PRRecord[];
  templateId?: number;
  programDayId?: string;
}

// ─── Active Workout (in-progress, stored for crash recovery) ──────────────────

export interface ActiveWorkout {
  id?: number;
  name: string;
  startedAt: number;
  exercises: ExerciseLog[];
  note?: string;
  templateId?: number;
  programDayId?: string;
}

// ─── Template ─────────────────────────────────────────────────────────────────

export interface Template {
  id?: number;
  name: string;
  exercises: TemplateExercise[];
  lastUsed?: number;
  useCount: number;
  createdAt: number;
  updatedAt: number;
}

export interface TemplateExercise {
  exerciseId: number;
  exerciseName: string;
  sets: number;
  repRange: { min: number; max: number };
  weight?: number;
  restSeconds: number;
  supersetGroupId?: string;
  note?: string;
}

// ─── Program ──────────────────────────────────────────────────────────────────

export interface Program {
  id?: number;
  name: string;
  description?: string;
  durationWeeks: number;
  daysPerWeek: number;
  goal: Goal;
  weekTemplate: ProgramWeekDay[]; // 7 entries, Mon–Sun
  trainingDays: ProgramTrainingDay[];
  isActive: boolean;
  isSample: boolean;
  currentWeek: number;
  currentDay: number;
  startedAt?: number;
  completedDays: string[]; // "week-1-day-2" format
  createdAt: number;
  updatedAt: number;
}

export interface ProgramWeekDay {
  dayOfWeek: number; // 0=Mon, 6=Sun
  isTrainingDay: boolean;
  trainingDayIndex?: number; // which training day (0-indexed)
}

export interface ProgramTrainingDay {
  index: number;
  label: string; // e.g. "Push A", "Leg Day"
  exercises: ProgramDayExercise[];
}

export interface ProgramDayExercise {
  exerciseId: number;
  exerciseName: string;
  sets: number;
  repRange: { min: number; max: number };
  weight?: number; // target weight or undefined
  percentOf1RM?: number; // alternative: percentage of 1RM
  restSeconds: number;
  supersetGroupId?: string;
  note?: string;
}

// ─── Personal Records ─────────────────────────────────────────────────────────

export interface PRRecord {
  exerciseId: number;
  exerciseName: string;
  type: PRType;
  value: number; // weight (kg), reps, volume (kg), or estimated 1RM (kg)
  weight: number; // weight used for this PR
  reps: number; // reps performed for this PR
  date: string; // ISO date
  workoutId?: number;
}

export interface ExercisePRs {
  exerciseId: number;
  weightPR?: PRRecord;
  repPRs: Record<number, PRRecord>; // keyed by weight: best reps at that weight
  volumePR?: PRRecord;
  estimatedOneRmPR?: PRRecord;
  history: PRRecord[]; // full chronological log of all PRs
}

// ─── Body Metrics ─────────────────────────────────────────────────────────────

export interface BodyMetric {
  id?: number;
  date: string; // ISO date
  bodyweight?: number; // kg
  bodyFatPercent?: number;
  measurements?: BodyMeasurements;
  createdAt: number;
  updatedAt: number;
}

export interface BodyMeasurements {
  waist?: number; // cm
  chest?: number;
  hips?: number;
  leftArm?: number;
  rightArm?: number;
  leftThigh?: number;
  rightThigh?: number;
}

// ─── Gym Profile ──────────────────────────────────────────────────────────────

export interface GymProfile {
  availableEquipment: Equipment[];
  barbellWeight: number; // default 20kg
  ownedPlates: number[]; // e.g. [0.5, 1, 1.25, 2, 2.5, 5, 10, 15, 20, 25]
}

// ─── User Settings ────────────────────────────────────────────────────────────

export interface UserSettings {
  displayName: string;
  theme: 'dark' | 'light';
  gymProfile: GymProfile;
  primaryGoal: Goal;
  trainingExperience: TrainingExperience;
  daysPerWeek: number;
  restTimerDefaults: {
    compound: number; // seconds
    isolation: number;
    cardio: number;
  };
  onboardingCompleted: boolean;
  notificationPreferences: {
    restTimer: boolean;
    streakReminder: boolean;
    streakReminderTime: string; // HH:mm
    streakMilestones: boolean;
    inactivityAlert: boolean;
    inactivityDays: number;
  };
}

export const DEFAULT_SETTINGS: UserSettings = {
  displayName: '',
  theme: 'dark',
  gymProfile: {
    availableEquipment: [],
    barbellWeight: 20,
    ownedPlates: [1.25, 2.5, 5, 10, 15, 20, 25],
  },
  primaryGoal: Goal.All,
  trainingExperience: TrainingExperience.Intermediate,
  daysPerWeek: 6,
  restTimerDefaults: {
    compound: 180,
    isolation: 90,
    cardio: 60,
  },
  onboardingCompleted: false,
  notificationPreferences: {
    restTimer: true,
    streakReminder: true,
    streakReminderTime: '18:00',
    streakMilestones: true,
    inactivityAlert: false,
    inactivityDays: 3,
  },
};

// ─── Sync Queue (Phase 2 prep) ────────────────────────────────────────────────

export interface SyncQueueItem {
  id?: number;
  type: 'create' | 'update' | 'delete';
  collection: string;
  docId: string;
  payload?: unknown;
  timestamp: number;
  synced: boolean;
}

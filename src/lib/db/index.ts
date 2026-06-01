import Dexie, { type EntityTable } from 'dexie';
import type {
  Exercise,
  Workout,
  ActiveWorkout,
  Template,
  Program,
  ExercisePRs,
  BodyMetric,
  SyncQueueItem,
} from './types';

export class IronLogDB extends Dexie {
  exercises!: EntityTable<Exercise, 'id'>;
  workouts!: EntityTable<Workout, 'id'>;
  activeWorkout!: EntityTable<ActiveWorkout, 'id'>;
  templates!: EntityTable<Template, 'id'>;
  programs!: EntityTable<Program, 'id'>;
  prs!: EntityTable<ExercisePRs, 'exerciseId'>;
  bodyMetrics!: EntityTable<BodyMetric, 'id'>;
  syncQueue!: EntityTable<SyncQueueItem, 'id'>;

  constructor() {
    super('IronLog');

    this.version(1).stores({
      exercises: '++id, name, *primaryMuscles, *equipment, isCustom, isFavorite',
      workouts: '++id, date, name, duration, totalVolume',
      activeWorkout: '++id',
      templates: '++id, name, lastUsed, useCount',
      programs: '++id, name, isActive, goal',
      prs: '&exerciseId',
      bodyMetrics: '++id, date',
      syncQueue: '++id, type, collection, docId, timestamp, synced',
    });
  }
}

export const db = new IronLogDB();

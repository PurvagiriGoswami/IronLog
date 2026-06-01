/**
 * 1RM Calculation Formulas
 */

export const calculate1RM = {
  // Epley: weight * (1 + reps/30)
  epley: (weight: number, reps: number) => weight * (1 + reps / 30),

  // Brzycki: weight * 36 / (37 - reps)
  brzycki: (weight: number, reps: number) => (reps < 37 ? (weight * 36) / (37 - reps) : weight),

  // Lander: (100 * weight) / (101.3 - 2.67123 * reps)
  lander: (weight: number, reps: number) => (100 * weight) / (101.3 - 2.67123 * reps),

  // Lombardi: weight * reps^0.1
  lombardi: (weight: number, reps: number) => weight * Math.pow(reps, 0.1),

  // Average of all major formulas
  average: (weight: number, reps: number) => {
    if (reps === 1) return weight;
    const formulas = [
      calculate1RM.epley(weight, reps),
      calculate1RM.brzycki(weight, reps),
      calculate1RM.lander(weight, reps),
      calculate1RM.lombardi(weight, reps),
    ];
    return formulas.reduce((a, b) => a + b, 0) / formulas.length;
  },
};

export function getPercentageTable(oneRm: number) {
  const percentages = [0.5, 0.6, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95];
  return percentages.map((p) => ({
    percentage: p * 100,
    weight: Math.round(oneRm * p * 4) / 4, // Round to nearest 0.25kg
  }));
}

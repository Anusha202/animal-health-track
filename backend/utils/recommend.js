function levenshteinDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1 // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

function calculateSimilarityScore(vaccine, animalType, age) {
  const animalTypeSimilarity =
    1 /
    (1 +
      levenshteinDistance(
        vaccine.animal_type.toLowerCase(),
        animalType.toLowerCase()
      ));

  const midAgeRange = (vaccine.age_range.min + vaccine.age_range.max) / 2;
  const ageSimilarity = 1 / (1 + Math.abs(age - midAgeRange));

  const totalSimilarity = 0.5 * animalTypeSimilarity + 0.5 * ageSimilarity;
  return totalSimilarity;
}

function recommendVaccine(animalType, age, breed) {
  const recommendations = vaccineData
    .map((vaccine) => ({
      ...vaccine,
      similarity: calculateSimilarityScore(vaccine, animalType, age, breed),
    }))
    .filter((vaccine) => vaccine.similarity > 0.5) // Filter by a threshold
    .sort((a, b) => b.similarity - a.similarity); // Sort by similarity

  return recommendations;
}


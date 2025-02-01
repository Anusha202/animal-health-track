const animalsData = [
  {
    animal_type: "Dog",
    breeds: [
      {
        breed: "Nepali Sheepdog",
        size: "Medium",
        weight: { average: "18–30 kg" },
        height_at_wither: "50–60 cm",
        lifespan: "12–15 years",
        average_temperature: "38.5°C",
        age_data: [
          {
            age_range: { min: 1, max: 2 },
            weight_range: { min: 18, max: 22 },
            growth_rate: "Moderate",
          },
          {
            age_range: { min: 2, max: 4 },
            weight_range: { min: 22, max: 25 },
            growth_rate: "Slow",
          },
          {
            age_range: { min: 4, max: 6 },
            weight_range: { min: 25, max: 28 },
            growth_rate: "Slow",
          },
          {
            age_range: { min: 6, max: 8 },
            weight_range: { min: 28, max: 30 },
            growth_rate: "Slow",
          },
          {
            age_range: { min: 8, max: 10 },
            weight_range: { min: 30, max: 30 },
            growth_rate: "Stable",
          },
        ],
      },
      {
        breed: "Rottweiler",
        size: "Large",
        weight: { average: "35–60 kg" },
        height_at_wither: "60–70 cm",
        lifespan: "8–12 years",
        average_temperature: "38.5°C",
        age_data: [
          {
            age_range: { min: 1, max: 2 },
            weight_range: { min: 35, max: 40 },
            growth_rate: "Rapid",
          },
          {
            age_range: { min: 2, max: 4 },
            weight_range: { min: 40, max: 50 },
            growth_rate: "Slow",
          },
          {
            age_range: { min: 4, max: 6 },
            weight_range: { min: 50, max: 55 },
            growth_rate: "Slow",
          },
          {
            age_range: { min: 6, max: 8 },
            weight_range: { min: 55, max: 60 },
            growth_rate: "Stable",
          },
          {
            age_range: { min: 8, max: 10 },
            weight_range: { min: 60, max: 60 },
            growth_rate: "Stable",
          },
        ],
      },
      {
        breed: "Labrador Retriever",
        size: "Large",
        weight: { average: "25–35 kg" },
        height_at_wither: "55–65 cm",
        lifespan: "10–12 years",
        average_temperature: "38.5°C",
        age_data: [
          {
            age_range: { min: 1, max: 2 },
            weight_range: { min: 25, max: 30 },
            growth_rate: "Rapid",
          },
          {
            age_range: { min: 2, max: 4 },
            weight_range: { min: 30, max: 32 },
            growth_rate: "Moderate",
          },
          {
            age_range: { min: 4, max: 6 },
            weight_range: { min: 32, max: 34 },
            growth_rate: "Slow",
          },
          {
            age_range: { min: 6, max: 8 },
            weight_range: { min: 34, max: 35 },
            growth_rate: "Stable",
          },
          {
            age_range: { min: 8, max: 10 },
            weight_range: { min: 35, max: 35 },
            growth_rate: "Stable",
          },
        ],
      },
      {
        breed: "Pahadi Dog",
        size: "Medium",
        weight: { average: "12–20 kg" },
        height_at_wither: "45–55 cm",
        lifespan: "10–12 years",
        average_temperature: "38.5°C",
        age_data: [
          {
            age_range: { min: 1, max: 2 },
            weight_range: { min: 12, max: 15 },
            growth_rate: "Moderate",
          },
          {
            age_range: { min: 2, max: 4 },
            weight_range: { min: 15, max: 18 },
            growth_rate: "Slow",
          },
          {
            age_range: { min: 4, max: 6 },
            weight_range: { min: 18, max: 19 },
            growth_rate: "Slow",
          },
          {
            age_range: { min: 6, max: 8 },
            weight_range: { min: 19, max: 20 },
            growth_rate: "Stable",
          },
          {
            age_range: { min: 8, max: 10 },
            weight_range: { min: 20, max: 20 },
            growth_rate: "Stable",
          },
        ],
      },
      {
        breed: "Gorkha Dog",
        size: "Medium",
        weight: { average: "15–25 kg" },
        height_at_wither: "45–60 cm",
        lifespan: "10–12 years",
        average_temperature: "38.5°C",
        age_data: [
          {
            age_range: { min: 1, max: 2 },
            weight_range: { min: 15, max: 18 },
            growth_rate: "Moderate",
          },
          {
            age_range: { min: 2, max: 4 },
            weight_range: { min: 18, max: 22 },
            growth_rate: "Slow",
          },
          {
            age_range: { min: 4, max: 6 },
            weight_range: { min: 22, max: 24 },
            growth_rate: "Slow",
          },
          {
            age_range: { min: 6, max: 8 },
            weight_range: { min: 24, max: 25 },
            growth_rate: "Stable",
          },
          {
            age_range: { min: 8, max: 10 },
            weight_range: { min: 25, max: 25 },
            growth_rate: "Stable",
          },
        ],
      },
    ],
  },
  {
    animal_type: "Cow",
    breeds: [
      {
        breed: "Lulu",
        size: "Medium",
        weight: { average: "125–150 kg" },
        height_at_wither: "115 cm",
        lifespan: "12–18 years",
        average_temperature: "38.5°C",
        age_data: [
          {
            age_range: { min: 1, max: 2 },
            weight_range: { min: 40, max: 55 },
            milk_per_day: "0.5–1.0 liters/day",
          },
          {
            age_range: { min: 2, max: 4 },
            weight_range: { min: 55, max: 80 },
            milk_per_day: "1.0–2.0 liters/day",
          },
          {
            age_range: { min: 4, max: 6 },
            weight_range: { min: 80, max: 100 },
            milk_per_day: "2.0–3.0 liters/day",
          },
          {
            age_range: { min: 6, max: 8 },
            weight_range: { min: 100, max: 130 },
            milk_per_day: "3.0–4.0 liters/day",
          },
          {
            age_range: { min: 8, max: 12 },
            weight_range: { min: 130, max: 150 },
            milk_per_day: "4.0–5.0 liters/day",
          },
          {
            age_range: { min: 12, max: 18 },
            weight_range: { min: 150, max: 170 },
            milk_per_day: "3.5–4.5 liters/day",
          },
        ],
      },
      {
        breed: "Achhami",
        size: "Small",
        weight: { average: "40–55 kg" },
        height_at_wither: "110.8 cm",
        lifespan: "10–14 years",
        average_temperature: "38.5°C",
        age_data: [
          {
            age_range: { min: 1, max: 2 },
            weight_range: { min: 40, max: 50 },
            milk_per_day: "0.5–1.0 liters/day",
          },
          {
            age_range: { min: 2, max: 4 },
            weight_range: { min: 50, max: 55 },
            milk_per_day: "1.0–1.5 liters/day",
          },
          {
            age_range: { min: 4, max: 6 },
            weight_range: { min: 55, max: 60 },
            milk_per_day: "1.5–2.0 liters/day",
          },
          {
            age_range: { min: 6, max: 8 },
            weight_range: { min: 60, max: 70 },
            milk_per_day: "2.0–2.5 liters/day",
          },
          {
            age_range: { min: 8, max: 12 },
            weight_range: { min: 70, max: 75 },
            milk_per_day: "2.5–3.0 liters/day",
          },
        ],
      },
      {
        breed: "Siri",
        size: "Medium",
        weight: {
          average: "286.5 kg",
        },
        height_at_wither: "116.3 cm",
        lifespan: "15–18 years",
        average_temperature: "38.5°C",
        age_data: [
          {
            age_range: { min: 1, max: 2 },
            weight_range: { min: 60, max: 90 },
            milk_per_day: "1.0–2.0 liters/day",
          },
          {
            age_range: { min: 2, max: 4 },
            weight_range: { min: 90, max: 130 },
            milk_per_day: "2.0–3.0 liters/day",
          },
          {
            age_range: { min: 4, max: 6 },
            weight_range: { min: 130, max: 170 },
            milk_per_day: "3.0–4.5 liters/day",
          },
          {
            age_range: { min: 6, max: 8 },
            weight_range: { min: 170, max: 210 },
            milk_per_day: "4.5–6.0 liters/day",
          },
          {
            age_range: { min: 8, max: 12 },
            weight_range: { min: 210, max: 240 },
            milk_per_day: "4.0–5.0 liters/day",
          },
          {
            age_range: { min: 12, max: 18 },
            weight_range: { min: 240, max: 260 },
            milk_per_day: "3.5–4.5 liters/day",
          },
        ],
      },
      {
        breed: "Khaila",
        size: "Large",
        weight: {
          average: "298 kg",
        },
        height_at_wither: "120 cm",
        lifespan: "12–18 years",
        average_temperature: "38.5°C",
        age_data: [
          {
            age_range: { min: 1, max: 2 },
            weight_range: { min: 70, max: 100 },
            milk_per_day: "1.0–1.5 liters/day",
          },
          {
            age_range: { min: 2, max: 4 },
            weight_range: { min: 100, max: 140 },
            milk_per_day: "1.5–2.5 liters/day",
          },
          {
            age_range: { min: 4, max: 6 },
            weight_range: { min: 140, max: 180 },
            milk_per_day: "2.5–3.5 liters/day",
          },
          {
            age_range: { min: 6, max: 8 },
            weight_range: { min: 180, max: 220 },
            milk_per_day: "3.0–4.0 liters/day",
          },
          {
            age_range: { min: 8, max: 12 },
            weight_range: { min: 220, max: 250 },
            milk_per_day: "3.5–4.5 liters/day",
          },
          {
            age_range: { min: 12, max: 18 },
            weight_range: { min: 250, max: 280 },
            milk_per_day: "3.0–4.0 liters/day",
          },
        ],
      },
      {
        breed: "Terai",
        size: "Medium",
        weight: {
          average: "210 kg",
        },
        height_at_wither: "104.1 cm",
        lifespan: "12–16 years",
        average_temperature: "38.5°C",
        age_data: [
          {
            age_range: { min: 1, max: 2 },
            weight_range: { min: 50, max: 75 },
            milk_per_day: "0.5–1.5 liters/day",
          },
          {
            age_range: { min: 2, max: 4 },
            weight_range: { min: 75, max: 110 },
            milk_per_day: "1.0–2.0 liters/day",
          },
          {
            age_range: { min: 4, max: 6 },
            weight_range: { min: 110, max: 140 },
            milk_per_day: "2.0–2.5 liters/day",
          },
          {
            age_range: { min: 6, max: 8 },
            weight_range: { min: 140, max: 170 },
            milk_per_day: "2.5–3.0 liters/day",
          },
          {
            age_range: { min: 8, max: 12 },
            weight_range: { min: 170, max: 200 },
            milk_per_day: "3.0–4.0 liters/day",
          },
          {
            age_range: { min: 12, max: 16 },
            weight_range: { min: 200, max: 220 },
            milk_per_day: "2.5–3.5 liters/day",
          },
        ],
      },
      {
        breed: "Pahadi",
        size: "Medium",
        weight: {
          average: "125–150 kg",
        },
        height_at_wither: "120 cm",
        lifespan: "12–18 years",
        average_temperature: "38.5°C",
        age_data: [
          {
            age_range: { min: 1, max: 2 },
            weight_range: { min: 40, max: 60 },
            milk_per_day: "0.5–1.0 liters/day",
          },
          {
            age_range: { min: 2, max: 4 },
            weight_range: { min: 60, max: 85 },
            milk_per_day: "1.0–1.5 liters/day",
          },
          {
            age_range: { min: 4, max: 6 },
            weight_range: { min: 85, max: 110 },
            milk_per_day: "1.5–2.5 liters/day",
          },
          {
            age_range: { min: 6, max: 8 },
            weight_range: { min: 110, max: 140 },
            milk_per_day: "2.5–3.5 liters/day",
          },
          {
            age_range: { min: 8, max: 12 },
            weight_range: { min: 140, max: 160 },
            milk_per_day: "3.5–4.5 liters/day",
          },
          {
            age_range: { min: 12, max: 18 },
            weight_range: { min: 160, max: 180 },
            milk_per_day: "3.5–4.5 liters/day",
          },
        ],
      },
    ],
  },
  {
    animal_type: "Chicken",
    breeds: [
      {
        breed: "Sakini",
        size: "Medium",
        weight: {
          average: "1.5–2.4 kg (female), 1.8–3.0 kg (male)",
        },
        height_at_wither: "Not specified",
        lifespan: "5–8 years",
        average_temperature: "Not specified",
        age_data: [
          {
            age_range: { min: 1, max: 2 },
            weight_range: { min: 1.5, max: 1.8 },
            egg_production_per_week: { min: 1, max: 2 },
          },
          {
            age_range: { min: 2, max: 3 },
            weight_range: { min: 1.8, max: 2.0 },
            egg_production_per_week: { min: 2, max: 3 },
          },
          {
            age_range: { min: 3, max: 4 },
            weight_range: { min: 2.0, max: 2.2 },
            egg_production_per_week: { min: 3, max: 4 },
          },
          {
            age_range: { min: 4, max: 5 },
            weight_range: { min: 2.2, max: 2.4 },
            egg_production_per_week: { min: 4, max: 5 },
          },
          {
            age_range: { min: 5, max: 6 },
            weight_range: { min: 2.4, max: 2.6 },
            egg_production_per_week: { min: 4, max: 5 },
          },
          {
            age_range: { min: 6, max: 7 },
            weight_range: { min: 2.6, max: 2.8 },
            egg_production_per_week: { min: 3, max: 4 },
          },
          {
            age_range: { min: 7, max: 8 },
            weight_range: { min: 2.8, max: 3.0 },
            egg_production_per_week: { min: 3, max: 4 },
          },
        ],
      },
      {
        breed: "Ghanti Khuile",
        size: "Medium",
        weight: {
          average: "1.5–2.2 kg (female), 1.8–2.8 kg (male)",
        },
        height_at_wither: "Not specified",
        lifespan: "5–8 years",
        average_temperature: "Not specified",
        age_data: [
          {
            age_range: { min: 1, max: 2 },
            weight_range: { min: 1.5, max: 1.8 },
            egg_production_per_week: { min: 1, max: 2 },
          },
          {
            age_range: { min: 2, max: 3 },
            weight_range: { min: 1.8, max: 2.0 },
            egg_production_per_week: { min: 2, max: 3 },
          },
          {
            age_range: { min: 3, max: 4 },
            weight_range: { min: 2.0, max: 2.2 },
            egg_production_per_week: { min: 3, max: 4 },
          },
          {
            age_range: { min: 4, max: 5 },
            weight_range: { min: 2.0, max: 2.2 },
            egg_production_per_week: { min: 3, max: 4 },
          },
          {
            age_range: { min: 5, max: 6 },
            weight_range: { min: 2.2, max: 2.4 },
            egg_production_per_week: { min: 3, max: 4 },
          },
          {
            age_range: { min: 6, max: 7 },
            weight_range: { min: 2.4, max: 2.6 },
            egg_production_per_week: { min: 2, max: 3 },
          },
          {
            age_range: { min: 7, max: 8 },
            weight_range: { min: 2.6, max: 2.8 },
            egg_production_per_week: { min: 2, max: 3 },
          },
        ],
      },
      {
        breed: "Puwankh Ulte",
        size: "Medium",
        weight: {
          average: "1.4–2.2 kg (female), 1.7–2.5 kg (male)",
        },
        height_at_wither: "Not specified",
        lifespan: "5–8 years",
        average_temperature: "Not specified",
        age_data: [
          {
            age_range: { min: 1, max: 2 },
            weight_range: { min: 1.4, max: 1.7 },
            egg_production_per_week: { min: 1, max: 2 },
          },
          {
            age_range: { min: 2, max: 3 },
            weight_range: { min: 1.7, max: 2.0 },
            egg_production_per_week: { min: 2, max: 3 },
          },
          {
            age_range: { min: 3, max: 4 },
            weight_range: { min: 2.0, max: 2.2 },
            egg_production_per_week: { min: 3, max: 4 },
          },
          {
            age_range: { min: 4, max: 5 },
            weight_range: { min: 2.0, max: 2.2 },
            egg_production_per_week: { min: 3, max: 4 },
          },
          {
            age_range: { min: 5, max: 6 },
            weight_range: { min: 2.2, max: 2.4 },
            egg_production_per_week: { min: 3, max: 4 },
          },
          {
            age_range: { min: 6, max: 7 },
            weight_range: { min: 2.4, max: 2.6 },
            egg_production_per_week: { min: 2, max: 3 },
          },
          {
            age_range: { min: 7, max: 8 },
            weight_range: { min: 2.6, max: 2.8 },
            egg_production_per_week: { min: 2, max: 3 },
          },
        ],
      },
    ],
  },
];
export default animalsData;

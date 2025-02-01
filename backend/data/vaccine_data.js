const vaccineData = [
  {
    "id": 1,
    "vaccine_name": "Rabies",
    "animal_type": "Dog",
    "breeds": [
      "Nepali Sheepdog",
      "Rottweiler",
      "Labrador Retriever",
      "Pahadi Dog",
      "Gorkha Dog"
    ],
    "age_range": {
      "min": 6,
      "max": 12
    },
    "frequency": "Once",
    "duration": "1 year"
  },
  {
    "id": 2,
    "vaccine_name": "Hepatitis",
    "animal_type": "Dog",
    "breeds": [
      "Nepali Sheepdog",
      "Rottweiler",
      "Labrador Retriever",
      "Pahadi Dog",
      "Gorkha Dog"
    ],
    "age_range": {
      "min": 1,
      "max": 5
    },
    "frequency": "Every",
    "duration": "1 year"
  },
  {
    "id": 3,
    "vaccine_name": "Bordetella",
    "animal_type": "Dog",
    "breeds": [
      "Nepali Sheepdog",
      "Rottweiler",
      "Labrador Retriever",
      "Pahadi Dog",
      "Gorkha Dog"
    ],
    "age_range": {
      "min": 6,
      "max": 12
    },
    "frequency": "Every",
    "duration": "6 months"
  },
  {
    "id": 4,
    "vaccine_name": "Canine Parvovirus",
    "animal_type": "Dog",
    "breeds": [
      "Nepali Sheepdog",
      "Rottweiler",
      "Labrador Retriever",
      "Pahadi Dog",
      "Gorkha Dog"
    ],
    "age_range": {
      "min": 6,
      "max": 12
    },
    "frequency": "Every",
    "duration": "1 year"
  },
  {
    "id": 5,
    "vaccine_name": "Canine Distemper",
    "animal_type": "Dog",
    "breeds": [
      "Nepali Sheepdog",
      "Rottweiler",
      "Labrador Retriever",
      "Pahadi Dog",
      "Gorkha Dog"
    ],
    "age_range": {
      "min": 6,
      "max": 12
    },
    "frequency": "Every",
    "duration": "1 year"
  },
  {
    "id": 6,
    "vaccine_name": "Newcastle Disease",
    "animal_type": "Chicken",
    "breeds": [
      "Sakini",
      "Ghanti Khuile",
      "Pwakh Ulte"
    ],
    "age_range": {
      "min": 0,
      "max": 2
    },
    "frequency": "Every",
    "duration": "6 months"
  },
  {
    "id": 7,
    "vaccine_name": "H5N1 Avian Influenza",
    "animal_type": "Chicken",
    "breeds": [
      "Sakini",
      "Ghanti Khuile",
      "Pwakh Ulte"
    ],
    "age_range": {
      "min": 0,
      "max": 1
    },
    "frequency": "Once",
    "duration": "1 year"
  },
  {
    "id": 8,

    "vaccine_name": "Infectious Bursal Disease (IBD)",
    "animal_type": "Chicken",
    "breeds": [
      "Sakini",
      "Ghanti Khuile",
      "Pwakh Ulte"
    ],
    "age_range": {
      "min": 0,
      "max": 3
    },
    "frequency": "Once",
    "duration": "1 year"
  },
  {
    "id": 9,
    "vaccine_name": "Marek's Disease",
    "animal_type": "Chicken",
    "breeds": [
      "Sakini",
      "Ghanti Khuile",
      "Pwakh Ulte"
    ],
    "age_range": {
      "min": 0,
      "max": 2
    },
    "frequency": "Once",
    "duration": "1 year"
  },
  {
    "id": 10,
    "vaccine_name": "Foot-and-mouth Disease",
    "animal_type": "Cow",
    "breeds": [
      "Terai",
      "Pahadi",
      "Lulu",
      "Khaila",
      "Achhami",
      "Siri"
    ],
    "age_range": {
      "min": 0,
      "max": 2
    },
    "frequency": "Every",
    "duration": "1 year"
  },
  {
    "id": 11,
    "vaccine_name": "Brucellosis",
    "animal_type": "Cow",
    "breeds": [
      "Terai",
      "Pahadi",
      "Lulu",
      "Khaila",
      "Achhami",
      "Siri"
    ],
    "age_range": {
      "min": 1,
      "max": 5
    },
    "frequency": "Once",
    "duration": "1 year"
  },
  {
    "id": 12,
    "vaccine_name": "Black Quarter",
    "animal_type": "Cow",
    "breeds": [
      "Terai",
      "Pahadi",
      "Lulu",
      "Khaila",
      "Achhami",
      "Siri"
    ],
    "age_range": {
      "min": 0,
      "max": 1
    },
    "frequency": "Once",
    "duration": "1 year"
  },
  {
    "id": 13,
    "vaccine_name": "Hemorrhagic Septicemia",
    "animal_type": "Cow",
    "breeds": [
      "Terai",
      "Pahadi",
      "Lulu",
      "Khaila",
      "Achhami",
      "Siri"
    ],
    "age_range": {
      "min": 0,
      "max": 2
    },
    "frequency": "Every",
    "duration": "6 months"
  },
  {
    "id": 14,
    "vaccine_name": "Anthrax",
    "animal_type": "Cow",
    "breeds": [
      "Terai",
      "Pahadi",
      "Lulu",
      "Khaila",
      "Achhami",
      "Siri"
    ],
    "age_range": {
      "min": 0,
      "max": 2
    },
    "frequency": "Once",
    "duration": "1 year"
  },
  {
    "id": 15,
    "vaccine_name": "Tuberculosis (TB)",
    "animal_type": "Cow",
    "breeds": [
      "Terai",
      "Pahadi",
      "Lulu",
      "Khaila",
      "Achhami",
      "Siri"
    ],
    "age_range": {
      "min": 1,
      "max": 4
    },
    "frequency": "Every",
    "duration": "2 years"
  },
  {
    "id": 16,
    "vaccine_name": "Pneumonic Pasteurellosis",
    "animal_type": "Cow",
    "breeds": [
      "Terai",
      "Pahadi",
      "Lulu",
      "Khaila",
      "Achhami",
      "Siri"
    ],
    "age_range": {
      "min": 0,
      "max": 2
    },
    "frequency": "Every",
    "duration": "1 year"
  }
]
export default vaccineData;
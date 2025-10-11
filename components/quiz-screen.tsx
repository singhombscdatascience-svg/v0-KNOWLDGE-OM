"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Clock } from "lucide-react"

interface QuizScreenProps {
  category: string
  onQuizComplete: (score: number, total: number) => void
  onBack: () => void
}

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const questionBank: Record<string, Question[]> = {
  science: [
    {
      id: 1,
      question: "What is the chemical symbol for gold?",
      options: ["Go", "Gd", "Au", "Ag"],
      correctAnswer: 2,
      explanation: "Au comes from the Latin word 'aurum' meaning gold.",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 1,
      explanation: "Mars appears red due to iron oxide (rust) on its surface.",
    },
    {
      id: 3,
      question: "What is the speed of light in vacuum?",
      options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
      correctAnswer: 0,
      explanation: "Light travels at approximately 299,792,458 meters per second in vacuum.",
    },
    {
      id: 4,
      question: "Which gas makes up about 78% of Earth's atmosphere?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
      correctAnswer: 2,
      explanation: "Nitrogen makes up about 78% of Earth's atmosphere, while oxygen is about 21%.",
    },
    {
      id: 5,
      question: "What is the hardest natural substance on Earth?",
      options: ["Gold", "Iron", "Diamond", "Quartz"],
      correctAnswer: 2,
      explanation: "Diamond is the hardest natural substance, rating 10 on the Mohs scale.",
    },
    {
      id: 6,
      question: "What is the chemical formula for water?",
      options: ["H2O", "CO2", "NaCl", "CH4"],
      correctAnswer: 0,
      explanation: "Water consists of two hydrogen atoms and one oxygen atom (H2O).",
    },
    {
      id: 7,
      question: "Which scientist developed the theory of relativity?",
      options: ["Newton", "Einstein", "Darwin", "Tesla"],
      correctAnswer: 1,
      explanation: "Albert Einstein developed both special and general theories of relativity.",
    },
    {
      id: 8,
      question: "What is the smallest unit of matter?",
      options: ["Molecule", "Atom", "Electron", "Proton"],
      correctAnswer: 1,
      explanation: "An atom is the smallest unit of matter that retains the properties of an element.",
    },
    {
      id: 9,
      question: "Which blood type is known as the universal donor?",
      options: ["A", "B", "AB", "O"],
      correctAnswer: 3,
      explanation: "Type O blood can be donated to people with any blood type.",
    },
    {
      id: 10,
      question: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Cytoplasm"],
      correctAnswer: 1,
      explanation: "Mitochondria produce energy (ATP) for cellular processes.",
    },
    {
      id: 11,
      question: "Which element has the atomic number 1?",
      options: ["Helium", "Hydrogen", "Lithium", "Carbon"],
      correctAnswer: 1,
      explanation: "Hydrogen is the first element on the periodic table with atomic number 1.",
    },
    {
      id: 12,
      question: "What is the study of earthquakes called?",
      options: ["Geology", "Seismology", "Meteorology", "Oceanography"],
      correctAnswer: 1,
      explanation: "Seismology is the scientific study of earthquakes and seismic waves.",
    },
    {
      id: 13,
      question: "Which organ in the human body produces bile?",
      options: ["Pancreas", "Liver", "Kidney", "Spleen"],
      correctAnswer: 1,
      explanation: "The liver produces bile, which helps digest fats.",
    },
    {
      id: 14,
      question: "What is the most abundant gas in the universe?",
      options: ["Oxygen", "Helium", "Hydrogen", "Nitrogen"],
      correctAnswer: 2,
      explanation: "Hydrogen is the most abundant element in the universe, making up about 75% of normal matter.",
    },
    {
      id: 15,
      question: "Which scientist is famous for the laws of motion?",
      options: ["Galileo", "Newton", "Kepler", "Copernicus"],
      correctAnswer: 1,
      explanation: "Sir Isaac Newton formulated the three laws of motion.",
    },
    {
      id: 16,
      question: "What is the chemical symbol for sodium?",
      options: ["So", "Sd", "Na", "S"],
      correctAnswer: 2,
      explanation: "Na comes from the Latin word 'natrium' for sodium.",
    },
    {
      id: 17,
      question: "Which part of the brain controls balance?",
      options: ["Cerebrum", "Cerebellum", "Medulla", "Hypothalamus"],
      correctAnswer: 1,
      explanation: "The cerebellum is responsible for balance, coordination, and motor control.",
    },
    {
      id: 18,
      question: "What is the pH of pure water?",
      options: ["6", "7", "8", "9"],
      correctAnswer: 1,
      explanation: "Pure water has a neutral pH of 7.",
    },
    {
      id: 19,
      question: "Which planet has the most moons?",
      options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
      correctAnswer: 1,
      explanation: "Saturn has the most confirmed moons with over 80 natural satellites.",
    },
    {
      id: 20,
      question: "What is the process by which plants make food?",
      options: ["Respiration", "Photosynthesis", "Digestion", "Fermentation"],
      correctAnswer: 1,
      explanation: "Photosynthesis is the process where plants convert sunlight into energy.",
    },
    {
      id: 21,
      question: "What is the chemical symbol for iron?",
      options: ["Ir", "Fe", "In", "I"],
      correctAnswer: 1,
      explanation: "Fe comes from the Latin word 'ferrum' meaning iron.",
    },
    {
      id: 22,
      question: "Which planet is closest to the Sun?",
      options: ["Venus", "Earth", "Mercury", "Mars"],
      correctAnswer: 2,
      explanation: "Mercury is the closest planet to the Sun in our solar system.",
    },
    {
      id: 23,
      question: "What is the study of fungi called?",
      options: ["Botany", "Mycology", "Zoology", "Ecology"],
      correctAnswer: 1,
      explanation: "Mycology is the branch of biology concerned with the study of fungi.",
    },
    {
      id: 24,
      question: "Which gas is most abundant in Earth's atmosphere?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
      correctAnswer: 2,
      explanation: "Nitrogen makes up about 78% of Earth's atmosphere.",
    },
    {
      id: 25,
      question: "What is the unit of electrical resistance?",
      options: ["Volt", "Ampere", "Ohm", "Watt"],
      correctAnswer: 2,
      explanation: "The ohm is the unit of electrical resistance in the International System of Units.",
    },
    {
      id: 26,
      question: "Which scientist discovered penicillin?",
      options: ["Louis Pasteur", "Alexander Fleming", "Marie Curie", "Gregor Mendel"],
      correctAnswer: 1,
      explanation: "Alexander Fleming discovered penicillin in 1928, revolutionizing medicine.",
    },
    {
      id: 27,
      question: "What is the chemical formula for methane?",
      options: ["CH4", "CO2", "H2O", "NH3"],
      correctAnswer: 0,
      explanation: "Methane consists of one carbon atom and four hydrogen atoms (CH4).",
    },
    {
      id: 28,
      question: "Which organ produces red blood cells?",
      options: ["Liver", "Kidney", "Bone marrow", "Spleen"],
      correctAnswer: 2,
      explanation: "Red blood cells are produced in the bone marrow through hematopoiesis.",
    },
    {
      id: 29,
      question: "What is the speed of sound in air at room temperature?",
      options: ["343 m/s", "300 m/s", "400 m/s", "500 m/s"],
      correctAnswer: 0,
      explanation: "Sound travels at approximately 343 meters per second in air at 20°C.",
    },
    {
      id: 30,
      question: "Which element has the highest melting point?",
      options: ["Iron", "Tungsten", "Carbon", "Platinum"],
      correctAnswer: 1,
      explanation: "Tungsten has the highest melting point of all elements at 3,695°K.",
    },
    {
      id: 31,
      question: "What is the chemical symbol for potassium?",
      options: ["Po", "K", "P", "Pt"],
      correctAnswer: 1,
      explanation: "K comes from the Latin word 'kalium' meaning potassium.",
    },
    {
      id: 32,
      question: "Which planet is known as the 'Morning Star' or 'Evening Star'?",
      options: ["Mars", "Jupiter", "Venus", "Saturn"],
      correctAnswer: 2,
      explanation:
        "Venus is often called the 'Morning Star' or 'Evening Star' because it is visible just before sunrise or after sunset.",
    },
    {
      id: 33,
      question: "What is the study of insects called?",
      options: ["Botany", "Entomology", "Zoology", "Ecology"],
      correctAnswer: 1,
      explanation: "Entomology is the scientific study of insects.",
    },
    {
      id: 34,
      question: "Which gas is used in balloons to make them float?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
      correctAnswer: 3,
      explanation: "Helium is lighter than air, so it makes balloons float.",
    },
    {
      id: 35,
      question: "What is the unit of force?",
      options: ["Watt", "Joule", "Newton", "Pascal"],
      correctAnswer: 2,
      explanation: "The newton is the unit of force in the International System of Units.",
    },
    {
      id: 36,
      question: "Which scientist is known for his work on radioactivity?",
      options: ["Isaac Newton", "Albert Einstein", "Marie Curie", "Galileo Galilei"],
      correctAnswer: 2,
      explanation: "Marie Curie conducted pioneering research on radioactivity.",
    },
    {
      id: 37,
      question: "What is the chemical formula for ammonia?",
      options: ["NH3", "CO2", "H2O", "CH4"],
      correctAnswer: 0,
      explanation: "Ammonia consists of one nitrogen atom and three hydrogen atoms (NH3).",
    },
    {
      id: 38,
      question: "Which organ filters blood in the human body?",
      options: ["Liver", "Kidney", "Heart", "Lungs"],
      correctAnswer: 1,
      explanation: "The kidneys filter waste and excess fluids from the blood.",
    },
    {
      id: 39,
      question: "What is the speed of sound in water?",
      options: ["1480 m/s", "343 m/s", "500 m/s", "1000 m/s"],
      correctAnswer: 0,
      explanation: "Sound travels at approximately 1480 meters per second in water.",
    },
    {
      id: 40,
      question: "Which element is essential for thyroid function?",
      options: ["Iron", "Calcium", "Iodine", "Zinc"],
      correctAnswer: 2,
      explanation: "Iodine is essential for the production of thyroid hormones.",
    },
    {
      id: 41,
      question: "What is the chemical symbol for silver?",
      options: ["Si", "Ag", "Au", "Sl"],
      correctAnswer: 1,
      explanation: "Ag comes from the Latin word 'argentum' meaning silver.",
    },
    {
      id: 42,
      question: "Which planet is known for its prominent rings?",
      options: ["Jupiter", "Mars", "Saturn", "Uranus"],
      correctAnswer: 2,
      explanation: "Saturn is famous for its extensive ring system.",
    },
    {
      id: 43,
      question: "What is the study of birds called?",
      options: ["Botany", "Entomology", "Ornithology", "Ecology"],
      correctAnswer: 2,
      explanation: "Ornithology is the branch of zoology specifically focused on the study of birds.",
    },
    {
      id: 44,
      question: "Which gas do plants absorb from the atmosphere during photosynthesis?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      correctAnswer: 1,
      explanation:
        "Plants absorb carbon dioxide from the atmosphere to produce glucose and oxygen during photosynthesis.",
    },
    {
      id: 45,
      question: "What is the unit of energy?",
      options: ["Watt", "Newton", "Pascal", "Joule"],
      correctAnswer: 3,
      explanation: "The joule is the unit of energy in the International System of Units.",
    },
    {
      id: 46,
      question: "Which scientist developed the theory of evolution by natural selection?",
      options: ["Gregor Mendel", "Charles Darwin", "Louis Pasteur", "Alfred Wegener"],
      correctAnswer: 1,
      explanation:
        "Charles Darwin proposed the theory of evolution by natural selection in his book 'On the Origin of Species'.",
    },
    {
      id: 47,
      question: "What is the chemical formula for table salt?",
      options: ["NaCl", "KCl", "CaCl2", "MgCl2"],
      correctAnswer: 0,
      explanation: "Table salt is composed of sodium and chlorine atoms (NaCl).",
    },
    {
      id: 48,
      question: "Which organ stores bile in the human body?",
      options: ["Liver", "Gallbladder", "Pancreas", "Spleen"],
      correctAnswer: 1,
      explanation:
        "The gallbladder stores bile produced by the liver and releases it into the small intestine to aid digestion.",
    },
    {
      id: 49,
      question: "What is the speed of sound in steel?",
      options: ["1480 m/s", "343 m/s", "500 m/s", "5960 m/s"],
      correctAnswer: 3,
      explanation: "Sound travels at approximately 5960 meters per second in steel.",
    },
    {
      id: 50,
      question: "Which element is essential for the formation of hemoglobin?",
      options: ["Iron", "Calcium", "Iodine", "Zinc"],
      correctAnswer: 0,
      explanation: "Iron is a key component of hemoglobin, which carries oxygen in red blood cells.",
    },
    {
      id: 51,
      question: "What is the chemical symbol for lead?",
      options: ["Le", "Pb", "Ld", "Li"],
      correctAnswer: 1,
      explanation: "Pb comes from the Latin word 'plumbum' meaning lead.",
    },
    {
      id: 52,
      question: "Which planet is known as the 'Gas Giant'?",
      options: ["Earth", "Mars", "Venus", "Jupiter"],
      correctAnswer: 3,
      explanation: "Jupiter is known as a 'Gas Giant' because it is primarily composed of hydrogen and helium.",
    },
    {
      id: 53,
      question: "What is the study of reptiles and amphibians called?",
      options: ["Botany", "Entomology", "Herpetology", "Ecology"],
      correctAnswer: 2,
      explanation: "Herpetology is the branch of zoology concerned with the study of reptiles and amphibians.",
    },
    {
      id: 54,
      question: "Which gas is produced by plants during photosynthesis?",
      options: ["Carbon Dioxide", "Nitrogen", "Hydrogen", "Oxygen"],
      correctAnswer: 3,
      explanation: "Plants release oxygen into the atmosphere as a byproduct of photosynthesis.",
    },
    {
      id: 55,
      question: "What is the unit of power?",
      options: ["Watt", "Joule", "Newton", "Pascal"],
      correctAnswer: 0,
      explanation: "The watt is the unit of power in the International System of Units.",
    },
    {
      id: 56,
      question: "Which scientist is known for his laws of thermodynamics?",
      options: ["Isaac Newton", "Albert Einstein", "Sadi Carnot", "James Clerk Maxwell"],
      correctAnswer: 2,
      explanation: "Sadi Carnot is considered the founder of thermodynamics.",
    },
    {
      id: 57,
      question: "What is the chemical formula for glucose?",
      options: ["C6H12O6", "CO2", "H2O", "CH4"],
      correctAnswer: 0,
      explanation: "Glucose is a simple sugar with the formula C6H12O6.",
    },
    {
      id: 58,
      question: "Which organ produces urea in the human body?",
      options: ["Liver", "Kidney", "Heart", "Lungs"],
      correctAnswer: 0,
      explanation: "The liver produces urea as a waste product of protein metabolism.",
    },
    {
      id: 59,
      question: "What is the speed of sound in a vacuum?",
      options: ["1480 m/s", "343 m/s", "0 m/s", "5960 m/s"],
      correctAnswer: 2,
      explanation: "Sound cannot travel in a vacuum because it requires a medium to propagate.",
    },
    {
      id: 60,
      question: "Which element is essential for the formation of bones and teeth?",
      options: ["Iron", "Calcium", "Iodine", "Zinc"],
      correctAnswer: 1,
      explanation: "Calcium is a major component of bones and teeth.",
    },
    {
      id: 61,
      question: "What is the chemical symbol for zinc?",
      options: ["Zi", "Zn", "Ze", "Zc"],
      correctAnswer: 1,
      explanation: "Zn is the chemical symbol for zinc.",
    },
    {
      id: 62,
      question: "Which planet is known as the 'Water World'?",
      options: ["Earth", "Mars", "Venus", "Neptune"],
      correctAnswer: 0,
      explanation: "Earth is often referred to as the 'Water World' due to its abundant surface water.",
    },
    {
      id: 63,
      question: "What is the study of fish called?",
      options: ["Botany", "Entomology", "Ichthyology", "Ecology"],
      correctAnswer: 2,
      explanation: "Ichthyology is the branch of zoology devoted to the study of fish.",
    },
    {
      id: 64,
      question: "Which gas is used in fire extinguishers?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      correctAnswer: 1,
      explanation: "Carbon dioxide is used in fire extinguishers to smother flames.",
    },
    {
      id: 65,
      question: "What is the unit of electric current?",
      options: ["Volt", "Joule", "Newton", "Ampere"],
      correctAnswer: 3,
      explanation: "The ampere is the unit of electric current in the International System of Units.",
    },
    {
      id: 66,
      question: "Which scientist is known for his work on genetics?",
      options: ["Isaac Newton", "Albert Einstein", "Gregor Mendel", "Charles Darwin"],
      correctAnswer: 2,
      explanation: "Gregor Mendel is known as the 'father of genetics' for his work on pea plants.",
    },
    {
      id: 67,
      question: "What is the chemical formula for ozone?",
      options: ["O3", "CO2", "H2O", "CH4"],
      correctAnswer: 0,
      explanation: "Ozone is a molecule composed of three oxygen atoms (O3).",
    },
    {
      id: 68,
      question: "Which organ produces stomach acid?",
      options: ["Liver", "Kidney", "Stomach", "Lungs"],
      correctAnswer: 3,
      explanation: "The stomach produces hydrochloric acid to aid in digestion.",
    },
    {
      id: 69,
      question: "What is the speed of light in glass?",
      options: ["200,000 km/s", "300,000 km/s", "150,000 km/s", "225,000 km/s"],
      correctAnswer: 0,
      explanation: "Light travels slower in glass than in a vacuum, approximately 200,000 kilometers per second.",
    },
    {
      id: 70,
      question: "Which element is essential for the production of chlorophyll in plants?",
      options: ["Iron", "Magnesium", "Iodine", "Zinc"],
      correctAnswer: 1,
      explanation: "Magnesium is a key component of chlorophyll, which is essential for photosynthesis.",
    },
    {
      id: 71,
      question: "What is the chemical symbol for tin?",
      options: ["Ti", "Sn", "Tn", "In"],
      correctAnswer: 1,
      explanation: "Sn comes from the Latin word 'stannum' meaning tin.",
    },
    {
      id: 72,
      question: "Which planet is known as the 'Ice Giant'?",
      options: ["Earth", "Mars", "Venus", "Uranus"],
      correctAnswer: 3,
      explanation:
        "Uranus is known as an 'Ice Giant' because it is primarily composed of icy materials like water, methane, and ammonia.",
    },
    {
      id: 73,
      question: "What is the study of mammals called?",
      options: ["Botany", "Entomology", "Mammology", "Ecology"],
      correctAnswer: 2,
      explanation: "Mammology is the branch of zoology concerned with the study of mammals.",
    },
    {
      id: 74,
      question: "Which gas is used in welding?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
      correctAnswer: 3,
      explanation: "Argon is used as a shielding gas in welding to prevent oxidation.",
    },
    {
      id: 75,
      question: "What is the unit of electric potential difference?",
      options: ["Volt", "Joule", "Newton", "Ampere"],
      correctAnswer: 0,
      explanation: "The volt is the unit of electric potential difference in the International System of Units.",
    },
    {
      id: 76,
      question: "Which scientist is known for his work on quantum mechanics?",
      options: ["Isaac Newton", "Albert Einstein", "Max Planck", "Charles Darwin"],
      correctAnswer: 2,
      explanation: "Max Planck is considered the founder of quantum mechanics.",
    },
    {
      id: 77,
      question: "What is the chemical formula for hydrogen peroxide?",
      options: ["H2O2", "CO2", "H2O", "CH4"],
      correctAnswer: 0,
      explanation: "Hydrogen peroxide is a chemical compound with the formula H2O2.",
    },
    {
      id: 78,
      question: "Which organ produces hormones that regulate blood sugar?",
      options: ["Liver", "Kidney", "Pancreas", "Lungs"],
      correctAnswer: 2,
      explanation: "The pancreas produces insulin and glucagon, which regulate blood sugar levels.",
    },
    {
      id: 79,
      question: "What is the speed of light in diamond?",
      options: ["124,000 km/s", "300,000 km/s", "150,000 km/s", "225,000 km/s"],
      correctAnswer: 0,
      explanation: "Light travels slower in diamond than in a vacuum, approximately 124,000 kilometers per second.",
    },
    {
      id: 80,
      question: "Which element is essential for the formation of vitamin B12?",
      options: ["Iron", "Cobalt", "Iodine", "Zinc"],
      correctAnswer: 1,
      explanation: "Cobalt is a key component of vitamin B12.",
    },
    {
      id: 81,
      question: "What is the chemical symbol for mercury?",
      options: ["Me", "Hg", "My", "Mc"],
      correctAnswer: 1,
      explanation: "Hg comes from the Latin word 'hydrargyrum' meaning mercury.",
    },
    {
      id: 82,
      question: "Which planet is known as the 'Ringed Planet'?",
      options: ["Earth", "Mars", "Venus", "Saturn"],
      correctAnswer: 3,
      explanation: "Saturn is known as the 'Ringed Planet' due to its prominent ring system.",
    },
    {
      id: 83,
      question: "What is the study of the human body called?",
      options: ["Botany", "Entomology", "Anatomy", "Ecology"],
      correctAnswer: 2,
      explanation: "Anatomy is the branch of science concerned with the study of the structure of the human body.",
    },
    {
      id: 84,
      question: "Which gas is used in neon lights?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Neon"],
      correctAnswer: 3,
      explanation: "Neon gas is used in neon lights to produce a bright orange-red glow.",
    },
    {
      id: 85,
      question: "What is the unit of magnetic field strength?",
      options: ["Volt", "Joule", "Tesla", "Ampere"],
      correctAnswer: 2,
      explanation: "The tesla is the unit of magnetic field strength in the International System of Units.",
    },
    {
      id: 86,
      question: "Which scientist is known for his work on the structure of DNA?",
      options: ["Isaac Newton", "Albert Einstein", "James Watson", "Charles Darwin"],
      correctAnswer: 2,
      explanation: "James Watson and Francis Crick are known for their discovery of the double helix structure of DNA.",
    },
    {
      id: 87,
      question: "What is the chemical formula for sulfuric acid?",
      options: ["H2SO4", "CO2", "H2O", "CH4"],
      correctAnswer: 0,
      explanation: "Sulfuric acid is a strong acid with the formula H2SO4.",
    },
    {
      id: 88,
      question: "Which organ produces digestive enzymes?",
      options: ["Liver", "Kidney", "Pancreas", "Lungs"],
      correctAnswer: 2,
      explanation: "The pancreas produces digestive enzymes that help break down food in the small intestine.",
    },
    {
      id: 89,
      question: "What is the speed of sound in helium?",
      options: ["972 m/s", "343 m/s", "500 m/s", "5960 m/s"],
      correctAnswer: 0,
      explanation: "Sound travels at approximately 972 meters per second in helium.",
    },
    {
      id: 90,
      question: "Which element is essential for the formation of thyroid hormones?",
      options: ["Iron", "Calcium", "Iodine", "Zinc"],
      correctAnswer: 2,
      explanation: "Iodine is a key component of thyroid hormones, which regulate metabolism.",
    },
    {
      id: 91,
      question: "What is the chemical symbol for uranium?",
      options: ["Ur", "U", "Un", "Um"],
      correctAnswer: 1,
      explanation: "U is the chemical symbol for uranium.",
    },
    {
      id: 92,
      question: "Which planet is known as the 'Dwarf Planet'?",
      options: ["Earth", "Mars", "Venus", "Pluto"],
      correctAnswer: 3,
      explanation: "Pluto is classified as a 'Dwarf Planet' by the International Astronomical Union.",
    },
    {
      id: 93,
      question: "What is the study of the nervous system called?",
      options: ["Botany", "Entomology", "Neurology", "Ecology"],
      correctAnswer: 2,
      explanation:
        "Neurology is the branch of medicine concerned with the study and treatment of disorders of the nervous system.",
    },
    {
      id: 94,
      question: "Which gas is used in incandescent light bulbs?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
      correctAnswer: 3,
      explanation: "Argon is used in incandescent light bulbs to prevent the filament from oxidizing.",
    },
    {
      id: 95,
      question: "What is the unit of frequency?",
      options: ["Volt", "Hertz", "Newton", "Ampere"],
      correctAnswer: 1,
      explanation: "The hertz is the unit of frequency in the International System of Units.",
    },
    {
      id: 96,
      question: "Which scientist is known for his work on the Big Bang theory?",
      options: ["Isaac Newton", "Albert Einstein", "Georges Lemaître", "Charles Darwin"],
      correctAnswer: 2,
      explanation: "Georges Lemaître proposed the Big Bang theory, which describes the origin of the universe.",
    },
    {
      id: 97,
      question: "What is the chemical formula for nitric acid?",
      options: ["HNO3", "CO2", "H2O", "CH4"],
      correctAnswer: 0,
      explanation: "Nitric acid is a strong acid with the formula HNO3.",
    },
    {
      id: 98,
      question: "Which organ produces bile salts?",
      options: ["Liver", "Kidney", "Pancreas", "Lungs"],
      correctAnswer: 0,
      explanation: "The liver produces bile salts, which aid in the digestion of fats.",
    },
    {
      id: 99,
      question: "What is the speed of sound in hydrogen?",
      options: ["1300 m/s", "343 m/s", "500 m/s", "5960 m/s"],
      correctAnswer: 0,
      explanation: "Sound travels at approximately 1300 meters per second in hydrogen.",
    },
    {
      id: 100,
      question: "Which element is essential for the formation of red blood cells?",
      options: ["Iron", "Calcium", "Iodine", "Zinc"],
      correctAnswer: 0,
      explanation: "Iron is a key component of hemoglobin, which carries oxygen in red blood cells.",
    },
    {
      id: 101,
      question: "What is the chemical symbol for nickel?",
      options: ["Ni", "Ne", "Nk", "Nc"],
      correctAnswer: 0,
      explanation: "Ni is the chemical symbol for nickel.",
    },
    {
      id: 102,
      question: "Which planet is known as the 'Sister Planet' to Earth?",
      options: ["Earth", "Mars", "Venus", "Neptune"],
      correctAnswer: 2,
      explanation: "Venus is often referred to as Earth's 'Sister Planet' due to its similar size and composition.",
    },
    {
      id: 103,
      question: "What is the study of the heart and blood vessels called?",
      options: ["Botany", "Entomology", "Cardiology", "Ecology"],
      correctAnswer: 2,
      explanation:
        "Cardiology is the branch of medicine concerned with the study and treatment of disorders of the heart and blood vessels.",
    },
    {
      id: 104,
      question: "Which gas is used in arc welding?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
      correctAnswer: 3,
      explanation: "Argon is used as a shielding gas in arc welding to prevent oxidation.",
    },
    {
      id: 105,
      question: "What is the unit of luminous intensity?",
      options: ["Volt", "Hertz", "Candela", "Ampere"],
      correctAnswer: 2,
      explanation: "The candela is the unit of luminous intensity in the International System of Units.",
    },
    {
      id: 106,
      question: "Which scientist is known for his work on the theory of general relativity?",
      options: ["Isaac Newton", "Albert Einstein", "Georges Lemaître", "Charles Darwin"],
      correctAnswer: 1,
      explanation:
        "Albert Einstein developed the theory of general relativity, which describes gravity as a curvature of spacetime.",
    },
    {
      id: 107,
      question: "What is the chemical formula for hydrochloric acid?",
      options: ["HCl", "CO2", "H2O", "CH4"],
      correctAnswer: 0,
      explanation: "Hydrochloric acid is a strong acid with the formula HCl.",
    },
    {
      id: 108,
      question: "Which organ produces lymph?",
      options: ["Liver", "Kidney", "Spleen", "Lungs"],
      correctAnswer: 2,
      explanation: "The spleen produces lymph, which helps filter blood and fight infection.",
    },
    {
      id: 109,
      question: "What is the speed of sound in carbon dioxide?",
      options: ["259 m/s", "343 m/s", "500 m/s", "5960 m/s"],
      correctAnswer: 0,
      explanation: "Sound travels at approximately 259 meters per second in carbon dioxide.",
    },
    {
      id: 110,
      question: "Which element is essential for the formation of vitamin D?",
      options: ["Iron", "Calcium", "Iodine", "Phosphorus"],
      correctAnswer: 3,
      explanation:
        "Phosphorus is essential for the formation of vitamin D, which helps regulate calcium levels in the body.",
    },
    {
      id: 111,
      question: "What is the chemical symbol for gold?",
      options: ["Au", "Ag", "Fe", "Cu"],
      correctAnswer: 0,
      explanation: "Au is the chemical symbol for gold, derived from the Latin word 'aurum'.",
    },
    {
      id: 112,
      question: "Which planet is known as the 'Evening Star'?",
      options: ["Mars", "Jupiter", "Venus", "Saturn"],
      correctAnswer: 2,
      explanation: "Venus is often called the 'Evening Star' because it is visible in the western sky after sunset.",
    },
    {
      id: 113,
      question: "What is the study of the eye called?",
      options: ["Botany", "Entomology", "Ophthalmology", "Ecology"],
      correctAnswer: 2,
      explanation:
        "Ophthalmology is the branch of medicine concerned with the study and treatment of disorders of the eye.",
    },
    {
      id: 114,
      question: "Which gas is used in balloons to make them float?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
      correctAnswer: 3,
      explanation: "Helium is lighter than air, so it makes balloons float.",
    },
    {
      id: 115,
      question: "What is the unit of electric charge?",
      options: ["Volt", "Hertz", "Coulomb", "Ampere"],
      correctAnswer: 2,
      explanation: "The coulomb is the unit of electric charge in the International System of Units.",
    },
    {
      id: 116,
      question: "Which scientist is known for his work on the laws of motion?",
      options: ["Isaac Newton", "Albert Einstein", "Georges Lemaître", "Charles Darwin"],
      correctAnswer: 0,
      explanation:
        "Isaac Newton formulated the three laws of motion, which describe the relationship between force, mass, and acceleration.",
    },
    {
      id: 117,
      question: "What is the chemical formula for acetic acid?",
      options: ["CH3COOH", "CO2", "H2O", "CH4"],
      correctAnswer: 0,
      explanation: "Acetic acid is a weak acid with the formula CH3COOH.",
    },
    {
      id: 118,
      question: "Which organ produces hormones that regulate growth?",
      options: ["Liver", "Kidney", "Pituitary gland", "Lungs"],
      correctAnswer: 2,
      explanation: "The pituitary gland produces growth hormone, which regulates growth and development.",
    },
    {
      id: 119,
      question: "What is the speed of sound in iron?",
      options: ["5120 m/s", "343 m/s", "500 m/s", "5960 m/s"],
      correctAnswer: 0,
      explanation: "Sound travels at approximately 5120 meters per second in iron.",
    },
    {
      id: 120,
      question: "Which element is essential for the formation of hemoglobin?",
      options: ["Iron", "Calcium", "Iodine", "Zinc"],
      correctAnswer: 0,
      explanation: "Iron is a key component of hemoglobin, which carries oxygen in red blood cells.",
    },
    {
      id: 121,
      question: "What is the chemical symbol for platinum?",
      options: ["Pt", "Pl", "Pa", "Po"],
      correctAnswer: 0,
      explanation: "Pt is the chemical symbol for platinum.",
    },
    {
      id: 122,
      question: "Which planet is known as the 'Red Planet'?",
      options: ["Earth", "Mars", "Venus", "Neptune"],
      correctAnswer: 1,
      explanation: "Mars is known as the 'Red Planet' due to the presence of iron oxide on its surface.",
    },
    {
      id: 123,
      question: "What is the study of the skin called?",
      options: ["Botany", "Entomology", "Dermatology", "Ecology"],
      correctAnswer: 2,
      explanation:
        "Dermatology is the branch of medicine concerned with the study and treatment of disorders of the skin.",
    },
    {
      id: 124,
      question: "Which gas is used in welding?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
      correctAnswer: 3,
      explanation: "Argon is used as a shielding gas in welding to prevent oxidation.",
    },
    {
      id: 125,
      question: "What is the unit of resistance?",
      options: ["Volt", "Hertz", "Ohm", "Ampere"],
      correctAnswer: 2,
      explanation: "The ohm is the unit of resistance in the International System of Units.",
    },
    {
      id: 126,
      question: "Which scientist is known for his work on the theory of evolution?",
      options: ["Isaac Newton", "Albert Einstein", "Georges Lemaître", "Charles Darwin"],
      correctAnswer: 3,
      explanation: "Charles Darwin developed the theory of evolution by natural selection.",
    },
    {
      id: 127,
      question: "What is the chemical formula for sodium hydroxide?",
      options: ["NaOH", "CO2", "H2O", "CH4"],
      correctAnswer: 0,
      explanation: "Sodium hydroxide is a strong base with the formula NaOH.",
    },
    {
      id: 128,
      question: "Which organ produces insulin?",
      options: ["Liver", "Kidney", "Pancreas", "Lungs"],
      correctAnswer: 2,
      explanation: "The pancreas produces insulin, which regulates blood sugar levels.",
    },
    {
      id: 129,
      question: "What is the speed of sound in aluminum?",
      options: ["6420 m/s", "343 m/s", "500 m/s", "5960 m/s"],
      correctAnswer: 0,
      explanation: "Sound travels at approximately 6420 meters per second in aluminum.",
    },
    {
      id: 130,
      question: "Which element is essential for the formation of bones and teeth?",
      options: ["Iron", "Calcium", "Iodine", "Zinc"],
      correctAnswer: 1,
      explanation: "Calcium is a major component of bones and teeth.",
    },
    {
      id: 131,
      question: "What is the chemical symbol for silver?",
      options: ["Ag", "Au", "Fe", "Cu"],
      correctAnswer: 0,
      explanation: "Ag is the chemical symbol for silver, derived from the Latin word 'argentum'.",
    },
    {
      id: 132,
      question: "Which planet is known as the 'Morning Star'?",
      options: ["Mars", "Jupiter", "Venus", "Saturn"],
      correctAnswer: 2,
      explanation: "Venus is often called the 'Morning Star' because it is visible in the eastern sky before sunrise.",
    },
    {
      id: 133,
      question: "What is the study of the ear called?",
      options: ["Botany", "Entomology", "Otolaryngology", "Ecology"],
      correctAnswer: 2,
      explanation:
        "Otolaryngology is the branch of medicine concerned with the study and treatment of disorders of the ear, nose, and throat.",
    },
    {
      id: 134,
      question: "Which gas is used in fire extinguishers?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
      correctAnswer: 1,
      explanation: "Carbon dioxide is used in fire extinguishers to smother flames.",
    },
    {
      id: 135,
      question: "What is the unit of capacitance?",
      options: ["Volt", "Hertz", "Farad", "Ampere"],
      correctAnswer: 2,
      explanation: "The farad is the unit of capacitance in the International System of Units.",
    },
    {
      id: 136,
      question: "Which scientist is known for his work on the structure of the atom?",
      options: ["Isaac Newton", "Albert Einstein", "Ernest Rutherford", "Charles Darwin"],
      correctAnswer: 2,
      explanation: "Ernest Rutherford discovered the nucleus of the atom and developed a model of atomic structure.",
    },
    {
      id: 137,
      question: "What is the chemical formula for potassium chloride?",
      options: ["KCl", "CO2", "H2O", "CH4"],
      correctAnswer: 0,
      explanation: "Potassium chloride is a salt with the formula KCl.",
    },
    {
      id: 138,
      question: "Which organ produces bile?",
      options: ["Liver", "Kidney", "Gallbladder", "Lungs"],
      correctAnswer: 0,
      explanation: "The liver produces bile, which aids in the digestion of fats.",
    },
    {
      id: 139,
      question: "What is the speed of sound in seawater?",
      options: ["1531 m/s", "343 m/s", "500 m/s", "5960 m/s"],
      correctAnswer: 0,
      explanation: "Sound travels at approximately 1531 meters per second in seawater.",
    },
    {
      id: 140,
      question: "Which element is essential for the formation of thyroid hormones?",
      options: ["Iron", "Calcium", "Iodine", "Zinc"],
      correctAnswer: 2,
      explanation: "Iodine is a key component of thyroid hormones, which regulate metabolism.",
    },
    {
      id: 141,
      question: "What is the chemical symbol for copper?",
      options: ["Cu", "Co", "Ca", "Cr"],
      correctAnswer: 0,
      explanation: "Cu is the chemical symbol for copper, derived from the Latin word 'cuprum'.",
    },
    {
      id: 142,
      question: "Which planet is known as the 'Ice Giant'?",
      options: ["Earth", "Mars", "Venus", "Neptune"],
      correctAnswer: 3,
      explanation:
        "Neptune is known as an 'Ice Giant' because it is primarily composed of icy materials like water, methane, and ammonia.",
    },
    {
      id: 143,
      question: "What is the study of the brain called?",
      options: ["Botany", "Entomology", "Neuroscience", "Ecology"],
      correctAnswer: 2,
      explanation: "Neuroscience is the study of the nervous system, including the brain.",
    },
    {
      id: 144,
      question: "Which gas is used in fluorescent light bulbs?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
      correctAnswer: 3,
      explanation: "Argon is used in fluorescent light bulbs to prevent the filament from oxidizing.",
    },
    {
      id: 145,
      question: "What is the unit of inductance?",
      options: ["Volt", "Hertz", "Henry", "Ampere"],
      correctAnswer: 2,
      explanation: "The henry is the unit of inductance in the International System of Units.",
    },
    {
      id: 146,
      question: "Which scientist is known for his work on the periodic table?",
      options: ["Isaac Newton", "Albert Einstein", "Dmitri Mendeleev", "Charles Darwin"],
      correctAnswer: 2,
      explanation:
        "Dmitri Mendeleev created the periodic table, which organizes elements based on their atomic properties.",
    },
    {
      id: 147,
      question: "What is the chemical formula for calcium carbonate?",
      options: ["CaCO3", "CO2", "H2O", "CH4"],
      correctAnswer: 0,
      explanation: "Calcium carbonate is a common compound found in rocks and shells with the formula CaCO3.",
    },
    {
      id: 148,
      question: "Which organ produces red blood cells?",
      options: ["Liver", "Kidney", "Bone marrow", "Lungs"],
      correctAnswer: 2,
      explanation: "Red blood cells are produced in the bone marrow through a process called hematopoiesis.",
    },
    {
      id: 149,
      question: "What is the speed of sound in wood?",
      options: ["3810 m/s", "343 m/s", "500 m/s", "5960 m/s"],
      correctAnswer: 0,
      explanation: "Sound travels at approximately 3810 meters per second in wood.",
    },
    {
      id: 150,
      question: "What is the term for animals that are active during twilight?",
      options: ["Diurnal", "Nocturnal", "Crepuscular", "Cathemeral"],
      correctAnswer: 2,
      explanation: "Crepuscular animals are most active during twilight hours at dawn and dusk.",
    },
  ],
  history: [
    {
      id: 1,
      question: "In which year did World War II end?",
      options: ["1944", "1945", "1946", "1947"],
      correctAnswer: 1,
      explanation: "World War II ended in 1945 with Japan's surrender in September.",
    },
    {
      id: 2,
      question: "Who was the first person to walk on the moon?",
      options: ["Buzz Aldrin", "Neil Armstrong", "John Glenn", "Alan Shepard"],
      correctAnswer: 1,
      explanation: "Neil Armstrong was the first person to walk on the moon on July 20, 1969.",
    },
    {
      id: 3,
      question: "Which ancient wonder of the world was located in Alexandria?",
      options: ["Hanging Gardens", "Lighthouse", "Colossus", "Mausoleum"],
      correctAnswer: 1,
      explanation: "The Lighthouse of Alexandria was one of the Seven Wonders of the Ancient World.",
    },
    {
      id: 4,
      question: "The Berlin Wall fell in which year?",
      options: ["1987", "1988", "1989", "1990"],
      correctAnswer: 2,
      explanation: "The Berlin Wall fell on November 9, 1989, marking the end of the Cold War era.",
    },
    {
      id: 5,
      question: "Who was known as the 'Iron Lady'?",
      options: ["Queen Elizabeth II", "Margaret Thatcher", "Indira Gandhi", "Golda Meir"],
      correctAnswer: 1,
      explanation: "Margaret Thatcher, the UK Prime Minister from 1979-1990, was known as the 'Iron Lady'.",
    },
    {
      id: 6,
      question: "Which empire was ruled by Julius Caesar?",
      options: ["Greek", "Roman", "Persian", "Egyptian"],
      correctAnswer: 1,
      explanation: "Julius Caesar was a Roman general and statesman who ruled the Roman Empire.",
    },
    {
      id: 7,
      question: "The American Civil War ended in which year?",
      options: ["1863", "1864", "1865", "1866"],
      correctAnswer: 2,
      explanation: "The American Civil War ended in 1865 with the surrender of Confederate forces.",
    },
    {
      id: 8,
      question: "Who was the first President of the United States?",
      options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
      correctAnswer: 2,
      explanation: "George Washington was the first President of the United States (1789-1797).",
    },
    {
      id: 9,
      question: "Which war was fought between 1914-1918?",
      options: ["World War II", "World War I", "Korean War", "Vietnam War"],
      correctAnswer: 1,
      explanation: "World War I was fought from 1914 to 1918.",
    },
    {
      id: 10,
      question: "The French Revolution began in which year?",
      options: ["1789", "1790", "1791", "1792"],
      correctAnswer: 0,
      explanation: "The French Revolution began in 1789 with the storming of the Bastille.",
    },
    {
      id: 11,
      question: "Who was the Egyptian queen who had relationships with Julius Caesar and Mark Antony?",
      options: ["Nefertiti", "Hatshepsut", "Cleopatra", "Ankhesenamun"],
      correctAnswer: 2,
      explanation: "Cleopatra VII was the last pharaoh of Egypt and had famous relationships with both Roman leaders.",
    },
    {
      id: 12,
      question: "The Renaissance period began in which country?",
      options: ["France", "Germany", "Italy", "England"],
      correctAnswer: 2,
      explanation: "The Renaissance began in Italy during the 14th century.",
    },
    {
      id: 13,
      question: "Which explorer is credited with discovering America?",
      options: ["Vasco da Gama", "Christopher Columbus", "Ferdinand Magellan", "Marco Polo"],
      correctAnswer: 1,
      explanation: "Christopher Columbus is credited with discovering America in 1492.",
    },
    {
      id: 14,
      question: "The Great Wall of China was built to defend against which people?",
      options: ["Japanese", "Koreans", "Mongols", "Russians"],
      correctAnswer: 2,
      explanation: "The Great Wall was built primarily to defend against Mongol invasions.",
    },
    {
      id: 15,
      question: "Who wrote the Communist Manifesto?",
      options: ["Lenin", "Stalin", "Marx and Engels", "Trotsky"],
      correctAnswer: 2,
      explanation: "Karl Marx and Friedrich Engels wrote the Communist Manifesto in 1848.",
    },
    {
      id: 16,
      question: "The Titanic sank in which year?",
      options: ["1910", "1911", "1912", "1913"],
      correctAnswer: 2,
      explanation: "The RMS Titanic sank on April 15, 1912, after hitting an iceberg.",
    },
    {
      id: 17,
      question: "Which ancient civilization built Machu Picchu?",
      options: ["Aztec", "Maya", "Inca", "Olmec"],
      correctAnswer: 2,
      explanation: "Machu Picchu was built by the Inca civilization in the 15th century.",
    },
    {
      id: 18,
      question: "The Cold War was primarily between which two superpowers?",
      options: ["USA and China", "USA and USSR", "UK and USSR", "France and Germany"],
      correctAnswer: 1,
      explanation: "The Cold War was primarily between the United States and the Soviet Union.",
    },
    {
      id: 19,
      question: "Who was the British Prime Minister during most of World War II?",
      options: ["Neville Chamberlain", "Winston Churchill", "Clement Attlee", "Anthony Eden"],
      correctAnswer: 1,
      explanation: "Winston Churchill was the British Prime Minister during most of World War II.",
    },
    {
      id: 20,
      question: "The Boston Tea Party occurred in which year?",
      options: ["1771", "1772", "1773", "1774"],
      correctAnswer: 2,
      explanation: "The Boston Tea Party occurred on December 16, 1773.",
    },
    {
      id: 21,
      question: "Which empire was known as the 'Land of the Rising Sun'?",
      options: ["Chinese Empire", "Japanese Empire", "Korean Empire", "Mongol Empire"],
      correctAnswer: 1,
      explanation: "Japan has been known as the 'Land of the Rising Sun' for centuries.",
    },
    {
      id: 22,
      question: "The Hundred Years' War was fought between which two countries?",
      options: ["England and France", "Spain and Portugal", "Germany and Austria", "Italy and Greece"],
      correctAnswer: 0,
      explanation: "The Hundred Years' War (1337-1453) was fought between England and France.",
    },
    {
      id: 23,
      question: "Who was the first person to circumnavigate the globe?",
      options: ["Christopher Columbus", "Vasco da Gama", "Ferdinand Magellan", "James Cook"],
      correctAnswer: 2,
      explanation: "Ferdinand Magellan's expedition was the first to circumnavigate the globe (1519-1522).",
    },
    {
      id: 24,
      question: "The Silk Road connected which two regions?",
      options: ["Europe and Africa", "Asia and Europe", "America and Asia", "Africa and America"],
      correctAnswer: 1,
      explanation: "The Silk Road was an ancient trade route connecting Asia and Europe.",
    },
    {
      id: 25,
      question: "Which pharaoh built the Great Pyramid of Giza?",
      options: ["Tutankhamun", "Ramesses II", "Khufu", "Akhenaten"],
      correctAnswer: 2,
      explanation: "The Great Pyramid of Giza was built for Pharaoh Khufu around 2580-2560 BC.",
    },
    {
      id: 26,
      question: "The Battle of Hastings occurred in which year?",
      options: ["1066", "1215", "1492", "1776"],
      correctAnswer: 0,
      explanation: "The Battle of Hastings took place in 1066, marking the Norman conquest of England.",
    },
    {
      id: 27,
      question: "Who painted the Sistine Chapel ceiling?",
      options: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"],
      correctAnswer: 2,
      explanation: "Michelangelo painted the Sistine Chapel ceiling between 1508 and 1512.",
    },
    {
      id: 28,
      question: "The Magna Carta was signed in which year?",
      options: ["1066", "1215", "1492", "1776"],
      correctAnswer: 1,
      explanation: "The Magna Carta was signed in 1215, limiting the power of the English monarch.",
    },
    {
      id: 29,
      question: "Who was the first Roman Emperor?",
      options: ["Julius Caesar", "Augustus", "Nero", "Caligula"],
      correctAnswer: 1,
      explanation: "Augustus was the first Roman Emperor, ruling from 27 BC to 14 AD.",
    },
    {
      id: 30,
      question: "The Black Death pandemic occurred in which century?",
      options: ["12th century", "13th century", "14th century", "15th century"],
      correctAnswer: 2,
      explanation: "The Black Death pandemic occurred in the 14th century, devastating Europe and Asia.",
    },
    {
      id: 31,
      question: "Which country was ruled by Queen Victoria?",
      options: ["France", "Spain", "England", "Russia"],
      correctAnswer: 2,
      explanation: "Queen Victoria ruled the United Kingdom of Great Britain and Ireland from 1837 to 1901.",
    },
    {
      id: 32,
      question: "The Russian Revolution began in which year?",
      options: ["1905", "1917", "1922", "1939"],
      correctAnswer: 1,
      explanation: "The Russian Revolution began in 1917, leading to the overthrow of the Tsarist regime.",
    },
    {
      id: 33,
      question: "Who was the leader of Nazi Germany?",
      options: ["Benito Mussolini", "Joseph Stalin", "Adolf Hitler", "Winston Churchill"],
      correctAnswer: 2,
      explanation: "Adolf Hitler was the leader of Nazi Germany from 1933 to 1945.",
    },
    {
      id: 34,
      question: "The Korean War began in which year?",
      options: ["1945", "1950", "1955", "1960"],
      correctAnswer: 1,
      explanation: "The Korean War began in 1950, pitting North Korea against South Korea and their respective allies.",
    },
    {
      id: 35,
      question: "Who was the first woman Prime Minister of the United Kingdom?",
      options: ["Indira Gandhi", "Golda Meir", "Margaret Thatcher", "Angela Merkel"],
      correctAnswer: 2,
      explanation:
        "Margaret Thatcher was the first woman Prime Minister of the United Kingdom, serving from 1979 to 1990.",
    },
    {
      id: 36,
      question: "The Vietnam War ended in which year?",
      options: ["1965", "1970", "1975", "1980"],
      correctAnswer: 2,
      explanation: "The Vietnam War ended in 1975 with the fall of Saigon to North Vietnamese forces.",
    },
    {
      id: 37,
      question: "Who was the leader of the Soviet Union during the Cuban Missile Crisis?",
      options: ["Joseph Stalin", "Nikita Khrushchev", "Leonid Brezhnev", "Mikhail Gorbachev"],
      correctAnswer: 1,
      explanation: "Nikita Khrushchev was the leader of the Soviet Union during the Cuban Missile Crisis in 1962.",
    },
    {
      id: 38,
      question: "The Persian Gulf War began in which year?",
      options: ["1980", "1985", "1990", "1995"],
      correctAnswer: 2,
      explanation: "The Persian Gulf War began in 1990 with Iraq's invasion of Kuwait.",
    },
    {
      id: 39,
      question: "Who was the first African American President of the United States?",
      options: ["Martin Luther King Jr.", "Malcolm X", "Barack Obama", "Colin Powell"],
      correctAnswer: 2,
      explanation:
        "Barack Obama was the first African American President of the United States, serving from 2009 to 2017.",
    },
    {
      id: 40,
      question: "The Arab Spring uprisings began in which year?",
      options: ["2005", "2010", "2015", "2020"],
      correctAnswer: 1,
      explanation: "The Arab Spring uprisings began in 2010, spreading across the Middle East and North Africa.",
    },
    {
      id: 41,
      question: "Which ancient civilization built the Colosseum?",
      options: ["Greek", "Roman", "Persian", "Egyptian"],
      correctAnswer: 1,
      explanation: "The Colosseum was built by the Roman Empire in the 1st century AD.",
    },
    {
      id: 42,
      question: "The Protestant Reformation began in which century?",
      options: ["14th century", "15th century", "16th century", "17th century"],
      correctAnswer: 2,
      explanation:
        "The Protestant Reformation began in the 16th century with Martin Luther's challenge to the Catholic Church.",
    },
    {
      id: 43,
      question: "Who was the first Prime Minister of India?",
      options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Indira Gandhi", "Rajiv Gandhi"],
      correctAnswer: 1,
      explanation: "Jawaharlal Nehru was the first Prime Minister of India, serving from 1947 to 1964.",
    },
    {
      id: 44,
      question: "The Rwandan Genocide occurred in which year?",
      options: ["1984", "1994", "2004", "2014"],
      correctAnswer: 1,
      explanation:
        "The Rwandan Genocide occurred in 1994, resulting in the mass slaughter of hundreds of thousands of people.",
    },
    {
      id: 45,
      question: "Who was the leader of the Bolshevik Revolution?",
      options: ["Vladimir Lenin", "Joseph Stalin", "Leon Trotsky", "Nikita Khrushchev"],
      correctAnswer: 0,
      explanation:
        "Vladimir Lenin was the leader of the Bolshevik Revolution, which led to the establishment of the Soviet Union.",
    },
    {
      id: 46,
      question: "The Spanish Civil War ended in which year?",
      options: ["1936", "1939", "1945", "1950"],
      correctAnswer: 1,
      explanation:
        "The Spanish Civil War ended in 1939 with the victory of the Nationalist forces led by General Francisco Franco.",
    },
    {
      id: 47,
      question: "Who was the first President of South Africa after apartheid?",
      options: ["Nelson Mandela", "Desmond Tutu", "F.W. de Klerk", "Thabo Mbeki"],
      correctAnswer: 0,
      explanation: "Nelson Mandela was the first President of South Africa after the end of apartheid in 1994.",
    },
    {
      id: 48,
      question: "The Six-Day War was fought between which countries?",
      options: ["Israel and Egypt", "Israel and Syria", "Israel and Jordan", "Israel and its Arab neighbors"],
      correctAnswer: 3,
      explanation:
        "The Six-Day War was fought in 1967 between Israel and its Arab neighbors, including Egypt, Syria, and Jordan.",
    },
    {
      id: 49,
      question: "Who was the first woman to travel to space?",
      options: ["Valentina Tereshkova", "Sally Ride", "Svetlana Savitskaya", "Judith Resnik"],
      correctAnswer: 0,
      explanation:
        "Valentina Tereshkova was the first woman to travel to space in 1963 aboard the Vostok 6 spacecraft.",
    },
    {
      id: 50,
      question: "The fall of the Aztec Empire occurred in which year?",
      options: ["1492", "1519", "1521", "1532"],
      correctAnswer: 2,
      explanation: "The Aztec Empire fell in 1521 with the Spanish conquest of Tenochtitlan led by Hernán Cortés.",
    },
    {
      id: 51,
      question: "Which dynasty ruled China during the construction of the Forbidden City?",
      options: ["Tang Dynasty", "Song Dynasty", "Ming Dynasty", "Qing Dynasty"],
      correctAnswer: 2,
      explanation: "The Ming Dynasty ruled China during the construction of the Forbidden City in the 15th century.",
    },
    {
      id: 52,
      question: "The Battle of Gettysburg was a turning point in which war?",
      options: ["American Revolution", "War of 1812", "American Civil War", "World War I"],
      correctAnswer: 2,
      explanation: "The Battle of Gettysburg was a turning point in the American Civil War, fought in 1863.",
    },
    {
      id: 53,
      question: "Who was the first woman to serve on the U.S. Supreme Court?",
      options: ["Sandra Day O'Connor", "Ruth Bader Ginsburg", "Sonia Sotomayor", "Elena Kagan"],
      correctAnswer: 0,
      explanation: "Sandra Day O'Connor was the first woman to serve on the U.S. Supreme Court, appointed in 1981.",
    },
    {
      id: 54,
      question: "The fall of the Berlin Wall led to the reunification of which country?",
      options: ["Austria", "Czechoslovakia", "Germany", "Yugoslavia"],
      correctAnswer: 2,
      explanation: "The fall of the Berlin Wall in 1989 paved the way for the reunification of Germany in 1990.",
    },
    {
      id: 55,
      question: "Who was the leader of the Indian independence movement?",
      options: ["Jawaharlal Nehru", "Indira Gandhi", "Mahatma Gandhi", "Sardar Patel"],
      correctAnswer: 2,
      explanation:
        "Mahatma Gandhi was the leader of the Indian independence movement, advocating for nonviolent resistance against British rule.",
    },
    {
      id: 56,
      question: "The Cuban Revolution led to the establishment of a communist state under which leader?",
      options: ["Fidel Castro", "Che Guevara", "Raúl Castro", "Fulgencio Batista"],
      correctAnswer: 0,
      explanation: "Fidel Castro led the Cuban Revolution, establishing a communist state in 1959.",
    },
  ],
}

export default function QuizScreen({ category, onQuizComplete, onBack }: QuizScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [timer, setTimer] = useState(300) // 5 minutes in seconds

  useEffect(() => {
    const selectedQuestions = questionBank[category]
    if (selectedQuestions) {
      // Shuffle the array using Fisher-Yates shuffle algorithm
      const shuffledQuestions = [...selectedQuestions].sort(() => Math.random() - 0.5)
      setQuestions(shuffledQuestions)
    }
  }, [category])

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (!quizCompleted && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    } else if (timer === 0) {
      setQuizCompleted(true)
    }

    return () => clearInterval(intervalId)
  }, [quizCompleted, timer])

  const currentQuestion = questions[currentQuestionIndex]

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex)
  }

  const handleNextQuestion = () => {
    if (selectedOption === null) {
      alert("Please select an answer.")
      return
    }

    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1)
    }

    setSelectedOption(null)

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setQuizCompleted(true)
    }
  }

  const handleCompleteQuiz = () => {
    if (selectedOption === null) {
      alert("Please select an answer.")
      return
    }

    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1)
    }
    setQuizCompleted(true)
    onQuizComplete(score, questions.length)
  }

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  if (questions.length === 0) {
    return <div>Loading questions...</div>
  }

  if (quizCompleted) {
    return (
      <Card className="w-[500px] p-4">
        <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-lg">
          Your Score: {score} / {questions.length}
        </p>
        <Button onClick={() => onQuizComplete(score, questions.length)}>See Results</Button>
      </Card>
    )
  }

  return (
    <Card className="w-[500px] p-4">
      <Button variant="ghost" onClick={onBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Categories
      </Button>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Question {currentQuestionIndex + 1}</h2>
        <div className="flex items-center">
          <Clock className="mr-2 h-4 w-4" />
          <span>{formatTime(timer)}</span>
        </div>
      </div>
      <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="mb-2" />
      <p className="text-gray-500">
        {currentQuestionIndex + 1} of {questions.length}
      </p>
      <div className="mb-6">
        <p className="text-lg font-semibold">{currentQuestion.question}</p>
        <ul className="mt-2">
          {currentQuestion.options.map((option, index) => (
            <li key={index} className="mb-1">
              <Button
                variant="outline"
                className={`w-full justify-start ${selectedOption === index ? "bg-secondary text-secondary-foreground" : ""}`}
                onClick={() => handleOptionSelect(index)}
              >
                {option}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      {currentQuestion.explanation && selectedOption !== null && (
        <div className="mb-4 p-4 bg-gray-100 rounded-md">
          <h3 className="font-semibold">Explanation:</h3>
          <p>{currentQuestion.explanation}</p>
        </div>
      )}
      {currentQuestionIndex < questions.length - 1 ? (
        <Button onClick={handleNextQuestion} disabled={selectedOption === null}>
          Next Question
        </Button>
      ) : (
        <Button onClick={handleCompleteQuiz} disabled={selectedOption === null}>
          Complete Quiz
        </Button>
      )}
    </Card>
  )
}

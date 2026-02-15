// Client-side fortune generation (for static deployment like GitHub Pages)
import {
  getZodiacAnimal,
  getElement,
  getLunarAge,
  ZODIAC_ANIMALS,
  getRandomFortune,
  TOPIC_ADVICE,
} from '@/data/zodiac';

export interface FortuneResult {
  name: string;
  birthYear: number;
  zodiacAnimal: string;
  zodiacInfo: {
    name: string;
    emoji: string;
    element: string;
    luckyColor: string;
    luckyNumber: number[];
  };
  lunarAge: number;
  topic: string;
  fortune: {
    id: number;
    name: string;
    rating: number;
    title: string;
    poem: string;
    topicFortune: string;
    advice: string;
  };
  isAI: boolean;
}

const TOPIC_MAP: Record<string, string> = {
  love: 'Tình duyên',
  career: 'Sự nghiệp',
  education: 'Học hành',
};

export function generateFortune(name: string, birthYear: number, topic: string): FortuneResult {
  const year = typeof birthYear === 'string' ? parseInt(birthYear) : birthYear;
  const zodiacAnimal = getZodiacAnimal(year);
  const element = getElement(year);
  const lunarAge = getLunarAge(year);
  const zodiacInfo = ZODIAC_ANIMALS[zodiacAnimal];
  const fortune = getRandomFortune(topic);

  const topicLabel = TOPIC_MAP[topic] || 'Tổng quan';

  // Topic-specific fortune text
  let topicFortune = zodiacInfo.overview;
  if (topic === 'love') topicFortune = zodiacInfo.love;
  else if (topic === 'career') topicFortune = zodiacInfo.career;
  else if (topic === 'education') topicFortune = zodiacInfo.education;

  // Random advice from topic database
  const topicAdvices = TOPIC_ADVICE[topic] || TOPIC_ADVICE['career'];
  const advice = topicAdvices[Math.floor(Math.random() * topicAdvices.length)];

  return {
    name,
    birthYear: year,
    zodiacAnimal,
    zodiacInfo: {
      name: zodiacInfo.name,
      emoji: zodiacInfo.emoji,
      element,
      luckyColor: zodiacInfo.luckyColor,
      luckyNumber: zodiacInfo.luckyNumber,
    },
    lunarAge,
    topic: topicLabel,
    fortune: {
      id: fortune.id,
      name: fortune.name,
      rating: fortune.rating,
      title: fortune.title,
      poem: fortune.poem,
      topicFortune,
      advice,
    },
    isAI: false,
  };
}

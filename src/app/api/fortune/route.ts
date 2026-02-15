import { NextRequest, NextResponse } from 'next/server';
import {
  getZodiacAnimal,
  getElement,
  getLunarAge,
  ZODIAC_ANIMALS,
  getRandomFortune,
  TOPIC_ADVICE,
} from '@/data/zodiac';

// Build the AI prompt for fortune generation
function buildPrompt(name: string, year: number, zodiacName: string, element: string, lunarAge: number, topicLabel: string, topicFortune: string, advice: string) {
  return `Bạn là một nhà tử vi và văn hóa Tết Việt Nam. Dựa trên thông tin sau:
- Tên: ${name}
- Năm sinh: ${year} (Tuổi ${zodiacName}, mệnh ${element})
- Tuổi mụ: ${lunarAge}
- Chủ đề: ${topicLabel}
- Tử vi năm 2026 (Bính Ngọ): ${topicFortune}
- Lời khuyên chung: ${advice}

Hãy viết:
1. Một lời chúc Tết 2026 có vần điệu (4-6 câu thơ lục bát hoặc thất ngôn), đề cập đến tên ${name} và con giáp ${zodiacName}.
2. Một lời khuyên thực tế và cụ thể cho năm Bính Ngọ 2026 (3-4 câu) dựa trên tử vi trên.

Lưu ý: 
- Lời chúc phải TÍCH CỰC, vui vẻ, mang tính khích lệ
- Dùng ngôn ngữ trang trọng nhưng gần gũi
- Nhắc đến con Ngựa (năm Bính Ngọ) trong lời chúc
- Format: Phần thơ đặt trong dấu [THƠ]...[/THƠ], phần khuyên trong [KHUYÊN]...[/KHUYÊN]`;
}

// Parse AI response into poem + advice
function parseAIResponse(aiResponse: string): { poem: string | null; advice: string | null } {
  const poemMatch = aiResponse.match(/\[THƠ\]([\s\S]*?)\[\/THƠ\]/);
  const adviceMatch = aiResponse.match(/\[KHUYÊN\]([\s\S]*?)\[\/KHUYÊN\]/);

  let poem = poemMatch ? poemMatch[1].trim() : null;
  let advice = adviceMatch ? adviceMatch[1].trim() : null;

  // Nếu không parse được format, dùng toàn bộ response
  if (!poem && !advice) {
    const lines = aiResponse.split('\n').filter(l => l.trim());
    if (lines.length > 4) {
      poem = lines.slice(0, 4).join('\n');
      advice = lines.slice(4).join(' ');
    }
  }

  return { poem, advice };
}

// Try Google Gemini API (Free tier: 15 req/min)
async function tryGeminiAPI(prompt: string): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your-gemini-api-key-here') return null;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.85,
            maxOutputTokens: 600,
          },
        }),
      }
    );

    if (!response.ok) {
      console.error('Gemini API status:', response.status);
      return null;
    }

    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (err) {
    console.error('Gemini API error:', err);
    return null;
  }
}

// Try OpenAI API
async function tryOpenAIAPI(prompt: string): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === 'sk-your-api-key-here') return null;

  try {
    const OpenAI = (await import('openai')).default;
    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 600,
      temperature: 0.85,
    });

    return completion.choices[0]?.message?.content || null;
  } catch (err) {
    console.error('OpenAI API error:', err);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, birthYear, topic } = body;

    if (!name || !birthYear || !topic) {
      return NextResponse.json(
        { error: 'Vui lòng điền đầy đủ thông tin' },
        { status: 400 }
      );
    }

    const year = parseInt(birthYear);
    const zodiacAnimal = getZodiacAnimal(year);
    const element = getElement(year);
    const lunarAge = getLunarAge(year);
    const zodiacInfo = ZODIAC_ANIMALS[zodiacAnimal];
    const fortune = getRandomFortune(topic);

    const topicMap: Record<string, string> = {
      love: 'Tình duyên',
      career: 'Sự nghiệp',
      education: 'Học hành',
    };
    const topicLabel = topicMap[topic] || 'Tổng quan';

    // Lấy thông tin tử vi theo chủ đề
    let topicFortune = zodiacInfo.overview;
    if (topic === 'love') topicFortune = zodiacInfo.love;
    else if (topic === 'career') topicFortune = zodiacInfo.career;
    else if (topic === 'education') topicFortune = zodiacInfo.education;

    // Lấy lời khuyên theo chủ đề từ local DB
    const topicAdvices = TOPIC_ADVICE[topic] || TOPIC_ADVICE['career'];
    const localAdvice = topicAdvices[Math.floor(Math.random() * topicAdvices.length)];

    // Build prompt for AI
    const prompt = buildPrompt(name, year, zodiacInfo.name, element, lunarAge, topicLabel, topicFortune, zodiacInfo.advice);

    // Try AI APIs: Gemini first (free), then OpenAI as fallback
    let aiResponse = await tryGeminiAPI(prompt);
    if (!aiResponse) {
      aiResponse = await tryOpenAIAPI(prompt);
    }

    // Parse AI response hoặc dùng local fortune
    let poem = fortune.poem;
    let advice = localAdvice || zodiacInfo.advice;

    if (aiResponse) {
      const parsed = parseAIResponse(aiResponse);
      if (parsed.poem) poem = parsed.poem;
      if (parsed.advice) advice = parsed.advice;
    }

    const result = {
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
        poem,
        topicFortune,
        advice,
      },
      isAI: !!aiResponse,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Fortune API error:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi, vui lòng thử lại' },
      { status: 500 }
    );
  }
}

// AI Exam generation helper. Uses OpenAI if VITE_OPENAI_API_KEY is set,
// otherwise returns a mocked exam for local development.

async function callOpenAI(prompt) {
  const apiKey = import.meta?.env?.VITE_OPENAI_API_KEY
  if (!apiKey) return null

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You generate structured JSON for exams with questions.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
      }),
    })
    const data = await res.json()
    const content = data?.choices?.[0]?.message?.content?.trim()
    if (!content) return null
    // Expect the assistant to return valid JSON only
    const jsonStart = content.indexOf('{')
    const jsonEnd = content.lastIndexOf('}')
    if (jsonStart === -1 || jsonEnd === -1) return null
    const json = JSON.parse(content.slice(jsonStart, jsonEnd + 1))
    return json
  } catch (e) {
    return null
  }
}

export async function generateExamWithAI({ topic, difficulty = 'medium', numQuestions = 5, durationMinutes = 30 }) {
  const prompt = `Generate a JSON exam with keys: title, durationMinutes, questions.
  - Title should include the topic.
  - durationMinutes should be ${durationMinutes}.
  - questions is an array of ${numQuestions} items. Each question has: id, type (mcq | boolean | essay), text, options (for mcq only).
  - For mcq provide 3-4 plausible options.
  Topic: ${topic}. Difficulty: ${difficulty}. Return JSON only.`

  const ai = await callOpenAI(prompt)
  if (ai && ai?.questions?.length) {
    // Normalize shape
    return {
      title: ai.title || `${topic} Exam`,
      durationMinutes: ai.durationMinutes || durationMinutes,
      questions: ai.questions.map((q, idx) => ({
        id: q.id || `q${idx + 1}`,
        type: q.type === 'true_false' ? 'boolean' : q.type,
        text: q.text,
        options: q.options || undefined,
      })),
    }
  }

  // Fallback mock
  const questions = Array.from({ length: numQuestions }).map((_, i) => {
    if (i % 3 === 0) return { id: `q${i + 1}`, type: 'mcq', text: `${topic}: Sample MCQ ${i + 1}`, options: ['Option A', 'Option B', 'Option C'] }
    if (i % 3 === 1) return { id: `q${i + 1}`, type: 'boolean', text: `${topic}: True or False statement ${i + 1}` }
    return { id: `q${i + 1}`, type: 'essay', text: `${topic}: Briefly explain concept ${i + 1}` }
  })
  return { title: `${topic} (${difficulty})`, durationMinutes, questions }
}








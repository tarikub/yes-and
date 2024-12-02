let sentence: string;
const sentenceDelimiter = '.';
let session: any = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'text_change') {
    const rawInput = document.querySelector('#raw-input') as HTMLElement | null;
    if (rawInput) {
      rawInput.textContent = message.text;
      sentence = message.text;

      if (sentence.charAt(sentence.length - 1) === sentenceDelimiter) {
        suggestNextSentence(sentence);
        sentence = "";
      }
    }
  }
});

const suggestNextSentence = (input: string) => {
  const suggestedInput = 'It hops away gracefully';
  const geminiSuggestion = document.querySelector('#gemini-suggestion') as HTMLElement | null;
  if (geminiSuggestion) {
    geminiSuggestion.style.transition = 'opacity 0.5s'; // Add transition effect

    let dotCount = 0;
    const intervalId = setInterval(() => {
      dotCount = (dotCount + 1) % 4;
      geminiSuggestion.textContent = 'Loading' + '.'.repeat(dotCount);
    }, 1000); // Update dots every second

    initAI(intervalId, input);
  }
};

const initAI = async (interval: number, input: string) => {
  if (!('aiOriginTrial' in chrome)) {
    displayStatus(interval, 'chrome.aiOriginTrial not supported in this browser');
    return;
  }

  const defaults = await (chrome as any).aiOriginTrial.languageModel.capabilities();
  console.log('Model default:', defaults);

  if (defaults.available !== 'readily') {
    displayStatus(interval, `Model not yet available (current state: "${defaults.available}")`);
    return;
  }

  try {
    const params = {
      systemPrompt: 'You are a helpful and friendly assistant. Use a "Yes, and" type of response to suggest next possible sentence.',
      temperature: 1,
      topK: 5,
    };
    const response = await runAIPrompt(input, params);
    displayStatus(interval, response);
  } catch (error) {
    console.error(error);
  }
};

const displayStatus = (interval: number, text: string) => {
  const geminiSuggestion = document.querySelector('#gemini-suggestion') as HTMLElement | null;
  if (geminiSuggestion) {
    geminiSuggestion.textContent = text;
    clearInterval(interval);
  }
};

const runAIPrompt = async (prompt: string, params: any) => {
  try {
    if (!session) {
      session = await (chrome as any).aiOriginTrial.languageModel.create(params);
    }
    return session.prompt(prompt);
  } catch (error) {
    console.error('Prompt failed:', error);
    console.log('Prompt:', prompt);
    reset();
    throw error;
  }
};

const reset = async () => {
  if (session) {
    session.destroy();
  }
  session = null;
};

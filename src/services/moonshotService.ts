import { ChatMessage, LegalCategory } from '../types';

interface MoonshotMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface MoonshotResponse {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface MoonshotStreamResponse {
  choices: Array<{
    delta: {
      content?: string;
      role?: string;
    };
    finish_reason?: string;
  }>;
}

class MoonshotService {
  private readonly baseURL = 'https://api.moonshot.ai/v1';
  private readonly apiKey: string;
  private readonly model = 'moonshot-v1-8k';
  
  // Function to clean AI responses from asterisks, hashes, and other formatting
  private cleanContent(content: string): string {
    if (!content) return content;
    
    return content
      // Remove multiple asterisks used for emphasis
      .replace(/\*\*\*([^*]+)\*\*\*/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      // Remove hash symbols used for headings
      .replace(/^#{1,6}\s+/gm, '')
      // Remove extra markdown formatting
      .replace(/`([^`]+)`/g, '$1')
      // Clean up multiple spaces and line breaks
      .replace(/\n{3,}/g, '\n\n')
      .replace(/\s{3,}/g, ' ')
      // Remove leading/trailing whitespace
      .trim();
  }

  constructor() {
    this.apiKey = process.env.REACT_APP_MOONSHOT_API_KEY || '';
    if (!this.apiKey) {
      console.error('Moonshot API key not found. Please set REACT_APP_MOONSHOT_API_KEY environment variable.');
    }
  }

  categorizeQuery(query: string): LegalCategory {
    const queryLower = query.toLowerCase();
    
    // Labour law keywords
    if (queryLower.includes('labour') || queryLower.includes('labor') || 
        queryLower.includes('employee') || queryLower.includes('worker') ||
        queryLower.includes('salary') || queryLower.includes('wage') ||
        queryLower.includes('overtime') || queryLower.includes('leave') ||
        queryLower.includes('termination') || queryLower.includes('contract')) {
      return 'labour-law';
    }
    
    // Company formation keywords
    if (queryLower.includes('company') || queryLower.includes('business') ||
        queryLower.includes('registration') || queryLower.includes('incorporate') ||
        queryLower.includes('sijilat') || queryLower.includes('cr') ||
        queryLower.includes('commercial registration')) {
      return 'company-formation';
    }
    
    // Visa services keywords
    if (queryLower.includes('visa') || queryLower.includes('work permit') ||
        queryLower.includes('residence') || queryLower.includes('immigration') ||
        queryLower.includes('cpr') || queryLower.includes('iqama')) {
      return 'visa-services';
    }
    
    // LMRA keywords
    if (queryLower.includes('lmra') || queryLower.includes('work permit') ||
        queryLower.includes('labour market') || queryLower.includes('expatriate')) {
      return 'lmra';
    }
    
    return 'general-legal';
  }

  private buildSystemPrompt(category: LegalCategory, language: string): string {
    // Language-specific base prompts with instructions to respond in the target language
    const languagePrompts: Record<string, string> = {
      'ar': 'أنت مساعد قانوني ذكي متخصص في القانون البحريني. أجب بدقة واحترافية باللغة العربية فقط.',
      'zh': '你是一位专门研究巴林法律的AI法律助理。请用中文准确、专业地回答。',
      'zh-tw': '您是一位專門研究巴林法律的AI法律助理。請用繁體中文準確、專業地回答。',
      'es': 'Eres un asistente legal de IA especializado en las leyes de Bahrein. Proporciona respuestas precisas y profesionales en español.',
      'fr': 'Vous êtes un assistant juridique IA spécialisé dans le droit bahreïnien. Fournissez des réponses précises et professionnelles en français.',
      'pt': 'Você é um assistente jurídico de IA especializado nas leis do Bahrein. Forneça respostas precisas e profissionais em português.',
      'ru': 'Вы юридический ИИ-помощник, специализирующийся на законодательстве Бахрейна. Предоставляйте точные, профессиональные ответы на русском языке.',
      'hi': 'आप बहरीन कानून में विशेषज्ञता रखने वाले एक AI कानूनी सहायक हैं। हिंदी में सटीक, पेशेवर उत्तर प्रदान करें।',
      'th': 'คุณเป็นผู้ช่วยด้านกฎหมาย AI ที่เชี่ยวชาญด้านกฎหมายบาห์เรน ให้คำตอบที่แม่นยำและเป็นมืออาชีพเป็นภาษาไทย',
      'id': 'Anda adalah asisten hukum AI yang mengkhususkan diri dalam hukum Bahrain. Berikan jawaban yang akurat dan profesional dalam bahasa Indonesia.',
      'ms': 'Anda adalah pembantu undang-undang AI yang pakar dalam undang-undang Bahrain. Berikan jawapan yang tepat dan profesional dalam bahasa Melayu.',
      'tr': 'Bahreyn hukukunda uzmanlaşmış bir AI hukuk asistanısınız. Türkçe olarak doğru, profesyonel yanıtlar sağlayın.',
      'ur': 'آپ بحرین کے قوانین میں مہارت رکھنے والے AI قانونی معاون ہیں۔ اردو میں درست، پیشہ ورانہ جوابات فراہم کریں۔',
      'bn': 'আপনি বাহরাইনের আইনে বিশেষজ্ঞ একজন AI আইনি সহায়ক। বাংলায় নির্ভুল, পেশাদার উত্তর প্রদান করুন।',
      'ta': 'நீங்கள் பஹ்ரைன் சட்டத்தில் நிபுணத்துவம் பெற்ற ஒரு AI சட்ட உதவியாளர். தமிழில் துல்லியமான, தொழில்முறை பதில்களை வழங்கவும்.',
      'te': 'మీరు బహ్రైన్ చట్టంలో నిపుణతకలిగిన AI న్యాయ సహాయకులు. తెలుగులో ఖచ్చితమైన, వృత्तిపరమైన సమాధానాలను అందించండి।',
      'ml': 'നിങ്ങൾ ബഹ്രൈൻ നിയമത്തിൽ വിദഗ്ധനായ ഒരു AI നിയമ സഹായകനാണ്. മലയാളത്തിൽ കൃത്യവും പ്രൊഫഷണലുമായ ഉത്തരങ്ങൾ നൽകുക.',
      'pa': 'ਤੁਸੀਂ ਬਹਿਰੀਨ ਦੇ ਕਾਨੂੰਨ ਵਿੱਚ ਮਾਹਿਰ ਇੱਕ AI ਕਾਨੂੰਨੀ ਸਹਾਇਕ ਹੋ। ਪੰਜਾਬੀ ਵਿੱਚ ਸਹੀ, ਪੇਸ਼ੇਵਰ ਜਵਾਬ ਦਿਓ।',
      'ne': 'तपाईं बहराइनको कानूनमा विशेषज्ञता राख्ने AI कानूनी सहायक हुनुहुन्छ। नेपालीमा सटीक, व्यावसायिक जवाफहरू प्रदान गर्नुहोस्।',
      'am': 'እርስዎ በባህሬን ሕግ ላይ ልዩ እውቀት ያላቸው AI ሕግ አማካሪ ነዎት። በአማርኛ ትክክለኛ፣ ሙያዊ መልስ ይስጡ።',
      'sw': 'Wewe ni msaidizi wa kisheria wa AI aliyefanya utaalamu katika sheria ya Bahrain. Toa majibu sahihi na ya kitaaluma kwa Kiswahili.',
      'yo': 'Iwọ jẹ oluranlọwọ ofin AI ti o ni amọye ni ofin Bahrain. Pese awọn idahun to peye ati alamọdaju ni Yoruba.',
      'lg': 'Oli muyambi w\'amateeka wa AI akola ku mateeka ga Bahrain. Wa okuddamu okituufu era okw\'obukugu mu Luganda.',
      'tl': 'Ikaw ay isang AI legal assistant na eksperto sa batas ng Bahrain. Magbigay ng tumpak at propesyonal na mga sagot sa Tagalog.',
      'en': 'You are an AI legal assistant specialized in Bahrain law. Provide accurate, professional responses in English.'
    };

    const basePrompt = languagePrompts[language] || languagePrompts['en'];

    // Category-specific specializations (kept in English for simplicity, but the AI will translate based on the base prompt language instruction)
    const categoryPrompts: Record<LegalCategory, string> = {
      'labour-law': 'Specialized in Bahrain Labour Law and workers rights.',
      'company-formation': 'Specialized in company formation and commercial registration in Bahrain.',
      'visa-services': 'Specialized in visa services and residence permits in Bahrain.',
      'grace-period': 'Specialized in grace periods and legal deadlines in Bahrain.',
      'lmra': 'Specialized in Labour Market Regulatory Authority (LMRA) and work permits.',
      'sijilat': 'Specialized in Sijilat electronic commercial registration system.',
      'general-legal': 'Specialized in general Bahrain law.',
      'other': 'Specialized in various legal matters in Bahrain.'
    };

    return `${basePrompt} ${categoryPrompts[category]}

Format your response with:
- Clear numbered points for step-by-step processes
- Bullet points for lists of requirements or options
- Use proper formatting for readability

Always provide accurate, up-to-date information based on current Bahrain laws and regulations.

IMPORTANT: Respond ONLY in the language specified above. Do not mix languages in your response.`;
  }

  private convertMessagesToMoonshot(messages: ChatMessage[]): MoonshotMessage[] {
    return messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));
  }

  async sendMessage(
    userMessage: string,
    previousMessages: ChatMessage[] = [],
    category: LegalCategory = 'general-legal',
    onStreamChunk?: (chunk: string) => void,
    language: string = 'en'
  ): Promise<string> {
    if (!this.apiKey) {
      throw new Error('Moonshot API key is not configured');
    }

    try {
      console.log('Moonshot API: Sending request to', this.baseURL + '/chat/completions');
      
      const systemPrompt = this.buildSystemPrompt(category, language);
      const moonshotMessages: MoonshotMessage[] = [
        { role: 'system', content: systemPrompt },
        ...this.convertMessagesToMoonshot(previousMessages),
        { role: 'user', content: userMessage }
      ];

      const requestBody = {
        model: this.model,
        messages: moonshotMessages,
        max_tokens: 2000,
        temperature: 0.7,
        stream: !!onStreamChunk
      };

      console.log('Moonshot API: Request body:', JSON.stringify({ ...requestBody, messages: requestBody.messages.slice(-1) }));

      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(requestBody),
      });
      
      console.log('Moonshot API: Response status:', response.status, response.statusText);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Moonshot API error: ${response.status} ${response.statusText}. ${JSON.stringify(errorData)}`);
      }

      if (onStreamChunk && response.body) {
        return this.handleStreamingResponse(response.body, onStreamChunk);
      } else {
        const data: MoonshotResponse = await response.json();
        return data.choices[0]?.message?.content || 'No response from Moonshot AI';
      }
    } catch (error) {
      console.error('Moonshot API error:', error);
      throw error;
    }
  }

  private async handleStreamingResponse(
    body: ReadableStream<Uint8Array>,
    onStreamChunk: (chunk: string) => void
  ): Promise<string> {
    const reader = body.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(line => line.trim());

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonData = line.slice(6);
            
            if (jsonData.trim() === '[DONE]') {
              return fullResponse;
            }

            try {
              const parsed: MoonshotStreamResponse = JSON.parse(jsonData);
              const content = parsed.choices[0]?.delta?.content;
              
              if (content) {
                fullResponse += content;
                onStreamChunk(content);
              }
              
              if (parsed.choices[0]?.finish_reason) {
                return fullResponse;
              }
            } catch (parseError) {
              console.warn('Error parsing streaming chunk:', parseError);
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }

    return fullResponse;
  }
}

export const moonshotService = new MoonshotService();

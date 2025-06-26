import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAIApi;

  constructor(private configService: ConfigService) {
    const configuration = new Configuration({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
    this.openai = new OpenAIApi(configuration);
  }

  async generateReflectionPrompt(journalContent: string): Promise<string> {
    try {
      const response = await this.openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an insightful and empathetic reflection assistant. Based on the user\'s journal entry, ask one thought-provoking, open-ended question to encourage deeper self-reflection. The question should be positive and forward-looking.',
          },
          {
            role: 'user',
            content: journalContent,
          },
        ],
        max_tokens: 60,
      });

      const prompt = response.data.choices[0].message?.content.trim();
      return prompt || 'What is one thing you can do tomorrow to build on today\'s experience?';
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      // Return a fallback prompt
      return 'Reflect on one positive moment from your day. What made it special?';
    }
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getErrorMessage } from 'src/utils';

interface GeminiConfig {
  model: string;
  apiKey: string;
}

interface LLMResponse {
  candidates?: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

@Injectable()
export class GeminiService {
  private readonly geminiConfig: GeminiConfig;

  constructor(private configService: ConfigService) {
    this.geminiConfig = {
      model: this.configService.get<string>('GOOGLE_GEMINI_API_MODEL') || '',
      apiKey: this.configService.get<string>('GOOGLE_GEMINI_API_KEY') || '',
    };
  }

  async generateContent(requestBody: any): Promise<LLMResponse> {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${this.geminiConfig.model}:generateContent?key=${this.geminiConfig.apiKey}`,
      {
        body: JSON.stringify(requestBody),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} ${errorText}`);
    }

    return (await response.json()) as LLMResponse;
  }

  extractResponseContent(responseJson: LLMResponse): string {
    const textContent = responseJson.candidates?.[0]?.content?.parts[0]?.text;
    if (!textContent) {
      throw new Error('No text content found in LLM response');
    }
    return textContent;
  }

  parseJsonResponse(responseContent: string): unknown {
    try {
      return JSON.parse(responseContent);
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      throw new Error('Failed to parse LLM response: ' + errorMessage);
    }
  }

  async generateAndParseJson(requestBody: any): Promise<unknown> {
    try {
      const responseJson = await this.generateContent(requestBody);
      const responseContent = this.extractResponseContent(responseJson);
      return this.parseJsonResponse(responseContent);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      throw new Error('Failed to get response from LLM: ' + errorMessage);
    }
  }
}

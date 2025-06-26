import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Journal, JournalDocument } from './journal.schema';
import { CreateJournalEntryDto } from './dto/create-journal-entry.dto';
import { AiService } from '../ai/ai.service';

@Injectable()
export class JournalService {
  constructor(
    @InjectModel(Journal.name) private journalModel: Model<JournalDocument>,
    private aiService: AiService,
  ) {}

  async create(createDto: CreateJournalEntryDto, userId: string): Promise<Journal> {
    const newEntry = new this.journalModel({
      ...createDto,
      user: userId,
    });
    return newEntry.save();
  }

  async findAll(userId: string): Promise<Journal[]> {
    return this.journalModel.find({ user: userId }).sort({ createdAt: -1 }).exec();
  }

  async getAIPrompt(content: string): Promise<{ prompt: string }> {
    const prompt = await this.aiService.generateReflectionPrompt(content);
    return { prompt };
  }
}

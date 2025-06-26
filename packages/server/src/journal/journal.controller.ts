import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { JournalService } from './journal.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateJournalEntryDto } from './dto/create-journal-entry.dto';

@UseGuards(JwtAuthGuard)
@Controller('journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Post()
  create(@Body() createDto: CreateJournalEntryDto, @Request() req) {
    return this.journalService.create(createDto, req.user.userId);
  }

  @Get()
  findAll(@Request() req) {
    return this.journalService.findAll(req.user.userId);
  }

  @Post('prompt')
  getAIPrompt(@Body('content') content: string) {
      return this.journalService.getAIPrompt(content);
  }
}

import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getProfile(@Request() req) {
        // req.user is populated by the JwtStrategy
        return this.usersService.findById(req.user.userId);
    }
}

import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '../../entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';
import { ContactService } from './contact.service';
import { ContactNeed, CreateContactDto } from './dto/create-contact.dto';

@ApiTags('Contact')
@Controller('api/contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  @UseGuards(OptionalJwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Gửi yêu cầu tư vấn — gửi email thông báo cho admin' })
  @ApiBody({
    type: CreateContactDto,
    examples: {
      example: {
        summary: 'Yêu cầu tư vấn mẫu',
        value: {
          name: 'Nguyễn Văn A',
          phone: '0912 345 678',
          email: 'email@doanhnghiep.vn',
          company: 'Công ty ABC',
          need: ContactNeed.INDUSTRY_SOFTWARE,
          description: 'Doanh nghiệp đang cần quản lý 3 chi nhánh spa, khoảng 50 nhân viên.',
        },
      },
    },
  })
  async submit(@Body() dto: CreateContactDto, @CurrentUser() user?: User) {
    await this.contactService.submit(dto, user?.id ?? null);
    return { message: 'Yêu cầu của bạn đã được gửi. ViAI sẽ liên hệ trong vòng 2 giờ làm việc.' };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lịch sử yêu cầu tư vấn / đăng ký của tài khoản đang đăng nhập' })
  getMySubmissions(@CurrentUser() user: User) {
    return this.contactService.findByUser(user.id);
  }
}

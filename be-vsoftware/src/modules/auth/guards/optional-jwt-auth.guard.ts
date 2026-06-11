import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/** Giống JwtAuthGuard nhưng không bắt buộc đăng nhập — không có/sai token vẫn cho qua, request.user = null. */
@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any) {
    return user || null;
  }
}

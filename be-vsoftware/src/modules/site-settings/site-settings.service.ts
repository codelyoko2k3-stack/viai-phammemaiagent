import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteSettings } from '../../entities/site-settings.entity';

@Injectable()
export class SiteSettingsService {
  constructor(
    @InjectRepository(SiteSettings)
    private repo: Repository<SiteSettings>,
  ) {}

  async get(key: string): Promise<object> {
    const row = await this.repo.findOne({ where: { key } });
    if (!row) throw new NotFoundException(`Setting "${key}" không tồn tại`);
    return row.value;
  }

  async upsert(key: string, value: object): Promise<object> {
    // Gộp nông (shallow merge) với giá trị cũ — tránh việc client gửi thiếu field
    // (do dữ liệu chưa tải đủ, version cũ...) làm mất dữ liệu các field khác khi ghi đè.
    const existing = await this.repo.findOne({ where: { key } });
    const merged = existing ? { ...existing.value, ...value } : value;
    await this.repo.upsert({ key, value: merged }, ['key']);
    return merged;
  }
}

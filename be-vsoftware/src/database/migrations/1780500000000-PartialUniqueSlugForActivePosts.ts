import { MigrationInterface, QueryRunner } from 'typeorm';

export class PartialUniqueSlugForActivePosts1780500000000 implements MigrationInterface {
  name = 'PartialUniqueSlugForActivePosts1780500000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Constraint UNIQUE cũ áp dụng cho cả bài đã soft-delete, khiến slug của bài
    // đã xoá vẫn "chiếm chỗ" và chặn việc tạo bài mới trùng slug đó.
    await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT IF EXISTS "posts_slug_key"`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_posts_slug_active" ON "posts" ("slug") WHERE "deletedAt" IS NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_posts_slug_active"`);
    await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "posts_slug_key" UNIQUE ("slug")`);
  }
}

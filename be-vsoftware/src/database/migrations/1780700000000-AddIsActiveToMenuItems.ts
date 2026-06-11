import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsActiveToMenuItems1780700000000 implements MigrationInterface {
  name = 'AddIsActiveToMenuItems1780700000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "menu_items" ADD COLUMN IF NOT EXISTS "isActive" boolean NOT NULL DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "menu_items" DROP COLUMN IF EXISTS "isActive"`);
  }
}

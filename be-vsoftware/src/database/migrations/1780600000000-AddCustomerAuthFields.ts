import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCustomerAuthFields1780600000000 implements MigrationInterface {
  name = 'AddCustomerAuthFields1780600000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "phone" varchar(20)`);
    await queryRunner.query(`ALTER TABLE "contact_submissions" ADD COLUMN IF NOT EXISTS "userId" integer`);
    await queryRunner.query(
      `ALTER TABLE "contact_submissions" ADD CONSTRAINT "FK_contact_submissions_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "contact_submissions" DROP CONSTRAINT IF EXISTS "FK_contact_submissions_user"`);
    await queryRunner.query(`ALTER TABLE "contact_submissions" DROP COLUMN IF EXISTS "userId"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "phone"`);
  }
}

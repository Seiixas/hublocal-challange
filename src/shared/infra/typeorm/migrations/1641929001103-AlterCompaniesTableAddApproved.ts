import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterCompaniesTableAddApproved1641929001103
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'companies',
      new TableColumn({
        name: 'approved',
        type: 'boolean',
        default: 'false',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('companies', 'approved');
  }
}

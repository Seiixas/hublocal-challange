import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterCompaniesAddNotNullOnCreatedByUpdatedBy1642077630613
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'companies',
      'created_by',
      new TableColumn({ name: 'created_by', type: 'varchar', isNullable: true })
    );

    await queryRunner.changeColumn(
      'companies',
      'updated_by',
      new TableColumn({ name: 'updated_by', type: 'varchar', isNullable: true })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'companies',
      'created_by',
      new TableColumn({ name: 'created_by', type: 'varchar' })
    );

    await queryRunner.changeColumn(
      'companies',
      'updated_by',
      new TableColumn({ name: 'updated_by', type: 'varchar' })
    );
  }
}

import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterCompaniesTableChangeColumnCpfName1641912705697
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'companies',
      'cpf',
      new TableColumn({ name: 'cnpj', type: 'varchar', isUnique: true })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'companies',
      'cnpj',
      new TableColumn({ name: 'cpj', type: 'varchar', isUnique: true })
    );
  }
}

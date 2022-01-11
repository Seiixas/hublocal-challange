import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CreateForeignKeyUserCompany1641923682736
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'companies',
      new TableForeignKey({
        name: 'FKUserComapanyCreatedBy',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['created_by'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      })
    );

    await queryRunner.createForeignKey(
      'companies',
      new TableForeignKey({
        name: 'FKUserComapanyUpdatedBy',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['updated_by'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'companies',
      new TableForeignKey({
        name: 'FKUserComapanyUpdatedBy',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['updated_by'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      })
    );
    await queryRunner.dropForeignKey(
      'companies',
      new TableForeignKey({
        name: 'FKUserComapanyCreatedBy',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['created_by'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      })
    );
  }
}

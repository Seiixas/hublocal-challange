import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterCompaniesAddCategoryFK1641946423502
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'companies',
      new TableColumn({
        name: 'category_id',
        type: 'uuid',
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      'companies',
      new TableForeignKey({
        name: 'FKCategoriesCompanies',
        referencedTableName: 'categories',
        referencedColumnNames: ['id'],
        columnNames: ['category_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('companies', 'FKCategoriesCompanies');

    await queryRunner.dropColumn('companies', 'category_id');
  }
}

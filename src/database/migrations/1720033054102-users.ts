import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Users1720033054102 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "first_name",
                        type: "varchar",
                        length: "100",
                        isNullable:true
                    },
                    {
                        name: "last_name",
                        type: "varchar",
                        length:"150",
                        isNullable:true
                    },
                    {
                        name: "email",
                        type:"varchar",
                        length:"200",
                        isUnique:true
                    },
                    {
                        name: "password",
                        type:"varchar",
                        length:"255"
                    },
                    {
                        name: "role_id",
                        type:"int"
                    }
                ],
                foreignKeys:[{
                    columnNames:['role_id'],
                    referencedTableName:'roles',
                    referencedColumnNames:['id']
                }]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}

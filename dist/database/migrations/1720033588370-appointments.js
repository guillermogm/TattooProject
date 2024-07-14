"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointments1720033588370 = void 0;
const typeorm_1 = require("typeorm");
class Appointments1720033588370 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "appointments",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "appointment_date",
                        type: "datetime",
                    },
                    {
                        name: "user_id",
                        type: "int",
                    },
                    {
                        name: "service_id",
                        type: "int",
                    },
                ],
                foreignKeys: [{
                        columnNames: ['user_id'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['id']
                    },
                    { columnNames: ['service_id'],
                        referencedTableName: 'services',
                        referencedColumnNames: ['id']
                    }],
                uniques: [
                    new typeorm_1.TableUnique({
                        name: "user_service_time_unique",
                        columnNames: ["user_id", "service_id", "appointment_date"],
                    }),
                ],
            }), true);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('appointments');
        });
    }
}
exports.Appointments1720033588370 = Appointments1720033588370;

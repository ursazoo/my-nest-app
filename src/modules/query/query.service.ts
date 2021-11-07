import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataBaseDTO } from './dto/database.dto';
import { TableDTO } from './dto/table.dto';
import { Query } from './entities/query.entity';

@Injectable()
export class QueryService {
  constructor(
    @InjectRepository(Query)
    private readonly queryRepository: Repository<Query>,
  ) {}
  // 获取数据库中所有表名
  async getDatabases() {
    const result = await this.queryRepository.query(`
        SELECT SCHEMA_NAME AS 'Database' FROM INFORMATION_SCHEMA.SCHEMATA;
      `);

    return {
      result,
    };
  }

  // 获取数据库中指定库的所有表名
  async getTables(dataBaseDTO: DataBaseDTO) {
    const result = await this.queryRepository.query(
      `SELECT TABLE_NAME from INFORMATION_SCHEMA.TABLES where TABLE_SCHEMA='${dataBaseDTO.database}';`,
    );

    console.log(result);
    return {
      result,
    };
  }

  // 获取数据库中指定表的所有列名
  async getColumns(tableDTO: TableDTO) {
    console.log(tableDTO);
    const result = await this.queryRepository.query(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '${tableDTO.database}' AND TABLE_NAME = '${tableDTO.table}';`,
    );

    console.log(result);
    return {
      result,
    };
  }
}

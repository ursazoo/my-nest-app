import { Controller, Get, Query } from '@nestjs/common';
import { DataBaseDTO } from './dto/database.dto';
import { TableDTO } from './dto/table.dto';
import { QueryService } from './query.service';

@Controller('query')
export class QueryController {
  constructor(private queryService: QueryService) {}

  @Get('databases')
  getDatabases() {
    return this.queryService.getDatabases();
  }

  @Get('tables')
  getTables(@Query() database: DataBaseDTO) {
    return this.queryService.getTables(database);
  }

  @Get('columns')
  getColumns(@Query() columnsDTO: TableDTO) {
    return this.queryService.getColumns(columnsDTO);
  }
}

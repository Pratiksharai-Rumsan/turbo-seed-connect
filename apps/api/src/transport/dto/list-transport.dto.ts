import { ApiPropertyOptional } from '@nestjs/swagger';
import { Pagination } from '@workspace/sdk/types/pagination.type';
import { IsBoolean, IsIn, IsNumber } from 'class-validator';


export class ListTransportDto implements Pagination {

 @ApiPropertyOptional({ example: 1 })
    @IsNumber()
 page?: number;
    
       @ApiPropertyOptional({ example: '10' })
    @IsNumber()
    perPage?: number;

  @IsIn(['createdAt'])
  sort: string = 'createdAt';

    order: 'asc' | 'desc' = 'desc';
    

  @IsBoolean()
  includeDeleted?: boolean = false;







}

import { ApiProperty } from '@nestjs/swagger';
import { CreateTransport, TransportType } from '@workspace/sdk/types/transport.type';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateTransportDto implements CreateTransport {
  @ApiProperty({ description: 'Transport name', example: 'Email Sender' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Transport type', example: TransportType.ECHO })
  @IsNotEmpty()
  @IsEnum(TransportType)
  type: TransportType;

  @ApiProperty({
    description: 'Transport configuration',
    example: { test: 'hello' },
  })
  @IsNotEmpty()
  config: Record<string, any>;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'User nickname for login', required: true })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'User password for login', required: true })
  password: string;
}

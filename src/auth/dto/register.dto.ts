import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'User nickname for registration',
    required: true,
  })
  username: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'User password for registration',
    required: true,
  })
  password: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'User password confirmation for registration',
    required: true,
  })
  passwordConfirmation: string;
}

import { IsNumber, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  id: number;

  @IsString()
  username: string;

  @IsStrongPassword()
  password: string;
}

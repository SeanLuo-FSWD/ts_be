import { IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly message: string;
}

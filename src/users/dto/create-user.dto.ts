import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: "User's e-mail address."
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "User's full name."
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Define if user has administrator privileges.", default: false
  })
  @IsBoolean()
  admin: boolean;
}

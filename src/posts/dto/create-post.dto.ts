import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePostDto {
  @ApiProperty({
    description: "Post's title."
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: "Post's content."
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({
    description: "E-mail address from post's author."
  })
  @IsEmail()
  authorEmail: string;
}

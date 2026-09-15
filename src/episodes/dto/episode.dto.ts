import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateEpisodeDto {
  @IsString()
  title!: string;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;
}

import { IsArray, IsString } from 'class-validator';

export class PinnedAssistantsDto {
  @IsArray()
  @IsString({ each: true })
  ids!: string[];
}

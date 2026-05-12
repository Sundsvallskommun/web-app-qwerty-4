import { IsArray, IsBoolean, IsString } from 'class-validator';

export class UserSpaceSettingsDto {
  @IsBoolean()
  groupSharedAssistantsBySpace!: boolean;

  @IsArray()
  @IsString({ each: true })
  hiddenSpaceIds!: string[];
}

import { Type } from 'class-transformer'
import { IsEnum, IsNotEmpty, ValidateNested } from 'class-validator'

export enum Code {
    CREATED = 1,
    WON = 2,
    LOST = 3,
}

export enum Description {
    CREATED = 'CREATED',
    WON = 'WON',
    LOST = 'LOST',
}

export class State {
    @IsNotEmpty()
    @IsEnum(Code)
    code: Code

    @IsNotEmpty()
    @IsEnum(Description)
    description: Description
}

export class SaveGameDTO {
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => State)
    state: State
}

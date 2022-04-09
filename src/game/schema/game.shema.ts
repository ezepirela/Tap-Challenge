import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as mongoose from 'mongoose'
import { State } from '../dto/save-game.dto'

export type GameDocument = Game & Document
@Schema({ collection: 'game' })
export class Game {
    id: string

    @Prop({ required: true, default: new Date().toISOString() })
    created: string

    @Prop({ required: true, type: mongoose.Schema.Types.Mixed })
    state: State

    @Prop({ required: true, default: [] })
    cells: number[]
}

export const GameSchema = SchemaFactory.createForClass(Game)

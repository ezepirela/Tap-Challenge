import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as joi from 'joi'
import { MongooseModule } from '@nestjs/mongoose'
import { GameModule } from './game/game.module';
@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: joi.object({
                PORT: joi.required(),
                DB_STRING_CONNECTION: joi.required(),
            }),
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('DB_STRING_CONNECTION'),
            }),
            inject: [ConfigService],
        }),
        GameModule,
    ],
})
export class AppModule {}

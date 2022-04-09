import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { SaveGameDTO } from './dto/save-game.dto'
import { Game, GameDocument } from './schema/game.shema'
import { Model } from 'mongoose'
@Injectable()
export class GameService {
    constructor(
        @InjectModel('Game') private readonly gameModel: Model<GameDocument>
    ) {}

    public async saveNewGame(saveNewGame: SaveGameDTO): Promise<Game> {
        try {
            const newGame = await this.gameModel.create(saveNewGame)
            if (!newGame) {
                throw new HttpException('Failed to save new game', 400)
            }
            return newGame
        } catch (error) {
            throw new HttpException(
                error.message || 'Internal Server Error',
                error.status || HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    public async getAllGames(): Promise<Game[]> {
        try {
            const games = await this.gameModel.find()
            if (games.length === 0) {
                throw new HttpException('Games Not Found', HttpStatus.NOT_FOUND)
            }
            return games
        } catch (error) {
            throw new HttpException(
                error.message || 'Internal Server Error',
                error.status || HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    public async getGameById(id: string): Promise<Game> {
        try {
            const game = await this.gameModel.findById({ _id: id })
            if (!game) {
                throw new HttpException('Game Not Found', HttpStatus.NOT_FOUND)
            }
            return game
        } catch (error) {
            throw new HttpException(
                error.message || 'Internal Server Error',
                error.status || HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }
}

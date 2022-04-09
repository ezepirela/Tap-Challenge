import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common'
import { SaveGameDTO } from './dto/save-game.dto'
import { GameService } from './game.service'
import { Game } from './schema/game.shema'
import { ValidationPipe } from './validation.pipe'

@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    saveNewGame(@Body() saveNewGame: SaveGameDTO): Promise<Game> {
        return this.gameService.saveNewGame(saveNewGame)
    }

    @Get()
    getAllGames(): Promise<Game[]> {
        return this.gameService.getAllGames()
    }

    @Get('/:id')
    getGameById(@Param('id') id: string): Promise<Game> {
        return this.gameService.getGameById(id)
    }
}

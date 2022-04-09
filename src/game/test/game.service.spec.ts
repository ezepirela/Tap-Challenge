import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { GameService } from '../game.service'
import { gameModelStub, gameStub } from './stubs/game.stub'

describe('GameService', () => {
    let gameService: GameService
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GameService,
                {
                    provide: getModelToken('Game'),
                    useValue: gameModelStub,
                },
            ],
        }).compile()

        gameService = module.get<GameService>(GameService)
    })

    describe('saveNewGame', () => {
        let result
        beforeEach(async () => {
            gameModelStub.create()
            result = await gameService.saveNewGame(gameStub())
        })
        test('it should call gameModel.create', () => {
            expect(result).toEqual(gameStub())
        })
    })

    describe('getAllGames', () => {
        let result
        beforeEach(async () => {
            gameModelStub.find()
            result = await gameService.getAllGames()
        })
        test('it should call gameModel.find', () => {
            expect(result).toEqual([gameStub()])
        })
    })

    describe('getGameById', () => {
        let result
        beforeEach(async () => {
            gameModelStub.findById(gameStub().id)
            result = await gameService.getGameById(gameStub().id)
        })
        test('it should call gameModel.findById and return a game', () => {
            expect(result).toEqual(gameStub())
        })
    })
})

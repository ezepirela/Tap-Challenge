import { Test, TestingModule } from '@nestjs/testing'
import { GameController } from '../game.controller'
import { GameService } from '../game.service'
import { Game } from '../schema/game.shema'
import { gameStub } from './stubs/game.stub'

// use the mock value defined on __mocks__ folder
jest.mock('../game.service.ts')

describe('GameController', () => {
    let gameController: GameController
    let gameService: GameService
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [GameController],
            providers: [GameService],
        }).compile()

        gameController = module.get<GameController>(GameController)
        gameService = module.get<GameService>(GameService)
    })

    describe('saveNewGame', () => {
        let response: Game
        beforeEach(async () => {
            response = await gameController.saveNewGame(gameStub())
        })

        test('it should call gameService', () => {
            expect(gameService.saveNewGame).toBeCalledWith(gameStub())
        })

        test('it should return the new game saved', () => {
            expect(response).toEqual(gameStub())
        })
    })

    describe('getAllGames', () => {
        let response: Game[]
        beforeEach(async () => {
            response = await gameController.getAllGames()
        })

        test('it should return the an array of games', () => {
            expect(response).toEqual([gameStub()])
        })
    })

    describe('getGameById', () => {
        let response: Game
        beforeEach(async () => {
            response = await gameController.getGameById(gameStub().id)
        })

        test('it should call gameService', () => {
            expect(gameService.getGameById).toBeCalledWith(gameStub().id)
        })

        test('it should return a game', () => {
            expect(response).toEqual(gameStub())
        })
    })
})

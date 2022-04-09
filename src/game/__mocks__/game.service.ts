import { gameStub } from '../test/stubs/game.stub'

export const GameService = jest.fn().mockReturnValue({
    saveNewGame: jest.fn().mockReturnValue(gameStub()),
    getAllGames: jest.fn().mockReturnValue([gameStub()]),
    getGameById: jest.fn().mockReturnValue(gameStub()),
})

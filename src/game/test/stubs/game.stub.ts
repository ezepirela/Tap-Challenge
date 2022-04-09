import { Game } from '../../../game/schema/game.shema'

enum Description {
    CREATED = 'CREATED',
    WON = 'WON',
    LOST = 'LOST',
}

export const gameStub = (): Game => {
    return {
        id: '1234',
        created: '2022-04-09T02:29:56.350Z',
        state: {
            description: Description.CREATED,
            code: 1,
        },
        cells: [],
    }
}

export const gameModelStub = {
    create: jest.fn().mockImplementation(() => {
        return gameStub()
    }),
    find: jest.fn().mockImplementation(() => {
        return [gameStub()]
    }),
    findById: jest.fn().mockImplementation(() => {
        return gameStub()
    }),
}

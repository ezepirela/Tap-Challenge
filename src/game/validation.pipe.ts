import {
    PipeTransform,
    Injectable,
    HttpException,
    HttpStatus,
} from '@nestjs/common'
import { SaveGameDTO } from './dto/save-game.dto'

const validValues = [
    { description: 'CREATED', code: 1 },
    { description: 'WON', code: 2 },
    { description: 'LOST', code: 3 },
]
function validation(values: SaveGameDTO): boolean {
    let valid = false
    validValues.forEach((validValue) => {
        if (
            validValue.description === values.state.description &&
            validValue.code === values.state.code
        ) {
            valid = true
        }
    })
    return valid
}

@Injectable()
export class ValidationPipe implements PipeTransform {
    transform(value: any) {
        if (!validation(value)) {
            throw new HttpException(
                "The inputs aren't valid. Description and Code must have the same state",
                HttpStatus.FORBIDDEN
            )
        }
        return value
    }
}

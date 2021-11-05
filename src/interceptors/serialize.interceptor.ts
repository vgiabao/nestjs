import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserDto} from 'src/users/dtos/user.dto';
import {plainToClass} from 'class-transformer';

//make sure dto is at least a class
interface  ClassConstructor{
    new (...args: any[]): {}
}


export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: ClassConstructor) {
    }

    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        console.log('before request');
        return handler.handle().pipe(
            map((data: any) => {
                console.log('before response');
                return plainToClass(this.dto, data, {excludeExtraneousValues: true});
            }),
        );
    }
}

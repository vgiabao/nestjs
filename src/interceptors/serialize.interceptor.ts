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

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {
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

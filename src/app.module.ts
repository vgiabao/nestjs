import {ClassSerializerInterceptor, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsersModule} from './users/users.module';
import {ReportsModule} from './reports/reports.module';
import {User} from './users/user.entity';
import {Report} from './reports/report.entity';
import {APP_INTERCEPTOR} from '@nestjs/core';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db.sqlite',
            entities: [User, Report],
            synchronize: true,
        }),
        UsersModule,
        ReportsModule,
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor,
        },
    ],
})
export class AppModule {
}

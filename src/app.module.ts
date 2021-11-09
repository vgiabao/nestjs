import {ClassSerializerInterceptor, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsersModule} from './users/users.module';
import {ReportsModule} from './reports/reports.module';
import {User} from './users/user.entity';
import {Report} from './reports/report.entity';
import {APP_INTERCEPTOR} from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            entities: [User, Report],
            synchronize: true,
            autoLoadEntities: true
        }),
        UsersModule,
        ReportsModule
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

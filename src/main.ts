import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
const cookieSession = require("cookie-session")

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({whitelist: true}));
    app.use(cookieSession({
        keys: ['123']
    }))

    const config = new DocumentBuilder()
        .setTitle('Car report example')
        .setDescription('The cars report API description')
        .setVersion('1.0')
        .addTag('User')
        .addTag('Report')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1', app, document);
    await app.listen(3000);
}

bootstrap();

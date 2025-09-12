import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.model';
import { Workflow } from './workflows/workflow.model';
import { AuthModule } from './auth/auth.module';
import { WorkflowsModule } from './workflows/workflows.module';

console.log('process.env');
console.log(process.env.DB_HOST);
console.log(process.env.DB_PORT);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_NAME);
console.log(process.env.CORS_ORIGIN);
console.log(process.env.JWT_SECRET);
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        dialect: 'postgres',
        host: cfg.get<string>('DB_HOST'),
        port: cfg.get<number>('DB_PORT'),
        username: cfg.get<string>('DB_USER'),
        password: cfg.get<string>('DB_PASSWORD'),
        database: cfg.get<string>('DB_NAME'),
        autoLoadModels: true,
        synchronize: true,
        logging: false,
      }),
    }),
    // SequelizeModule.forRootAsync({
    //   useFactory: () => ({
    //     dialect: 'postgres',
    //     host: process.env.DB_HOST,
    //     port: Number(process.env.DB_PORT ?? 5432),
    //     username: process.env.DB_USER,
    //     password: process.env.DB_PASSWORD,
    //     database: process.env.DB_NAME,
    //     autoLoadModels: true,
    //     synchronize: true,
    //     models: [User, Workflow],
    //     logging: false,
    //   }),
    // }),
    SequelizeModule.forFeature([User, Workflow]),
    AuthModule,
    WorkflowsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

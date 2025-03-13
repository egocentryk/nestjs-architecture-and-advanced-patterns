import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ApplicationBootstrapOptions } from '../common/interfaces/application-bootstrap-options.interface'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { configSchema } from 'src/config.schema'
import { MongooseModule } from '@nestjs/mongoose'
import { EVENT_STORE_CONNECTION } from './core.constants'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27018/vf-event-store', {
      connectionName: EVENT_STORE_CONNECTION,
      directConnection: true,
    }),
  ],
})
export class CoreModule {
  static forRoot(options: ApplicationBootstrapOptions) {
    const imports = [
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env',
        validationSchema: configSchema,
      }),
      ...(options.driver === 'orm'
        ? [
            TypeOrmModule.forRootAsync({
              imports: [ConfigModule],
              useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DATABASE_HOST'),
                port: parseInt(
                  configService.get('DATABASE_PORT') || '5432',
                  10,
                ),
                username: configService.get('DATABASE_USER'),
                password: configService.get('DATABASE_PASSWORD'),
                database: configService.get('DATABASE_NAME'),
                autoLoadEntities: true,
                synchronize: true,
              }),
              inject: [ConfigService],
            }),
            MongooseModule.forRoot('mongodb://localhost:27017/vf-read-db'),
          ]
        : []),
    ]

    return {
      module: CoreModule,
      imports,
    }
  }
}

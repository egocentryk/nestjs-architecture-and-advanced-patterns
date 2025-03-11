import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { snapshot } from 'node:test'

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule.register({
      driver: 'orm', // 👈 or 'in-memory'
    }),
    {
      snapshot: true, // 👈 enable snapshot
    },
  )
  await app.listen(3000)
}
bootstrap()

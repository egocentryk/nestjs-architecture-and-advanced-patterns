import { DynamicModule, Module, Type } from '@nestjs/common'
import { AlarmFactory } from '../domain/factories/alarm.factory'
import { AlarmsController } from '../presenters/http/alarms.controller'
import { AlarmsService } from './alarms.service'
import { CreateAlarmCommandHandler } from './commands/create-alarm.command-handler'
import { GetAlarmsQueryHandler } from './queries/get-alarms.query-handler'
import { AlarmCreatedEventHandler } from './event-handlers/alarm-created.event-handler'
import { AlarmAcknowledgedEventHandler } from './event-handlers/alarm-acknowledged.event-handler'
import { AcknowledgeAlarmCommandHandler } from './commands/acknowledge-alarm.command-handler'
import { CqrsModule } from '@nestjs/cqrs'

@Module({
  controllers: [AlarmsController],
  providers: [
    AlarmsService,
    AlarmFactory,
    CreateAlarmCommandHandler,
    GetAlarmsQueryHandler,
    AlarmCreatedEventHandler,
    AcknowledgeAlarmCommandHandler,
    AlarmAcknowledgedEventHandler,
  ],
})
export class AlarmsModule {
  static withInfrastucture(infrastructureModule: Type | DynamicModule) {
    return {
      module: AlarmsModule,
      imports: [infrastructureModule],
    }
  }
}

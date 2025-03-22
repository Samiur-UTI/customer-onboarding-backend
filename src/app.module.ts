import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './modules/common/app.config.module';
import { DatabaseModule } from './modules/database/database.module';
import { CustomersModule } from './modules/customer/customer.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [AppConfigModule, DatabaseModule, CustomersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

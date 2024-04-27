import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './payment/payment.module';
import { SocketModule } from './socket/socket.module';
import { AuthModule } from './features/auth/auth.module';
import { PostsModule } from './features/posts/posts.module';
import { CommentsModule } from './features/comments/comments.module';
import { UsersModule } from './features/users/users.module';
import { MailsModule } from './common/mails/mails.module';
import { PipesModule } from './common/pipes/pipes.module';

@Module({
  imports: [PaymentModule, SocketModule, AuthModule, PostsModule, CommentsModule, UsersModule, MailsModule, PipesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

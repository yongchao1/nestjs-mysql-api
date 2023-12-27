import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common/enums';
import { Logger } from '@nestjs/common/services';
import { AppModule } from './app.module';
import { getConfig, IS_DEV } from './utils';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const config = getConfig();
const PORT = config.PORT || 8080;
const PREFIX = config.PREFIX || '/';

async function bootstrap() {
  const logger: Logger = new Logger('main.ts');
  const app = await NestFactory.create(AppModule, {
    // 开启日志级别打印
    logger: IS_DEV ? ['log', 'debug', 'error', 'warn'] : ['error', 'warn'],
  });
  //允许跨域请求
  app.enableCors();
  // 启动版本管理
  app.enableVersioning({
    defaultVersion: '1', // 不指定默认版本为v1
    type: VersioningType.URI,
  });

  if (process.env.NODE_ENV != 'production') {
    const options = new DocumentBuilder()
      .setTitle('权限系统管理  api文档')
      .setDescription('权限系统管理  api接口文档')
      .setBasePath(PREFIX)
      .addBearerAuth({ type: 'apiKey', in: 'header', name: 'token' })
      .setVersion('0.0.1')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(`${PREFIX}/docs`, app, document);
  }

  // 给请求添加prefix
  app.setGlobalPrefix(PREFIX);
  await app.listen(PORT, () => {
    logger.log(`服务已经启动,接口请访问:http://127.0.0.1:${PORT}/${PREFIX}`);
    Logger.log(`服务已经启动,文档请访问:http://127.0.0.1:${PORT}/${PREFIX}/docs`);
  });
}
bootstrap();

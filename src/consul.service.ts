import {
  Injectable,
  OnModuleInit,
} from '@nestjs/common';

const Consul = require('consul');

@Injectable()
export class ConsulService
  implements OnModuleInit {

  private readonly serviceName =
    'alquiler-vehiculos';

  private readonly serviceId =
    process.env.HOSTNAME;

  private readonly servicePort =
    parseInt(
      process.env.PORT || '3001',
      10,
    );

  private consul = new Consul({
    host:
      process.env.CONSUL_HOST ||
      'consul',

    port:
      parseInt(
        process.env.CONSUL_PORT ||
        '8500',
        10,
      ),
  });

  async onModuleInit() {

    console.log(
      'HOSTNAME:',
      this.serviceId,
    );

    await this.consul.agent
      .service.register({

      name:
        this.serviceName,

      id:
        this.serviceId,

      address:
        this.serviceId,

      port:
        this.servicePort,

      check: {

        name:
          `${this.serviceId}-health`,

        http:
          `http://${this.serviceId}:${this.servicePort}/health`,

        interval: '10s',

        timeout: '5s',
      },
    });

    console.log(
      `Registered ${this.serviceId}`,
    );
  }
}
import { Injectable, OnModuleInit } from '@nestjs/common';

const Consul = require('consul');

@Injectable()
export class ConsulService
  implements OnModuleInit
{
  private readonly serviceName = 'alquiler-vehiculos';
  private readonly serviceHost = process.env.SERVICE_HOST || 'localhost';
  private readonly servicePort = parseInt(process.env.SERVICE_PORT || process.env.PORT || '3001', 10);

  private consul = new Consul({
    host: process.env.CONSUL_HOST || 'localhost',
    port: parseInt(process.env.CONSUL_PORT || '8500', 10),
  });

  async onModuleInit() {

    await this.consul.agent.service.register({
      name: this.serviceName,
      address: this.serviceHost,
      port: this.servicePort,

      check: {
        name: `${this.serviceName}-health`,
        http: `http://${this.serviceHost}:${this.servicePort}`,
        interval: '10s',
        timeout: '5s',
      },
    });

    console.log(
      'alquiler-vehiculos registered in consul',
    );
  }
}

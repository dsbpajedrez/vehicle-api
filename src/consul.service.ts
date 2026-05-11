import { Injectable, OnModuleInit } from '@nestjs/common';

const Consul = require('consul');

@Injectable()
export class ConsulService
  implements OnModuleInit
{
  private consul = new Consul({
    host: 'consul', // Cambia 'consul' por 'localhost' si estás ejecutando el servicio localmente
    // host: 'localhost',
    port: 8500,
  });

  async onModuleInit() {

    await this.consul.agent.service.register({
      name: 'alquiler-vehiculos',
      address: 'alquiler-vehiculos',
      port: 3001,

      check: {
        name: 'alquiler-vehiculos-health',
        http: 'http://alquiler-vehiculos:3001',
        interval: '10s',
        timeout: '5s',
      },
    });

    console.log(
      'alquiler-vehiculos registered in consul',
    );
  }
}
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  getGenericConfiguration() {
    return 'generic conf';
  }
}

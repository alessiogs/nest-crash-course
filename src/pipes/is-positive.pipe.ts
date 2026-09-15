import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class IsPositivePipe {
  transform(value: number) {
    if (value <= 0) {
      throw new BadRequestException('The limit value must be positive');
    }
  }
}

import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class StripUndefinedPipe implements PipeTransform {
  transform(value: any, _metadata: ArgumentMetadata): any {
    return this.clean(value, new WeakSet());
  }

  private clean(obj: any, seen: WeakSet<object>): any {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    if (seen.has(obj)) {
      return obj;
    }

    seen.add(obj);

    if (
      obj instanceof Date ||
      obj instanceof Buffer ||
      obj.constructor?.name === 'ObjectId' ||
      obj.constructor?.name === 'Decimal' ||
      typeof obj.toHexString === 'function'
    ) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.clean(item, seen));
    }

    return Object.fromEntries(
      Object.entries(obj)
        .filter(([_, v]) => v !== undefined)
        .map(([k, v]) => [k, this.clean(v, seen)]),
    );
  }
}

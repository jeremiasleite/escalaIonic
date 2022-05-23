import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toMatrix'
})
export class ToMatrixPipe implements PipeTransform {
  transform(arr: number[], n: number): number[][] {
    const rows = Array.from({ length: Math.ceil(arr.length / n) }, (_, i) => i);
    return rows.map(idx => arr.slice(idx * n, idx * n + n));
  }
}
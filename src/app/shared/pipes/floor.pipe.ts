import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'floor'
})
export class FloorPipe implements PipeTransform{
  transform (input:number) {
    return Math.floor(input);
  }
}
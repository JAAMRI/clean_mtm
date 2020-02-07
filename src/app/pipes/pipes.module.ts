import { NgModule } from '@angular/core';
import { TruncatePipe } from './truncate.pipe';
import { FloorPipe } from './floor.pipe';


@NgModule({
  declarations: [
    TruncatePipe,
    FloorPipe
  ],
  exports: [
    TruncatePipe,
    FloorPipe
  ]
})
export class PipesModule {}

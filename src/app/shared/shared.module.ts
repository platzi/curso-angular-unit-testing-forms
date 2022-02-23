import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightDirective } from './directives/highlight.directive';
import { ReversePipe } from './pipes/reverse.pipe';



@NgModule({
  declarations: [
    HighlightDirective,
    ReversePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HighlightDirective,
    ReversePipe
  ]
})
export class SharedModule { }

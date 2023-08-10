import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputTrim]',
})
export class InputTrimDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event.target.value'])
  trim(value: string) {
    this.el.nativeElement.value = value.trimStart();
  }
}

import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyAlphabet]',
})
export class OnlyAlphabetDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    const initialValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initialValue.replace(/[^a-zA-Z]/g, '');
    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}

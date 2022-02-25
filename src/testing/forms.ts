import { DebugElement } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { query, queryById } from './finders';

export function setInputValue<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  value: string,
  withTestId: boolean = false
) {
  let debugElement: DebugElement;
  if (withTestId) {
    debugElement = queryById(fixture, selector);
  } else {
    debugElement = query(fixture, selector);
  }
  const inputEl: HTMLInputElement = debugElement.nativeElement;
  inputEl.value = value;
  inputEl.dispatchEvent(new Event('input'));
  inputEl.dispatchEvent(new Event('blur'));
}

export function setCheckboxValue<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  value: boolean,
  withTestId: boolean = false
) {
  let debugElement: DebugElement;
  if (withTestId) {
    debugElement = queryById(fixture, selector);
  } else {
    debugElement = query(fixture, selector);
  }
  const inputEl: HTMLInputElement = debugElement.nativeElement;
  inputEl.checked = value;
  inputEl.dispatchEvent(new Event('change'));
  inputEl.dispatchEvent(new Event('blur'));
}

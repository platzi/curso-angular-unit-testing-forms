import { ComponentFixture } from "@angular/core/testing";
import { query, queryById } from './finders';

export function clickEvent<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  withTestId: boolean = false,
  event: unknown = null
) {
  let element;
  if (withTestId) {
    element = queryById(fixture, selector);
  } else {
    element = query(fixture, selector);
  }
  element.triggerEventHandler('click', event);
}

export function clickElement<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  withTestId: boolean = false
) {
  let elementDebug;
  if (withTestId) {
    elementDebug = queryById(fixture, selector);
  } else {
    elementDebug = query(fixture, selector);
  }
  const element: HTMLElement = elementDebug.nativeElement;
  element.click();
}

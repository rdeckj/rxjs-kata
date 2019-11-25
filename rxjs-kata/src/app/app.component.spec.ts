import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Subject, Observable, of } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { Injectable } from '@angular/core';

@Injectable()
class FakeWebSocketSubject {
  asObservable() {
    return of({payload: {number: 3}});
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: WebSocketSubject, useClass: FakeWebSocketSubject }]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  }));

  it('should display Fizz when 3 returned from server', () => {
    fixture.detectChanges();
    expect(component.display).toBe('Fizz');
  });

  describe('FizzBuzz', () => {
    it('should return 1 when given 1', () => {
      let result: string = component.fizzBuzz(1);
      expect(result).toBe('1');
    });

    it('should return 2 when given 2', () => {
      let result: string = component.fizzBuzz(2);
      expect(result).toBe('2');
    });

    it('should return Fizz when divisible by 3', () => {
      let result: string = component.fizzBuzz(3);
      expect(result).toBe('Fizz');
    });

    it('should return Buzz when divisible by 5', () => {
      let result: string = component.fizzBuzz(5);
      expect(result).toBe('Buzz');
    });

    it('should return FizzBuzz when divisible by 3 and 5', () => {
      let result: String = component.fizzBuzz(15);
      expect(result).toBe('FizzBuzz');
    });
  });
});

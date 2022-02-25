import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterFormComponent } from './register-form.component';
import { UsersService } from './../../../services/user.service';
import { generateOneUser } from './../../../models/user.mock';
import { asyncData, getText, mockObservable, query, queryById, setInputValue, setCheckboxValue, clickEvent, clickElement } from 'src/testing';

fdescribe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let userService: jasmine.SpyObj<UsersService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UsersService', ['create']);

    await TestBed.configureTestingModule({
      declarations: [ RegisterFormComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        { provide:  UsersService, useValue: spy },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    userService = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the emailField be invalid', () => {
    component.emailField?.setValue('esto no es un correo');
    expect(component.emailField?.invalid).withContext('wrong email').toBeTruthy();

    component.emailField?.setValue('');
    expect(component.emailField?.invalid).withContext('empty').toBeTruthy();
  });

  it('should the passwordField be invalid', () => {
    component.passwordField?.setValue('');
    expect(component.passwordField?.invalid).withContext('empty').toBeTruthy();

    component.passwordField?.setValue('12345');
    expect(component.passwordField?.invalid).withContext('12345').toBeTruthy();

    component.passwordField?.setValue('asasaasasdsdsd');
    expect(component.passwordField?.invalid).withContext('without number').toBeTruthy();

    component.passwordField?.setValue('asas1aasasdsdsd');
    expect(component.passwordField?.valid).withContext('rigth').toBeTruthy();
  });

  it('should the form be invalid', () => {
    component.form.patchValue({
      name: 'Nico',
      email: 'nico@gmil.com',
      password: '12121212',
      confirPassword: '12121212',
      checkTerms: false
    });
    expect(component.form.invalid).toBeTruthy();
  })

  it('should the emailField be invalid from UI', () => {
    const inputDe = query(fixture, 'input#email');
    const inputEl: HTMLInputElement = inputDe.nativeElement;

    inputEl.value = "esto no es un correo";
    inputEl.dispatchEvent(new Event('input'));
    inputEl.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(component.emailField?.invalid).withContext('wrong email').toBeTruthy();

    const textError = getText(fixture, 'emailField-email');
    expect(textError).toContain("It's not a email");
  });

  it('should the emailField be invalid from UI with setInputValue', () => {
    setInputValue(fixture, 'input#email', 'esto no es un correo');
    fixture.detectChanges();
    expect(component.emailField?.invalid).withContext('wrong email').toBeTruthy();

    const textError = getText(fixture, 'emailField-email');
    expect(textError).toContain("It's not a email");
  });

  it('should send the form successfully', () => {
    component.form.patchValue({
      name: 'Nico',
      email: 'nico@gmil.com',
      password: '12121212',
      confirmPassword: '12121212',
      checkTerms: true
    });
    const mockUser = generateOneUser();
    userService.create.and.returnValue(mockObservable(mockUser));
    // Act
    component.register(new Event('submit'));
    expect(component.form.valid).toBeTruthy();
    expect(userService.create).toHaveBeenCalled();
  })

  it('should send the form successfully from UI', fakeAsync(() => {
    setInputValue(fixture, 'input#name', 'Nico');
    setInputValue(fixture, 'input#email', 'nico@gmil.com');
    setInputValue(fixture, 'input#password', '12121212');
    setInputValue(fixture, 'input#confirmPassword', '12121212');
    setCheckboxValue(fixture, 'input#terms', true);
    const mockUser = generateOneUser();
    userService.create.and.returnValue(asyncData(mockUser));
    // Act
    // component.register(new Event('submit'));
    clickElement(fixture, 'btn-submit', true);
    // query(fixture, 'form').triggerEventHandler('ngSubmit', new Event('submit'));
    fixture.detectChanges();
    expect(component.status).toEqual('loading');

    tick();  // exec pending tasks
    fixture.detectChanges();
    expect(component.status).toEqual('success');
    expect(component.form.valid).toBeTruthy();
    expect(userService.create).toHaveBeenCalled();
  }));

  it('should send the form successfully and "loading" => "success"', fakeAsync(() => {
    component.form.patchValue({
      name: 'Nico',
      email: 'nico@gmil.com',
      password: '12121212',
      confirmPassword: '12121212',
      checkTerms: true
    });
    const mockUser = generateOneUser();
    userService.create.and.returnValue(asyncData(mockUser));
    // Act
    component.register(new Event('submit'));
    expect(component.status).toEqual('loading');

    tick();  // exec pending tasks
    fixture.detectChanges();
    expect(component.status).toEqual('success');
    expect(component.form.valid).toBeTruthy();
    expect(userService.create).toHaveBeenCalled();
  }));
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterFormComponent } from './register-form.component';
import { UsersService } from './../../../services/user.service';

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
});

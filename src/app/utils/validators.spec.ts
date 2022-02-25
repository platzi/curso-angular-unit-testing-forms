import { FormControl, FormGroup } from '@angular/forms';
import { MyValidators } from './validators';

fdescribe('Tests for MyValidators',() => {

  describe('Test for validPassword', () => {

    it('should return null when password is right', () => {
      // Arrange
      const control = new FormControl();
      control.setValue('nicolas123');
      //Act
      const rta = MyValidators.validPassword(control);
      // Assert
      expect(rta).toBeNull();
    });

    it('should return null when password is wrong', () => {
      // Arrange
      const control = new FormControl();
      control.setValue('aaabbbcc');
      //Act
      const rta = MyValidators.validPassword(control);
      // Assert
      expect(rta?.invalid_password).toBeTrue();
    });
  });

  describe('Test for matchPasswords', () => {

    it('should return null', () => {
      const group = new FormGroup({
        password: new FormControl('123456'),
        confirmPassword: new FormControl('123456')
      });
      //Act
      const rta = MyValidators.matchPasswords(group);
      // Assert
      expect(rta).toBeNull();
    });

    it('should return obj with the error', () => {
      const group = new FormGroup({
        password: new FormControl('12345612'),
        confirmPassword: new FormControl('1234564545')
      });
      //Act
      const rta = MyValidators.matchPasswords(group);
      // Assert
      expect(rta?.match_password).toBeTrue()
    });

    it('should return obj with the error', () => {
      const group = new FormGroup({
        otro: new FormControl('12345612'),
        otro2: new FormControl('1234564545')
      });
      const fn = () => {
        MyValidators.matchPasswords(group);
      }
      // Assert
      expect(fn).toThrow(new Error('matchPasswords: fields not found'));
    });

  });

});

import { TestBed, async, inject } from '@angular/core/testing';
import {LoginGuard} from 'src/app/utils/guards/login/login.guard';


describe('LoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginGuard]
    });
  });

  it('should ...', inject([LoginGuard], (guard: LoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});

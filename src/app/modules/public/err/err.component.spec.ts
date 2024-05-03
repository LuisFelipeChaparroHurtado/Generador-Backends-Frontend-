import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrComponent } from './err.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('ErrComponent', () => {
  let component: ErrComponent;
  let fixture: ComponentFixture<ErrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrComponent],
      imports:[HttpClientModule,ToastrModule.forRoot()]
    });
    fixture = TestBed.createComponent(ErrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLandComponent } from './header-land.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('HeaderLandComponent', () => {
  let component: HeaderLandComponent;
  let fixture: ComponentFixture<HeaderLandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderLandComponent],
      imports:[HttpClientModule,ToastrModule.forRoot()]
    });
    fixture = TestBed.createComponent(HeaderLandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

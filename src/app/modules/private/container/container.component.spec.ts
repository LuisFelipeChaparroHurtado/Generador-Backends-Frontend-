import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerComponent } from './container.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('ContainerComponent', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerComponent],
      imports:[HttpClientModule,ToastrModule.forRoot()]
    });
    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

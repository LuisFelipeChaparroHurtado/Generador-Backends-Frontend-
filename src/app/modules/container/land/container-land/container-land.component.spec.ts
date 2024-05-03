import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerLandComponent } from './container-land.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

describe('ContainerLandComponent', () => {
  let component: ContainerLandComponent;
  let fixture: ComponentFixture<ContainerLandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerLandComponent],
      imports:[HttpClientModule,ToastrModule.forRoot()]
    });
    fixture = TestBed.createComponent(ContainerLandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

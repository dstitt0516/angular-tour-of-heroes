import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericCityListComponent } from './generic-city-list.component';

describe('GenericListComponent', () => {
  let component: GenericCityListComponent;
  let fixture: ComponentFixture<GenericCityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericCityListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenericCityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

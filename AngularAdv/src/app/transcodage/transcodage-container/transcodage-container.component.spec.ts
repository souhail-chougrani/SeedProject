import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscodageContainerComponent } from './transcodage-container.component';

describe('TranscodageContainerComponent', () => {
  let component: TranscodageContainerComponent;
  let fixture: ComponentFixture<TranscodageContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranscodageContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscodageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

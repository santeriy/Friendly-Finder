import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyroomPage } from './myroom.page';

describe('MyroomPage', () => {
  let component: MyroomPage;
  let fixture: ComponentFixture<MyroomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyroomPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyroomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

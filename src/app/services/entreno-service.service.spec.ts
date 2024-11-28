import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { EntrenoService } from './entreno-service.service';

describe('EntrenoService', () => {
  let service: EntrenoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // Agrega HttpClientModule aquí
    });
    service = TestBed.inject(EntrenoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

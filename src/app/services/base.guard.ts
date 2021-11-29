import { Router } from '@angular/router';

export abstract class BaseGuard {

  constructor(protected router: Router) {}

  protected validarClaims(): boolean {

    return true;
  }

}

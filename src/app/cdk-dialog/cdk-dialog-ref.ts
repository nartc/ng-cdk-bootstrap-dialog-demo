import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, race, Subject } from 'rxjs';
import { filter, mapTo, take } from 'rxjs/operators';
import { CdkDialogContainerComponent } from './cdk-dialog-container.component';
import { AnimationState } from './constants';

const AnimationPhase = {
  START: 'start',
  DONE: 'done'
};

export class CdkDialogRef<TReturnType = any, TContentComponent = any> {
  private readonly beforeClosed$ = new Subject();
  private readonly afterClosed$ = new Subject<TReturnType>();
  private result: TReturnType;

  componentInstance: CdkDialogContainerComponent<TContentComponent>;

  constructor(private readonly overlayRef: OverlayRef) {
    race(
      overlayRef.backdropClick().pipe(mapTo(undefined)),
      overlayRef.keydownEvents().pipe(filter(event => event.keyCode === ESCAPE && !hasModifierKey(event)), mapTo(undefined))
    ).pipe(take(1)).subscribe(this.close.bind(this));

    overlayRef.detachments().subscribe(() => {
      this.afterClosed$.next(this.result);
      this.afterClosed$.complete();
      this.componentInstance = null;
    });
  }

  get beforeClosed(): Observable<unknown> {
    return this.beforeClosed$.asObservable();
  }

  get afterClosed(): Observable<TReturnType> {
    return this.afterClosed$.asObservable();
  }

  close(data?: TReturnType): void {
    this.result = data;
    this.componentInstance.animationStateChanged.pipe(
      filter(event => event.phaseName === AnimationPhase.START),
      take(1)
    ).subscribe(() => {
      this.overlayRef.detachBackdrop();
      this.beforeClosed$.next();
      this.beforeClosed$.complete();
    });

    this.componentInstance.animationStateChanged.pipe(
      filter(event => event.phaseName === AnimationPhase.DONE && event.toState === AnimationState.Leave),
      take(1)
    ).subscribe(this.overlayRef.dispose.bind(this.overlayRef));

    this.componentInstance.startExitAnimation();
  }
}

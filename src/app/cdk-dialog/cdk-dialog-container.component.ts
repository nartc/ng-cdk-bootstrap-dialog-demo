import { AnimationEvent } from '@angular/animations';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  HostBinding,
  HostListener,
  OnDestroy,
  Type,
  ViewChild
} from '@angular/core';
import { CdkContentDialogDirective } from './cdk-content-dialog.directive';
import { CdkDialogRef } from './cdk-dialog-ref';
import { CdkDialogConfig } from './cdk-dialog.config';
import { AnimationState, fadeAnimation, zoomAnimation } from './constants';

@Component({
  selector: 'app-cdk-dialog-container',
  template: `
    <div class="card" [@zoom]="{value: animationState, params: {timing: cdkDialogConfig.contentAnimationTiming}}">
      <div class="card-header d-flex justify-content-between align-items-center">
        {{cdkDialogConfig.header}}
        <button type="button" class="close" aria-label="Close" (click)="onCloseClick()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="card-body">
        <ng-container appCdkContentDialog></ng-container>
      </div>
    </div>
  `,
  styles: [
      `
      :host {
        min-width: 500px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [zoomAnimation(), fadeAnimation()]
})
export class CdkDialogContainerComponent<TContentComponent = any> implements AfterViewInit, OnDestroy {
  @ViewChild(CdkContentDialogDirective) contentInsertionPoint: CdkContentDialogDirective;

  animationState = AnimationState.Enter;
  animationStateChanged = new EventEmitter<AnimationEvent>();
  contentComponentType: Type<TContentComponent>;
  private contentComponentRef: ComponentRef<TContentComponent>;

  @HostBinding('@fade') get hostAnimation() { // [@fade]
    return {
      value: this.animationState,
      params: {
        timing: this.cdkDialogConfig.containerAnimationTiming,
        delayChild: this.cdkDialogConfig.animationChildDelay
      }
    };
  }

  @HostListener('@fade.start', ['$event']) // (@fade.start)="onAnimationStart($event)"
  onAnimationStart(event: AnimationEvent) {
    this.animationStateChanged.emit(event);
  }

  @HostListener('@fade.done', ['$event'])
  onAnimationDone(event: AnimationEvent) {
    this.animationStateChanged.emit(event);
  }

  constructor(
    public readonly cdkDialogConfig: CdkDialogConfig,
    private readonly cdkDialogRef: CdkDialogRef,
    private readonly cfr: ComponentFactoryResolver,
    private readonly cdr: ChangeDetectorRef
  ) {
  }

  ngAfterViewInit(): void {
    this.loadContentComponent();
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.contentComponentRef?.destroy();
  }

  onCloseClick(): void {
    this.closeDialog();
  }

  startExitAnimation(): void {
    this.animationState = AnimationState.Leave;
    this.cdr.markForCheck();
  }

  private closeDialog(): void {
    this.cdkDialogRef.close();
  }

  private loadContentComponent(): void {
    if (!this.contentComponentRef) {
      const factory = this.cfr.resolveComponentFactory(this.contentComponentType);
      const vcr = this.contentInsertionPoint.viewContainerRef;
      vcr.clear();
      this.contentComponentRef = vcr.createComponent(factory);
    }
  }
}

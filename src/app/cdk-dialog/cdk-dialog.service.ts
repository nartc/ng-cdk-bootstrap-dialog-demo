import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Injectable, Injector, Type } from '@angular/core';
import { CdkDialogContainerComponent } from './cdk-dialog-container.component';
import { CdkDialogRef } from './cdk-dialog-ref';
import { CdkDialogConfig } from './cdk-dialog.config';

@Injectable({
  providedIn: 'root'
})
export class CdkDialogService {

  private readonly defaultDialogConfig: CdkDialogConfig;

  constructor(private readonly overlay: Overlay, private readonly injector: Injector) {
    this.defaultDialogConfig = new CdkDialogConfig();
    this.defaultDialogConfig.overlayConfig = new OverlayConfig({
      disposeOnNavigation: true,
      hasBackdrop: true,
      panelClass: 'nartcdk-dialog-panel',
      backdropClass: 'nartcdk-dialog-backdrop',
      scrollStrategy: overlay.scrollStrategies.block(),
      positionStrategy: overlay.position().global().centerVertically().centerHorizontally()
    });
  }

  open<TReturnType = any, TContentComponent = any>(
    component: Type<TContentComponent>,
    config?: Partial<CdkDialogConfig>
  ): CdkDialogRef<TReturnType, TContentComponent> {
    const mergeConfig = this.getMergeConfig(config);
    const overlayRef = this.overlay.create(mergeConfig.overlayConfig);
    const cdkDialogRef = new CdkDialogRef<TReturnType, TContentComponent>(overlayRef);
    cdkDialogRef.componentInstance = this.attachDialogContainer(overlayRef, component, cdkDialogRef, mergeConfig);
    return cdkDialogRef;
  }


  private getMergeConfig(config: Partial<CdkDialogConfig>): CdkDialogConfig {
    if (config == null) {
      return this.defaultDialogConfig;
    }

    return {
      ...this.defaultDialogConfig,
      ...config,
      overlayConfig: { ...this.defaultDialogConfig.overlayConfig, ...(config?.overlayConfig || {}) }
    };
  }

  private attachDialogContainer<TContentComponent = any>(
    overlayRef: OverlayRef,
    component: Type<TContentComponent>,
    dialogRef: CdkDialogRef,
    dialogConfig: CdkDialogConfig
  ) {
    const injector = this.createInjector(dialogRef, dialogConfig);
    const portal = new ComponentPortal(CdkDialogContainerComponent, null, injector);
    const containerRef = overlayRef.attach(portal);
    containerRef.instance.contentComponentType = component;
    return containerRef.instance;
  }

  private createInjector(dialogRef: CdkDialogRef, dialogConfig: CdkDialogConfig): PortalInjector {
    const injectionTokenMap = new WeakMap();
    injectionTokenMap.set(CdkDialogRef, dialogRef);
    injectionTokenMap.set(CdkDialogConfig, dialogConfig);
    return new PortalInjector(this.injector, injectionTokenMap);
  }
}

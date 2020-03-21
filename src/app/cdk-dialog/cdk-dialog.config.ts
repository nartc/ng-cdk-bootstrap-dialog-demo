import { OverlayConfig } from '@angular/cdk/overlay';

export class CdkDialogConfig<TData = any> {
  header = ''; // title of dialog
  closable = true; // determine whether the dialog is closable or not
  containerAnimationTiming = 0.3; // fade
  contentAnimationTiming = 0.2; // zoom
  animationChildDelay = 0;
  data?: TData;
  overlayConfig?: OverlayConfig;
}

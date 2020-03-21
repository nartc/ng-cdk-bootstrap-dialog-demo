import { animate, animateChild, animation, group, keyframes, query, style, transition, trigger, useAnimation } from '@angular/animations';

export const zoomAnimation = () =>
  trigger('zoom', [
    transition(
      `* => ${AnimationState.Enter}`,
      useAnimation(
        animation([
          animate(
            '{{ timing }}s 0s',
            keyframes([
              style({
                opacity: 0,
                transform: 'scale3d(.3, .3, .3)',
                offset: 0
              }),
              style({
                opacity: 1,
                transform: 'scale3d(1, 1, 1)',
                offset: 0.5
              })
            ])
          )
        ]),
        { params: { timing: '{{timing}}' } }
      )
    ),
    transition(
      `* => ${AnimationState.Leave}`,
      useAnimation(
        animation([
          animate(
            '{{ timing }}s 0s',
            keyframes([
              style({
                opacity: 1,
                offset: 0
              }),
              style({
                opacity: 0,
                transform: 'scale3d(.3, .3, .3)',
                offset: 0.5
              }),
              style({
                opacity: 0,
                offset: 1
              })
            ])
          )
        ]),
        { params: { timing: '{{timing}}' } }
      )
    )
  ]);

export const fadeAnimation = () =>
  trigger('fade', [
    transition(
      `* => ${ AnimationState.Enter }`,
      group([
        useAnimation(
          animation(
            animate(
              '{{timing}}s 0s',
              keyframes([
                style({
                  opacity: 0,
                  transform: 'translate3d(0, 0, 0)',
                  offset: 0
                }),
                style({
                  opacity: 1,
                  transform: 'translate3d(0, 0, 0)',
                  offset: 1
                })
              ])
            )
          ),
          { params: { timing: '{{timing}}' } }
        ),
        query('@zoom', [animateChild({ delay: '{{delayChild}}' })], {
          optional: true
        })
      ])
    ),
    transition(
      `* => ${ AnimationState.Leave }`,
      group([
        useAnimation(
          animation(
            animate(
              '{{timing}}s 0s',
              keyframes([
                style({
                  opacity: 1,
                  transform: 'translate3d(0, 0, 0)',
                  offset: 0
                }),
                style({
                  opacity: 0,
                  transform: 'translate3d(0, 0, 0)',
                  offset: 1
                })
              ])
            )
          ),
          { params: { timing: '{{timing}}' } }
        ),
        query('@zoom', [animateChild({ delay: '{{delayChild}}' })], {
          optional: true
        })
      ])
    )
  ]);

export enum AnimationState {
  Enter = 'enter',
  Leave = 'leave'
}

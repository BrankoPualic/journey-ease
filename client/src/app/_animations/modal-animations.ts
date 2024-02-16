import { animate, style, transition, trigger } from '@angular/animations';

export const easeOutOpacityAnimation = trigger('modalAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms ease-out', style({ opacity: 1 })),
  ]),
  transition(':leave', [animate('300ms ease-in', style({ opacity: 0 }))]),
]);

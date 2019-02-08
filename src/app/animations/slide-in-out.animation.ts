import { trigger, transition, animate, style, state } from '@angular/animations';

export const slideInOutAnimation = trigger('slideInOut', [
    state('loading', style({transform: 'translateX(-100%)'})),
    transition('not-loading => loading', [
        animate('400ms ease-in', style({transform: 'translateX(-100%)'}))
    ]),
    transition('loading => not-loading', [
        animate('400ms ease-out', style({transform: 'translateX(0%)'}))
    ])
]);

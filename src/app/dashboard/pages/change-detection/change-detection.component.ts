import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  standalone: true,
  imports: [CommonModule, TitleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-title [title]="currentFramework()" />
    <pre>{{ frameworkAsSignal() | json }}</pre>
    <pre>{{ frameworkAsProperty | json }}</pre>
  `,
  styles: ``,
})
export default class ChangeDetectionComponent {
  currentFramework = computed(
    () => `Change Detection - ${this.frameworkAsSignal().name}`
  );

  frameworkAsSignal = signal({
    name: 'Angular',
    releaseDate: '2016',
  });

  frameworkAsProperty = {
    name: 'Angular',
    releaseDate: '2016',
  };

  constructor() {
    setTimeout(() => {
      this.frameworkAsSignal.update((value) => ({
        ...value,
        name: 'Next',
      }));
      // this.frameworkAsProperty.name = 'Next';

      console.log('Hecho');
    }, 3000);
  }
}

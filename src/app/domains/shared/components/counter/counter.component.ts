import { Component, Input, signal, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
@Input({required: true}) duration: number = 0;
@Input({required: true}) message = '';
counter = signal(0);
counterRef: number | undefined;

constructor(){
  //la creacion del constructor es no asincrona
  //before render
  console.log('constructor');
  console.log( '-'.repeat(10) );
};

ngOnChanges(changes: SimpleChanges) {
  //Called before and during render
  console.log('ngOnChanges');
  console.log( '-'.repeat(10) );
  console.log( changes );
  const duration = changes['duration'];
  if (duration && duration.currentValue !== duration.previousValue) {
    this.doSomething();
  }

}

ngOnInit() {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  //async, then, subs

  console.log('ngOnInit');
  console.log( '-'.repeat(10) );
  console.log('duration =>', this.duration);
  console.log('duration =>', this.message);

  this.counterRef = window.setInterval (() => {
    console.log('run interval');
    this.counter.update(statePrev => statePrev + 1);
  }, 1000)
}

ngAfterViewInit() {
  //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //Add 'implements AfterViewInit' to the class.  hijos ya fueron renderizados
  console.log('ngAfterViewInit');
  console.log( '-'.repeat(10) );
}
ngOnDestroy() {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  console.log('ngOnDestroy');
  console.log( '-'.repeat(10) );

  window.clearInterval(this.counterRef);
}

doSomething(){
  console.log('change duration');
}
}

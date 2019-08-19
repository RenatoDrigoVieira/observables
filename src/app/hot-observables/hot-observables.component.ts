import { Component, OnInit } from '@angular/core';
import { Observable, Observer, Subject, ConnectableObservable } from 'rxjs';
import {publish, refCount, share} from 'rxjs/operators';

@Component({
  selector: 'app-hot-observables',
  templateUrl: './hot-observables.component.html',
  styleUrls: ['./hot-observables.component.css']
})
export class HotObservablesComponent implements OnInit {

  n: number =0
  n1: number =0
  n2: number =0
  s1:string =""
  s2:string=""

  myObservable: Observable<number>;

  constructor() { }

  ngOnInit() {
    this.myObservable = new Observable(
      (observer: Observer<number>)=>{
        let i: number = 0
        setInterval(()=>{
          i++
          (i==100) ? observer.complete() : observer.next(i);
        },1000)
      }
    )
    //this.usingSubjects();
    //this.usingPublish();
    this.usingShare()
  }
  usingSubjects(){
    const subject = new Subject<number>();
    this.myObservable.subscribe(subject);

      this.s1 = "waiting for interval..."
      setTimeout(()=>{
        subject.subscribe((n)=>{
          this.n1 = n;
          this.s1 = 'Ok'
        })
      },2000)

      setTimeout(()=>{
        subject.subscribe((n)=>{
          this.n2 = n;
          this.s2 = 'Ok'
        })
      },4000)
  }

  usingPublish(){
    /*
     const multicasted = this.myObservable.pipe(
      publish(), refCount()
    )
    */

   const multicasted: ConnectableObservable<number> = this.myObservable.pipe(
    publish()) as ConnectableObservable<number>
    multicasted.connect();
    
    this.s1 = "waiting for interval..."
      setTimeout(()=>{
        multicasted.subscribe((n)=>{
          this.n1 = n;
          this.s1 = 'Ok'
        })
      },2000)

      setTimeout(()=>{
        multicasted.subscribe((n)=>{
          this.n2 = n;
          this.s2 = 'Ok'
        })
      },4000)
  }

  usingShare(){
    /*
     const multicasted = this.myObservable.pipe(
      publish(), refCount()
    )
    */

   const multicasted  = this.myObservable.pipe(share()) 
    
    this.s1 = "waiting for interval..."
      setTimeout(()=>{
        multicasted.subscribe((n)=>{
          this.n1 = n;
          this.s1 = 'Ok'
        })
      },2000)

      setTimeout(()=>{
        multicasted.subscribe((n)=>{
          this.n2 = n;
          this.s2 = 'Ok'
        })
      },4000)
  }

}

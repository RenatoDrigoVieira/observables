import { Component, OnInit } from '@angular/core';
import { Observable, Observer, interval, Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {

  subscription1: Subscription
  subscription2: Subscription
  n1: number =0
  n2: number =0
  s1:string =""
  s2:string=""

  constructor() { }

  ngOnInit() {
    this.s1= 'Initializing...'
    this.s2= 'Initializing...'
    /*
    const myFirstObservable = new Observable((observable:Observer<number>)=>{
      observable.next(1);
      observable.next(2);
      observable.next(3);
      observable.next(4);
      observable.next(5);
      observable.error("6");
      observable.complete();
    })
    myFirstObservable.subscribe((n:number)=>{
      console.log(n);
      
    },
    (error)=>console.error(error),
    ()=>console.log('completed.'))
    
    
    const timerCount = interval(500)
    timerCount.subscribe((n)=>console.log(n))
    console.log("after interval")
    */
   const myIntervalObservable = new Observable((observer: Observer<any>)=>{
     let i:number = 0
     let id =setInterval(()=>{
       i++;
       console.log('From Observable: ' ,i)
       if(i == 10){
         observer.complete();
       }else if(i%2==0){
        observer.next(i);
       }
     },1000)
     return () =>{ 
       clearInterval(id)
      }
   })

   this.subscription1 = myIntervalObservable.subscribe((_n)=>{
     this.n1=_n
   },
   (error)=>{this.s1 = "Error: " +error},
   ()=>{this.s1 = "Completed"})

   this.subscription2 = myIntervalObservable.subscribe((_n)=>{
    this.n2=_n
  },
  (error)=>{this.s2 = "Error: " +error},
  ()=>{this.s2 = "Completed"})

  setTimeout(()=>{
    this.subscription1.unsubscribe()
    this.subscription2.unsubscribe()
  },11000)
  
 
 }
 

}

# levelrunnerrc

## About

This is the legacy-level runner event chain. 
Still used some of my legacy games. 
This a helpful tool if you build an event build code where some event can trigger multiple functions. 
The levels can be defined as a costume number of levels. So if a function is dependent on another. Possible to set the other to a lower level and that guarantees the dependencies running in the right level.
This is maintained for legacy reasons only.




## install

```bash
npm i levelrunnerrc

```

## init 


```javascript

const levelrunner = new (require('levelrunner')).Base(
    ()=>{
       // do something before;
    },
    ()=>{
       // do something after; 
    },
    100 // numberOfLevels
);

```


## add task

```javascript

levelrunner.add(
    function(){
        //do something
    },
    runlevel,
    name
);


```

## run 

frontend


```javascript

window.onload = levelrunner.run;

```

backend

```javascript

levelrunner.run();

```



#levelrunnerrc
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



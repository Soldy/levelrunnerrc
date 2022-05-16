const nanoTest  = new (require('nanoTest')).test({
    'debug_print' : 'short',
    'progress_bar' : false
});

const runner =  new (require('./index.js')).base(()=>{},()=>{},3);
let level_one = false;

nanoTest.add(
    'level_one status',
    {
        'function':function(){
             return level_one;
        }
    },
    '===',
    false

);
nanoTest.add(
    '',
    {
        'function':runner.add,
        'options' :[
            function(){
                 level_one = true;
            },
            1
        ]
    },
    '===',
    true
);
nanoTest.add(
    '',
    {
        'function':function(){runner.run();return true;},
        'options' :[
        ]
    },
    '!error'
);
nanoTest.add(
    'level_one status',
    {
        'function':function(){
             return level_one;
        }
    },
    '===',
    true

);

nanoTest.run();

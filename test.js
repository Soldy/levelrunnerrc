const nanoTest  = new (require('nanoTest')).test({
    'debug_print' : 'short',
    'progress_bar' : false
});

const _runner_class =  (require('./index.js')).base;

let level_one = false;
let level_before = false;
let level_after = false;

const runner =  new _runner_class(
    function(){
        level_before = true;
    },
    function(){
        level_after = true;
    },
    3
);
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
    'before level status',
    {
        'function':function(){
            return level_before;
        }
    },
    '===',
    false

);
nanoTest.add(
    'after level status',
    {
        'function':function(){
            return level_after;
        }
    },
    '===',
    false

);
nanoTest.add(
    'add function to level one',
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
    'run runner',
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
nanoTest.add(
    'before level status',
    {
        'function':function(){
            return level_before;
        }
    },
    '===',
    true
);
nanoTest.add(
    'after level status',
    {
        'function':function(){
            return level_after;
        }
    },
    '===',
    true
);

nanoTest.run();

const nanoTest  = new (require('nanoTest')).test({
    'debug_print' : 'short',
    'progress_bar' : false
});

const _runner_class =  (require('./index.js')).base;

let level_one = false;
let level_before = false;
let level_after = false;
let runner;
(async function(){
nanoTest.add(
    'init defore not a function',
    {
        'function' : function(){
            runner =  new _runner_class(
                593,
                function(){
                    level_after = true;
                },
                'cool'
            );
        }
    },
    'error'
);
nanoTest.add(
    'init after not a function',
    {
        'function' : function(){
            runner =  new _runner_class(
                function(){
                    level_before = true;
                },
                593,
                'cool'
            );
        }
    },
    'error'
);
nanoTest.add(
    'init cool level',
    {
        'function' : function(){
            runner =  new _runner_class(
                function(){
                    level_before = true;
                },
                function(){
                    level_after = true;
                },
                'cool'
            );
        }
    },
    'error'
);
nanoTest.add(
    'init 1.5 level',
    {
        'function' : function(){
            runner =  new _runner_class(
                function(){
                    level_before = true;
                },
                function(){
                    level_after = true;
                },
                1.5
            );
        }
    },
    'error'
);
nanoTest.add(
    'init 0 level',
    {
        'function' : function(){
            runner =  new _runner_class(
                function(){
                    level_before = true;
                },
                function(){
                    level_after = true;
                },
                0
            );
        }
    },
    'error'
);
nanoTest.add(
    'init to much level',
    {
        'function' : function(){
            runner =  new _runner_class(
                function(){
                    level_before = true;
                },
                function(){
                    level_after = true;
                },
                101
            );
        }
    },
    'error'
);
nanoTest.add(
    'init',
    {
        'function' : function(){
            runner =  new _runner_class(
                function(){
                    level_before = true;
                },
                function(){
                    level_after = true;
                },
                3
            );
        }
    },
    '!error'
);
await nanoTest.partly();
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
    'add string as a function to level one',
    {
        'function':runner.add,
        'options' :[
            'not a function',
            1
        ]
    },
    'error'
);
nanoTest.add(
    'add string as a function to level -1',
    {
        'function':runner.add,
        'options' :[
            ()=>{},
            -1
        ]
    },
    'error'
);
nanoTest.add(
    'add string as a function to level cool',
    {
        'function':runner.add,
        'options' :[
            ()=>{},
            'cool'
        ]
    },
    'error'
);
nanoTest.add(
    'add string as a function to level 2.5',
    {
        'function':runner.add,
        'options' :[
            ()=>{},
            2.5
        ]
    },
    'error'
);
nanoTest.add(
    'add string as a function to level 4',
    {
        'function':runner.add,
        'options' :[
            ()=>{},
            4
        ]
    },
    'error'
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
})();

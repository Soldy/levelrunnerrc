/*
 *  @Soldy\levelrunnerrc\2021.02.29\GPL3
 */
'use strict';

/*
 * @prototype
 */
const levelRunnerBase = function(before_in, after_in, level_in){
    /*
     * @param {function} func
     * @param {integer} level
     * @param {string} name
     * @public
     * @return {boolean}
     */
    this.add = function(fun, level, name){
        return _add(fun, level, name);
    };
    /*
     * @param {integer} level
     * @param {string} name
     * @public
     * @return {boolean}
     */
    this.del = function(level, name){
        return _del(level, name); 
    }
    /*
     * @public
     */
    this.run = function(){
        return _run();
    };
    /*
     * @private
     * @var {boolean}
     */
    let _before = ()=>{};
    /*
     * @private
     * @var {boolean}
     */
    let _after = ()=>{};
    /*
     * @private
     * @var {array}
     */
    let _procedures = [];
    /*
     * @private
     * @var {integer}
     */
    let _level = 10;
    /*
     * @param {function} func
     * @param {integer} level
     * @param {string} name
     * @private
     * @return {boolean}
     */
    const _add = function(fun, level, name){
        if ( typeof fun !== 'function' )
            throw new TypeError (
                '"fun" is a "'+
                (typeof fun)+
                '" not a function.'
            );
        if ( typeof level !== 'number' )
            throw new TypeError (
                '"level" is a "'+
                (typeof level)+
                '" not a number.'
            );
        if ( Number.isInteger(level) === false )
            throw new TypeError (
                '"level" is not an integer.'
            );
        if ( 0 > level )
            throw new TypeError (
                '"level" is smaller than 0'
            );
        if ( level >= _level )
            throw new TypeError (
                '"level" is bigger than the max level'
            );
        _procedures[level].push({
            fun:fun,
            name:name
        });
        return true;
    };
    /*
     * @private
     */
    const _run=async function(){
        _before();
        for (let p of _procedures) 
            for (let i of p) 
                await _execute(i);
        _after();
    };
    /*
     * @param {object} procedure
     * @private
     */
    const _execute = async function(procedure){
        if ( procedure.fun.constructor.name === 'AsyncFunction' )
            return await procedure.fun();
        return procedure.fun();
    };
    // init
    if (
        ( typeof level_in === 'number' ) &&
        ( Number.isInteger(level_in) ) &&
        ( level_in > 0 )
    )
        _level = parseInt(level_in);
    for(let i =0; _level> i; i++)
        _procedures.push([]);
    if ( typeof afterIn === 'function' )
        _after = after_in;
    if( typeof beforeIn === 'function' )
        _before = before_in;
};


exports.base = levelRunnerBase ;
exports.Base = levelRunnerBase ;

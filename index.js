/*
 *  @Soldy\levelrunnerrc\2021.02.29\GPL3
 */
'use strict';

/*
 *
 * Empty before- and after-functions are just fine.
 * We do not force the user to use this feature.
 * If you have a car with 300 horsepower,
 * you do not always have to use all of it.
 *
 * @param {function} before_in_
 * @param {function} after_in_
 * @param {integer}  level_in_
 * @param {function} func
 * @prototype
 */
const LevelRunner = function(before_in_ = ()=>{}, after_in_ = ()=>{}, level_in_ = 10){
    /*
     * @param {function} func
     * @param {integer} level
     * @param {string} name
     * @public
     * @return {void}
     */
    this.add = function(fun, level, name){
        _add(fun, level, name);
    };
    /*
     * @public
     */
    this.run = async function(){
        await _run();
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
     * @var {array}
     */
    let _names = [];
    /*
     * @private
     * @var {integer}
     */
    let _level = 10;
    /*
     *  I am not judgy. 
     *  If someone left an empty function.
     *  I think that's a polition.
     *
     * @param {function} func
     * @param {integer} level
     * @param {string} name
     * @private
     * @return {void}
     */
    const _add = function(fun_ = ()=>{}, level_ = 1, name_ = 'none'){
        let runner = {};
        _check(fun_, level_, name_);
        runner.fun = fun_;
        _names.push(name_.toString());
        runner.name = name_;
        _procedures[level_].push(runner);
    };
    /*
     * @private
     */
    const _run=async function(){
        await _before();
        for (let p of _procedures) 
            for (let i of p) 
                await _execute(i);
        await _after();
    };
    /*
     * @param {object} procedure
     * @private
     */
    const _execute = async function(procedure){
        return await procedure.fun();
    };

    /*
     * @param {function} func
     * @param {integer} level
     * @param {string} name
     * @private
     * @return {void}
     */
    const _check = function(fun, level, name){
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
        if ( level >= _procedures.length )
            throw new TypeError (
                '"level" is bigger than the max level'
            );
        if(typeof name !== 'string')
            throw new TypeError (
                'name is a '+
                (typeof name).toString()+
                ' not a string'
            );
        if(_names.indexOf(name) > -1)
            throw new Error (
                'process "'+
                name+
                '" is already added.'
            );
    };
    // init
    if ( typeof level_in_ !== 'number' )
        throw new TypeError (
            'level number is "'+
            level_in_+
            '" that not a number.'
        );
    if (!Number.isInteger(level_in_) )
        throw new TypeError (
            'level number is "'+
            level_in_+
            '" that not an integer.'
        );
    if ( 1 > level_in_ )
        throw new TypeError (
            'level number is "'+
            level_in_+
            '" that smaller than 1.'
        );
    if (  level_in_ > 100 )
        throw new TypeError (
            'level number is too high"'
        );
    if ( typeof after_in_ !== 'function' )
        throw new TypeError (
            'after is not a function'
        );
    if( typeof before_in_ !== 'function' )
        throw new TypeError (
            'before is not a function'
        );
    _level = parseInt(level_in_+1);
    for(let i =0; _level> i; i++)
        _procedures.push([]);
    _before = before_in_;
    _after = after_in_;
};

//For compatibility reasons, we have to leave these 3 exports.
//Not ideal maybe terrible but stay here for now.
exports.base = LevelRunner ;
exports.Base = LevelRunner ;
exports.LevelRunner = LevelRunner ;

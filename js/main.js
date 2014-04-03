(function main()
{
    // strange behavior detected
    // cell = Math.floor(Math.random() * 2);
    // console.log( ._isNumber( cell ); )
    // true
    // worldState[i][j].push( cell );
    // console.log( ._isArray( cell );) 
    // true


    // TODO:
    //  1. Create infinte wrapper
    //  2. Split Update View in actions
    //  3. Add controls to randomizer and examples
    //  4. create RLE converter
    //  draft : function updateView( worldState, firstGen ) {}
    var worldState = gliderGun,
        domElem = $( '#world' ),
        clearElem = 'tr',
        height = 100,
        width = 100,
        timeout = 1,
        model = [],
        view = '';

    function loop()
    {    
        if( !_.isArray( worldState )) {
            model = firstGeneration( width, height );
        } else {
            model = updateData( worldState );
        };

        view = updateView( model );
        draw( domElem, clearElem, view );
        worldState = model;
        view = null;
        model = null;
    };

    setInterval( loop, timeout );
})();

// return somtg?
// input DOM OBJECT, STRING, STRING => WORLD
// domTarget to animate one generation state
// removeHtml elements to clear from DOM
// drawHtml html to darw generation
function draw( domTarget, removeHtml, drawHtml )
{
    // clear screen
    if( domTarget.has( removeHtml )) 
        { domTarget.find( removeHtml ).remove(); }

    // draw new generation
    domTarget.find( 'tbody' ).append( drawHtml );
}

// NUMBER, NUMBER => ARRAY
// input: two numbers
// y - size of the first array
// represents HEIGHT
// x - size of the nested array
// represents WIDTH
// output: array which represent first generation
function firstGeneration ( width, height )
{
    var worldState = [],
    cell;

    _( height ).times(function( i ) 
    {
        worldState[i] = [];
        _( width ).times(function( j ) 
        {
            cell = Math.floor(Math.random() * 2);
            worldState[i].push( cell );
        });
    });
    return worldState;
};

// ARRAY => Array
// ipnut: current world state
// output: next generation world state
function updateData( worldState )
{
    var width = worldState[0].length,
    height = worldState.length,
    newWorldState = [];

    _(height).times(function( y )
    {    
        newWorldState[y] = [];
        _(width).times(function( x )
        {    
            newWorldState[y][x] = [];
            neighbours = checkNeighbour( y, x, worldState );
            cellStatus = checkCellStatus( worldState[y][x], neighbours );

            if ( worldState[y][x] === 1 )
            {
            	newWorldState[y][x] = ( cellStatus ) ? 1 : 0;  	
            }
            else
            {
            	newWorldState[y][x] = ( cellStatus ) ? 1 : 0;
            }
        });        
    });

    return newWorldState;
};

// NUMBER, NUMBER, ARRAY => NUNBER
// input: array keys and array 
// to check Neighbour cells
// output: Neighbour cells amount
function checkNeighbour( keyY, keyX, worldState ) 
{
    var diffY = diffX = -1,
    dy = dx = 0,
    cnt = 0;

    for( var diffY = -1; diffY < 2; diffY += 1 ) 
    {
        // check if key out of the array range
        dy = keyY + diffY;
        if ( _.isUndefined( worldState[dy] )) continue;

        for( var diffX = -1; diffX < 2; diffX += 1 ) 
        {
            dx = keyX + diffX;

            // check if key out of the array range,
            // dead or it has keY, keyX
            if ( _.isUndefined( worldState[dy][dx] ) || ( diffX === 0 && diffY === 0 )) continue;
            if ( worldState[dy][dx] === 1 ) cnt += 1;
        }
    }
    return cnt;
}

// NUMBER => BOOLEAN
// input: neighnours amount
// output: next generation cell status
function checkCellStatus( cell, neighbours )
{
	if ( neighbours < 2 ) {
		return false;
	} 
	else if ( neighbours > 3 ) 
	{
		return false;
	} 
	else if ( neighbours === 2 )
	{
		return cell;
	} 
	else if ( neighbours === 3 )
	{
		return true;
	}
}

// ARRAY => STRING
// input: ARRAY coverted to string
// output: STRING to append in html
function updateView( worldState ) 
{    
    var alive = '<td class="alive"></td>',
    dead = '<td></td>',
    close = '</tr>',
    open = '<tr>',
    html = '';

    _.each( worldState, function( element ) 
    { 
        html += open;

        _.each( element, function( subEl ) 
        {
            if ( subEl == 1 ) {
                html += alive;
            } else {
                html += dead;              
            };
        });
        html += close; 
    });

    return html;
};
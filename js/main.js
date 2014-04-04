(function main()
{
    // TODO:
    //  2. Split Update View in actions
    //  3. Add controls to randomizer and examples
    //  4. create RLE converter
    //  5. move first gen to ui or controler

    var worldState;
    var domElem = $( '#world' );
    var clearElem = 'tr';
    var height = 10;
    var width = 10;
    var timeout = 30;

    function loop()
    {   
    	var model = [];
    	var view = '';

        if( !_.isArray( worldState )) {
            model = randomGeneration( width, height );
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
// output: array which represent first generationrandom ( width, height )
function randomGeneration ( width, height )
{
    var worldState = [];
    var cell;

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
    var width = worldState[0].length;
    var height = worldState.length;
    var newWorldState = [];

    _(height).times(function( y )
    {    
        newWorldState[y] = [];
        _(width).times(function( x )
        {    
            newWorldState[y][x] = [];
            neighbours = checkNeighbour( y, x, worldState );
            cellStatus = checkCellStatus( worldState[y][x], neighbours );

            if ( worldState[y][x] )
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

function checkNeighbour( y, x, worldState ) 
{
    var width = worldState[0].length;
    var height = worldState.length;
    var dy = dx = 0;
    var cnt = 0;

    for( var i = -1; i < 2; i += 1 ) {

        dy = y + i;
        if ( _.isUndefined( worldState[dy] )) continue;

        for( var j = -1; j < 2; j += 1 )  {

            dx = x + j;
            if ( _.isUndefined( worldState[dy][dx] ) || ( i === 0 && j === 0 )) continue;
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
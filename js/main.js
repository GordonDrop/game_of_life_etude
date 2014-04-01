var genCnt = 1;

// TODO: loop stuck at second genera
function main() 
{
	// constants
	var width = 25;
	var height = 15;
	var timeout = 1000;
	var domElem = $( '#world' );
	var clearElem = 'tr';
	var x = 0;
	var saveWorldState; 

					test=   [[0,0,0],[1,1,1],[0,0,0]];   
						 //   [[1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0],
							// [0,1,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0],
							// [0,0,1,1,1,1,0,1,0,0,0,1,0,1,0,1,1,0,1,0,0,0,0,0,0],
							// [0,0,0,1,1,1,1,0,1,1,0,0,1,0,1,0,1,1,0,0,0,0,0,0,0],
							// [0,0,0,0,1,1,0,1,0,1,1,0,0,0,1,1,1,0,0,0,0,1,0,0,0],
							// [0,1,0,0,0,1,0,0,1,1,1,1,0,1,0,1,1,1,0,0,0,0,1,0,0],
							// [1,0,1,0,0,1,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,1,1,0,0],
							// [0,1,0,0,1,1,1,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,1,1,0],
							// [0,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,0,0,0,0,0,1,0,1,1],
							// [0,0,1,0,1,0,0,1,0,0,0,1,1,0,1,0,0,0,0,0,0,1,1,0,0],
							// [1,0,1,1,0,1,1,1,1,1,0,0,0,0,0,1,0,0,1,1,0,0,1,1,0],
							// [0,1,0,1,1,0,1,1,1,1,1,1,0,0,0,0,1,0,0,1,1,0,1,0,1],
							// [0,0,0,0,1,1,0,1,0,1,1,0,1,1,0,0,0,0,0,0,1,0,0,1,0],
							// [0,0,0,0,0,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
							// [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0]];
	console.log( 'die')

	var model;
	var view;

	function loop()
	{	
		if( !_.isArray( saveWorldState )) {
			console.log( 'true' );
			//model = firstGeneration( width, height );
			model = test;
		} else {
			console.log( 'false' );
			model = updateData( saveWorldState );
		};

		view = updateView( model );
		draw( domElem, clearElem, view );
		saveWorldState = model;

	};
	setInterval( loop, timeout );

	// loop();
	// loop();
};

// input OBJECT, STRING, STRING => WORLD
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

// number, number => array
// input: two numbers
// output: array which represent world
// y - size of the first array
// represents HEIGHT
// x - size of the nested array
// represents WIDTH
function firstGeneration( x, y )
{
	console.log( 'create model', genCnt);
	var cell;
	var worldState = [];

	_(y).times(function( i ) 
	{
		worldState[i] = [];
		_(x).times(function( j ) 
		{
			cell = Math.floor(Math.random() * 2);
			worldState[i][j] = [];
			worldState[i][j].push( cell );		
		});
	});
	return worldState;
};

function updateData( worldState )
{
	console.log( 'update model', genCnt );
	genCnt++;
	var yLen = worldState.length;
	var xLen = worldState[0].length;
	var newWorldState = _.clone( worldState );

	console.log( '\n' );
	_(yLen).times(function( y )
	{	
		newWorldState[y] = [];
		_(xLen).times(function( x )
		{	
			newWorldState[y][x] = []
			neighbours = checkNeighbour( y, x, worldState );
			if ( neighbours === 3 ) console.log( '3' );

			if( worldState[y][x] === 1 ) 
			{	
				if ( neighbours < 2 || neighbours > 3 ) 
				{
					newWorldState[y][x] = 0;
				} else {
					newWorldState[y][x]= 1;
				}
			}
			else
			{
				if ( neighbours === 3 ) 
				{
					newWorldState[y][x] = 1;
				} else {
					newWorldState[y][x] = 0;
				}
			}
		});		
	});

	_.each( newWorldState, function( element, index ) {
		console.log(
	    'Element: ' + element + ', ' +
	    'Index: ' + index )
	});
	console.log( '\n' );
	return newWorldState;
};

function checkNeighbour( keyY, keyX, worldState ) 
{
	var cnt = 0;
	var dy = dx = 0;
	var diffY = diffX = -1;
	var yLen = worldState.length;
	var xLen = worldState[0].length;

	for( var diffY = -1; diffY < 2; diffY += 1 ) 
	{
		// check if key out of the array range
		dy = keyY + diffY;
		if ( _.isUndefined(worldState[dy]) ) continue;

		for( var diffX = -1; diffX < 2; diffX += 1 ) 
		{
			dx = keyX + diffX;

			// check if key out of the array range,
			// dead or it has keY, keyX
			if ( _.isUndefined(worldState[dy][dx]) || (diffX == 0 && diffY == 0 )) continue;
			if ( !( worldState[dy][dx] == 0 )) cnt++;
		}
	}
	console.log( cnt )
	return cnt;
}

function updateView( worldState ) 
{	
	var alive = '<td class="alive"></td>';
	var dead = '<td></td>';
	var close = '</tr>';
	var open = '<tr>';
	var html = '';

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

main();
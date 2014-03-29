(function() {
	var width = 30;
	var height = 20;
	var timeout = 1000;
	var domElem = $( '#world' );
	var clearElem = 'tr';

	function main() 
	{
		function loop() 
		{
			var model = updateData( width, height );
			var view = updateView( model );

			// draw new generation
			draw( domElem, clearElem, view );
		};

		setInterval( loop, timeout );		
	};

	// input OBJECT, STRING, STRING => WORLD
	// domTarget to animate one generation state
	// removeHtml elements to clear from DOM
	// drawHtml html to darw generation
	function draw( domTarget, removeHtml, drawHtml )
	{
		 if( domTarget.has( removeHtml )) 
			{ domElem.find( removeHtml ).remove(); }

		 domTarget.find( 'tbody' ).append( drawHtml );
	}

	// number, number => array
	// input: two numbers
	// output: array which represent world

	// yDimension - size of the first array
	// represents HEIGHT
	// xDimension - size of the nested array
	// represents WIDTH
	function updateData( xDimension, yDimension )
	{
		var cell;
		var worldState = [];

		_(yDimension).times(function( i ) 
		{
			worldState[i] = [];
			_(xDimension).times(function( j ) 
			{
				cell = Math.floor(Math.random() * 2);
				worldState[i][j] = [];
				worldState[i][j].push( cell );		
			});
		});

		return worldState;
	};


	// array => string
	// input: multidimensional array
	// output: string contain html
	// for every new genereation
	function updateView( worldState ) 
	{	
		var cellAlive = '<td class="alive"></td>';
		var cellDead = '<td></td>';
		var trClose = '</tr>';
		var trOpen = '<tr>';
		var html = '';

		_.each( worldState, function( element ) 
		{ 
		   	html += trOpen;

		    _.each( element, function( subEl ) 
		    {
		        if ( subEl == 1 ) {
		          html += cellAlive;
		        } else {
		          html += cellDead;	          
		        };
		    });
	  		html += trClose; 
		});

		return html;
	}

	main();
})();
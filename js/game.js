// Contents
// 1. Grid
// 2. Display

// TODO:
// 1. refacktor
// 2. Refuck ui building
// 3. add canvas
// 4. function to detect stable generations or dead worlds

function makeGrid( width, height, isRandom ) {
    var grid = [];

    for ( var y = 0; y < height; y++ ) {
        var gridLine = [];
        for( var x = 0; x < width; x++ ) {
            var cell = isRandom ?  Math.random() < 0.3 : false;
            gridLine.push( cell ) ;
        }
        grid.push( gridLine );
    }
    return grid;
}

function nextGen( grid ) {
    var newGrid = [];

    for ( var y = 0; y < grid.length; y++ ) {
        var line = grid[y], gridLine = [];
        for( var x = 0; x < line.length; x++ ) {
            var neighborsCnt = countNeighbors( x, y, grid );
            var cell = isAlive( neighborsCnt, line[x] );
            gridLine.push( cell );
        }
        newGrid.push( gridLine );
    }
    return newGrid;
}

function countNeighbors( x, y, grid ) {
    var cnt = 0;
    var dy = y - 1;

    for ( var i = 0; i < 3; i++, dy++ ) {
        var line = grid[dy], dx = x - 1;
        if ( !line ) continue;
        for( var j = 0; j < 3; j++, dx++ )
            if( ( dx !== x || dy !== y ) && line[dx] ) cnt++;
    }
    return cnt;
}

function isAlive( neighbors, cell ) {
    var status;
    if ( cell )
        status = ( neighbors === 2 || neighbors === 3 );
    else
        status = ( neighbors === 3 );
    return status;
}

function isStable() {

}

// Display
function element( tagName, className ) {
    var element = document.createElement( tagName );
    if ( className ) element.className = className;
    return element;
}

function drawFrame( parent, grid ) {
    var wrap = parent;
    var gridTable = element( 'table' );

    grid.forEach( function( gridLine ) {
        var tableRow = element( 'tr' );
        gridTable.appendChild( tableRow );

        gridLine.forEach( function( cell ) {
            var className = cell ? 'alive' : '';
            tableRow.appendChild( element( 'td', className ) );
        })
    });
    wrap.appendChild( gridTable );
}

function clearFrame( parent ) {
    return parent.innerHTML = '';
}

function runAnimation( frameFunc ) {
    // !!! HARDCODE - default fps = 30
    var fpsInterval = 1000 / 30;
    var now, deltaTime, then = Date.now();
    var stop = false;

    function frame() {
        now = Date.now();
        deltaTime = now - then;

        if ( deltaTime > fpsInterval ) {
            stop = frameFunc() === false;
            then = now - ( deltaTime % fpsInterval );
        }
        if( !stop )
        requestAnimationFrame( frame );
    }
    requestAnimationFrame( frame );
}

function runGame( grid ) {
    var grid = grid || makeGrid( 50, 50 );
    var pause = true;
    // control elements
    var examplesUL = document.getElementById( 'example-list' ),
        randomBtn = document.getElementById( 'createRandom' ),
        pauseBtn = document.getElementById( 'pause' ),
        gameEl = document.getElementById( 'game' );

    // build examples list
    var examplesKeys = Object.keys( examplesList );
    examplesKeys.forEach( function( name ) {
        var li = element( 'li' );
        li.textContent = name;
        li.setAttribute( 'data-name', name );
        examplesUL.appendChild( li );
    });

    function togglePause() {
        pause = !pause;
        pauseBtn.textContent = pause ? 'Play' : 'Pause';
        if ( !pause ) runAnimation( loop );
    }

    function createRandom() {
        var width = document.getElementById( 'width' ).value;
        var height = document.getElementById( 'height' ).value;

        if ( !pause ) togglePause();
        grid = makeGrid( width, height, true );
        clearFrame( gameEl );
        drawFrame( gameEl, grid );
    }

    pauseBtn.addEventListener( 'click', togglePause );
    randomBtn.addEventListener( 'click', createRandom );

    examplesUL.addEventListener( 'click', function(e) {
        if ( e.target.tagName === 'LI' ) {
            if ( !pause ) togglePause();
            grid = examplesList[e.target.getAttribute( 'data-name' )];
            clearFrame( gameEl );
            drawFrame( gameEl, grid );
        }
    });

    function loop() {
        clearFrame( gameEl );
        drawFrame( gameEl, grid );
        grid = nextGen( grid );
        if ( pause ) return false;
    }
    runAnimation( loop );
}

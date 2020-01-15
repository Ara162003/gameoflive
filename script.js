 var matrix = [];
 var w = 30;
 var h  = 30;
 var side = 25;
 let grassArr = []; 
 let grasseaterArr = [];
 let grasspredatorArr = [];
 let necklaceArr = [];
 let dogArr = [];
 
 
 function setup() {
    for(var i = 0; i < w; i++){ 
        matrix[i] = [];
        for(var j = 0; j < h; j++){
            matrix[i][j] = Math.floor(random(6));
        createCanvas(matrix[0].length*side,matrix.length*side);
        }
    }
    frameRate(5);
    background('#acacac');
    for(var y = 0; y < matrix.length; ++y){
        for(var x = 0; x < matrix[y].length; ++x){
            if(matrix[y][x] == 1){
                var gr = new Grass(x,y,1);
                grassArr.push(gr);
            }
            else if(matrix[y][x] == 2){
                var ge = new GrassEater(x,y,2);
                grasseaterArr.push(ge);
            }
            else if(matrix[y][x] == 3){
                var pr = new Predator(x,y,3)
                grasspredatorArr.push(pr);
            }
            else if(matrix[y][x] == 4){
                var ne = new Necklace(x,y,4)
                necklaceArr.push(ne);
            }
            else if(matrix[y][x] == 5){
                var dog = new Dog(x,y,5)
                dogArr.push(dog);
            }
        }
     }
     
 }

 function draw() {

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {  
            if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            } 
            else if (matrix[y][x] == 1) {
               fill("green");
               rect(x * side, y * side, side, side);
            }  
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("purple");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("brown");
                rect(x * side, y * side, side, side);
            }

        }
    }
    for(var i in grassArr){
        grassArr[i].mul();
    }
    for(var i in grasseaterArr){
        grasseaterArr[i].move();
        grasseaterArr[i].eat();
        grasseaterArr[i].mul();
        grasseaterArr[i].die();
    }
    for(var i in grasspredatorArr){
        grasspredatorArr[i].move();
        grasspredatorArr[i].eat();
        grasspredatorArr[i].mul();
        grasspredatorArr[i].die();
    }
    for(var i in necklaceArr){
        necklaceArr[i].move();
        necklaceArr[i].mul();
        necklaceArr[i].eat();
        necklaceArr[i].die();
    }
    for(var i in dogArr){
        dogArr[i].move();
        dogArr[i].eat();
        dogArr[i].mul();
        dogArr[i].die();
        
    }
 }
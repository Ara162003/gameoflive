class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }
    chooseCell(character) {
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        console.log(newCell, this.multiply);
        if (this.multiply >= 8 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.multiply = 0;
        }
    }


}

class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 9;
        this.index = index;
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            this.energy--;
        }
    }
    eat() {
        var emptyCells = this.chooseCell(1);
        var Grass = random(emptyCells);

        if (Grass) {
            var newX = Grass[0];
            var newY = Grass[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.x = newX;
            this.y = newY;
            this.energy += 2;
        }
    }

    mul() {
        this.energy++;
        var newCell = random(this.chooseCell(0));

        if (this.energy >= 10 && newCell) {
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            grasseaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 5;
        }
    }

    die() {
        this.energy--;
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in grasseaterArr) {
                if (this.x === grasseaterArr[i].x && this.y === grasseaterArr[i].y) {
                    grasseaterArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}
class Predator {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.index = index;
        this.directions = [];
    }
    getNewCoordinatesPredator() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character,character1) {
        this.getNewCoordinatesPredator();
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character || matrix[y][x] == character1) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    chooseCell2(character,character2) {
        this.getNewCoordinatesPredator();
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character || matrix[y][x] == character2) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    chooseCell3(character) {
        this.getNewCoordinatesPredator();
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var emptyCells = this.chooseCell(0,1);
        var newCell = random(emptyCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;
            if(newCell == 0){
                matrix[this.y][this.x] = 0;
            }
            else{
                matrix[this.y][this.x] = 1;
            }
            this.x = newX;
            this.y = newY;
            this.energy--;
        }
    }
    eat() {
        var emptyCells = this.chooseCell2(2,4);
        var GrassEater = random(emptyCells);


        if (GrassEater) {
            var newX = GrassEater[0];
            var newY = GrassEater[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;

            for (var i in grasseaterArr) {
                if (newX == grasseaterArr[i].x && newY == grasseaterArr[i].y) {
                    grasseaterArr.splice(i, 1);
                    break;
                }
            }
            for (var i in necklaceArr) {
                if (newX == necklaceArr[i].x && newY == necklaceArr[i].y) {
                    necklaceArr.splice(i, 1);
                    break;
                }
            }
            this.x = newX;
            this.y = newY;
            this.energy += 2;
        }
        
    }
    mul() {
        this.energy++;
        var newCell = random(this.chooseCell3(0));

        if (this.energy >= 10 && newCell) {
            var newPredator = new Predator(newCell[0], newCell[1], this.index);
            grasspredatorArr.push(newPredator);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 8;
        }
    }
    die(){
        this.energy--;
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in grasspredatorArr) {
                if (this.x === grasspredatorArr[i].x && this.y === grasspredatorArr[i].y) {
                   grasspredatorArr.splice(i, 1);
                   break;
                }
            }
        }

    }
}

class Necklace {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 7;
        this.index = index;
        this.directions = [];
    }
    getNewCoordinatesNecklace() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }
    chooseCell(character,character1) {
        this.getNewCoordinatesNecklace();
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character || matrix[y][x] == character1) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    chooseCell2(character) {
        this.getNewCoordinatesNecklace();
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var emptyCells = this.chooseCell(0,1);
        var newCell = random(emptyCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;
            if(newCell == 0){
                matrix[this.y][this.x] = 0;
            }
            else{
                matrix[this.y][this.x] = 1;
            }
            this.x = newX;
            this.y = newY;
            this.energy--;
        }
    }
    eat() {
        var emptyCells = this.chooseCell2(2);
        var GrassEater = random(emptyCells);


        if(GrassEater) {
            var newX = GrassEater[0];
            var newY = GrassEater[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;
            

            for (var i in grasseaterArr) {
                if (newX == grasseaterArr[i].x && newY == grasseaterArr[i].y) {
                    grasseaterArr.splice(i, 1);
                    break;
                }
            }
            this.x = newX;
            this.y = newY;
            this.energy+=2;
            console.log(this.energy);
        }

    }   
    mul() {
        this.energy++;
        var newCell = random(this.chooseCell2(0));

        if (this.energy >= 8 && newCell) {
            var newNecklace = new Necklace(newCell[0], newCell[1], this.index);
            var newNecklace1 = new Necklace(newCell[0], newCell[1], this.index);
            necklaceArr.push(newNecklace,newNecklace1);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 5;
        }
    }
    die(){
        this.energy--;
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in necklaceArr) {
                if (this.x === necklaceArr[i].x && this.y === necklaceArr[i].y) {
                   necklaceArr.splice(i, 1);
                   break;
                }
            }
        }
    }
}

class Dog{
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 10;
        this.index = index;
        this.directions = [];
}
    getNewCoordinatesDog() {
        this.directions = [
            [this.x, this.y - 2],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x, this.y + 2]
        ];
    }
    chooseCell(character,character1) {
        this.getNewCoordinatesDog();
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character || matrix[y][x] == character1) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    chooseCell2(character,character1) {
        this.getNewCoordinatesDog();
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character || matrix[y][x] == character1) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var emptyCells = this.chooseCell(0,1);
        var newCell = random(emptyCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;
            if(newCell == 0){
                matrix[this.y][this.x] = 0;
            }
            else{
                matrix[this.y][this.x] = 1;
            }
            this.x = newX;
            this.y = newY;
            this.energy--;
        }
    }
    eat(){
        var emptyCells = this.chooseCell2(3,4);
        var GrassEater = random(emptyCells);


        if(GrassEater) {
            var newX = GrassEater[0];
            var newY = GrassEater[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;
            

            for (var i in grasspredatorArr) {
                if (newX == grasspredatorArr[i].x && newY == grasspredatorArr[i].y) {
                    grasspredatorArr.splice(i, 1);
                    break;
                }
            }
            for (var i in necklaceArr) {
                if (newX == necklaceArr[i].x && newY == necklaceArr[i].y) {
                    necklaceArr.splice(i, 1);
                    break;
                }
            }
            this.x = newX;
            this.y = newY;
            this.energy+=2;
        }
    }

    mul() {
        this.energy++;
        var newCell = random(this.chooseCell(0,1));

        if (this.energy >= 12 && newCell) {
            var newDog = new Dog(newCell[0], newCell[1], this.index);
            var newDog1 = new Dog(newCell[0], newCell[1], this.index);
            var newDog2 = new Dog(newCell[0], newCell[1], this.index);
            necklaceArr.push(newDog,newDog1,newDog2);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 10;
        }
    }

    die(){
        this.energy--;
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in dogArr) {
                if (this.x === dogArr[i].x && this.y === dogArr[i].y) {
                   dogArr.splice(i, 1);
                   break;
                }
            }
        }
    }
}
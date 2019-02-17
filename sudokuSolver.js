// JavaScript Document

function indexOfSmallest(a) {
    return a.indexOf(Math.min.apply(Math, a));
   }
   
   class treeNode{
      constructor(field, possibilities, isRoot, randomCell, chooseRandom){
        this.field = JSON.parse(JSON.stringify(field));
        this.possibilities = JSON.parse(JSON.stringify(possibilities));
        
        this.isRoot = isRoot;
        this.randomCell = -1;
        this.randomPossibility = -1;

        if(chooseRandom === true){
          if (randomCell < 0){
           this.randomCell = this.chooseRandomCell();
          }
          else{
            this.randomCell = randomCell;
          }

          this.randomPossibility = this.chooseRandomPossibilities();
          this.setField();
        }
      }
     
   
     
     chooseRandomCell(){
       var sumPossibilities = [];
       for(var i = 0; i<81; i++){
         var counter = 0;
         for(var j = 0; j<this.possibilities[i].length;j++){
           if(this.possibilities[i][j] !== 0){
             counter++;
           }
         }
         if(counter === 0){
           counter = 10;
         }
           sumPossibilities.push(counter);
         
       }
       var chosenCell = indexOfSmallest(sumPossibilities);
       return chosenCell;
     }
     
     chooseRandomPossibilities(){
       var indecesPossibilities = [];
       var targetPossibilities = this.possibilities[this.randomCell];
       for(var i = 0 ; i< 9; i++){
         if(targetPossibilities[i] !== 0){
           indecesPossibilities.push(i+1);
         }
       }

       
       var chosenPossibility = indecesPossibilities[Math.floor(Math.random()*indecesPossibilities.length)];

       return chosenPossibility;
     }
     setField(){
        this.field[this.randomCell] = this.randomPossibility;
        this.possibilities[this.randomCell] = [0,0,0,0,0,0,0,0,0];

        var arr = placeNumbers(this.field, this.possibilities);
        
        this.field = arr[0];
        this.possibilities = arr[1];
     }
     
   }
   
   Array.prototype.equals = function (array) {
       return this.length === array.length &&
           this.every(function (this_i, i) {
               return this_i === array[i];
           });
   };
   
   function countNotZeros(possibilities) {
       var counter = 0;
       var position = 0;
       for (var i = 0; i < possibilities.length; i++) {
           if (possibilities[i] !== 0) {
               counter++;
               position = i;
   
           }
   
   
       }
       if (counter === 1) {
           return [counter, position];
       }
       return [counter, -1];
   }
   
   function countZeros(field) {
       var counter = 0;
       var position = 0;
       for (var i = 0; i < field.length; i++) {
   
           if (field[i] === 0) {
   
               counter++;
               position = i;
           }
   
       }
       if (counter === 1) {
           return [counter, position];
       }
       return [counter, -1];
   
   }
   
   
   function checkRowsCorrect(rows, possibilities) {
       for (var i = 0; i < 9; i++) {
       var numberRow = [0,0,0,0,0,0,0,0,0,0];
           for (var j = 0; j < 9; j++) {
                numberRow[rows[i][j]]++;
           }
       for(var j = 1; j<10; j++){
         if (numberRow[j] > 1){
            return false;
         }
       }
   
       for (var j = 0; j<9; j++){
         if (possibilities[i*9 + j].equals([0,0,0,0,0,0,0,0,0]) && rows[i][j] === 0){
            return false;
         }
       }
       }
     return true;
   }
       // Checks whether a Row obeys Sudoku's rules
   
   function checkColumnsCorrect(columns, possibilities) {
       for (var i = 0; i < 9; i++) {
       var numberColumn = [0,0,0,0,0,0,0,0,0,0];
           for (var j = 0; j < 9; j++) {
               numberColumn[columns[i][j]]++;
           }
       for(var j = 1; j<10; j++){
         if (numberColumn[j] > 1){
            return false;
         }
       }
       for (var j = 0; j<9; j++){
         if (possibilities[i + j*9].equals([0,0,0,0,0,0,0,0,0]) && columns[i][j] === 0){
            return false;
         }
       }
     }
     return true;
   }
       // Checks whether a Column obeys Sudoku's rules
   
   function checkBlocksCorrect(blocks, possibilities){
     for(var i = 0; i<3; i++){
       for(var j = 0; j<3; j++){
          var numberBlock = [0,0,0,0,0,0,0,0,0,0];
          for(var k = 0; k<9; k++){
            numberBlock[blocks[i*3 + j][k]]++;
          }
         for(var k = 1; k<10; k++){
           if(numberBlock[k] > 1){
                return false;
           } 
         }
         for(var k = 0; k<3; k++){
           for(var l = 0;l<3;l++){
             if(possibilities[i*27 + j*3+ k*9 + l].equals([0,0,0,0,0,0,0,0,0]) && blocks[i*3 + j][k*3+ l] === 0){
                return false;
           }
           }
           
         }
       }
     }
     return true;
   }
   
   function checkRows(rows, possibilities) {
       for (var i = 0; i < 9; i++) {
           for (var j = 1; j < 10; j++) {
               if (rows[i].includes(j)) {
                   for (var k = 0; k < 9; k++) {
                       if (possibilities[k + i * 9].length >= 1) {
                           possibilities[k + i * 9][j - 1] = 0;
   
                       }
   
                   }
   
               }
           }
       }
       // Iterates over every row and checks whether a number between 1 and 9 is in it. It then sets every possibility of this number in this row to zero if it's not a final number already
       return possibilities;
   }
   
   function checkColumns(columns, possibilities) {
       for (var i = 0; i < 9; i++) {
           for (var j = 1; j < 10; j++) {
               if (columns[i].includes(j)) {
                   for (var k = 0; k < 9; k++) {
                       if (possibilities[k * 9 + i].length >= 1) {
                           possibilities[k * 9 + i][j - 1] = 0;
   
                       }
   
                   }
   
               }
           }
       }
       // Iterates over every column and checks whether a number between 1 and 9 is in it. It then sets every possibility of this number in this column to zero if it's not a final number already
       return possibilities;
   }
   
   function checkBlocks(blocks, possibilities) {
       for (var i = 0; i < 3; i++) {
           for (var j = 0; j < 3; j++) {
               for (var k = 1; k < 10; k++) {
                   if (blocks[i * 3 + j].includes(k)) {
                       for (var l = 0; l < 3; l++) {
                           for (var m = 0; m < 3; m++) {
                               if (possibilities[i * 27 + j * 3 + l * 9 + m].length > 1) {
                                   possibilities[i * 27 + j * 3 + l * 9 + m][k - 1] = 0;
   
                               }
   
                           }
   
   
                       }
   
   
                   }
   
               }
   
           }
   
       }
       return possibilities;
   
   }
   
   function checkRowBlocks(possibilities) {
   
       for (var h = 0; h < 9; h++) {
           for (var i = 0; i < 3; i++) {
               for (var j = 0; j < 3; j++) {
   
                   var tempCache = [];
                   var rowsWithSpace = 0;
                   var rowsFilled = 0;
                   var posRowWithSpace = 0;
   
                   for (var k = 0; k < 3; k++) {
                       for (var l = 0; l < 3; l++) {
                           if (possibilities[i * 27 + j * 3 + k * 9 + l].length > 1) {
                               if (possibilities[i * 27 + j * 3 + k * 9 + l][h] === h + 1) {
                                   rowsFilled++;
                                   break;
                               }
   
                           }
   
                       }
                       if (rowsFilled > 0) {
                           rowsWithSpace++;
                           posRowWithSpace = k;
   
                       }
   
   
                   }
                   if (rowsWithSpace === 1) {
                       tempCache = [];
                       if (possibilities[i * 27 + j * 3 + posRowWithSpace * 9].length > 1) {
                           tempCache.push(possibilities[i * 27 + j * 3 + posRowWithSpace * 9][h]);
   
   
                       } else {
                           tempCache.push(0);
                       }
                       if (possibilities[i * 27 + j * 3 + posRowWithSpace * 9 + 1].length > 1) {
                           tempCache.push(possibilities[i * 27 + j * 3 + posRowWithSpace * 9 + 1][h]);
   
                       } else {
                           tempCache.push(0);
   
                       }
                       if (possibilities[i * 27 + j * 3 + posRowWithSpace * 9 + 2].length > 1) {
                           tempCache.push(possibilities[i * 27 + j * 3 + posRowWithSpace * 9 + 2][h]);
   
                       } else {
                           tempCache.push(0);
                       }
                       for (var l = 0; l < 9; l++) {
                           if (possibilities[i * 27 + posRowWithSpace * 9 + l].length > 1) {
                               possibilities[i * 27 + posRowWithSpace * 9 + l][h] = 0;
                           }
   
   
                       }
                       if (possibilities[i * 27 + j * 3 + posRowWithSpace * 9].length > 1) {
                           possibilities[i * 27 + j * 3 + posRowWithSpace * 9][h] = tempCache[0];
   
                       }
                       if (possibilities[i * 27 + j * 3 + posRowWithSpace * 9 + 1].length > 1) {
                           possibilities[i * 27 + j * 3 + posRowWithSpace * 9 + 1][h] = tempCache[1];
   
                       }
                       if (possibilities[i * 27 + j * 3 + posRowWithSpace * 9 + 2].length > 2) {
                           possibilities[i * 27 + j * 3 + posRowWithSpace * 9 + 2][h] = tempCache[2];
   
                       }
                   }
               }
   
           }
   
       }
       return possibilities;
   
   }
   
   // checkColumnBlock
   function checkColumnBlocks(possibilities) {
   
       for (var h = 0; h < 9; h++) {
           for (var i = 0; i < 3; i++) {
               for (var j = 0; j < 3; j++) {
   
                   var tempCache = [];
                   var columnsWithSpace = 0;
                   var columnsFilled = 0;
                   var posColWithSpace = 0;
   
                   for (var k = 0; k < 3; k++) {
                       for (var l = 0; l < 3; l++) {
                           if (possibilities[i * 27 + j * 3 + k  + l*9].length > 1) {
                               if (possibilities[i * 27 + j * 3 + k  + l*9][h] === h + 1) {
                                   columnsFilled++;
                                   break;
                               }
   
                           }
   
                       }
                       if (columnsFilled > 0) {
                           columnsWithSpace++;
                           posColWithSpace = k;
   
                       }
   
   
                   }
                   if (columnsWithSpace === 1) {
                       tempCache = [];
                       if (possibilities[i * 27 + j * 3 + posColWithSpace].length > 1) {
                           tempCache.push(possibilities[i * 27 + j * 3 + posColWithSpace][h]);
   
   
                       } else {
                           tempCache.push(0);
                       }
                       if (possibilities[i * 27 + j * 3 + posColWithSpace + 9].length > 1) {
                           tempCache.push(possibilities[i * 27 + j * 3 + posColWithSpace + 9][h]);
   
                       } else {
                           tempCache.push(0);
   
                       }
                       if (possibilities[i * 27 + j * 3 + posColWithSpace + 18].length > 1) {
                           tempCache.push(possibilities[i * 27 + j * 3 + posColWithSpace + 18][h]);
   
                       } else {
                           tempCache.push(0);
                       }
                       for (var l = 0; l < 9; l++) {
                           if (possibilities[j*3 + posColWithSpace  + l*9].length > 1) {
                               possibilities[j*3 + posColWithSpace  + l*9][h] = 0;
                           }
   
   
                       }
                       if (possibilities[i * 27 + j * 3 + posColWithSpace].length > 1) {
                           possibilities[i * 27 + j * 3 + posColWithSpace][h] = tempCache[0];
   
                       }
                       if (possibilities[i * 27 + j * 3 + posColWithSpace + 9].length > 1) {
                           possibilities[i * 27 + j * 3 + posColWithSpace + 9][h] = tempCache[1];
   
                       }
                       if (possibilities[i * 27 + j * 3 + posColWithSpace + 18].length > 2) {
                           possibilities[i * 27 + j * 3 + posColWithSpace + 18][h] = tempCache[2];
   
                       }
                   }
               }
   
           }
   
       }
       return possibilities;
   
   }
   
   
   function getRowColumnBlock(field){
       var rows = new Array(9);
       var columns = new Array(9);
       var blocks = new Array(9);
         for (var i = 0; i < 9; i++) {
           rows[i] = field.slice(i*9,(i+1)*9);
   
   
       }
       // Creates Array of Rows for later Processing
       for (var i = 0; i < 9; i++) {
           columns[i] = [field[i], field[i + 9], field[i + 18], field[i + 27],field[i + 36], field[i + 45], field[i + 54], field[i + 63], field[i + 72]];
   
       }
       // Creates Array of columns for later Processing
   
       for (var i = 0; i < 3; i++) {
           for (var j = 0; j < 3; j++) {
               blocks[i * 3 + j] = [field[j * 3 + i * 27], field[j * 3 + i * 27 + 1], field[j * 3 + i * 27 + 2], field[i * 27 + j * 3 + 9], field[i * 27 + j * 3 + 10], field[i * 27 + j * 3 + 11], field[i * 27 + j * 3 + 18], field[i * 27 + j * 3 + 19], field[i * 27 + j * 3 + 20]];
   
           }
       }
     return [rows,columns,blocks];
   }
   
   function checkField(field,possibilities){
    var rCB = getRowColumnBlock(field);
    var rows = rCB[0];
    var columns = rCB[1];
    var blocks = rCB[2];
     
    if(checkRowsCorrect(rows, JSON.parse(JSON.stringify(possibilities))) && checkColumnsCorrect(columns, JSON.parse(JSON.stringify(possibilities))) && checkBlocksCorrect(blocks, JSON.parse(JSON.stringify(possibilities)))){
        return true;
    }

    return false;
   }
   
   function solveSudoku(field,possibilities) {
    var rCB = getRowColumnBlock(field);
    var rows = rCB[0];
    var columns = rCB[1];
    var blocks = rCB[2];
     
    possibilities = checkRows(rows, possibilities);
    possibilities = checkColumns(columns, possibilities);
    possibilities = checkBlocks(blocks, possibilities);
    possibilities = checkRowBlocks(possibilities);
    possibilities = checkColumnBlocks(possibilities);

       return possibilities;
   
   }
   
   function placeNumbers(unslicedField, unslicedPossibilities) {
       var field = JSON.parse(JSON.stringify(unslicedField));
       var possibilities = JSON.parse(JSON.stringify(unslicedPossibilities));
        var counter = 0;
        var beforeHand = field;
        while(counter < 10){
            var possibilities = solveSudoku(field, possibilities);
            for (var h = 0; h < 3; h++) {
                for(var i = 0; i<3; i++){
                    for(var j = 0; j<3; j++){
                        for(var k = 0; k<3; k++){
                            if (countNotZeros(possibilities[h*27+i*3+j*9+k])[0] === 1) {
                                var chosenPossibility = possibilities[h*27+i*3+j*9+k][countNotZeros(possibilities[h*27+i*3+j*9+k])[1]];
                                field[h*27+i*3+j*9+k] = chosenPossibility;
                                possibilities[h*27+i*3+j*9+k] = [0,0,0,0,0,0,0,0,0];
                                for(var l = 0; l<3; l++){
                                    for(var m = 0; m<3; m++){
                                        possibilities[h*27+i*3+l*9+m][chosenPossibility-1] = 0;
                                    }
                                }
                                for(var l = 0 ;l<9;l++){
                                    possibilities[i*3+k+l*9][chosenPossibility-1] = 0;
                                    possibilities[h*27+j*9+l][chosenPossibility-1] = 0;
                                }
                                
                            }
                        }
                    }
                }
                
            }
            if (field.equals(beforeHand)){
                counter++;
            }
            else{
                counter = 0;
            }
            beforeHand = field;
        }

       return [field,possibilities];
   
   }
   
   function initiateField(){
       
     var field = new Array(81);
     var possibilities = new Array(81);
     
       for (var i = 0; i < 81; i++) {
           if (document.getElementById('sudokuBlock' + String(i)).value.toString().length === 1 && document.getElementById('sudokuBlock' + String(i)).value !== null) {
               field[i] = parseInt(document.getElementById('sudokuBlock' + String(i)).value.toString());
           } else {
               field[i] = 0;
           }
   
       }
     
     for (var i = 0; i < 81; i++) {
           if (field[i] === 0) {
               possibilities[i] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
           } else {
               possibilities[i] = [0,0,0,0,0,0,0,0,0];
           }
       }
     return [field,possibilities];
     
   }
   
function solveWithCrooks(uninitField,uninitPossibilities){
    var nodeArray = [];

    var startArr = placeNumbers(uninitField, uninitPossibilities);
  
    var field = startArr[0];
    var possibilities = startArr[1];
    var tempIndex = -1;
    nodeArray.push(new treeNode(field, possibilities, true, -1, false));

    while(countZeros(nodeArray[nodeArray.length -1].field)[0] > 0 || (!(countZeros(nodeArray[nodeArray.length -1].field)[0] > 0) && checkField(nodeArray[nodeArray.length -1].field,nodeArray[nodeArray.length -1].possibilities) !== true)){  
        if(checkField(nodeArray[nodeArray.length -1].field,nodeArray[nodeArray.length -1].possibilities) === false){
                if(nodeArray.length === 1){
                    break;
                }
                else{
                    var lengthError = false;

                    var tempPossibility = 0;

                    while(checkField(nodeArray[nodeArray.length -1].field,nodeArray[nodeArray.length -1].possibilities) === false){
                            
                            tempIndex = nodeArray[nodeArray.length -1].randomCell;
                            tempPossibility = nodeArray[nodeArray.length -1].randomPossibility;
                            //Delete last item until the field is working again
                            if(nodeArray.length === 1){
                                lengthError = true;
                                break;
                            }
                            nodeArray.pop();
                            nodeArray[nodeArray.length -1].possibilities[tempIndex][tempPossibility-1] = 0;

                    }

                    var arr = placeNumbers(nodeArray[nodeArray.length -1].field, nodeArray[nodeArray.length -1].possibilities);
                    nodeArray[nodeArray.length -1].field = arr[0];
                    nodeArray[nodeArray.length -1].possibilities = arr[1];
                }

                    if(lengthError === true){
                        break;
                    }
                    if(nodeArray[nodeArray.length -1].field[tempIndex] !== 0){
                        tempIndex = -1;
                    }
                }
                var arr = placeNumbers(nodeArray[nodeArray.length -1].field, nodeArray[nodeArray.length -1].possibilities);
                nodeArray[nodeArray.length -1].field = arr[0];
                nodeArray[nodeArray.length -1].possibilities = arr[1];
                if(!((countZeros(nodeArray[nodeArray.length -1].field)[0] > 0 || (!(countZeros(nodeArray[nodeArray.length -1].field)[0] > 0) && checkField(nodeArray[nodeArray.length -1].field,nodeArray[nodeArray.length -1].possibilities) !== true)))){
                    break
                }
                nodeArray.push(new treeNode(nodeArray[nodeArray.length -1].field, nodeArray[nodeArray.length -1].possibilities, false, tempIndex, true));
            }

            var returnArr = [nodeArray[nodeArray.length-1].field,nodeArray[nodeArray.length-1].possibilities];
            return returnArr;
        }
   function solveNormal(field,possibilities){
        var arr = placeNumbers(field, possibilities);
        field = arr[0];
        return field;
    
        }

   function start() {
     

    var field = new Array(81);
    var possibilities = new Array(81);
   
     var initiatedField = initiateField();
     
     field = initiatedField[0];
     possibilities = initiatedField[1];
     
     if (document.getElementById("algorithm").innerHTML === "Crook's Algorithm"){
            var arr = solveWithCrooks(field,possibilities);
            field = arr[0];
            possibilities = arr[1];
            for (var i = 0; i < 81; i++) {
                document.getElementById('resultBlock' + i.toString()).innerHTML = field[i].toString();
            }
    }
    else{
        field = solveNormal(field,possibilities);
    }
    for (var i = 0; i < 81; i++) {
        document.getElementById('resultBlock' + i.toString()).innerHTML = field[i].toString();
    }
    if(countZeros(field) === 0){
       document.getElementById("startButton").disabled = true; 
    }
   
   }
   function algorithm(){
       if (document.getElementById("algorithm").innerHTML === "Crook's Algorithm"){
           document.getElementById("algorithm").innerHTML = "Normal Algorithm";
       }
       else{
        document.getElementById("algorithm").innerHTML = "Crook's Algorithm";
       }
   }
    function clearForm(){
       for(var i = 0; i<81;i++){
        document.getElementById("sudokuBlock" +i.toString()).value = null;
       }
       document.getElementById("startButton").disabled = false;
     
   }
    function clearSolution(){
       for(var i = 0; i<81;i++){
           document.getElementById("resultBlock" + i.toString()).innerHTML = "0";
       }
       document.getElementById("startButton").disabled = false;
   }
    function setButtonEnabled(){
       document.getElementById("startButton").disabled = false;
   }
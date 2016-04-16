// Implement a function that performs a Bubble Sort on an array.

function bubbleSort (input) {
  var sorted=false;
  
  while(!sorted){
    sorted = true;
    
      for (var i=0; i<input.length-1;i++){
        if (input[i] > input[i+1]){
            var temp;
            temp = input[i];
            input[i] = input[i+1];
            input[i+1] = temp;
            sorted = false;
        }
    }
  }
  return input
}
// For a given positive integer, convert it into its English representation and log it to the console. 

var integers = {
  0 : 'zero',
  1 : 'one',
  2 : 'two',
  3 : 'three',
  4 : 'four',
  5 : 'five',
  6 : 'six',
  7 : 'seven',
  8 : 'eight',
  9 : 'nine'
};

var tens = {
  10 : 'ten',
  11 : 'eleven',
  12 : 'twelve',
  13 : 'thirteen',
  14 : 'fourteen',
  15 : 'fifteen',
  16 : 'sixteen',
  17 : 'seventeen',
  18 : 'eighteen',
  19 : 'nineteen',
  20 : 'twenty',
  30 : 'thirty',
  40 : 'forty',
  50 : 'fifty',
  60 : 'sixty',
  70 : 'seventy',
  80 : 'eighty',
  90 : 'ninety'
};

var orders = {
  100 : 'hundred',
  1000 : 'thousand',
  1000000 : 'million',
  1000000000 : 'billion',
  1000000000000 : 'trillion',
  1000000000000000 : 'quadrillion'
};

function intToEnglish(number){
  var finalString = '';
  var numArray = number.toString().split('');

  //handle single digit integers
  if (numArray.length === 1){
    setSingleDigit(numArray[0]);
    trimEnd();
    return finalString;
  } 
  //handle numbers 10 - 99
  else if (numArray.length === 2){
    setTwoDigit(numArray);
    trimEnd();
    return finalString;
  } 
  //hanlde numbers 100 - 999
  else if (numArray.length === 3){
    setThreeDigit(numArray);
    trimEnd();
    return finalString;
  }
  //handle all other numbers
  else {
    setLargeNumber(numArray);
    trimEnd();
    return finalString;
  }


  // *** Helper Functions ***

  function setSingleDigit (digit){
    finalString += integers[digit] + ' ';
  }

  function setTwoDigit(array){
    var firstDigit = array[0]; 
    var secondDigit = array[1]
    
    //handle numbers 10-19.
    if (firstDigit === '1'){
      var teen = firstDigit+secondDigit;
      setTeen(teen);
    }
    //handle any other two digit number
    else{
      finalString += tens[firstDigit+'0'] + ' ';
      if (secondDigit !== '0'){
        setSingleDigit(secondDigit);
      }
    }
  }

  function setThreeDigit(array){
    var firstDigit = array[0];
    var secondDigit = array[1];
    var thirdDigit = array[2];
    
    if (firstDigit !== '0'){
      setHundred(firstDigit);
    }

    if (secondDigit !== '0'){
      setTwoDigit([secondDigit, thirdDigit]);
    } else if (thirdDigit !== '0'){
      setSingleDigit(thirdDigit);
    }
  }

  function setLargeNumber(array) {
    var digits = array;

    while (digits.length>=4){
      var magObj = getOrderOfMag(digits);
      
      if (magObj.remainder === 1){
          setTwoDigit([digits[0],digits[1]]);
          finalString += magObj.order + ' ';
          //chop off the first two elements from digits
          digits.shift();
          digits.shift();
      } else if (magObj.remainder === 2){
          setThreeDigit([digits[0], digits[1], digits[2]]);
          if (digits[0] !== '0' || digits[1] !== '0' || digits[2] !== '0'){
            finalString += magObj.order + ' ';
          }
          //chop off the first three elements from digits
          digits.shift();
          digits.shift();
          digits.shift();
      } else {
          setSingleDigit(digits[0]);
          finalString += magObj.order + ' ';
          //chop off first element from digits
          digits.shift();
      }
    }
    //now handle whatever is left.
    setThreeDigit(digits);
  }

  function setTeen(teen){
    finalString += tens[teen] + ' ';
  }

  function setHundred(digit){
    setSingleDigit(digit);
    finalString += 'hundred'+ ' ';
  }

  function getOrderOfMag(array) {
    //i.e. 'thousand', 'trillion', etc.    
    var length = array.length;
    
    if ((length-1)%3 === 0){
       var magString = Math.pow(10, length-1).toString();
    } else {
      var remainder = (length-1)%3;
      var magString = Math.pow(10, length-1-remainder).toString();
    }
    
    var magWord = orders[magString];
    return {order : magWord, remainder : remainder || 0};
  };

  function trimEnd(){
    //Eliminates any trailing spaces. Should be called
    //before returning a final answer.
    if (finalString[finalString.length-1] === ' '){
      finalString = finalString.slice(0,-1);
    }
  }
} 

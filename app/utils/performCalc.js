function accurateCalc(num1, operator, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    if (isNaN(num1) || isNaN(num2)) {
      return Number.NaN;
    }
  
    let strNum1 = num1 + "",
      strNum2 = num2 + "",
      dpNum1 = !!(num1 % 1) ? strNum1.length - strNum1.indexOf(".") - 1 : 0,
      dpNum2 = !!(num2 % 1) ? strNum2.length - strNum2.indexOf(".") - 1 : 0,
      multiplier = Math.pow(10, dpNum1 > dpNum2 ? dpNum1 : dpNum2),
      tempNum1 = Math.round(num1 * multiplier),
      tempNum2 = Math.round(num2 * multiplier),
      result;
  
    switch (operator.trim()) {
      case "+":
        result = (tempNum1 + tempNum2) / multiplier;
        break;
      case "-":
        result = (tempNum1 - tempNum2) / multiplier;
        break;
      case "*":
        result = (tempNum1 * tempNum2) / (multiplier * multiplier);
        break;
      case "/":
        result = tempNum1 / tempNum2;
        break;
      case "%":
        result = (tempNum1 % tempNum2) / multiplier;
        break;
      default:
        result = Number.NaN;
    }
  
    return result;
  }
  
 export const performCalc = (str) => {
     console.log(str);
    const arr = str.split(" ");
  
    if (arr.length === 1) {
      return arr[0];
    }
  
    const multiplyIndex = arr.includes("x") ? arr.indexOf("x") : Infinity;
    const divideIndex = arr.includes("÷") ? arr.indexOf("÷") : Infinity;
  
    if (multiplyIndex !== Infinity || divideIndex !== Infinity) {
      if (multiplyIndex < divideIndex) {
        const multiplication = accurateCalc(arr[multiplyIndex - 1], '*', arr[multiplyIndex + 1])
        arr.splice(multiplyIndex - 1, 3, multiplication.toString());
      } else {
        const division = accurateCalc(arr[divideIndex - 1], '/', arr[divideIndex + 1])
        arr.splice(divideIndex - 1, 3, division.toString());
      }
      return performCalc(arr.join(" "));
    }
  
    const plusIndex = arr.includes("+") ? arr.indexOf("+") : Infinity;
    const subtractIndex = arr.includes("-") ? arr.indexOf("-") : Infinity;
  
    if (plusIndex || subtractIndex) {
      if (plusIndex < subtractIndex) {
        const addition = accurateCalc(arr[plusIndex - 1], '+', arr[plusIndex + 1]) 
        arr.splice(plusIndex - 1, 3, addition.toString());
      } else {
        const subtraction = accurateCalc(arr[subtractIndex - 1], '-', arr[subtractIndex + 1])
        arr.splice(subtractIndex - 1, 3, subtraction.toString());
      }
      return performCalc(arr.join(" "));
    }
  };
  
  
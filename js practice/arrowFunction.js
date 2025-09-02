function Sum(...args){
  let add = 0;
  for(let i of args){
      add += i;
  }
  return add;
}

let arr = [1, 3, 3, 5];

console.log(Sum(...arr));
function forEach(arr, callback){
	for(var i = 0; i < arr.length; i++){
		callback(arr[i]);
	}
}

function map(arr, callback){
	var result = [];
	forEach(arr, function(thing){result.push(callback(thing))});
	return result;
}

function reduce(arr, callback){
	var result = arr[0];
	array = arr.slice(1);
	forEach(array, function(thing){result = callback(result, thing)});
	return result;
}

console.log(reduce([1, 2, 3], function(int1, int2){return int1+int2}));

function filter(arr, callback){
	var result = [];
	forEach(arr, function(thing){
		if(callback(thing)){
			result.push(thing);
		}
	})
	return result;
}
var data =[
	    { title: "Cymbeline", author: "Shakespeare", year: 1623 },
	    { title: "The Tempest", author: "Shakespeare", year: 1623 },
	    { title: "Hamlet", author: "Shakespeare", year: 1603 },
	    { title: "A Midsummer Night's Dream", author: "Shakespeare", year: 1600 },
	    { title: "Macbeth", author: "Shakespeare", year: 1620 },
	    { title: "Death of a Salesman", author: "Arthur Miller", year: 1949 },
	    { title: "Two Blind Mice", author: "Samuel and Bella Spewack", year: 1949 }
	]

// #1

console.assert(pluck(data, 'year')[0] === 1623);
console.assert(pluck(data, 'year')[data.length-1] === 1949);

function pluck(arr, att){
	return map(arr, function(thing){return thing[att]});
}

//#2

console.assert(reject(data, (x) => x.year > 1900).length === 5);
console.assert(reject(data, (x) => x.year > 1900)[3].year === 1600);

function reject(arr, callback){
	return filter(arr, function(thing){return !callback(thing)})
}

// #3

console.assert(find(data, (x) => x.year === 1623) === data[0]);
console.assert(find(data, (x) => x.year === 1623).year === 1623);

function find(arr, callback){
	for(var i = 0; i < arr.length; i++){
		if(callback(arr[i])){
			return arr[i];
		}
	}
}

console.assert(where(data, {author: 'Shakespeare'} === [ { title: 'Cymbeline', author: 'Shakespeare', year: 1623 },
  { title: 'The Tempest', author: 'Shakespeare', year: 1623 },
  { title: 'Hamlet', author: 'Shakespeare', year: 1603 },
  { title: 'A Midsummer Night\'s Dream',
    author: 'Shakespeare',
    year: 1600 },
  { title: 'Macbeth', author: 'Shakespeare', year: 1620 } ]));
console.assert(where(data, {})[0] === data[0]);

function where(arr, obj){
	return filter(arr, function(thing){
		for(var propName in obj){
			if(obj[propName] !== thing[propName]){
				return false;
			}
		}
		return true;
	})
}



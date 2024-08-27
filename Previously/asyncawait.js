async function getName(){
    let name = await 'Ibrohim';
    console.log(name); // async ligini tekwriw ucun
    return name;
}

// getName().then(data => console.log(data));

// async ligini tekwriw ucun
console.log(1);
getName();
console.log(2);
var readlinesync = require('readline-sync');
var fs = require('fs');
const {table} = require('table');

var students = [];
var menu = [
	['1. Show all students'],
	['2. Create a new student'],
	['3. Save & Exit']
];
let bigArr = [];
function loadData() {
	var fileContent = fs.readFileSync('./data.json');
	students = JSON.parse(fileContent);
}


function showMenu() {
	console.log(table(menu));

   	var option = readlinesync.question('> ');
	switch(option) {
		case '1':
			showStudents();
			showMenu();
			break;
		case '2':
			showCreateStudent();
			console.log(bigArr);
			showMenu();
			break;
		case '3':
			saveAndExit();
			break;
		default:
			console.log('Wrong option');
			showMenu();
			break;
	}
}



function showStudents() {
	var arrName = [];
	var arrAge = [];
	
	for (var student of students) {
		// console.log(student.name, student.age);
		//console.log(typeof(students));
		arrName.push(student.name);
		arrAge.push(student.age);		
	}
    // console.log(table(bigArr));
	// console.log(table(students));
	bigArr.push(arrName);
	bigArr.push(arrAge)
	console.log(table(bigArr));	
}

function showCreateStudent() {
	var emptyArr = [];
	var name = readlinesync.question('Name: ');
	var age = readlinesync.question('Age: ');
	var student = {
		name: name,
		age: parseInt(age)
	};

	students.push(student);
}

function saveAndExit() {
	var content = JSON.stringify(students);
	console.log(content);
	fs.writeFileSync('./data.json', content, { enconding: 'utf8' });
}

function main() {
	loadData();
	showMenu();
}

main();
// 1. Show all students
// 2. Create new student
// 3. Save and Exit
 var readLineSync = require('readline-sync');
 var fs = require('fs');
 const {table} = require('table');
 var students = [];
//load lữ liệu trong file ra thành code
 function loadData() {
 	var fileContent = fs.readFileSync('./data.json')
 	students = JSON.parse(fileContent);
 };
 //tạo menu
 var menu = [
    ['1: Show all students'],
    ['2: Add new students'],
    ['3: Find student by name'],
    ['4: Remove student by name'],
    ['5: Save & Exit']
 ];
//tạo bảng
 function createTable() {
     var result = [['name', 'age']];
     students.forEach( student => {
         result.push(Object.values(student));
     });
     return result;
 };
//tạo hàm showMenu
 function showMenu() {
 	console.log(table(menu));
 	var option = readLineSync.question('>');
 	//switch case 
 	switch(option) {
 		case '1':
 		//show all students
 		showStudents();
 		showMenu();
 		break;
 		case '2': 
 		showCreateStudent();
 		showMenu();
 		break;
 		case '3':
 		findStudent();
 		showMenu();
 		break;
 		case '4':
 		removeStudents();
 		showMenu();
 		break;
 		case '5': 
 		saveAndExit();
 		break;
 		default: 
 		console.log('không có lựa chọn này');
 		break;
 	};
 };
//hàm show tất cả student
 function showStudents() {
 	var result = [['name', 'age']];
 	if ( students.length == 0 ) {
 		console.log('Dont Have AnyStudents In File');
 	} else {
 		console.log(table(createTable()));
 	};
 };
//hàm tạo học sinh mới
 function showCreateStudent() {
 	var name = readLineSync.question('Name: ?');
 	var age = readLineSync.question('Age: ?');
 	var student = {
 		name: name,
 		age: parseInt(age)
 	};
 	students.push(student);
 };
 //tìm học sinh theo tên
  function findStudent() {
  	var form = [['name', 'age']];
 	var name = readLineSync.question('Who do you want to find? ');
 	var result = students.filter( item => item.name === name);
 	result.forEach( ele => {
 		form.push(Object.values(ele));
 	});
 	console.log(table(form));
 };
 //xóa học sinh theo tên
 function removeStudents() {
 	var name = readLineSync.question('Who do you want to remove? ');
 	students = students.filter( item => item.name !== name);
 	console.log(table(createTable()));
 };
//lưu và thoát chương trình 
 function saveAndExit() {
 	var content = JSON.stringify(students);
 	fs.writeFileSync('./data.json',content ,{encoding: 'utf8'});
 };

 function main() {
 	//load data from file
 	loadData();
 	//show menu
 	showMenu()
; 	//ask user
 }
; main();
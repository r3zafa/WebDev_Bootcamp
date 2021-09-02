let msg = '"add" to add a new todo \n';
msg += '"list" to see your todo`s \n';
msg += '"del" to delete a given todo from list \n';
msg += '"exit" to go out';

let input = prompt(msg);
input = input.toLowerCase();

const todoList = [];

console.log(input);
while (input !== 'exit') {
    if (input === 'add') {
        toBeAdded = prompt('what is the new todo?')
        todoList.push(toBeAdded);
        console.log(` ${toBeAdded} is now add to your todo List`);
    } else if (input === 'list') {
        console.log('******** todoList *********')
        if (todoList.length >= 1) {
            let count = 0;
            for (todo of todoList) {
                console.log(count, '. ', todo);
                document.getElementById("list").innerHTML = todoList;
                count++;
            }
        } else {
            console.log('todo List is Empty')
        }
        console.log('***************************')
    } else if (input === 'del') {
        const toBeDeleted = parseInt(prompt('Enter the Number of todo to delete it.'));
        if (!Number.isNaN(toBeDeleted)) {
            const deleted = todoList.splice(toBeDeleted, 1);
            console.log(` ${toBeDeleted} ${todoList[toBeDeleted]} is now deleted from your todo List`);
        } else {
            console.log('not a valid index');
        }

    } else {
        console.log('False input. use a commend from following list\n', msg);
    }
    input = prompt(msg);
    input = input.toLowerCase();

};
console.log('QUIT Successful !!')
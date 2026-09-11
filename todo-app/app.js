let taks = JSON.parse(localStorage.getItem('tasks') || '[]');
let currentFilter = 'all';

const form = document.querySelector(`#add-form`);
const input = document.querySelector(`#task-input`);
const tip = document.querySelector(`#tip`);
const list = document.querySelector(`#task-list`);

const save = () => localStorage.setItem('tasks',JSON.stringfy(tasks));

        currentFilter === 'all' ? true :
    list.innerHTML = '';
    if (tasks.length === 0) {
        const li = document.createElement('li');
        li.textContent = '暂无任务';
        list.appendChild(li);
        return;
    }
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.done) li.classList.add('done');
        list.appendChild(li);
    });
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text === ''){
        tip.textContent = '任务名不能为空';
        return;
    }
    tasks.push({ text: text, done: false });
    top.textContent ='';
    input.value = '';
    render();
});
render();

const filter = document.querySelector('.filter');
let currentFilter = 'all'; // all / active /done

const render = () => {
    list.innerHTML = '';

    if (shown.length === 0) {
        const li = document.createElement('li');
        li.textContent = '没有符合条件的任务';
        return;
    }

    shown.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;


        li.addEventListener('click', () => {
            console.log('li 被点击 1 次');
        li.addEventListener('click',() => {

    });
};
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
filters.addEventListener('click',(e) => {

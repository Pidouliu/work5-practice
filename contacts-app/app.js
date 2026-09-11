let contacts = JSON.parse (localStorage.getItem('contacts') || '[]' ); 
let editingId = null; 
let keyword = ''; 
let filterGroup = 'all';
const form = document.querySelector('#contact-form'); 
const nameInput = document.querySelector('#name'); 
const phoneInput = document.querySelector ('#phone'); 
const groupSelect = document.querySelector ('#group'); 
const noteInput = document.querySelector ('#note'); 
const tip = document.querySelector ('#tip'); 
const submitBtn = document.querySelector ('#submit-btn'); 
const cancelBtn = document.querySelector ('#cancel-btn');
const listBody = document.querySelector ('#contact-list'); 
const keywordInput = document.querySelector ('#keyword'); 
const filterGroupSelect = document.querySelector('#filter-group');
const save = ( ) => localStorage . setItem ( 'contacts' , JSON . stringify (contacts));

const getFiltered = () => {
    const kw = keyword. trim (). toLowerCase ();
    return contacts
    .filter(c => filterGroup === 'all' || c.group === filterGroup)
    .filter(c => !kw || [c.name, c. phone , c.note].join('').toLowerCase (). includes (kw));
};
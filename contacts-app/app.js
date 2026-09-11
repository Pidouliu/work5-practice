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
const render = ( ) => {
  listBody. innerHTML = '' ; const shown = getFiltered (); if (shown. length === 0 ) { const tr = document . createElement ( 'tr' ); const td = document . createElement ( 'td' );
    td. colSpan = 5 ;
    td. className = 'empty' ;
    td. textContent = '暂无符合条件的联系人' ;
    tr. appendChild (td);
    listBody. appendChild (tr); return ;
  }

  shown. forEach ( c => { const tr = document . createElement ( 'tr' );

    [c. name , c. phone , c. group , c. note || '—' ]. forEach ( text => { const td = document . createElement ( 'td' );
      td. textContent = text; 
    });
    const opTd = document . createElement ( 'td' ); const editBtn = document . createElement ( 'button' );
    editBtn. textContent = '修改' ;
    editBtn. className = 'small' ;
    editBtn. addEventListener ( 'click' , () => startEdit (c. id )); const delBtn = document . createElement ( 'button' );
    delBtn. textContent = '删除' ;
    delBtn. className = 'small danger' ;
    delBtn. addEventListener ( 'click' , () => removeContact (c. id ));

    opTd. appendChild (editBtn);
    opTd. appendChild ( document . createTextNode ( ' ' ));
    opTd. appendChild (delBtn);
    tr. appendChild (opTd);

    listBody. appendChild (tr);
  });
};
const removeContact = ( id ) => { const c = contacts. find ( x => x. id === id); if (! confirm ( `确定删除联系人「 ${c.name} 」吗？` )) return ;
  contacts = contacts. filter ( x => x. id !== id); // 先改数组 
  save (); 
  render (); // 再渲染 
  };
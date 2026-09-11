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
  contacts = contacts. filter ( x => x. id !== id); 
  save (); 
  render ();  
  };
  const startEdit = ( id ) => { const c = contacts. find ( x => x. id === id);
  editingId = id;
  nameInput. value = c. name ;
  phoneInput. value = c. phone ;
  groupSelect. value = c. group ;
  noteInput. value = c. note ;
  submitBtn. textContent = '保存修改' ;
  cancelBtn. hidden = false ;
  tip. textContent = '' ; window . scrollTo ({ top : 0 , behavior : 'smooth' });
}; 
const resetForm = ( ) => {
  form. reset ();
  editingId = null ;
  submitBtn. textContent = '添加联系人' ;
  cancelBtn. hidden = true ;
  tip. textContent = '' ;
};
form. addEventListener ( 'submit' , ( e ) => {
  e. preventDefault (); const name = nameInput. value . trim (); const phone = phoneInput. value . trim (); const group = groupSelect. value ; const note = noteInput. value . trim (); // 校验1：姓名必填 if (!name) {
    tip. textContent = '姓名不能为空' ; return ;
  } 
   if(! /^1\d{10}$/ . test (phone)) {
    tip. textContent = '手机号格式不正确：请输入 1 开头的 11 位数字'; 
    return;
  }  
  const duplicated = contacts. some ( c => c. id !== editingId && c. phone === phone); if (duplicated) {
    tip. textContent = `该手机号已存在（ ${contacts.find(c => c.phone === phone).name} ），不能重复添加` ; return ;
  }

  tip. textContent = '' ; if (editingId) {
    const c = contacts. find ( x => x. id === editingId);
    c. name = name;
    c. phone = phone;
    c. group = group;
    c. note = note;
  } else {
    contacts.push ({ id : Date . now (). toString (), name, phone, group, note });
  } save (); render (); resetForm ();
});

cancelBtn. addEventListener ( 'click' , resetForm); 
keywordInput. addEventListener ( 'input' , ( e ) => {
  keyword = e. target . value ; render ();
});
filterGroupSelect. addEventListener ( 'change' , ( e ) => {
  filterGroup = e. target . value ; render ();
}); 
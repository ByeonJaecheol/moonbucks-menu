//step1 요구사항 구현을 위한 전략
//TODO 메뉴 추가
//-[x] 메뉴의 이름을 입력 받고 확인 버튼을 누르면 메뉴가 추가된다.
//-[x] 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
//-[x] 총 메뉴 갯수를 count하여 상단에 보여준다.
    //추가되는 메뉴의 아래 마크업은 <ul id="espresso-menu-list" class="mt-3 pl-0"></ul> 안에 삽입해야 한다.
//-[x] 메뉴가 추가되고 나면, INPUT은 빈 값으로 초기화 한다.
//-[ ] 사용자 입력값이 빈 값이라면 추가되지 않는다.

const $ = (selector)=> document.querySelector(selector);

const UpdateMenuCount = ()=>{
const menuCount = document.querySelectorAll('li').length;
$('.menu-count').innerText = `총 ${menuCount}개`;
}

function App(){
    //form태그가 자동으로 전송되는걸 막는다. enter키 입력시 새로고침 현상
    $('#espresso-menu-form').addEventListener('submit',(e)=>{
        e.preventDefault();
    })


    const addMenuName = ()=>{
        
        if(($('#espresso-menu-name').value === "")){
            alert('메뉴를 입력해주세요')
            return;
        } 

        const emn = $('#espresso-menu-name').value;
        const menuItemTemplate =(emn)=> {return `
        <li class="menu-list-item d-flex items-center py-2">
  <span class="w-100 pl-2 menu-name">${emn}</span>
  <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
  >
    수정
  </button>
  <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
  >
    삭제
  </button>
</li>`;
       };
       $('#espresso-menu-list').innerHTML += menuItemTemplate(emn);
       
       UpdateMenuCount();
    
       $('#espresso-menu-name').value = '';
       
    }
    //메뉴의 이름을 입력받는다.
    
    $('#espresso-menu-name')
    .addEventListener('keypress',(e)=>{
      
        if(e.key!=='Enter'){
            return;
        }
        addMenuName();
       

    });

    $('#espresso-menu-submit-button')
    .addEventListener('click',(e)=>{
      addMenuName();
        
    });









// TODO메뉴 수정
//-[ ] 수정버튼을 눌러 메뉴 이름 수정 가능


//-[ ] 메뉴의 수정 버튼클릭 이벤트를 받고, 메뉴 수정하는 모달창이 뜬다.
//-[ ] 모달창에서 신규메뉴명을 입력 받고, 확인 버튼을 누르면 메뉴가 수정된다.

$('#espresso-menu-list').addEventListener("click",(e)=>{
    if(e.target.classList.contains("menu-edit-button")){
        const $menuName = e.target.closest("li").querySelector('.menu-name');
        const updatedMenuName = prompt(
            "메뉴명을 수정해주세요",
            $menuName.innerText
            );
            if(updatedMenuName!==null&&updatedMenuName!==''){
                console.log(updatedMenuName)
            $menuName.innerText = updatedMenuName;
            }else if(updatedMenuName===null||updatedMenuName===''){
                return;
            }

     }
});



// TODO메뉴 삭제
//-[ ] 메뉴 삭제 버튼 클릭 이벤트를 받고, confirm 인터페이스로 삭제 여부를 받는다.
//-[ ] 확인 버튼을 클릭하면 메뉴가 삭제된다.

$('#espresso-menu-list').addEventListener('click',(e)=>{
  
  if(e.target.classList.contains('menu-remove-button')){
    
    if(confirm('정말 삭제 하시겠습니까?')){
    e.target.closest('li').remove();
    
    }
    UpdateMenuCount();
  }
});



}


App();
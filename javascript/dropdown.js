/* dropDowns */

const dropDowns=document.querySelectorAll('.dropdown');
export function dropdDownMenu() {
  dropDowns.forEach(function(dropdown){
    const select=dropdown.querySelector('.select');
    console.log(select);
    const menu = dropdown.querySelectorAll('.menu')
    console.log('menu', menu);
    //  const options=dropdown.querySelectorAll('.menu li');
    // const selected=dropdown.querySelector('.selected');
  select.addEventListener('click', function(){
    menu.forEach(function(el){
       el.classList.toggle('menu-open');
      // console.log('tooo' , menu);
    })
  });

  })
}

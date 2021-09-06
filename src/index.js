import './sass/main.scss';
import apiService from './js/apiService';
import refs from './js/refs';
import cardTemplate from "./templates/card-template.hbs";
import * as basicLightbox from 'basiclightbox';


refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', loadMore);
refs.clear.addEventListener("click", onClickClear)

async function loadMore() {
  if (refs.input.value ==="") {
    return
  }
  await tryToFetch()
  // const element = document.getElementById('box');
  // element.scrollIntoView({block: "center", behavior: "smooth"});
  setTimeout(scroll, 500)
};
function tryToFetch() {
  try {
     apiService.fetchImages().then(res => refs.gallery.insertAdjacentHTML("beforeend", cardTemplate(res)));
  } catch (error) {
    alert(error);
  }
}
function scroll() {
  const element = document.getElementById('box');
  element.scrollIntoView({block: "center", behavior: "smooth"});
  
};

function onFormSubmit(e) {
  e.preventDefault();
   refs.gallery.innerHTML=""
  const input = e.currentTarget.elements.query;
  apiService.querySearch = input.value;
  refs.loadMoreBtn.classList.remove('invisible')
  if (input.value === "") {
    refs.loadMoreBtn.classList.add('invisible');
    return
  } 

  tryToFetch()
  
  // input.value=""
};

function onClickClear() {
  refs.input.value = "";
  apiService.resetPage();
};

refs.gallery.addEventListener('click', OnImgClick)
function OnImgClick(e) {
 if(e.target.nodeName !== "IMG"){
    return
  }
    const imgURL = e.target.dataset.image;
    basicLightbox.create(`<div class="modal">
		<img width="1200" src="${imgURL}">
        </div>
	`).show()
};
window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (clientHeight + scrollTop >= scrollHeight) {
    console.log("to the bottom");
    tryToFetch()
 }
})


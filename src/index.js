import './sass/main.scss';
import apiService from './js/apiService';
import refs from './js/refs';
import cardTemplate from "./templates/card-template.hbs";
import * as basicLightbox from 'basiclightbox';
import { error, alert } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';

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
    apiService.fetchImages().then(res => {
      if (res.length === 0) {
        refs.loadMoreBtn.classList.add('invisible');
        error({
      text: "There is no matches, try again!",
      delay: 3000,
    })}
      refs.gallery.insertAdjacentHTML("beforeend", cardTemplate(res))
    });
  } catch (err) {
    alert(err);
  }
}
function scroll() {
  const element = document.getElementById('box');
  element.scrollIntoView({block: "center", behavior: "smooth"});
  
};

function onFormSubmit(e) {
  e.preventDefault();
  refs.gallery.innerHTML = "";
  const input = e.currentTarget.elements.query;
  apiService.querySearch = input.value;
  refs.loadMoreBtn.classList.remove('invisible');
  if (input.value !== "") {
    refs.clear.classList.remove('invisible');
  }
  if (input.value === "") {
    alert({
      text: 'Please enter your request!',
      delay: 4000,
  });
    refs.loadMoreBtn.classList.add('invisible');
    return
  } 
  tryToFetch();
 
  // input.value=""
};

function onClickClear() {
  refs.clear.classList.add('invisible')
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
  if (clientHeight + scrollTop >= scrollHeight ) {
    tryToFetch();
 }
})


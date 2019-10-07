const prev_btn = document.querySelector('#prev');
const next_btn = document.querySelector('#next');
const slider = document.querySelector('.slider');
let firstChild;
let lastChild;


let projects = [{
    title: 'Project 1',
    type: 'website',
    content: ' This is an example of a slider with vanilla js and css keyframes',
    image: './imgs/web.jpg'
},
{
    title: 'Project 2',
    type: 'website',
    content: ' This is an example of a slider with vanilla js and css keyframes',
    image: './imgs/calender.jpg'
    
},
{
    title: 'Project 3',
    type: 'website',
    content: ' This is an example of a slider with vanilla js and css keyframes',
    image: './imgs/web2.jpg'
   
},
]

projects.forEach(({title, type, content, image}, index) => {
    const slide = document.createElement('div');
    slide.classList.add('slider-slide');
    slide.style.backgroundImage = "url('" + image + "')";
    console.log(slide);
    if(index === 0){
        firstChild = slide;
        slide.classList.add('active');
    }else if(index + 1 === projects.length){
        lastChild = slide;
    }

    const slide_content = document.createElement('div');
    slide_content.classList.add('slide-content');

    const content_title = document.createElement('h3');
    content_title.classList.add('.slide-title');
    content_title.textContent = title;

    const content_type = document.createElement('span');
    content_type.classList.add('.slide-type');
    content_type.textContent = type;

    const content_text = document.createElement('div');
    content_text.classList.add('.slide-content');
    content_text.textContent = content;

    content_title.appendChild(content_type);
    slide_content.appendChild(content_title);
    slide_content.appendChild(content_text);
    slide.appendChild(slide_content);

    slider.appendChild(slide);

});

next_btn.addEventListener('click', () => {
    const active_slide = document.querySelector('.slider-slide.active');
    let nextsibling = active_slide.nextElementSibling;
    
    if(nextsibling === null || !nextsibling.classList.contains('slider-slide')){
        nextsibling = firstChild;
    }

    if (nextsibling.classList.contains('slider-slide')){
        active_slide.classList.remove('active');
        nextsibling.classList.add('active');
    }
});

prev_btn.addEventListener('click', () => {
    const active_slide = document.querySelector('.slider-slide.active');
    let prev_sibling = active_slide.previousElementSibling;
    console.log(prev_sibling)

    if(prev_sibling === null || !prev_sibling.classList.contains('slider-slide') ){
        prev_sibling = lastChild;
    }

    if (prev_sibling.classList.contains('slider-slide')) {
        active_slide.classList.remove('active');
        prev_sibling.classList.add('active');
    }
});
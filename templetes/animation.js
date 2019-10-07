import {TweenMax, Power2,TweenLite, TimelineLite, TimelineMax} from 'gsap/all';
const contact = document.querySelector('.info');
const hero = document.querySelector('.hero');
const headline = document.querySelector('.headline');

window.addEventListener('load', ()=>{
    const loader = document.querySelector('.loader');
    console.log(loader)
    // loader.classList.add('hidden');
})

document.addEventListener("DOMContentLoads", () => {
    
    
    const tl = new TimelineMax()

    tl.fromTo(hero,1, {height: "0%"}, {height: "80%", ease: Power2.easeInOut})
    .fromTo(hero,1.2,{width: '100%'},{width: "80%",ease: Power2.easeInOut})
    .fromTo(slider,1.2,{x: '-100%'}, {x: "0% ",ease: Power2.easeInOut}, "-=1.2")
    .fromTo(headline,0.5, {opacity: '0.5', x: '30'}, {opacity: '1', x: '0'}, '-=0.5')
    .fromTo(contact,0.5, {opacity: '0.5', x: '30'}, {opacity: '1', x: '0'}, '-=0.5')

});

var tl = new TimelineMax({onUpdate:updatePercentage});
var tl2 = new TimelineMax();
const controller = new ScrollMagic.Controller();

tl.from('blockquote', .5, {x:200, opacity: 0});
tl.from('span', 1, { width: 0}, "=-.5");
tl.from('#office', 1, {x:-200, opacity: 0,ease: Power4.easeInOut}, "=-1");
tl.from('#building', 1, {x:200, opacity: 0, ease: Power4.easeInOut}, "=-.7");

tl2.from("#box", 1, {opacity: 0, scale: 0});
tl2.to("#box", .5, {left: "20%", scale: 1.3, borderColor: 'white', borderWidth: 12, boxShadow: '1px 1px 0px 0px rgba(0,0,0,0.09)'})

const scene = new ScrollMagic.Scene({
  triggerElement: ".sticky",
            triggerHook: "onLeave",
            duration: "100%"
})
  .setPin(".sticky")
  .setTween(tl)
		.addTo(controller);

const scene2 = new ScrollMagic.Scene({
  triggerElement: "blockquote"
})
  .setTween(tl2)
		.addTo(controller);


function updatePercentage() {
  //percent.innerHTML = (tl.progress() *100 ).toFixed();
  tl.progress();
  console.log(tl.progress());
}



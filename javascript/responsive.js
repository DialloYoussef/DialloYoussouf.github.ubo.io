(function(){
   
   var menu_responsive = document.getElementById("menu_responsive");
   var header__icon = document.querySelector(".header__icon");
   var site__pusher = document.querySelector('.site-pusher');
   var site_cache = document.querySelector(".site_cache");
    /**  emburgeur anime **/  
   var span1 = document.getElementById('span1');
   var span2 = document.getElementById('span2');
   var span3 = document.getElementById('span3');
    /**  emburgeur anime **/  
   header__icon.addEventListener("click",() =>{
       menu_responsive.classList.toggle('side--bar');
       site__pusher.classList.toggle("page");
       site_cache.classList.toggle("site_cache_effet");
    /**  emburgeur anime **/  
       span1.classList.toggle('disparait')
       span2.classList.toggle('rotateSpan2')
       span3.classList.toggle('rotateSpan3')
       header__icon.classList.toggle('menuJsIcone')
    /**  emburgeur anime **/  
   })
   site_cache.addEventListener('click', ()=>{
       site__pusher.classList.remove('page');
       site_cache.classList.remove('site_cache_effet')
    /**  emburgeur anime **/  
       
       span1.classList.remove('disparait')
       span2.classList.remove('rotateSpan2')
       span3.classList.remove('rotateSpan3')
    /**  emburgeur anime **/  

   })
    
/**
 * Je recupere l'element mobile puis j'ecoute quand je click sur cet element
 * je suprime la classe active sur l'element actif puis je l'ajoute sur 
 * l'element clicker
*/ var affiche = function(element)
 {
  let height = element.offsetHeight; // on calcule la hauteur de l'element
  element.style.height = '0px'; // on met la hauteur a 0px
  element.offsetHeight; // le javascript memorise tout le code en memoire et l'execute tout en meme temps 
                        //au chargement , donc pour lui dire de faire bcp de chose a la fois mais pas en meme temps il faut  
                       // faut qu'on lui redirige ver des chse juste pour faire un interval entre 
                       // les instruction

  element.style.transitionDuration = '1s'; // rien a expliquer maintenant
  element.style.height = height + 'px';
  window.setTimeout(function(){
    element.style.height = null;
  }, 1000);
}

var masque = function(cloneActive)
{
 let height = cloneActive.offsetHeight;
 cloneActive.style.height = height + 'px';
 cloneActive.offsetWidth;
 window.setTimeout(()=>{
   
  cloneActive.style.height = '0px';
 }, 1000);

}



    var ul_Parent = null;
    var active = null;
    var elementCourant = null;
    var li = null;
    var meme_element = null;
var afficheSousMenu = function(element)
{    
  if(element)
  {
     
     ul_Parent = element.parentNode.parentNode.parentNode.parentNode;
     li = element.parentNode.parentNode;
     active = ul_Parent.querySelector('.active');
     elementCourant = li.querySelector('.Apropos_content');
     if(meme_element === element) 
     {
         elementCourant.classList.toggle('active');
         elementCourant.offsetHeight;
        affiche(elementCourant);
     }else
     {
     if(active) active.classList.remove('active');
      elementCourant.classList.toggle('active');
      affiche(elementCourant);
      }
      
     meme_element = element;
  }
}
var array = Array.from(document.querySelectorAll('.mobile'));
    array.forEach(element => {
         element.addEventListener('click', ()=>{
             afficheSousMenu(element);
         })
    });


/**** menu Indicateur  ****************/ 

/******
 * Je vai creer une span dans chaque lien de la nav
 * et je vais ajouter la classe d'apparution de cette span
 * je vais parcourire chaque lien en ecoutant le survole
 * je doit recuperer l'indicateur active et le courent
 * puis j'applique l'animation
 */
   var parent = document.getElementById('menu_responsive');
   var tabLien = Array.from(parent.querySelectorAll('.lien > a'));
   var lienActive = parent.querySelector('[aria-selected]') 
   tabLien.forEach(element => {
               let span = document.createElement('span');
               span.classList.add('indicateur');
               element.appendChild(span);
   });

   tabLien.forEach(element => {
              element.addEventListener('mouseover', indicateur);
   });

   function indicateur(e)
   {
          if(lienActive === e.currentTarget) return;
          lienActive?.removeAttribute('aria-selected');
          e.currentTarget.setAttribute('aria-selected', 'true');
          if(lienActive)
          {
            let activeIndicateur = lienActive.querySelector('.indicateur');
            let currentIndicateur = e.currentTarget.querySelector('.indicateur');

              currentIndicateur.animate([
                {
                  transform : getTransforme(activeIndicateur, currentIndicateur)
                },
                {
                  transform : 'translate3d(0, 0, 0) scale(1, 1)'
                }
              ],
                 {
                  fill : 'none',
                  duration : 600,
                  easing : 'cubic-bezier(.72, 1.62, .2, .99)'
                 }
              )
           }

       lienActive = e.currentTarget;
   }

   function getTransforme(activeIndicateur, currentIndicateur)
   {
      let activeRect = activeIndicateur.getBoundingClientRect();
      let currentRect = currentIndicateur.getBoundingClientRect();
      var transforme = {
              X: activeRect.x - currentRect.x,
              Y: activeRect.y - currentRect.y,
              scaleX: activeRect.width / currentRect.width,
              scaleY: activeRect.height / currentRect.height
      }
      return `translate3d(${transforme.X}px, ${transforme.Y}px, 0)
             scale(${transforme.scaleX}, ${transforme.scaleY})`;
   }




})()

/**
 * .72, 1.62, .2, .99
 */

(function () {
if (!document.getElementById("contact-form")) return;

/* CONFIGURACIÓN: completar los canales reales antes de publicar.
WhatsApp: código de país y número, solo dígitos. No incluir datos ficticios.
Editar los planes únicamente con precios e inclusiones aprobados.
*/
const CONTACT=drupalSettings.contaelite || {};
const menu=document.getElementById('menu'),nav=document.getElementById('navigation');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');menu.querySelector('path').setAttribute('d',open?'M5 5l14 14M19 5L5 19':'M3 6h18M3 12h18M3 18h18')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.querySelector('path').setAttribute('d','M3 6h18M3 12h18M3 18h18');menu.setAttribute('aria-label','Abrir menú')}));
const dialog=document.getElementById('message');function showMessage(title,text){document.getElementById('dialog-title').textContent=title;document.getElementById('dialog-text').textContent=text;dialog.showModal()}document.getElementById('close-dialog').onclick=()=>dialog.close();document.querySelectorAll('[data-contact]').forEach(a=>{const channel=a.dataset.contact;const v=CONTACT[channel];if(v){a.href=channel==='whatsapp'?'https://wa.me/'+v+'?text='+encodeURIComponent('Hola, quiero una asesoría inicial gratuita con Conta Élite.'):channel==='phone'?'tel:'+v:'mailto:'+v}else a.addEventListener('click',e=>{e.preventDefault();showMessage('Canal pendiente de configurar','Esta es una plantilla de presentación. Aún no se han suministrado los datos oficiales de contacto de Conta Élite. Este botón se activará al incorporarlos.');})});if(['whatsapp','phone','email'].some(key=>Boolean(CONTACT[key])))document.getElementById('contact-status').textContent='Elige el canal que prefieras para coordinar tu asesoría.';document.getElementById('privacy').onclick=()=>showMessage('Privacidad',CONTACT.privacy || 'Política pendiente de configurar.');document.getElementById('year').textContent=new Date().getFullYear();

// Conectar un servicio de recepción y añadir la política aprobada antes de habilitar el envío.
document.getElementById('contact-form').addEventListener('submit',function(event){event.preventDefault();if(!this.reportValidity())return;document.getElementById('form-status').textContent='Los campos están completos. El envío aún no está habilitado: falta configurar el destino de los mensajes y la política de tratamiento de datos. No se ha enviado ni guardado tu información.';});

})();
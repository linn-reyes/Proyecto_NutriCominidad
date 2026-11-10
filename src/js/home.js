import headerHtml from '../partials/header.html?raw';
import footerHtml from '../partials/footer.html?raw';

document.querySelector('#header-container').innerHTML = headerHtml;
document.querySelector('#footer-container').innerHTML = footerHtml;
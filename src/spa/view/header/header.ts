import createHTMLElement from '../../util/element-creator';
import './header.scss';

class HeaderView {
    public create(): Node {
        const header = createHTMLElement('header');
        const logo = createHTMLElement('div', 'logo');
        const h1Tag = createHTMLElement('p');
        h1Tag.textContent = 'RSS Puzzle';
        logo.append(h1Tag);

        const div = createHTMLElement('div', 'logout');
        const a = createHTMLElement('a');
        a.setAttribute('href', '#');
        const spanIconName = createHTMLElement('span');
        const icon = createHTMLElement('ion-icon');
        icon.setAttribute('name', 'log-out-outline');
        spanIconName.append(icon);
        const spanDisplayName = createHTMLElement('span');
        spanDisplayName.textContent = 'Log out';
        a.append(spanIconName, spanDisplayName);
        div.append(a);

        header.append(logo, div);
        return header;
    }
}

export default HeaderView;

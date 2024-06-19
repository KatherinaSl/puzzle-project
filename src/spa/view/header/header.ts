import createHTMLElement from '../../util/element-creator';
import icon from '../../../assets/img/exit.png';
import './header.scss';

export default class HeaderView {
    public create(): Node {
        const header = createHTMLElement('header');
        const logo = createHTMLElement('div', 'logo');
        const h1Tag = createHTMLElement('p');
        h1Tag.textContent = 'RSS Puzzle';
        logo.append(h1Tag);

        const div = createHTMLElement('div', 'logout');
        const logoutIcon = createHTMLElement('img') as HTMLImageElement;
        logoutIcon.src = icon as string;

        div.append(logoutIcon);

        header.append(logo, div);
        return header;
    }
}

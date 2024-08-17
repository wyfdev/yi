"use strict";

// document.readyState('')

/**
 *
 * genrate aside
 *
 */
const initIndexAside = () => {
    /*
    let aside = document.createElement('aside');
    let main = document.querySelector('main');

    let ul = document.createElement('ul');
    ul.classList.add('index');
    aside.appendChild(ul)

    // creat index items
    for (let article of document.querySelectorAll('main article')) {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.href = '#' + article.id;
        a.innerText = article.querySelector('h2').innerText;
        li.appendChild(a)
        ul.appendChild(li);
    }
    document.body.insertBefore(aside, main)
    */

    // show when click aside item
    let aside = document.querySelector('aside')

    // click aside items
    aside.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A') {
            throw '...';
        }
        aside.querySelectorAll('ul > li.active').forEach(ele => ele.classList.remove('active'))
        e.target.parentElement.classList.add('active')

        document.querySelectorAll('article.active').forEach(ele => { ele.classList.remove('active')})
        let targetId = e.target.getAttribute('href').replace('#', '');
        document.getElementById(targetId).classList.add('active')

        document.body.classList.remove('aside-visable');
    })

    window.addEventListener('hashchange', (e) => {
        aside.querySelector(`[href="${location.hash}"]`).click()
    }, false);
}


// function: notification
const notification = new class {
    constructor() {
        const noticeBar = document.createElement('div');
        noticeBar.style = `
            display: none; position: fixed; top: -100%; left: 50vw; z-index: 1000;
            min-width: 10em; min-height: 1.2em; padding: .1em; border-radius: 0 0 4px 4px;
            background: #4e5255; color: #ddd;
            text-align: center; font-size: 0.8rem;
            cursor: pointer; transition: top 1s;
            transform: translate(-50%, 0);
        `;
        noticeBar.innerHTML = '--';

        this.bar = noticeBar;
        addEventListener("DOMContentLoaded", (event) => {
            document.body.appendChild(noticeBar);
        });
    }

    show(html, secs) {
        this.bar.innerHTML = html;
        this.bar.style.display = 'block';
        this.bar.style.top = 0;
        setTimeout(() => {
            this.bar.style.top = '-100%';
            setTimeout(() => this.bar.style.display = 'none', 500);
        }, ((secs ? secs : 1) + 1) * 1000);
    }
}

window.addEventListener('load', () => {
    initIndexAside();
});

// show when click <h2>
document.addEventListener('click', (e) => {
    // console.log(e.target)
    if (e.target.tagName == 'H2') {
        document.querySelectorAll('article.active').forEach(ele => {
            ele.classList.remove('active');
        })
        let article = e.target.parentElement.parentElement;
        article.classList.add('active');
        location.hash = article.getAttribute('id');
        article.scrollIntoView({behavior: "smooth", block: "start"});
    }
});


// locate artile by hash on load
window.addEventListener("DOMContentLoaded", (event) => {
    let article = document.querySelector(location.hash);
    article.classList.add('active');
    article.scrollIntoView({behavior: "smooth", block: "start"});
});


// copy
document.addEventListener('click', (e) => {
    const copy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
        console.log('Async: Copying to clipboard was successful!');
        }, (err) => {
        console.error('Async: Could not copy text: ', err);
        });
    }
    // console.log(e.target)
    if (e.target.tagName == 'SPAN' && e.target.className == 'copy') {
        let articleId = e.target.getAttribute('data-article-id');
        for (let group_name in data) {
            for (let i of data[group_name]) {
                if (i['uri'] == articleId) {
                    let content = Object.entries(i.content.pargraphs).map(p => p[1].join('\n')).join('\n\n');
                    copy(i['content']['title'] + '\n\n\n' + content);
                    break;
                }
            }
        }
        notification.show('已複製');
    }
});


// touch
{
    let touchstartX = 0
    let touchendX = 0

    document.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX
    })

    document.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX

        console.log(Math.abs(touchendX - touchstartX))

        if (Math.abs(touchendX - touchstartX) < 100) {
            return;
        }
        if (touchendX < touchstartX) {
            console.log('swiped left')
            document.body.classList.remove('aside-visable');
        }
        else {
            console.log('swiped right')
            document.body.classList.add('aside-visable');
        }
    })
}

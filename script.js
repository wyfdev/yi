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

    aside.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A') {
            throw '...';
        }
        aside.querySelectorAll('ul > li.active').forEach(ele => ele.classList.remove('active'))
        e.target.parentElement.classList.add('active')

        document.querySelectorAll('article.active').forEach(ele => { ele.classList.remove('active')})
        let targetId = e.target.getAttribute('href').replace('#', '');
        document.getElementById(targetId).classList.add('active')
    })

    window.addEventListener('hashchange', (e) => {
        aside.querySelector(`[href="${location.hash}"]`).click()
    }, false);
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
    }
});
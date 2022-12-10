let done = false
const filters = ['All', 'Videos', 'Shorts']

checkLoading()

function checkLoading() {
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (window.location.href == 'https://www.youtube.com/feed/subscriptions' && document.querySelector('#title-container') !== null && !done) {
                createButtons()
                done = true
            }
        });
    });
    observer.observe(document.body, {
        subtree: true,
        childList: true
    })
}

function createButtons() {
    const div = document.createElement('div')
    div.id = 'btnsCustom'
    filters.forEach(filter => {
        const newbtn = document.createElement('button')
        newbtn.innerText = filter
        newbtn.id = `btn${filter}`
        newbtn.classList = 'btnCustom'
        div.appendChild(newbtn)
    })
    document.querySelector('div#header-container+div#contents').before(div)
    document.querySelector('#btnAll').classList.add('active');
    filters.forEach(filter => {
        const btnSelected = document.querySelector(`#btn${filter}`)
        btnSelected.addEventListener("click", function () {
            changeClass(btnSelected, filter)
        })
    })
}

function changeClass(btnSelected, filter) {
    filters.forEach(filter => document.querySelector(`#btn${filter}`).classList.remove('active'))
    btnSelected.classList.add('active')
    const list = document.querySelectorAll('div#items.style-scope.ytd-grid-renderer')
    if (filter == 'All') {
        list.forEach(element => {
            element.classList.remove('videos')
            element.classList.remove('shorts')
        })
    }
    if (filter == 'Videos') {
        list.forEach(element => {
            element.classList.add('videos')
            element.classList.remove('shorts')
        })
    }
    if (filter == 'Shorts') {
        list.forEach(element => {
            element.classList.remove('videos')
            element.classList.add('shorts')
        })
    }
}
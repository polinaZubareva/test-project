const searchButton = document.querySelector('.search-button');
const inn = document.querySelector('.label');
let info = document.querySelector('.company-info');

searchButton.addEventListener('click', async () => {
    console.log('halo');

    await fetch('/client/public/page.html', {
        method: 'GET',
        body: inn
    }).then((response) => {
        info.textContent = response;
    }).catch((reason) => {
        info.textContent = response;
    })
});
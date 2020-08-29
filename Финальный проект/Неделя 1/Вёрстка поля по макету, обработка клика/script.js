let elemsCard = document.querySelectorAll('.card');
let elemsFront = document.querySelectorAll('.front');

let emojiList = ['🐶','🐓','🐞', '🐟', '🐯', '🐸'];

elemsCard.forEach((card) => {
    card.addEventListener('click', (e) => {
        let elem = e.currentTarget;
        if (elem.classList.contains('animation-card-back')) {
            elem.classList.replace('animation-card-back', 'animation-card-front');
        }
        else if(elem.classList.contains('animation-card-front')) {
            elem.classList.replace('animation-card-front', 'animation-card-back');
        } else {
            elem.classList.add('animation-card-front');
        }
    })
});

// Удваиваем массив с эмоджи для нашей доски
let emojiListForFront = emojiList.concat(emojiList);
// Рандомно сортируем эмоджи
emojiListForFront.sort(() => {
    return Math.random().toFixed(1) > 0.5 ? 1 : -1;
})

elemsFront.forEach((front) => {
    console.log('emoji', emojiListForFront);
    front.textContent = emojiListForFront.shift();
});
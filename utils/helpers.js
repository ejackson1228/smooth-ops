module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
    format_plural: (word, amount) => {
        if (amount !== 1) {
            return `${word}s`
        } else {
            return word;
        }
    },
    format_url: url => {
        return url
        .replace('http://', '')
        .replace('https://', '')
        .replace('www.', '')
        .split('/')[0]
        .split('?')[0]
    },
    get_sprite_url: url => {
        fetch(url).then(response => response.json())
        .then(data => {
            let pokemonSprite = data.sprites.front_default;
            console.log(pokemonSprite);
            return pokemonSprite;
        })  
    }
};
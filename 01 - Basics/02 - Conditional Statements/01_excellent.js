function excellent(grade) {
    if (Number(grade) >= 5.5) {
        return 'Excellent!';
    }
}

function excellentTern(grade) {
    return Number(grade) >= 5.5 ? 'Excellent!' : '';
}

console.log(excellent('5.6'));

console.log('====================');

console.log(excellentTern('5.6'));
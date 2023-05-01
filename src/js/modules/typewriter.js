const typeWriter = ({ text, target, speed, delay }) => {
    let i = 0;
    let printChars;
    
    setTimeout(() => {
        printChars = setInterval(() => {
            if (i < text.length) {
                document.querySelector(target).innerHTML += text.charAt(i);
                i++;
            } else if (i === text.length) {
                clearInterval(printChars);
            }
        }, speed);
    }, delay || 0);
}

export default typeWriter;
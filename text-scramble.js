const allCharacters = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"];
function scrambleAnimation() {
    const toScramble = document.querySelectorAll(".scramble");

    function randomChar() {
        const charIndex = Math.round(allCharacters.length * Math.random() | 0);
        return allCharacters[charIndex];
    }
  
    toScramble.forEach(obj => {
        if (!obj.inProgress) {
            obj.inProgress = true;
            scrambleContent(obj);
        }
        else {
            obj.inProgress = true;
        }
    })

    function scrambleContent(obj) {
        const content = obj.innerText;
        const characters = [...content];
        const delayToSolve = 500;
        const delayToChangeCharater = 50;
        const globalDelay = 50;
        let delayCounter = 0;

        characters.forEach((char, index) => {
            if (char != ' '){
                setTimeout(
                    () => {
                        // substitutes for a new character
                        let intervalId = setInterval(() => {
                            const newChar = randomChar();
                            obj.innerText = replaceCharacter(
                                obj.innerText,
                                index,
                                newChar
                            )
                        }, delayToChangeCharater);
    
                        setTimeout(() => {
                            clearInterval(intervalId);
                            obj.innerText = replaceCharacter(
                                obj.innerText,
                                index,
                                characters[index]
                            )
                            if (index === (characters.length - 1)) {
                                obj.inProgress = false;
                            }
                        }, delayToSolve);
                    },
                    delayCounter === 0 ? (delayCounter += 1) : (delayCounter += globalDelay)
                );
            }
        });
    }

    function replaceCharacter(str, index, chr) {
      return `${str.substring(0, index)}${chr}${str.substring(index + 1)}`;
    }
}
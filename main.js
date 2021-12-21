window.onload=function(){

    const words = ["Add", "Multiply", "Minus", "Divide"]

    let Results = [];

    document.getElementById('startbtn')?.addEventListener('click', function(){
        document.getElementById('menu').style.setProperty('display', 'none')
        document.getElementById('playground').style.setProperty('display', 'flex')
        document.getElementById('closesvg').style.setProperty('display', 'flex');
        timerAdd()
    });

    document.getElementById('exit')?.addEventListener('click', function(){
        window.close()
    })

    document.getElementById('settings')?.addEventListener('click', function(){
        console.log('settings')
    })

    document.getElementById('about')?.addEventListener('click', function(){

        document.getElementById('back').style.setProperty('display', 'flex');
        document.getElementById('samples').style.setProperty('display', 'flex');

        Array.from(document.querySelectorAll('.btn')).map(item => {
            return item.style.setProperty('display', 'none');
        })
    })

    document.getElementById('back').addEventListener('click', function() {

        document.getElementById('back').style.setProperty('display', 'none');
        document.getElementById('samples').style.setProperty('display', 'none');

        Array.from(document.querySelectorAll('.btn')).map(item => {
            return item.style.setProperty('display', 'flex');
        })
    })

    document.getElementById('closesvg')?.addEventListener('click', function(){
        document.getElementById('menu').style.setProperty('display', 'flex')
        document.getElementById('playground').style.setProperty('display', 'none')
        document.getElementById('closesvg').style.setProperty('display', 'none')
    });



    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
      }

    let cards = []

    document.getElementById('addCard').addEventListener('click', function() {

        let number = randomIntFromInterval(0,9)

        document.getElementById('wordGenerated').innerHTML = words[Math.floor(Math.random() * (3 - 0 + 1) + 0)]

        document.getElementById('count').value

        let final = 2

        if (Results.length === 6) {
            Results.map( item => {
                    switch(item.type) {
                        case "Add":
                            return final = Number(final) + Number(item.number);
                        case "Multiply":
                            return final = Number(final) * Number(item.number);
                        case "Minus":
                            return final = Number(final) - Number(item.number);
                        default:
                            final = Number(final) / Number(item.number);
                    }
                }
            )

            if (Math.round(final) === Number(document.getElementById('count').value)) {
                gameOverModal("You win, your score is " + final)
                Results = []
                document.getElementById('count').value = 2
            } else {
                gameOverModal()
                document.getElementById('count').value = 2
                Results = []
            }

        } else {
            Results.push({
                type: words[Math.floor(Math.random() * (3 - 0 + 1) + 0)],
                number: number
            })
        }

        if (cards.length === 6) {
            return 
        }

        let mousePosition;
        let offset = [0,0];
        let div;
        let isDown = false;
        
        div = document.createElement("div");
        div.style.position = "absolute";
        div.style.display = 'flex';
        div.style.justifyContent = 'center',
        div.style.justifyItems = 'center',
        div.style.left = '50%';
        div.style.top = '100px';
        div.style.width = "250px";
        div.style.height = "320px";
        div.style.borderRadius = "5px";
        div.style.backgroundImage = "url('./images/dragon" + randomIntFromInterval(1,4) + ".jpeg')";
        div.style.backgroundSize = 'cover';
        div.style.color = "black";
        div.style.zIndex = "99";
        div.style.cursor = 'pointer';
        div.style.transform = `rotate(${randomIntFromInterval(0,75)}deg)`
        div.style.transition = 'transform 0.1s ease';
        div.style.transformStyle = 'preserve-3d';
        div.style.willChange = 'transform';
        div.style.borderRadius = '15px';
        div.className = 'playCard';
        div.id = Math.random()

        let span = document.createElement("span");

        span.style.marginTop = 'auto';
        span.style.marginBottom = 'auto';
        span.style.marginLeft = 'auto';
        span.style.marginRight = 'auto';
        span.style.fontFamily = `'Fuzzy Bubbles', cursive`;
        span.style.fontSize = '54px';
        span.style.backgroundColor = 'rgb(228, 171, 171)';
        span.style.width = '70px';
        span.style.textAlign = 'center';
        // span.style.height = '60px';
        // span.style.paddingLeft = '5px';
        span.style.borderRadius = '50%';

        span.innerHTML = number

        div.append(span)

        cards.push(div)
        
        document.body.appendChild(div);

        addVolume(cards[cards.length > 0 ? cards.length - 1 : 0].id)
        
        div.addEventListener('mousedown', function(e) {
            isDown = true;
            offset = [
                div.offsetLeft - e.clientX,
                div.offsetTop - e.clientY
            ];
            div.style.transform = 'rotate(0deg)'
        }, true);
        
        document.addEventListener('mouseup', function() {
            isDown = false;
        }, true);
        
        document.addEventListener('mousemove', function(event) {
            event.preventDefault();
            if (isDown) {
                mousePosition = {
            
                    x : event.clientX,
                    y : event.clientY
            
                };
                div.style.left = (mousePosition.x + offset[0]) + 'px';
                div.style.top  = (mousePosition.y + offset[1]) + 'px';
            }
        }, true);
    })

    function removeElementsByClass(className){
        const elements = document.getElementsByClassName(className);
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }


    function addVolume(id) {
        const card = document.getElementById(id);
        const motionMatchMedia = window.matchMedia("(prefers-reduced-motion)");
        const THRESHOLD = 15;
        
        function handleHover(e) {
        const { clientX, clientY, currentTarget } = e;
        const { clientWidth, clientHeight, offsetLeft, offsetTop } = currentTarget;
        
        const horizontal = (clientX - offsetLeft) / clientWidth;
        const vertical = (clientY - offsetTop) / clientHeight;
        const rotateX = (THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2);
        const rotateY = (vertical * THRESHOLD - THRESHOLD / 2).toFixed(2);
        
        card.style.transform = `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1, 1, 1)`;
        }
        
        function resetStyles(e) {
        card.style.transform = `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
        }
        
        if (!motionMatchMedia.matches && card !== null) {
        card.addEventListener("mousemove", handleHover);
        card.addEventListener("mouseleave", resetStyles);
        }
    }


    function timerAdd() {

        let interval_id = window.setInterval(()=>{}, 99999);
        for (let i = 0; i < interval_id; i++)
            window.clearInterval(i);

        div = document.createElement("div");
        div.style.position = 'fixed';
        div.id = "timer";
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.top = '15px';
        div.style.left = '50%';
        div.style.borderRadius = '50%';
        div.style.display = 'flex';
        div.style.textAlign = 'center';
        div.style.justifyContent = 'center'
        div.style.fontFamily = `'Fuzzy Bubbles', cursive`;
        div.style.fontSize = '30px';
        document.body.appendChild(div);
        timer();
        
    }

    function timer(){
        let sec = 60;
        let timer = setInterval(function(){
            document.getElementById('timer').innerHTML=sec;
            sec--;
            if (sec < 0) {
                clearInterval(timer);
                gameOver()
            }
        }, 1000);
    }

    function gameOverModal(text = 'Game over, click somewhere to go to menu') {
        cards = []
        div = document.createElement("div");
        div.style.position = 'fixed';
        div.id = "gameOver";
        div.style.width = '100%';
        div.style.height = '100%';
        div.style.borderRadius = '8';
        div.style.backgroundColor = 'rgb(228, 171, 171)';
        div.style.display = 'flex';
        div.style.textAlign = 'center';
        div.style.justifyContent = 'center'
        div.style.fontFamily = `'Fuzzy Bubbles', cursive`;
        div.style.fontSize = '30px';
        div.style.zIndex = '100'

        let span = document.createElement("span");

        span.style.marginTop = 'auto';
        span.style.marginBottom = 'auto';
        span.style.marginLeft = 'auto';
        span.style.marginRight = 'auto';
        span.style.fontFamily = `'Fuzzy Bubbles', cursive`;
        span.style.fontSize = '54px';
        span.style.backgroundColor = 'rgb(228, 171, 171)';
        span.style.textAlign = 'center';

        span.innerHTML = text

        div.append(span)

        document.body.appendChild(div);
        document.getElementById('gameOver')?.addEventListener('click', function(){
        removeElementsByClass('playCard')
            document.getElementById('menu').style.setProperty('display', 'flex')
            document.getElementById('playground').style.setProperty('display', 'none')
            document.getElementById('closesvg').style.setProperty('display', 'none')
            removeElement('timer')
            removeElement('gameOver')
        });

    }

    function gameOver () {
        removeElementsByClass('playCard')
        cards = []
        gameOverModal()
    }

    function removeElement(id) {
        var elem = document.getElementById(id);
        return elem.parentNode.removeChild(elem);
    }

    document.getElementById('closesvg').addEventListener('click', function() {
        removeElementsByClass('playCard')
        cards = []
    })

    document.getElementById('clearCards').addEventListener('click', function() {
        removeElementsByClass('playCard')
        cards = []
    })



}

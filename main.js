window.onload=function(){

    document.getElementById('startbtn')?.addEventListener('click', function(){
        document.getElementById('menu').style.setProperty('display', 'none')
        document.getElementById('playground').style.setProperty('display', 'flex')
        document.getElementById('closesvg').style.setProperty('display', 'flex')
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
        div.style.left = '200px';
        div.style.top = '100px';
        div.style.width = "190px";
        div.style.height = "320px";
        div.style.borderRadius = "5px";
        div.style.background = `linear-gradient(${randomIntFromInterval(0,360)}deg, rgba(${randomIntFromInterval(0,256)},${randomIntFromInterval(0,256)},${randomIntFromInterval(0,256)},1) 0%, rgba(${randomIntFromInterval(0,256)},${randomIntFromInterval(0,256)},${randomIntFromInterval(0,256)},1) 35%, rgba(${randomIntFromInterval(0,256)},${randomIntFromInterval(0,256)},${randomIntFromInterval(0,256)},1) 100%)`;
        div.style.color = "black";
        div.style.zIndex = "99";
        div.style.cursor = 'pointer';
        div.style.transform = `rotate(${randomIntFromInterval(0,75)}deg)`
        div.className = 'playCard';

        var span = document.createElement("span");

        span.style.marginTop = 'auto';
        span.style.marginBottom = 'auto';
        span.style.marginLeft = 'auto';
        span.style.marginRight = 'auto';
        span.style.fontFamily = `'Fuzzy Bubbles', cursive`;
        span.style.fontSize = '54px'

        span.innerHTML = randomIntFromInterval(0,9)

        div.append(span)

        cards.push(span)
        
        document.body.appendChild(div);
        
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

    document.getElementById('closesvg').addEventListener('click', function() {
        removeElementsByClass('playCard')
        cards = []
    })

    document.getElementById('clearCards').addEventListener('click', function() {
        removeElementsByClass('playCard')
        cards = []
    })

}

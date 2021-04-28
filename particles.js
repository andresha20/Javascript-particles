const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/80) * (canvas.width/80)
}

class Particle {
    constructor(x, y, directionX, directionY, circleRadius, color) {
        this.x = x
        this.y = y
        this.directionX = directionX
        this.directionY = directionY
        this.circleRadius = circleRadius
        this.color = color
    }

    drawParticle () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.circleRadius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update () {
        // Check if the particle is outside the canvas. If so, reset its position to the
        // opposite direction.

         if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
         }
         if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
         }

         // dx = directionX; dy = directionY. Check collision detection - mouse pos / particle position.
         let dx = mouse.x - this.x;
         let dy = mouse.y - this.y;
         let distance = Math.sqrt(dx*dx + dy*dy)

         if (distance < mouse.radius + this.circleRadius) {
             if (mouse.x < this.x && this.x < canvas.width - this.circleRadius * 10) {
                 this.x += 10;
             }
             if (mouse.x > this.x && this.x > this.circleRadius * 10) {
                 this.x -= 10;
             }
             if (mouse.y < this.y && this.y < canvas.height - this.circleRadius * 10) {
                 this.y += 10;
             }
             if (mouse.y > this.y && this.y > this.circleRadius * 10) {
                 this.y -= 10;
             }
         }
         // Move particles
         this.x += this.directionX;
         this.y += this.directionY;
         // Draw particle
         this.drawParticle();
    }
}

addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})

let particlesArray = []

function createParticle () {
    let numberOfParticles = (canvas.height * canvas.width) / 15000;
    for (let i = 0; i < numberOfParticles; i++) {
        let circleRadius = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - circleRadius * 2) - (circleRadius * 2) + circleRadius * 2));
        let y = (Math.random() * ((innerHeight - circleRadius * 2) - (circleRadius * 2) + circleRadius * 2));
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = '#8C5523'

        particlesArray.push(new Particle (x, y, directionX, directionY, circleRadius, color))
    }
}

function animate () {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    particlesArray.forEach(particle => particle.update());
    linkParticles();
}

function linkParticles () {
    let opacity = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x)
            * (particlesArray[a].x - particlesArray[b].x)) 
            + ((particlesArray[a].y - particlesArray[b].y) 
            * (particlesArray[a].y - particlesArray[b].y));

            if (distance < (canvas.width/7) * (canvas.height/7)) {
                opacity = 1 - (distance/20000);
                ctx.strokeStyle = `rgba (140, 85, 31, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = ((canvas.height/80) * (canvas.width/80));
    createParticle();
})

addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
})


createParticle();
animate();

/*
 1. Implement ES6 into the 'john' {}
  2. Return value from the 'deduct' () after 2s
*/


const sleep = time => new Promise((resolve) => setTimeout(resolve, time))


var john = {
  name: 'John Doe',
  balance: 1500,
  async deduct(amount)  {
   await sleep(2000);
   this.balance = this.balance - amount;
        return  `${this.name} has a balance of $${this.balance}`;
  }
}


john.deduct(200).then(console.log);

let p = new Promise ((resolve, reject) => {
    let result = 1+2
    if (result == 2) {
        resolve("1+1 is 2")
    } else {
        reject("Result is not 2.")
    }
})

p.then(message => {
    console.log(message)
}).catch(message => {
    console.log(message)
})
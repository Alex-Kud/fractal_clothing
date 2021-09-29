let canvas = document.getElementById("MyCanvas");
let ctx = canvas.getContext("2d");
// Установка размеров холста
canvas.width  = 0.4*window.innerWidth;
canvas.height = 0.85*window.innerHeight;

let type_clothes = "Pictures/clothes/futbolka.png"; // тип одежды
let img = new Image();
// ФРАКТАЛ МАНДЕЛЬБРОТА
class Mandelbrot {
    constructor() {
        this.width  = 0.4*window.innerWidth;
        this.height = 0.85*window.innerHeight;
        this.img    = ctx.getImageData(0, 0, 0.4*window.innerWidth, 0.85*window.innerHeight);
        // Первоначальные значения
        this.x0 = -0.75;
        this.y0 = 0;
        this.ms = 6 / window.innerWidth;
		this.palette();
        this.redraw();
        // Регистрация событий
        canvas.onclick = function(e) { this.click(e); }.bind(this);
        window.onkeydown   = function(e) { this.click(e); }.bind(this);
		document.getElementById("b1").onclick = function() {
			this.ms/=1.5;
			this.redraw(); 
		}.bind(this);
		document.getElementById("b2").onclick = function() { 
			this.ms*=1.5;
			this.redraw(); 
		}.bind(this);
		// событие перерисовки при изменении цвета
		for (let i = 1; i <= 3; ++i){
			document.getElementById("color_"+i).addEventListener("change",function(e){
				this.palette();
				this.redraw(); 
			}.bind(this))
		}
		this.flag; // Нужно ли менять цвет центра?
 		// событие перерисовки при изменении цвета центра
		document.getElementById("internally").onclick = function() { 
			if (document.getElementById("internally").checked)
				this.flag = true;
			else 
				this.flag = false;
			this.redraw(); 
		}.bind(this);
    }
    // Генератор палитры
    palette() {
		// Считывание значение цветов палитры в переменные
		let e1 = this.hexToRgb(document.getElementById("color_1").value)[0];
		let e2 = this.hexToRgb(document.getElementById("color_1").value)[1];
		let e3 = this.hexToRgb(document.getElementById("color_1").value)[2];
		let e4 = this.hexToRgb(document.getElementById("color_2").value)[0];
		let e5 = this.hexToRgb(document.getElementById("color_2").value)[1];
		let e6 = this.hexToRgb(document.getElementById("color_2").value)[2];
		let e7 = this.hexToRgb(document.getElementById("color_3").value)[0];
		let e8 = this.hexToRgb(document.getElementById("color_3").value)[1];
		let e9 = this.hexToRgb(document.getElementById("color_3").value)[2];
		
        let pal = [	[0, e1, e2, e3],
					[128, e4, e5, e6],
					[255, e7, e8, e9]];
        this.palbank = {};
        for (let i = 0; i < pal.length - 1; i++) {
            // Соседние цвета и расстрояние между ними
            let a = pal[i], b = pal[i + 1];
            // Вычисление интерполяции
            for (let j = a[0]; j < b[0]; j++) {
                let t = (j - a[0]) / (b[0] - a[0]); // t = 0..1
                let [r_, g_, b_] = [
                    Math.floor(a[1]*(1-t) + b[1]*t),
                    Math.floor(a[2]*(1-t) + b[2]*t),
                    Math.floor(a[3]*(1-t) + b[3]*t)
                ];
                this.palbank[j] = r_*65536 + g_*256 + b_;
            }
        }
    }
	//Перевод из hex в RGB
	hexToRgb(hex) {
		console.log (hex);
	  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	  if(result){
		  let arr=[3];
		  arr[0] = parseInt(result[1], 16);
		  arr[1] = parseInt(result[2], 16);
		  arr[2] = parseInt(result[3], 16);
		  return arr;
	  } 
	  return null;
	}
    // Перерисовать окно
    redraw() {
        let [w2, h2] = [this.width/2, this.height/2];
 
        // Сам фрактал
        for (let y = 0; y < this.height; y++){
			for (let x = 0; x < this.width; x++) {
	 
				let [ax, bx] = [x - w2, y - h2];
				ax = ax*this.ms + this.x0;
				bx = bx*this.ms + this.y0;

				let cl = this.mandel(ax, bx);
				this.pset(x, y, this.palbank[cl]);
			}
		}
		// Обновление экрана
        ctx.putImageData(this.img, 0, 0);
		imag();
    }
    // Вычисление фрактала Мандельброта
    mandel(x, y) {
		let max = 255;
		if (this.flag) max = 254; // Для закрашивания центра
        let [cx, cy] = [x, y];
        for (let i = 0; i <= max; i++) {
            if (x*x + y*y > 4) return i;
            let x_ = x*x - y*y + cx;
            let y_ = 2*x*y     + cy;
            [x, y] = [x_, y_];
        }
        return max;
    }
    // Рисование пикселя на экране
    pset(x, y, k) {
        let p = 4*(x + y * this.width);
        this.img.data[p    ] =  (k >> 16) & 0xff;
        this.img.data[p + 1] =  (k >>  8) & 0xff;
        this.img.data[p + 2] =  (k      ) & 0xff;
        this.img.data[p + 3] = ((k >> 24) & 0xff) ^ 0xff;
    }
    // Нажатие на область
    click(e) {
        if (e instanceof KeyboardEvent) {
            if (e.key == '+') {this.ms /= 1.5; this.redraw();}
            else if (e.key == '-') {this.ms *= 1.5; this.redraw();}
        } 
		else if (e instanceof MouseEvent) {
            let xn = (event.offsetX - this.width  / 2),
                yn = (event.offsetY - this.height / 2);
            this.x0 += xn * this.ms;
            this.y0 += yn * this.ms;
			this.redraw();
        }
    }
}

mandelbrot = new Mandelbrot;
// Обработка выбора типа одежды
function type_cl(type){
	type_clothes = type;
	mandelbrot.redraw();
}
// Для отрисовки в канвасе трафарета одежды
function imag(){
	img.src = type_clothes; // Назначение путь до картинки
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);	// Отслеживание события загрузки изображения
	img.addEventListener('load', function() {
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);	// Вывод картинки
	});
}
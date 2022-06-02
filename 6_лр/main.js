let arrProizvod = [];
let e;
let n; //кол-во точек на интервале
let arrX = [];
let arrProizvodTr = [];
let arrXTr = [];
let a = 1,
    b = 3;
const button = document.querySelector('.btn');
button.addEventListener('click', function () {
    document.getElementById('inp_rect').value = '';
    document.getElementById('inp_trap').value = '';
    document.getElementById('inp_simp').value = '';
    e = Number(document.getElementById('inp_e').value);
    console.log(e);
    if (e == '') {
        alert('Заполните поле');
    }
    if (e >= 1) {
        alert('Точность вычислений должна быть меньше 1!');
        return;
    }
    RectangleMethod(e);
    TrapezoidMethod(e);
    SimpsonMethod(e);
});
function getFirstProizvod(x) {
    let one = Math.sqrt(Math.pow(Math.cos(x), 2) + 1);
    let two = Math.pow(x - 5, 2);
    let three = Math.cos(x) * Math.sin(x);
    let four = (x - 5) * one;
    return one / two + three / four;
}
function getSecondProizvod(x) {
    let part1 =
        Math.pow(Math.cos(x), 2) /
        ((x - 5) * Math.sqrt(Math.pow(Math.cos(x), 2) + 1));
    let part2 =
        (2 * Math.sqrt(Math.pow(Math.cos(x), 2) + 1)) / Math.pow(x - 5, 3);
    let part3 =
        Math.pow(Math.sin(x), 2) /
        ((x - 5) * Math.sqrt(Math.pow(Math.cos(x), 2) + 1));
    let part4 =
        (Math.pow(Math.cos(x), 2) * Math.pow(Math.sin(x), 2)) /
        ((x - 5) * Math.pow(Math.pow(Math.cos(x), 2) + 1, 3 / 2));
    let part5 =
        (2 * Math.cos(x) * Math.sin(x)) /
        (Math.pow(x - 5, 2) * Math.sqrt(Math.pow(Math.cos(x), 2) + 1));

    return part1 - part2 - part3 + part4 - part5;
}
function F(x) {
    return Math.sqrt(1 + Math.pow(Math.cos(x), 2)) / (5 - x);
}
function FindH(n) {
    return (b - a) / n;
}
//------------------------- Метод прямоугольников --------------------------
function RectangleMethod(e) {
    arrX = [];
    arrProizvod = [];
    n = 1;
    h = FindH(n);
    for (let i = 0; i < n + 1; i++) {
        arrX[i] = a + i * h;
    }
    for (let i = 0; i < n + 1; i++) {
        arrProizvod[i] = getFirstProizvod(arrX[i]);
    }
    let MaxPr = Math.max(...arrProizvod);
    let res = ((b - a) / 2) * h * MaxPr;
    while (res > e) {
        arrX = [];
        arrProizvod = [];
        n = n + 1;
        h = FindH(n);
        for (let i = 0; i < n + 1; i++) {
            arrX[i] = a + i * h;
        }
        for (let i = 0; i < n + 1; i++) {
            arrProizvod[i] = getFirstProizvod(arrX[i]);
        }
        MaxPr = Math.abs(Math.max(...arrProizvod));
        res = ((b - a) / 2) * h * MaxPr;
    }
    console.log(res);
    let sum = 0;
    for (let i = 0; i < n; i++) {
        sum += F(arrX[i]);
    }
    let integr = h * sum;
    console.log('Результат прямоугольников: ', integr);
    console.log('h ', h);
    console.log(n);
    document.getElementById('inp_rect').value = integr;
}
let nt;
//------------------------ Метод трапеций ----------------------
function TrapezoidMethod(e) {
    arrProizvodTr = [];
    arrXTr = [];
    nt = 1;
    h = FindH(nt);
    for (let i = 0; i < nt + 1; i++) {
        arrXTr[i] = a + i * h;
    }
    for (let i = 0; i < nt + 1; i++) {
        arrProizvodTr[i] = getSecondProizvod(arrXTr[i]);
    }
    let MaxPr = Math.abs(Math.max(...arrProizvodTr));
    let res = ((b - a) / 12) * Math.pow(h, 2) * MaxPr;
    console.log('res', res);
    while (res > e) {
        arrXTr = [];
        arrProizvodTr = [];
        nt = nt + 1;
        h = FindH(nt);
        for (let i = 0; i < nt + 1; i++) {
            arrXTr[i] = a + i * h;
        }
        for (let i = 0; i < nt + 1; i++) {
            arrProizvodTr[i] = getSecondProizvod(arrXTr[i]);
        }
        MaxPr = Math.abs(Math.max(...arrProizvodTr));
        res = ((b - a) / 12) * Math.pow(h, 2) * MaxPr;
    }
    console.log(res);
    let sum = 0;
    sum = (F(arrXTr[0]) + F(arrXTr[nt - 1])) / 2;
    for (let i = 1; i < nt; i++) {
        sum += F(arrXTr[i]);
    }
    let integr = h * sum;
    console.log('Результат трапеций: ', integr);
    console.log('h ', h);
    console.log(nt);
    document.getElementById('inp_trap').value = integr;
}
//----------------------- Метод Симпсона ---------------------
function SimpsonMethod(e) {
    let n = 10,
        lastRes = 0,
        res = 10000000000000;
    while (Math.abs(lastRes - res) > e) {
        lastRes = res;
        let h = (b - a) / n;

        res = F(a) + F(b);
        for (let i = 0; i < n; i++) {
            res += 4 * F(a + h * i);
        }
        for (let i = 1; i < n; i++) {
            res += 2 * F(a + h * i);
        }
        res *= h / 6;
        n *= 2;
    }
    console.log(res);
    document.getElementById('inp_simp').value = res;
}

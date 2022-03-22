let koefValueChisl = [];
let koefValueZnam = [];
let chisloLength;
let znamLength;
let testInps = document.getElementById('test');
let testInps2 = document.getElementById('test1');
let getN = document.getElementById('getN');
let inpChisl = document.getElementById('inp_koefV');
let inpZnam = document.getElementById('inp_koefN');
//--------------- вычисление экспоненты --------------------------------
let sum = 0;
let k = 1;
let res = 1; //u0
function exp(s, k, res) {
    let newRes;

    if (Math.abs(res) > 0.00000001) {
        sum += res;
        newRes = (s / k) * res;
        k++;
        exp(s, k, newRes);
    }
    return sum;
}
//----------------- вычисление синуса --------------------
let sumSin = 0;
function findSin(x, k, result) {
    let newRes;
    if (Math.abs(result) > 0.00000001) {
        sumSin += result;
        newRes = (-(x * x) / (2 * k * (2 * k + 1))) * result;
        k++;
        findSin(x, k, newRes);
    }
    return sumSin;
}
let newRes;

// вычисление многочлена по схеме Горнера
function getPt(res, x, a, n, k) {
    if (k < n) {
        newRes = res * x + a[k + 1];
        console.log(newRes);
        console.log('a= ', a[k], a[k + 1]);
        k++;
        getPt(newRes, x, a, n, k);
    }
    return Number(newRes);
}
// событие для кнопки Рассчитать
findRes.addEventListener('click', () => {
    koefValueChisl = [];
    koefValueZnam = [];
    let t = Number(document.getElementById('inp_t').value);
    let x = Number(document.getElementById('inp_x').value);
    let a = Number(document.getElementById('inp_a').value);
    let result = x;
    let sin = findSin(x, k, result);

    document.getElementById('res_sin').value = sin.toFixed(8);
    document.getElementById('res_e').value = exp(0.25, k, res).toFixed(8);
    document.getElementById('res_sindr').value = (a / sin).toFixed(8);
    getValueInp();
    let res1 = getPt(
        koefValueChisl[0],
        t,
        koefValueChisl,
        koefValueChisl.length - 1,
        0
    );
    console.log(res1);
    document.getElementById('res_V').value =
        Math.round(res1 * 100000000) / 100000000;

    let res2 = getPt(
        koefValueZnam[0],
        t,
        koefValueZnam,
        koefValueZnam.length - 1,
        0
    );
    console.log(res2);
    document.getElementById('res_N').value =
        Math.round(res2 * 100000000) / 100000000;
    let R = res1 / res2;
    console.log(res1);
    console.log(res2);
    document.getElementById('res_R').value =
        Math.round(R * 100000000) / 100000000;
});

// событие для кнопки Ввести
getN.addEventListener('click', () => {
    document.getElementById('text_k1').style.display = 'block';
    document.getElementById('text_k2').style.display = 'block';
    generateInps(inpChisl.value, testInps, 'ch');
    chisloLength = Number(inpChisl.value);
    generateInps(inpZnam.value, testInps2, 'zn');
    znamLength = Number(inpZnam.value);
});
// генерация полей для ввода коэффициентов
function generateInps(n, cont, tagId) {
    for (let i = 0; i < n; i++) {
        let newElem = document.createElement('input');
        newElem.type = 'number';
        newElem.id = `inp${i}${tagId}`;
        cont.appendChild(newElem);
    }
}
// получение значений коэффициентов
function getValueInp() {
    console.log(chisloLength);
    console.log(document.getElementById(`inp0ch`).value);
    for (let i = 0; i < chisloLength; i++) {
        koefValueChisl.push(Number(document.getElementById(`inp${i}ch`).value));
    }
    console.log(koefValueChisl);
    for (let i = 0; i < znamLength; i++) {
        koefValueZnam.push(Number(document.getElementById(`inp${i}zn`).value));
    }
    console.log(koefValueZnam);
}

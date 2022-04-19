let flag = true;
let but = document.getElementById('find');
let results = document.getElementById('res-block');
let N, min, max;
but.addEventListener('click', () => {
    min = Number(document.getElementById('min_interval').value);
    N = Number(document.getElementById('num').value);
    max = Number(document.getElementById('max_interval').value);
    let uravnenie = [];
    let arrayForB = [];

    ///заполнение исходной матрицы
    for (let i = 0; i < N; i++) {
        let array = [];
        for (let j = 0; j < N + 1; j++) {
            let rand = Math.floor(Math.random() * (max - min + 1)) + min;
            if (rand == 0 && i == j) continue;
            array.push(rand);
        }
        uravnenie.push(array);
    }
    ///копирование исходной матрицы для дальнейшей работы с ней
    arrayForB = copyArray(uravnenie);
    console.log(arrayForB);
    console.log(arrayForB.length);
    let firstArr = copyArray(uravnenie);

    //решение системы
    let resX = findSLAU(firstArr, N, true);
    print_res(resX);
    //   console.log("Результат: ", resX);
    let counterz = 0;
    while (flag == true && counterz != N) {
        let nev = vectN(firstArr, resX, N);
        let popr = vectPopr(firstArr, nev, N);
        results.append('Поправки:');
        print_res(popr);
        for (let i = 0; i < N; i++) {
            resX[i] = resX[i] + popr[i];
        }
        for (let i = 0; i < N; i++) {
            console.log('popr:', popr[i].toFixed(20));
            if (Number(popr[i].toFixed(20)) > Math.pow(10, -15)) {
                flag = true;
                counterz = 0;
                break;
            }
            if (Number(popr[i].toFixed(20)) < Math.pow(10, -15)) {
                counterz++;
                flag = false;
            }
        }
    }
});

function copyArray(arrayToCopy) {
    let arrayIn = [];
    for (let i = 0; i < arrayToCopy.length; i++) {
        let array = [];
        for (let j = 0; j < arrayToCopy.length + 1; j++) {
            array.push(arrayToCopy[i][j]);
        }
        arrayIn.push(array);
    }
    return arrayIn;
}

function print(array) {
    let mainStr = '';
    for (let i = 0; i < array.length; i++) {
        let stroka = '';
        let koef = 1;
        for (let j = 0; j < array.length + 1; j++) {
            if (j < array.length) {
                stroka +=
                    array[i][j] +
                    '*x' +
                    koef +
                    (array[i][j + 1] > 0 ? ' + ' : '   ');
                koef++;
            } else {
                stroka = stroka.slice(0, -2);
                stroka += '= ' + array[i][j]; //.toFixed(20);
            }
        }
        mainStr += stroka + '<br/>';
    }
    console.log(mainStr);
    let newResults = document.createElement('div');
    let test = document.createElement('div');
    test.className = 'test';
    test.innerHTML = mainStr;
    newResults.append(test);
    results.append(newResults);
}

//решение СЛАУ
function findSLAU(uravnenie, n, fl) {
    let arrayForChange = copyArray(uravnenie);
    let a;
    for (let i = 0; i < n; i++) {
        if (fl == true) {
            print(arrayForChange);
        }

        a = arrayForChange[i][i];
        for (let j = n; j >= i; j--) {
            arrayForChange[i][j] = arrayForChange[i][j] / a;
        }
        for (let j = i + 1; j < n; j++) {
            if (fl == true) {
                print(arrayForChange);
            }
            a = arrayForChange[j][i];
            for (let k = n; k >= i; k--) {
                arrayForChange[j][k] =
                    arrayForChange[j][k] - a * arrayForChange[i][k];
            }
        }
    }
    let array = [];
    array[N - 1] = arrayForChange[N - 1][N];
    for (let i = n - 2; i >= 0; i--) {
        array[i] = arrayForChange[i][n];
        a = arrayForChange[i][n];
        for (let j = i + 1; j < n; j++) {
            array[i] = array[i] - arrayForChange[i][j] * array[j];
        }
    }
    return array;
}

function vectN(uravnenie, array, n) {
    let B = []; //вектор свободных членов
    let sum;
    for (let i = 0; i < n; i++) {
        sum = 0;
        for (let j = 0; j < n; j++) {
            sum += uravnenie[i][j] * array[j];
        }
        B.push(sum);
    }
    let nevyazka = []; //вектор невязок
    for (let i = 0; i < n; i++) {
        let r = uravnenie[i][n] - B[i];
        nevyazka.push(r);
    }
    console.log('Невязка: ', nevyazka);
    print_nev(nevyazka);
    return nevyazka;
}

function vectPopr(uravnenie, nevyazka, n) {
    let newMatrix = [];
    for (let i = 0; i < n; i++) {
        let array = [];
        for (let j = 0; j < n + 1; j++) {
            if (j < n) {
                array.push(uravnenie[i][j]);
            } else {
                array.push(nevyazka[i]);
            }
        }
        newMatrix.push(array);
    }
    console.log(newMatrix);
    return findSLAU(newMatrix, n, false);
}

function print_res(array) {
    let koef = 1;
    for (let i = 0; i < array.length; i++) {
        str = 'x' + koef + ' = ' + array[i].toFixed(20); //.toFixed(20);
        let newResults = document.createElement('div');
        newResults.innerHTML = str;
        results.append(newResults);
        koef++;
    }
}
function print_nev(array) {
    let koef = 1;
    let title = document.createElement('div');
    title.innerHTML = 'Невязки:';
    results.append(title);
    for (let i = 0; i < array.length; i++) {
        let newResults = document.createElement('div');
        if (array[i] == 0) newResults.innerHTML = array[i];
        else newResults.innerHTML = array[i].toFixed(25);
        results.append(newResults);
        koef++;
    }
    // console.log(array);
}

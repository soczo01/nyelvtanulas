const szavak = [
    { magyar: "alma", angol: "apple" },
    { magyar: "ház", angol: "house" },
    { magyar: "kutya", angol: "dog" },
    { magyar: "macska", angol: "cat" },
    { magyar: "asztal", angol: "table" }
];

let kivalasztottMagyar = null;
let kivalasztottAngol = null;

let sikeresProba = 0;
let sikertelenProba = 0;

function kever(array) {
    return array.sort(() => Math.random() - 0.5);
}

function szoElemLetrehoz(szo, oszlop, nyelv) {
    const szoElem = document.createElement('div');
    szoElem.classList.add('szo');
    szoElem.textContent = szo;
    szoElem.dataset.nyelv = nyelv;
    szoElem.addEventListener('click', () => szoKattintas(szoElem));
    document.getElementById(oszlop).appendChild(szoElem);
}

function szoKattintas(elem) {
    const nyelv = elem.dataset.nyelv;

    if (nyelv === 'magyar') {
        if (kivalasztottMagyar) kivalasztottMagyar.classList.remove('kivalasztott');
        kivalasztottMagyar = elem;
    } else if (nyelv === 'angol') {
        if (kivalasztottAngol) kivalasztottAngol.classList.remove('kivalasztott');
        kivalasztottAngol = elem;
    }

    elem.classList.add('kivalasztott');

    if (kivalasztottMagyar && kivalasztottAngol) {
        ellenorizPar();
    }
}

function ellenorizPar() {
    const magyarSzo = kivalasztottMagyar.textContent;
    const angolSzo = kivalasztottAngol.textContent;

    const helyesPar = szavak.find(szo => szo.magyar === magyarSzo && szo.angol === angolSzo);

    if (helyesPar) {
        kivalasztottMagyar.classList.add('helyes');
        kivalasztottAngol.classList.add('helyes');
        sikeresProba++;
        document.getElementById('sikeres-szamlalo').textContent = sikeresProba;
    } else {
        kivalasztottMagyar.classList.add('helytelen');
        kivalasztottAngol.classList.add('helytelen');
        sikertelenProba++;
        document.getElementById('sikertelen-szamlalo').textContent = sikertelenProba;

        setTimeout(() => {
            kivalasztottMagyar.classList.remove('helytelen');
            kivalasztottAngol.classList.remove('helytelen');

       
            kivalasztottMagyar.classList.remove('kivalasztott');
            kivalasztottAngol.classList.remove('kivalasztott');

 
            kivalasztottMagyar = null;
            kivalasztottAngol = null;
        }, 700);
        return;
    }

    setTimeout(() => {
        kivalasztottMagyar.classList.remove('kivalasztott');
        kivalasztottAngol.classList.remove('kivalasztott');
        kivalasztottMagyar = null;
        kivalasztottAngol = null;
    }, 300);
}

document.getElementById('start').addEventListener('click', () => {
    document.getElementById('bal-oszlop').innerHTML = '';
    document.getElementById('jobb-oszlop').innerHTML = '';

    sikeresProba = 0;
    sikertelenProba = 0;
    document.getElementById('sikeres-szamlalo').textContent = sikeresProba;
    document.getElementById('sikertelen-szamlalo').textContent = sikertelenProba;

    const magyarSzavak = szavak.map(szo => szo.magyar);
    const angolSzavak = szavak.map(szo => szo.angol);

    const kevertMagyarSzavak = kever(magyarSzavak);
    const kevertAngolSzavak = kever(angolSzavak);

    kevertMagyarSzavak.forEach(szo => szoElemLetrehoz(szo, 'bal-oszlop', 'magyar'));
    kevertAngolSzavak.forEach(szo => szoElemLetrehoz(szo, 'jobb-oszlop', 'angol'));
});

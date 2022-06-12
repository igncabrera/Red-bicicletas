var total = 0

function calcular(){
    var oneSix = (document.getElementById('1/6').value)*4725
    var twoSix = (document.getElementById('2/6').value)*4500
    var threeSix = (document.getElementById('3/6').value)*4275
    var fourSix = (document.getElementById('4/6').value)*4050
    var fiveSix = (document.getElementById('5/6').value)*3825
    var sixSix = (document.getElementById('6/6').value)*3600

    total = oneSix + twoSix + threeSix + fourSix + fiveSix + sixSix
}

function resultado(){
    calcular()
    document.getElementById('total').innerHTML = (total)/75
}


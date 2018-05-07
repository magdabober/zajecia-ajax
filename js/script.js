//definicja funkcji ajax - dwuparametrowa funkcja

function ajax(method, url) {
    
//    tworzymy instancje obiektu XMLHttpRequest
    
    let httpReq = new XMLHttpRequest(); 
    
//    otieramy polaczenie z serwerem
    httpReq.open(method,url);
    
//    jesli status polaczenia zostal zmieniony ->httpReq.readyState
//    0:polaczenie nie nawiazane
//    1:polaczenie nawiazane
//    2:zadanie odebrane
//    3:przetwarzanie
//    4:dane zwrocone i gotowe do uzycia
    
    httpReq.onreadystatechange = function () {
//        jezeli 4:dane zwrocone do uzycia
        
        if(httpReq.readyState == 4) {
//            sprawdzamy kod statusu polaczenia-200 ok
            if(httpReq.status == 200) {
                
//                nowa zmienna. ktora bedzie przetrzymywac dane
                let returnData = httpReq.responseText;
//                dodajemy metode do obiektu
                httpReq.onsuccess(returnData);
                
                httpReq = null;
            }
        }
    }
    
    httpReq.onsuccess = function(response) {
//        tworzymy nowa zmienna,ktora text przetworzy do formatu JSON
        let jsonObj = JSON.parse(response);
        console.log(jsonObj.userId);
        
//        1.tworze nowy element (paragraf)
//        2.ustawiam atrybut klasy dla nowego elementi (klasa='nowa')
//        3.ustawiamy tekst html w nowym elemencie(innerText/innerHTML)
//        4.wstawiam element do html
        
        let paragraf = document.createElement('p');
        paragraf.setAttribute('class', 'nowa');
        paragraf.innerText = jsonObj.userId;
        document.body.appendChild(paragraf);  
    }
//    wysylanie zadania do serwera
    httpReq.send();
}

//wywolanie funkcji
ajax('GET', 'http://echo.jsontest.com/userId/108/userName/Akademia108/userURL/akademia108.pl');
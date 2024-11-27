import API from "./api.js"
import UI from "./ui.js"


// Class'in ornegini alacagiz (methodlari kullanabilmek icin)
const api = new API();
const ui = new UI();



// sayfa yuklendigi anda Api'den populafr muzikleri al ve ekrana bas
document.addEventListener("DOMContentLoaded", async () => {
    
    // ekrana loader bas
    ui.renderLoader()
  
    // api isteği at
    api
      .getPopular()
      // ekrana kartları bas
      .then((data) => ui.renderCards(data))
      .catch((err) => {
        console.log(err);
        alert("Üzgünüz bir sorun oluştu");
      });
  });

  // formdan birsey aratildiginda API'den aratilan kelimeye uygun sonuclari al ve renderla
  ui.form.addEventListener("submit", (e) => {
// sayfayu yenilemeyi engelle
 e.preventDefault()

// aratilan kelimeye eris
    const query = e.target[0].value

// aratilan kelime bossa fonksiyonu durdur
if(query.trim() === "") return alert("Lütfen geçerli bir metin aratın")

 

    // ekrana loader i bas
    ui.renderLoader();

    // basligi guncelle
    ui.updateTitle(query +  " için sonuçlar")

    // api den verileri al
    api
    .searchMusic(query)
    .then((data) => ui.renderCards(data))
    .catch((err) => {
        console.log(err);
        alert("Üzgünz bir sorun oluştu");
    })
  })

// liste alanindaki tiklama olaylsarini izle ve 
ui.list.addEventListener("click", (e) => {
  //eger oynat butonuna tiklanirsa o sarkiyi oynat

  if (e.target.className === "play"){
    // oynatilacak sarkinin kartina eris
  const card = e.target.closest(".card");
  

    // oynatilacak sarkinin bilgilerini al 
    const data = card.dataset;


    // player alanini tekrar renderla (Ekrana bas)
    ui.renderPlayer(data)
  }
})



// sarkinin baslama ve durma olaylarini izleyelim
//ui.audio.addEventListener("play", () => console.log("selam"))
//ui.audio.addEventListener("pause", () => console.log("durdu"))

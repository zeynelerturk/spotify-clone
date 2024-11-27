/// Api URL'i
const url = 'https://shazam.p.rapidapi.com/search?term=tarkan&locale=en-US';
//&offset=0&limit=5


// Gonderilmesi gereken headerlar 
const options = {
    method: "GET",
    headers: {
        'x-rapidapi-key': '3f82812e6emsh98d83c374343c96p19de6fjsn302485d73c70',
        'x-rapidapi-host': 'shazam.p.rapidapi.com'
    }

}


// Fonksiyonlarin bir arada tutulmasi icin class yapisini tercih edildi

export default class API {
    // popular muzikleri getirecek
    async getPopular() {
        // bu return fonksiyonu API ye gereksiz yere istek atmamak icin eklendi 
        //! Ekrani doldurmak icin daha fazla istek aatilacak sonra 
        const data1 = await this.searchMusic("sezen")
        const data2 = await this.searchMusic("tarkan")
        //const data2 = await this.searchMusic("tarkan")
        return [...data1, ...data2]
        //const res = await fetch(url, options)
        //const data = await res.json()
        // api'dan gelen cevabi daha iyi  bir formata cevirdik
        //const formatted = data.tracks.hits.map((item) => item.track)
        // fonksiyonun cagrildigi yere veriyi dondurelim
        //return formatted;
    }

    // aratilan kelimeye gore sonuclari getirecek
    async searchMusic(query) { 
        // term parametresini dinamik olarak belirledik
        const url =
        `https://shazam.p.rapidapi.com/search?term=${query}&locale=en`;
        //-US&offset=0&limit=5
        // api istegini at - gelen cevabi isle 
     const res =  await fetch(url, options)
     const data = await res.json()

     // veriyi formatladik
     const formatted = data.tracks.hits.map((item) => item.track)
     // Fonksiyonun cagrildigi yere dondurduk
     return formatted
    }
}


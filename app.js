document.addEventListener('DOMContentLoaded', () => {
  const kotak = document.querySelectorAll('.grid div')
  const tampilanSkor = document.querySelector('span')
  const tombolMulai = document.querySelector('.mulai')

  const lebar = 10
  let indeksAwal = 0
  let indeksApel = 0
  let arusUlar = [2,1,0] 
  let arah = 1
  let skor = 0
  let kecepatan = 0.9
  let selangWaktu = 0
  let interval = 0


  //untuk memulai, dan memulai kembali permainan
  function mulaiGame() {
    arusUlar.forEach(index => kotak[index].classList.remove('ular'))
    kotak[indeksApel].classList.remove('apel')
    clearInterval(interval)
    skor = 0
    acakApel()
    arah = 1
    tampilanSkor.innerText = skor
    selangWaktu = 1000
    arusUlar = [2,1,0]
    indeksAwal = 0
    arusUlar.forEach(index => kotak[index].classList.add('ular'))
    interval = setInterval(gerakUlar, selangWaktu)
  }


  //fungsi yang berhubungan dengan SEMUA hasil akhir dari Ular
  function gerakUlar() {

    //kondisi ketika ular menabrak perbatasan dan ular menabrak diri sendiri
    if (
      (arusUlar[0] + lebar >= (lebar * lebar) && arah === lebar ) || //jika ular menyentuh dasar
      (arusUlar[0] % lebar === lebar -1 && arah === 1) || //jika ular menabrak dinding kanan
      (arusUlar[0] % lebar === 0 && arah === -1) || //jika ular menabrak dinding kiri
      (arusUlar[0] - lebar < 0 && arah === -lebar) ||  //jika ular menyentuh puncak
      kotak[arusUlar[0] + arah].classList.contains('ular') //jika ular masuk ke dirinya sendiri
    ) {
      return clearInterval(interval) //ini akan menghapus interval jika salah satu di atas terjadi
    }

    const ekor = arusUlar.pop() //menghapus yang terakhir dari array dan menunjukkannya
    kotak[ekor].classList.remove('ular')  //menghapus kelas ular dari EKOR
    arusUlar.unshift(arusUlar[0] + arah) //memberikan arah ke kepala array

    //kondisi ketika ular memakan apel
    if(kotak[arusUlar[0]].classList.contains('apel')) {
      kotak[arusUlar[0]].classList.remove('apel')
      kotak[ekor].classList.add('ular')
      arusUlar.push(ekor)
      acakApel()
      skor++
      tampilanSkor.textContent = skor
      clearInterval(interval)
      selangWaktu = selangWaktu * kecepatan
      interval = setInterval(gerakUlar, selangWaktu)
    }
    kotak[arusUlar[0]].classList.add('ular')
  }


  //menghasilkan apel baru setelah apel dimakan
  function acakApel() {
    do{
      indeksApel = Math.floor(Math.random() * kotak.length)
    } while(kotak[indeksApel].classList.contains('ular')) //memastikan apel tidak muncul di ular
    kotak[indeksApel].classList.add('apel')
  }


  //assign fungsi ke keyCode
  function kontrol(e) {
    kotak[indeksAwal].classList.remove('ular')

    if(e.keyCode === 39) {
      arah = 1 //jika kita menekan panah kanan pada keyboard kita, ular akan bergerak ke kanan
    } else if (e.keyCode === 38) {
      arah = -lebar //jika kita menekan panah atas, ular itu akan kembali sepuluh div, tampak naik
    } else if (e.keyCode === 37) {
      arah = -1 //jika kita tekan kiri, ular akan ke kiri satu div
    } else if (e.keyCode === 40) {
      arah = +lebar //jika kita menekan ke bawah, kepala ular akan langsung muncul di div sepuluh div dari tempat Anda sekarang
    }
  }

  document.addEventListener('keyup', kontrol)
  tombolMulai.addEventListener('click', mulaiGame)
})

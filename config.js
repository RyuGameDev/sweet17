/**
 * ====================================================================
 * KONFIGURASI WEB BIRTHDAY / ULANG TAHUN (SWEET SEVENTEEN SPECIAL)
 * ====================================================================
 * Kamu bisa dengan mudah mengubah tulisan, tanggal, foto, lagu, dan video
 * di file ini sesuai keinginanmu.
 */

window.HBD_CONFIG = {
  // ------------------------------------------------------------------
  // 1. PENGATURAN HITUNG MUNDUR (COUNTDOWN)
  // ------------------------------------------------------------------
  // Pilihan countdownMode:
  // "seconds"     -> Hitung mundur beberapa detik saja (cocok untuk testing/preview cepat)
  // "target_date" -> Hitung mundur sampai tanggal & jam ulang tahun sebenarnya
  countdownMode: "seconds",
  countdownSeconds: 5, // Durasi detik jika pakai mode "seconds"

  // Tanggal target jika pakai mode "target_date" (Format: TAHUN-BULAN-TANGGAL T JAM:MENIT:DETIK)
  // Contoh: "2026-10-10T00:00:00"
  targetDate: "2026-10-10T00:00:00",

  // Teks pada Layar Hitung Mundur
  countdownTag: "✧ MENGHITUNG HARI • SWEET 17 ✧",
  countdownTitleLine1: "Her Special Day",
  countdownTitleLine2: "is Coming",
  countdownSubtitle: "Sesuatu yang indah sedang menunggu untukmu ✨",
  countdownWaitingText: "⏳ Beberapa detik lagi... ⏳",
  countdownLockedButton: "TUNGGU SAMPAI WAKTUNYA 🔒",
  countdownReadyText: "🎉 Happy Sweet Seventeen, Sayang! 🎉",
  countdownOpenButton: "✨ BUKA HADIAH ✨",

  // ------------------------------------------------------------------
  // 2. KOTAK HADIAH (GIFT BOX)
  // ------------------------------------------------------------------
  giftTag: "✧ ADA SESUATU UNTUKMU ✧",
  giftHint: "✨ Klik untuk membuka hadiahmu ✨",

  // ------------------------------------------------------------------
  // 3. COVER HALAMAN SPESIAL
  // ------------------------------------------------------------------
  coverTag: "✧ SWEET SEVENTEEN SPECIAL ✧",
  coverTitle1: "Your",
  coverTitle2: "Special Day",
  coverSubtitle: "Dibuat dengan cinta, khusus untukmu",
  coverButton: "✉ READ MY LETTER 💌",

  // ------------------------------------------------------------------
  // 4. SURAT CINTA / BIRTHDAY LETTER (EFEK TYPEWRITER)
  // ------------------------------------------------------------------
  letterTitle: "Happy Sweet 17",
  letterGreeting: "HAPPY SWEET SEVENTEEN SAYANGKUUU 🤍✨",
  letterParagraphs: [
    "Selamat ulang tahun yang ke-17 yaa NANAAA! Happy Sweet Seventeen! Hari ini hari yang spesial banget karena hari ini adalah hari lahir orang yang paling berarti di hidup ryuu.",
    "Terima kasih udah selalu ada, udah bikin hari-hari ryuu lebih bahagia, dan udah menjadi alasan ryuu tersenyum setiap hari. Ryu bersyukur banget bisa kenal dan punya Nanaa sampai sekarang.",
    "Di umur 17 tahun yang manis ini, Ryu cuma mau doain semoga semua hal baik selalu datang ke hidup sayang. Semoga sehat selalu, panjang umur, dimudahkan segala urusannya, dan semua impian sayang bisa tercapai satu per satu.",
    "Tetap jadi pribadi yang kuat, baik, dan tulus seperti sekarang ya. Jangan lupa kalau ryuu selalu ada buat Nanaa dalam keadaan apa pun.",
    "Sekali lagi, Happy Sweet Seventeen sayanggg. Semoga hari ini penuh kebahagiaan dan tahun ke-17 ini menjadi tahun terbaik untuk nanaa yaaa cantikuu.",
    "I love you, today, tomorrow, and always. 🤍"
  ],
  letterButton: "SWEET ALBUM ➜",

  // ------------------------------------------------------------------
  // 5. GALERI FOTO POLAROID (HER BEAUTIFUL MOMENTS)
  // ------------------------------------------------------------------
  // Delapan foto pilihan disimpan di assets/album/. Foto kiriman asli tetap ada.
  // position mengatur titik fokus di polaroid; fit: "contain" menampilkan foto utuh.
  memoriesTitle: "Her Beautiful Moments",
  memoriesSubtitle: "✧ every smile that brightens up my world ✧",
  photos: [
    { src: "assets/album/senyum-nanaa.jpg", caption: "The sweetest smile 🌷", alt: "Nanaa tersenyum dengan tangan di pipi dan bingkai hijau", position: "50% 42%" },
    { src: "assets/album/kacamata-nanaa.jpg", caption: "My favorite kind of magic ✨", alt: "Nanaa memakai kacamata dengan latar tirai cokelat", position: "55% 50%" },
    { src: "assets/album/bunga-nanaa.jpg", caption: "Pretty in every moment 🌸", alt: "Potret Nanaa dengan hiasan bunga di rambut", position: "50% 25%" },
    { src: "assets/album/tatapan-nanaa.jpg", caption: "My favorite view 🤍", alt: "Nanaa menatap kamera di depan dinding bata", position: "51% 50%" },
    { src: "assets/album/hati-nanaa.jpg", caption: "A little love, a little sparkle 💗", alt: "Nanaa dengan filter hati merah muda", position: "50% 42%" },
    { src: "assets/album/gemas-nanaa.jpg", caption: "Too cute to handle 🐾", alt: "Nanaa berpose dengan filter telinga dan hidung anjing", position: "50% 36%" },
    { src: "assets/album/piksel-nanaa.jpg", caption: "You make my days brighter ✨", alt: "Nanaa memakai filter kacamata piksel", position: "64% 50%" },
    { src: "assets/album/kolase-nanaa.jpg", caption: "Every version of you 🎀", alt: "Kolase empat potret Nanaa dengan jepit rambut", fit: "contain", position: "50% 50%" }
  ],
  memoriesButton: "A VIDEO FOR YOU ▶",

  // ------------------------------------------------------------------
  // 6. VIDEO PESAN KHUSUS (A MOMENT FOR YOU)
  // ------------------------------------------------------------------
  // Ganti video di "assets/video.mp4" dengan videomu sendiri
  videoTitle: "A Moment For You",
  videoSubtitle: "✧ a special sweet 17 video message ✧",
  videoSrc: "assets/video.mp4",
  videoButton: "BIRTHDAY WISHES ➜",

  // ------------------------------------------------------------------
  // 7. DOA & HARAPAN (BIRTHDAY WISHES)
  // ------------------------------------------------------------------
  wishesTitle: "Birthday Wishes",
  wishesSubtitle: "Happy Sweet Seventeen, my love 🤍",
  wishesText: "Happy Sweet Seventeen! I wish you endless happiness, good health, success, and beautiful blessings in your 17th chapter of life. May all your dreams come true, your days be filled with sweet joy, and your heart always find peace. Thank you for being such a wonderful part of my life. Stay happy, stay healthy, and keep shining. I love you always. 🤍",
  wishesButton: "ONE MORE THING ➜",

  // ------------------------------------------------------------------
  // 8. PENUTUP & JUDUL BERGANTIAN (FINAL CLOSING)
  // ------------------------------------------------------------------
  closingTitles: [
    "Happy Sweet 17 ✨",
    "Happy Birthday 🤍",
    "With All My Love 💖",
    "Always & Forever 🕊️"
  ],
  closingMessage1: "Thank you for being part of my life.",
  closingMessage2: "I hope this little gift can make your 17th birthday even more beautiful.",
  closingSignature: "Forever yours. 🤍",
  replayButton: "↺ REPLAY FROM START",

  // ------------------------------------------------------------------
  // 9. MUSIK LATAR (BACKGROUND MUSIC)
  // ------------------------------------------------------------------
  // Ganti file musik di "assets/music.mp3" dengan lagu favoritmu
  musicSrc: "assets/music.mp3",
  musicTitle: "All I Want",
  musicArtist: "Kodaline"
};

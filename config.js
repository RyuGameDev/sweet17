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
  countdownSeconds: 3, // Durasi detik jika pakai mode "seconds"

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
    "Selamat ulang tahun yang ke-17 yaa cinnnn! Happy Sweet Seventeen! Hari ini hari yang spesial banget karena hari ini adalah hari lahir orang yang paling berarti di hidupku.",
    "Terima kasih udah selalu ada, udah bikin hari-hariku lebih bahagia, dan udah menjadi alasan aku tersenyum setiap hari. Aku bersyukur banget bisa kenal dan punya sayang sampai sekarang.",
    "Di umur 17 tahun yang manis ini, aku cuma mau doain semoga semua hal baik selalu datang ke hidup sayang. Semoga sehat selalu, panjang umur, dimudahkan segala urusannya, dan semua impian sayang bisa tercapai satu per satu.",
    "Tetap jadi pribadi yang kuat, baik, dan tulus seperti sekarang ya. Jangan lupa kalau aku selalu ada buat sayang dalam keadaan apa pun.",
    "Sekali lagi, Happy Sweet Seventeen sayanggg. Semoga hari ini penuh kebahagiaan dan tahun ke-17 ini menjadi tahun terbaik untuk sayang.",
    "I love you, today, tomorrow, and always. 🤍"
  ],
  letterButton: "HER MOMENTS ➜",

  // ------------------------------------------------------------------
  // 5. GALERI FOTO POLAROID (HER BEAUTIFUL MOMENTS)
  // ------------------------------------------------------------------
  // Kamu cukup mengganti file foto di folder "assets/photo1.jpg", dst
  // atau ganti path file src di bawah ini.
  memoriesTitle: "Her Beautiful Moments",
  memoriesSubtitle: "✧ every smile that brightens up my world ✧",
  photos: [
    { src: "assets/photo1.jpg", caption: "The prettiest smile in the world ✨", date: "Sweet 17" },
    { src: "assets/photo2.jpg", caption: "Forever shining bright 🌸", date: "Sunshine" },
    { src: "assets/photo3.jpg", caption: "My favorite view every single day 🤍", date: "Pure Love" },
    { src: "assets/photo4.jpg", caption: "Too cute to handle 🎀", date: "Adorable" },
    { src: "assets/photo5.jpg", caption: "Her sweetest laugh 🌷", date: "Sweet Heart" },
    { src: "assets/photo6.jpg", caption: "Officially 17 and gorgeous 🎂", date: "Sweet Seventeen" },
    { src: "assets/photo7.jpg", caption: "Always effortlessly beautiful 💫", date: "Grace" },
    { src: "assets/photo8.jpg", caption: "The birthday princess 👑", date: "Special Day" }
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

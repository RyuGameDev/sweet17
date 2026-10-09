# 🎂 Website Kejutan Ulang Tahun (Birthday Surprise)

Website ini dibuat persis sesuai dengan konsep, transisi, dan estetika yang ada pada video. Seluruh media, teks, dan pengaturan waktu telah dirancang sangat modular dan mudah diganti sendiri.

---

## 📁 Struktur Folder & File

```text
hbd/
├── index.html         # Halaman utama website
├── style.css          # Tema, animasi, dan desain mewah
├── script.js          # Logika transisi, musik, partikel, & typewriter
├── config.js          # File utama untuk mengubah teks, nama, dan tanggal
└── assets/            # Folder penyimpanan media
    ├── music.mp3      # Lagu latar belakang (Background Music)
    ├── video.mp4      # Video pesan khusus
    ├── photo1.jpg     # Foto polaroid 1
    ├── photo2.jpg     # Foto polaroid 2
    ├── photo3.jpg     # Foto polaroid 3
    ├── photo4.jpg     # Foto polaroid 4
    ├── photo5.jpg     # Foto polaroid 5
    ├── photo6.jpg     # Foto polaroid 6
    ├── photo7.jpg     # Foto polaroid 7
    └── photo8.jpg     # Foto polaroid 8
```

---

## 🚀 Cara Menjalankan Website

1. **Cara Paling Cepat:**
   - Cukup **double-click** file [index.html](file:///D:/ryudev_area/hbd/index.html) untuk langsung membukanya di browser (Chrome, Edge, Firefox, dll).
2. **Atau melalui Local Server:**
   - Jalankan terminal di folder ini:
     ```powershell
     python -m http.server 3000
     ```
   - Lalu buka di browser: `http://localhost:3000`

---

## 📸 Cara Mengganti Media Kamu Sendiri

### 1. Mengganti Foto Polaroid (8 Foto)
- Masukkan 8 foto kamu ke dalam folder `assets/`.
- Beri nama persis:
  - `photo1.jpg`
  - `photo2.jpg`
  - `photo3.jpg`
  - `photo4.jpg`
  - `photo5.jpg`
  - `photo6.jpg`
  - `photo7.jpg`
  - `photo8.jpg`
*(Bisa format JPG atau PNG. Jika pakai PNG, kamu bisa menyesuaikan nama ekstensinya di file `config.js`).*

### 2. Mengganti Video Pesan
- Masukkan file video kamu ke dalam folder `assets/`.
- Beri nama: `video.mp4`

### 3. Mengganti Lagu Latar (Musik)
- Masukkan file lagu romantis favoritmu ke dalam folder `assets/`.
- Beri nama: `music.mp3`

---

## ✍️ Cara Mengubah Teks, Nama & Tanggal Countdown

Buka file [config.js](file:///D:/ryudev_area/hbd/config.js). Di dalam file tersebut sudah disediakan pengaturan lengkap dengan komentar bahasa Indonesia:

1. **Mode Hitung Mundur (`countdownMode`):**
   - `"seconds"` : Hitung mundur beberapa detik saja (sangat berguna untuk tes dan preview langsung).
   - `"target_date"` : Hitung mundur sampai tanggal & jam ulang tahun aslinya (misal: `"2026-10-10T00:00:00"`).
2. **Surat Cinta (`letterParagraphs`):**
   - Kamu bisa menulis paragraf surat sesuka hati. Efek mengetik (*typewriter*) akan otomatis menyesuaikan!
3. **Doa & Harapan (`wishesText`):**
   - Pesan doa yang ditampilkan pada layar kartu doa.
4. **Judul Penutup Bergantian (`closingTitles`):**
   - Kata-kata penutup yang berganti secara halus (*Happy Birthday*, *With All My Love*, *Always & Forever*).
5. **Keterangan Lagu (`musicTitle` & `musicArtist`):**
   - Menampilkan judul lagu di pemutar musik pojok kanan bawah.

---

## ✨ Fitur-Fitur Lengkap
- **Layar 1 (Countdown):** Kartu hitung mundur kaca gelap dengan efek angka bersinar dan tombol buka hadiah yang terkunci hingga waktu selesai.
- **Layar 2 (Gift Box):** Animasi kotak kado 3D interaktif. Saat diklik, tutup kado terbuka disertai ledakan konfeti.
- **Layar 3 (Cover):** Tipografi mewah "Your Special Day" dihiasi polaroid melayang di sisi kiri dan kanan.
- **Layar 4 (Surat Cinta):** Teks surat cinta dengan efek ketikan mesin tik otomatis + tombol *Lewati*.
- **Layar 5 (Our Memories):** Galeri 8 foto polaroid dengan sudut kemiringan natural, efek washi tape, dan Lightbox modal saat foto diklik.
- **Layar 6 (A Moment For You):** Pemutar video modern. Musik latar otomatis berhenti saat video diputar, dan lanjut menyala saat video selesai.
- **Layar 7 (Birthday Wishes):** Kartu ucapan romantis interaktif yang memunculkan hati melayang saat disentuh/diklik.
- **Layar 8 (Closing):** Efek judul berganti-ganti, pesan hangat penutup, dan tombol untuk mengulang dari awal.
- **Widget Musik:** Pemutar musik mengapung di pojok kanan bawah dengan visualizer equalizer hidup.

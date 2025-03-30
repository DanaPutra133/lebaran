import React, { useState, useEffect } from 'react';
import './App.css'; 

import Swal from 'sweetalert2';

const audioSource = "https://i.supa.codes/i6xlo4";
const gifUrl = "https://c.tenor.com/W8JwWPQ2ExgAAAAj/assalamualaikum-breakfasting.gif";

const texts = [
  "Assalamualaikum Wr. Wb. ✨",
  "Saya Dana Putra ingin mengucapkan: 🌙",
  "Selamat hari raya Idul Fitri 1446 H 🌟",
  "Taqabbalallahu Minna Wa Minkum 🤲",
  "Mohon Maaf Lahir dan Batin 🙏",
  "Semoga Allah SWT Memberkahi Kita Semua 💫",
  "Jangan lupa THR nya 💖",
];

function App() {
  const [currentText, setCurrentText] = useState('');
  const [audio] = useState(new Audio(audioSource));

  useEffect(() => {
    const showTextsSequentially = async () => {
      for (let i = 0; i < texts.length; i++) {
        await typeWriter(texts[i]);
        if (i < texts.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    };

    const typeWriter = async (text) => {
      setCurrentText(''); 
      let newText = ''; 
      for (let i = 0; i < text.length; i++) {
        newText += text.charAt(i); 
        setCurrentText(newText); 
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    };

    showTextsSequentially();
    playMusic();

    setTimeout(showDonatePopup, 5000);
  }, []);

  const playMusic = () => {
    audio.play().catch(error => console.error("Gagal memutar musik:", error));
  };

  const showDonatePopup = () => {
    Swal.fire({
      title: 'Mau kasih THR ? 🤲',
      text: "Klik tombol di bawah untuk kasih THR.",
      icon: 'info',
      confirmButtonText: 'Kirim THR',
      showCancelButton: true,
      cancelButtonText: 'Nanti Saja'
    }).then((result) => {
      if (result.isConfirmed) {
        window.open('https://files.catbox.moe/9akq5l.jpg', '_blank');
      }
    });
  };

  return (
    <div className="App">
      <div className="loading-screen">
        <div className="loading-text">Selamat Idul Fitri</div>
      </div>

      <audio id="linkmp3" src={audioSource} preload="auto"></audio>

      <div className="container">
        <div className="text-center">
          <img src={gifUrl} alt="Assalamualaikum" id="image-gif" />
        </div>
        <div className="text-center">
          <p id="text">{currentText}</p>
        </div>
        <button className="play-music" onClick={playMusic}>Putar Musik</button>
        <button className="donate-btn" onClick={showDonatePopup}>Kirim THR</button>
        <h5>sc by erlan</h5>
      </div>

      <footer className="footer">
        <p>
          <a>DANA-AQUA</a>
        </p>
      </footer>
    </div>
  );
}

export default App;

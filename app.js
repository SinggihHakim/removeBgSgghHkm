// ambil elemen-elemen HTML
const uploadInput = document.getElementById('upload');
const removeBgBtn = document.getElementById('removeBgBtn');
const originalImage = document.getElementById('originalImage');
const outputImage = document.getElementById('outputImage');
const downloadBtn = document.getElementById('downloadBtn');

// API key remove.bg
const apiKey = 'ZNux8tXqC9YcDTfSpDdLxJTC'; // Ganti dengan API key Anda dari remove.bg

// Event listener untuk upload gambar
uploadInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        // tampilkan gambar asli
        const reader = new FileReader();
        reader.onload = function(e) {
            originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Fungsi untuk menghapus latar belakang
removeBgBtn.addEventListener('click', function() {
    const file = uploadInput.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('image_file', file);
        formData.append('size', 'auto');

        // Mengirim permintaan API remove.bg
        fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': apiKey,
            },
            body: formData,
        })
        .then(response => response.blob())
        .then(blob => {
            // Menampilkan gambar hasil setelah latar belakang dihapus
            const url = URL.createObjectURL(blob);
            outputImage.src = url;
            outputImage.style.display = 'inline'; // Menampilkan gambar hasil

            // Menampilkan tombol download
            downloadBtn.style.display = 'inline-block';

            // Menambahkan event listener untuk tombol download
            downloadBtn.onclick = function() {
                const a = document.createElement('a');
                a.href = url;
                a.download = 'processed-image.png';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            };
        })
        .catch(error => {
            console.error('Error removing background:', error);
        });
    } else {
        alert('Pilih gambar terlebih dahulu!');
    }
});

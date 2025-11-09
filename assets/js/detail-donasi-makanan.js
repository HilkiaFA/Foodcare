window.addEventListener('load', () => {
    const progresses = [
        { id: 'progressdetail', target: 130, max: 200 },
    ];

    progresses.forEach(item => {
        const el = document.getElementById(item.id);
        if (!el) return;

        const percent = (item.target / item.max) * 100;
        el.style.width = '0%';
        el.style.transition = 'width 1.5s ease-out';

        setTimeout(() => {
            el.style.width = percent + '%';
        }, 200);
    });
});

const modal = document.getElementById('donasiModal');
const openButtons = document.querySelectorAll('.btn-donasi');
const opsiDonasi = document.getElementById('opsiDonasi');
const lokasiContainer = document.getElementById('lokasiContainer');
const mapFrame = document.getElementById('mapFrame');

// Buka modal
openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.remove('hidden');
    });
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
});

opsiDonasi.addEventListener('change', function () {
    if (this.value === 'ambil') {
        lokasiContainer.classList.remove('hidden');
        mapFrame.style.display = 'none';

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    mapFrame.src = `https://www.google.com/maps?q=${lat},${lon}&z=15&output=embed`;
                    mapFrame.style.display = 'block';
                },
                () => {
                    mapStatus.textContent = 'Tidak dapat mengambil lokasi. Mohon izinkan akses lokasi.';
                }
            );
        } else {
            mapStatus.textContent = 'Browser Anda tidak mendukung geolokasi.';
        }
    } else {
        lokasiContainer.classList.add('hidden');
        mapFrame.style.display = 'none';
    }
});

document.getElementById('formDonasi').addEventListener('submit', (e) => {
    e.preventDefault();

    document.getElementById('donasiModal').classList.add('hidden');

    Swal.fire({
        title: 'Terima kasih orang baik, Sedekah Makananmu Berhasil!',
        text: 'Tim FoodCare akan segera ke tempatmu untuk penjemputan donasi, harap selalu aktifkan kontak yang terhubung!',
        imageUrl: '../assets/image/Success-Icon.svg',
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Icon Donasi',
        confirmButtonText: 'Kembali Ke Beranda',
        background: '#fff',
        customClass: {
            title: 'swal-title-custom',
            htmlContainer: 'swal-text-custom',
            confirmButton: 'swal-confirm-btn',
        },
    }).then(() => {
        e.target.reset();
        document.getElementById('lokasiContainer').classList.add('hidden');

        window.location.href = '../../index.html';
    });
});


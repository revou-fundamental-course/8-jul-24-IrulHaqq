document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('bmiForm');
    var resultDiv = document.getElementById('bmiResult');
    var descriptionDiv = document.getElementById('bmiDescription');
    var genderInputs = document.querySelectorAll('input[name="gender"]');
    var weightInput = document.getElementById('weight');
    var heightInput = document.getElementById('height');
    var weightWarning = document.getElementById('weightWarning');
    var heightWarning = document.getElementById('heightWarning');
    var resetButton = document.querySelector('button[type="reset"]');
    var resultSection = document.getElementById('resultSection');

    form.onsubmit = function(e) {
        e.preventDefault();
        hitungBMI();
    };

    // Fungsi utama untuk menghitung BMI
    function hitungBMI() {
        var gender = document.querySelector('input[name="gender"]:checked').value;
        var berat = parseFloat(weightInput.value);
        var tinggi = parseFloat(heightInput.value) / 100;

        // Validasi input
        if (isNaN(berat) || isNaN(tinggi) || berat > 999 || tinggi > 9.99) {
            alert('Mohon isi semua data dengan benar');
            return;
        }

        if (berat === 0 || tinggi === 0) {
            resultDiv.innerHTML = 'BMI Anda: 0';
            resultDiv.className = 'bmi-box bmi-kurus';
            descriptionDiv.innerHTML = 'Nilai berat atau tinggi tidak boleh 0. Mohon masukkan nilai yang valid.';
            return;
        }

        // RUMUS
        var bmi = berat / (tinggi * tinggi);
        bmi = bmi.toFixed(1);

        var kategori, deskripsi, kelasWarna;

        // Penentuan kategori BMI dan deskripsi yang sesuai
        if (bmi < 18.5) {
            kategori = 'Kurus';
            if (gender === 'pria') {
                deskripsi = [
                    'Anda berada dalam kategori kurus. Cobalah untuk meningkatkan asupan kalori dan protein. Konsultasikan dengan ahli gizi untuk rencana makan yang sesuai.',
                    'Berat badan Anda kurang dari ideal. Pertimbangkan untuk menambah porsi makan dan melakukan latihan beban untuk membangun massa otot.',
                    'BMI Anda menunjukkan berat badan kurang. Fokus pada makanan bergizi dan olahraga yang tepat untuk mencapai berat badan ideal.'
                ];
            } else {
                deskripsi = [
                    'Anda termasuk dalam kategori kurus. Penting untuk meningkatkan asupan nutrisi. Konsultasikan dengan dokter tentang cara meningkatkan berat badan secara sehat.',
                    'Berat badan Anda di bawah ideal. Pertimbangkan untuk menambah asupan kalori sehat dan melakukan latihan kekuatan ringan.',
                    'BMI Anda menunjukkan berat badan kurang. Fokus pada pola makan seimbang dan rutin berolahraga untuk mencapai berat ideal.'
                ];
            }
            kelasWarna = 'bmi-kurus';
        } else if (bmi >= 18.5 && bmi < 25) {
            kategori = 'Normal';
            deskripsi = [
                'Selamat! Berat badan Anda ideal. Pertahankan pola makan sehat dan gaya hidup aktif Anda.',
                'BMI Anda berada dalam rentang normal. Teruskan kebiasaan baik Anda dalam menjaga kesehatan.',
                'Anda memiliki berat badan yang sehat. Jaga keseimbangan antara asupan makanan dan aktivitas fisik untuk mempertahankannya.'
            ];
            kelasWarna = 'bmi-normal';
        } else if (bmi >= 25 && bmi < 30) {
            kategori = 'Kelebihan berat badan';
            if (gender === 'pria') {
                deskripsi = [
                    'Anda sedikit kelebihan berat badan. Cobalah untuk meningkatkan aktivitas fisik dan perhatikan pola makan Anda.',
                    'BMI Anda menunjukkan kelebihan berat badan ringan. Fokus pada olahraga kardio dan diet seimbang untuk menurunkan berat badan.',
                    'Berat badan Anda di atas ideal. Pertimbangkan untuk berkonsultasi dengan ahli gizi untuk rencana penurunan berat badan yang sehat.'
                ];
            } else {
                deskripsi = [
                    'Anda memiliki sedikit kelebihan berat badan. Cobalah untuk meningkatkan aktivitas fisik harian dan perhatikan porsi makan.',
                    'BMI Anda menunjukkan kelebihan berat badan ringan. Fokus pada pola makan sehat dan olahraga teratur untuk mencapai berat ideal.',
                    'Berat badan Anda di atas rentang ideal. Pertimbangkan untuk berkonsultasi dengan ahli gizi untuk panduan penurunan berat badan yang aman.'
                ];
            }
            kelasWarna = 'bmi-overweight';
        } else {
            kategori = 'Obesitas';
            deskripsi = [
                'BMI Anda menunjukkan obesitas. Sangat disarankan untuk berkonsultasi dengan dokter untuk rencana penurunan berat badan yang aman dan efektif.',
                'Anda berada dalam kategori obesitas. Penting untuk membuat perubahan gaya hidup signifikan. Konsultasikan dengan profesional kesehatan untuk panduan.',
                'Berat badan Anda jauh di atas ideal. Pertimbangkan untuk mencari dukungan medis dan membuat rencana komprehensif untuk menurunkan berat badan.'
            ];
            kelasWarna = 'bmi-obese';
        }

        resultDiv.innerHTML = 'BMI Anda: ' + bmi + ' (' + kategori + ')';
        resultDiv.className = 'bmi-box ' + kelasWarna;
        
        var randomIndex = Math.floor(Math.random() * deskripsi.length);
        descriptionDiv.innerHTML = deskripsi[randomIndex];

        if (gender === 'pria') {
            descriptionDiv.innerHTML += '<br><br>Catatan: Pria umumnya memiliki massa otot lebih besar, yang dapat mempengaruhi hasil BMI. Ini mungkin tidak selalu mencerminkan tingkat lemak tubuh dengan akurat.';
        } else {
            descriptionDiv.innerHTML += '<br><br>Catatan: Wanita umumnya memiliki persentase lemak tubuh lebih tinggi, yang mungkin tidak tercermin sepenuhnya dalam BMI. Pertimbangkan faktor lain seperti komposisi tubuh.';
        }
    }

    genderInputs.forEach(function(input) {
        input.addEventListener('change', function() {
            genderInputs.forEach(function(inp) {
                inp.nextElementSibling.classList.remove('selected');
            });
            this.nextElementSibling.classList.add('selected');
        });
    });

    weightInput.addEventListener('input', function() {
        if (this.value.length > 3) {
            weightWarning.textContent = 'Berat badan tidak boleh lebih dari 3 karakter.';
            weightWarning.style.display = 'block';
            this.value = this.value.slice(0, 3);
        } else if (!/^\d*$/.test(this.value)) {
            weightWarning.textContent = 'Berat badan harus berupa angka.';
            weightWarning.style.display = 'block';
            this.value = this.value.replace(/\D/g, '');
        } else {
            weightWarning.style.display = 'none';
        }
    });

    heightInput.addEventListener('input', function() {
        if (this.value.length > 3) {
            heightWarning.textContent = 'Tinggi badan tidak boleh lebih dari 3 karakter.';
            heightWarning.style.display = 'block';
            this.value = this.value.slice(0, 3);
        } else if (!/^\d*$/.test(this.value)) {
            heightWarning.textContent = 'Tinggi badan harus berupa angka.';
            heightWarning.style.display = 'block';
            this.value = this.value.replace(/\D/g, '');
        } else {
            heightWarning.style.display = 'none';
        }
    });

    resetButton.addEventListener('click', function(e) {
        e.preventDefault();

        weightInput.value = '';
        heightInput.value = '';

        genderInputs.forEach(function(input) {
            input.checked = false;
            input.nextElementSibling.classList.remove('selected');
        });

        weightWarning.style.display = 'none';
        heightWarning.style.display = 'none';

        resultDiv.innerHTML = 'BMI Anda: ';
        resultDiv.className = 'bmi-box';
        descriptionDiv.innerHTML = 'Masukkan data Anda untuk melihat hasil BMI.';

        document.getElementById('pria').focus();
    });

   
    resultDiv.innerHTML = 'BMI Anda: ';
    descriptionDiv.innerHTML = 'Masukkan data Anda untuk melihat hasil BMI.';
});
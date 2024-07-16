document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('bmiForm');
    var resultDiv = document.getElementById('bmiResult');
    var descriptionDiv = document.getElementById('bmiDescription');
    var genderInputs = document.querySelectorAll('input[name="gender"]');

    form.onsubmit = function(e) {
        e.preventDefault();
        hitungBMI();
    };

    function hitungBMI() {
        var gender = document.querySelector('input[name="gender"]:checked').value;
        var berat = parseFloat(document.getElementById('weight').value);
        var tinggi = parseFloat(document.getElementById('height').value) / 100;
        var umur = parseInt(document.getElementById('age').value);

        if (isNaN(berat) || isNaN(tinggi) || isNaN(umur)) {
            alert('Mohon isi semua data dengan benar');
            return;
        }

        var bmi = berat / (tinggi * tinggi);
        bmi = bmi.toFixed(1);

        var kategori, deskripsi, kelasWarna;
        if (bmi < 18.5) {
            kategori = 'Kurus';
            deskripsi = gender === 'pria' ? 
                'Anda kurus. Pertimbangkan untuk meningkatkan asupan kalori dan protein.' :
                'Anda kurus. Konsultasikan dengan dokter tentang peningkatan berat badan yang sehat.';
            kelasWarna = 'bmi-kurus';
        } else if (bmi >= 18.5 && bmi < 25) {
            kategori = 'Normal';
            deskripsi = 'Berat badan Anda ideal. Pertahankan pola makan dan gaya hidup sehat.';
            kelasWarna = 'bmi-normal';
        } else if (bmi >= 25 && bmi < 30) {
            kategori = 'Kelebihan berat badan';
            deskripsi = gender === 'pria' ? 
                'Anda kelebihan berat badan. Fokus pada olahraga dan diet seimbang.' :
                'Anda kelebihan berat badan. Pertimbangkan untuk berkonsultasi dengan ahli gizi.';
            kelasWarna = 'bmi-overweight';
        } else {
            kategori = 'Obesitas';
            deskripsi = 'Anda mengalami obesitas. Sangat disarankan untuk berkonsultasi dengan dokter.';
            kelasWarna = 'bmi-obese';
        }

        resultDiv.innerHTML = 'BMI Anda: ' + bmi + ' (' + kategori + ')';
        resultDiv.className = 'bmi-box ' + kelasWarna;
        descriptionDiv.innerHTML = deskripsi;

        if (gender === 'pria') {
            descriptionDiv.innerHTML += '<br><br>Catatan: Pria umumnya memiliki massa otot lebih besar, yang dapat mempengaruhi hasil BMI.';
        } else {
            descriptionDiv.innerHTML += '<br><br>Catatan: Wanita umumnya memiliki persentase lemak tubuh lebih tinggi, yang mungkin tidak tercermin dalam BMI.';
        }
    }

    // Efek visual untuk pemilihan gender
    genderInputs.forEach(function(input) {
        input.addEventListener('change', function() {
            genderInputs.forEach(function(inp) {
                inp.nextElementSibling.classList.remove('selected');
            });
            this.nextElementSibling.classList.add('selected');
        });
    });
});

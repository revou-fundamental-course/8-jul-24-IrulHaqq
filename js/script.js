window.onload = function() {
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

        var kategori, deskripsi;
        if (bmi < 18.5) {
            kategori = 'Kurus';
            deskripsi = gender === 'pria' ? 
                'Anda kurus. Pertimbangkan untuk meningkatkan asupan kalori dan protein.' :
                'Anda kurus. Konsultasikan dengan dokter tentang peningkatan berat badan yang sehat.';
        } else if (bmi >= 18.5 && bmi < 25) {
            kategori = 'Normal';
            deskripsi = 'Berat badan Anda ideal. Pertahankan pola makan dan gaya hidup sehat.';
        } else if (bmi >= 25 && bmi < 30) {
            kategori = 'Kelebihan berat badan';
            deskripsi = gender === 'pria' ? 
                'Anda kelebihan berat badan. Fokus pada olahraga dan diet seimbang.' :
                'Anda kelebihan berat badan. Pertimbangkan untuk berkonsultasi dengan ahli gizi.';
        } else {
            kategori = 'Obesitas';
            deskripsi = 'Anda mengalami obesitas. Sangat disarankan untuk berkonsultasi dengan dokter.';
        }

        resultDiv.innerHTML = 'BMI Anda: ' + bmi + ' (' + kategori + ')';
        descriptionDiv.innerHTML = deskripsi;

        if (gender === 'pria') {
            descriptionDiv.innerHTML += '<br><br>Catatan: Pria umumnya memiliki massa otot lebih besar, yang dapat mempengaruhi hasil BMI.';
        } else {
            descriptionDiv.innerHTML += '<br><br>Catatan: Wanita umumnya memiliki persentase lemak tubuh lebih tinggi, yang mungkin tidak tercermin dalam BMI.';
        }
    }
    document.addEventListener('DOMContentLoaded', function() {
        const genderLabels = document.querySelectorAll('.gender-label');
        genderLabels.forEach(label => {
            label.addEventListener('click', function() {
                genderLabels.forEach(lbl => lbl.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    });
    // Efek visual untuk pemilihan gender
    genderInputs.forEach(function(input) {
        input.addEventListener('change', function() {
            genderInputs.forEach(function(inp) {
                inp.nextElementSibling.style.borderColor = 'transparent';
                inp.nextElementSibling.style.boxShadow = 'none';
            });
            this.nextElementSibling.style.borderColor = '#4CAF50';
            this.nextElementSibling.style.boxShadow = '0 0 10px rgba(76, 175, 80, 0.5)';
        });
    });
};
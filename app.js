function updatePlaceholder() {
    // const screenWidth = window.innerWidth;
    const input = document.querySelector('.foam')
    if (window.innerWidth < 466){
        input.setAttribute('placeholder', 'paste your link');
    }else{
        input.setAttribute('placeholder', 'Paste Your Link To Get Qr Code');
    }

}
updatePlaceholder();

window.addEventListener('resize', updatePlaceholder);

let qr;

const generateBtn = document.querySelector('.generate');
const downloadBtn = document.querySelector('.downloading');
const input = document.querySelector('.foam');
// const qrCodeDiv =

const qrCodeContainer = document.querySelector('.qrcode');
downloadBtn.style.display = 'none';


generateBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const qrCodeValue = input.value.trim();
    if(!qrCodeValue){
        alert('Please enter a valid URL or text');
        return;
    }


    try {
        new URL(qrCodeValue);
    } catch (error) {
        input.value = '';
        alert('Please enter a valid link e.g. https://chrisworks.lovestoblog.com/   your friend chrisboss')
        return;
    }
    qrCodeContainer.innerHTML = '';

    let size = window.innerWidth < 466 ? 150 : 200;


    qr = new QRCode(qrCodeContainer, {
        text: qrCodeValue,
        width: size,
        height: size,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
    input.value = '';

    downloadBtn.style.display = 'inline-block';
})

downloadBtn.addEventListener('click',()=>{
    if(!qr){
        alert('Please generate a QR code first');
        return;
    }
    const img = qrCodeContainer.querySelector('img');
    if(img){
        const imgSrc = img.src;
        const a = document.createElement('a');
        a.href = imgSrc;
        a.download = 'qrcode.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } else {
        const canvas = qrCodeContainer.querySelector('canvas');
        const imgSrc = canvas.toDataURL("image/png");
        const a = document.createElement('a');
        a.href = imgSrc;
        a.download = 'qrcode.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

});

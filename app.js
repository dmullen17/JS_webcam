const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip'); 
const snap = document.querySelector('.snap'); 


function getVideo() {
    // returns a promise
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(localMediaStream => {
        //console.log(localMediaStream);
        // deprecated on chrome 
        // video.src = window.URL.createObjectURL(localMediaStream);
        video.srcObject = localMediaStream;
        video.play();
    })
    .catch(error => {
        console.log(error);
    });
}


function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    console.log(video);
    // console.log(width, height); for some reason these are 0, 0
    canvas.width = width;
    canvas.height = height;
    
    setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        //console.log('drawImage');
        let pixels = ctx.getImageData(0, 0, width, height); // returns pixels in a large array of red, green, blue, alpha - repeating
        // pixels = redEffect(pixels);
        pixels = rgbSplit(pixels);
        ctx.putImageData(pixels, 0, 0);
    }, 16);

}


function takePhoto() {
    snap.currentTime = 0;
    snap.play();
    
    // take the data out of the canvas
    const data = canvas.toDataURL('image/jpeg');
    //console.log(data); //base 64 data 
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    // link.textContent = 'Download Image';
    link.innerHTML = `<img src=${data} alt='download image'>`
    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 100;  // r
        pixels.data[i + 1] = pixels.data[i + 1] - 50; // g
        pixels.data[i + 2] = pixels.data[i + 2] * .4 ;// b
    }
    return pixels;
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0] + 100;  // r
        pixels.data[i + 100] = pixels.data[i + 1] - 50; // g
        pixels.data[i + 500] = pixels.data[i + 2] * .4 ;// b
    }
    return pixels;
}


function greenScreen() {
    
}



getVideo();

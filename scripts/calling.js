const modeSwitchBtn = document.querySelector('.mode-switch');
const body = document.body;

// Function to toggle dark mode
function toggleDarkMode() {
    body.classList.toggle('dark');
    localStorage.setItem('darkMode', body.classList.contains('dark')); // Store preference

    // Update sun/moon icon visibility (optional)
    const sunIcon = document.querySelector('.mode-switch .sun');
    const moonIcon = document.querySelector('.mode-switch .moon');
    sunIcon.style.opacity = body.classList.contains('dark') ? 0 : 1;
    moonIcon.style.opacity = body.classList.contains('dark') ? 1 : 0;

    sunIcon.style.width = body.classList.contains('dark') ? 0 : '24px';
    moonIcon.style.width = body.classList.contains('dark') ? '24px' : 0;
}

// Add event listener for the mode switch button
modeSwitchBtn.addEventListener('click', toggleDarkMode);

// Check for stored preference on load
const darkMode = localStorage.getItem('darkMode');
if (darkMode === 'true') {
    toggleDarkMode();
}

window.onload = function () {
    try {
        console.log("Trình duyệt hỗ trợ HTML5 CANVAS");
        startCamera();
    } catch (e) {
        console.log("Trình duyệt không hỗ trợ HTML5 CANVAS");
    }
};

function startCamera() {
    var video = document.getElementById("video");
    var video_2 = document.getElementById("video_2");

    function successCallback(stream) {
        // Set the source of the video element with the stream from the camera
        if (video.mozSrcObject !== undefined) {
            video.mozSrcObject = stream;
            video_2.mozSrcObject = stream;
        } else {
            video.srcObject = stream;
            video_2.srcObject = stream;
        }
        video.play();
        video_2.play();
    }

    function errorCallback(error) {
        alert('Mã lỗi: [CODE ' + error.code + ']');
    }

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

    if (navigator.getUserMedia) {
        navigator.getUserMedia({ video: true }, successCallback, errorCallback);
        navigator.getUserMedia({ video_2: true }, successCallback, errorCallback);
    } else {
        alert('Trình duyệt không hỗ trợ getUserMedia.');
    }
}

const endCallBtn = document.getElementById('endcall-btn');
const feedbackModal = document.getElementById('feedback-modal');
const cancelFeedbackBtn = document.getElementById('cancel-feedback');
const feedbackForm = document.getElementById('feedback-form');
const successModal = document.getElementById('success-modal');
const closeSuccessBtn = document.getElementById('close-success');

// Show the feedback modal
endCallBtn.addEventListener('click', (e) => {
    e.preventDefault();
    feedbackModal.classList.add('active');
});

cancelFeedbackBtn.addEventListener('click', () => {
    feedbackModal.classList.remove('active');
});

feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const videoRating = feedbackForm['video-rating'].value;
    const audioRating = feedbackForm['audio-rating'].value;
    const comments = feedbackForm['comments'].value;

    console.log('Video Rating:', videoRating);
    console.log('Audio Rating:', audioRating);
    console.log('Comments:', comments);

    feedbackModal.classList.remove('active');
    successModal.classList.add('active');
});

closeSuccessBtn.addEventListener('click', () => {
    successModal.classList.remove('active');
    window.location.href = 'join_call.html';
});

// Video call setup
const video = document.getElementById('video');
const video2 = document.getElementById('video_2');
const micButton = document.querySelector('.mic');
const cameraButton = document.querySelector('.camera');
const endCallButton = document.getElementById('endcall-btn');
const cameraPopup = document.getElementById('camera-popup');
const closePopupButton = document.getElementById('close-popup');
const cameraPopupMessage = document.getElementById('camera-popup-message');

// Audio level indicator
const audioLevelContainer = document.createElement('div');
audioLevelContainer.classList.add('audio-level-indicator');
const audioLevelBar = document.createElement('div');
audioLevelBar.classList.add('audio-level-bar');
audioLevelContainer.appendChild(audioLevelBar);
document.querySelector('.video-call-wrapper').appendChild(audioLevelContainer);

let localStream;
let peer;
let isMicEnabled = true;
let isCameraEnabled = true;

// Start video stream and setup peer connection
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    localStream = stream;
    video.srcObject = stream;
    video.play();

    // Set initial mic and camera button states
    updateMicButtonState();
    updateCameraButtonState();

    // SimplePeer setup (replace with your actual signaling server logic)
    peer = new SimplePeer({ initiator: true, stream: stream });
    peer.on('signal', data => {
      console.log('Signal:', data);
    });
    peer.on('stream', remoteStream => {
      video2.srcObject = remoteStream;
      video2.play();
    });
    peer.on('data', data => {
      console.log('Received Data:', data);
    });
    peer.on('close', () => {
      console.log("Connection Closed");
    });
    peer.on('error', err => {
        console.error('Peer connection error:', err);
    });
  })
  .catch(err => {
    console.error('Error accessing media devices:', err);
  });

// Mic button event listener
micButton.addEventListener('click', () => {
  isMicEnabled = !isMicEnabled;
  localStream.getAudioTracks()[0].enabled = isMicEnabled;
  updateMicButtonState();
});

// Camera button event listener
cameraButton.addEventListener('click', () => {
  isCameraEnabled = !isCameraEnabled;

  if (isCameraEnabled) {
      // Mở lại camera
      navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
              video.srcObject = stream;
              video.play();
              updateCameraButtonState();
              
              // Hiển thị thông báo Camera đã mở
              cameraPopupMessage.textContent = 'Camera đã mở';
              cameraPopup.style.display = 'flex';
              cameraPopup.style.animation = 'slideIn 0.5s ease-out forwards';  // Thêm animation
          })
          .catch(err => {
              console.error('Không thể mở camera:', err);
          });
  } else {
      // Tắt camera
      if (localStream) {
          localStream.getVideoTracks().forEach(track => track.enabled = false);
      }
      updateCameraButtonState();
      video.srcObject = null;

      // Hiển thị thông báo Camera đã tắt
      cameraPopupMessage.textContent = 'Camera đã tắt';
      cameraPopup.style.display = 'flex';
      cameraPopup.style.animation = 'slideIn 0.5s ease-out forwards';  // Thêm animation
  }
});

closePopupButton.addEventListener('click', () => {
  // Thêm hiệu ứng trượt ra
  cameraPopup.style.animation = 'slideOut 0.5s ease-in forwards';
  setTimeout(() => {
      cameraPopup.style.display = 'none';  // Ẩn popup sau khi hiệu ứng kết thúc
  }, 500);  // Thời gian trùng với thời gian animation
});

function updateCameraButtonState() {
  cameraButton.classList.toggle('camera-off', !isCameraEnabled);
}

// End call button
endCallButton.addEventListener('click', () => {
  localStream.getTracks().forEach(track => track.stop());
  if (peer) peer.destroy();
});

// Update mic button state
function updateMicButtonState() {
  micButton.classList.toggle('muted', !isMicEnabled);
}

// Update camera button state
function updateCameraButtonState() {
  cameraButton.classList.toggle('camera-off', !isCameraEnabled);
}

// Simple audio level meter (replace with a more sophisticated one if needed)
localStream.getAudioTracks()[0].onended = () => {
  audioLevelBar.style.width = '0%';
};

setInterval(() => {
  const level = getAudioLevel(localStream.getAudioTracks()[0]);
  const width = Math.max(0, Math.min(100, level * 100)); // Scale to 0-100%
  audioLevelBar.style.width = `${width}%`;
}, 100);

// Get the audio level from the stream
function getAudioLevel(track) {
  if (track.analyser) {
      track.analyser.getFloatTimeDomainData(track.dataArray);
      let peak = 0;
      for (let i = 0; i < track.dataArray.length; i++) {
          peak = Math.max(peak, Math.abs(track.dataArray[i]));
      }
      return peak;
  }
  return 0;
}

// Add CSS for audio level indicator
const style = document.createElement('style');
style.innerHTML = `
  .audio-level-indicator {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 100px;
    height: 10px;
    background-color: #eee;
    border-radius: 5px;
  }
  .audio-level-bar {
    background-color: #f00;
    height: 100%;
    width: 0%;
    border-radius: 5px;
  }
`;
document.head.appendChild(style);

const username = 'Nguyễn Văn A';  // Ví dụ tên người dùng

cameraPopupMessage.textContent = username + ' đã tắt camera';

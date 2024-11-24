const modeSwitchBtn = document.querySelector('.mode-switch');
const body = document.body;

function toggleDarkMode() {
    body.classList.toggle('dark');
    localStorage.setItem('darkMode', body.classList.contains('dark'));

    const sunIcon = document.querySelector('.mode-switch .sun');
    const moonIcon = document.querySelector('.mode-switch .moon');
    sunIcon.style.opacity = body.classList.contains('dark') ? 0 : 1;
    moonIcon.style.opacity = body.classList.contains('dark') ? 1 : 0;

    sunIcon.style.width = body.classList.contains('dark') ? 0 : '24px';
    moonIcon.style.width = body.classList.contains('dark') ? '24px' : 0;
}

modeSwitchBtn.addEventListener('click', toggleDarkMode);

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

const video = document.getElementById('video');
const video2 = document.getElementById('video_2');
const micButton = document.querySelector('.mic');
const cameraButton = document.querySelector('.camera');
const endCallButton = document.getElementById('endcall-btn');
const cameraPopup = document.getElementById('camera-popup');
const closePopupButton = document.getElementById('close-popup');
const cameraPopupMessage = document.getElementById('camera-popup-message');

const audioLevelContainer = document.createElement('div');
audioLevelContainer.classList.add('audio-level-indicator');
const audioLevelBar = document.createElement('div');
audioLevelBar.classList.add('audio-level-bar');
audioLevelContainer.appendChild(audioLevelBar);
document.querySelector('.video-call-wrapper').appendChild(audioLevelContainer);

let localStream;
let remoteStream;
let peer;
let isMicEnabled = true;
let isCameraEnabled = true;

navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    localStream = stream;
    video.srcObject = stream;
    video.play();

    const audioTrack = stream.getAudioTracks()[0];

    updateMicButtonState();

    peer = new SimplePeer({ initiator: true, stream: stream });

    peer.on('signal', data => {
      console.log('Signal:', data);
    });
    peer.on('stream', remoteStreamData => {
      remoteStream = remoteStreamData;
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

micButton.addEventListener('click', () => {
  isMicEnabled = !isMicEnabled;
  localStream.getAudioTracks()[0].enabled = isMicEnabled;
  updateMicButtonState();
});

let isCamera2Enabled = true;  // Trạng thái ban đầu là camera 2 đã mở
let camera2Stream = null;  // Lưu stream của camera 2

window.onload = () => {
  // Khi trang được load, đảm bảo camera 2 được mở và nút hiển thị đúng trạng thái
  if (isCamera2Enabled) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        camera2Stream = stream;
        video2.srcObject = camera2Stream;
        video2.play();

        cameraPopupMessage.textContent = 'Camera 2 đã mở';
        cameraPopup.style.display = 'flex';
        cameraPopup.style.animation = 'slideIn 0.5s ease-out forwards';

        updateCameraButtonState();  // Cập nhật trạng thái nút
      })
      .catch(err => {
        console.error('Không thể mở camera 2:', err);
      });
  }
};

cameraButton.addEventListener('click', () => {
  isCamera2Enabled = !isCamera2Enabled;  // Chuyển trạng thái của camera 2

  if (isCamera2Enabled) {
    // Nếu camera 2 được bật, lấy media stream của camera 2
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        camera2Stream = stream;
        video2.srcObject = camera2Stream;
        video2.play();

        cameraPopupMessage.textContent = 'Camera 2 đã mở';
        cameraPopup.style.display = 'flex';
        cameraPopup.style.animation = 'slideIn 0.5s ease-out forwards';

        updateCameraButtonState();  // Cập nhật trạng thái nút
      })
      .catch(err => {
        console.error('Không thể mở camera 2:', err);
      });
  } else {
    // Nếu camera 2 bị tắt, stop stream của camera 2
    if (camera2Stream) {
      const tracks = camera2Stream.getTracks();
      tracks.forEach(track => track.stop());
      video2.srcObject = null;
      camera2Stream = null;
    }

    cameraPopupMessage.textContent = 'Camera 2 đã tắt';
    cameraPopup.style.display = 'flex';
    cameraPopup.style.animation = 'slideIn 0.5s ease-out forwards';

    updateCameraButtonState();  // Cập nhật trạng thái nút
  }
});

function updateCameraButtonState() {
  // Nếu camera 2 đang mở, nút camera sẽ có trạng thái mở
  cameraButton.classList.toggle('camera-off', !isCamera2Enabled);
}


closePopupButton.addEventListener('click', () => {
  cameraPopup.style.animation = 'slideOut 0.5s ease-in forwards';
  setTimeout(() => {
      cameraPopup.style.display = 'none';
  }, 500);
});

function updateCameraButtonState() {
  cameraButton.classList.toggle('camera-off', !isCameraEnabled);
}

endCallButton.addEventListener('click', () => {
  localStream.getTracks().forEach(track => track.stop());
  if (peer) peer.destroy();
});

function updateMicButtonState() {
  micButton.classList.toggle('muted', !isMicEnabled);
}

localStream.getAudioTracks()[0].onended = () => {
  audioLevelBar.style.width = '0%';
};

setInterval(() => {
  const level = getAudioLevel(localStream.getAudioTracks()[0]);
  const width = Math.max(0, Math.min(100, level * 100));
  audioLevelBar.style.width = `${width}%`;
}, 100);

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

const username = 'Nguyễn Văn A';

cameraPopupMessage.textContent = username + ' đã tắt camera';
const chatArea = document.querySelector('.chat-area');
const chatInput = document.querySelector('.chat-input');
const sendButton = document.querySelector('.send-button');

sendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
  const message = chatInput.value;
  if (message.trim() !== '') {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', 'sent');
    messageElement.textContent = message;
    chatArea.appendChild(messageElement);
    chatInput.value = '';

    peer.send(message); 
  }
}

whiteboardCanvas.on('object:added', (e) => {
  if (peer && e.target.type === 'line') {
      const data = {
          type: 'draw',
          x1: e.target.x1,
          y1: e.target.y1,
          x2: e.target.x2,
          y2: e.target.y2,
          stroke: e.target.stroke,
          strokeWidth: e.target.strokeWidth,
      };
      peer.send(JSON.stringify(data));
  }
});

peer.on('data', data => {
  if (typeof data === 'string') {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', 'received');
    messageElement.textContent = data;
    chatArea.appendChild(messageElement);
  } else if (data instanceof File) {
      console.log("Received file:", data.name);
  } else {
    console.log("Received:", data);
  }
  try {
    const parsedData = JSON.parse(data);
    if (parsedData.type === 'draw') {
        const line = new fabric.Line([parsedData.x1, parsedData.y1, parsedData.x2, parsedData.y2], {
            stroke: parsedData.stroke,
            strokeWidth: parsedData.strokeWidth,
            strokeLineCap: 'round',
            selectable: false,
        });
        whiteboardCanvas.add(line);
        whiteboardCanvas.renderAll();
    }
} catch (error) {
    console.error("Error parsing whiteboard data:", error);
}
});

const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.style.display = 'none';
document.body.appendChild(fileInput);

const fileUploadProgress = document.createElement('div');
fileUploadProgress.classList.add('file-upload-progress');
const fileUploadProgressBar = document.createElement('div');
fileUploadProgressBar.classList.add('file-upload-progress-bar');
fileUploadProgress.appendChild(fileUploadProgressBar);
document.querySelector('.chat-typing-area').appendChild(fileUploadProgress);

sendButton.parentNode.insertBefore(fileInput, sendButton);


fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file) {
    fileUploadProgress.style.display = 'block';

    let progress = 0;
    const uploadInterval = setInterval(() => {
      progress += 10;
      fileUploadProgressBar.style.width = `${progress}%`;
      if (progress >= 100) {
        clearInterval(uploadInterval);
        fileUploadProgress.style.display = 'none';
        console.log('File uploaded:', file.name);
        peer.send(file); 
      }
    }, 500);
  }
});

localStream.getAudioTracks()[0].onmute = () => {
  alert('Microphone muted!');
};

const wifiBar = document.querySelector('.wifi-bar');
setInterval(() => {
  const strength = Math.floor(Math.random() * 100);
  wifiBar.style.width = `${strength}%`;
}, 2000);

const videoSmall = document.getElementById("video_2");

let isDragging = false;
let offsetX, offsetY;

videoSmall.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - videoSmall.offsetLeft;
  offsetY = e.clientY - videoSmall.offsetTop;

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", () => {
    isDragging = false;
    document.removeEventListener("mousemove", onMouseMove);
  });
});

function onMouseMove(e) {
  if (isDragging) {
    const newX = e.clientX - offsetX;
    const newY = e.clientY - offsetY;

    videoSmall.style.left = newX + "px";
    videoSmall.style.top = newY + "px";
  }
}

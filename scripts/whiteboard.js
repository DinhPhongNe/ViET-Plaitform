const whiteboardContainer = document.getElementById('whiteboard-container');
const whiteboardCanvas = new fabric.Canvas('whiteboard');
let currentColor = 'black';
let currentLineWidth = 5;
let isHighlight = false;
let currentTool = 'freeDrawing'; // Default tool
let startX, startY, tempShape;

// Function to toggle whiteboard visibility
function toggleWhiteboard() {
    if (whiteboardContainer.style.display === 'block') {
        whiteboardContainer.style.display = 'none';
        whiteboardCanvas.clear(); // Clear canvas on hide
    } else {
        whiteboardContainer.style.display = 'block';
    }
}

document.querySelector('.feather-users').addEventListener('click', toggleWhiteboard);

// Initialize default free drawing mode
whiteboardCanvas.isDrawingMode = true;
whiteboardCanvas.freeDrawingBrush = new fabric.PencilBrush(whiteboardCanvas);
updateBrushProperties();

// Toolbar buttons
const toolbar = document.createElement('div');
toolbar.id = 'toolbar';
whiteboardContainer.appendChild(toolbar);

// Clear button (keeps in main toolbar)
const clearButton = document.createElement('button');
clearButton.textContent = 'Xóa';
clearButton.onclick = () => whiteboardCanvas.clear(); // Clear canvas
toolbar.appendChild(clearButton);

// Color picker (keeps in main toolbar)
const colorPicker = document.createElement('input');
colorPicker.type = 'color';
colorPicker.value = currentColor;
colorPicker.addEventListener('change', (e) => {
    currentColor = e.target.value;
    updateBrushProperties();
});
toolbar.appendChild(colorPicker);

// Line width slider (keeps in main toolbar)
const lineWidthSlider = document.createElement('input');
lineWidthSlider.type = 'range';
lineWidthSlider.min = 1;
lineWidthSlider.max = 50;
lineWidthSlider.value = currentLineWidth;
lineWidthSlider.addEventListener('input', (e) => {
    currentLineWidth = parseInt(e.target.value, 10);
    updateBrushProperties();
});
toolbar.appendChild(lineWidthSlider);

// Tạo một menu dropdown chung
function createDropdownMenu(title, options) {
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown';

    // Button chính
    const mainButton = document.createElement('button');
    mainButton.textContent = title;
    dropdown.appendChild(mainButton);

    // Menu con
    const dropdownContent = document.createElement('div');
    dropdownContent.className = 'dropdown-content';

    options.forEach((option) => {
        const button = document.createElement('button');
        button.textContent = option.label;
        button.onclick = option.action;
        dropdownContent.appendChild(button);
    });

    dropdown.appendChild(dropdownContent);
    return dropdown;
}

// Clear button dropdown
toolbar.appendChild(
    createDropdownMenu('Tools', [
        { label: 'Xóa', action: () => whiteboardCanvas.clear() },
        {
            label: 'Highlight',
            action: () => {
                isHighlight = !isHighlight;
                if (isHighlight) {
                    whiteboardCanvas.freeDrawingBrush.color = 'rgba(255, 255, 0, 0.3)';
                } else {
                    updateBrushProperties();
                }
            },
        },
    ])
);

// Tool selection dropdown
toolbar.appendChild(
    createDropdownMenu('Shapes', [
        { label: 'Free Drawing', action: () => { currentTool = 'freeDrawing'; whiteboardCanvas.isDrawingMode = true; } },
        { label: 'Line', action: () => { currentTool = 'line'; whiteboardCanvas.isDrawingMode = false; } },
        { label: 'Circle', action: () => { currentTool = 'circle'; whiteboardCanvas.isDrawingMode = false; } },
        { label: 'Rectangle', action: () => { currentTool = 'rectangle'; whiteboardCanvas.isDrawingMode = false; } },
        { label: 'Text', action: () => { currentTool = 'text'; whiteboardCanvas.isDrawingMode = false; } },
    ])
);

// Color and line width dropdown
toolbar.appendChild(
    createDropdownMenu('Settings', [
        {
            label: 'Color Picker',
            action: () => colorPicker.click(),
        },
        {
            label: 'Line Width',
            action: () => lineWidthSlider.click(),
        },
    ])
);

// Canvas events
whiteboardCanvas.on('mouse:down', (options) => {
    const pointer = whiteboardCanvas.getPointer(options.e);
    startX = pointer.x;
    startY = pointer.y;

    // Kiểm tra nếu người dùng click vào một đối tượng text đang được chỉnh sửa
    const activeObject = whiteboardCanvas.getActiveObject();
    if (activeObject && activeObject.type === 'textbox') {
        activeObject.enterEditing();  // Bắt đầu chỉnh sửa ngay lập tức
    } else {
        // Nếu click ngoài, kết thúc chế độ chỉnh sửa của text
        if (activeObject && activeObject.type === 'textbox' && activeObject.isEditing) {
            activeObject.exitEditing();
        }
    }
});

// Mouse move event for drawing shapes
whiteboardCanvas.on('mouse:move', (options) => {
    if (!startX || !startY || currentTool === 'freeDrawing') return;

    const pointer = whiteboardCanvas.getPointer(options.e);
    const endX = pointer.x;
    const endY = pointer.y;

    // Remove temporary shape if exists
    if (tempShape) whiteboardCanvas.remove(tempShape);

    if (currentTool === 'line') {
        tempShape = new fabric.Line([startX, startY, endX, endY], {
            stroke: currentColor,
            strokeWidth: currentLineWidth,
            selectable: false,
        });
    } else if (currentTool === 'circle') {
        const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)) / 2;
        tempShape = new fabric.Circle({
            left: Math.min(startX, endX),
            top: Math.min(startY, endY),
            radius: radius,
            fill: 'transparent',
            stroke: currentColor,
            strokeWidth: currentLineWidth,
            selectable: false,
        });
    } else if (currentTool === 'rectangle') {
        tempShape = new fabric.Rect({
            left: Math.min(startX, endX),
            top: Math.min(startY, endY),
            width: Math.abs(endX - startX),
            height: Math.abs(endY - startY),
            fill: 'transparent',
            stroke: currentColor,
            strokeWidth: currentLineWidth,
            selectable: false,
        });
    }

    whiteboardCanvas.add(tempShape);
    whiteboardCanvas.renderAll();
});

// Mouse up event for finalizing shapes
whiteboardCanvas.on('mouse:up', (event) => {
    if (currentTool === 'text') {
        const pointer = whiteboardCanvas.getPointer(event.e);
        const text = new fabric.Textbox('Click to edit text', { // Placeholder text
            left: pointer.x,
            top: pointer.y,
            fontSize: 20,
            fill: currentColor,
            editable: true,  // Cho phép chỉnh sửa
            hasControls: true, // Hiện các điều khiển resize
        });

        // Đảm bảo text có thể chỉnh sửa và thay đổi giá trị khi người dùng click vào
        text.on('modified', () => {
            text.setCoords();
        });

        // Chỉ đặt placeholder nếu người dùng chưa chỉnh sửa
        text.on('editing:entered', () => {
            if (text.text === 'Click to edit text') {
                text.text = '';  // Xóa placeholder khi bắt đầu chỉnh sửa
            }
        });

        // Thêm vào canvas và chọn đối tượng vừa tạo
        whiteboardCanvas.add(text);
        whiteboardCanvas.setActiveObject(text); // Làm cho text trở thành đối tượng đang được chỉnh sửa

        // Bắt đầu chế độ chỉnh sửa ngay khi thêm text mới
        text.enterEditing();
    } else {
        // Thêm hình vào canvas khi vẽ xong (đối với các hình khác)
        if (tempShape) {
            whiteboardCanvas.add(tempShape);
            tempShape = null; // Reset lại shape tạm thời sau khi vẽ xong
        }
    }

    // Reset start positions after drawing is complete
    startX = null;
    startY = null;
});

// Helper to update brush properties
function updateBrushProperties() {
    whiteboardCanvas.freeDrawingBrush.color = currentColor;
    whiteboardCanvas.freeDrawingBrush.width = currentLineWidth;
}

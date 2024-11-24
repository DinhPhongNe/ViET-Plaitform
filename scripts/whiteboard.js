const whiteboardContainer = document.getElementById('whiteboard-container');
const whiteboardCanvas = new fabric.Canvas('whiteboard');
let currentColor = 'black';
let currentLineWidth = 5;
let isHighlight = false;
let currentTool = 'freeDrawing';
let startX, startY, tempShape;

function toggleWhiteboard() {
    if (whiteboardContainer.style.display === 'block') {
        whiteboardContainer.style.display = 'none';
        whiteboardCanvas.clear();
    } else {
        whiteboardContainer.style.display = 'block';
    }
}

document.querySelector('.feather-users').addEventListener('click', toggleWhiteboard);

whiteboardCanvas.isDrawingMode = true;
whiteboardCanvas.freeDrawingBrush = new fabric.PencilBrush(whiteboardCanvas);
updateBrushProperties();

const toolbar = document.createElement('div');
toolbar.id = 'toolbar';
whiteboardContainer.appendChild(toolbar);

const clearButton = document.createElement('button');
clearButton.textContent = 'Xóa';
clearButton.onclick = () => whiteboardCanvas.clear();
toolbar.appendChild(clearButton);

const colorPicker = document.createElement('input');
colorPicker.type = 'color';
colorPicker.value = currentColor;
colorPicker.addEventListener('change', (e) => {
    currentColor = e.target.value;
    updateBrushProperties();
});
toolbar.appendChild(colorPicker);

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

function createDropdownMenu(title, options) {
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown';

    const mainButton = document.createElement('button');
    mainButton.textContent = title;
    dropdown.appendChild(mainButton);

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

toolbar.appendChild(
    createDropdownMenu('Shapes', [
        { label: 'Free Drawing', action: () => { currentTool = 'freeDrawing'; whiteboardCanvas.isDrawingMode = true; } },
        { label: 'Line', action: () => { currentTool = 'line'; whiteboardCanvas.isDrawingMode = false; } },
        { label: 'Circle', action: () => { currentTool = 'circle'; whiteboardCanvas.isDrawingMode = false; } },
        { label: 'Rectangle', action: () => { currentTool = 'rectangle'; whiteboardCanvas.isDrawingMode = false; } },
        { label: 'Text', action: () => { currentTool = 'text'; whiteboardCanvas.isDrawingMode = false; } },
    ])
);

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

whiteboardCanvas.on('mouse:down', (options) => {
    const pointer = whiteboardCanvas.getPointer(options.e);
    startX = pointer.x;
    startY = pointer.y;

    const activeObject = whiteboardCanvas.getActiveObject();
    if (activeObject && activeObject.type === 'textbox') {
        activeObject.enterEditing();
    } else {
        if (activeObject && activeObject.type === 'textbox' && activeObject.isEditing) {
            activeObject.exitEditing();
        }
    }
});

whiteboardCanvas.on('mouse:move', (options) => {
    if (!startX || !startY || currentTool === 'freeDrawing') return;

    const pointer = whiteboardCanvas.getPointer(options.e);
    const endX = pointer.x;
    const endY = pointer.y;

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

whiteboardCanvas.on('mouse:up', (event) => {
    if (currentTool === 'text') {
        const pointer = whiteboardCanvas.getPointer(event.e);
        const text = new fabric.Textbox('Click to edit text', {
            left: pointer.x,
            top: pointer.y,
            fontSize: 20,
            fill: currentColor,
            editable: true,
            hasControls: true,
        });

        text.on('modified', () => {
            text.setCoords();
        });

        text.on('editing:entered', () => {
            if (text.text === 'Click to edit text') {
                text.text = '';
            }
        });

        whiteboardCanvas.add(text);
        whiteboardCanvas.setActiveObject(text);

        text.enterEditing();
    } else {
        if (tempShape) {
            whiteboardCanvas.add(tempShape);
            tempShape = null;
        }
    }

    startX = null;
    startY = null;
});

function updateBrushProperties() {
    whiteboardCanvas.freeDrawingBrush.color = currentColor;
    whiteboardCanvas.freeDrawingBrush.width = currentLineWidth;
}

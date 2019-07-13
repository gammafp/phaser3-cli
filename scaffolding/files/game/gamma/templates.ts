export const info_drag = `
<style>
* {
    padding: 0px;
    margin: 0px;
}

body {
    background-color: black;
}

#canvas_container {
    display: flex;
    justify-content: center;
    margin-top: 100px;
}

#canvas_container > div#canvas {
    width: 640px;
    height: 360px;
    background-color: coral;
}

.drag_info {
    font-family: Arial, Helvetica, sans-serif;
    width: 100px;
    height: 70px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding-bottom: 5px;
    border-radius: 0px 0px 5px 5px;
    overflow: hidden;
}

.drag_info .xy_info {
    padding-top: 5px;
    padding-left: 5px;
    font-size: .9rem;
}

.drag_info .xy_info .x_info .x_pos_text,
.drag_info .xy_info .y_info .y_pos_text {
    width: 10%;
    display: inline-block;
}

.drag_info .xy_info .x_info .x_pos,
.drag_info .xy_info .y_info .y_pos {
    width: 80%;
    display: inline-block;
    text-align: right;
}

.drag_info .accept_button {
    display: inline-block;
    width: 100%;
    margin-top: 12px;
    padding-top: 5px;
    padding-bottom: 5px;
    text-align: center;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: #2c3e50;
    color: white;
}

.drag_info .accept_button:hover {
    background-color: #34495e;
}

.drag_info .accept_button:active {
    outline: 1px solid #2980b9;
}
</style>
<!-- HTML -->
<div class="drag_info">
    <div class="xy_info">
        <div class="x_info">
            <span class="x_pos_text">X: </span>
            <span class="x_pos" id="x_pos_drag_info">0</span>
        </div>
        <div class="y_info">
            <span class="y_pos_text">Y: </span>
            <span class="y_pos" id="y_pos_drag_info">0</span>
        </div>
    </div>
    <button class="accept_button" id="drag_info_button_send">
        OK
    </button>
</div>
`;
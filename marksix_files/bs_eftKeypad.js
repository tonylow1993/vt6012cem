<!--

var randOK = false;
var g_pin = "";
var arr = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
var fixed_pin_length = 8;

function Capture(evt) {
	var event = window.event || evt;
	event.returnValue = false;
}

function genRandBtn() {
	var i, ran1, ran2, temp;

	for (i = 0; i < 50; i++) {
		ran1 = Math.floor(Math.random() * 10);
		ran2 = Math.floor(Math.random() * 10);
		temp = arr[ran1];
		arr[ran1] = arr[ran2];
		arr[ran2] = temp;
	}

	for (i = 0; i < 10; i++) {
		$('#pinBtn' + i).attr("src", get_image_lang("pic_" + arr[i]));
	}
	randOK = true;
}

function clrPin() {
	g_pin = '';
	$('#pin').val('');
}

function inputPin(i) {
	if (!$('#pin').is(":disabled")) {
		$('#pinBtn' + i).src = get_image_lang("pic_" + arr[i]);
		if (randOK && g_pin.length < fixed_pin_length) {
			g_pin = g_pin + arr[i];
		}
		$('#pin').val(g_pin);
	}
}

function inputPinDown(i) {
	$('#pinBtn' + i).src = get_image_lang("pic_" + arr[i] + "down");
}

function inputPinOut(i) {
	$('#pinBtn' + i).src = get_image_lang("pic_" + arr[i]);
}

function Backspace() {
	g_pin = g_pin.substring(0, g_pin.length - 1);
	$('#pin').val(g_pin);
}


//-->
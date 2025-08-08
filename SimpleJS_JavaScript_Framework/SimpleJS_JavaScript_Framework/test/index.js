//This index.js file is connected to index.html

doc.setText("MyDiv", "Hello World!")

function hideDiv() {
  //Hides the div
  doc.hide("MyDiv");
}

function showDiv() {
  //Shows the div
  doc.show("MyDiv");
  doc.enable("hideBtn")
  doc.setText("MyDiv", "Hello World!")
}

function clearDiv() {
  doc.clear("MyDiv");
  doc.disable("hideBtn")
}

doc.addOnClick("MyDiv", "hideDiv()")


//doc.onHover("MyDiv", "hideDiv()", "showDiv()")

/*const sock = server.connect("https://localhost:1000", {
  onOpen: () => console.log("Connected"),
  onMessage: data => console.log("Received:", data),
  onClose: () => console.log("Connection closed"),
  onError: err => console.error("WebSocket error:", err),
});*/

// isEqual
const obj1 = { name: "Alice", scores: [10, 20], meta: { age: 30 } };
const obj2 = { name: "Alice", scores: [10, 20], meta: { age: 30 } };
const obj3 = { name: "Alice", scores: [10, 25], meta: { age: 30 } };

console.log(utility.isEqual(obj1, obj2)); // true
console.log(utility.isEqual(obj1, obj3)); // false


//WEBGL ----- src/gameDev/webgl.js

gl.MakeShape(-0.5, 0.5, 0.0, 0.0, 0.5, -0.5);

// Weather

doc.WeatherIframe("https://embed.windy.com/embed2.html?lat=37.7749&lon=-122.4194&zoom=5&level=surface&overlay=radar&menu=&message=", "test", "test");


# How to use SimpleJS
To use SimpleJS, you mush have `<script src="https://1gfv621i.live.codepad.app/SimpleJS/main.js"></script>` above all other <script></script> elements for it to work. 

## Snippets
These little code snippets is what SimpleJS has to bring. They are all seperated via what they do. 

## DOM API
These are mainly for Front-end web development. 

doc.setTitle("MyTitle");

doc.getId("MyId");

doc.getClassName("MyClass");

doc.selectQuery("MyQuery");

doc.selectQueries("MyQueries);

doc.selectTag("MyTag");

doc.addListener("MyId", "MyEvent", "MyCallback");

doc.getTagNames("MyTags");

doc.addClass("MyElement", "MyClass");

doc.removeClass("MyElement", "MyClass");

doc.setAttr("MyElement", "MyAttr", "MyValue");

doc.removeAttr("MyElement", "MyAttr");

doc.setText("MyId", "MyText");

doc.getText("MyId");

doc.setStyle("MyId", { "MyStyle": "MyValue" });

doc.hide("MyId");

doc.show("MyId");

doc.addOnClick("MyId", "MyFunction");

doc.onHover("MyId", "MyEnterFunction", "MyLeaveFunction");

doc.clear("MyId");

doc.disable("MyId");

doc.enable("MyId");

doc.onKey("MyId", "MyKey", "MyCallback");

doc.ready("MyCallback");

doc.scrollTo("MyId", "MyBehavior");

doc.setHTML("MyId", "MyHTML");

doc.isVisible("MyId");

doc.wait("milliseconds");

## CONSTANTS (Just Extra)
window.set("MyURL");

openWindow("MyURL", "MyArgs")

windowHeight();

windowWidth();

closeWindow();

fn myFunction(...args) {

  return "Hello, World";

}

timeout(myFunction, 1000);

## Logging
Custom logger, it basically just logs to the console, but with a different format.

log.info("MyInfo");

log.warn("MyWarning");

log.err("MyError");

log.debug("MyDebug");

## Arrays
One of the hardest parts of it all.

Array.prototype.add("MyElement");

Array.prototype.remove("MyElement");

## Networking
The hardest part of it all. Like I said, it's mainly Front-end, and I really would like to develop a backend side.

**This part is still under heavy development and may not connect to any web sockets - please be patient**

server.connect("MyURL", {

  onOpen: () => console.log("Connected"),

  onMessage: data => console.log("Received:", data),

  onClose: () => console.log("Connection closed"),

  onError: err => console.error("WebSocket error:", err),

});



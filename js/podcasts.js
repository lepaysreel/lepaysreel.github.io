function log(msg)
{
  setTimeout(function() { throw new Error(msg); }, 0);
}

function doTitle(col, item)
{
  var hdr = document.createElement("h4");
  var title = item.getElementsByTagName("title")[0];
  var txt = document.createTextNode(title.textContent.toString());

  hdr.appendChild(txt);
  col.appendChild(hdr);
}

function doSubtitle(col, item)
{
  var par = document.createElement("p");
  var em = document.createElement("em");
  var date = item.getElementsByTagName("pubDate")[0];
  var creators = item.getElementsByTagName("creator");
  var d = new Date(date.textContent.toString());
  var subtitle = "Emission du " + d.toLocaleDateString();

  if (creators . length != 0)
  {
    subtitle += ", présentée par " + creators[0].textContent.toString();
  }

  var txt = document.createTextNode(subtitle);
  em.appendChild(txt); par.appendChild(em); col.appendChild(par);
}

function doDescription(col, item)
{
  var par = document.createElement("p");
  var desc = item.getElementsByTagName("description")[0];
  var txt = document.createTextNode(desc.textContent.toString());
  par.appendChild(txt); col.appendChild(par);
}

function doAudioElement(col, item)
{
  var aud = document.createElement("audio");
  aud.setAttribute("preload", "metadata");
  aud.setAttribute("controls", "");

  var src = document.createElement("source");
  var lnk = item.getElementsByTagName("enclosure")[0];

  src.setAttribute("src", lnk.getAttribute("url"));
  src.setAttribute("type", lnk.getAttribute("type"));

  aud.appendChild(src);
  col.appendChild(aud);
}

function loadPodcast(div)
{
  var path = div.getAttribute("name");

  // Create a connection to the file.
  var xmlReq = new XMLHttpRequest();

  // Define which file to open and send the request.
  xmlReq.open("GET", path, false);
  xmlReq.setRequestHeader("Content-Type", "text/xml");
  xmlReq.send(null);

  // Place the response in an XML document.
  var xmlRsp = xmlReq.responseXML;

  // Get the channel
  var Podcast = xmlRsp.childNodes[0];
  var Channel = Podcast.getElementsByTagName("channel");
  var Title = Channel[0].getElementsByTagName("title");

  // var Hdr = document.createElement("h2");
  // var HdrTxt = document.createTextNode(Title[0].textContent.toString());
  // Hdr.appendChild(HdrTxt);
  // div.appendChild(Hdr);

  // Scan the channels

  var Items = Channel[0].getElementsByTagName("item");

  for (var j = 0; j < Items.length; j++)
  {
    doTitle(Col, Items[j]);
    doSubtitle(Col, Items[j]);
    doDescription(Col, Items[j]);

    // doAudioElement(Col, Items[j]);
  }
}

function loadPodcasts()
{
  var podcasts = document.getElementsByClassName('podcast');

  for (var i = 0; i < podcasts.length; i += 1)
  {
    loadPodcast(podcasts[i]);
  }
}

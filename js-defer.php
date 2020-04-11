<html>
<head>

<title>Deferred Scripts</title>

<style>
/* Yahoo! CSS reset ... see developer.yahoo.com/yui for details */
body,div,dl,dt,dd,h1,h2,h3,h4,h5,h6,pre,form,fieldset,input,blockquote,th,td{margin:0;padding:0;}table{border-collapse:collapse;border-spacing:0;}fieldset,img{border:0;}address,caption,cite,code,dfn,em,strong,th,var{font-style:normal;font-weight:normal;}caption,th {text-align:left;}h1,h2,h3,h4,h5,h6{font-size:100%;}q:before,q:after{content:'';}
/* Yahoo! font reset ... see developer.yahoo.com/yui for details */
body {font:13px arial,helvetica,clean,sans-serif;*font-size:small;*font:x-small;}table {font-size:inherit;font:100%;}select, input, textarea {font:99% arial,helvetica,clean,sans-serif;}pre, code {font:115% monospace;*font-size:100%;}body * {line-height:1.22em;}
cite span { float:right; padding:8px; }
cite { border-top:1px solid #00a9a9; display:block; font-size:87%; padding:10px; }

BODY { 
  padding: 0px; 
  margin: 0px; 
  font-family: Arial,Helvetica;
  font-size: 11pt;
}
.header { padding: 10px; background: #00a9a9; color: #FFF; font-family: Times, serif; font-size: 200%; }
.subheader { padding: 4px 10px 4px 10px; background: #FFF; font-size: 1.2em; }
.footer { padding: 0 10px 10px 0px; font-size: 8pt; }
.rulenav { float: right; padding: 8px; padding-top: 20px; valign: bottom;}
.exnav { float: right; padding: 8px; padding-top: 2px; }
.content { 
  padding: 10px;
  background: #FFFFFF;
  text-align: left;
}
.exheader {
  padding: 10px 10px 10px 0;
  font-size: 1.6em;
}
A { color: #550055; }
.ahover, ahover:visited {text-decoration: none; color: #550055; }
.ahover:hover {text-decoration: underline; color: #550055; }
A.example {
  color: #000;
  text-decoration: none;
  padding: 2px;
  font-size: 1em;
}
A.example:visited {
  color: #222;
  text-decoration: none;
  padding: 2px;
}
A.example:hover {
  background: #E6F1FF;
  text-decoration: underline;
}
.pagetitle {
  font-size: 1.8em;
  font-weight: bold;
}
.codesample {
  border: 1px solid #666;
  padding: 10px;
  font-family: Courier;
  background: #EEE;
  margin: 4px 30px 4px 50px;
}
span.takeaway {
  border: 2px solid #00388C;
  padding: 10px;
  font-weight: bold;
  background: #ECF3FF;
}
p.takeaway {
  margin: 30px 0 20px 0;
  text-align: center;
}
p.browsers {
  font-weight: bold;
  margin-bottom: -10px;
}

.navlink {
  font-size: 8pt;
  font-weight: bold;
  font-family: Arial,Helvetica;
  text-decoration: none;
  border: 1px solid #00a9a9;
  color: #FFF;
}
.navlink:visited {
  font-family: Arial,Helvetica;
  text-decoration: none;
}
.navlink:hover {
  font-family: Arial,Helvetica;
  border: 1px solid #705;
}

.navlinksel {
  font-family: Arial,Helvetica;
  font-size: 8pt;
  font-weight: bold;
  text-decoration: none;
  border: 1px solid #705;
  color: #705;
}


.exlink {
  color: #00a9a9;
  font-size: 8pt;
  font-weight: bold;
  text-decoration: none;
  border: 1px solid #FFF; /* transparent didn't work on IE */
}
.exlink:visited {
  text-decoration: none;
}
.exlink:hover {
  border: 1px solid #705;
}

.exlinksel {
  font-size: 8pt;
  font-weight: bold;
  text-decoration: none;
  border: 1px solid;
}

A.noline {
  text-decoration: none;
}
A.noline:visited {
  text-decoration: none;
}
A.noline:hover {
  text-decoration: underline;
}
.rule {
  font-weight: bold;
  border: 1px solid #222;
  background: #EEE;
  padding: 4px;
}
</style>


<script>


// DMO RUM BI
// domain:"m.col.ip-label.net/decode.php"
var rumbiConf={id:"testazure",CLOBSDEBUG_ipln:1,v:0, performancetiming:3, observerstart: new Date(), resourceTiming:1};
var iplcustomdim="test";


//Souders
/*rti_addHandler(window, "load", doOnload);
rti_addHandler(window, "beforeunload", doUnload);
rti_addHandler(window, "beforeunload", clearPage);

var t_page_start = Number(new Date());
var t_page, t_done;

function doUnload() {
    var start = Number(new Date());

    rt_setCk("RT", "s=" + start + "&r=" + escape(document.location), 0, "/", document.location.hostname);
} */


/*
function doOnload() {
    var end = Number(new Date());  // get a timestamp FIRST THING!

    // We can definitely get the time for this page.
    t_page = end - t_page_start;

    // Extract values from the RT cookie and override the default values above.
    if ( "" != rt_getCk("RT") ) {
        ref = rt_getSCk("RT", "r");
	realref = escape(document.referrer);

	if ( ref && realref && ref == realref ) {
	    // Only show the roundtrip response time if the referrer is this page.
            start = Number(rt_getSCk("RT", "s"));
            t_done = end - start;
        }

        // Remove the cookie, so that it doesn't linger around and cause erroneous long response times.
        rt_rmCk("RT", document.location.hostname);
    }

    var div1 = document.getElementById("t_done");
    if ( "undefined" == typeof(t_done) ) {
        div1 = document.getElementById("t_done_msg");
        div1.innerHTML = "<i><a href='?t=" + Number(new Date()) + "'>click here</a> to see the roundtrip response time</i>";
    }
    else {
        div1.innerHTML = "<b>" + t_done + " ms</b>&nbsp;";
        div1 = document.getElementById("t_done_msg");
        div1.innerHTML = "<i><a href='?t=" + Number(new Date()) + "'>try it again</a></i>";
    }

    //div1 = document.getElementById("t_page");
    //div1.innerHTML = "<b>" + t_page + " ms</b>";
}  */

// Do this to better illustrate how long the user waits for the page to load.
/*function clearPage() {
    document.body.style.display = "none";
}
*/

//DMO resource timing
function calculate_load_times() {
  // Check performance support
  if (performance === undefined) {
    console.log("= Calculate Load Times: performance NOT supported");
    return;
  }

  // Get a list of "resource" performance entries
  var resources = performance.getEntriesByType("resource");
  if (resources === undefined || resources.length <= 0) {
    console.log("= Calculate Load Times: there are NO `resource` performance records");
    return;
  }

  console.log("= Calculate Load Times");
  for (var i=0; i < resources.length; i++) {
    console.log("== Resource[" + i + "] - " + resources[i].name);
    // Redirect time
    var t = resources[i].redirectEnd - resources[i].redirectStart;
    console.log("... Redirect time = " + t);

    // DNS time
    t = resources[i].domainLookupEnd - resources[i].domainLookupStart;
    console.log("... DNS lookup time = " + t);

    // TCP handshake time
    t = resources[i].connectEnd - resources[i].connectStart;
    console.log("... TCP time = " + t);

    // Secure connection time
    t = (resources[i].secureConnectionStart > 0) ? (resources[i].connectEnd - resources[i].secureConnectionStart) : "0";
    console.log("... Secure connection time = " + t);

    // Response time
    t = resources[i].responseEnd - resources[i].responseStart;
    console.log("... Response time = " + t);

    // DMO server Response time
    t = resources[i].responseStart - resources[i].requestStart;
    console.log("... Server Response time = " + t);

    // Fetch until response end
    t = (resources[i].fetchStart > 0) ? (resources[i].responseEnd - resources[i].fetchStart) : "0";
    console.log("... Fetch until response end time = " + t);

    // Request start until reponse end
    t = (resources[i].requestStart > 0) ? (resources[i].responseEnd - resources[i].requestStart) : "0";
    console.log("... Request start until response end time = " + t);

    // Start until reponse end
    t = (resources[i].startTime > 0) ? (resources[i].responseEnd - resources[i].startTime) : "0";
    console.log("... Start until response end time = " + t);
  }
}

window.addEventListener("load", function load(event){
    console.log("All resources finished loading!");
    calculate_load_times();  
},false);

</script>

<script id="clobscript" type="text/javascript" src="http://w1.col.ip-label.net/Data/proto.js"></script>
     

</head>

<body>

<div class="content"> <!-- hold all content for the page -->

<p>
<table border=0 cellpadding=2 cellspacing=0>
  <tr>
    <td align=right>Roundtrip response time: </td>
    <td align=right><span id=t_done></span></td>
    <td><span id=t_done_msg style="font-size: 0.9em"></span></td>
  <tr>
</table>

<img src="http://stevesouders.com/bin/sleep.cgi?type=gif&expires=-1&last=0&imagenum=1&t=1438875076" height=20>
<img src="http://stevesouders.com/bin/sleep.cgi?type=gif&expires=-1&last=0&imagenum=2&t=1438875076" height=20>
<img src="http://stevesouders.com/bin/sleep.cgi?type=gif&expires=-1&last=0&imagenum=3&t=1438875076" height=20>
<img src="http://stevesouders.com/bin/sleep.cgi?type=gif&expires=-1&last=0&imagenum=4&t=1438875076" height=20>

<p>  
This script does not respond for 5s and blocks the page!
The <code>DEFER</code> or <code>asynch </code>attributes for scripts don't solve the issue.
In Firefox, rendering and downloads are still blocked.
In IE, the script is still downloaded, taking up one of the two download slots for that hostname.
</p>
<script src="http://stevesouders.com/bin/sleep.cgi?type=js&sleep=5&expires=-1&last=0" asynch></script>

<img src="http://stevesouders.com/bin/sleep.cgi?type=gif&sleep=2&expires=-1&last=0&imagenum=1&t=1438875076" height=20>
<img src="http://stevesouders.com/bin/sleep.cgi?type=gif&sleep=1&expires=-1&last=0&imagenum=2&t=1438875076" height=20>
<img src="http://stevesouders.com/bin/sleep.cgi?type=gif&sleep=1&expires=-1&last=0&imagenum=3&t=1438875076" height=20>
<img src="http://stevesouders.com/bin/sleep.cgi?type=gif&sleep=1&expires=-1&last=0&imagenum=4&t=1438875076" height=20>

<!--<p>The image below is on a HTTPs port not opened, so the TCP connection is blocked and retried at 3+6+12=21seconds</p> -->
<!--<img src="https://vps338224.ovh.net/fake.jpg" height=20>     -->


<style>
.content { 
  background: red;
}
</style>

</div> <!-- close content div -->

   <cite><span><a href="http://stevesouders.com/">stevesouders.com</a> | <a href="http://stevesouders.com/contact.php">contact Steve</a></span><img src="http://stevesouders.com/images/greyhound_a_32x32.jpg" height="32" width="32" alt="Greyhound, the 2nd fastest land animal" align="absmiddle" style="margin-right: 4px;"/>This is the companion website for <a href="http://www.amazon.com/gp/product/0596529309?ie=UTF8&amp;tag=stevsoud-20&amp;linkCode=as2&amp;camp=1789&amp;creative=9325&amp;creativeASIN=0596529309">High Performance Web Sites</a> by Steve Souders.</cite>
</body>

</html>


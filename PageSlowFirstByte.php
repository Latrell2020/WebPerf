<?php sleep(rand(10,23)); ?>

<html>
<head>

<title>Main Frame</title>

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

<script src="scripts/rum_speedindex.js" type="text/javascript"></script>

</head>

<body>

<div class="content"> <!-- hold top content for the page -->

<p>
<table border=0 cellpadding=2 cellspacing=0>
  <tr>
    <td align=right>this Main Frame is loaded first </td>
    <td align=right><span id=t_done></span></td>
    <td><span id=t_done_msg style="font-size: 0.9em"></span></td>
  <tr>
</table>

<img id="img1" data-link="toto" src="http://stevesouders.com/bin/sleep.cgi?type=gif&expires=-1&last=0&imagenum=1&t=1438875076" height=20>
<img src="http://stevesouders.com/bin/sleep.cgi?type=gif&expires=-1&last=0&imagenum=2&t=1438875076" height=20>
<img src="http://stevesouders.com/bin/sleep.cgi?type=gif&expires=-1&last=0&imagenum=3&t=1438875076" height=20>
<img src="http://stevesouders.com/bin/sleep.cgi?type=gif&expires=-1&last=0&imagenum=4&t=1438875076" height=20>

</p>
 
</div> <!-- close content div -->


<iframe id="frame1" src="PageSubFrame.php" /></iframe>


<div class="content"> <!-- hold bottom content for the page -->
<p>
<table border=0 cellpadding=2 cellspacing=0>
  <tr>
    <td align=right>Bottom Content </td>
    <td align=right><span id=t_done></span></td>
    <td><span id=t_done_msg style="font-size: 0.9em"></span></td>
  <tr>
</table>

<img src="http://stevesouders.com/bin/sleep.cgi?type=gif&expires=-1&last=0&imagenum=1&t=1438875076" height=20>
<img src="http://stevesouders.com/bin/sleep.cgi?type=gif&expires=-1&last=0&imagenum=2&t=1438875076" height=20>

</p>
</div> <!-- close content div -->

<!--<frameset cols="128,*" border="0">

</frameset>       -->

</body>
</html>


<?php 
  sleep(5);   
?>


<html>
<head>

<title>Sub Frame</title>

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
</style>


</head>

<body>

<div class="content"> <!-- hold all content for the page -->

<p>
<table border=0 cellpadding=2 cellspacing=0 style="background:blue;">
  <tr>
    <td align=right>this Sub Frame is loaded after 5s </td>
  <tr>
</table>
     
     <img src="http://stevesouders.com/bin/sleep.cgi?type=gif&expires=-1&last=0&imagenum=3&t=1438875076" height=20>
     <img src="http://stevesouders.com/bin/sleep.cgi?type=gif&expires=-1&last=0&imagenum=4&t=1438875076" height=20>
     <img src="http://stevesouders.com/bin/sleep.cgi?type=gif&expires=-1&last=0&imagenum=4&t=1438875076" height=20>
     <img src="http://stevesouders.com/bin/sleep.cgi?type=gif&expires=-1&last=0&imagenum=4&t=1438875076" height=20>

</p>

<frameset cols="128,*" border="0">
<frame  id="respgallery" src="frame.php" />
 </frameset>
 
</div> <!-- close content div -->
</body>

</html>


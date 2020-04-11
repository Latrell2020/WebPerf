var clobs = ({
	o: { //options
		version: "17.0.0.4",
		/**
           10.1.1.17 15/10 Ajout de Bada en OS, correction des expreg en conséquence
           10.2.1.1	 02/11 Ajout de la version
           10.2.1.2	 04/11 Utilisation d'un param d'URL au lieu du chemin du script pour déterminer l'id
           10.2.1.3	 19/11 Bug si liens avec du JS
           10.2.1.4  24/11 Ajout de cibles pour le collecteur
           10.2.1.5  25/11 Correction d'un bug sur la récupération de l'id tracker
           10.2.1.6	 29/11 Bug Pour les URL qui contiennent |, pas remplacé partout
           10.2.1.7  06/12 Ajout cible Chine
           10.2.1.8  07/12 Bug sur la reconnaissance des iPad et iPod
           11.1.0.0  09/05 mise en place de la detection du domain principale pour le cookie trans sous domaine
           11.1.0.1  19/05 [E.VISTA I110516_000050] Correctif: phénomène de timestamp 'clicklink' pris en compte à la place d'un "submitform" danc certains cas
           11.1.0.2  31/05 Ajout collecteur Cloud
           11.2.0.1  12/07 Ajout dimension custom, du parametre iplparcours, www.azure-observer.com devient col001.ip-label.net
           11.2.0.2-b 09/09 Ajout des fonctions liées à la mesure de ligne ( clobj_ext.js optionnel) version beta
           11.2.0.2-c 27/09 Correctif ecrasement de la custom dim.
           11.2.1.0   27/10 Ajout de la mesure optionnel du CPU
           11.2.2.0   21/12 Variable iplndomain force l'url du collecteur sur un URL custom; Ajout d'un random (param ra) pour le lancement ou non de la collecte (tous les 1/ra)
           11.2.2.0-b 29/12 correctif sur le lancement des tests de debit
					 /!\ Prochaine release : traiter le commentaire de la ligne 694
           12.2.1.0	  11/10 Correction detection resolution iphone, mesure CPU sur iphone, rajout url de preprod en 7
           12.2.1.1	  30/10 Distinction iPhone 3 / 4 / 5
           12.2.1.2   30/10 Distinction iPhone4 / 4S
           12.2.1.3   05/12 Performance timing
           13.1.0.0   01/13 Tentative correction bug des doublons
                            Dot remplacé par dot_S4qoPdm2
                            Check sur l'ecriture de l'image
           13.2.0.0   06/13 Metriques Performance Timing v3
           13.2.0.1   06/13 Metriques Performance Timing la Redoute
           13.2.0.3   06/13 Correctif fonction f3, this.parentNode undefined dans certains cas
           13.2.0.4   10/13 Correction packaging source de bug), rajout collecteur AWS
           13.2.0.5   12/13 Ajout ajax timer
           14.0.0.0   01/14 Ajout des customs dim 2-5
           14.1.0.0   02/14 iplcustomer
           14.1.0.1   04/14 Correction escape -> encodeURIComponent
           14.1.0.2   08/14 Correction var c
           14.1.0.3   08/14 Correction attachEvent<->addEventListener
           14.1.0.4   10/11 Correction attachEvent<->addEventListener sur bind
           14.1.0.5   10/14 Correction incompatibilite mootools et datejs
           15.0.0.0   02/15 One Global Variable
           15.0.0.1   06/15 Added startTimer and stopTimer using sessionStorage (ag2r)
                            Added cookie cleaning
                            Added sessionStorage support (replacing cookies on modern browsers)
           15.0.0.2   07/15 Added sm for sending customer metrics
           15.0.0.3   09/15 Changed model for ipl_model, Time To Interactive (domInteractive)
           15.0.0.4   12/11 removed console.log because of ag2r's js
           16.1.0.0   01/16 added cookies to startTimer and stopTimer for IE7 support (dont ask)
           16.1.0.4   03/16 Forcing https: when document protocol is file: (cordova compatibility)
           16.1.0.5   03/16 Added perftiming 4, TTI only.
                            Script can now be loaded after onload event if that's the case, sends TTI only.
           16.1.0.6   03/16 Added temporal loop for perf timing checking after onload
                            Added empty ms function for MS Dynamics initialisation
           16.1.0.7   04/16 Bug fix safari in private mode (no quota on localstorage)
           16.1.0.8   05/16 All undefined replaced. CLOBSDEBUG_ipln in rumbiconf.
           16.1.0.9   05/16 Protection this.data.p.url this.data.p.ref.
           16.1.0.10  10/16 Fixed CLOBSDEBUG_ipln in rumbiconf (old API compatibility).
           16.1.0.11  11/16 Fixed possible blockin when using stopTimer before onload
           17.0.0.0   01/17 Empty PTQual metric & measure on stopTimer
           17.0.0.1   02/17 Rough resource timing stats17.0.0.1   02/17 Rough resource timing stats
           17.0.0.2   06/17 Removing eval
		   17.0.0.3   07/17 performancetiming==6 returns 2033:Overall Navigation Timing only
		   17.0.0.4   10/17 Fixes incompatibility between perf timing and stopTimer
        */
		/* Options écrasables par URL */
		/** options générales */
		//id : option sans valeur par défaut devant être absolument passée en URL, précisant l'id tracker
		i: {
			0: "cloud-observer.ip-label.net/Data/coll.ipl",
			1: "observer.ip-label.net/Data/coll.ipl",
			2: "www.azure-observer.com/Data/coll.aspx",
			3: "w1.col.ip-label.net/Data/coll.php",
			4: "col1.ip-label.net/Data/coll.ipl",
			5: "",
			6: "",
			7: "pre.col.ip-label.net/Data/coll.aspx",
			8: "observer.iplabel.cn/Data/coll.ipl",
			9: "col001.ip-label.net/Data/coll.aspx"
		}, //server ip
		v: 2, //niveau de vérif URL : 0 : strict = dest = curr + old = ref, 1 : au moins un des deux, autre = aucun contrôle
		/** options du module de test des objets */
		o: 0, //object : démarre ou non la mesure des objets. Cette option peut aussi être forcée à 0 par un paramètre dans la page web requêtée : iplstopo=1
		t: 6000, //timeout pour l'arrivée d'un objet
		td: 1000, // timer avant le déclenchement du 1er objet

		/* Options non modifiables par URL */
		/** options générales */
		id: "clobscript", //id de l'objet Script pour rechercher l'id tracker
		s: "|", //separateur
        un: 'undefined',
		srep: '@_@', //remplacement pour le séparateur
		d: 120000 //delta en ms accepté entre le clic et le chargement suivant pour conserver un temps
			//variable pour l'adresse ip : iplclientip
			//variable pour le start timer : iplobserverstart


		//ne pas ajouter la virgule finale
	},

	data: { //élément à envoyer
		s: {}, //session
		p: {}, //page
		t: {} //destiné à stocker les temps avant calcul
		/* on peut avoir deux objets de temps supplémentaires
				- ot (old time), celui de la page précédente,
				- ct (cdn time), celui du chargement d'un objet du module cdn */
	},
	trace: function() {
		var f = 0;
        if (rumbiConf) if (typeof rumbiConf.CLOBSDEBUG_ipln != clobs.o.un) f = 1;
		//if (typeof CLOBSDEBUG_ipln != clobs.o.un) f = 1;
		if ((window.location.href.indexOf("CLOBSDEBUG_ipln") > 0) || f == 1) {
			for (i = 0; i < arguments.length; i++) {
				if (arguments[i] == "SetGroup") {
					try {
						console.group(arguments[i + 1]);
					} catch (err) {};
					i++;
				} else try {
					console.info(arguments[i]);
				} catch (err) {};
			}
		}
	},
	b: function() { //bindtracker
		for (i = 0; i < document.links.length; i++)
			if (!(document.links[i].attached == true)) {
				try {
					document.links[i].addEventListener('click', clobs.f3, false);
				} //autres
				catch (err) {
					document.links[i].attachEvent('onclick', clobs.f3);
				} //ie
				document.links[i].attached = true;
			}
		for (i = 0; i < document.forms.length; i++)
			if (!(document.forms[i].attached == true)) {
				try {
					document.forms[i].addEventListener('submit', clobs.f4, false);
				} //autres
				catch (err) {
					document.forms[i].attachEvent('onsubmit', clobs.f4);
				} //ie
				document.forms[i].attached = true;
			}
		setTimeout('clobs.b()', 1000);
	},

	e: function(plainText) { //encrypt
		//console.log(plainText);
		var input = this.d("yAkaqe49", plainText, 1);
		var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		//console.log(input);
		var output = "";
		var chr1, chr2, chr3 = "";
		var enc1, enc2, enc3, enc4 = "";

		for (var i = 0; i < input.length;) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) + (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) + (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output += keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
		}
		return encodeURIComponent(output);
	},

	f1: function(e) {
		if (typeof iplobserverstart != clobs.o.un) clobs.data.t.iplobserverstart = iplobserverstart.getTime();
		else if (typeof rumbiConf.observerstart != clobs.o.un) clobs.data.t.iplobserverstart = rumbiConf.observerstart.getTime();
		clobs.data.t.jsinit = new Date().getTime()
	}, //début

	f2: function(e) {
		clobs.data.t.domload = new Date().getTime();

		//		if(clobs.data.s.dev == 'Pc' && clobs.data.s.mod=='NA' && clobs.o.cp) {clobs.data.s.mod = clobs.cpu(tosend);}
		//		else if (clobs.data.s.dev == 'phone' && clobs.data.s.mod=='iphone' && clobs.o.cp) {clobs.data.s.mod = clobs.data.s.mod+"@_@"+clobs.cpu(tosend);}

		clobs.trace("F2 begin[" + clobs.data.s.custom_level1 + "]");
		clobs.trace("F2[" + clobs.Ql + "]");
		clobs.trace("avant qualification [" + clobs.data.s.dev + "]");
		if (typeof Qualification != clobs.o.un && !Qualification.Has_been_lauched && typeof clobs.Ql == clobs.o.un && clobs.data.s.dev == 'Pc') {

			Qualification.launcher();
		} else {
			if (typeof clobs.Ql != clobs.o.un) {
				var Qtemparray = clobs.Ql.split("|");
				Qualification.RESULT.STRING = Qtemparray[0];
				Qualification.RESULT.LIB = Qtemparray[1];

				// 		clobs.data.s.custom_level1=clobs.Ql;
				clobs.trace("F2: On zap la qualification");
			}
			clobs.l();
		}

		//clobs.t_o_wrapper();
		clobs.trace("F2 end->[" + clobs.data.s.custom_level1 + "]");
		if (clobs.o.o == 1) setTimeout(clobs.t_o_wrapper, clobs.o.td); //page chargée. Démarre la partie CDN
	},

	ax: function(e) {
		clobs.data.p.url = e; //force URL's update
		clobs.data.iw = false; //image not written -> forces image rewritting
		clobs.data.t.domload = new Date().getTime();
		clobs.trace("ax begin[" + clobs.data.s.custom_level1 + "]");
		clobs.trace("ax[" + clobs.Ql + "]");
		clobs.trace("avant qualification [" + clobs.data.s.dev + "]");
		if (typeof Qualification != clobs.o.un && !Qualification.Has_been_lauched && typeof clobs.Ql == clobs.o.un && clobs.data.s.dev == 'Pc') {
			Qualification.launcher();
		} else {
			if (typeof clobs.Ql != clobs.o.un) {
				var Qtemparray = clobs.Ql.split("|");
				Qualification.RESULT.STRING = Qtemparray[0];
				Qualification.RESULT.LIB = Qtemparray[1];
				clobs.trace("ax: On zap la qualification");
			}
			clobs.l();
		}
		clobs.trace("AX end->[" + clobs.data.s.custom_level1 + "]");
	},
    startTimer:function(e) {
        if (typeof clobs.data.t.timer ==clobs.o.un) {
            clobs.trace('startTimer:notimer');
            clobs.data.t.timer = [];
        }
        clobs.data.t.timer[e] = new Date().getTime();
        clobs.trace("startTimer:sc ipl_timer_"+e);
        clobs.sc("ipl_timer_"+e, clobs.data.t.timer[e], null, '/');
        clobs.trace("clobs.startTimer ["+e+"] at ["+clobs.data.t.timer[e]+"]");
    },
    setTimer:function(e, t) {
//        console.log('setTimer');
//        console.log('setTimer:e='+e);
//        console.log('setTimer:t='+t);
//        console.log('setTimer:t.gettime='+t.getTime());
        if (typeof clobs.data.t.timer ==clobs.o.un) {
//            console.log('setTimer:notimer');
            clobs.data.t.timer = [];
        }
        clobs.data.t.timer[e] = t.getTime();
        if(typeof Storage !== clobs.o.un)
		{ //sessionStorage exists
//            console.log('setTimer:storage');
            try {
                window.sessionStorage.setItem('ipl_timer_'+e,clobs.data.t.timer[e]);//can't use JSON, too recent
            } catch(err) {
            }
//            console.log('setTimer:storing '+clobs.data.t.timer[e]);
//            console.log('setTimer:in'+e);
//            if (sessionStorage.getItem('ipl_timersValidity') != null) {//exists
//                var timesValidity_json =
//			}
		}
        clobs.trace("clobs.setTimer ["+e+"] at ["+clobs.data.t.timer[e]+"]");
    },
    stopTimer:function(e) {
        var stopTime = new Date().getTime();
        var nf=0;
        try {
            var lapsTime = -1;
			clobs.trace('stopTimer:storage ipl_timer_'+e+' ->'+clobs.gc('ipl_timer_'+e));
			if (clobs.gc('ipl_timer_'+e) != null) {
				lapsTime = stopTime - parseInt(clobs.gc('ipl_timer_'+e));
                clobs.sc('ipl_timer_'+e, "", -1, '/');//cleaning
				//window.sessionStorage.removeItem('ipl_timer_'+e);//put it back
			} else if (typeof (clobs.data.t.timer[e])!= clobs.o.un) {
				lapsTime = stopTime - clobs.data.t.timer[e];
				delete clobs.data.t.timer[e];
			}
            if (lapsTime > -1) {
                if (typeof lapsTime != clobs.o.un) if (lapsTime > 0) {
                    if (nf) {clobs.data.s.RTmetrics += ';';clobs.data.s.RTmeasure +=';';} else nf=1;
                    clobs.data.s.RTmetrics = '2027'; //2027:Ajax custom chrono
                    clobs.data.s.RTmeasure = '' + lapsTime;
                }
                clobs.data.p.url = e.substring(0,100);;//rumbiConf.trackObject; //force URL's update
            	clobs.data.iw = false; //image not written -> forces image rewritting
				clobs.PTQual.metrics = "";//Only custom metric should be sent
				clobs.PTQual.measure = "";
                clobs.l();//send the results
            }
        } catch(err) {
            clobs.trace('stopTimer:error');
        }
    },
    sm:function(e,f,g) {
        var nf=0;
        f = parseInt(f);
        g = parseInt(g);
        try {
            if (!isNaN(f)&&!isNaN(g)) {
                if (nf) {clobs.data.s.RTmetrics += ';';clobs.data.s.RTmeasure +=';';} else nf=1;
                clobs.data.s.RTmetrics = '' + f; //Metric Number
                clobs.data.s.RTmeasure = '' + g; //Value
                clobs.data.p.url = e.substring(0,100);;//rumbiConf.trackObject; //force URL's update
				clobs.data.iw = false; //image not written -> forces image rewritting
				clobs.PTQual.metrics = "";//Only custom metric should be sent
				clobs.PTQual.measure = "";
                clobs.l();//send the results
            }
        } catch(err) {}
    },
	f3: function(e) { //click sur un lien
		clobs.trace('F3(click) lance');
		clobs.data.t.clicklink = new Date().getTime();
		if (typeof iplajax != clobs.o.un) {
			clobs.data.t.at = clobs.data.t.clicklink;
		} else if (typeof rumbiConf.ajax != clobs.o.un) clobs.data.t.at = clobs.data.t.clicklink;
		if (e.srcElement) thethis = e.srcElement;
		else thethis = this;
		var dest = (thethis.href ? thethis.href : 'NA');
		if (dest == 'NA') {
			thethis = thethis.parentNode;
			try {
				dest = (thethis.href ? thethis.href : 'NA');
			} catch (err) {
				dest = 'NA';
			}
		}
		//console.log(dest);
		clobs.data.p.dest = dest;
		//clobs.l(tmp, '3');
	},

	f4: function(e) { //submit form
		clobs.trace("F4(form) lance");
		if (e.srcElement) var thethis = e.srcElement;
		else var thethis = this;
		clobs.data.p.dest = (thethis.action ? thethis.action : 'NA');
		clobs.data.t.submitform = new Date().getTime();
	},

	f5: function(e) { //unload
		clobs.trace('F5(unload) lance');
		clobs.data.t.unload = new Date().getTime();
		clobs.sc("tosend", clobs.str(), null, '/');
	},

	rtok: function() {
		if (typeof window.performance != clobs.o.un) {
			if (!!window.performance.getEntries) {
				return true;
			}
		}
		return false;
	},

	f6: function(e) { //Called every second
			clobs.trace("F6(regular)");
			if (clobs.data.iw) { //Check that the initial measure ticket has been sent
				clobs.trace("F6(regular) OK to send");
				//if (typeof window.performance != clobs.o.un) {
				if (clobs.rtok()) {
					var pe = window.performance.getEntries();
					//            if (typeof pe != clobs.o.un) {
					for (var i = 0; i < pe.length; i++) {
						var Expression = new RegExp(rumbiConf.trackObject, "g");
						if (Expression.test(pe[i].name)) {
							/*if (typeof clobs.data.s.RTmetrics==clobs.o.un) */
							clobs.data.s.RTmetrics = '';
							/*if (typeof clobs.data.s.RTmeasure==clobs.o.un) */
							clobs.data.s.RTmeasure = '';
							dns = parseInt(pe[i].connectEnd - pe[i].connectStart);
							var nf = 0;
							if (typeof dns != clobs.o.un)
								if (dns > 0) {
									clobs.data.s.RTmetrics = '2028'; //1 DNS Response time
									clobs.data.s.RTmeasure = '' + dns;
									nf = 1;
								}
							tcp = parseInt(pe[i].connectEnd - pe[i].connectStart);
							if (typeof tcp != clobs.o.un)
								if (tcp > 0) {
									if (nf) {
										clobs.data.s.RTmetrics += ';';
										clobs.data.s.RTmeasure += ';';
									} else nf = 1;
									clobs.data.s.RTmetrics += '2029'; //2 Connection time
									clobs.data.s.RTmeasure += '' + tcp;
								}
							ttfb = parseInt(pe[i].responseStart - pe[i].startTime);
							if (typeof ttfb != clobs.o.un)
								if (ttfb > 0) {
									if (nf) {
										clobs.data.s.RTmetrics += ';';
										clobs.data.s.RTmeasure += ';';
									} else nf = 1;
									clobs.data.s.RTmetrics += '2030'; //3 time to first byte
									clobs.data.s.RTmeasure += '' + ttfb;
								}
							transfer = parseInt(pe[i].responseEnd - pe[i].responseStart);
							if (typeof transfer != clobs.o.un)
								if (transfer > 0) {
									if (nf) {
										clobs.data.s.RTmetrics += ';';
										clobs.data.s.RTmeasure += ';';
									} else nf = 1;
									clobs.data.s.RTmetrics += '2031'; //4 Transfer
									clobs.data.s.RTmeasure += '' + transfer;
								}
							overall = parseInt(pe[i].responseEnd - pe[i].startTime);
							if (typeof overall != clobs.o.un)
								if (overall > 0) {
									if (nf) {
										clobs.data.s.RTmetrics += ';';
										clobs.data.s.RTmeasure += ';';
									} else nf = 1;
									clobs.data.s.RTmetrics += '2033'; //Overall
									clobs.data.s.RTmeasure += '' + overall;
								}
							if (typeof clobs.PTQual != clobs.o.un) delete clobs.PTQual;
							clobs.data.p.url = pe[i].name.substring(0, 100);; //rumbiConf.trackObject; //force URL's update
							clobs.data.iw = false; //image not written -> forces image rewritting
							clobs.l(); //send the results
							clearInterval(rumbiConf.intervalHandler); //remove the interval checking
						}
					}
				} else {
					clearInterval(rumbiConf.intervalHandler);
					clobs.trace("F6(regular) regular check stoped");
				}
			}
		},

		f7: function(e) { //Called every second
			clobs.trace("F7(regular)");
			if (clobs.data.iw) { //Check that the initial measure ticket has been sent
				clobs.trace("F7(regular) OK to send");
				//if (typeof window.performance != clobs.o.un) {
				if (clobs.rtok()) {
					var pe = window.performance.getEntries();
					//            if (typeof pe != clobs.o.un) {
					for (var i = 0; i < pe.length; i++) {
						if ((clobs.lastNbResources == pe.length)&&(!clobs.data.s.rtd)) { //Waterfall stable for 2s, can process it
							clearInterval(rumbiConf.RTIntervalHandler);
							clobs.data.s.rtd = true;
							if (!clobs.data.s.RTmeasure) {
								clobs.data.s.RTmeasure = "";
							}
							if (!clobs.data.s.RTmetrics) {
								clobs.data.s.RTmetrics = "";
							}
							clobs.trace("1:" + clobs.data.s.RTmeasure);
							var entryTypes = ['css', 'embed', 'img', 'link', 'object', 'script', 'subdocument',
								'svg', 'xmlhttprequest', 'other'
							];
							var entryTypesCodes = ['2050', '2051', '2052', '2053', '2054', '2055', '2056', '2057', '2058', '2059'];
							var countTypesCodes = ['2060', '2061', '2062', '2063', '2064', '2065', '2066', '2067', '2068', '2069'];
							var attributes = ['navigationStart', 'unloadEventStart', 'unloadEventEnd', 'redirectStart', 'redirectEnd', 'fetchStart', 'domainLookupStart', 'domainLookupEnd', 'connectStart', 'connectEnd', 'secureConnectionStart', 'requestStart', 'responseStart', 'responseEnd', 'domLoading', 'domInteractive', 'domContentLoadedEventStart', 'domContentLoadedEventEnd', 'domComplete', 'loadEventStart', 'loadEventEnd'];
							var dnsTotal = 0,
								dnsCount = 0,
								tcpHandshakeTotal = 0,
								tcpHandshakeCount = 0,
								secureConnectionTimeTotal = 0,
								secureConnectionTimeCount = 0,
								responseTimeTotal = 0,
								responseTimeCount = 0;
							var durationTotal = 0,
								durationCount = 0,
								waitingTimeTotal = 0,
								waitingTimeCount = 0;
							var Charts = {};
							for (var index in pe) {
								/**/
								var dns = pe[index].domainLookupEnd - pe[index].domainLookupStart;
								if (dns > 0) {
									dnsTotal += dns;
									dnsCount += 1;
								}
								var tcpHandshake = pe[index].connectEnd - pe[index].connectStart;
								if (tcpHandshake > 0) {
									tcpHandshakeTotal += tcpHandshake;
									tcpHandshakeCount += 1;
								}
								/*var secureConnectionTime = (resources[index].secureConnectionStart > 0) ? "0" : (resources[index].connectEnd - resources[index].secureConnectionStart);
								if (secureConnectionTime>0) {secureConnectionTimeTotal+=secureConnectionTime;secureConnectionTimeCount+=1;}*/
								var waitingTime = pe[index].responseStart - pe[index].requestStart;
								if (waitingTime > 0) {
									waitingTimeTotal += waitingTime;
									waitingTimeCount += 1;
								}
								//responseTime = content
								var responseTime = pe[index].responseEnd - ((pe[index].responseStart > 0) ? pe[index].responseStart : pe[index].fetchStart);
								if (responseTime > 0) {
									responseTimeTotal += responseTime;
									responseTimeCount += 1;
								}
								var duration = pe[index].duration;
								if (duration > 0) {
									durationTotal += duration;
									durationCount += 1;
									if (!Charts[pe[index].initiatorType]) {
										Charts[pe[index].initiatorType] = {
											count: 0,
											total: 0
										};
									}
									Charts[pe[index].initiatorType].total += duration;
									Charts[pe[index].initiatorType].count += 1;
								}
								/**/
							}
							var nf = 0;
							if (dnsCount) {
								clobs.trace('average dns:' + (dnsTotal / dnsCount) + 'ms, ' + dnsCount + ' samples');
								if (nf) {
									clobs.data.s.RTmetrics += ';';
									clobs.data.s.RTmeasure += ';';
								} else nf = 1;
								clobs.data.s.RTmetrics += '2070;2071';
								clobs.data.s.RTmeasure += '' + Math.round(dnsTotal / dnsCount) + ";" + dnsCount;
							}
							if (tcpHandshakeCount) {
								clobs.trace('average tcpHandshake:' + (tcpHandshakeTotal / tcpHandshakeCount) + 'ms, ' + tcpHandshakeCount + ' samples');
								if (nf) {
									clobs.data.s.RTmetrics += ';';
									clobs.data.s.RTmeasure += ';';
								} else nf = 1;
								clobs.data.s.RTmetrics += '2072;2073';
								clobs.data.s.RTmeasure += '' + Math.round(tcpHandshakeTotal / tcpHandshakeCount) + ";" + tcpHandshakeCount;
							}
							if (responseTimeCount) {
								clobs.trace('average responseTime:' + (responseTimeTotal / responseTimeCount) + 'ms, ' + responseTimeCount + ' samples');
								if (nf) {
									clobs.data.s.RTmetrics += ';';
									clobs.data.s.RTmeasure += ';';
								} else nf = 1;
								clobs.data.s.RTmetrics += '2074;2075';
								clobs.data.s.RTmeasure += '' + Math.round(responseTimeTotal / responseTimeCount) + ";" + responseTimeCount;
							}
							if (durationCount) {
								clobs.trace('average duration:' + (durationTotal / durationCount) + 'ms, ' + durationCount + ' samples');
								if (nf) {
									clobs.data.s.RTmetrics += ';';
									clobs.data.s.RTmeasure += ';';
								} else nf = 1;
								clobs.data.s.RTmetrics += '2076;2077';
								clobs.data.s.RTmeasure += '' + Math.round(durationTotal / durationCount) + ";" + durationCount;
							}
							clobs.trace('Charts:' + JSON.stringify(Charts));
							for (var index2 = 0; index2 < entryTypes.length; index2++) {
								var entryType = entryTypes[index2];
								if (Charts[entryType]) {
									clobs.trace(entryType + ':' +
										(Charts[entryType].total / Charts[entryType].count) +
										' ' + Charts[entryType].count);
									if (Charts[entryType].count > 0) {
										if (nf) {
											clobs.data.s.RTmetrics += ';';
											clobs.data.s.RTmeasure += ';';
										} else nf = 1;
										clobs.data.s.RTmetrics += '' + countTypesCodes[index2] + ";" + entryTypesCodes[index2];
										clobs.trace("debug:" + index2 + ":" + entryTypesCodes[index2]);
										clobs.data.s.RTmeasure += '' + Charts[entryType].count + ";" + Math.round(Charts[entryType].total / Charts[entryType].count);
									}
								}
							}
							if (typeof clobs.PTQual != clobs.o.un) delete clobs.PTQual;
							//clobs.data.p.url = pe[i].name.substring(0, 100);; //rumbiConf.trackObject; //force URL's update
							clobs.data.iw = false; //image not written -> forces image rewritting
							clobs.l(); //send the results
							clearInterval(rumbiConf.RTIntervalHandler);
						} else { //downloading not done yet
							clobs.lastNbResources = pe.length;
						}
					}
				} else {
					clearInterval(rumbiConf.RTIntervalHandler);
					clobs.trace("F7(regular) regular check stoped");
				}
			}
		},

	ff: function(string) { //format function
		var reg = new RegExp("\n", "g");
		string = string.replace(reg, ' ');
		var reg = new RegExp(";", "g");
		string = string.replace(reg, '.,');
		reg = new RegExp(" {2,}", "g");
		string = string.replace(reg, ' ');
		return string;
	},

	gc: function(name) { //get cookie
		if(typeof Storage !== clobs.o.un) {// Yes! sessionStorage and sessionStorage support!
            this.trace("sessionStorage loaded:" + window.sessionStorage.getItem("ipl_rumbi_"+name));
            return (window.sessionStorage.getItem("ipl_rumbi_"+name));
		} else { // Sorry! No web storage support..
			var start = document.cookie.indexOf(name + "=");
			var len = start + name.length + 1;
			if ((!start) && (name != document.cookie.substring(0, name.length))) return null;
			if (start == -1) return null;
			var end = document.cookie.indexOf(";", len);
			if (end == -1) end = document.cookie.length;
			this.trace("Cookie loaded:" + document.cookie.substring(len, end));
			return decodeURIComponent(document.cookie.substring(len, end)); //unescape(document.cookie.substring(len,end));
		}
	},

	//25/05 OBSOLETE ?
	/* gi: function() { //get id
		var id = this.gc('iplid');
		if (!id) {
			this.sc('iplid', Math.random());
			id = this.gc('iplid');
		}
		return id;
	}, */

	gt: function(tt, t) { //trie un objet times et renvoie le plus adapté au calcul selon le type
		if (t == 1) { //début si pas de page précédente
			if (this.i_s(tt.iplobserverstart)) return [tt.iplobserverstart, 1100]; //timer haut de page
			if (this.i_s(tt.jsinit)) return [tt.jsinit, 1200]; //init js
			if (this.i_s(tt.reqinit)) return [tt.reqinit, 1300]; //init de la requête pour un objet cdn
		}
		if (t == 2) { //début si page précédente
			// 19/05/2011 : correctif apporté car il est important de détecter le submit form avant le click (bug: un click enregistrer sur une page
			// et qui ne donne pas lieu à un changement de page est enregistré et son timestamp est utilisé prioritairement si un submit form est utilisé aprés)
			if (this.i_s(tt.submitform)) return [tt.submitform, 2200]; //submitform
			if (this.i_s(tt.clicklink)) return [tt.clicklink, 2100]; //clic
			if (this.i_s(tt.unload)) return [tt.unload, 2300]; //unload
		}
		if (t == 3) { //fin chargement page
			if (this.i_s(tt.domload)) return [tt.domload, 0]; //dom charge
			if (this.i_s(tt.imgload)) return [tt.imgload, 0]; //dom charge
		}
		if (t == 4) { //Ajax timer
			if (this.i_s(tt.at)) return [tt.at, 1100];
		}
	},
	p: function() {
		//function de rendom qui s'appuie sur le parametre ra
		try {
			tid = this.$(this.o.id).src;
		} catch (err) {
			tid = '';
		}
		var random_param = this.gup(tid, 'ra');
		if (typeof rumbiConf.ra != clobs.o.un) random_param = rumbiConf.ra;
		if (random_param != "") {
			random_val = Math.floor(Math.random() * (random_param)) - (Math.floor(random_param / 2));
		} else random_val = 0;
		this.trace('take measures random_val', random_val);
		return random_val;
	},
	i: function() { //initialize
        if (typeof rumbiConf == clobs.o.un) rumbiConf = {}; //avoids crashes during later tests
		this.trace('SetGroup', 'Debut clob [v ' + this.o.version + ']');
		if (!navigator.cookieEnabled) return;
		this.f1(); //temps start
		this.s('p.tracker'); //set tracker + analyse les arguments fournis en param
		if (typeof ipldomain != clobs.o.un) this.o.i = ipldomain;
		if (typeof rumbiConf.domain != clobs.o.un) this.o.i = rumbiConf.domain;
		if (this.data.p.tracker.length <= 0) return;

		this.trace('device avant', this.data.s.dev);
		this.s('s.ua'); //05/05/10 ua déplacé après os car ua peut définit l'os pour les blackberry - ua fait aussi os en début
		this.trace('device apres', this.data.s.dev);
		// Random : lancement si random ok ou device mobile
		var c_rdmvalidation = clobs.gc("rdmvalidation");
		this.trace('cookie c_rdmvalidation loaded:', c_rdmvalidation);
		if (c_rdmvalidation) this.trace('cookie c_rdmvalidation loaded2:', c_rdmvalidation);

		if (this.data.s.dev != 'Pc') {
			this.trace('rdmvalidation On n\'est pas un PC');
			this.rdmvalidation = 1;
		} else if (this.data.s.dev == 'Pc' && !c_rdmvalidation) {
			this.trace('cookie rdmvalidation exist pas et on est un PC');
			var random_exec = this.p();

			this.rdmvalidation = (random_exec ? 0 : 1);
			clobs.sc("rdmvalidation", this.rdmvalidation, null, '/');
			this.trace('this.rdmvalidation:', this.rdmvalidation);
			this.trace('Random est ok', random_val);
		} else if (this.data.s.dev == 'Pc' && c_rdmvalidation) {
			this.trace('cookie rdmvalidation exist et on est un PC');
			this.rdmvalidation = c_rdmvalidation;
			this.trace('this.rdmvalidation:', this.rdmvalidation);
		}

		if (this.rdmvalidation == 0) {
			this.trace('Random est pas ok on quitte', this.rdmvalidation);
			return;
		} else this.trace('Random est ok', this.rdmvalidation);

		// Random FIN: lancement si random ok ou device mobile
		//DMO: remove onload for Renault CSB
    if (typeof ipldevmod == clobs.o.un) {
			try { //autres
				//window.addEventListener('load', clobs.f2, false);
				//window.addEventListener('unload', clobs.f5, false);
			} catch (err) { //ie
				//window.attachEvent('onload', clobs.f2);
				//window.attachEvent('onunload', clobs.f5);
			}
		}

		if (typeof rumbiConf.trackObject != clobs.o.un) {
			try {
				rumbiConf.intervalHandler = setInterval(this.f6, 1000);
			} catch (err) {}
		}
		if (typeof rumbiConf.resourceTiming != clobs.o.un) {
            if (rumbiConf.resourceTiming==1){
                try {
                    rumbiConf.RTIntervalHandler = setInterval(this.f7, 2000);
                } catch (err) {}
            }
		}
		//this.s('s.os');

		this.s('s.screen');
		this.s('s.langue');
		this.s('s.gmtdec');
		this.s('p.url');
		this.s('p.window');
		if (typeof ipldevmod == clobs.o.un) this.b(); //tag les liens
		//setTimeout("clobs.s('p.complexity')", 2000);//déclenche l'analyse de la complexité après 2 s
		var tosend = this.gc("tosend");
		if (tosend == "" || tosend == null || tosend == "null") this.trace('1er visite pas de cookie');

		if (tosend != "" && tosend != null && tosend != "null") {
			//try{ console.log(tosend); }  catch(err) {}
			try {
                this.sc("tosend", "", -1, '/');//cleaning
				//eval('var tosend = ' + tosend);
				var tosend = JSON.parse(tosend);
				var t1 = this.gt(tosend.t, 2);
				var t2 = this.gt(this.data.t, 1);
				if ((t2[0] - t1[0]) > this.o.d) tosend = null; //tosend trop ancien, on supprime
				else {
					var verif_url1 = (tosend.p.dest == this.data.p.url);
					var verif_url2 = (tosend.p.url == this.data.p.ref);
					if (this.data.p.ref == '') tosend = null; //on a des données mais on revient sur le site, pas de referer
					else if (this.o.v == 0 && ((!verif_url1 || !verif_url2) && tosend.p.url != this.data.p.url)) tosend = null; //URL ne correspondant pas
					else if (this.o.v == 1 && (!verif_url1 && !verif_url2 && tosend.p.url != this.data.p.url)) tosend = null; //URL ne correspondant pas
					if (tosend != null) this.data.ot = tosend.t; //oldtimes
				}

				if (typeof tosend.Q != clobs.o.un && tosend.Q != '') {
					this.Ql = tosend.Q;
				}


			} catch (e) {
				clobs.trace("Exception BING");

				var tosend = null;
			}
		}
		// On decide s'il faut lancer la fonction de test du CPU :
		// si le device est Pc ET model est NA ET le paramétre d'appel du script cp est passé
		if (this.data.s.dev == 'Pc' && this.data.s.mod == 'NA' && this.o.cp) {
			this.data.s.mod = this.cpu(tosend);
		}
		//	else if (this.data.s.dev == 'Phone' && this.data.s.mod=='Iphone' && this.o.cp) {this.data.s.mod = this.data.s.mod+"@_@"+this.cpu_a(tosend);}
		if ((document.readyState === "complete")||(document.readyState === "interactive")) {
			//onload in the paste. Send navigation timing data.
            if (clobs.rtok()) {
                if (typeof rumbiConf.performancetiming === clobs.o.un) {
                	rumbiConf.performancetiming = 4;
                }
                rumbiConf.PTOnly = 1;
                /*if (performance.timing.domInteractive >0) {
                    this.pt();
                } else {*/
                    try {
				        rumbiConf.afterLoop = setInterval(clobs.ac, 1000);
                    } catch (err) {}
                //}
            }
        }
	},
    ac: function() {//After onLoad check loop
        clobs.trace("post onload loop");
        if (performance.timing.domInteractive >0) {
            clobs.trace("domInteractive defined, stoping loop");
            clearInterval(rumbiConf.afterLoop); //remove the interval checking
            clobs.pt();
            if (typeof clobs.data.iw === clobs.o.un) {
               clobs.data.iw = false; //image not written -> forces image rewritting
               clobs.l();//send the results
            }
        }
    },
    ms: function() {//Empty initialisation function to keep MS Dynamics happy
    },
	i_s: function(object) { //is_set
		if (typeof object != clobs.o.un) return true;
		return false;
	},

	pt: function() { //Performance timing
		if ((typeof performance != clobs.o.un) && (rumbiConf.performancetiming > 0)) {
			//Selects the starting event for all performance timing related measures
			if ((typeof performance.timing.navigationStart != clobs.o.un) && (performance.timing.navigationStart > 0)) {
				var startTime = performance.timing.navigationStart;
				var mesureTypeOffset = 0;
			} else {
				var startTime = performance.timing.fetchStart;
				var mesureTypeOffset = 0; //100;//metric numbers are offset by 100 to reflect the choise of fetchStart as reference event
			}
			if ((typeof performance.timing.navigationStart != clobs.o.un) && (performance.timing.domainLookupStart > 0)) {
				var startTimeDTM = performance.timing.domainLookupStart;
			} else {
				var startTimeDTM = performance.timing.connectStart;
			}
			if (rumbiConf.performancetiming == 1) {
				var toBeChecked = {
					/*2500:performance.navigation.type,
						2501:performance.navigation.redirectCount,
						2503:performance.timing.redirectStart,
						2504:performance.timing.unloadStart,
						2505:performance.timing.unloadEnd,
						2506:performance.timing.redirectEnd,
						2507:performance.timing.fetchStart,
						2508:performance.timing.domainLookupStart,
						2509:performance.timing.domainLookupEnd,
						2510:performance.timing.connectStart,
						2511:performance.timing.secureConnectionStart,
						2512:performance.timing.connectEnd,
						2513:performance.timing.requestStart,
						2514:performance.timing.responseStart,
						2515:performance.timing.responseEnd,
						2516:performance.timing.domLoading,
						2517:performance.timing.domInteractive,
						2518:performance.timing.domContentLoaded,
						2519:performance.timing.domComplete,
						2520:performance.timing.loadEventStart,
						2521:performance.timing.loadEventEnd,
						2522:performance.timing.firstPaintTime,*/
					/*2550:performance.timing.redirectEnd - performance.timing.redirectStart,
						2552:performance.timing.domainLookupEnd - performance.timing.domainLookupStart,
						2553:(((typeof performance.timing.secureConnectionStart ==clobs.o.un )||(performance.timing.secureConnectionStart==0)) ? performance.timing.connectEnd - performance.timing.connectStart:''),
						2554:(((typeof performance.timing.secureConnectionStart !=clobs.o.un )&&(performance.timing.secureConnectionStart>0)) ? performance.timing.connectEnd - performance.timing.secureConnectionStart:''),
						2555:performance.timing.responseStart - performance.timing.requestStart,//Send
						2556:performance.timing.responseEnd - performance.timing.responseStart,//Receive
						2557:performance.timing.responseStart - startTime,//Time to first byte
						2558:performance.timing.loadEventStart - performance.timing.domLoading,//Processing
						2559:performance.timing.loadEventStart - startTime,//Page load time

						2028:((typeof performance.timing.domainLookupStart != clobs.o.un) ? ((performance.timing.domainLookupEnd>performance.timing.domainLookupStart)?performance.timing.domainLookupEnd - startTimeDTM:''):''),//1 DNS Response Time
						2029:performance.timing.connectEnd - startTimeDTM,//2 Connection Time
						2030:performance.timing.responseStart - startTimeDTM,//3 First Byte Received
						2031:performance.timing.responseEnd - startTimeDTM,//4 Base Page Loading Time
						2032:performance.timing.loadEventStart - startTimeDTM//5 Full Page Loading Time
						*/
					2028: ((typeof performance.timing.domainLookupStart != clobs.o.un) ? ((performance.timing.domainLookupEnd > performance.timing.domainLookupStart) ? performance.timing.domainLookupEnd - startTimeDTM : '') : ''), //1 DNS Response Time
					2029: performance.timing.connectEnd - performance.timing.domainLookupEnd, //2 Connection Time
					2030: performance.timing.responseStart - performance.timing.connectEnd, //3 First Byte Received
					2031: performance.timing.responseEnd - performance.timing.responseStart, //4 Base Page Loading Time
					2032: performance.timing.loadEventStart - performance.timing.responseEnd, //5 Full Page Loading Time
					2033: performance.timing.loadEventStart - startTimeDTM //Overall Navigation Timing
				};
			} else if (rumbiConf.performancetiming == 2) {
				var toBeChecked = {
					2030: performance.timing.responseStart - startTimeDTM, //3 First Byte Received
					2033: performance.timing.loadEventStart - startTimeDTM //Overall Navigation Timing
				};
			} else if ((rumbiConf.performancetiming == 3)||(rumbiConf.performancetiming == 4)){
				var toBeChecked={
						2034:performance.timing.domInteractive - startTimeDTM//TTI
				};
      } else if (rumbiConf.performancetiming == 5) {
        var toBeChecked = {
          2028: ((typeof performance.timing.domainLookupStart != clobs.o.un) ? ((performance.timing.domainLookupEnd > performance.timing.domainLookupStart) ? performance.timing.domainLookupEnd - startTimeDTM : '') : ''), //1 DNS Response Time
					2029: performance.timing.connectEnd - performance.timing.domainLookupEnd, //2 Connection Time
					2030: performance.timing.responseStart - performance.timing.connectEnd, //3 First Byte Received
					2031: performance.timing.responseEnd - performance.timing.responseStart, //4 Base Page Loading Time
					2032: performance.timing.loadEventStart - performance.timing.responseEnd, //5 Full Page Loading Time
					2033: performance.timing.loadEventStart - startTimeDTM, //Overall Navigation Timing
          2034:performance.timing.domInteractive - startTimeDTM//TTI
        };
      } else {
				var toBeChecked={
						2033: performance.timing.loadEventStart - startTimeDTM //Overall Navigation Timing
				};
			}
			var resultArray = {};
			if (typeof this.PTQual == clobs.o.un) this.PTQual = {};
			this.PTQual.metrics = '';
			this.PTQual.measure = '';
            if (typeof rumbiConf.PTOnly === clobs.o.un) {
                var sep = ';';
            } else {
                var sep ='';
            }
			for (checkNow in toBeChecked) {
                if ((typeof toBeChecked[checkNow] != clobs.o.un)) {
					if (toBeChecked[checkNow] > 0) {
						this.PTQual.metrics += sep + (parseInt(checkNow) + mesureTypeOffset);
						this.PTQual.measure += sep + (toBeChecked[checkNow] - (parseInt(checkNow) > 2502) * (parseInt(checkNow) < 2550) * startTime);
                        sep = ';';
					}
                }
			}
		}
	},

	l: function() { //log
		//console.dir(this.data);
		if (this.i_s(this.data.ct)) { //si on a un temps de cdn
			var debut = this.gt(this.data.ct, 1);
		} else if (this.i_s(this.data.ot)) { //si on a un old time (de la page précédente)
			var debut = this.gt(this.data.ot, 2);
		} else if (this.i_s(this.data.t.at)) {
			var debut = this.gt(this.data.t, 4);
		} else { //sinon temps de la page courante
			var debut = this.gt(this.data.t, 1);
		}
		if (this.i_s(this.data.ct)) {
			var fin = this.gt(this.data.ct, 3);
			if (fin[0] == debut[0] && debut[0] == 0) debut[1] = 404;
		} else {
			var fin = this.gt(this.data.t, 3);
		}
		// traitement du module complementaire de qualification de la ligne internet
		if (typeof iplperformancetiming != clobs.o.un) {
			rumbiConf.performancetiming = iplperformancetiming;
            if (rumbiConf.performancetiming==4) {rumbiConf.PTOnly = 1;}//mode 4 is TTI only (future default)
			//this.pt();
		} //performance timing
		if ((typeof rumbiConf.performancetiming != clobs.o.un) && (typeof this.data.s.RTmeasure == clobs.o.un)) this.pt();
		this.trace("-->" + this.data.s.custom_level1);
//		this.trace("temps calcul:" + (fin[0] - debut[0]));
		var reg = new RegExp('[\|]', "g");
		var l = this.data.p.tracker //id tracker
			+ this.o.s + new Date().getTime() //heure actuelle
			+ this.o.s + (((typeof rumbiConf.PTOnly !=clobs.o.un)||(typeof this.data.s.RTmeasure != clobs.o.un)) ? '' : (fin[0] - debut[0])) //temps calc
			+ ((typeof Qualification != clobs.o.un) ? Qualification.RESULT.STRING : '') + ((typeof this.PTQual != clobs.o.un) ? this.PTQual.measure : '') + ((typeof this.data.s.RTmeasure != clobs.o.un) ? this.data.s.RTmeasure : '') + this.o.s + (((typeof rumbiConf.PTOnly !=clobs.o.un)||(typeof this.data.s.RTmetrics != clobs.o.un)) ? '' : debut[1]) //type temps
			+ ((typeof Qualification != clobs.o.un) ? Qualification.RESULT.LIB : '') + ((typeof this.PTQual != clobs.o.un) ? this.PTQual.metrics : '') + ((typeof this.data.s.RTmetrics != clobs.o.un) ? this.data.s.RTmetrics : '') + this.o.s + this.data.s.gmtdec //décallage gmt
			+ this.o.s + (this.data.p.url || "").replace(reg, this.o.srep) //url courante
			+ this.o.s + (this.data.p.ref || "").replace(reg, this.o.srep) //url du referer
			+ this.o.s + this.data.s.os //OS
			+ this.o.s + this.data.s.osver //OSver
			+ this.o.s + this.data.s.ua //browser
			+ this.o.s + this.data.s.uav //version browser
			+ this.o.s + this.data.s.dev //device
			+ this.o.s + this.data.s.br //brand
			+ this.o.s + this.data.s.mod //model
			+ this.o.s + this.data.s.screen //résolution écran
			+ this.o.s + this.data.s.langue //langue
			+ this.o.s + '0' //statut, toujours 0 en web
			+ this.o.s + this.data.s.clientip //ip locale ou '' si pas d'ip
			+ this.o.s + this.o.version //ip locale ou '' si pas d'ip
			+ this.o.s + '' //Synchronous mode
			+ this.o.s + ((this.data.s.custom_level1 != clobs.o.un) ? this.data.s.custom_level1 : '') //custom dimension level1
			+ this.o.s + ((this.data.s.custom_level2 != clobs.o.un) ? this.data.s.custom_level2 : '') //custom dimension level2
			+ this.o.s + ((this.data.s.custom_level3 != clobs.o.un) ? this.data.s.custom_level3 : '') //custom dimension level3
			+ this.o.s + ((this.data.s.custom_level4 != clobs.o.un) ? this.data.s.custom_level4 : '') //custom dimension level4
			+ this.o.s + ((this.data.s.custom_level5 != clobs.o.un) ? this.data.s.custom_level5 : '') //custom dimension level4
		;
		this.trace('l:' + l);

		//try{ console.log(l); }  catch(err) {}
        if ((window.location.protocol!='http:')&&(window.location.protocol!='https:')) {
            var currentProtocol = 'https:';
        } else {
            var currentProtocol = window.location.protocol;
        }
		l = '<img src="' + currentProtocol + '//' + this.o.i + '?' + this.e(l) + '" style="width:0px;height:0px;position:absolute;display:none;"/>';

		if (!this.data.dw) { //dot written ?
			if (document.body) {
				var dot = document.createElement("div");
				dot.id = "dot_S4qoPdm2";
				document.body.appendChild(dot);
			} else document.write('<div id="dot_S4qoPdm2"></div>');
			this.data.dw = true;
		}

		if (!this.data.iw) { //image written ?
			if (this.$('dot_S4qoPdm2')) {
                if (document.readyState==="complete") {
					this.$('dot_S4qoPdm2').innerHTML = l;
                } else {
                	try { //autres
                        window.addEventListener('load', function(){
                            clobs.$('dot_S4qoPdm2').innerHTML = l;
                        }, false);
					} catch (err) { //ie
                        window.attachEvent('onload', function(){
                            clobs.$('dot_S4qoPdm2').innerHTML = l;
                        });
					}
                }
			} else {
                if (document.readyState==="complete") {
					document.body.lastChild.innerHTML = document.body.lastChild.innerHTML + l;
                } else {
                    try { //autres
                        window.addEventListener('load', function(){
                            document.body.lastChild.innerHTML = document.body.lastChild.innerHTML + l;
                        }, false);
					} catch (err) { //ie
                        window.attachEvent('onload', function(){
                            document.body.lastChild.innerHTML = document.body.lastChild.innerHTML + l;
                        });
					}
                }
			}
			this.data.iw = true;
		}
	},

	p_ua: function(uastr) { //parse user agent string
		var index = 0,
			i = 0;
		var browser = browserver = device = brand = ipl_model = 'NA';
		this.data.s.ua = this.data.s.uav = this.data.s.dev = this.data.s.br = this.data.s.mod = this.data.s.os = this.data.s.osver = 'NA';

		/** OS et version d'OS */
		//important de commencer par les os car ils peuvent être modifiés par la suite (blackberry) par le device
		var os = new Array('windows', 'win', 'android', 'linux', 'unix', 'mac os x', 'mac', 'freebsd', 'netbsd', 'openbsd', 'sunos', 'amiga', 'beos', 'irix', 'os/2', 'macintosh', 'bada');
		for (var o in os)
			if (this.data.s.os == 'NA' && typeof os[o] != 'function') {
				var reg2 = new RegExp("; ?[^\\);\\(]*(" + os[o] + ")(( |/)([^\\);]*) ?(\\)|;))?", "g");
				var p = reg2.exec(uastr);
				//document.write('<hr />'+reg2.source);
				//for(var pp in p) document.write(pp+" "+p[pp]+"<br />");
				if (p != null) {
					if (p[1]) this.data.s.os = p[1];
					if (p[3]) this.data.s.osver = p[4];
				} else {
					var reg2 = new RegExp(" ?([^\\); \\(]*" + os[o] + ")(( |/)([^\\);]*)(\\)|;))?", "g");
					//document.write(reg.source+"     "+products[p]+"<br />");
					var p = reg2.exec(uastr);
					//for(var pp in oo) document.write(pp+" "+oo[pp]+"<br />");
					if (p != null && p[1]) {
						this.data.s.os = p[1];
					}
					if (p != null && p[3]) {
						this.data.s.osver = p[4];
					}
				}
			}
		if (this.data.s.os == 'mac os x' || this.data.s.os == 'NA') { //repérage du 'iphone OS'. certains ne sont pas libellés MAC
			var reg2 = new RegExp("((iphone )?os)(( |_)([^\\); ]*))?", "g");
			var p = reg2.exec(uastr);
			/* document.write('<hr />'+uastr+'<br />'+reg2.source);
			for(var pp in p) document.write(pp+" "+p[pp]+"<br />"); */
			if (p != null) {
				if (p[4]) {
					this.data.s.osver = p[1] + ' ' + p[5];
					this.data.s.os = 'mac os x';
				}
			}
		}
		if (typeof(this.data.s.osver) != clobs.o.un && this.data.s.osver != null && this.data.s.osver.indexOf('_') > 0) {
			this.data.s.osver = this.data.s.osver.replace(/_/g, '.');
		}
		/** Type de device, marque et modèle */
		/* Media Player */
		var mplayer = new Array();
		mplayer['archos'] = 'archos';
		mplayer['zune'] = 'zune';
		mplayer['ipod'] = 'apple';
		mplayer['ipad'] = 'apple';
		for (var m in mplayer)
			if (device == 'NA' && typeof m == 'string' && uastr.indexOf(m) >= 0) {
				device = 'mplayer';
				brand = mplayer[m];
				if (m == 'zune') {
					var reg2 = new RegExp("(zune(hd)?) ([0-9\.]{2,4})", "g");
					var p = reg2.exec(uastr);
					if (p != null) ipl_model = p[3];
				} else if (m == 'archos') {
					var reg2 = new RegExp("archos; gogi; ([^;]*; )?([0-9a-z\.]{3,5});", "g");
					var p = reg2.exec(uastr);
					if (p != null) ipl_model = p[2];
					else {
						var reg2 = new RegExp("archos([0-9]) build/([a-z]*)", "g");
						var p = reg2.exec(uastr);
						/* document.write('<hr />'+reg2.source);
					for(var pp in p) document.write(pp+" "+p[pp]+"<br />"); */
						if (p != null) ipl_model = p[1] + ' - ' + p[2];
					}
				}
				/* else if(m == 'ipod' || m == 'ipad') {
								var reg2 = new RegExp("(iphone os)(( |_)([^\\); ]*))?", "g");
								var p = reg2.exec(uastr);
								ipl_model = m;
								console.log(p);

							}  */
				else ipl_model = m;
			}

			/* Téléphones */ //doivent être après media player à cause de l'ipod
		if (device == 'NA') {
			var mobiles = new Array();
			mobiles['iphone'] = 'apple';
			mobiles['blackberry'] = 'blackberry';
			mobiles['htc'] = 'htc';
			mobiles['sonyericsson'] = 'sonyericsson';
			mobiles['lg'] = 'lg';
			mobiles['nokia'] = 'nokia';
			mobiles['symbos'] = 'symbos';
			mobiles['samsung'] = 'samsung';
			mobiles['nexus one'] = 'google';
			mobiles['acer_'] = 'acer';
			//mobiles['motorola'] = 'motorola'; mobiles['sie-'] = 'siemens' ;  //jamais rencontrés
			for (var m in mobiles)
				if (device == 'NA' && typeof m == 'string' && uastr.indexOf(m) >= 0) {
					device = 'phone';
					brand = mobiles[m];
					ipl_model = m;
					if (m == 'blackberry') {
						var reg2 = new RegExp("blackberry([0-9]{4})/([0-9\.]*)", "g");
						var p = reg2.exec(uastr);
						if (p != null) {
							ipl_model = p[1];
							this.data.s.os = 'blackberry';
							this.data.s.osver = p[2];
						} else ipl_model = 'NA';
					} else if (m == 'htc') {
						var reg2 = new RegExp("htc(-|_)([a-z0-9_]*)", "g");
						var p = reg2.exec(uastr);
						if (p != null) ipl_model = p[2];
						else ipl_model = 'NA';
					} else if (m == 'sonyericsson') {
						var reg2 = new RegExp("sonyericsson/?([a-z0-9]*)", "g");
						var p = reg2.exec(uastr);
						if (p != null) ipl_model = p[1];
						else ipl_model = 'NA';
					} else if (m == 'lg') {
						var reg2 = new RegExp("lg(-| )([a-z0-9]*)", "g");
						var p = reg2.exec(uastr);
						if (p != null) ipl_model = p[2];
						else ipl_model = 'NA';
					} else if (m == 'nokia') {
						var reg2 = new RegExp("nokia ?([0-9a-z]*)", "g");
						var p = reg2.exec(uastr);
						if (p != null) ipl_model = p[1];
						else ipl_model = 'NA';
					} else if (m == 'samsung') {
						var reg2 = new RegExp("samsung-(([a-z]{2,3}-)?[a-z]{1,2}[0-9]*)", "g");
						var p = reg2.exec(uastr);
						if (p != null) ipl_model = p[1];
						else {
							var reg2 = new RegExp("samsung ([a-z]*)", "g");
							var p = reg2.exec(uastr);
							if (p != null) ipl_model = p[1];
							else ipl_model = 'NA';
						}
					} else if (m == 'acer_') {
						var reg2 = new RegExp("acer_([0-9a-z]*)", "g");
						var p = reg2.exec(uastr);
						if (p != null) ipl_model = p[1];
						else ipl_model = 'NA';
					}
				}
		}
		if (device == 'NA' && uastr.indexOf('mobile') >= 0) device = 'phone';
		/* Consoles de jeu */
		if (device == 'NA') {
			var mplayer = new Array();
			mplayer['wii'] = 'nintendo';
			mplayer['playstation'] = 'sony';
			mplayer['dsi'] = 'nintendo';
			for (var m in mplayer)
				if (device == 'NA' && typeof m == 'string' && uastr.indexOf(m) >= 0) {
					device = 'game';
					brand = mplayer[m];
					ipl_model = m;
				}
		}

		/** Browser et version de browser */
		var ok_ua = new Array('fennec', 'firefox', 'netscape', 'chrome', 'safari', 'camino', 'opera', 'galeon', 'granparadiso', 'iceweasel', 'lunascape', 'seamonkey', 'k-meleon', 'minefield', 'epiphany', 'aol', 'midori', 'lynx', 'uzbl');
		var cloaked_ua = new Array('avant browser', 'crazy browser'); //crazy à la fin = important;
		var products = new Array();
		var isok = false,
			num = -1;

		var ua = uastr.toLowerCase();

		try {
			var reg = new RegExp("(^([^/ ]*)(/([^ ]*))? *(\[[a-z]*\])? *(\\((([^)]|(\\([^)]*\\)))*)\\))? *)", "g");
		} catch (err) {
			return new Array('NA', 'NA');
		}

		ua.replace(/\"/g, '');

		//découpe en products
		while (ua.substring(index).length > 0 && i < 10) {
			reg.lastIndex = 0;
			var p = reg.exec(ua.substring(index));
			if (p != null) {
				products.push(p[0]);
				index = index + reg.lastIndex;
			} else index = 0;
			i++;
		}
		for (var o in ok_ua) { //les boucles imbriquées doivent être dans ce sens pour trouver d'abord le browser qu'on préfère si plusieurs sont présents
			for (var p in products)
				if (typeof products[p] == 'string' && products[p].indexOf(ok_ua[o]) === 0 && !isok) {
					isok = true;
					num = p;
				}
		}
		//for (var p in products) document.write(products[p]+"<br />")
		if (isok && num > -1) { //if a product in the list matches one of those that correctly declare themselves, returns it
			var reg = new RegExp("^([^/ ]*)(/([0-9]+[0-9a-z\.\+\*,-]*))?", "g");
			var b = reg.exec(products[num]);
			if (b[1].indexOf('firefox') === 0) browser = 'firefox'; //enlève tout le superflu possible après FF
			else browser = b[1];
			/* document.write('<tr><td colspan="2">');
			for (var bb in b) document.write(bb+" "+b[bb]+"<br />");
			document.write('</td></tr>'); */
			if (b != null && b[3]) browserver = b[3];
			else if (browser == 'opera') {
				var reg = new RegExp("(opera)( ([^ ;/\(]*))?", "g");
				var b = reg.exec(ua);
				if (b != null && b[3]) browserver = b[3];
			}
		} else {
			var reg = new RegExp("^mozilla(/([^ ]*))? *\\(compatible;([^;]*)(;|\\))", "g");
			var p = reg.exec(products[0]);
			if (p != null) { //handles browsers declaring 'Mozilla compatible
				isok = false;
				num = '';
				for (var c in cloaked_ua)
					if (products[0].indexOf(cloaked_ua[c]) > 0) {
						isok = true;
						num = cloaked_ua[c];
					}
				if (isok) { //handles cloaked browsers
					browser = num;
					var reg = new RegExp(browser + "(( |/)([^;\)]*))", "g");
					var p = reg.exec(products[0]);
					if (p != null && p[1]) browserver = p[1];
					//for(pp in p) document.write(pp+" "+p[pp]+"<br />");
				} else if (p[3]) { //IE etc
					//for(pp in p) str = str+pp+" "+p[pp]+"<br />";
					var reg = new RegExp(" *([^/ ]*)( |/)([^/ ]*)", "g");
					var p = reg.exec(p[3]);
					if (p != null && p[1]) browser = p[1];
					if (p != null && p[3]) browserver = p[3];
				}
			}
			//for(bb in b) document.write(bb+" "+b[bb]+"<br />");
		}
		if (browser == 'NA') {
			var reg = new RegExp("^.*([^/ ]*)((/| )([^ ]*))?(.*)$", "g");
			var p = reg.exec(ua);
			if (p != null && p[1] && p[4]) {
				var reg = new RegExp("^.?[0-9]+[^/]*$", "g");
				if (p[4].match(reg)) {
					browser = p[1];
					browserver = p[4];
				}
				//for (var pp in p) document.write(pp+' '+p[pp]+"<br />");
			} else if (p != null && p[1]) {
				browser = p[1];
			}
		}
		//si IE, recherche si on est pas en mode de compatibilité
		if (browser == 'msie' && ua.indexOf('trident/4.0') > 0 && browserver != 8) browserver = '8.0 as ' + browserver;
		if (browser != 'NA' && device == 'NA') device = 'pc';
		/** Fin */
		this.data.s.os = this.data.s.os.slice(0, 1).toUpperCase() + this.data.s.os.slice(1);
		this.data.s.osver = this.data.s.osver.slice(0, 1).toUpperCase() + this.data.s.osver.slice(1);
		this.data.s.dev = device.slice(0, 1).toUpperCase() + device.slice(1);
		this.data.s.br = brand.slice(0, 1).toUpperCase() + brand.slice(1);
		this.data.s.mod = ipl_model.slice(0, 1).toUpperCase() + ipl_model.slice(1);
		this.data.s.ua = browser.slice(0, 1).toUpperCase() + browser.slice(1);
		this.data.s.uav = browserver.slice(0, 1).toUpperCase() + browserver.slice(1);
		//alert(ua+"\n"+browserver);
	},

	/** supprimer ua en prod */
	s: function(param /* , ua */ ) { //set : remplit data avec les infos à envoyer

		if (param == 's.ua') { //tous les traitements sur le user agent
			var useragent = navigator.userAgent.toLowerCase();
			this.p_ua(useragent);
		} else if (param == 's.screen') { // résolution de l'écran
			if (typeof window.devicePixelRatio != clobs.o.un) {
				if (window.devicePixelRatio >= 2) {
					this.data.s.screen = window.devicePixelRatio * screen.width + 'x' + window.devicePixelRatio * screen.height;
				} else {
					this.data.s.screen = screen.width + 'x' + screen.height;
				}
			} else {
				this.data.s.screen = screen.width + 'x' + screen.height;
			}
		} else if (param == 's.langue') { //langue du navigateur
			if (navigator.language) this.data.s.langue = navigator.language;
			else if (navigator.browserLanguage) this.data.s.langue = navigator.browserLanguage;
		} else if (param == 's.gmtdec') { //GMT
			var d = new Date();
			this.data.s.gmtdec = d.getTimezoneOffset() / 60;
			//if(this.gmtdec<0) this.gmtdec='1;'+Math.abs(this.gmtdec); else this.gmtdec='0;'+this.gmtdec;
		} else if (param == 'p.window') { //taille de la fenêtre navigateur
			this.data.p.window = document.documentElement.clientWidth + 'x' + document.documentElement.clientHeight;
		} else if (param == 'p.url') { //p.url, p.title, p.mtime, p.ref(errer)
			if (typeof iplparcours != clobs.o.un) {
				this.data.p.url = iplparcours;
			} else if (typeof rumbiConf.parcours != clobs.o.un) this.data.p.url = rumbiConf.parcours;
			else {
				this.data.p.url = location.href; //encodeURIComponent(location.href); //url p
			}
			//this.data.p.mtime = Date.parse(document.lastModified); //date dernière modif
			this.data.p.mtime = new Date(document.lastModified).getTime(); //mootools&datejs override Date.parse
			this.data.p.ref = document.referrer;
			this.data.p.dest = 'NA';
		} else if (param == 'p.tracker') { //trackerid + paramètres d'URL + adresse ip locale
			try {
				tid = this.$(this.o.id).src;
			} catch (err) {
				tid = '';
			}
			//i = numéro du tracker id
			var i = this.gup(tid, 'i');
			if (i.length == 1 && this.o.i[i]) this.o.i = this.o.i[i];
			else if (typeof rumbiConf.i != clobs.o.un) this.o.i = this.o.i[rumbiConf.i];
			else this.o.i = this.o.i[0];
			//v = niveau de vérif de l'URL
			var v = this.gup(tid, 'v');
			if ((v == 0 || v == 1 || v == 2) && v.length == 1) this.o.v = v;
			else if (typeof rumbiConf.v != clobs.o.un) this.o.v = rumbiConf.v;
			//t = timeout pour l'arrivée d'un objet (module objets)
			var t = this.gup(tid, 't');
			if (t.length > 0 && Number(t) != 'NaN') this.o.t = t;
			else if (typeof rumbiConf.t != clobs.o.un) this.o.t = rumbiConf.t;
			//td = timer avant le début du chargement d'objets
			var td = this.gup(tid, 'td');
			if (td.length > 0 && Number(td) != 'NaN') this.o.td = td;
			else if (typeof rumbiConf.td != clobs.o.un) this.o.td = rumbiConf.td;
			var cp = this.gup(tid, 'cp');
			if (cp == 1) this.o.cp = cp;
			else if (typeof rumbiConf.cp != clobs.o.un) this.o.cp = rumbiConf.cp;
			//o = démarre ou non le chargement d'objets
			var o = this.gup(tid, 'o');
			if ((o == 1 || o == 0) && o.length == 1) this.o.o = o;
			o = this.gup(window.location.href, 'iplstopo');
			if (o == 1) this.o.o = 0;
			//récupère l'id du tracker
			this.data.p.tracker = this.gup(tid, 'id');
			if (this.data.p.tracker.length <= 0) {
				tid = tid.substring(tid.indexOf('Script/') + 7);
				this.data.p.tracker = tid.substring(0, tid.indexOf('/'));
			}
			if (typeof rumbiConf.id != clobs.o.un) this.data.p.tracker = rumbiConf.id;

			if (typeof iplclientip != clobs.o.un) this.data.s.clientip = iplclientip;
			else if (typeof rumbiConf.clientip != clobs.o.un) this.data.s.clientip = rumbiConf.clientip;
			else this.data.s.clientip = '';
			//Custom dimension
			if (typeof iplcustomdim != clobs.o.un) {
				clobs.trace("iplcustomdim exits");
				this.data.s.custom_level1 = iplcustomdim;
			} else this.data.s.custom_level1 = '';
			if (typeof iplbusiness != clobs.o.un) { //organisation
				clobs.trace("iplbusiness exits");
				this.data.s.custom_level2 = iplbusiness;
			} else if (typeof rumbiConf.business != clobs.o.un) this.data.s.custom_level2 = rumbiConf.business;
			else this.data.s.custom_level2 = '';
			if (typeof iplabtesting != clobs.o.un) { //abtesting
				clobs.trace("iplabtesting exits");
				this.data.s.custom_level3 = iplabtesting;
			} else if (typeof rumbiConf.abtesting != clobs.o.un) this.data.s.custom_level3 = rumbiConf.abtesting;
			else this.data.s.custom_level3 = '';
			if (typeof iplinfrastructure != clobs.o.un) { //Infrastructure
				clobs.trace("iplinfrastructure exits");
				this.data.s.custom_level4 = iplinfrastructure;
			} else if (typeof rumbiConf.infrastructure != clobs.o.un) this.data.s.custom_level4 = rumbiConf.infrastructure;
			else this.data.s.custom_level4 = '';
			if (typeof iplcustomer != clobs.o.un) { //custom2
				clobs.trace("iplcustomer exits");
				this.data.s.custom_level5 = iplcustomer;
			} else if (typeof rumbiConf.customer != clobs.o.un) this.data.s.custom_level5 = rumbiConf.customer;
			else this.data.s.custom_level5 = '';
		} else if (param == 'p.complexity') { //indicateurs de complexité (brkimg, img, links, forms, css, body, head)
			if (!this.i_s(document.body)) return;
			this.data.p.brkimg = 0;
			this.data.p.img = document.images.length;
			this.data.p.links = document.links.length;
			this.data.p.forms = document.forms.length;
			this.data.p.css = document.styleSheets.length;
			this.data.p.body = document.body.innerHTML.length;
			this.data.p.head = document.head.innerHTML.length;
			this.data.p.title = document.title; //titre p déplacé ici car pas tjrs défini avant
			for (var i = 0; i < document.images.length; i++) {
				img = document.images[i];
				if (!img.complete) this.data.p.brkimg++;
				else if (this.i_s(img.naturalWidth) && img.naturalWidth == 0) this.data.p.brkimg++;
			}
		}
		/* else if(param =='') {

		        } */
	},

	sc: function(name, value, expires, path, domain, secure) { //set cookie
		if(typeof Storage !== clobs.o.un) {// Yes! sessionStorage and sessionStorage support!
			if (expires!=-1) {
                try {
					window.sessionStorage.setItem("ipl_rumbi_"+name,value);
                } catch(err) {
                }
			} else {
				window.sessionStorage.removeItem("ipl_rumbi_"+name);//put it back
			}
		} else { // Sorry! No web storage support..
			//<script type="text/javascript">var ipln_cookie_dom = "sales.ip-label.fr";</script>
			if (typeof ipln_cookie_dom != clobs.o.un) domain = ipln_cookie_dom;
			else if (typeof rumbiConf.cookie_dom != clobs.o.un) domain = rumbiConf.cookie_dom;
			if (!domain) {
				// test pour voir si on n'est pas dans un cas probable domaine de deuxième niveau genre .co.uk
                try {
					var domain_regexp = new RegExp(/^.*(\..*\..*)$/);
					if (document.domain.match(/(\.)/g).length < 2) domain_regexp = new RegExp(/^(.*\..*)$/); // A Commenter
					/* PROCHAINE RELEASE commenter du dessus et la remplacer par les 2 lignes suivantes:
					  var match = document.domain.match(/(\.)/g);
					if(match != null && match.length<2) domain_regexp= new RegExp(/^(.*\..*)$/);
				  */
					if (RegExp(/^.*\.+.*\..{2,3}\..{2,3}$/g).exec(document.domain)) {
						domain_regexp = new RegExp(/^.+(\..*\..*\..*)$/);
					}
					domain = domain_regexp.exec(document.domain)[1];
                } catch(err) {
                    domain = "";
                }
			}

			this.trace("Cookie valeur:" + name + " -> " + value);
			var cookieString = name + "=" + encodeURIComponent(value) + //escape(value) +
   	         ((expires) ? ";expires=" + ((expires>0) ? expires.toGMTString() : expires ) : "") +
				((path) ? ";path=" + path : "") +
				((domain) ? ";domain=" + domain : "") +
				((secure) ? ";secure" : "");
			document.cookie = cookieString;
			//todo : utiliser window.sessionStorage sur IE 8 et FF
		}
	},

	str: function() {
		var str = '{"p":{"tracker":"' + this.data.p.tracker + '", "url":"' + this.data.p.url + '", "mtime":' + this.data.p.mtime + ', "ref":"' + this.data.p.ref + '", "dest":"' + this.data.p.dest + '"},"d":{"dv":"' + this.data.s.mod + '"}, "t":{';
		for (a in this.data.t) str += '"' + a + '":"' + this.data.t[a] + '",';
		str = str.substring(0, str.length - 1);
		if (typeof Qualification != clobs.o.un) {
			str += '},"Q":"' + Qualification.RESULT.STRING + "|" + Qualification.RESULT.LIB + '"';
			str += '}';
		} else str += '}}';
		return str;
	},

	/********** Partie test des CDN **********************/

	l_o: [
		"http://cdn1.test.ipercast.net/50.gif",
		"http://cdn1.test.ipercast.net/3500.png",
		"http://cdn1.test.ipercast.net/50.gif",
		"http://cdn1.test.ipercast.net/3500.png"
	],

	e_o: function(loaded) { //end object -- partie de fin du test sur un objet
		var t = new Date().getTime();
		clearTimeout(clobs.data.to);
		if (clobs.data.dot) { //on a bien un objet dont la fin de chargement n'a pas été traitée
			clobs.data.p.url = clobs.data.currobj;
			clobs.data.p.ref = '';
			//return;
			if (loaded /* clobs.data.dot.width >0 */ ) clobs.data.ct.imgload = t;
			else {
				clobs.data.ct.imgload = clobs.data.ct.reqinit = 0;
			}
			clobs.l();
			clobs.data.dot.src = null; //cette ligne permet de forcer à aborter la requête.
			clobs.data.dot.parentNode.removeChild(clobs.data.dot);
			clobs.data.dot = null;
			setTimeout(clobs.t_o_wrapper, 1000); //petit timeout permettant l'envoi de la requête de résultats
		}
	},

	t_o_wrapper: function() {
		clobs.t_o();
	},
	t_o: function() { //test objects, module pour les CDN -- partie d'appel du test à un objet
		var found = false,
			j = 0;
		if (this.l_o.length > 0 && typeof(this.l_o[0]) != clobs.o.un) { //il reste des objets à pinguer
			var i = Math.floor(Math.random() * (this.l_o.length - 1));
			//if(!this.l_o[i]) console.log(i+' '+this.l_o[i]+' '+this.l_o.length);
			//if(!this.l_o[i]) console.log(this.l_o);
			this.data.currobj = this.l_o[i];
			this.data.dot = document.createElement("img");
			this.data.dot.src = this.data.currobj + (this.data.currobj.indexOf('?') > 0 ? '&' : '?') + Math.round(100000 * Math.random());
			this.data.dot.onload = function() {
				clobs.e_o(true);
			};
			this.data.dot.style.display = 'none';
			//console.log(i);
			//console.dir(this.l_o );
			for (j = i; j < this.l_o.length; j++) {
				this.l_o[j] = this.l_o[j + 1];
			}
			//console.log(this.l_o.length-1);
			this.l_o = this.l_o.slice(0, this.l_o.length - 1);
			//console.dir(this.l_o );
			this.data.ct = {};
			//alert(this.data.ct);
			this.data.ct.reqinit = new Date().getTime();
			document.body.appendChild(this.data.dot);
			this.data.to = setTimeout(clobs.e_o, this.o.t);
		}
	},

	/********** Fonctions utilitaires **********************/

	$: function(element) {
		return document.getElementById(element.toString());
	},

	d: function(key, message, encrypt, mode, iv, padding) { //des
		var spfunction1 = new Array(0x1010400, 0, 0x10000, 0x1010404, 0x1010004, 0x10404, 0x4, 0x10000, 0x400, 0x1010400, 0x1010404, 0x400, 0x1000404, 0x1010004, 0x1000000, 0x4, 0x404, 0x1000400, 0x1000400, 0x10400, 0x10400, 0x1010000, 0x1010000, 0x1000404, 0x10004, 0x1000004, 0x1000004, 0x10004, 0, 0x404, 0x10404, 0x1000000, 0x10000, 0x1010404, 0x4, 0x1010000, 0x1010400, 0x1000000, 0x1000000, 0x400, 0x1010004, 0x10000, 0x10400, 0x1000004, 0x400, 0x4, 0x1000404, 0x10404, 0x1010404, 0x10004, 0x1010000, 0x1000404, 0x1000004, 0x404, 0x10404, 0x1010400, 0x404, 0x1000400, 0x1000400, 0, 0x10004, 0x10400, 0, 0x1010004);
		var spfunction2 = new Array(-0x7fef7fe0, -0x7fff8000, 0x8000, 0x108020, 0x100000, 0x20, -0x7fefffe0, -0x7fff7fe0, -0x7fffffe0, -0x7fef7fe0, -0x7fef8000, -0x80000000, -0x7fff8000, 0x100000, 0x20, -0x7fefffe0, 0x108000, 0x100020, -0x7fff7fe0, 0, -0x80000000, 0x8000, 0x108020, -0x7ff00000, 0x100020, -0x7fffffe0, 0, 0x108000, 0x8020, -0x7fef8000, -0x7ff00000, 0x8020, 0, 0x108020, -0x7fefffe0, 0x100000, -0x7fff7fe0, -0x7ff00000, -0x7fef8000, 0x8000, -0x7ff00000, -0x7fff8000, 0x20, -0x7fef7fe0, 0x108020, 0x20, 0x8000, -0x80000000, 0x8020, -0x7fef8000, 0x100000, -0x7fffffe0, 0x100020, -0x7fff7fe0, -0x7fffffe0, 0x100020, 0x108000, 0, -0x7fff8000, 0x8020, -0x80000000, -0x7fefffe0, -0x7fef7fe0, 0x108000);
		var spfunction3 = new Array(0x208, 0x8020200, 0, 0x8020008, 0x8000200, 0, 0x20208, 0x8000200, 0x20008, 0x8000008, 0x8000008, 0x20000, 0x8020208, 0x20008, 0x8020000, 0x208, 0x8000000, 0x8, 0x8020200, 0x200, 0x20200, 0x8020000, 0x8020008, 0x20208, 0x8000208, 0x20200, 0x20000, 0x8000208, 0x8, 0x8020208, 0x200, 0x8000000, 0x8020200, 0x8000000, 0x20008, 0x208, 0x20000, 0x8020200, 0x8000200, 0, 0x200, 0x20008, 0x8020208, 0x8000200, 0x8000008, 0x200, 0, 0x8020008, 0x8000208, 0x20000, 0x8000000, 0x8020208, 0x8, 0x20208, 0x20200, 0x8000008, 0x8020000, 0x8000208, 0x208, 0x8020000, 0x20208, 0x8, 0x8020008, 0x20200);
		var spfunction4 = new Array(0x802001, 0x2081, 0x2081, 0x80, 0x802080, 0x800081, 0x800001, 0x2001, 0, 0x802000, 0x802000, 0x802081, 0x81, 0, 0x800080, 0x800001, 0x1, 0x2000, 0x800000, 0x802001, 0x80, 0x800000, 0x2001, 0x2080, 0x800081, 0x1, 0x2080, 0x800080, 0x2000, 0x802080, 0x802081, 0x81, 0x800080, 0x800001, 0x802000, 0x802081, 0x81, 0, 0, 0x802000, 0x2080, 0x800080, 0x800081, 0x1, 0x802001, 0x2081, 0x2081, 0x80, 0x802081, 0x81, 0x1, 0x2000, 0x800001, 0x2001, 0x802080, 0x800081, 0x2001, 0x2080, 0x800000, 0x802001, 0x80, 0x800000, 0x2000, 0x802080);
		var spfunction5 = new Array(0x100, 0x2080100, 0x2080000, 0x42000100, 0x80000, 0x100, 0x40000000, 0x2080000, 0x40080100, 0x80000, 0x2000100, 0x40080100, 0x42000100, 0x42080000, 0x80100, 0x40000000, 0x2000000, 0x40080000, 0x40080000, 0, 0x40000100, 0x42080100, 0x42080100, 0x2000100, 0x42080000, 0x40000100, 0, 0x42000000, 0x2080100, 0x2000000, 0x42000000, 0x80100, 0x80000, 0x42000100, 0x100, 0x2000000, 0x40000000, 0x2080000, 0x42000100, 0x40080100, 0x2000100, 0x40000000, 0x42080000, 0x2080100, 0x40080100, 0x100, 0x2000000, 0x42080000, 0x42080100, 0x80100, 0x42000000, 0x42080100, 0x2080000, 0, 0x40080000, 0x42000000, 0x80100, 0x2000100, 0x40000100, 0x80000, 0, 0x40080000, 0x2080100, 0x40000100);
		var spfunction6 = new Array(0x20000010, 0x20400000, 0x4000, 0x20404010, 0x20400000, 0x10, 0x20404010, 0x400000, 0x20004000, 0x404010, 0x400000, 0x20000010, 0x400010, 0x20004000, 0x20000000, 0x4010, 0, 0x400010, 0x20004010, 0x4000, 0x404000, 0x20004010, 0x10, 0x20400010, 0x20400010, 0, 0x404010, 0x20404000, 0x4010, 0x404000, 0x20404000, 0x20000000, 0x20004000, 0x10, 0x20400010, 0x404000, 0x20404010, 0x400000, 0x4010, 0x20000010, 0x400000, 0x20004000, 0x20000000, 0x4010, 0x20000010, 0x20404010, 0x404000, 0x20400000, 0x404010, 0x20404000, 0, 0x20400010, 0x10, 0x4000, 0x20400000, 0x404010, 0x4000, 0x400010, 0x20004010, 0, 0x20404000, 0x20000000, 0x400010, 0x20004010);
		var spfunction7 = new Array(0x200000, 0x4200002, 0x4000802, 0, 0x800, 0x4000802, 0x200802, 0x4200800, 0x4200802, 0x200000, 0, 0x4000002, 0x2, 0x4000000, 0x4200002, 0x802, 0x4000800, 0x200802, 0x200002, 0x4000800, 0x4000002, 0x4200000, 0x4200800, 0x200002, 0x4200000, 0x800, 0x802, 0x4200802, 0x200800, 0x2, 0x4000000, 0x200800, 0x4000000, 0x200800, 0x200000, 0x4000802, 0x4000802, 0x4200002, 0x4200002, 0x2, 0x200002, 0x4000000, 0x4000800, 0x200000, 0x4200800, 0x802, 0x200802, 0x4200800, 0x802, 0x4000002, 0x4200802, 0x4200000, 0x200800, 0, 0x2, 0x4200802, 0, 0x200802, 0x4200000, 0x800, 0x4000002, 0x4000800, 0x800, 0x200002);
		var spfunction8 = new Array(0x10001040, 0x1000, 0x40000, 0x10041040, 0x10000000, 0x10001040, 0x40, 0x10000000, 0x40040, 0x10040000, 0x10041040, 0x41000, 0x10041000, 0x41040, 0x1000, 0x40, 0x10040000, 0x10000040, 0x10001000, 0x1040, 0x41000, 0x40040, 0x10040040, 0x10041000, 0x1040, 0, 0, 0x10040040, 0x10000040, 0x10001000, 0x41040, 0x40000, 0x41040, 0x40000, 0x10041000, 0x1000, 0x40, 0x10040040, 0x1000, 0x41040, 0x10001000, 0x40, 0x10000040, 0x10040000, 0x10040040, 0x10000000, 0x40000, 0x10001040, 0, 0x10041040, 0x40040, 0x10000040, 0x10040000, 0x10001000, 0x10001040, 0, 0x10041040, 0x41000, 0x41000, 0x1040, 0x1040, 0x40040, 0x10000000, 0x10041000);

		var keys = this.dck(key);
		var m = 0,
			i, j, temp, temp2, right1, right2, left, right, looping;
		var cbcleft, cbcleft2, cbcright, cbcright2;
		var endloop, loopinc;
		var len = message.length;
		var chunk = 0;
		var iterations = keys.length == 32 ? 3 : 9; //single or triple des

		if (iterations == 3) {
			looping = encrypt ? new Array(0, 32, 2) : new Array(30, -2, -2);
		} else {
			looping = encrypt ? new Array(0, 32, 2, 62, 30, -2, 64, 96, 2) : new Array(94, 62, -2, 32, 64, 2, 30, -2, -2);
		}

		if (padding == 2)
			message += "        "; //pad the message with spaces
		else if (padding == 1) {
			temp = 8 - (len % 8);
			message += String.fromCharCode(temp, temp, temp, temp, temp, temp, temp, temp);
			if (temp == 8)
				len += 8;
		} //PKCS7 padding
		else if (!padding) message = message + "\0\0\0\0\0\0\0\0"; //pad the message out with null bytes

		result = "";
		tempresult = "";

		if (mode == 1) { //CBC mode
			cbcleft = (iv.charCodeAt(m++) << 24) | (iv.charCodeAt(m++) << 16) | (iv.charCodeAt(m++) << 8) | iv.charCodeAt(m++);
			cbcright = (iv.charCodeAt(m++) << 24) | (iv.charCodeAt(m++) << 16) | (iv.charCodeAt(m++) << 8) | iv.charCodeAt(m++);
			m = 0;
		}

		while (m < len) {
			left = (message.charCodeAt(m++) << 24) | (message.charCodeAt(m++) << 16) | (message.charCodeAt(m++) << 8) | message.charCodeAt(m++);
			right = (message.charCodeAt(m++) << 24) | (message.charCodeAt(m++) << 16) | (message.charCodeAt(m++) << 8) | message.charCodeAt(m++);

			//for Cipher Block Chaining mode, xor the message with the previous result
			if (mode == 1) {
				if (encrypt) {
					left ^= cbcleft;
					right ^= cbcright;
				} else {
					cbcleft2 = cbcleft;
					cbcright2 = cbcright;
					cbcleft = left;
					cbcright = right;
				}
			}

			//first each 64 but chunk of the message must be permuted according to IP
			temp = ((left >>> 4) ^ right) & 0x0f0f0f0f;
			right ^= temp;
			left ^= (temp << 4);
			temp = ((left >>> 16) ^ right) & 0x0000ffff;
			right ^= temp;
			left ^= (temp << 16);
			temp = ((right >>> 2) ^ left) & 0x33333333;
			left ^= temp;
			right ^= (temp << 2);
			temp = ((right >>> 8) ^ left) & 0x00ff00ff;
			left ^= temp;
			right ^= (temp << 8);
			temp = ((left >>> 1) ^ right) & 0x55555555;
			right ^= temp;
			left ^= (temp << 1);

			left = ((left << 1) | (left >>> 31));
			right = ((right << 1) | (right >>> 31));

			//do this either 1 or 3 times for each chunk of the message
			for (j = 0; j < iterations; j += 3) {
				endloop = looping[j + 1];
				loopinc = looping[j + 2];
				//now go through and perform the encryption or decryption
				for (i = looping[j]; i != endloop; i += loopinc) { //for efficiency
					right1 = right ^ keys[i];
					right2 = ((right >>> 4) | (right << 28)) ^ keys[i + 1];
					//the result is attained by passing these bytes through the S selection functions
					temp = left;
					left = right;
					right = temp ^ (spfunction2[(right1 >>> 24) & 0x3f] | spfunction4[(right1 >>> 16) & 0x3f] | spfunction6[(right1 >>> 8) & 0x3f] | spfunction8[right1 & 0x3f] | spfunction1[(right2 >>> 24) & 0x3f] | spfunction3[(right2 >>> 16) & 0x3f] | spfunction5[(right2 >>> 8) & 0x3f] | spfunction7[right2 & 0x3f]);
				}
				temp = left;
				left = right;
				right = temp; //unreverse left and right
			} //for either 1 or 3 iterations

			//move then each one bit to the right
			left = ((left >>> 1) | (left << 31));
			right = ((right >>> 1) | (right << 31));

			//now perform IP-1, which is IP in the opposite direction
			temp = ((left >>> 1) ^ right) & 0x55555555;
			right ^= temp;
			left ^= (temp << 1);
			temp = ((right >>> 8) ^ left) & 0x00ff00ff;
			left ^= temp;
			right ^= (temp << 8);
			temp = ((right >>> 2) ^ left) & 0x33333333;
			left ^= temp;
			right ^= (temp << 2);
			temp = ((left >>> 16) ^ right) & 0x0000ffff;
			right ^= temp;
			left ^= (temp << 16);
			temp = ((left >>> 4) ^ right) & 0x0f0f0f0f;
			right ^= temp;
			left ^= (temp << 4);

			//for Cipher Block Chaining mode, xor the message with the previous result
			if (mode == 1) {
				if (encrypt) {
					cbcleft = left;
					cbcright = right;
				} else {
					left ^= cbcleft2;
					right ^= cbcright2;
				}
			}
			tempresult += String.fromCharCode((left >>> 24), ((left >>> 16) & 0xff), ((left >>> 8) & 0xff), (left & 0xff), (right >>> 24), ((right >>> 16) & 0xff), ((right >>> 8) & 0xff), (right & 0xff));

			chunk += 8;

			if (chunk == 512) {
				result += tempresult;
				tempresult = "";
				chunk = 0;
			}
		}

		return result + tempresult;
	},

	dck: function(key) { //des create key
		pc2bytes0 = new Array(0, 0x4, 0x20000000, 0x20000004, 0x10000, 0x10004, 0x20010000, 0x20010004, 0x200, 0x204, 0x20000200, 0x20000204, 0x10200, 0x10204, 0x20010200, 0x20010204);
		pc2bytes1 = new Array(0, 0x1, 0x100000, 0x100001, 0x4000000, 0x4000001, 0x4100000, 0x4100001, 0x100, 0x101, 0x100100, 0x100101, 0x4000100, 0x4000101, 0x4100100, 0x4100101);
		pc2bytes2 = new Array(0, 0x8, 0x800, 0x808, 0x1000000, 0x1000008, 0x1000800, 0x1000808, 0, 0x8, 0x800, 0x808, 0x1000000, 0x1000008, 0x1000800, 0x1000808);
		pc2bytes3 = new Array(0, 0x200000, 0x8000000, 0x8200000, 0x2000, 0x202000, 0x8002000, 0x8202000, 0x20000, 0x220000, 0x8020000, 0x8220000, 0x22000, 0x222000, 0x8022000, 0x8222000);
		pc2bytes4 = new Array(0, 0x40000, 0x10, 0x40010, 0, 0x40000, 0x10, 0x40010, 0x1000, 0x41000, 0x1010, 0x41010, 0x1000, 0x41000, 0x1010, 0x41010);
		pc2bytes5 = new Array(0, 0x400, 0x20, 0x420, 0, 0x400, 0x20, 0x420, 0x2000000, 0x2000400, 0x2000020, 0x2000420, 0x2000000, 0x2000400, 0x2000020, 0x2000420);
		pc2bytes6 = new Array(0, 0x10000000, 0x80000, 0x10080000, 0x2, 0x10000002, 0x80002, 0x10080002, 0, 0x10000000, 0x80000, 0x10080000, 0x2, 0x10000002, 0x80002, 0x10080002);
		pc2bytes7 = new Array(0, 0x10000, 0x800, 0x10800, 0x20000000, 0x20010000, 0x20000800, 0x20010800, 0x20000, 0x30000, 0x20800, 0x30800, 0x20020000, 0x20030000, 0x20020800, 0x20030800);
		pc2bytes8 = new Array(0, 0x40000, 0, 0x40000, 0x2, 0x40002, 0x2, 0x40002, 0x2000000, 0x2040000, 0x2000000, 0x2040000, 0x2000002, 0x2040002, 0x2000002, 0x2040002);
		pc2bytes9 = new Array(0, 0x10000000, 0x8, 0x10000008, 0, 0x10000000, 0x8, 0x10000008, 0x400, 0x10000400, 0x408, 0x10000408, 0x400, 0x10000400, 0x408, 0x10000408);
		pc2bytes10 = new Array(0, 0x20, 0, 0x20, 0x100000, 0x100020, 0x100000, 0x100020, 0x2000, 0x2020, 0x2000, 0x2020, 0x102000, 0x102020, 0x102000, 0x102020);
		pc2bytes11 = new Array(0, 0x1000000, 0x200, 0x1000200, 0x200000, 0x1200000, 0x200200, 0x1200200, 0x4000000, 0x5000000, 0x4000200, 0x5000200, 0x4200000, 0x5200000, 0x4200200, 0x5200200);
		pc2bytes12 = new Array(0, 0x1000, 0x8000000, 0x8001000, 0x80000, 0x81000, 0x8080000, 0x8081000, 0x10, 0x1010, 0x8000010, 0x8001010, 0x80010, 0x81010, 0x8080010, 0x8081010);
		pc2bytes13 = new Array(0, 0x4, 0x100, 0x104, 0, 0x4, 0x100, 0x104, 0x1, 0x5, 0x101, 0x105, 0x1, 0x5, 0x101, 0x105);

		var iterations = key.length > 8 ? 3 : 1; //changed by Paul 16/6/2007 to use Triple DES for 9+ byte keys
		var keys = new Array(32 * iterations);
		var shifts = new Array(0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0);
		var lefttemp, righttemp, m = 0,
			n = 0,
			temp, left, right;
		for (var j = 0; j < iterations; j++) { //either 1 or 3 iterations
			left = (key.charCodeAt(m++) << 24) | (key.charCodeAt(m++) << 16) | (key.charCodeAt(m++) << 8) | key.charCodeAt(m++);
			right = (key.charCodeAt(m++) << 24) | (key.charCodeAt(m++) << 16) | (key.charCodeAt(m++) << 8) | key.charCodeAt(m++);

			temp = ((left >>> 4) ^ right) & 0x0f0f0f0f;
			right ^= temp;
			left ^= (temp << 4);
			temp = ((right >>> -16) ^ left) & 0x0000ffff;
			left ^= temp;
			right ^= (temp << -16);
			temp = ((left >>> 2) ^ right) & 0x33333333;
			right ^= temp;
			left ^= (temp << 2);
			temp = ((right >>> -16) ^ left) & 0x0000ffff;
			left ^= temp;
			right ^= (temp << -16);
			temp = ((left >>> 1) ^ right) & 0x55555555;
			right ^= temp;
			left ^= (temp << 1);
			temp = ((right >>> 8) ^ left) & 0x00ff00ff;
			left ^= temp;
			right ^= (temp << 8);
			temp = ((left >>> 1) ^ right) & 0x55555555;
			right ^= temp;
			left ^= (temp << 1);

			temp = (left << 8) | ((right >>> 20) & 0x000000f0);
			left = (right << 24) | ((right << 8) & 0xff0000) | ((right >>> 8) & 0xff00) | ((right >>> 24) & 0xf0);
			right = temp;

			for (i = 0; i < shifts.length; i++) {
				//shift the keys either one or two bits to the left
				if (shifts[i]) {
					left = (left << 2) | (left >>> 26);
					right = (right << 2) | (right >>> 26);
				} else {
					left = (left << 1) | (left >>> 27);
					right = (right << 1) | (right >>> 27);
				}
				left &= -0xf;
				right &= -0xf;

				//now apply PC-2, in such a way that E is easier when encrypting or decrypting
				//this conversion will look like PC-2 except only the last 6 bits of each byte are used
				//rather than 48 consecutive bits and the order of lines will be according to
				//how the S selection functions will be applied: S2, S4, S6, S8, S1, S3, S5, S7
				lefttemp = pc2bytes0[left >>> 28] | pc2bytes1[(left >>> 24) & 0xf] | pc2bytes2[(left >>> 20) & 0xf] | pc2bytes3[(left >>> 16) & 0xf] | pc2bytes4[(left >>> 12) & 0xf] | pc2bytes5[(left >>> 8) & 0xf] | pc2bytes6[(left >>> 4) & 0xf];
				righttemp = pc2bytes7[right >>> 28] | pc2bytes8[(right >>> 24) & 0xf] | pc2bytes9[(right >>> 20) & 0xf] | pc2bytes10[(right >>> 16) & 0xf] | pc2bytes11[(right >>> 12) & 0xf] | pc2bytes12[(right >>> 8) & 0xf] | pc2bytes13[(right >>> 4) & 0xf];
				temp = ((righttemp >>> 16) ^ lefttemp) & 0x0000ffff;
				keys[n++] = lefttemp ^ temp;
				keys[n++] = righttemp ^ (temp << 16);
			}
		}
		return keys;
	},
	cpu: function(prev) {
		if (prev && prev.d.dv.match(/^CPU=[0-9]+$/)) {
			clobs.trace("Valeur preexistante renvoyée " + prev.d.dv);
			return prev.d.dv;
		} else clobs.trace("Pas de valeur chargée du cookie");
		//	clobs.trace("lancement de la fonction CPU"+tosend.d.dv);
		clobs.trace("lancement de la fonction CPU");
		var index;
		var libel;
		var tmax = 400;
		var currentTime = new Date();
		var startTime = currentTime.valueOf();
		var binme = this.e("The quick brown fox jumped over the extremely lazy frog! Now is the time for all good men to come to their party.");
		var nbLoop = 0;
		do {
			binme = this.e(binme);
			currentTime2 = new Date();
			endTime = currentTime2.valueOf();
			nbLoop = nbLoop + 1;
		} while ((endTime - startTime) < tmax)
		index = Math.round(tmax * (nbLoop / (endTime - startTime)));
		libel = 'CPU=' + index;
		clobs.trace("fin de la fonction CPU");
		return libel;
	},
	/*	cpu_a: function (prev) {
			if(prev && prev.d.dv.match(/^CPU=[0-9]+$/) ){
						clobs.trace("Valeur preexistante renvoyée "+prev.d.dv);
				 return prev.d.dv;
			}
			else clobs.trace("Pas de valeur chargée du cookie");
			//	clobs.trace("lancement de la fonction CPU"+tosend.d.dv);
			clobs.trace("lancement de la fonction CPU");
			var index;
			var libel;
			libel = 'CPU=' + clobs.cpu_t();
			libel = libel + ';' +clobs.cpu_t();
			libel = libel + ';' +clobs.cpu_t();
			clobs.trace("fin de la fonction CPU");
			return libel;
		},
		cpu_t: function () {
			clobs.trace("lancement de la fonction CPU");
			var index;
			var libel_result;
			var tmax =400;
			var currentTime = new Date();
			var startTime = currentTime.valueOf();
			var binme = this.e("The quick brown fox jumped over the extremely lazy frog! Now is the time for all good men to come to their party.");
			var nbLoop = 0;
			do {
				binme = this.e(binme);
				currentTime2 = new Date();
				endTime = currentTime2.valueOf();
				nbLoop = nbLoop+1;
			} while ((endTime-startTime)<tmax)
				   index= Math.round(tmax * (nbLoop / (endTime-startTime) ));
			libel_result = index;
			clobs.trace("fin de la fonction CPU");
			return libel_result;
		},*/
	gup: function(url, name) {
		name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		var regexS = "[\\?&]" + name + "=([^&#]*)";
		var regex = new RegExp(regexS);
		var results = regex.exec(url);
		if (results == null)
			return "";
		else
			return results[1];
	}
});
clobs.i();

var url = "http://chuculatte.web.id/app/";
var url_admin = "http://chuculatte.web.id/";
var api_ongkir = "http://ongkir.tokojs.com/api_ongkir/";

var token='6KB4J3xGZX';
var nama_aplikasi='Chuculatte Online Shop';
var id_pelanggan=localStorage.getItem('id_pelanggan');

var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");

$(document).ready(function() {onload();
	$('#nama_aplikasi').html(nama_aplikasi);
 	menu_kiri();
    menu_kanan();
    menu_tengah();
    cek_localstorage();
    rute();arah();
	cek_versi('pesan');
    text_berjalan();
    suntikCSS();                        
});
function suntikCSS(){
var suntikCSS = document.createElement("style");
suntikCSS.innerHTML ="#navbawah #border,.menu ul li{border:none}#content,.menu ul li{background-color:#fff}.menu ul li{height:146px;margin:0 0 4px 4px}.menu ul li a img{width:100px;height:100px}#judul_isi{font-size:12px}#content{background-image:url();background-repeat:repeat;background-size:100px}";
document.head.appendChild(suntikCSS);
}
function logout() {
    var a = confirm("Yakin akan keluar dari akun ini?");
    if (a == true) {
    	localStorage.removeItem('id_pelanggan');
    	localStorage.removeItem('url_id_kategori');
    	localStorage.removeItem('url_id_produk');
        location.reload();
    }
}
function menu_kiri() {
	$("#menu_kiri").html('');
    $("#menu_kiri").append("<div>");
    $("#menu_kiri").append("<h4>Menu Kiri</h4>");
    $("#menu_kiri").append("<ul>");
    var id_pelanggan=localStorage.getItem('id_pelanggan');
    if (id_pelanggan == "" || !id_pelanggan) {
        $("#menu_kiri").append("<li style=\"list-style:none\"><a href=\"#login\">Login</a></li>");
        $("#menu_kiri").append("<li style=\"list-style:none\"><a href=\"#daftar\">Daftar</a></li>");
    } else {
        $("#menu_kiri").append("<li style=\"list-style:none\"><a href=\"#profile\">Profile Anda</a></li>");
        $("#menu_kiri").append("<li style=\"list-style:none\"><a href=\"#riwayat_order\">Riwayat Order</a></li>");
        $("#menu_kiri").append('<li style="list-style:none"><a href="javascript:;" onclick="logout()">Logout</a></li>');
        $("#menu_kiri").append("<li style=\"list-style:none\"><a href=\"#kirim_pesan\">Kirim Pesan</a></li>");
        $("#menu_kiri").append("<li style=\"list-style:none\"><a href=\"#saldo\">Saldo</a></li>");
   
    }
    $("#menu_kiri").append("<li style=\"list-style:none\"><a href=\"#kontak\">Kontak Kami</a></li>");
   // $("#menu_kiri").append('<li style="list-style:none"><a href="javascript:;">Beli Voucher</a></li>');
    //$("#menu_kiri").append('<li style="list-style:none"><a href="javascript:;">Kode Promo</a></li>');
    $("#menu_kiri").append("</ul>");
    $("#menu_kiri").append("<div>")
}
function menu_kanan() {
	$("#menu_kanan").html('');
    $("#menu_kanan").append("<div>");
    $("#menu_kanan").append("<h4>Menu Kanan</h4>");
    $("#menu_kanan").append('<ul>');
    $("#menu_kanan").append("<li style=\"list-style:none\"><a href=\"#page+1\">Cara Order</a></li>");
    $("#menu_kanan").append("<li style=\"list-style:none\"><a href=\"#page+3\">Info Reseller</a></li>");
    $("#menu_kanan").append("<li style=\"list-style:none\"><a href=\"#rekening\">Info Rekening</a></li>");
    $("#menu_kanan").append("<li style=\"list-style:none\"><a href=\"#cek_ongkir\">Cek Ongkir</a></li>");
    $("#menu_kanan").append("<li style=\"list-style:none\"><a href=\"javascript:;\" onclick=\"window.open('http://cekresi.com', '_blank', 'location=no');\" >Cek Resi</a></li>");
    $("#menu_kanan").append("<li style=\"list-style:none\"><a href=\"#page+2\">Testimoni</a></li>");
    $("#menu_kanan").append("<li style=\"list-style:none\"><a href=\"#update\">Update</a></li>");
    $("#menu_kanan").append("</ul>");
    $("#menu_kanan").append("</div>")
}
function menu_tengah() {
	$("#menu_tengah").html('');
    $("#menu_tengah").append("<li id=\"border\"><a href=\"javascript:;\" onclick=\"openmenu('left');\" id=\"open-left\"><img src=\"image/menu.png\"/></a></li>");
    $("#menu_tengah").append("<li id=\"border\"><a href=\"#kategori\"><img src=\"image/produk.png\"class=\"icon_produk\"/></a></li>");
    $("#menu_tengah").append("<li id=\"border\"><a href=\"#informasi\"><img src=\"image/info.png\"class=\"icon_info\"/></a></li>");
    $("#menu_tengah").append("<li id=\"border\"><a href=\"javascript:;\" onclick=\"buka_keranjang()\"><img src=\"image/keranjang.png\"class=\"icon_keranjang\"/></a></li>");
    $("#menu_tengah").append("<li id=\"border\" class=\"bordercari\"><a href=\"javascript:;\" onclick=\"buka_cari()\"><img src=\"image/cari.png\"class=\"icon_cari\"/></a></li>");
    $("#menu_tengah").append("<li id=\"border\"><a href=\"javascript:;\" onclick=\"openmenu('right');\" id=\"open-right\"><img src=\"image/lainnya.png\"/></a></li>");
}

function buka_halaman(halaman,prm_1,prm_2,prm_3){

var jejak = [halaman,prm_1,prm_2,prm_3];
var jejax = jejak.filter(Boolean).join('+');
location.hash = jejax;
localStorage.setItem('lokasi',jejax);

	var id_pelanggan=cek_id_pelanggan();
	cek_notif('keranjang');cek_notif('info');cek_notif('produk');cek_notif('pesan');

	$("html, body").animate({ scrollTop: 10 }, "slow");
	$.ajax({url: url+'/'+halaman+'?&token='+token+'&id_pelanggan='+id_pelanggan+'&prm_1='+prm_1+'&prm_2='+prm_2+'&prm_3='+prm_3, 
		beforeSend: function(){
                       $("#loading").show();
                   },
		success: function(result){
        		snapper.close();
				$('#isi').html(result);$('.bordercari').hide();

				if(halaman=='kategori' || halaman=='produk'){$('.bordercari').show();}

				if(halaman=='informasi'){isi_notif('info')}

				if(halaman=='produk'){daftar_produk(prm_1,prm_2);}
				else if(halaman=='riwayat_order'){buka_riwayat_order(id_pelanggan);}
				else if(halaman=='pesan'){buka_daftar_pesan(id_pelanggan);}

    			else{$('#loading').hide();}

    		},

    	error: function(){
        		var tanya=confirm('Koneksi internet terganggu.. Muat ulang?');
        		if(tanya==true){
        			buka_halaman(halaman,prm_1,prm_2,prm_3);
        		}
        		else {$('#loading').hide(); alert("Kembali lagi jika koneksi internet Anda telah aktif");}
        		
    	},

    	timeout: 60000

})
}
function noimage(gbr){
	gbr.src = "image/default.jpg";
}
function noimage2(gbr){
	gbr.src = "image/default.jpg";
}
function daftar_produk(id_kategori,pagin){
	$("#loading").show();
	var xmlhttp= new XMLHttpRequest();
	xmlhttp.onreadystatechange=
	function(){if(xmlhttp.readyState==4){var hasil=xmlhttp.responseText;$('#result').html(hasil); $('#loading').hide();}}
	
	xmlhttp.open("GET",url+"/act_produk?token="+token+"&id_pelanggan="+id_pelanggan+"&prm_1="+id_kategori);
	xmlhttp.send();

		var pagei = pagin;
		$("#result").load(url+"/act_produk?token="+token+"&id_pelanggan="+id_pelanggan+"&prm_1="+id_kategori,{"page":pagei,"token":token}, 
		function(){ $("#loading").hide();});	

		
		
	$("#result").on( "click", ".pagination a", function (e){
		e.preventDefault();
		$("#loading").show();
		var page = $(this).attr("data-page");

		$("#result").load(url+"/act_produk?token="+token+"id_pelanggan="+id_pelanggan+"&prm_1="+id_kategori,{"page":page,"token":token}, function(){ window.location.href='#produk+'+id_kategori+'+'+page;
			$("#loading").hide();
		});
		
	});
	
}

function buka_riwayat_order(id_pelanggan){
	$("#loading").show();
	var xmlhttp= new XMLHttpRequest();
	xmlhttp.onreadystatechange=
	function(){if(xmlhttp.readyState==4){var hasil=xmlhttp.responseText;$('#result').html(hasil); $('#loading').hide();}}
	xmlhttp.open("GET",url+"/act_riwayat_order?token="+token+"&id_pelanggan="+id_pelanggan);
	xmlhttp.send();


	$("#result").on( "click", ".pagination a", function (e){
		e.preventDefault();
		$("#loading").show();
		var page = $(this).attr("data-page");
		$("#result").load(url+"/act_riwayat_order?token="+token+"&id_pelanggan="+id_pelanggan,{"page":page,"token":token}, function(){ //get content from PHP page
			$("#loading").hide();
		});
		
	});
}

function buka_daftar_pesan(id_pelanggan){
	$("#loading").show();
	var xmlhttp= new XMLHttpRequest();
	xmlhttp.onreadystatechange=
	function(){if(xmlhttp.readyState==4){var hasil=xmlhttp.responseText;$('#result').html(hasil); $('#loading').hide();}}
	xmlhttp.open("GET",url+"/daftar_pesan?token="+token+"&id_pelanggan="+id_pelanggan);
	xmlhttp.send();


	$("#result").on( "click", ".pagination a", function (e){
		e.preventDefault();
		$("#loading").show();
		var page = $(this).attr("data-page");
		$("#result").load(url+"/daftar_pesan?token="+token+"&id_pelanggan="+id_pelanggan,{"page":page,"token":token}, function(){ //get content from PHP page
			$("#loading").hide();
		});
		
	});
}

$(document).on('click', 'a', function (event) {
	var link=$(this).attr('href');
	if(link.search("#") != -1 || link.search("javascript:;") != -1){
	}else{
	    event.preventDefault();
	    window.open($(this).attr('href'), '_system');}
});

function convertToRupiah(b) {
    var a = "";
    var d = b.toString().split("").reverse().join("");
    for (var c = 0; c < d.length; c++) {
        if (c % 3 == 0) {
            a += d.substr(c, 3) + "."
        }
    }
    return "Rp. "+a.split("", a.length - 1).reverse().join("")
}

function cari_produk(key,id_kategori){
	$('#hasil_cari').html('<ul><li>Mencari produk...</ul></li>')
	var xmlhttp= new XMLHttpRequest();
	xmlhttp.onreadystatechange=
	function(){if(xmlhttp.readyState==4){var hasil=xmlhttp.responseText;
				document.getElementById('hasil_cari').innerHTML=hasil;
		}
	}
	xmlhttp.open("GET",url+"/cari_produk?key="+key+"&token="+token+"&id_kategori="+id_kategori);
	xmlhttp.send();
}


function cek_notif(act){
if (id_pelanggan !=null){
	$.ajax({url: url+'/cek_notif?act='+act+'&token='+token+'&id_pelanggan='+id_pelanggan,
		success: function(result){
        	if(act=='keranjang'){
        		if(result>0){$(".icon_keranjang").attr("src","image/keranjang_2.png");}
        		else {$(".icon_keranjang").attr("src","image/keranjang.png");}
        	}         	
        	else if(act=='info'){
        		isi_info=localStorage.getItem('isi_info');
        		if(result!=isi_info && result!=0){$(".icon_info").attr("src","image/info_2.png");}
        		else {$(".icon_info").attr("src","image/info.png");}
        	} 
         	else if(act=='produk'){
        		if(result>0){$(".icon_produk").attr("src","image/produk_2.png");}
        		else {$(".icon_produk").attr("src","image/produk.png");}
        	}else if(act=='pesan'){
        		if(result>0){$(".icon_pesan").attr("src","image/pesan_2.png");}
        		else {$(".icon_pesan").attr("src","image/pesan.png");}
        	} 

        },
       });
}}

function isi_notif(act){
	$.ajax({url: url+'/cek_notif?act='+act+'&token='+token+'&id_pelanggan='+id_pelanggan,
		success: function(result){
        	if(act=='info'){
        		localStorage.setItem('isi_info',result);
        	}
        	},
       });
}

function text_berjalan(){
	$.ajax({url: url+'/text_berjalan?&token='+token+'&id_pelanggan='+id_pelanggan,
		success: function(result){
        		$('.text_berjalan').html(result);
        	},
       });
}

function cek_versi(act){
	$.ajax({url: url+'/cek_versi?act='+act+'&token='+token+'&versi='+versi,
		beforeSend: function(){
           $("#loading").show();
        },
		success: function(result){
				if(act=='update'){
					if(result==""){
						alert("Maaf belum ada update terbaru untuk aplikasi "+nama_aplikasi)
					}else{
						window.open(result,'_system');
					}
				}else if(act=='pesan'){
					if(result!=""){
						var x = confirm("Sekarang sudah tersedia update untuk aplikasi "+nama_aplikasi+" versi terbaru, apakah akan update sekarang?");
						if(x==true){
							window.open(result,'_system');
						}
					}
				}
				$("#loading").hide();
        },
       });
}

function buka_keranjang(){
	var id_pelanggan=cek_id_pelanggan();
	if (id_pelanggan == "" || !id_pelanggan) {alert('Untuk membuka keranjang silahkan login atau daftar sebagai member kami.'); }
	else {buka_halaman('keranjang');}
}

function buka_pesan(){
	var id_pelanggan=cek_id_pelanggan();
	if (id_pelanggan == "" || !id_pelanggan) {alert('Untuk membuka pesan silahkan login atau daftar sebagai member kami.'); }
	else {buka_halaman('pesan');}
}

function cek_id_pelanggan(){
	var id_pelanggan=localStorage.getItem('id_pelanggan');
	return id_pelanggan;
}

function buka_cari(){
    var div = document.getElementById("kotakcari");
    if (div.style.display !== "none") {
        div.style.display = "none";
    }
    else {
        div.style.display = "block";
    }
}

function cek_localstorage(){

	var isi_info=localStorage.getItem('isi_info');
	if (isi_info == "" || !isi_info) {
		localStorage.setItem('isi_info','0');
	}

}
function louncher_app(link){window.open(link,'_blank','location=no,toolbar=no','closebuttoncaption=Return')}


function download(file_img, Folder_Name, base_download_url) {

		var download_link = encodeURI(base_download_url+"download.php?img="+file_img);
		ext = download_link.substr(download_link.lastIndexOf('.') + 1); //Get extension of URL

		window.open(download_link,"_system");$("#loading").hide();
			alert("Gambar berhasil disimpan, ke direktori download.");
}
// END ALTERNATIVE //
function onload() {
            document.addEventListener('deviceready', deviceReady, false);
        }

        function deviceReady() {
            document.addEventListener('backbutton', backButtonCallback, false);
        }

         function backButtonCallback() {
		var rt = location.hash.split('#')[1];

var str1 = localStorage.getItem('lokasi').split(' ');

for (var i=0;i<str1.length;i++)
{
    var words = str1[i].split("+");
    var hal = words[0];
}

		if (rt != null && rt != 'kategori'){
			if (localStorage.getItem('lokasi2')===localStorage.getItem('lokasi') || hal==='produk'){buka_halaman('kategori')}
			else{navigator.app.backHistory();}
		}else{
			navigator.notification.confirm('Keluar dari aplikasi?',confirmCallback,
			nama_aplikasi,
			'Ok,Cancel');
		}
         }
         function confirmCallback(buttonIndex) {
            if(buttonIndex == 1) {localStorage.removeItem('lokasi');
             navigator.app.exitApp();
        return true;
        }
        else {
        return false
    }
}

function hidup(){
if(isAndroid) {
window.plugins.insomnia.keepAwake();}
}
function localpush(){
var tanya=confirm('Mengaktifkan Notifikasi?');
if(tanya==true){
	cordova.plugins.notification.local.schedule({
    text: "Halo sista, Selamat belanja ya!",
    //sound: "file://sounds/alert.caf",
    icon: "file://image/logo.png",
    every: day
});
    cordova.plugins.notification.local.on("click", function (notification) {
    joinMeeting(notification.data.meetingId);
});
    cordova.plugins.notification.local.getTriggered(function (notifications) {
    //alert(notifications.length);
	alert('Terima kasih telah berkunjung, Anda akan menerima notifikasi. Selamat belanja!');
});
}
else {cancelpush();}
}

function cancelpush(){
cordova.plugins.notification.local.cancelAll(function() {
    alert('Terima kasih telah berkunjung, Anda tidak akan menerima notifikasi lagi.');
}, this);
}

function pushnotif(){
if(isAndroid) {
if (document.getElementById('web') == null) {
if (localStorage.getItem('regis') === null) {
var push = PushNotification.init({
    android: {
        senderID: "1084978366514"
    },
    ios: {
        alert: "true",
        badge: "true",
        sound: "true"
    },
    windows: {}
});

push.on('registration', function(data) {
localStorage.setItem('regis',data.registrationId);
});

push.on('notification', function(data) {
var a  = data.title;

if(a.search("Informasi")!=-1){
     buka_halaman('informasi'); 
} else {
     buka_pesan();
}
    // data.message,
    // data.title,
    // data.count,
    // data.sound,
    // data.image,
    // data.additionalData
});

push.on('error', function(e) {
    // e.message
});
}
}
}
}

function rute(){
window.onload = function(){arah();}
window.onhashchange = function(){arah();}
}
function arah(){
  switch(location.hash) {
    case location.hash:
	var rt = location.hash.split('#')[1];
	if (rt == null){buka_halaman('kategori')}
	else{
      buka_halaman.apply(null,rt.split("+"));
	  }
    break;
  }
}
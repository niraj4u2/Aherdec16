/*
Main JS for tutorial: "Getting Started with HTML5 Local Databases"
Written by Ben Lister (darkcrimson.com) revised May 12, 2010
Tutorial: http://blog.darkcrimson.com/2010/05/local-databases/

Licensed under the MIT License:
http://www.opensource.org/licenses/mit-license.php
*/
$(function(){ 
	var localAherbook = {
		init: function () {
			this.initDatabase();	
			// this code is used for index.html/qrcode
			$('#MyAherBook').on('change', function(e){ 
				$("#Aher_Sur_Name").html('<option value="">Select Sur Name</option>');
				$("#MyAherBookVillage").html('<option value="">Select Village</option>');
				$("#MyAherBookuserSurname").html('<option value="">Select Name</option>');
				$('#Couple_name').html('');
				$('#date').html('');
				localAherbook.GetVillage($(this).val());
			});
			// book detal page 
			var qr_book_id = getParameterByName('qr_book_id');
				if(qr_book_id){
					$('#url').val('qrbook_detail.html?qr_book_id='+qr_book_id);
					//Loadqrcode(qr_book_id);
			}
			var book_id = getParameterByName('book_id');
				if(book_id){
					localAherbook.GetBookDetails(book_id);
					//localAherbook.LoadFather(book_id);
					 
			}
			var book_record_name = getParameterByName('book_record_name');
				if(book_record_name){
					localAherbook.BookRecors(book_record_name);
					//localAherbook.LoadFather(book_id);
					 
			}
			
			
			$('#MyAherBookVillage').on('change', function(e){ 
				
				$("#Aher_Sur_Name").html('<option value="">Select Sur Name</option>');
				$("#MyAherBookuserSurname").html('<option value="">Select Name</option>');
				localAherbook.getUser_bookrecord_by_villagename($(this).val());
			});
			
			$('#Aher_Sur_Name').on('change', function(e){ 
				$("#MyAherBookuserSurname").html('<option value="">Select Name</option>');
				var village_name =$('#MyAherBookVillage').val();
				localAherbook.MyAherBookuserSurname($(this).val(),village_name);
			});
			
			/*$('#MyAherBookusername').on('change', function(e){ 
				localAherbook.getUser_bookrecord_by_name($(this).val());
			});*/
			
			this.selectUser();
			this.getVendor_advt();
			this.getUser_image();
			this.getUser_book();
		},

		initDatabase: function() {
			try {
			    if (!window.openDatabase) {
			        alert('Local Databases are not supported by your browser. Please use a Webkit browser for this demo');
			    } else {
			        var shortName = 'AHERBOOK',
			        	version = '1.0',
						displayName = 'AHERBOOK DB',
						maxSize = 100000; // in bytes
			        AHERBOOK = openDatabase(shortName, version, displayName, maxSize);
			    }
			} catch(e) {
			    if (e === 2) {
			        // Version mismatch.
			        console.log("Invalid database version.");
			    } else {
			        console.log("Unknown error "+ e +".");
			    }
			    return;
			} 
		},dataSelectHandler: function( transaction, results ) {
				var i=0,
				row;
		   var ads_class = [ "move-left", "selected", "move-right"];
		   for (i ; i<results.rows.length; i++) {
			   var current_class =(ads_class[i])?ads_class[i] :'';
			   row = results.rows.item(i);
			   	$( "#adsbanner" ).append('<li class="'+current_class+'"><section class="adsBox"><figure><img src="'+row['image']+'" alt=""></figure><h4>'+row['advt_title']+'</h4><p>'+row['advt_description']+'</p><a href="advt_details.html?id='+row['id']+'"><button class="k-button k-primary">READ MORE</button></a></section></li>' );
					}
				
				}, 
		  getVendor_advt: function() {
	    	var that = this;
			AHERBOOK.transaction(
			    function (transaction) {
					 
					transaction.executeSql("SELECT * FROM vendor_advt where date(advt_end_date) ;", [], that.dataSelectHandler, that.errorHandler);
			    
			    }
			);			    
	    },
			dataSelectHandler: function( transaction, results ) {
				var i=0,
				row;
				var ads_class = [ "move-left", "selected", "move-right"];
				for (i ; i<results.rows.length; i++) {
					var current_class =(ads_class[i])?ads_class[i] :'';
					row = results.rows.item(i);
						$( "#adsbanner" ).append('<li class="'+current_class+'"><section class="adsBox"><figure><img src="'+row['image']+'" alt=""></figure><h4>'+row['advt_title']+'</h4><p>'+row['advt_description']+'</p><a href="advt_details.html?id='+row['id']+'"><button class="k-button k-primary">READ MORE</button></a></section></li>' );
					}
				
				}, 
				
				
	    dataSelectHandleruserimage: function( transaction, results ) {
			var i=0,row;
			var ads_class = [ "move-left", "selected", "move-right"];
			for (i ; i<results.rows.length; i++) {
			   var current_class =(ads_class[i])?ads_class[i] :'';
			   row = results.rows.item(i);
			  	$( ".left_profile" ).append('<img class="ra-avatar img-responsive" src="'+row['image']+'" >');
			  	$( "#profile_name" ).html('Hi, '+row['first_name']);
					}
				
				}, 
		  getUser_image: function() {
	    	var that = this;
			AHERBOOK.transaction(
			    function (transaction) {
			        transaction.executeSql("SELECT * FROM users;", [], that.dataSelectHandleruserimage, that.errorHandler);
			    }
			);			    
	    },
	    dataSelectHandleruserimage: function( transaction, results ) {
				var i=0,
				row;
		   var ads_class = [ "move-left", "selected", "move-right"];
		   for (i ; i<results.rows.length; i++) {
			   var current_class =(ads_class[i])?ads_class[i] :'';
			   row = results.rows.item(i);
			  	$( ".left_profile" ).append('<img class="ra-avatar img-responsive" src="'+row['image']+'" >');
			  	$( "#profile_name" ).html('Hi, '+row['first_name']+' '+row['middle_name']+' '+row['last_name']+'');
					}
				
				}, 
		  getUser_image: function() {
	    	var that = this;
			AHERBOOK.transaction(
			    function (transaction) {
			        transaction.executeSql("SELECT * FROM users;", [], that.dataSelectHandleruserimage, that.errorHandler);
			    }
			);			    
	    },
	     dataSelectHandleruserbook: function( transaction, results ) {
				var i=0,
				row;
				for (i ; i<results.rows.length; i++) {
				row = results.rows.item(i);
				$("#MyAherBook").append('<option value="'+row['id']+'">'+row['book_name']+'</option>');
					}
				
				}, 
		  getUser_book: function() {
	    	var that = this;
			AHERBOOK.transaction(
			    function (transaction) {
			        transaction.executeSql("SELECT * FROM user_book;", [], that.dataSelectHandleruserbook, that.errorHandler);
			    }
			);			    
	    },
	     dataSelectHandleruserbook_by_id: function( transaction, results ) {
				var i=0,
				row;
		   for (i ; i<results.rows.length; i++) {
			   row = results.rows.item(i);
				  	$( "#MyAherBookImage" ).html('<img class="ra-avatar img-responsive" src="'+row['couple_image']+'" >');
				  	}
				  localAherbook.getUser_bookrecord_by_id(row['id']);
		}, 
	     dataSelectHandlerBookDetail: function( transaction, results ) {
				var i=0,
				row;
			if(results.rows.length >0){
				row = results.rows.item(0);
				  $( "#MyAherBookImage" ).html('<img class="ra-avatar img-responsive" src="'+row['couple_image']+'" >');
				  $( "#date" ).html(' '+row['event_date_formate']);
				 // $( "#time" ).html(' '+row['event_time']);
				  $( "#address" ).html(' '+row['home_address']);
				  $( "#venue_address" ).html(' '+row['location_address']);
				  $( "#message" ).html(' '+row['message']);
				  $( ".span_groom_name" ).html(' '+row['groom_name']);
				  $( ".span_bride_name" ).html(' '+row['bride_name']);
				  $('#groom_image').attr('src',row['groom_image']);
				  $('#bride_image').attr('src',row['bride_image']);
				  $('#qr_book_id').val(row['id']);
				  
				 
				   
				}
				  
			}, 
	     dataSelectHandlerLoadProfile: function( transaction, results ) {
			if(results.rows.length >0){
				row = results.rows.item(0);
				$( "#MyAherBookImage" ).html('<img class="ra-avatar img-responsive" src="'+row['couple_image']+'" >');
				$('#Couple_name').html(row['groom_name']+'  '+row['bride_name']);
				$('#date').html('Date '+row['event_date']);
				
				
			}
		    	/*for (i ; i<results.rows.length; i++) {
			   row = results.rows.item(i);
				  	$( "#MyAherBookImage" ).html('<img class="ra-avatar img-responsive" src="'+row['couple_image']+'" >');
				  	}
				  localAherbook.getUser_bookrecord_by_id(row['id']);*/
		}, 
				
				
	     dataSelectHandlerVillage: function( transaction, results ) {
				var i=0,
				row;
				 
				$("#MyAherBookVillage").html('<option value ="" >Select Village</option>');
				$("#MyAherBookVillage").css('display','block');
					if(results.rows.length > 0){
						for (i ; i<results.rows.length; i++) {
							row = results.rows.item(i);
							$("#MyAherBookVillage").append('<option value="'+row['villege']+'">'+row['villege']+'</option>');
				  	}
			 } 	 
			}, 
				
		  getUser_book_by_id: function(id=null) {
	    	var that = this;
			AHERBOOK.transaction(
			    function (transaction) {
			        transaction.executeSql("SELECT id,book_name FROM user_book WHERE id= "+id+";", [], that.dataSelectHandleruserbook_by_id, that.errorHandler);
			    }
			);			    
			},
		  GetBookDetails: function(id=null) {
	    	var that = this;
			AHERBOOK.transaction(
			    function (transaction) {
			        transaction.executeSql("SELECT  * FROM user_book WHERE id= "+id+";", [], that.dataSelectHandlerBookDetail, that.errorHandler);
			    }
			);			    
			},
		  BookRecors: function(booklistname=null) {
			arr = booklistname.split('@'); 
			 
	    	var that = this;
			AHERBOOK.transaction(
			    function (transaction) {
			        transaction.executeSql("SELECT  * FROM user_book_records  WHERE  name LIKE '"+arr[0] +"' and sur_name LIKE '"+arr[1] +"' and father_name LIKE '"+arr[2] +"';", [], that.dataSelectBookRecors, that.errorHandler);
			    }
			);			    
			},
	    
	     
		  GetVillage: function(id=null) {
			var that = this;
			
			AHERBOOK.transaction(
			    function (transaction) {
			        transaction.executeSql("SELECT DISTINCT villege  FROM user_book_records WHERE user_book_id=  "+id+";", [], that.dataSelectHandlerVillage, that.errorHandler);
			    }
			);
			localAherbook.LoadProfile(id);					    
	    },
	    
	    LoadProfile:function(id=null) {
			var that = this;
			AHERBOOK.transaction(
			    function (transaction) {
			        transaction.executeSql("SELECT * FROM user_book WHERE id= "+id+";", [], that.dataSelectHandlerLoadProfile, that.errorHandler);
			    }
			);	
		},
	    selectUser: function() {
			var that = this;
			AHERBOOK.transaction(
			    function (transaction) {
			        transaction.executeSql("SELECT * FROM users;", [], that.UserSelectHandler, that.errorHandler);
			    }
			);			    
	    },
	     UserSelectHandler: function( transaction, results ) {
			var URL = window.location.pathname; // Gets page name
			var page = URL.substring(URL.lastIndexOf('/') + 1); 
			if(results.rows.length == 0){
				if(page!='login.html'){
					localAherbook.DropAllTable(); 
					//clear: localStorage.clear(); 
					window.location.href = getAbsolutePath()+"login.html";exit()
				}
			}
			 	    
	    },
	     dataSelectHandleruserbookrecord_by_id: function( transaction, results ) {
				var i=0,
				row;
				$("#MyAherBookusername").html('<option value="">Select Name</option>');
				if(results.rows.length > 0){
					$("#MyAherBookusername").css('display','block');
		   for (i ; i<results.rows.length; i++) {
			   row = results.rows.item(i);
				$("#MyAherBookusername").append('<option value="'+row['name']+'">'+row['name']+'</option>');
				  	}
			 } 	
				
		}, 
	     dataSelectBookRecors: function( transaction, results ) {
				  var i=0,row;
				  
				  $("#giftlist").html('');
				 if(results.rows.length > 0){
					 for (i ; i<results.rows.length; i++) {
						  row = results.rows.item(i);
						 $("#giftlist").append('<div class="whiteBox qrcodePart aherCheck mb20 p0"><div class="media"><div class="media-left"><h3 class="ra-first-name">'+row['name']+' '+row['sur_name']+' '+row['father_name']+'</h3>	</div><div class="media-body"><h3 class="ra-first-name">'+row['villege']+'</h3> Aher : '+row['amount']+row['gift_name']+row['gold_name']+'</div><div class="media-right"><input type="checkbox" id="eq1" class="k-checkbox" unchecked="checked"><label class="k-checkbox-label" for="eq1">&nbsp;</label></div></div></div>');
					 }
				 }
				$("#MyAherBookusername").html('<option value="">Select Name</option>');
				if(results.rows.length > 0){
					$("#MyAherBookusername").css('display','block');
		   for (i ; i<results.rows.length; i++) {
			   row = results.rows.item(i);
				$("#MyAherBookusername").append('<option value="'+row['name']+'">'+row['name']+'</option>');
				  	}
			 } 	
				
		}, 
		  getUser_bookrecord_by_id: function(id) {
	    	var that = this;
			AHERBOOK.transaction(
			    function (transaction) {
			        transaction.executeSql("SELECT * FROM user_book_records WHERE user_book_id= "+id+";", [], that.dataSelectHandleruserbookrecord_by_id, that.errorHandler);
			    }
			);			    
	    },
	    
	    /*dataSelectHandleruserbookrecord_by_name: function( transaction, results ) {
				var i=0,
				row;
				$("#Aher_Sur_Name").html('<option value="">Select Father Name</option>');
				if(results.rows.length > 0){
				$("#Aher_Sur_Name").css('display','block');
		   for (i ; i<results.rows.length; i++) {
			   row = results.rows.item(i);
				  $("#Aher_Sur_Name").append('<option value="'+row['father_name']+'">'+row['father_name']+'</option>');
				  }
			 } 	
				
		}, */
		
		// niraj 
	    dataSelectHandleruserbookrecord_villagename: function( transaction, results ) {
				var i=0,row;
				$("#Aher_Sur_Name").html('<option value="">Select Sur Name</option>');
				if(results.rows.length > 0){
				$("#Aher_Sur_Name").css('display','block');
				for (i ; i<results.rows.length; i++) {
					row = results.rows.item(i);
					 
				  $("#Aher_Sur_Name").append('<option value="'+row['sur_name']+'">'+row['sur_name']+'</option>');
				  }
			 } 	
				
		}, 
		// niraj MyAherBookuserSurname
	    dataSelectHandleruserbookrecord_Surname: function( transaction, results ) {
				var i=0,row;
				$("#MyAherBookuserSurname").html('<option value="">Select Name</option>');
				if(results.rows.length > 0){
				$("#MyAherBookuserSurname").css('display','block');
				for (i ; i<results.rows.length; i++) {
					row = results.rows.item(i);
					var id=   row['name']+'@'+row['sur_name']+'@'+row['father_name'] ;
					$("#MyAherBookuserSurname").append('<option value="'+id+'">'+row['name']+' '+row['sur_name']+' '+row['father_name']+'</option>');
				  }
			 } 	
				
		}, 
		
		/*
		  getUser_bookrecord_by_name: function(name) {
			  var name = "'"+name+"'";
	    	var that = this;
			AHERBOOK.transaction(
			    function (transaction) {
			        transaction.executeSql("SELECT * FROM user_book_records WHERE name LIKE "+name+";", [], that.dataSelectHandleruserbookrecord_by_name, that.errorHandler);
			    }
			);			    
	    },*/
	    
		  getUser_bookrecord_by_villagename: function(village_name = null) {
			  var name = "'"+village_name+"'";
			  var that = this;
			  AHERBOOK.transaction(
			    function (transaction) {
			        transaction.executeSql("SELECT DISTINCT sur_name FROM user_book_records WHERE villege LIKE "+name+";", [], that.dataSelectHandleruserbookrecord_villagename, that.errorHandler);
			    }
			);			    
	    },
	    
		 
		  MyAherBookuserSurname: function(sur_name = null,village_name = null) {
			  var name = "'"+sur_name+"'";
			  var village_name = "'"+village_name+"'";
			  var that = this;
			 AHERBOOK.transaction(
			    function (transaction) {
			        transaction.executeSql("SELECT id , name,sur_name ,father_name FROM user_book_records WHERE sur_name LIKE "+name+" and villege LIKE "+village_name+";", [], that.dataSelectHandleruserbookrecord_Surname, that.errorHandler);
			    }
			);			    
	    },
	    
		 
	    /*
		  getUser_bookrecord_by_name: function(name) {
			  var name = "'"+name+"'";
	    	var that = this;
			AHERBOOK.transaction(
			    function (transaction) {
			        transaction.executeSql("SELECT * FROM user_book_records WHERE name LIKE "+name+";", [], that.dataSelectHandleruserbookrecord_by_name, that.errorHandler);
			    }
			);			    
	    },*/
	    
	    
	    
	    
	    
	    DropAllTable: function() {
			var that = this;
			AHERBOOK.transaction(
			    function (transaction) {
					var tables = ["users", "user_book", "user_book_records", "vendor_advt"];			    
						for (i = 0; i < tables.length; i++) { 
							transaction.executeSql("DROP TABLE "+tables[i] +";", [], that.nullDataHandler, that.errorHandler);
							//alert("DROP TABLE "+tables[i] +";");
						} 
			    	}
			);
						
		},
	     
		 errorHandler: function( transaction, error ) {
	    
		 	if (error.code===1){
		 		// DB Table already exists
		 	} else {
		    	// Error is a human-readable string.
			    console.log('Oops.  Error was '+error.message+' (Code '+ error.code +')');
		 	}
		    return false;		    
	    }
		
	};
	

 	//Instantiate Demo
 	localAherbook.init();
	
});	

function getAbsolutePath() {
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
}
function Loadqrcode() {
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
}

function getParameterByName(name=null) {
    if(name){
		url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}else{
		return '';
	}
}

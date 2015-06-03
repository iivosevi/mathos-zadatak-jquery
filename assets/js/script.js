$(document).ready(function() {
		var API = "http://193.246.33.24/data/";
		var users = $("#users");
		var dialog = $( "#dialog" ).dialog({
		height: 300,
		width: 350,
		autoOpen: false,
		modal: true,

		buttons: 
			{
				"Dodaj novog": function() {
					form.submit();
				},
				Cancel: function() {
					dialog.dialog("close");
				}
			},
				close: function() {
					form[0].reset();
				}
				});
		var form = dialog.find("form");
		
		form.on("submit", function(e) {
			e.preventDefault();
			
			$.post(API + 'create', form.serialize()).done(function(data) {
				addUser(data);
				dialog.dialog('close');
				
			}).fail(function(error) {
				console.log(error.responseText);
			});
		});
		
		$.get(API, {user : 3}, function(data) {
			console.log(data);
			$.each(data, function(i,user){
				addUser(user);
			});
		});
		
		function addUser(user) {
			users.append("<tr data-id="+user.id+"><td>"+user.name+"</td><td>"+user.surname+"</td><td><button class='btn btn-success edit'>Edit</button><button class='btn btn-danger delete'>Delete</button></td></tr>");
		};
		
		$("#addNew").on("click", function() {
			dialog.dialog("open");
		});
		
		users.on("click", ".delete", function() {
			var row = $(this).closest('tr');
			$.post(API + "destroy/" + row.data('id'), {}, function(data) {
				row.remove();
				});
		});
		
		
		users.on("click",".edit", function() {
			var row = $(this).closest('tr');
			$.get(API + '/?id=' + row.data('id'), {}, function(data) {
				dialog_izmjena.dialog("open");
				$("#ime").val(data.name);
				$("#prezime").val(data.surname);
			});
		});
		
		var dialog_izmjena = $("#dialog_izmjena").dialog({
			height: 300,
			width: 350,
			autoOpen:false,
			modal:true,
			buttons: {
				'Spremi': function() {
					form.submit();
				},
				Cancel: function() {
					dialog_izmjena.dialog('close');
				}
			},
			close: function() {
				form[0].reset();
			}
		});
		
		
		});
	
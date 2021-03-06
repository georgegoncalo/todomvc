/*global $ */
(function() {
	'use strict';

	// Demos popover
	function hover() {
		$( this ).popover('toggle');
	}

	$('#demos li a').each(function() {
		var $this = $( this );
		$this.popover({
			placement: 'in right',
			animation: false,
			title: $this.text() + '<a href="' + $this.data('source') + '">Go to site</a>'
		});
	})
	.off()
	.hoverIntent( hover, hover )
	.on('click', '.popover', function( e ) {
		// Prevent click on the popover, but allow links inside
		if ( e.target.nodeName.toLowerCase() !== 'a' ) {
			e.preventDefault();
		}
	});

	// Contributor list
	$.ajaxSetup({
		cache: true
	});
	$.getJSON('https://github.com/api/v2/json/repos/show/addyosmani/todomvc/contributors?callback=?', function( res ) {
		var data = res.contributors;
		// Add some previous contributors not on the GitHub list
		[].push.apply( data, [{
			login: 'tomdale',
			name: 'Tom Dale'
		}, {
			login: 'justinbmeyer',
			name: 'Justin Meyer'
		}]);
		var ret = $.map( data, function( elem ) {
			var username = elem.login;
			if ( $.inArray( username, [ 'addyosmani', 'boushley', 'sindresorhus' ] ) >= 0 ) {
				return;
			}
			return '<a href="https://github.com/' + username + '">' + ( elem.name || username ) + '</a>';
		});
		$('#contributor-list').show().children('span').html( ret.join(', ') );
	});

})();

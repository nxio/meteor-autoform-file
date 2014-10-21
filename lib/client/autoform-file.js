function refreshFileInput(name){
    var callback = function(){
        var value = $('input[name="' + name + '"]').val();
        Session.set('fileUpload['+name+']', value);
    }
    setTimeout(callback, 10);
}


function getIcon(file){
	var f = file.toLowerCase();
	if (f.substr(-4)=='.avi' || f.substr(-4)=='.mov' || f.substr(-4)=='.mp4') return 'facetime-video';
    if (f.substr(-4)=='.jpg' || f.substr(-5)=='.jpeg' || f.substr(-4)=='.png' || f.substr(-4)=='.gif') return 'picture';
	return 'file';
}

Template.afFileUpload.rendered = function(){
	Session.set('fileUpload['+name+']', $('input[name="' + name + '"]').val())
	var name = this.data.name;
	var callback = function(){
		Session.set('fileUpload['+name+']', $('input[name="' + name + '"]').val());
		$('.file-upload').removeClass('invisible');
    }
	setTimeout(callback, 10);
}


Template.afFileUpload.destroyed = function(){
	var name = this.data.name;
	Session.set('fileUpload['+name+']', '');
}

Template.afFileUpload.events({
	"change .file-upload": function(e, t){
	    Session.set('fileUploadInProgress['+name+']', true);
        var files = e.target.files;
		var collection = $(e.target).attr('collection');
        //console.log(['change .file-upload', e.target, t, files, collection]);
        var updateProgress = function(name, prog){
            $('#file-upload-progress-'+name+' .progress-bar').css('width', prog+'%');
            $('#file-upload-progress-'+name+' .progress-bar').html(prog+'% complete');
            $('#file-upload-progress-'+name+' .progress-bar').attr('aria-valuenow', prog);
        }
		window[collection].insert(files[0], function(err, fileObj){
			var name = $(e.target).attr('file-input');
            
            $('#file-upload-progress-'+name).css('display', 'block');
            $('#file-upload-label-'+name).css('display', 'none');
            updateProgress(name, 5);
            
            var progressFn = function(){
                var prog = fileObj.uploadProgress();
                if (prog < 100) {
                    updateProgress(name, prog);
                    setTimeout(progressFn, 50);
                } else {
                    updateProgress(name, 100);
                    setTimeout(function(){
                        $('#file-upload-progress-'+name).css('display', 'none');
                        $('#file-upload-label-'+name).css('display', 'block');
            			$('input[name="'+name+'"]').val(fileObj._id);
            			Session.set('fileUploadSelected['+name+']', files[0].name);
                        Session.set('fileUploadInProgress['+name+']', false);
            			refreshFileInput(name);
                    }, 500);
                }
            }
            progressFn();
        });
    },
	'click .file-upload-clear': function(e,t){
		var name = $(e.currentTarget).attr('file-input');
		$('input[name="' + name + '"]').val('');
		Session.set('fileUpload['+name+']', '');
    }
});

Template.afFileUpload.helpers({
	fileUpload: function(name, collection, label){
		var file = Session.get('fileUpload['+name+']');
		if (file != '' && file) {
			var doc = window[collection].findOne({_id: file});
            if (doc){
                var filename = doc.name();
                return {
                    template: 'fileThumbIcon',
				    data: { name: filename, icon: getIcon(filename)}
                };
            }
        }
    },
	fileUploadSelected: function(name){
		return Session.get('fileUploadSelected['+name+']');
    }
});


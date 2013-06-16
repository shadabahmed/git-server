var CommitDetails = (function(){
    var exports = {};
    var resetDescription = function($commit){
        $commit.find('.arrow').show();
        $commit.find('.detail').show().css({top: -1*($commit.outerHeight())/2, width: ''});
        hideWait($commit);
    };

    var zoomDescription = function($commit){
        var $detail = $commit.find('.detail'),
            $arrow = $commit.find('.arrow'),
            width = $('.objects').innerWidth();
        CommitDetails.hideExcept($commit);
        $arrow.show();
        $detail.show().animate({width: width});
        $('html, body').animate({
            scrollTop: $detail.offset().top - 20
        }, 1000);
    }
    var resetAll = function () {
        $('li.commit').each(function () {
            resetDescription($(this));
        });
    }
    var showWait = function($commit){
        var $detail = $commit.find('.detail');
        $detail.find('.orig').hide();
        $detail.addClass('wait');
    }
    var hideWait = function($commit){
        var $detail = $commit.find('.detail');
        $detail.find('.orig').show();
        $detail.find('.ajax').empty();
        $detail.removeClass('wait');
    }
    exports.hideExcept = function($commit){
        $('li.commit').not($commit).find('.detail, .arrow').fadeOut(500);
    }
    exports.init = function(){
        $('.commits a.reset').click(function(e){
            e.preventDefault();
            resetAll();
        });
        $('li.commit').each(function(){
            var $commit = $(this);
            resetDescription($commit);
            $commit.on('click', 'a' ,function(e){
                e.preventDefault();
                zoomDescription($commit);
                showWait($commit);
                var url = $(this).attr("href");
                $commit.find('.ajax').load(url, function(){
                    $commit.find('.detail').removeClass('wait');
                });
            });
        });

    }
    return exports;
}());

// Vertically center align details
$(CommitDetails.init);
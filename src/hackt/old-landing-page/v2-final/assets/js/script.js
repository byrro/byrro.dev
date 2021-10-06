//$(document).ready(function() {
//    $(".A1").click(function() {
//        var $this = $(this);
//        $(".P1").toggle("slow")
//
//        $this.toggleClass("expanded");
//
//        if ($this.hasClass("expanded")) {
//            $this.html("-");
//        } else {
//            $this.html("+");
//        }
//    });
//});

$(document).ready(function(){
    $('.modal').each(function(){
        var src = $(this).find('iframe').attr('src');

        $(this).on('click', function(){

            $(this).find('iframe').attr('src', '');
            $(this).find('iframe').attr('src', src);

        });
    });
});
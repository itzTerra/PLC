$('#select1').change(function(){
    var selected = $(this).find(':selected').val();
    $(".col1 > .python, .col1 > .cs").hide();
    if ($('#select2').find(':selected').val() == 0) {
        $(".shared").hide();
    }
    if (selected == 1) {
        $('.col1 > .python, .shared').show();
    } else if (selected == 2) {
        $('.col1 > .cs, .shared').show();
    }
})

$('#select2').change(function(){
    var selected = $(this).find(':selected').val();
    $(".col2 > .python, .col2 > .cs").hide();
    if ($('#select1').find(':selected').val() == 0) {
        $(".shared").hide();
    }
    if (selected == 1) {
        $('.col2 > .python, .shared').show();
    } else if (selected == 2) {
        $('.col2 > .cs, .shared').show(); 
    }
})

$("#swapper").on('click', function() {
    var v1 = $("#select1").val();
    $("#select1").val($("#select2").val());
    $("#select2").val(v1);
    $("#select1, #select2").trigger('change');
});

var scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#scrollspy'
  })


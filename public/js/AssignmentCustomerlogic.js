$(document).ready(function(){

    $('.form-check-input').click(function(){
        if(!$(this).closest('tr').hasClass("modified")){
            $(this).closest('tr').addClass('modified');
         }
      });

    $('#btnGuardar').click(function(){
        var employee_id = parseInt($("#employee_id").children("option:selected").val())
        
        
       $('tr.modified').each(function(){
           var customer_id = parseInt($(this).find('#customer_id').val())
           var days = []
           $(this).find($('input[name="day"]:checked')).each(function(){
               days.push(parseInt($(this).val()))
           })

           var assingment = {employee_id:employee_id,
                            customer_id:customer_id,
                            days:days
                            }
            console.log(assingment)
            $.ajax({
                    data:assingment,
                    url:'assignment-customer',
                    type:'post',
                    success: function(response){
                        window.location.reload();
                    }
                    })
                
       })
        
    })

})
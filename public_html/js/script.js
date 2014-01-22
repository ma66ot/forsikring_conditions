$(document).ready(function() {
    
    set_column_width();

    $('.add').on('click', function() {
        add_column();
    });
    
    $('.holder').on('click','.column .del', function() {
        remove_column(this);
    });
    $('.holder').on('click','.dragable', function() {
        remove_column(this);
    });
    
    $('.condition_box').draggable({
        start: function(){
            
        },
        stop: function(){
            
        }
    });
    
});

function set_column_width() {
    var num_columns = count_columns();
    var w_width = $('.holder').width();
    var calculated = w_width / num_columns - 16;
    
    $('.column').each(function() {
        $(this).css('width', calculated);
        $(this).droppable({
        drop: function( event, ui ) {
            rearange_elements(this);
          }
        });
    });
}

function add_column() {
    var content = '<div class="column"><div class="del">-</div></div>';
    $('.holder').append(content);
    set_column_width();
}

function remove_column(element){
    $(element).parent().remove();
    set_column_width();
}

function update_string() {

}

function count_columns() {
    var count = $('.column').length;
    return count;
}

function add_new_form(){
    
}
    
function rearange_elements(element){
    var form = '<div class="condition_box"><select name="property" id="prop_select" class="property"><option value="1">Select...</option><option value="2">zip</option><option value="3">steet</option><option value="4">address</option><option value="5">city</option></select><select name="operation" id="op_select" class="operation"><option value="">Select...</option><option value="">>=</option><option value="">!=</option></select><input id="kaka" type="text" value=""><div class="dragable"></div></div>';
    $(element).append(form);
    
    $('.container').html('');
    $('.container').append(form);
    $('.condition_box').draggable({
        start: function(){
            
        },
        stop: function(){
            value1 = $(this).children('#prop_select').val();
            value2 = $(this).children('#op_select').val();
            value3 = $(this).children('#kaka').val();
            $(this).remove();   
        }
    });
}
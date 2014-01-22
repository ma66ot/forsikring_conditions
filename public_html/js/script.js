var value1 = 0;
var value2 = 0;
var value3 = 0;

$(document).ready(function() {
    
    $('.add').on('click', function() {
        add_column();
    });
    
    $('.holder').on('click','.column .del', function() {
        remove_column(this);
    });
    $('.holder').on('click','.dragable', function() {
        remove_column(this);
    });
});

function set_column_width() {
    var num_columns = count_columns();
    var w_width = $('.holder').width();
    var calculated = w_width / num_columns - 16;
    
    $('.one').draggable({
        start: function(){
            value1 = $(this).children('#prop_select').val();
            value2 = $(this).children('#op_select').val();
            value3 = $(this).children('#kaka').val();
        },
        stop: function(){
            renumber_conditions();
        }
    });
    
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
    renumber_conditions();
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
    var form = '<div class="condition_box"><select name="property" id="prop_select" class="property"><option value="'+value1+'">'+value1+'</option><option value="zip">zip</option><option value="street">steet</option><option value="address">address</option><option value="city">city</option></select><select name="operation" id="op_select" class="operation"><option value="'+value2+'">'+value2+'</option><option value=">=">>=</option><option value="!=">!=</option></select><input id="kaka" type="text" value="'+value3+'"><div class="dragable"></div></div>';
    var form2 = '<div class="condition_box"><select name="property" id="prop_select" class="property"><option value="Select...">Select...</option><option value="zip">zip</option><option value="street">steet</option><option value="address">address</option><option value="city">city</option></select><select name="operation" id="op_select" class="operation"><option value="Select...">Select...</option><option value=">=">>=</option><option value="!=">!=</option></select><input id="kaka" type="text" value=""><div class="dragable"></div></div>';
    $(element).append(form);
    
    $('.container').html('');
    $('.container').append(form2);
    $('.condition_box').draggable({
        start: function(){
            value1 = $(this).children('#prop_select').val();
            value2 = $(this).children('#op_select').val();
            value3 = $(this).children('#kaka').val();
        },
        stop: function(){
            $(this).remove();
        }
    });
    renumber_conditions();
}

function renumber_conditions(){
    var n = 0;
    var m = 0;
    $('.column').each(function(){
        var i = $(this).children('.condition_box').length;
        console.log(i);
        $(this).children('.condition_box').each(function(){
            $(this).attr('id','box_'+n+'_'+m);
            m+=1;
            if(m == i){
                m = 0;
            }
        });
        n+=1;
    });
}
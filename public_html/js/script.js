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
    
    $('.get').on('click', function() {
        update_string();
    });
    
    $('.holder').on('click', '#enabled', function() {
        opacity(this);
    });
});

function set_column_width() {
    var num_columns = count_columns();
    var w_width = $('.holder').width();
    var calculated = w_width / num_columns - 36;
    
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
    var content = '<div class="column"><div class="del">-</div><div class="ori">OR</div></div>';
    $('.holder').append(content);
    set_column_width();
}

function remove_column(element){
    $(element).parent().remove();
    set_column_width();
    renumber_conditions();
}

function update_string() {
    var cond_string = '{"string":{';
    
    var n = 0;
    var m = 0;
    $('.column').each(function(){
        var i = $(this).children('.condition_box').length;
        $(this).children('.condition_box').each(function(){
            //$(this).attr('id','box_'+n+'_'+m);
            var part = 'box_'+n+'_'+m;
            var condition = $('#'+part);
            var a = condition.children('#prop_select').val();
            var b = condition.children('#op_select').val();
            var c = condition.children('#kaka').val();
            cond_string += '"'+part+'":{';
            cond_string += '"a":"'+a+'",';
            cond_string += '"b":"'+b+'",';
            cond_string += '"c":"'+c+'"';
            cond_string += '},';
            m+=1;
            if(m == i){
                m = 0;
            }
        });
        n+=1;
    });
    cond_string += '}}';
    
    $('.result').html(cond_string);
}

function count_columns() {
    var count = $('.column').length;
    return count;
}

function add_new_form(){
    
}
    
function rearange_elements(element){
    var form = '<div class="condition_box">\n\
                    <select name="property" id="prop_select" class="property">\n\
                        <option value="'+value1+'">'+value1+'</option>\n\
                        <option value="zip">zip</option>\n\
                        <option value="street">steet</option>\n\
                        <option value="address">address</option>\n\
                        <option value="city">city</option>\n\
                    </select><select name="operation" id="op_select" class="operation">\n\
                        <option value="'+value2+'">'+value2+'</option>\n\
                        <option value=">=">>=</option>\n\
                        <option value="!=">!=</option>\n\
                    </select>\n\
                    <input id="kaka" type="text" value="'+value3+'">\n\
                    <input type="checkbox" id="enabled" checked/>\n\
                    <div class="dragable"></div>\n\
                    <div class="andi">AND</div>\n\
                </div>';
    var form2 = '<div class="condition_box">\n\
                    <select name="property" id="prop_select" class="property">\n\
                        <option value="Select...">Select...</option>\n\
                        <option value="zip">zip</option>\n\
                        <option value="street">steet</option>\n\
                        <option value="address">address</option>\n\
                        <option value="city">city</option>\n\
                    </select>\n\
                    <select name="operation" id="op_select" class="operation">\n\
                        <option value="Select...">Select...</option>\n\
                        <option value=">=">>=</option>\n\
                        <option value="!=">!=</option>\n\
                    </select>\n\
                    <input id="kaka" type="text" value="">\n\
                </div>';
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
        //console.log(i);
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

function opacity(element){
    //console.log('stisk');
    var el = $(element).prop('checked');
    if(el == false){
        $(element).parent().css('opacity','0.5');
    }
    else{
        $(element).parent().css('opacity','1');
    }
}
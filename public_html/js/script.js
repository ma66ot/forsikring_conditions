var value1 = 0;
var value2 = 0;
var value3 = 0;
var value4 = true;

$(document).ready(function() {

    $('.add').on('click', function() {
        //renumber_conditions();
        add_column();
    });

    $('.clean').on('click', function() {
        //renumber_conditions();
        clear_workspace();
        //console.debug($('.holder'));
    });

    $('.holder').on('click', '.column .del', function() {
        //renumber_conditions();
        remove_column(this);
    });

    $('.holder').on('click', '.dragable', function() {
        //renumber_conditions();
        remove_column(this);
    });

    $('.get').on('click', function() {
        empty_columns();
        renumber_conditions();
        update_string();
    });

    $('.rebuild').on('click', function() {
        //renumber_conditions();
        rebuild_workspace();
    });

    $('.holder').on('click', '#enabled', function() {
        //renumber_conditions();
        opacity(this);
    });
});

function set_column_width() {
    var num_columns = count_columns();
    var w_width = $('.holder').width();
    var calculated = w_width / num_columns - 36;

    $('.one').draggable({
        start: function() {
            value1 = $(this).children('#prop_select').val();
            value2 = $(this).children('#op_select').val();
            value3 = $(this).children('#kaka').val();
            value4 = $(this).children('#enabled').prop('checked');
        },
        stop: function() {
            renumber_conditions();
        }
    });

    $('.column').each(function() {
        $(this).css('width', calculated);
        $(this).droppable({
            drop: function(event, ui) {
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

function remove_column(element) {
    $(element).parent().remove();
    set_column_width();
    renumber_conditions();
}

function update_string() {
    var cond_string = '{';

    var n = 0;
    var m = 0;
    var all = 0;
    //first we go through columns
    var cols = $('.column').length;
    $('.column').each(function() {
        var i = $(this).children('.condition_box').length;
        all += i;
        cond_string += '"' + n + '":[{';
        if (i > 0) {
            //then we go though the boxes in the columns
            $(this).find('.condition_box').each(function() {
                //$(this).attr('id','box_'+n+'_'+m);
                var part = 'box_' + n + '_' + m;
                var condition = $('#' + part);

                var a = condition.children('#prop_select').val();
                var b = condition.children('#op_select').val();
                var c = condition.children('#kaka').val();
                var d = condition.children('#enabled').prop('checked');
                cond_string += '"' + part + '":[{';
                cond_string += '"a":"' + a + '",';
                cond_string += '"b":"' + b + '",';
                cond_string += '"c":"' + c + '",';
                cond_string += '"d":"' + d + '"';
                //cond_string += '}],';
                m += 1;
                if (m == i || i == 0) {
                    cond_string += '}]';
                    m = 0;
                }
                else {
                    cond_string += '}],';
                }

            });
        }
        n += 1;
        if (n == cols || i == 0) {
            cond_string += '}]';
        }
        else {
            cond_string += '}],';
        }
    });
    cond_string += '}';
    cond_string = cond_string.replace('}]}],}]}', '}]}]}]}');
    $('.result').html(cond_string);
}

function count_columns() {
    var count = $('.column').length;
    return count;
}

function rearange_elements(element) {
    var fill = '';
    var opacity = '';
    if (value4 == true) {
        fill += '<input type="checkbox" id="enabled" checked/>';
    }
    else {
        fill += '<input type="checkbox" id="enabled"/>';
        opacity = 'style="opacity:0.5;"';
    }
    var form = '<div class="condition_box" ' + opacity + '>\n\
                    <select name="property" id="prop_select" class="property">\n\
                        <option value="' + value1 + '">' + value1 + '</option>\n\
                        <option value="zip">zip</option>\n\
                        <option value="street">steet</option>\n\
                        <option value="address">address</option>\n\
                        <option value="city">city</option>\n\
                    </select><select name="operation" id="op_select" class="operation">\n\
                        <option value="' + value2 + '">' + value2 + '</option>\n\
                        <option value=">=">>=</option>\n\
                        <option value="!=">!=</option>\n\
                    </select>\n\
                    <input id="kaka" type="text" value="' + value3 + '">\n\
                    ' + fill + '\n\
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
                    <input id="enabled" type="hidden" checked>\n\
                </div>';
    $(element).append(form);

    $('.container').html('');
    $('.container').append(form2);
    $('.condition_box').draggable({
        start: function() {
            value1 = $(this).children('#prop_select').val();
            value2 = $(this).children('#op_select').val();
            value3 = $(this).children('#kaka').val();
            value4 = $(this).children('#enabled').prop('checked');
        },
        stop: function() {
            $(this).remove();
        }
    });
    renumber_conditions();
}

function renumber_conditions() {
    var n = 0;
    var m = 0;
    $('.column').each(function() {
        var i = $(this).children('.condition_box').length;
        //console.log(i);
        $(this).children('.condition_box').each(function() {
            $(this).attr('id', 'box_' + n + '_' + m);
            m += 1;
            if (m == i) {
                m = 0;
            }
        });
        n += 1;
    });
}

function opacity(element) {
    //console.log('stisk');
    var el = $(element).prop('checked');
    if (el == false) {
        $(element).parent().css('opacity', '0.5');
    }
    else {
        $(element).parent().css('opacity', '1');
    }
}

function clear_workspace() {
    $('.holder').html('');
}

function empty_columns() {
    $('.column').each(function() {
        var childs = $(this).children('.condition_box').length;
        if (childs == 0) {
            $(this).remove();
            set_column_width();
        }
    });
}

function rebuild_workspace() {
    var string = $('.result').html();
    var result = JSON.parse(string);
    var build_string = '';
    //console.log(result);
    for (var key in result) {
        //console.log(key);
        build_string += '<div class="column">';
        for (var key2 in result[key]) {
            for (var key3 in result[key][key2]) {
                //console.log(key3);
                var box = result[key][key2][key3][0];
                var fill = '';
                var check = '';
                if(box.d == 'true'){
                    check = 'checked';
                }
                else{
                    fill = 'style="opacity:0.5;"';
                }
                build_string += '<div class="condition_box" id="'+key3+'" '+fill+'>\n\
                                    <select name="property" id="prop_select" class="property">\n\
                                        <option value="'+box.a+'">'+box.a+'</option>\n\
                                        <option value="zip">zip</option>\n\
                                        <option value="street">steet</option>\n\
                                        <option value="address">address</option>\n\
                                        <option value="city">city</option>\n\
                                    </select>\n\
                                    <select name="operation" id="op_select" class="operation">\n\
                                        <option value="'+box.b+'">'+box.b+'</option>\n\
                                        <option value=">=">>=</option>\n\
                                        <option value="!=">!=</option>\n\
                                    </select>\n\
                                    <input id="kaka" type="text" value="'+box.c+'">\n\
                                    <input id="enabled" type="checkbox" '+check+'>\n\
                                    <div class="dragable"></div>\n\
                                    <div class="andi">AND</div>\n\
                                </div>';
            }
        }
        build_string += '<div class="del">-</div><div class="ori">OR</div></div>';
    }
    $('.holder').html(build_string);
    set_column_width();
    $('.condition_box').draggable({
        start: function() {
            value1 = $(this).children('#prop_select').val();
            value2 = $(this).children('#op_select').val();
            value3 = $(this).children('#kaka').val();
            value4 = $(this).children('#enabled').prop('checked');
        },
        stop: function() {
            $(this).remove();
        }
    });
}
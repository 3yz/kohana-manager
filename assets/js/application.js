/* Author: Joel Souza */

/*
 * trigger functions based on controller and actions names
 * see more on http://www.viget.com/inspire/extending-paul-irishs-comprehensive-dom-ready-execution/
 */ 
UTIL = {
  exec: function( controller, action ) {
    var ns = MANAGER,
        action = ( action === undefined ) ? "init" : action;
    if ( controller !== "" && ns[controller] && typeof ns[controller][action] == "function" ) {
      ns[controller][action]();
    }
  },
  init: function() {
    var body = document.body,
        controller = body.getAttribute( "data-controller" ),
        action = body.getAttribute( "data-action" );

    UTIL.exec( "common" );
    UTIL.exec( controller );
    UTIL.exec( controller, action );
  }
};

$( document ).ready( UTIL.init );


MANAGER = {
  common: {
    init: function(){
      //datepicker
      $('input.datepicker').datepicker({
        dateFormat: 'dd/mm/yy',
        dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        monthNames: ['Janeiro','Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
      });

      //table links
      $('tr.link td:not(.actions):not(.select)').click(function(){
        document.location.href = $(this).parent().attr('data-link');
      });

      $('#reset').on('click', function(){
        $(this).parent().parent().parent().find('input:text').each(function(){
          $(this).removeAttr('value');
        })
      });

      //delete links
      $('a.delete').click(function(){
        return confirm('Tem certeza que deseja excluir?');
      });

      //delete selecteds
      $("button.delete[type='submit']").click(function(e){
        if(confirm('Tem certeza que deseja excluir os registros selecionados?')) {
          $("#bulk_action input[name='action']").val('delete');
          $("#bulk_action").submit();
        }

        return e.preventDefault();
      });

      //select all
      $('#check_all').click(function(){
        if($(this).is(':checked'))
        {
          $(this).closest('form').find('input[name="id[]"]:not(:checked)').click();
        }
        else
        {
         $(this).closest('form').find('input[name="id[]"]:checked').click(); 
        }
      });
      
      //textarea
      $('textarea.richtext').tinymce({
          // Location of TinyMCE script
          script_url : $('base').attr('href') + 'assets/js/tiny_mce/tiny_mce.js',
          document_base_url : $('base').attr('href'),
          // relative_urls : false,
          // remove_script_host : false,
          // remember_last_path : false,

          wwwroot : $('base').attr('href') + '/llzzlz',

          // General options
          theme : "advanced",
          plugins : "imagemanager,pagebreak,style,table,advhr,advimage,advlink,media,searchreplace,paste,directionality,nonbreaking",

          // Theme options
          theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,blockquote,|,undo,redo,|,link,unlink,image,insertimage,code",
          theme_advanced_buttons2 : "",
          theme_advanced_buttons3 : "",
          theme_advanced_buttons4 : "",
          theme_advanced_toolbar_location : "top",
          theme_advanced_toolbar_align : "left",
          theme_advanced_statusbar_location : false,
          theme_advanced_resizing : true,

          height:400,
          width:'100%',

          // Example content CSS (should be your site CSS)
          // content_css : "css/content.css",

          // Drop lists for link/image/media/template dialogs
          // template_external_list_url : "lists/template_list.js",
          // external_link_list_url : "lists/link_list.js",
          // external_image_list_url : "lists/image_list.js",
          // media_external_list_url : "lists/media_list.js",

        });

    }
  }
}


















